import React, { CSSProperties } from 'react';

interface GlassSurfaceProps {
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  className?: string;
  displace?: number;
  distortionScale?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  brightness?: number;
  opacity?: number;
  mixBlendMode?: CSSProperties['mixBlendMode'];
  border?: string;
}

const GlassSurface: React.FC<GlassSurfaceProps> = ({
  children,
  width = '100%',
  height = 'auto',
  borderRadius = 12,
  className = '',
  displace = 0.3,
  distortionScale = -100,
  redOffset = 0,
  greenOffset = 5,
  blueOffset = 10,
  brightness = 60,
  opacity = 0.9,
  mixBlendMode = 'normal',
  border,
}) => {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  });

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const blurAmount = Math.abs(distortionScale) / 10;
  
  const style: CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: `${borderRadius}px`,
    opacity,
    mixBlendMode,
    backdropFilter: isMobile ? 'none' : `blur(${blurAmount}px) brightness(${brightness}%) saturate(120%)`,
    WebkitBackdropFilter: isMobile ? 'none' : `blur(${blurAmount}px) brightness(${brightness}%) saturate(120%)`,
    background: isMobile ? 'rgba(255, 255, 255, 0.95)' : `rgba(255, 255, 255, ${displace * 0.3})`,
    border: border || '1px solid rgba(255, 255, 255, 0.3)',
  };

  return (
    <div className={`glass-surface ${className}`} style={style}>
      {children}
    </div>
  );
};

export default GlassSurface;
