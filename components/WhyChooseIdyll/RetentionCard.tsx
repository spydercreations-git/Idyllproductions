import React, { useEffect, useRef } from 'react';

const X0 = 8;
const X1 = 352;
const yOf = (v: number) => 46 + ((100 - v) / 100) * 106;
const g = (x: number, c: number, w: number) => Math.exp(-Math.pow((x - c) / w, 2));
const typ = (x: number) => 16 + 84 * Math.exp(-3.3 * x);
const idy = (x: number) =>
  100 -
  22 * x -
  9 * (1 - Math.exp(-14 * x)) +
  7 * g(x, 0.42, 0.035) +
  7 * g(x, 0.78, 0.035) -
  3 * g(x, 0.37, 0.04) -
  3 * g(x, 0.73, 0.04);

const getPath = (f: (x: number) => number) => {
  let d = '';
  for (let i = 0; i <= 120; i++) {
    const x = i / 120;
    d += (i ? 'L' : 'M') + (X0 + x * (X1 - X0)).toFixed(1) + ' ' + yOf(f(x)).toFixed(1);
  }
  return d;
};

const PATH_IDY = getPath(idy);
const PATH_TYP = getPath(typ);
const PATH_AREA = PATH_IDY + `L${X1} 152 L${X0} 152 Z`;

const MARKS = [
  { x: 0.05, t: 'Hook' },
  { x: 0.42, t: 'Pattern break' },
  { x: 0.78, t: 'Payoff' }
];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

interface RetentionCardProps {
  isVisibleOnScroll?: boolean;
}

export const RetentionCard = React.forwardRef<HTMLDivElement, RetentionCardProps>(
  ({ isVisibleOnScroll = true }, forwardedRef) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const clipRectRef = useRef<SVGRectElement>(null);
    const phRef = useRef<SVGLineElement>(null);
    const dotIRef = useRef<SVGCircleElement>(null);
    const dotTRef = useRef<SVGCircleElement>(null);
    const labIRef = useRef<SVGTextElement>(null);
    const labTRef = useRef<SVGTextElement>(null);
    const markRefs = useRef<(SVGGElement | null)[]>([]);

    const setCardRef = (node: HTMLDivElement | null) => {
      cardRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    };

    const yLabI = yOf(idy(1)) - 10;
    const yLabT = yOf(typ(1)) + 18;

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderFrame = (t: number) => {
      const pr = ease(clamp(t / 3800));
      const px = X0 + pr * (X1 - X0);
      const fade = t > 5600 ? 1 - clamp((t - 5600) / 400) : 1;

      if (clipRectRef.current) {
        clipRectRef.current.setAttribute('width', `${px}`);
      }
      if (phRef.current) {
        phRef.current.setAttribute('x1', `${px}`);
        phRef.current.setAttribute('x2', `${px}`);
        phRef.current.style.opacity = `${(pr < 1 ? 1 : 0) * fade}`;
      }
      if (dotIRef.current) {
        dotIRef.current.setAttribute('cx', `${px}`);
        dotIRef.current.setAttribute('cy', `${yOf(idy(pr))}`);
      }
      if (dotTRef.current) {
        dotTRef.current.setAttribute('cx', `${px}`);
        dotTRef.current.setAttribute('cy', `${yOf(typ(pr))}`);
      }

      MARKS.forEach((m, idx) => {
        const el = markRefs.current[idx];
        if (!el) return;
        const on = clamp((pr - m.x) / 0.06);
        el.style.opacity = `${on * fade}`;
        el.style.transform = `scale(${0.6 + 0.4 * ease(on)})`;
      });

      const end = clamp((pr - 0.96) / 0.04);
      if (labIRef.current) labIRef.current.style.opacity = `${end * fade}`;
      if (labTRef.current) labTRef.current.style.opacity = `${end * fade}`;
      if (svgRef.current) {
        svgRef.current.style.opacity = `${t > 5600 ? 0.35 + 0.65 * fade : 1}`;
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
    const LOOP = 6000;

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
        transitionDelay: '100ms'
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
          {/* Animation View - Retention-Focused Pacing Graph */}
          <div className="why-viz ret" aria-hidden="true">
            <svg ref={svgRef} viewBox="0 0 360 176" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="whyIdyllRetFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="var(--accent)" stopOpacity=".22" />
                  <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
                </linearGradient>
                <clipPath id="whyIdyllRetClip">
                  <rect ref={clipRectRef} x="0" y="0" width="0" height="176" />
                </clipPath>
              </defs>

              <text className="ax" x="8" y="10">
                Viewers still watching
              </text>
              <line className="grid-l" x1="8" x2="352" y1="46" y2="46" />
              <line className="grid-l" x1="8" x2="352" y1="99" y2="99" />
              <line className="grid-l" x1="8" x2="352" y1="152" y2="152" style={{ stroke: 'var(--line)' }} />
              <text className="ax" x="8" y="168">
                0:00
              </text>
              <text className="ax" x="352" y="168" textAnchor="end">
                0:30
              </text>

              <g clipPath="url(#whyIdyllRetClip)">
                <path className="area" d={PATH_AREA} />
                <path className="typ" d={PATH_TYP} />
                <path className="idy" d={PATH_IDY} />
              </g>

              <line ref={phRef} className="ph" x1="0" x2="0" y1="40" y2="152" />

              <g>
                {MARKS.map((m, idx) => {
                  const px = X0 + m.x * (X1 - X0);
                  const py = yOf(idy(m.x));
                  const w = m.t.length * 5.8 + 16;
                  const lx = clamp(px - w / 2, 4, 356 - w);
                  return (
                    <g
                      key={m.t}
                      ref={el => (markRefs.current[idx] = el)}
                      className="mk"
                      style={{
                        transformOrigin: `${px}px ${py}px`,
                        transformBox: 'view-box'
                      }}
                    >
                      <rect x={lx} y={py - 30} width={w} height="16" rx="8" />
                      <text x={lx + w / 2} y={py - 19} textAnchor="middle">
                        {m.t}
                      </text>
                      <circle cx={px} cy={py} r="3" />
                    </g>
                  );
                })}
              </g>

              <circle ref={dotTRef} className="dot-t" r="3.5" />
              <circle ref={dotIRef} className="dot-i" r="4.5" />

              <text ref={labIRef} className="lab i" x="346" y={yLabI} textAnchor="end">
                Idyll edit
              </text>
              <text ref={labTRef} className="lab t" x="346" y={yLabT} textAnchor="end">
                Typical edit
              </text>
            </svg>
          </div>

          <div>
            <h3 className="font-sf-pro text-2xl sm:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
              Retention-Focused Pacing
            </h3>
            <p className="font-sf-pro text-[17px] sm:text-lg text-slate-600 leading-relaxed font-normal">
              Strategic pacing that maximizes watch time. We understand platform algorithms and edit accordingly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
);
RetentionCard.displayName = 'RetentionCard';
