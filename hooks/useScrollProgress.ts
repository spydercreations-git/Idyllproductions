import { useState, useEffect, useRef } from 'react';

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [activeSteps, setActiveSteps] = useState(new Set<number>());
  const sectionRef = useRef<HTMLElement>(null);
  const maxProgressRef = useRef(0); // Track maximum progress achieved
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const calculateProgress = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const viewportCenter = windowHeight / 2;
      
      // Calculate section center position
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const sectionCenter = sectionTop + (sectionHeight / 2);
      
      // Animation range: section enters viewport to section center hits viewport center
      const animationStart = windowHeight; // Section top at viewport bottom
      const animationComplete = viewportCenter; // Section center at viewport center
      
      let currentScrollProgress = 0;
      
      if (sectionTop <= animationStart && sectionCenter >= animationComplete) {
        // Section is in the animation range
        const totalAnimationDistance = animationStart - animationComplete;
        const currentAnimationDistance = animationStart - sectionTop;
        currentScrollProgress = Math.max(0, Math.min(100, (currentAnimationDistance / totalAnimationDistance) * 100));
      } else if (sectionCenter < animationComplete) {
        // Section center has passed viewport center - full progress
        currentScrollProgress = 100;
      }
      // Before section enters, currentScrollProgress stays at 0
      
      // Only update progress if it's higher than the maximum achieved (forward-only)
      if (currentScrollProgress > maxProgressRef.current) {
        maxProgressRef.current = currentScrollProgress;
        setProgress(currentScrollProgress);
        
        // Update active steps based on new maximum progress
        const newActiveSteps = new Set<number>();
        if (currentScrollProgress >= 25) newActiveSteps.add(1);
        if (currentScrollProgress >= 50) newActiveSteps.add(2);
        if (currentScrollProgress >= 75) newActiveSteps.add(3);
        if (currentScrollProgress >= 100) newActiveSteps.add(4); // "Deliver & Optimize" completes
        
        setActiveSteps(newActiveSteps);
      }
      // If currentScrollProgress is less than max, keep the existing progress and activeSteps (forward-only)
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