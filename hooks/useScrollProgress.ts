import { useState, useEffect, useRef } from 'react';

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [activeSteps, setActiveSteps] = useState(new Set<number>());
  const sectionRef = useRef<HTMLElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const calculateProgress = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate when section is in viewport
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      const sectionHeight = rect.height;
      
      // Progress starts when section enters viewport (bottom of section at bottom of viewport)
      // Progress completes when section is centered in viewport
      const startPoint = windowHeight;
      const endPoint = windowHeight / 2 - sectionHeight / 2;
      
      let currentProgress = 0;
      
      if (sectionTop <= startPoint && sectionTop >= endPoint) {
        // Section is in the animation range
        const totalDistance = startPoint - endPoint;
        const currentDistance = startPoint - sectionTop;
        currentProgress = Math.max(0, Math.min(100, (currentDistance / totalDistance) * 100));
      } else if (sectionTop < endPoint) {
        // Section has scrolled past the center - full progress
        currentProgress = 100;
      }
      
      // Smooth progress update
      setProgress(currentProgress);
      
      // Update active steps based on progress
      const newActiveSteps = new Set<number>();
      if (currentProgress >= 25) newActiveSteps.add(1);
      if (currentProgress >= 50) newActiveSteps.add(2);
      if (currentProgress >= 75) newActiveSteps.add(3);
      if (currentProgress >= 100) newActiveSteps.add(4);
      
      setActiveSteps(newActiveSteps);
    };

    const handleScroll = () => {
      // Use requestAnimationFrame for smooth animation
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      animationFrameRef.current = requestAnimationFrame(() => {
        calculateProgress();
      });
    };

    // Listen to scroll events with passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    calculateProgress();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return {
    progress,
    activeSteps,
    sectionRef
  };
};