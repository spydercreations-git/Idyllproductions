import React, { useRef, useState, useCallback } from 'react';

const LIBRARY_ID = '644758';

/** Convert a Bunny player URL or raw video ID to an embed URL with optional params */
export function bunnyEmbed(
  src: string,
  opts: { autoplay?: boolean; loop?: boolean; muted?: boolean; controls?: boolean; preload?: boolean; background?: boolean } = {}
): string {
  const videoId = src.includes('mediadelivery.net') ? src.split('/').pop()! : src;
  const p = new URLSearchParams();
  if (opts.autoplay)            p.set('autoplay', 'true');
  if (opts.loop)                p.set('loop', 'true');
  if (opts.muted)               p.set('muted', 'true');
  if (opts.controls === false)  p.set('controls', 'false');
  if (opts.preload)             p.set('preload', 'true');
  if (opts.background)          p.set('background', 'true');
  
  const qs = p.toString() ? `?${p.toString()}` : '';
  return `https://iframe.mediadelivery.net/embed/${LIBRARY_ID}/${videoId}${qs}`;
}

interface BunnyFrameProps {
  /** Bunny player URL (https://player.mediadelivery.net/play/…) or bare video ID */
  src: string;
  className?: string;
  style?: React.CSSProperties;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  /** Show Bunny's built-in player controls (default true) */
  controls?: boolean;
  /** Background/silent mode — hides all player UI, forces autoplay+loop+muted */
  background?: boolean;
}

/** Renders a Bunny.net video as a responsive iframe */
export const BunnyFrame: React.FC<BunnyFrameProps> = ({
  src,
  className = '',
  style,
  autoPlay = true,
  loop = true,
  muted = true,
  controls = true,
  background = false,
}) => {
  const embedUrl = bunnyEmbed(src, { autoplay: autoPlay, loop, muted, controls, preload: true, background });
  return (
    <iframe
      src={embedUrl}
      className={className}
      style={{ border: 'none', width: '100%', height: '100%', ...style }}
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
      loading="lazy"
    />
  );
};

// ─── HoverBunnyVideo ──────────────────────────────────────────────────────────
// A video card that:
//  • Autoplays muted + loops by default (no player UI)
//  • On hover: shows a mute/unmute button overlay; reloads iframe unmuted
//  • On leave: reloads iframe muted (unless user manually unmuted and wants to keep audio)
//  • Manual unmute click keeps audio until user clicks mute again

interface HoverBunnyVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  /** aspect ratio wrapper class, e.g. "aspect-video" or "aspect-[9/16]" */
  aspectClass?: string;
}

export const HoverBunnyVideo: React.FC<HoverBunnyVideoProps> = ({
  src,
  className = '',
  style,
  aspectClass = 'aspect-video',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  // manuallyUnmuted = user explicitly clicked unmute; stays unmuted even after hover leaves
  const [manuallyUnmuted, setManuallyUnmuted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const mutedUrl   = bunnyEmbed(src, { autoplay: true, loop: true, muted: true,  controls: false, preload: true });
  const unmutedUrl = bunnyEmbed(src, { autoplay: true, loop: true, muted: false, controls: false, preload: true });

  const currentSrc = isMuted ? mutedUrl : unmutedUrl;

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Don't change mute state on hover — user controls it via button
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // If not manually unmuted, mute again when cursor leaves
    if (!manuallyUnmuted) {
      setIsMuted(true);
    }
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMuted) {
      // Unmuting — mark as manually unmuted
      setIsMuted(false);
      setManuallyUnmuted(true);
    } else {
      // Muting — clear manual flag
      setIsMuted(true);
      setManuallyUnmuted(false);
    }
  };

  return (
    <div
      className={`relative overflow-hidden ${aspectClass} ${className}`}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <iframe
        key={currentSrc}
        src={currentSrc}
        style={{ border: 'none', width: '100%', height: '100%', display: 'block' }}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />

      {/* Hover overlay — mute/unmute button */}
      <div
        className="absolute inset-0 flex items-end justify-end p-3 transition-opacity duration-200"
        style={{
          opacity: isHovered ? 1 : 0,
          pointerEvents: isHovered ? 'all' : 'none',
          background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 40%)',
          zIndex: 20,
        }}
      >
        <button
          onClick={handleToggleMute}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-black/80 transition-all duration-200"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? (
            /* Muted icon */
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            /* Unmuted icon */
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default BunnyFrame;
