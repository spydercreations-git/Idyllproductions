import React, { useRef, useEffect, useState } from 'react';
import { Eye, Heart, Volume2, VolumeX } from 'lucide-react';
import './UGCGallery.css';

interface UGCItem {
  video: string;
  views: string;
  likes: string;
}

interface UGCGalleryProps {
  items: UGCItem[];
  autoScrollSpeed?: number;
}

const UGCGallery: React.FC<UGCGalleryProps> = ({ items, autoScrollSpeed = 0.5 }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);
  const rafRef = useRef<number>();
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const [mutedVideos, setMutedVideos] = useState<{ [key: number]: boolean }>({});
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  // Triple the items for seamless infinite loop
  const loopedItems = [...items, ...items, ...items];

  // Auto-scroll animation
  useEffect(() => {
    const animate = () => {
      if (!scrollContainerRef.current) return;

      // Only scroll if not paused
      if (!isPaused) {
        scrollPositionRef.current += autoScrollSpeed;

        const cardWidth = 300;
        const totalWidth = cardWidth * items.length;

        // Reset position for infinite loop
        if (scrollPositionRef.current >= totalWidth) {
          scrollPositionRef.current = 0;
        }

        scrollContainerRef.current.scrollLeft = scrollPositionRef.current;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [items.length, autoScrollSpeed, isPaused]);

  const handleVideoHover = (index: number, isHovering: boolean) => {
    setIsPaused(isHovering);
    setHoveredVideo(isHovering ? index : null);
  };

  const toggleMute = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRefs.current[index];
    if (video) {
      video.muted = !video.muted;
      setMutedVideos(prev => ({
        ...prev,
        [index]: video.muted
      }));
    }
  };

  return (
    <div className="ugc-gallery-wrapper">
      {/* Left Fade */}
      <div className="ugc-fade ugc-fade-left"></div>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="ugc-scroll-container"
      >
        {loopedItems.map((item, index) => (
          <div 
            key={`${item.video}-${index}`} 
            className="ugc-video-card"
            onMouseEnter={() => handleVideoHover(index, true)}
            onMouseLeave={() => handleVideoHover(index, false)}
          >
            <div className="ugc-video-wrapper">
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={item.video}
                autoPlay
                loop
                muted
                playsInline
                className="ugc-video"
              />

              {/* Mute/Unmute Button - Only visible on hover */}
              {hoveredVideo === index && (
                <button
                  onClick={(e) => toggleMute(index, e)}
                  className="ugc-mute-btn"
                  aria-label={mutedVideos[index] ? 'Unmute' : 'Mute'}
                >
                  {mutedVideos[index] === false ? (
                    <Volume2 className="w-5 h-5" />
                  ) : (
                    <VolumeX className="w-5 h-5" />
                  )}
                </button>
              )}

              {/* Stats Overlay */}
              <div className="ugc-stats">
                <div className="ugc-stat">
                  <Eye className="w-4 h-4" />
                  <span>{item.views}</span>
                </div>
                <div className="ugc-stat">
                  <Heart className="w-4 h-4" />
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Fade */}
      <div className="ugc-fade ugc-fade-right"></div>
    </div>
  );
};

export default UGCGallery;
