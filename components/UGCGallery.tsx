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
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const [mutedVideos, setMutedVideos] = useState<{ [key: number]: boolean }>({});
  const [loadingVideos, setLoadingVideos] = useState<{ [key: number]: boolean }>({});
  const [showMobileMessage, setShowMobileMessage] = useState(false);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  useEffect(() => {
    // Check if mobile and show message
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      setShowMobileMessage(true);
      const timer = setTimeout(() => {
        setShowMobileMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Split items into 3 columns for desktop
  const column1Items = items.filter((_, i) => i % 3 === 0);
  const column2Items = items.filter((_, i) => i % 3 === 1);
  const column3Items = items.filter((_, i) => i % 3 === 2);

  // Double items for seamless loop
  const column1Loop = [...column1Items, ...column1Items];
  const column2Loop = [...column2Items, ...column2Items];
  const column3Loop = [...column3Items, ...column3Items];

  const handleVideoHover = (index: number, isHovering: boolean) => {
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

  const handleVideoLoadStart = (index: number) => {
    setLoadingVideos(prev => ({ ...prev, [index]: true }));
  };

  const handleVideoCanPlay = (index: number) => {
    setLoadingVideos(prev => ({ ...prev, [index]: false }));
  };

  const renderVideoCard = (item: UGCItem, index: number, columnIndex: number) => (
    <div 
      key={`${item.video}-${columnIndex}-${index}`} 
      className="ugc-video-card-grid"
      onMouseEnter={() => handleVideoHover(index, true)}
      onMouseLeave={() => handleVideoHover(index, false)}
    >
      <div className="ugc-video-wrapper">
        <div className="ugc-video-inner">
          {/* Loading Animation */}
          {loadingVideos[index] && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}

          <video
            ref={(el) => (videoRefs.current[index] = el)}
            src={item.video}
            autoPlay
            loop
            muted
            playsInline
            className="ugc-video"
            onLoadStart={() => handleVideoLoadStart(index)}
            onCanPlay={() => handleVideoCanPlay(index)}
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
    </div>
  );

  return (
    <div className="ugc-gallery-grid-wrapper">
      {/* Mobile Message - Shows for 5 seconds */}
      {showMobileMessage && (
        <div className="ugc-mobile-message">
          <p>💡 For better layout, switch to desktop site</p>
        </div>
      )}

      {/* Column 1 - Scrolls Down */}
      <div className="ugc-column ugc-column-down">
        <div className="ugc-column-content">
          {column1Loop.map((item, index) => renderVideoCard(item, index, 1))}
        </div>
      </div>

      {/* Column 2 - Scrolls Up */}
      <div className="ugc-column ugc-column-up">
        <div className="ugc-column-content">
          {column2Loop.map((item, index) => renderVideoCard(item, index, 2))}
        </div>
      </div>

      {/* Column 3 - Scrolls Down */}
      <div className="ugc-column ugc-column-down">
        <div className="ugc-column-content">
          {column3Loop.map((item, index) => renderVideoCard(item, index, 3))}
        </div>
      </div>

      {/* Top Fade */}
      <div className="ugc-grid-fade ugc-grid-fade-top"></div>
      
      {/* Bottom Fade */}
      <div className="ugc-grid-fade ugc-grid-fade-bottom"></div>
    </div>
  );
};

export default UGCGallery;
