import React, { useEffect, useState } from 'react';

interface GradualBlurProps {
  children: React.ReactNode;
  maxBlur?: number;
  startBlurAt?: number;
  endBlurAt?: number;
}

const GradualBlur: React.FC<GradualBlurProps> = ({ 
  children, 
  maxBlur = 10, 
  startBlurAt = 100, 
  endBlurAt = 500 
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [blurAmount, setBlurAmount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Calculate blur amount based on scroll position
      if (currentScrollY <= startBlurAt) {
        setBlurAmount(0);
      } else if (currentScrollY >= endBlurAt) {
        setBlurAmount(maxBlur);
      } else {
        const progress = (currentScrollY - startBlurAt) / (endBlurAt - startBlurAt);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
        setBlurAmount(easeProgress * maxBlur);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [maxBlur, startBlurAt, endBlurAt]);

  return (
    <div 
      className="transition-all duration-300 ease-out"
      style={{
        filter: `blur(${blurAmount}px)`,
        transform: `scale(${1 - blurAmount * 0.01})`, // Slight scale down as it blurs
        opacity: Math.max(0.3, 1 - blurAmount * 0.08), // Fade out as it blurs
      }}
    >
      {children}
    </div>
  );
};

export default GradualBlur;