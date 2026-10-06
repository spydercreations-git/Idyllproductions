import React, { useEffect, useRef } from 'react';

interface ClipDef {
  t: string;
  w: number;
  k: number;
  start: number;
  n: number;
  bars: { x: number; y: number; w: number; h: number }[];
}

const RAW_CLIPS = [
  { t: 'Hook', w: 13, k: 1 },
  { t: 'um, so…', w: 8, k: 0 },
  { t: 'Problem', w: 15, k: 1 },
  { t: 'dead air', w: 9, k: 0 },
  { t: 'Demo', w: 19, k: 1 },
  { t: 'retake', w: 10, k: 0 },
  { t: 'Payoff', w: 14, k: 1 },
  { t: 'ramble', w: 12, k: 0 }
];

// Precompute deterministic clip bars
const createClips = (): ClipDef[] => {
  let seed = 7;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  let acc = 0;
  return RAW_CLIPS.map(c => {
    const start = acc;
    acc += c.w;
    const n = Math.round(c.w * 1.8);
    const bars: { x: number; y: number; w: number; h: number }[] = [];
    for (let j = 0; j < n; j++) {
      const h = c.k ? 4 + rnd() * 14 : 1 + rnd() * 4;
      bars.push({
        x: j * 4,
        y: (20 - h) / 2,
        w: 2.4,
        h: parseFloat(h.toFixed(1))
      });
    }
    return { ...c, start, n, bars };
  });
};

const CLIPS = createClips();
const KEPT_TOTAL = CLIPS.filter(c => c.k).reduce((s, c) => s + c.w, 0);
const RAW = 47;
const FINAL = Math.round((RAW * KEPT_TOTAL) / 100);

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const fmt = (s: number) => `0:${String(Math.round(s)).padStart(2, '0')}`;

interface TimelineCardProps {
  isVisibleOnScroll?: boolean;
}

export const TimelineCard = React.forwardRef<HTMLDivElement, TimelineCardProps>(
  ({ isVisibleOnScroll = true }, forwardedRef) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const rowRef = useRef<HTMLDivElement>(null);
    const headRef = useRef<HTMLDivElement>(null);
    const stateRef = useRef<HTMLSpanElement>(null);
    const cutsRef = useRef<HTMLSpanElement>(null);
    const clipRefs = useRef<(HTMLDivElement | null)[]>([]);

    const setCardRef = (node: HTMLDivElement | null) => {
      cardRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    };

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderFrame = (t: number) => {
      let x = 0;
      let p = 0;
      let head = 1;
      let cuts = 0;
      let fade = 1;

      if (t < 2400) {
        x = (t / 2400) * 100;
      } else if (t < 3300) {
        x = 100;
        p = ease((t - 2400) / 900);
        head = 1 - clamp((t - 2400) / 200);
      } else if (t < 5900) {
        p = 1;
        x = ((t - 3300) / 2600) * KEPT_TOTAL;
        head = clamp((t - 3300) / 200);
      } else {
        p = 1;
        x = KEPT_TOTAL;
        fade = 1 - clamp((t - 6300) / 250);
        if (t > 6550) {
          p = 0;
          x = 0;
          fade = clamp((t - 6550) / 250);
        }
      }

      const sweep = t < 3300;
      CLIPS.forEach((c, i) => {
        const el = clipRefs.current[i];
        if (!el) return;
        const last = i === CLIPS.length - 1;
        if (c.k) {
          el.style.flex = `0 0 ${c.w}%`;
          el.style.marginRight = last ? '0' : '3px';
        } else {
          const isCut = (sweep && x > c.start + c.w / 2) || p > 0;
          if (isCut) {
            el.classList.add('cut');
            cuts++;
          } else {
            el.classList.remove('cut');
          }
          el.style.flex = `0 0 ${c.w * (1 - p)}%`;
          el.style.marginRight = last ? '0' : `${3 * (1 - p)}px`;
          el.style.opacity = `${1 - p}`;
        }
      });

      if (rowRef.current) rowRef.current.style.opacity = `${fade}`;
      if (headRef.current) {
        headRef.current.style.left = `${x}%`;
        headRef.current.style.opacity = `${head * fade}`;
      }
      if (cutsRef.current) cutsRef.current.textContent = `${cuts} cut${cuts === 1 ? '' : 's'}`;
      if (stateRef.current) {
        stateRef.current.textContent =
          (p < 1 ? 'Raw cut · ' : 'Final cut · ') + fmt(RAW - (RAW - FINAL) * p);
      }
    };

    if (prefersReducedMotion) {
      renderFrame(4200);
      return;
    }

    let isIntersecting = false;
    let rafId: number;
    let last = performance.now();
    let currentT = 0;
    const LOOP = 6800;

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
        transitionDelay: '0ms'
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
          {/* Animation View - Clean Storytelling Timeline */}
          <div className="why-viz tl" aria-hidden="true">
            <div className="tl-top">
              <div className="l">
                <span className="mono">Timeline</span>
                <span className="chip" ref={stateRef}>
                  Raw cut · 0:47
                </span>
              </div>
              <span className="mono" ref={cutsRef} style={{ fontVariantNumeric: 'tabular-nums' }}>
                0 cuts
              </span>
            </div>
            <div className="tl-track">
              <div className="tl-ruler" />
              <div className="tl-row" ref={rowRef}>
                {CLIPS.map((c, i) => (
                  <div
                    key={c.t + i}
                    ref={el => (clipRefs.current[i] = el)}
                    className={`clip ${c.k ? 'keep' : 'bad'}`}
                    style={{ flex: `0 0 ${c.w}%`, marginRight: i === CLIPS.length - 1 ? '0' : '3px' }}
                  >
                    <div className="clip-v">{c.t}</div>
                    <div className="clip-a">
                      <svg viewBox={`0 0 ${c.n * 4} 20`} preserveAspectRatio="none">
                        {c.bars.map((b, bi) => (
                          <rect key={bi} x={b.x} y={b.y} width={b.w} height={b.h} rx="1" />
                        ))}
                      </svg>
                    </div>
                    <i className="razor l" />
                    <i className="razor r" />
                  </div>
                ))}
              </div>
              <div className="playhead" ref={headRef} />
            </div>
          </div>

          <div>
            <h3 className="font-sf-pro text-2xl sm:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
              Clean Storytelling
            </h3>
            <p className="font-sf-pro text-[17px] sm:text-lg text-slate-600 leading-relaxed font-normal">
              Every cut serves a purpose. We eliminate noise and focus on narrative flow that keeps viewers engaged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
);
TimelineCard.displayName = 'TimelineCard';
