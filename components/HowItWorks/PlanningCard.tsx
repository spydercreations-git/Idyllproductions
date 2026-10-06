import React, { useEffect, useRef } from 'react';
import { clamp, ease, back, fadeLoop } from './hiwHelpers';

const LOOP = 6600;
const STILL = 5000;
const SEG_W = [18, 27, 33, 16];

export const PlanningCard: React.FC = () => {
  const cardRef = useRef<HTMLElement | null>(null);
  const chipRef = useRef<HTMLSpanElement | null>(null);
  const row0Ref = useRef<HTMLDivElement | null>(null);
  const row1Ref = useRef<HTMLDivElement | null>(null);
  const row2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const rows = [row0Ref.current, row1Ref.current, row2Ref.current];
    const chip = chipRef.current;

    const render = (t: number) => {
      const fade = fadeLoop(t, LOOP);
      let allDone = true;

      rows.forEach((row, i) => {
        if (!row) return;
        const s = 250 + i * 1450;
        const e = s + 1200;
        const on = t >= s && t < e;
        const done = t >= e;
        if (!done) allDone = false;

        row.classList.toggle('on', on);
        row.classList.toggle('done', done);
        row.style.opacity = String(fade);

        if (i === 1) {
          const segs = row.querySelectorAll<HTMLElement>('.hiw-seg');
          segs.forEach((sg, j) => {
            const p = ease(clamp((t - s - 150 - j * 200) / 450));
            sg.style.width = `${SEG_W[j] * p}%`;
          });
        } else {
          const pills = row.querySelectorAll<HTMLElement>('.hiw-pill');
          pills.forEach((pi, j) => {
            const p = clamp((t - s - 150 - j * 260) / 320);
            pi.style.opacity = String(clamp(p * 1.6));
            pi.style.transform = `scale(${0.6 + 0.4 * back(p)})`;
          });
        }
      });

      if (chip) {
        chip.textContent = allDone ? 'Plan approved' : 'Drafting';
        chip.classList.toggle('ok', allDone);
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
          <span className="hiw-lbl">Edit plan</span>
          <span className="hiw-chip" ref={chipRef}>
            Drafting
          </span>
        </div>

        <div className="hiw-pl-row" ref={row0Ref}>
          <span className="hiw-cb">
            <svg className="hiw-ico" style={{ width: 10, height: 10 }}>
              <use href="#hiw-i-check" />
            </svg>
          </span>
          <div>
            <div className="hiw-pl-name">Hook concepts</div>
            <div className="hiw-pl-det">
              <span className="hiw-pill">Hook A</span>
              <span className="hiw-pill">Hook B</span>
              <span className="hiw-pill">Hook C</span>
            </div>
          </div>
        </div>

        <div className="hiw-pl-row" ref={row1Ref}>
          <span className="hiw-cb">
            <svg className="hiw-ico" style={{ width: 10, height: 10 }}>
              <use href="#hiw-i-check" />
            </svg>
          </span>
          <div>
            <div className="hiw-pl-name">Pacing blueprint</div>
            <div className="hiw-pl-det" style={{ gap: 2 }}>
              <span className="hiw-seg" />
              <span className="hiw-seg" />
              <span className="hiw-seg" />
              <span className="hiw-seg" />
            </div>
          </div>
        </div>

        <div className="hiw-pl-row" ref={row2Ref} style={{ marginBottom: 0 }}>
          <span className="hiw-cb">
            <svg className="hiw-ico" style={{ width: 10, height: 10 }}>
              <use href="#hiw-i-check" />
            </svg>
          </span>
          <div>
            <div className="hiw-pl-name">Formats</div>
            <div className="hiw-pl-det">
              <span className="hiw-pill">9:16</span>
              <span className="hiw-pill">4:5</span>
              <span className="hiw-pill">16:9</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <span className="hiw-step">Step 2</span>
        <h3>Strategic Planning</h3>
        <p>We analyze your content and create a detailed editing strategy.</p>
      </div>
    </article>
  );
};
