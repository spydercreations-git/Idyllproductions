// Video preloader utility for instant loading
class VideoPreloader {
  private cache: Map<string, HTMLVideoElement> = new Map();
  private preloadQueue: string[] = [];
  private isPreloading = false;

  // Preload a video and store it in cache
  async preloadVideo(src: string): Promise<HTMLVideoElement> {
    if (this.cache.has(src)) {
      return this.cache.get(src)!;
    }

    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'auto';
      video.muted = true;
      video.playsInline = true;
      video.crossOrigin = 'anonymous';
      
      // Hide the video element
      video.style.position = 'absolute';
      video.style.top = '-9999px';
      video.style.left = '-9999px';
      video.style.width = '1px';
      video.style.height = '1px';
      video.style.opacity = '0';
      video.style.pointerEvents = 'none';
      
      const onCanPlay = () => {
        video.removeEventListener('canplay', onCanPlay);
        video.removeEventListener('error', onError);
        
        this.cache.set(src, video);
        resolve(video);
      };
      
      const onError = () => {
        video.removeEventListener('canplay', onCanPlay);
        video.removeEventListener('error', onError);
        
        if (video.parentNode) {
          video.parentNode.removeChild(video);
        }
        reject(new Error(`Failed to preload video: ${src}`));
      };
      
      video.addEventListener('canplay', onCanPlay);
      video.addEventListener('error', onError);
      
      // Add to DOM temporarily for loading
      document.body.appendChild(video);
      video.src = src;
      video.load();
      
      // Remove from DOM after 10 seconds if not loaded
      setTimeout(() => {
        if (video.parentNode && !this.cache.has(src)) {
          video.parentNode.removeChild(video);
          reject(new Error(`Timeout preloading video: ${src}`));
        }
      }, 10000);
    });
  }

  // Preload multiple videos in sequence
  async preloadVideos(sources: string[]): Promise<void> {
    if (this.isPreloading) return;
    
    this.isPreloading = true;
    this.preloadQueue = [...sources];
    
    try {
      for (const src of sources) {
        if (!this.cache.has(src)) {
          try {
            await this.preloadVideo(src);
            console.log(`Preloaded video: ${src}`);
          } catch (error) {
            console.warn(`Failed to preload video: ${src}`, error);
          }
        }
      }
    } finally {
      this.isPreloading = false;
    }
  }

  // Get preloaded video from cache
  getCachedVideo(src: string): HTMLVideoElement | null {
    return this.cache.get(src) || null;
  }

  // Check if video is cached
  isCached(src: string): boolean {
    return this.cache.has(src);
  }

  // Clear cache
  clearCache(): void {
    this.cache.forEach((video) => {
      if (video.parentNode) {
        video.parentNode.removeChild(video);
      }
    });
    this.cache.clear();
  }

  // Get cache size
  getCacheSize(): number {
    return this.cache.size;
  }

  // Preload videos with priority (first few videos get higher priority)
  preloadWithPriority(sources: string[], priorityCount: number = 3): void {
    const priorityVideos = sources.slice(0, priorityCount);
    const normalVideos = sources.slice(priorityCount);
    
    // Preload priority videos immediately
    this.preloadVideos(priorityVideos);
    
    // Preload normal videos after a delay
    setTimeout(() => {
      this.preloadVideos(normalVideos);
    }, 2000);
  }
}

// Create singleton instance
export const videoPreloader = new VideoPreloader();

// Preload critical videos on app start (no-op since migrating to Bunny.net HLS)
export const preloadCriticalVideos = () => {};