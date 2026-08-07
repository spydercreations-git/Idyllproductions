import React, { useEffect, useState } from 'react';

interface StickyBlurOverlayProps {
  startAt?: number;
  maxIntensity?: number;
  className?: string;
}

const StickyBlurOverlay: React.FC<StickyBlurOverlayProps> = ({ 
  startAt = 200, 
  maxIntensity = 0.8,
  className = ""
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [intensity, setIntensity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      if (currentScrollY <= startAt) {
        setIntensity(0);
      } else {
        const progress = Math.min((currentScrollY - startAt) / 1000, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 2); // Ease out
        setIntensity(easeProgress * maxIntensity);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [startAt, maxIntensity]);

  if (intensity === 0) return null;

  return (
    <div 
      className={`fixed inset-0 pointer-events-none z-50 transition-all duration-500 ${className}`}
      style={{
        background: `radial-gradient(circle at center, transparent 20%, rgba(255, 255, 255, ${intensity * 0.3}) 60%, rgba(255, 255, 255, ${intensity * 0.6}) 100%)`,
        backdropFilter: `blur(${intensity * 15}px) saturate(${1 + intensity * 0.5})`,
        WebkitBackdropFilter: `blur(${intensity * 15}px) saturate(${1 + intensity * 0.5})`,
        opacity: intensity,
      }}
    >
      {/* Gradient overlay patterns */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(37, 99, 235, ${intensity * 0.1}) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(168, 85, 247, ${intensity * 0.1}) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(59, 130, 246, ${intensity * 0.05}) 0%, transparent 70%)
          `
        }}
      />
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full animate-pulse"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              opacity: intensity * 0.3,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default StickyBlurOverlay;