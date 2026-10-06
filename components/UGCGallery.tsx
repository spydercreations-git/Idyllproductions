import React, { useEffect, useState } from 'react';
import Eye from 'lucide-react/dist/esm/icons/eye';
import Heart from 'lucide-react/dist/esm/icons/heart';
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

const UGCGallery: React.FC<UGCGalleryProps> = ({ items }) => {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Split items into 3 columns for desktop
  const column1Items = items.filter((_, i) => i % 3 === 0);
  const column2Items = items.filter((_, i) => i % 3 === 1);
  const column3Items = items.filter((_, i) => i % 3 === 2);

  // Double items for seamless loop on desktop
  const column1Loop = [...column1Items, ...column1Items];
  const column2Loop = [...column2Items, ...column2Items];
  const column3Loop = [...column3Items, ...column3Items];

  const renderVideoCard = (item: UGCItem, key: string) => (
    <div key={key} className="ugc-video-card-grid">
      <div className="ugc-video-wrapper">
        <div className="ugc-video-inner">
          <HlsVideo
            src={item.video}
            muted
            loop
            objectFit="cover"
            className="ugc-video"
          />

          {/* Stats Overlay - solid 70% dark background, zero backdrop-filter */}
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

  // On mobile: remove this UGC gallery so mobile stays ultra-fast;
  // all UGC videos are presented in the "Our Work" category section below.
  if (isMobile) {
    return null;
  }

  // Desktop: 3 infinite scrolling columns
  return (
    <div className="ugc-gallery-grid-wrapper">
      {/* Column 1 - Scrolls Down */}
      <div className="ugc-column ugc-column-down">
        <div className="ugc-column-content">
          {column1Loop.map((item, index) =>
            renderVideoCard(item, `col1-${item.video}-${index}`)
          )}
        </div>
      </div>

      {/* Column 2 - Scrolls Up */}
      <div className="ugc-column ugc-column-up">
        <div className="ugc-column-content">
          {column2Loop.map((item, index) =>
            renderVideoCard(item, `col2-${item.video}-${index}`)
          )}
        </div>
      </div>

      {/* Column 3 - Scrolls Down */}
      <div className="ugc-column ugc-column-down">
        <div className="ugc-column-content">
          {column3Loop.map((item, index) =>
            renderVideoCard(item, `col3-${item.video}-${index}`)
          )}
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

