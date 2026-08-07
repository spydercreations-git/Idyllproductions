import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface VideoSectionRouterProps {
  onCategorySelect: (category: string) => void;
}

const VideoSectionRouter: React.FC<VideoSectionRouterProps> = ({ onCategorySelect }) => {
  const location = useLocation();

  useEffect(() => {
    // Map URL paths to video categories
    const pathToCategoryMap: { [key: string]: string } = {
      '/short-form': 'Short-Form Content',
      '/long-form': 'Long-Form',
      '/saas-tech': 'SaaS & Tech Videos',
      '/gaming': 'Gaming Content',
      '/rhythmic-montage': 'Rhythmic Montage'
    };

    const category = pathToCategoryMap[location.pathname];
    
    if (category) {
      // Multiple aggressive scroll-to-top approaches
      const forceScrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Force on next frame
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        });
      };
      
      // Execute immediately
      forceScrollToTop();
      
      // Set the category
      onCategorySelect(category);
      
      // Scroll to the work section after ensuring we're at top
      setTimeout(() => {
        // Force scroll to top again before scrolling to section
        forceScrollToTop();
        
        setTimeout(() => {
          const workSection = document.getElementById('our-work');
          if (workSection) {
            // Ensure we start from top before smooth scrolling to section
            forceScrollToTop();
            
            setTimeout(() => {
              workSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
              });
            }, 100);
          }
        }, 100);
      }, 50);
    }
  }, [location.pathname, onCategorySelect]);

  return null;
};

export default VideoSectionRouter;