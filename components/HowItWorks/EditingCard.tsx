import React, { useEffect, useRef } from 'react';
import { clamp, ease, back, fadeLoop } from './hiwHelpers';

const LOOP = 6600;
const STILL = 4300;

const CAP_RANGES: [number, number][] = [
  [2, 14],
  [16, 30],
  [32, 46],
  [48, 62],
  [64, 78],
  [80, 96],
];

// Pre-compute deterministic waveform heights
let seed = 11;
const rnd = () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};
const WAVE_H = Array.from(
  { length: 40 },
  (_, i) => 25 + 70 * Math.abs(Math.sin(i * 0.55)) * (0.5 + 0.5 * rnd())
);

export const EditingCard: React.FC = () => {
  const cardRef = useRef<HTMLElement | null>(null);
  const chipRef = useRef<HTMLSpanElement | null>(null);
  const vRef = useRef<HTMLDivElement | null>(null);
  const tRef = useRef<HTMLDivElement | null>(null);
  const aRef = useRef<HTMLDivElement | null>(null);
  const phRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const clips = vRef.current ? (Array.from(vRef.current.querySelectorAll('.hiw-clip')) as HTMLElement[]) : [];
    const caps = tRef.current ? (Array.from(tRef.current.querySelectorAll('.hiw-cap')) as HTMLElement[]) : [];
    const bars = aRef.current ? (Array.from(aRef.current.querySelectorAll('i')) as HTMLElement[]) : [];
    const playhead = phRef.current;
    const chip = chipRef.current;

    const render = (t: number) => {
      const fade = fadeLoop(t, LOOP);

      clips.forEach((c: HTMLElement, i: number) => {
        const p = clamp((t - 200 - i * 380) / 420);
        c.style.opacity = String(clamp(p * 1.5) * fade);
        c.style.transform = `translateY(${(1 - back(p)) * -14}px)`;
      });

      caps.forEach((c: HTMLElement, i: number) => {
        const p = clamp((t - 1900 - i * 130) / 260);
        c.style.opacity = String(p * 0.55 * fade);
      });

      bars.forEach((b: HTMLElement, i: number) => {
        const p = ease(clamp((t - 1700 - i * 18) / 500));
        b.style.height = `${10 + (WAVE_H[i] - 10) * p}%`;
        b.style.opacity = String(0.85 * fade);
      });

      if (playhead) {
        const ph = clamp((t - 3000) / 2700);
        playhead.style.left = `${ease(ph) * 100}%`;
        playhead.style.opacity = String((t > 2800 ? clamp((t - 2800) / 200) : 0) * fade);
      }

      if (chip) {
        chip.textContent = t < 1700 ? 'Assembling' : t < 2900 ? 'Captions and sound' : 'Final review';
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
          <span className="hiw-lbl">Timeline</span>
          <span className="hiw-chip" ref={chipRef}>
            Assembling
          </span>
        </div>

        <div className="hiw-edit-body">
          <div className="hiw-trk">
            <span className="hiw-tg">V1</span>
            <div className="hiw-lane" ref={vRef}>
              <span className="hiw-clip" style={{ flex: '0 0 22%' }}>
                Hook
              </span>
              <span className="hiw-clip" style={{ flex: '0 0 25%' }}>
                Problem
              </span>
              <span className="hiw-clip" style={{ flex: '0 0 31%' }}>
                Demo
              </span>
              <span className="hiw-clip" style={{ flex: '1 1 auto' }}>
                CTA
              </span>
            </div>
          </div>

          <div className="hiw-trk">
            <span className="hiw-tg">T1</span>
            <div className="hiw-lane hiw-thin" ref={tRef}>
              {CAP_RANGES.map(([left, right], idx) => (
                <span
                  key={idx}
                  className="hiw-cap"
                  style={{ left: `${left}%`, width: `${right - left}%` }}
                />
              ))}
            </div>
          </div>

          <div className="hiw-trk" style={{ marginBottom: 0 }}>
            <span className="hiw-tg">A1</span>
            <div className="hiw-lane">
              <div className="hiw-wv" ref={aRef}>
                {WAVE_H.map((_, idx) => (
                  <i key={idx} />
                ))}
              </div>
            </div>
          </div>

          <div className="hiw-ph-wrap">
            <div className="hiw-ph" ref={phRef} />
          </div>
        </div>
      </div>

      <div>
        <span className="hiw-step">Step 3</span>
        <h3>Expert Editing</h3>
        <p>Our team crafts your video with precision, focusing on engagement.</p>
      </div>
    </article>
  );
};
