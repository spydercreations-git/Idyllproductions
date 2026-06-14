import React, { useEffect, useState } from 'react';
import { Eye, Heart } from 'lucide-react';
import './UGCGallery.css';
import HlsVideo from './HlsVideo';

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
  const [showMobileMessage, setShowMobileMessage] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      setShowMobileMessage(true);
      const timer = setTimeout(() => setShowMobileMessage(false), 5000);
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

  const renderVideoCard = (item: UGCItem, index: number, columnIndex: number) => (
    <div
      key={`${item.video}-${columnIndex}-${index}`}
      className="ugc-video-card-grid"
    >
      <div className="ugc-video-wrapper">
        <div className="ugc-video-inner">
          {/* Plain native HLS video — no player UI, autoplay, loop, muted */}
          <HlsVideo
            src={item.video}
            muted
            loop
            objectFit="cover"
            className="ugc-video"
          />

          {/* Stats Overlay */}
          <div className="ugc-stats" style={{ zIndex: 20 }}>
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
