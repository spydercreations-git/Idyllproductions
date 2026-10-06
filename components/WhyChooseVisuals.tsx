import React, { useState, useEffect } from 'react';
import Play from 'lucide-react/dist/esm/icons/play';
import Check from 'lucide-react/dist/esm/icons/check';
import Volume2 from 'lucide-react/dist/esm/icons/volume-2';
import Sparkles from 'lucide-react/dist/esm/icons/sparkles';
import Film from 'lucide-react/dist/esm/icons/film';
import Scissors from 'lucide-react/dist/esm/icons/scissors';
import Maximize2 from 'lucide-react/dist/esm/icons/maximize-2';
import { HERO_VIDEO_URL } from '../constants/videoUrls';

// Shared fallback video URL
const VIDEO_SRC = HERO_VIDEO_URL || "https://res.cloudinary.com/dxd79mrse/video/upload/v1772768013/herte_m9iiue.mp4";

// ─────────────────────────────────────────────────────────────────────────────
// 1. Clean Storytelling Visual
// ─────────────────────────────────────────────────────────────────────────────
export const CleanStorytellingVisual: React.FC = () => {
  return (
    <div className="w-full h-44 bg-slate-950 rounded-2xl mb-6 relative overflow-hidden border border-slate-800 shadow-inner flex flex-col justify-between p-2.5 select-none group">
      {/* Top Monitor Bar */}
      <div className="flex items-center justify-between px-1.5 py-0.5 z-20">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-red-400 bg-red-950/70 border border-red-800/50 px-1.5 py-0.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            REC 00:00:14:18
          </span>
          <span className="text-[9px] font-mono font-bold text-slate-400 hidden sm:inline">PRORES 422</span>
        </div>
        <span className="text-[9px] font-bold text-orange-400 bg-orange-950/70 border border-orange-800/50 px-2 py-0.5 rounded flex items-center gap-1">
          <Scissors className="w-2.5 h-2.5" />
          SILENCE AUTO-TRIMMED
        </span>
      </div>

      {/* Main Video Monitor */}
      <div className="relative w-full flex-1 rounded-xl overflow-hidden bg-slate-900 mx-auto my-1 border border-slate-800/80">
        <video
          src={VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
        />

        {/* Dynamic Razor Scanline passing across */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#FF8156] to-transparent shadow-[0_0_12px_#FF8156]"
            style={{
              animation: 'cleanScan 4s ease-in-out infinite'
            }}
          />
        </div>

        {/* Dynamic Story Tag overlay */}
        <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1.5 bg-black/85 md:bg-black/70 md:backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
          <Film className="w-3 h-3 text-[#FF8156]" />
          <span className="text-[10px] font-bold text-white tracking-wide">Core Story: 100% Retention Focus</span>
        </div>

        <div className="absolute bottom-2 right-2 z-10 flex items-center gap-1 bg-emerald-500/90 text-white text-[9px] font-black px-1.5 py-0.5 rounded">
          <Check className="w-3 h-3" />
          <span>NOISE FREE</span>
        </div>
      </div>

      {/* Bottom Timeline with trimmed silence segments */}
      <div className="w-full px-1 z-20">
        <div className="w-full h-3 bg-slate-900 rounded flex items-center gap-1 px-1 border border-slate-800/90 relative overflow-hidden">
          {/* Active Story Block 1 */}
          <div className="h-1.5 bg-[#FF8156] rounded-sm w-[45%]" />
          {/* Trimmed Cut Marker */}
          <div className="h-2 w-1 bg-red-500/80 rounded-full animate-pulse" title="Cut point" />
          {/* Active Story Block 2 */}
          <div className="h-1.5 bg-gradient-to-r from-[#FF7A3A] to-[#F7931E] rounded-sm w-[40%]" />
          {/* Playhead */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_8px_#ffffff]"
            style={{
              animation: 'timelineScrub 4s linear infinite'
            }}
          />
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. Retention-Focused Pacing Visual
// ─────────────────────────────────────────────────────────────────────────────
export const RetentionPacingVisual: React.FC = () => {
  return (
    <div className="w-full h-44 bg-slate-950 rounded-2xl mb-6 relative overflow-hidden border border-slate-800 shadow-inner flex flex-col justify-between p-2.5 select-none group">
      {/* Top Header */}
      <div className="flex items-center justify-between px-1.5 py-0.5 z-20">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-slate-300">LIVE RETENTION ANALYTICS</span>
        </div>
        <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded">
          AVG WATCH: 94.8%
        </span>
      </div>

      {/* Middle Video + Retention Curve Overlay */}
      <div className="relative w-full flex-1 rounded-xl overflow-hidden bg-slate-900 my-1 border border-slate-800/80 flex items-center">
        {/* Background Looping Video */}
        <video
          src={VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-35"
        />

        {/* Retention Graph SVG */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="retentionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF8156" />
              <stop offset="35%" stopColor="#F7931E" />
              <stop offset="70%" stopColor="#FF8C00" />
              <stop offset="100%" stopColor="#FF8156" />
            </linearGradient>
            <linearGradient id="areaGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF8156" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FF8156" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="0" y1="25" x2="320" y2="25" stroke="rgba(255,255,255,0.06)" strokeDasharray="3,3" />
          <line x1="0" y1="50" x2="320" y2="50" stroke="rgba(255,255,255,0.06)" strokeDasharray="3,3" />
          <line x1="0" y1="75" x2="320" y2="75" stroke="rgba(255,255,255,0.06)" strokeDasharray="3,3" />

          {/* Competitor drop-off curve */}
          <path
            d="M 10,20 C 50,65 100,85 160,90 C 220,93 280,95 310,95"
            fill="none"
            stroke="#64748b"
            strokeWidth="1.5"
            strokeDasharray="4,4"
            opacity="0.6"
          />

          {/* Idyll High-Retention Area Fill */}
          <path
            d="M 10,20 C 40,16 65,22 100,15 C 135,10 165,26 200,18 C 235,12 270,24 310,18 L 310,98 L 10,98 Z"
            fill="url(#areaGlow)"
          />

          {/* Idyll Curve Line */}
          <path
            d="M 10,20 C 40,16 65,22 100,15 C 135,10 165,26 200,18 C 235,12 270,24 310,18"
            fill="none"
            stroke="url(#retentionGrad)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        {/* Gliding Playhead Line */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-[#FF8156] shadow-[0_0_10px_#FF8156] z-10"
          style={{
            animation: 'timelineScrub 4.5s linear infinite'
          }}
        >
          <div className="absolute top-1 -translate-x-[4px] w-2.5 h-2.5 rounded-full bg-[#FF8156] border-2 border-white shadow-md" />
        </div>

        {/* Floating Spike Pill */}
        <div className="absolute top-2 right-2 z-20 bg-black/90 md:bg-black/80 md:backdrop-blur-md px-2 py-0.5 rounded border border-orange-500/40 text-[9px] font-bold text-orange-400 flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-orange-400" />
          <span>Hook Spike +40%</span>
        </div>
      </div>

      {/* Baseline Legend */}
      <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 px-1 z-20">
        <span className="flex items-center gap-1">
          <span className="w-2 h-0.5 bg-[#FF8156]" /> Idyll Retention Curve
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-0.5 bg-slate-500 border-b border-dashed" /> Typical Drop-off
        </span>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. Platform-Specific Edits Visual
// ─────────────────────────────────────────────────────────────────────────────
export const PlatformSpecificVisual: React.FC = () => {
  const [platform, setPlatform] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPlatform((p) => ((p + 1) % 3) as 0 | 1 | 2);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const formats = [
    { name: 'TikTok', ratio: '9:16', width: '76px', height: '124px', label: 'Vertical Hook' },
    { name: 'Instagram', ratio: '1:1', width: '104px', height: '104px', label: 'Square Feed' },
    { name: 'YouTube', ratio: '16:9', width: '154px', height: '88px', label: 'Cinematic 4K' },
  ];

  return (
    <div className="w-full h-44 bg-slate-950 rounded-2xl mb-6 relative overflow-hidden border border-slate-800 shadow-inner flex flex-col justify-between p-2.5 select-none group">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-1.5 py-0.5 z-20">
        <span className="text-[10px] font-mono font-bold text-slate-300 flex items-center gap-1">
          <Maximize2 className="w-3 h-3 text-[#FF8156]" />
          MULTI-RATIO RE-FRAMING
        </span>
        <span className="text-[9px] font-bold text-orange-400 bg-orange-950/80 border border-orange-800/60 px-2 py-0.5 rounded">
          {formats[platform].ratio} ACTIVE
        </span>
      </div>

      {/* Morphing Video Frame */}
      <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden">
        <div
          className="relative rounded-xl overflow-hidden border-2 border-[#FF8156]/80 shadow-[0_0_20px_rgba(255, 129, 86,0.3)] transition-all duration-700 ease-out flex items-center justify-center bg-black"
          style={{
            width: formats[platform].width,
            height: formats[platform].height,
          }}
        >
          {/* Live Playing Video */}
          <video
            src={VIDEO_SRC}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Social Platform UI overlays based on platform */}
          {platform === 0 && (
            <div className="absolute right-1 bottom-4 flex flex-col items-center gap-1.5 pointer-events-none">
              <div className="w-4 h-4 rounded-full bg-black/70 md:bg-black/40 md:backdrop-blur-sm flex items-center justify-center text-[7px] text-white">❤️</div>
              <div className="w-4 h-4 rounded-full bg-black/70 md:bg-black/40 md:backdrop-blur-sm flex items-center justify-center text-[7px] text-white">💬</div>
            </div>
          )}

          {platform === 1 && (
            <div className="absolute top-1 left-1 bg-black/60 px-1.5 py-0.5 rounded text-[7px] font-bold text-white">
              @madebyidyll
            </div>
          )}

          {platform === 2 && (
            <div className="absolute bottom-1 left-1.5 right-1.5 h-1 bg-red-600 rounded-full shadow" />
          )}

          {/* Center Format Badge */}
          <span className="absolute bottom-1 right-1 bg-black/90 md:bg-black/80 md:backdrop-blur-sm px-1.5 py-0.5 rounded text-[8px] font-mono font-bold text-white border border-white/20">
            {formats[platform].ratio}
          </span>
        </div>
      </div>

      {/* Platform Switcher Buttons */}
      <div className="flex items-center justify-center gap-3 z-20">
        {formats.map((f, i) => (
          <button
            key={f.name}
            onClick={() => setPlatform(i as 0 | 1 | 2)}
            className={`text-[9px] font-bold px-2 py-0.5 rounded-full transition-all duration-300 ${
              platform === i
                ? 'bg-[#FF8156] text-white shadow-[0_0_10px_#FF8156]'
                : 'text-slate-400 bg-slate-900 hover:text-white'
            }`}
          >
            {f.name} ({f.ratio})
          </button>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. Sound Design & Motion Visual
// ─────────────────────────────────────────────────────────────────────────────
export const SoundDesignVisual: React.FC = () => {
  return (
    <div className="w-full h-44 bg-slate-950 rounded-2xl mb-6 relative overflow-hidden border border-slate-800 shadow-inner flex flex-col justify-between p-2.5 select-none group">
      {/* Top Header */}
      <div className="flex items-center justify-between px-1.5 py-0.5 z-20">
        <div className="flex items-center gap-2">
          <Volume2 className="w-3.5 h-3.5 text-[#FF8156] animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-slate-300">MASTER AUDIO SUITE (48kHz)</span>
        </div>
        <span className="text-[9px] font-mono font-bold text-orange-400 bg-orange-950/80 border border-orange-800/60 px-2 py-0.5 rounded">
          STEREO DUCKED
        </span>
      </div>

      {/* Upper Mini Monitor + Lower DAW Tracks */}
      <div className="flex items-center gap-2 my-1 flex-1">
        {/* Mini Video Monitor */}
        <div className="w-28 h-full rounded-xl overflow-hidden bg-black relative border border-slate-800/80 flex-shrink-0">
          <video
            src={VIDEO_SRC}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute top-1 left-1 bg-black/70 px-1 py-0.5 rounded text-[7px] font-mono text-emerald-400">
            SYNCED
          </div>
        </div>

        {/* Live Multi-Track Equalizer Bars */}
        <div className="flex-1 flex flex-col justify-between h-full py-0.5">
          {/* Track 1: VO (Voiceover) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-lg px-2 py-1 flex items-center justify-between">
            <span className="text-[8px] font-mono font-bold text-orange-400">VO</span>
            <div className="flex items-center gap-0.5 h-3 flex-1 px-2">
              {[6, 12, 18, 9, 15, 22, 14, 8, 16, 24, 18, 10, 15, 20, 12, 8].map((h, idx) => (
                <div
                  key={idx}
                  className="w-1 bg-gradient-to-t from-orange-600 to-amber-400 rounded-full transition-all duration-200"
                  style={{
                    height: `${h}px`,
                    animation: `soundBounce 0.8s ease-in-out infinite alternate`,
                    animationDelay: `${idx * 0.05}s`
                  }}
                />
              ))}
            </div>
            <span className="text-[7px] font-mono text-slate-400">-3dB</span>
          </div>

          {/* Track 2: SFX */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-lg px-2 py-1 flex items-center justify-between">
            <span className="text-[8px] font-mono font-bold text-amber-400">SFX</span>
            <div className="flex items-center gap-1 h-3 flex-1 px-2">
              <div className="h-2 w-8 rounded-full bg-amber-500/80 animate-pulse" />
              <div className="h-1 w-2 rounded-full bg-amber-300" />
              <div className="h-2 w-12 rounded-full bg-amber-500/80 animate-pulse" />
            </div>
            <span className="text-[7px] font-mono text-slate-400">IMPACTS</span>
          </div>

          {/* Track 3: BGM */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-lg px-2 py-1 flex items-center justify-between">
            <span className="text-[8px] font-mono font-bold text-red-400">BGM</span>
            <div className="flex items-center gap-0.5 h-3 flex-1 px-2">
              {[4, 8, 12, 6, 10, 14, 8, 12, 6, 10, 8, 6, 10, 14, 8, 4].map((h, idx) => (
                <div
                  key={idx}
                  className="w-1 bg-gradient-to-t from-red-600 to-orange-400 rounded-full"
                  style={{
                    height: `${h}px`,
                    animation: `soundBounce 1.2s ease-in-out infinite alternate`,
                    animationDelay: `${idx * 0.08}s`
                  }}
                />
              ))}
            </div>
            <span className="text-[7px] font-mono text-slate-400">DUCKED</span>
          </div>
        </div>
      </div>

      {/* Audio Status Legend */}
      <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 px-1 z-20">
        <span>MASTER LIMITER: -0.1 dB</span>
        <span className="text-emerald-400 font-bold">100% BALANCED MIX</span>
      </div>
    </div>
  );
};
