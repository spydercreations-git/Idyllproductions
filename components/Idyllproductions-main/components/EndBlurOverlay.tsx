import React, { useEffect, useState } from 'react';

interface EndBlurOverlayProps {
  triggerFromBottom?: number;
  maxIntensity?: number;
}

const EndBlurOverlay: React.FC<EndBlurOverlayProps> = ({ 
  triggerFromBottom = 800, 
  maxIntensity = 0.9 
}) => {
  const [intensity, setIntensity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollBottom = documentHeight - scrollTop - windowHeight;

      if (scrollBottom <= triggerFromBottom) {
        // Calculate intensity based on how close we are to the bottom
        const progress = Math.max(0, Math.min(1, (triggerFromBottom - scrollBottom) / triggerFromBottom));
        const easeProgress = 1 - Math.pow(1 - progress, 2); // Ease out
        setIntensity(easeProgress * maxIntensity);
      } else {
        setIntensity(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [triggerFromBottom, maxIntensity]);

  if (intensity === 0) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-40 transition-all duration-700"
      style={{
        background: `
          radial-gradient(circle at center bottom, 
            rgba(255, 255, 255, ${intensity * 0.4}) 0%, 
            rgba(255, 255, 255, ${intensity * 0.2}) 40%, 
            transparent 70%
          ),
          linear-gradient(to top, 
            rgba(255, 255, 255, ${intensity * 0.6}) 0%, 
            rgba(255, 255, 255, ${intensity * 0.3}) 30%, 
            transparent 60%
          )
        `,
        backdropFilter: `blur(${intensity * 20}px) saturate(${1 + intensity * 0.3})`,
        WebkitBackdropFilter: `blur(${intensity * 20}px) saturate(${1 + intensity * 0.3})`,
        opacity: intensity,
      }}
    >
      {/* Gradient particles floating up */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-300 rounded-full animate-pulse"
            style={{
              left: `${10 + i * 12}%`,
              bottom: `${-10 + Math.sin(i) * 20}%`,
              opacity: intensity * 0.4,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + i * 0.5}s`,
              transform: `translateY(${-intensity * 100}px)`,
              transition: 'transform 0.7s ease-out',
            }}
          />
        ))}
      </div>

      {/* Soft vignette effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center bottom, 
            transparent 30%, 
            rgba(37, 99, 235, ${intensity * 0.05}) 60%, 
            rgba(37, 99, 235, ${intensity * 0.1}) 100%
          )`
        }}
      />
    </div>
  );
};

export default EndBlurOverlay;