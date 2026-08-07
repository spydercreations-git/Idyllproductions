// Service Worker for video caching
const CACHE_NAME = 'idyll-videos-v1';
const VIDEO_CACHE_NAME = 'idyll-video-cache-v1';

// Critical videos to cache immediately (disabled since migrating to Bunny.net HLS)
const CRITICAL_VIDEOS = [];

// Install event - cache critical videos
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(VIDEO_CACHE_NAME).then((cache) => {
      console.log('Caching critical videos...');
      // Cache critical videos in background
      CRITICAL_VIDEOS.forEach(async (videoUrl) => {
        try {
          await cache.add(videoUrl);
          console.log(`Cached video: ${videoUrl}`);
        } catch (error) {
          console.warn(`Failed to cache video: ${videoUrl}`, error);
        }
      });
    })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== VIDEO_CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve videos from cache when possible
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Handle video requests
  if (url.hostname === 'firebasestorage.googleapis.com' && event.request.url.includes('.mp4')) {
    event.respondWith(
      caches.open(VIDEO_CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            console.log('Serving video from cache:', event.request.url);
            return cachedResponse;
          }
          
          // If not in cache, fetch and cache for next time
          return fetch(event.request).then((response) => {
            // Only cache successful responses
            if (response.status === 200) {
              const responseClone = response.clone();
              cache.put(event.request, responseClone);
              console.log('Cached new video:', event.request.url);
            }
            return response;
          }).catch((error) => {
            console.error('Failed to fetch video:', event.request.url, error);
            throw error;
          });
        });
      })
    );
  }
  // Let other requests pass through normally
});

// Message event for manual cache management
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CACHE_VIDEO') {
    const videoUrl = event.data.url;
    caches.open(VIDEO_CACHE_NAME).then((cache) => {
      cache.add(videoUrl).then(() => {
        console.log('Manually cached video:', videoUrl);
        event.ports[0].postMessage({ success: true });
      }).catch((error) => {
        console.error('Failed to manually cache video:', videoUrl, error);
        event.ports[0].postMessage({ success: false, error: error.message });
      });
    });
  }
});