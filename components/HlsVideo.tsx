import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

// ─── HlsVideo ─────────────────────────────────────────────────────────────────
// Plain native <video> powered by hls.js.
// Autoplays muted on infinite loop when visible. Pauses when off-screen to save battery/GPU.

interface HlsVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  muted?: boolean;
  loop?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill';
  zoom?: number;
  poster?: string;
  onVideoRef?: (el: HTMLVideoElement | null) => void;
  onPlaying?: () => void;
}

const HlsVideo: React.FC<HlsVideoProps> = ({
  src,
  className = '',
  style,
  muted = true,
  loop = true,
  objectFit = 'cover',
  zoom = 1,
  poster = '/hero-bg.webp',
  onVideoRef,
  onPlaying,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Lazy load video when entering viewport; pause when offscreen
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          video.play().catch(() => {});
        } else {
          // Pause when scrolled offscreen to conserve CPU/battery
          video.pause();
        }
      },
      { rootMargin: '150px', threshold: 0.02 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Initialize HLS when visible
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVisible || !src) return;

    onVideoRef?.(video);

    const startPlayback = () => {
      video.muted = true;
      video.play().catch(() => {});
    };

    if (Hls.isSupported()) {
      hlsRef.current?.destroy();

      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 15,
        capLevelToPlayerSize: true,
      });
      hlsRef.current = hls;

      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        startPlayback();
      });
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari native HLS
      video.src = src;
      video.addEventListener('loadedmetadata', startPlayback, { once: true });
    }

    return () => {
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };
  }, [src, isVisible]);

  // Keep muted state in sync
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  // Notify parent when video actually starts rendering frames
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !onPlaying) return;

    let triggered = false;
    const triggerPlaying = () => {
      if (!triggered && (video.currentTime > 0 || video.readyState >= 2)) {
        triggered = true;
        onPlaying();
      }
    };

    video.addEventListener('playing', triggerPlaying);
    video.addEventListener('timeupdate', triggerPlaying);
    video.addEventListener('loadeddata', triggerPlaying);

    return () => {
      video.removeEventListener('playing', triggerPlaying);
      video.removeEventListener('timeupdate', triggerPlaying);
      video.removeEventListener('loadeddata', triggerPlaying);
    };
  }, [onPlaying]);

  return (
    <video
      ref={videoRef}
      className={className}
      poster={poster}
      style={{
        width: '100%',
        height: '100%',
        objectFit,
        display: 'block',
        transform: zoom !== 1 ? `scale(${zoom})` : undefined,
        transformOrigin: 'center center',
        ...style,
      }}
      muted={muted}
      loop={loop}
      playsInline
      autoPlay={isVisible}
      preload={isVisible ? 'auto' : 'none'}
    />
  );
};

export default HlsVideo;

// ─── HoverHlsVideo ────────────────────────────────────────────────────────────
// For the work showcase grid: autoplay muted loop, controls hidden by default.
// On hover → shows mute/unmute button overlay.
// Manual unmute persists until user mutes again.

interface HoverHlsVideoProps {
  src: string;
  className?: string;
  aspectClass?: string;
  style?: React.CSSProperties;
  poster?: string;
}

export const HoverHlsVideo: React.FC<HoverHlsVideoProps> = ({
  src,
  className = '',
  aspectClass = 'aspect-video',
  style,
  poster,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [manuallyUnmuted, setManuallyUnmuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!manuallyUnmuted) {
      setIsMuted(true);
      if (videoRef.current) videoRef.current.muted = true;
    }
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.muted = false;
      setIsMuted(false);
      setManuallyUnmuted(true);
    } else {
      video.muted = true;
      setIsMuted(true);
      setManuallyUnmuted(false);
    }
  };

  return (
    <div
      className={`relative overflow-hidden ${aspectClass} ${className}`}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <HlsVideo
        src={src}
        poster={poster}
        muted={isMuted}
        loop
        objectFit="cover"
        onVideoRef={(el) => {
          videoRef.current = el;
        }}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />

      {/* Hover overlay with mute button (solid dark on mobile, clean blur on desktop) */}
      <div
        className="absolute inset-0 flex items-end justify-end p-3 transition-opacity duration-200"
        style={{
          opacity: isHovered ? 1 : 0,
          pointerEvents: isHovered ? 'all' : 'none',
          background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 45%)',
          zIndex: 10,
        }}
      >
        <button
          onClick={handleToggleMute}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-black/85 md:bg-black/60 md:backdrop-blur-sm text-white hover:bg-black/90 transition-all duration-200"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};
