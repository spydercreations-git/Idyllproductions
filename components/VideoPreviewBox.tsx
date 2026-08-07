import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { gsap } from 'gsap';
import './VideoPreviewBox.css';
import { HoverHlsVideo } from './HlsVideo';

interface VideoPreviewBoxProps {
  isOpen: boolean;
  onClose: () => void;
  videos: string[];
  categoryName: string;
  originY: number;
}

const VideoPreviewBox: React.FC<VideoPreviewBoxProps> = ({
  isOpen,
  onClose,
  videos,
  categoryName,
  originY
}) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!boxRef.current || !contentRef.current) return;

    if (isOpen) {
      // Set initial state
      gsap.set(boxRef.current, {
        display: 'flex',
        scaleY: 0,
        transformOrigin: `center ${originY}px`,
        opacity: 0
      });

      gsap.set(contentRef.current, {
        opacity: 0,
        y: 20
      });

      // Animate in
      const tl = gsap.timeline();
      tl.to(boxRef.current, {
        scaleY: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'expo.out'
      }).to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out'
      }, '-=0.2');
    } else {
      // Animate out
      const tl = gsap.timeline({
        onComplete: () => {
          if (boxRef.current) {
            gsap.set(boxRef.current, { display: 'none' });
          }
        }
      });

      tl.to(contentRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: 'power2.in'
      }).to(boxRef.current, {
        scaleY: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'expo.in'
      }, '-=0.1');
    }
  }, [isOpen, originY]);

  if (!isOpen && !boxRef.current) return null;

  return (
    <div ref={boxRef} className="video-preview-box">
      <div ref={contentRef} className="video-preview-content">
        {/* Header */}
        <div className="video-preview-header">
          <h2 className="video-preview-title">{categoryName}</h2>
          <button onClick={onClose} className="video-preview-close" aria-label="Close">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Video Grid */}
        <div className="video-preview-grid">
          {videos.map((video, index) => (
            <div key={index} className="video-preview-item">
              <div className="video-preview-wrapper">
                <HoverHlsVideo
                  src={video}
                  aspectClass="aspect-video"
                  className="w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPreviewBox;
