import React, { useEffect, useRef } from 'react';
import { clamp, ease, fadeLoop } from './hiwHelpers';

const LOOP = 7800;
const STILL = 3800;

const DL_FILES = [
  'idyll_ad_9x16.mp4',
  'idyll_ad_4x5.mp4',
  'idyll_ad_16x9.mp4',
];

export const DeliveryCard: React.FC = () => {
  const cardRef = useRef<HTMLElement | null>(null);
  const chipRef = useRef<HTMLSpanElement | null>(null);
  const rowsContainerRef = useRef<HTMLDivElement | null>(null);
  const msgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const rowEls = rowsContainerRef.current
      ? (Array.from(rowsContainerRef.current.querySelectorAll('.hiw-dl-row')) as HTMLElement[])
      : [];

    const dl = DL_FILES.map((name, k) => {
      const el = rowEls[k];
      return {
        el,
        bar: el?.querySelector('.hiw-bar i') as HTMLElement | null | undefined,
        badge: el?.querySelector('.hiw-badge') as HTMLElement | null | undefined,
        nameEl: el?.querySelector('.hiw-name') as HTMLElement | null | undefined,
        base: name,
      };
    });

    const msg = msgRef.current;
    const chip = chipRef.current;

    const render = (t: number) => {
      const fade = fadeLoop(t, LOOP);

      dl.forEach((d, k) => {
        if (!d.el || !d.bar || !d.badge || !d.nameEl) return;

        const s = 200 + k * 700;
        const p = clamp((t - s) / 1000);
        d.bar.style.width = `${ease(p) * 100}%`;

        let st = p <= 0 ? 'Queued' : p < 1 ? 'Exporting' : 'Ready';
        let cls = p <= 0 ? '' : p < 1 ? 'work' : 'ready';

        if (k === 0) {
          const r = clamp((t - 4700) / 900);
          if (t >= 4700) {
            d.bar.style.width = `${ease(r) * 100}%`;
            st = r < 1 ? 'Revising' : 'v2 Ready';
            cls = r < 1 ? 'work' : 'ready';
          }
          d.nameEl.textContent = t >= 4700 ? d.base.replace('.mp4', '_v2.mp4') : d.base;
          d.el.classList.toggle('flash', t >= 4700 && t < 6000);
        }

        d.badge.textContent = st;
        d.badge.className = `hiw-badge ${cls}`.trim();
        d.el.style.opacity = String(fade);
      });

      if (msg) {
        const m = clamp((t - 3300) / 400);
        const mOut = t > 4700 ? 1 - clamp((t - 4700) / 300) : 1;
        msg.style.opacity = String(ease(m) * mOut * fade);
        msg.style.transform = `translateY(${(1 - ease(m)) * 8}px)`;
        msg.style.height = t > 5000 ? '0px' : '';
        msg.style.overflow = 'hidden';
      }

      if (chip) {
        chip.textContent =
          t < 2900
            ? 'Exporting'
            : t < 4700
            ? 'Delivered'
            : t < 5600
            ? 'Revision 1 of 3 free'
            : 'Delivered';
        chip.classList.toggle('ok', (t >= 2900 && t < 4700) || t >= 5600);
        chip.style.opacity = String(fade);
      }
    };

    render(STILL);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let isOnScreen = false;
    let t = 0;
    let last = performance.now();
    let rafId: number;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          isOnScreen = e.isIntersecting;
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(card);

    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;

      if (isOnScreen) {
        t = (t + dt) % LOOP;
        render(t);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <article className="hiw-card" ref={cardRef}>
      <div className="hiw-viz" aria-hidden="true">
        <div className="hiw-top">
          <span className="hiw-lbl">Deliverables</span>
          <span className="hiw-chip" ref={chipRef}>
            Exporting
          </span>
        </div>

        <div ref={rowsContainerRef}>
          {DL_FILES.map((fileName, idx) => (
            <div key={idx} className="hiw-dl-row">
              <span style={{ color: 'var(--hiw-fg-2)' }}>
                <svg className="hiw-ico">
                  <use href="#hiw-i-vid" />
                </svg>
              </span>
              <div style={{ minWidth: 0 }}>
                <div className="hiw-name">{fileName}</div>
                <div className="hiw-bar">
                  <i />
                </div>
              </div>
              <span className="hiw-badge">Queued</span>
            </div>
          ))}
        </div>

        <div className="hiw-msg" ref={msgRef}>
          <span className="hiw-av" />
          <span className="hiw-bub">Love it. Can we try a faster hook?</span>
        </div>
      </div>

      <div>
        <span className="hiw-step">Step 4</span>
        <h3>Deliver &amp; Optimize</h3>
        <p>Receive your polished video with platform-specific formats.</p>
      </div>
    </article>
  );
};
