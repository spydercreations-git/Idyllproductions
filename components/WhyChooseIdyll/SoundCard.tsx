import React, { useEffect, useRef } from 'react';

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// Deterministic random numbers
let seed = 7;
const rnd = () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};
const NOISE = Array.from({ length: 400 }, () => rnd());

const SPEECH = [
  [0.1, 0.4],
  [0.52, 0.88]
];

const vo = (x: number) => {
  let a = 0;
  for (const [s, e] of SPEECH) {
    a = Math.max(a, clamp((x - s) / 0.02) * clamp((e - x) / 0.02));
  }
  return a;
};

const duck = (x: number) => {
  let d = 0;
  for (const [s, e] of SPEECH) {
    d = Math.max(d, clamp((x - s + 0.04) / 0.04) * clamp((e + 0.04 - x) / 0.04));
  }
  return 1 - 0.62 * d;
};

const HITS = [
  { x: 0.04, a: 0.9, w: 0.05 },
  { x: 0.47, a: 0.7, w: 0.04 },
  { x: 0.92, a: 1, w: 0.06 }
];

const voA = (x: number) =>
  vo(x) * (0.3 + 0.7 * Math.abs(Math.sin(x * 95)) * (0.5 + 0.5 * NOISE[Math.floor(x * 399)]));

const fxA = (x: number) => {
  let a = 0;
  for (const h of HITS) {
    if (x >= h.x && x < h.x + h.w) {
      a = Math.max(a, h.a * Math.exp((-(x - h.x) / h.w) * 4));
    }
  }
  return a;
};

const muA = (x: number) => duck(x) * (0.45 + 0.25 * NOISE[(Math.floor(x * 399) + 137) % 400]);

const LANES = [{ f: voA }, { f: fxA }, { f: muA }];

interface SoundCardProps {
  isVisibleOnScroll?: boolean;
}

export const SoundCard = React.forwardRef<HTMLDivElement, SoundCardProps>(
  ({ isVisibleOnScroll = true }, forwardedRef) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mlRef = useRef<HTMLElement>(null);
    const mrRef = useRef<HTMLElement>(null);

    const setCardRef = (node: HTMLDivElement | null) => {
      cardRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    };

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0;
    let H = 0;
    let lvl = 0;

    const updateSize = () => {
      if (!cv) return;
      const rect = cv.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      W = rect.width;
      H = rect.height;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const rr = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(x, y, w, h, r);
      } else {
        ctx.rect(x, y, w, h);
      }
    };

    const renderFrame = (t: number) => {
      if (!W || !H) return;
      const play = clamp(t / 5600);

      // Colors matching the brand palette
      const C = {
        lane: '#F7F8FA',
        acc: '#FF8156',
        acc2: '#FF9A57',
        mute: '#D3D8E0',
        fg: '#0F172A',
        fg2: '#4B5565'
      };

      ctx.clearRect(0, 0, W, H);
      const LH = 34;
      const GAP = 8;
      const step = 3;

      LANES.forEach((ln, li) => {
        const y0 = li * (LH + GAP);
        const mid = y0 + LH / 2;

        ctx.fillStyle = C.lane;
        rr(0, y0, W, LH, 7);
        ctx.fill();

        const col = li === 0 ? C.acc : li === 1 ? C.acc2 : C.fg2;

        for (let px = 4; px < W - 4; px += step) {
          const x = px / W;
          const a = ln.f(x);
          if (a < 0.02) continue;
          const h = Math.max(1.5, a * (LH - 8));
          ctx.fillStyle = x <= play ? col : C.mute;
          ctx.globalAlpha = x <= play ? 1 : 0.9;
          ctx.fillRect(px, mid - h / 2, 1.8, h);
        }
        ctx.globalAlpha = 1;

        if (li === 2) {
          ctx.beginPath();
          for (let px = 0; px <= W; px += 2) {
            const y = y0 + 5 + (1 - duck(px / W)) * (LH - 14);
            if (px) ctx.lineTo(px, y);
            else ctx.moveTo(px, y);
          }
          ctx.strokeStyle = C.acc;
          ctx.lineWidth = 1.4;
          ctx.globalAlpha = 0.9;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      });

      const phx = play * W;
      ctx.fillStyle = C.fg;
      ctx.fillRect(phx - 0.75, 0, 1.5, H);
      ctx.beginPath();
      ctx.moveTo(phx - 4, 0);
      ctx.lineTo(phx + 4, 0);
      ctx.lineTo(phx, 6);
      ctx.fill();

      const target = play < 1 ? Math.max(voA(play), fxA(play), muA(play) * 0.8) : 0;
      lvl += (target - lvl) * 0.25;

      if (mlRef.current) {
        mlRef.current.style.height = `${8 + lvl * 88}%`;
      }
      if (mrRef.current) {
        mrRef.current.style.height = `${6 + lvl * 84 * (0.9 + 0.1 * Math.sin(t / 90))}%`;
      }
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
      renderFrame(4200);
    });
    resizeObserver.observe(cv);

    if (prefersReducedMotion) {
      renderFrame(4200);
      return () => {
        resizeObserver.disconnect();
      };
    }

    let isIntersecting = false;
    let rafId: number;
    let last = performance.now();
    let currentT = 0;
    const LOOP = 6200;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          isIntersecting = entry.isIntersecting;
          if (isIntersecting) {
            last = performance.now();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    renderFrame(4200);

    const tick = (now: number) => {
      if (isIntersecting) {
        const dt = Math.min(64, now - last);
        currentT = (currentT + dt) % LOOP;
        renderFrame(currentT);
      }
      last = now;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      resizeObserver.disconnect();
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={setCardRef}
      className="why-card-wrap w-full"
      style={{
        transform: isVisibleOnScroll ? 'translateY(0)' : 'translateY(40px)',
        opacity: isVisibleOnScroll ? 1 : 0,
        transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: '300ms'
      }}
    >
      <div
        className="relative rounded-3xl overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-500 p-[2px] cursor-pointer h-full"
        style={{
          background: 'rgba(255, 107, 52, 0.15)'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = '#FF8156';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(255, 107, 52, 0.15)';
        }}
      >
        <div className="why-card-inner w-full h-full bg-white rounded-[22px] p-6 sm:p-8 flex flex-col justify-between">
          {/* Animation View - Sound Design & Motion */}
          <div className="why-viz snd" aria-hidden="true">
            <div className="lanes-l">
              <div className="lane-tag">
                <b>VO</b>
                <span className="mono">Voice</span>
              </div>
              <div className="lane-tag">
                <b>FX</b>
                <span className="mono">SFX</span>
              </div>
              <div className="lane-tag">
                <b>♪</b>
                <span className="mono">Music</span>
              </div>
            </div>
            <div className="snd-canvas">
              <canvas ref={canvasRef} />
            </div>
            <div className="meter">
              <i>
                <u ref={mlRef} />
              </i>
              <i>
                <u ref={mrRef} />
              </i>
            </div>
            <div className="snd-foot">
              <span className="mono">Mix · auto ducking</span>
              <span className="chip">Music −9 dB under voice</span>
            </div>
          </div>

          <div>
            <h3 className="font-sf-pro text-2xl sm:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
              Sound Design & Motion
            </h3>
            <p className="font-sf-pro text-[17px] sm:text-lg text-slate-600 leading-relaxed font-normal">
              Immersive audio and smooth motion graphics that enhance the story without overwhelming.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
);
SoundCard.displayName = 'SoundCard';
