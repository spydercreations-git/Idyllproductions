// Video optimization utilities for better performance and loading

export const preloadVideo = (src: string): Promise<HTMLVideoElement> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;
    
    video.onloadeddata = () => resolve(video);
    video.onerror = () => reject(new Error(`Failed to load video: ${src}`));
    
    video.src = src;
  });
};

export const preloadVideos = async (videoUrls: string[]): Promise<HTMLVideoElement[]> => {
  try {
    const promises = videoUrls.map(url => preloadVideo(url));
    return await Promise.all(promises);
  } catch (error) {
    console.warn('Some videos failed to preload:', error);
    return [];
  }
};

export const optimizeVideoElement = (video: HTMLVideoElement): void => {
  // Apply GPU acceleration and performance optimizations
  video.style.willChange = 'transform';
  video.style.backfaceVisibility = 'hidden';
  video.style.transform = 'translateZ(0)';
  video.style.WebkitTransform = 'translateZ(0)';
  video.style.WebkitBackfaceVisibility = 'hidden';
  
  // Set optimal attributes
  video.setAttribute('controlsList', 'nodownload nofullscreen noremoteplayback noplaybackrate');
  video.setAttribute('disablePictureInPicture', 'true');
  video.setAttribute('disableRemotePlayback', 'true');
};

export const createOptimizedVideoElement = (src: string, options: {
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  className?: string;
} = {}): HTMLVideoElement => {
  const video = document.createElement('video');
  
  // Set source
  video.src = src;
  
  // Apply options
  if (options.autoPlay) video.autoplay = true;
  if (options.loop) video.loop = true;
  if (options.muted !== false) video.muted = true; // Default to muted
  if (options.preload) video.preload = options.preload;
  if (options.className) video.className = options.className;
  
  // Always set playsInline for mobile compatibility
  video.playsInline = true;
  
  // Apply optimizations
  optimizeVideoElement(video);
  
  return video;
};

// Utility to check if video can play smoothly
export const checkVideoPerformance = (video: HTMLVideoElement): boolean => {
  try {
    // Check if video is ready and can play
    return video.readyState >= 3; // HAVE_FUTURE_DATA or higher
  } catch {
    return false;
  }
};

// Batch video loading with progress tracking
export const loadVideosWithProgress = (
  videoUrls: string[],
  onProgress?: (loaded: number, total: number) => void
): Promise<HTMLVideoElement[]> => {
  return new Promise((resolve) => {
    const videos: HTMLVideoElement[] = [];
    let loadedCount = 0;
    
    const checkComplete = () => {
      if (loadedCount === videoUrls.length) {
        resolve(videos);
      }
    };
    
    videoUrls.forEach((url, index) => {
      const video = createOptimizedVideoElement(url, {
        preload: 'metadata',
        muted: true
      });
      
      video.onloadeddata = () => {
        loadedCount++;
        onProgress?.(loadedCount, videoUrls.length);
        checkComplete();
      };
      
      video.onerror = () => {
        console.warn(`Failed to load video: ${url}`);
        loadedCount++;
        onProgress?.(loadedCount, videoUrls.length);
        checkComplete();
      };
      
      videos[index] = video;
    });
  });
};