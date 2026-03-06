// Performance monitoring utilities for video loading and scroll performance

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();
  private observers: Map<string, PerformanceObserver> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Track video loading performance
  trackVideoLoad(videoSrc: string, startTime: number = performance.now()): void {
    const endTime = performance.now();
    const loadTime = endTime - startTime;
    this.metrics.set(`video_load_${videoSrc}`, loadTime);
    
    if (loadTime > 3000) {
      console.warn(`Slow video loading detected: ${videoSrc} took ${loadTime.toFixed(2)}ms`);
    } else {
      console.log(`Video loaded efficiently: ${videoSrc} in ${loadTime.toFixed(2)}ms`);
    }
  }

  // Track scroll performance
  trackScrollPerformance(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'measure' && entry.name.includes('scroll')) {
            if (entry.duration > 16.67) { // More than 60fps
              console.warn(`Slow scroll detected: ${entry.duration.toFixed(2)}ms`);
            }
          }
        });
      });
      
      observer.observe({ entryTypes: ['measure'] });
      this.observers.set('scroll', observer);
    }
  }

  // Track animation frame performance
  trackAnimationFrames(): void {
    let lastTime = performance.now();
    let frameCount = 0;
    let totalTime = 0;

    const measureFrame = (currentTime: number) => {
      const delta = currentTime - lastTime;
      totalTime += delta;
      frameCount++;

      // Log FPS every 60 frames
      if (frameCount >= 60) {
        const avgFrameTime = totalTime / frameCount;
        const fps = 1000 / avgFrameTime;
        
        if (fps < 55) {
          console.warn(`Low FPS detected: ${fps.toFixed(1)} fps`);
        }
        
        frameCount = 0;
        totalTime = 0;
      }

      lastTime = currentTime;
      requestAnimationFrame(measureFrame);
    };

    requestAnimationFrame(measureFrame);
  }

  // Get performance metrics
  getMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }

  // Clear all metrics
  clearMetrics(): void {
    this.metrics.clear();
  }

  // Stop all observers
  stopMonitoring(): void {
    this.observers.forEach((observer) => {
      observer.disconnect();
    });
    this.observers.clear();
  }
}

// Utility functions for easy access
export const trackVideoLoad = (videoSrc: string, startTime?: number) => {
  PerformanceMonitor.getInstance().trackVideoLoad(videoSrc, startTime);
};

export const startPerformanceMonitoring = () => {
  const monitor = PerformanceMonitor.getInstance();
  monitor.trackScrollPerformance();
  monitor.trackAnimationFrames();
};

export const getPerformanceMetrics = () => {
  return PerformanceMonitor.getInstance().getMetrics();
};

// Video loading performance helper
export const measureVideoLoadTime = (video: HTMLVideoElement): Promise<number> => {
  return new Promise((resolve) => {
    const startTime = performance.now();
    
    const onLoad = () => {
      const loadTime = performance.now() - startTime;
      trackVideoLoad(video.src, startTime);
      resolve(loadTime);
      video.removeEventListener('loadeddata', onLoad);
    };
    
    if (video.readyState >= 2) {
      // Video already loaded
      resolve(0);
    } else {
      video.addEventListener('loadeddata', onLoad);
    }
  });
};