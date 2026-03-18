import React, { useRef, useEffect, useState } from 'react';
import { videoPreloader } from '../utils/videoPreloader';

interface LazyVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  controls?: boolean;
  poster?: string;
  onLoadStart?: () => void;
  onCanPlay?: () => void;
  [key: string]: any;
}

const LazyVideo: React.FC<LazyVideoProps> = ({
  src,
  className = '',
  style = {},
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  controls = false,
  poster = '',
  onLoadStart,
  onCanPlay,
  ...props
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
          
          // Check if video is already cached
          const cachedVideo = videoPreloader.getCachedVideo(src);
          if (cachedVideo) {
            // Use cached video for instant loading
            video.src = src;
            video.load();
            video.play().catch(() => {
              // Ignore autoplay errors
            });
          } else {
            // Start loading the video when it comes into view
            if (video.src !== src) {
              video.src = src;
              // Force immediate load and play
              video.load();
              video.play().catch(() => {
                // Ignore autoplay errors
              });
            }
          }
        } else if (!entry.isIntersecting && isInView) {
          // Don't pause video when it goes out of view to maintain smooth experience
          // video.pause();
        }
      },
      {
        rootMargin: '200px', // Start loading 200px before the video enters viewport for faster loading
        threshold: 0.01 // Lower threshold for earlier detection
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [src, isInView]);

  const handleLoadStart = () => {
    onLoadStart?.();
  };

  const handleCanPlay = () => {
    setIsLoaded(true);
    onCanPlay?.();
  };

  return (
    <video
      ref={videoRef}
      className={className}
      style={{
        ...style,
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)'
      }}
      autoPlay={autoPlay && isInView}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      controls={controls}
      poster={poster}
      preload={isInView ? "auto" : "metadata"} // Preload metadata immediately, full video when in view
      onLoadStart={handleLoadStart}
      onCanPlay={handleCanPlay}
      onLoadedData={() => {
        // Auto-play as soon as data is loaded
        if (videoRef.current && isInView && autoPlay) {
          videoRef.current.play().catch(() => {
            // Ignore autoplay errors
          });
        }
      }}
      {...props}
    >
      {isInView && <source src={src} type="video/mp4" />}
      Your browser does not support the video tag.
    </video>
  );
};

export default LazyVideo;