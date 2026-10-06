import React, { useEffect, useRef } from 'react';
import { clamp, ease, fadeLoop } from './hiwHelpers';

const UP_FILES = [
  { n: 'raw_take_01.mp4', i: 'hiw-i-vid' },
  { n: 'raw_take_02.mp4', i: 'hiw-i-vid' },
  { n: 'creative_brief.pdf', i: 'hiw-i-file' }
];

export const VisionCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const folderRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const barRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const LOOP = 6200;
    const STILL = 4600;

    const renderFrame = (t: number) => {
      const fade = fadeLoop(t, LOOP);
      let done = 0;
      let pulse = 0;

      UP_FILES.forEach((_, k) => {
        const row = rowRefs.current[k];
        const bar = barRefs.current[k];
        if (!row || !bar) return;

        const s = 200 + k * 1150;
        const enter = ease(clamp((t - s) / 400));
        const p = clamp((t - s - 250) / 850);

        row.style.opacity = `${enter * fade}`;
        row.style.transform = `translateX(${(1 - enter) * -14}px)`;
        bar.style.width = `${ease(p) * 100}%`;

        const isDone = p >= 1;
        row.classList.toggle('done', isDone);

        if (isDone) {
          done++;
          const since = t - (s + 1100);
          if (since > 0 && since < 350) {
            pulse = Math.max(pulse, Math.sin((since / 350) * Math.PI));
          }
        }
      });

      if (folderRef.current) {
        folderRef.current.style.transform = `scale(${1 + pulse * 0.18})`;
      }

      if (countRef.current) {
        countRef.current.textContent = done === 3 ? 'All files received' : `${done} of 3 received`;
        countRef.current.style.color = done === 3 ? 'var(--hiw-accent)' : '';
        countRef.current.style.fontWeight = done === 3 ? '600' : '';
      }
    };

    if (reduce) {
      renderFrame(STILL);
      return;
    }

    let isVisible = false;
    let localTime = 0;
    let last = performance.now();
    let rafId: number;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(card);
    renderFrame(STILL);

    const frame = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;

      if (isVisible) {
        localTime = (localTime + dt) % LOOP;
        renderFrame(localTime);
      }

      rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <article ref={cardRef} className="hiw-card">
      <div className="hiw-viz" aria-hidden="true">
        <div className="hiw-top">
          <div className="hiw-drive">
            <span ref={folderRef} className="hiw-f" style={{ color: 'var(--hiw-accent)' }}>
              <svg className="hiw-ico">
                <use href="#hiw-i-folder" />
              </svg>
            </span>
            <span className="hiw-lbl">Shared folder</span>
          </div>
          <span ref={countRef} className="hiw-sub">
            0 of 3 received
          </span>
        </div>

        <div className="hiw-up-rows">
          {UP_FILES.map((f, k) => (
            <div
              key={f.n}
              ref={(el) => {
                rowRefs.current[k] = el;
              }}
              className="hiw-up-row"
              style={k === UP_FILES.length - 1 ? { marginBottom: 0 } : undefined}
            >
              <span style={{ color: 'var(--hiw-fg-2)' }}>
                <svg className="hiw-ico">
                  <use href={`#${f.i}`} />
                </svg>
              </span>
              <div style={{ minWidth: 0 }}>
                <div className="hiw-name">{f.n}</div>
                <div className="hiw-bar">
                  <i
                    ref={(el) => {
                      barRefs.current[k] = el;
                    }}
                  />
                </div>
              </div>
              <span className="hiw-st">
                <svg className="hiw-ico" style={{ width: 10, height: 10 }}>
                  <use href="#hiw-i-check" />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <span className="hiw-step">Step 1</span>
        <h3 className="hiw-title">Share Your Vision</h3>
        <p className="hiw-desc">
          Send us your raw footage and creative brief. We'll understand your goals.
        </p>
      </div>
    </article>
  );
};
