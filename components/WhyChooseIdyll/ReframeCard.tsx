import React, { useEffect, useRef } from 'react';

const STATES = [
  { c: 'f-yt', w: 240, h: 135, r: '16:9' },
  { c: 'f-tt', w: 80, h: 142, r: '9:16' },
  { c: 'f-ig', w: 114, h: 142, r: '4:5' }
];

const TABS = ['YouTube', 'TikTok', 'Instagram'];

interface ReframeCardProps {
  isVisibleOnScroll?: boolean;
}

export const ReframeCard = React.forwardRef<HTMLDivElement, ReframeCardProps>(
  ({ isVisibleOnScroll = true }, forwardedRef) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<HTMLDivElement>(null);
    const ratioRef = useRef<HTMLSpanElement>(null);
    const tabRefs = useRef<(HTMLSpanElement | null)[]>([]);

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

    let rfIdx = -1;

    const renderFrame = (t: number) => {
      const i = Math.floor(t / 2400) % 3;
      if (i === rfIdx) return;
      rfIdx = i;
      const s = STATES[i];

      if (frameRef.current) {
        frameRef.current.className = `frame ${s.c}`;
        frameRef.current.style.width = `${s.w}px`;
        frameRef.current.style.height = `${s.h}px`;
      }
      if (ratioRef.current) {
        ratioRef.current.textContent = s.r;
      }
      tabRefs.current.forEach((el, j) => {
        if (!el) return;
        if (j === i) {
          el.classList.add('on');
        } else {
          el.classList.remove('on');
        }
      });
    };

    if (prefersReducedMotion) {
      renderFrame(0);
      return;
    }

    let isIntersecting = false;
    let rafId: number;
    let last = performance.now();
    let currentT = 0;
    const LOOP = 7200;

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

    renderFrame(0);

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
        transitionDelay: '200ms'
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
          {/* Animation View - Platform-Specific Edits Aspect Reframe */}
          <div className="why-viz rf" aria-hidden="true">
            <div className="rf-stage">
              <div ref={frameRef} className="frame f-yt">
                <svg className="scene" viewBox="0 0 320 320" preserveAspectRatio="xMidYMid slice">
                  <rect className="s-bg" width="320" height="320" />
                  <rect className="s-bg2" y="230" width="320" height="90" />
                  <rect className="s-win" x="-40" y="60" width="96" height="120" rx="6" />
                  <rect className="s-bg" x="4" y="60" width="4" height="120" />
                  <rect className="s-bg" x="-40" y="118" width="96" height="4" />
                  <rect className="s-acc" x="262" y="150" width="70" height="80" rx="8" opacity=".9" />
                  <rect className="s-win" x="274" y="164" width="46" height="6" rx="3" opacity=".8" />
                  <rect className="s-win" x="274" y="176" width="30" height="6" rx="3" opacity=".6" />
                  <path className="s-body" d="M92 320 C92 236 128 214 160 214 C192 214 228 236 228 320 Z" />
                  <rect className="s-skin" x="148" y="188" width="24" height="30" rx="8" />
                  <circle className="s-skin" cx="160" cy="160" r="38" />
                  <path className="s-body" d="M122 156 C120 118 200 112 198 156 C192 136 130 136 122 156 Z" />
                </svg>
                <span ref={ratioRef} className="ratio">
                  16:9
                </span>
                <div className="ov ov-yt">
                  <div className="bar">
                    <i />
                  </div>
                </div>
                <div className="ov ov-tt">
                  <div className="icons">
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="user" />
                </div>
                <div className="ov ov-ig">
                  <div className="dots">
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
                <div className="cap">
                  Why most demos <b>lose viewers</b>
                </div>
              </div>
            </div>
            <div className="tabs">
              {TABS.map((tab, idx) => (
                <span
                  key={tab}
                  ref={el => (tabRefs.current[idx] = el)}
                  className={idx === 0 ? 'on' : ''}
                >
                  {tab}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-sf-pro text-2xl sm:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
              Platform-Specific Edits
            </h3>
            <p className="font-sf-pro text-[17px] sm:text-lg text-slate-600 leading-relaxed font-normal">
              Optimized for each platform's unique requirements. From TikTok hooks to YouTube retention curves.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
);
ReframeCard.displayName = 'ReframeCard';
