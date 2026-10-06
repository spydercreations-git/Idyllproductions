import React, { useEffect, useRef, useState } from 'react';

interface LineData {
  id: number;
  plainText: string;
  render: (isFocused: boolean) => React.ReactNode;
}

const lines: LineData[] = [
  {
    id: 0,
    plainText: 'Most editors just cut clips together',
    render: () => (
      <span>Most editors just cut clips together</span>
    )
  },
  {
    id: 1,
    plainText: 'Idyll crafts high-retention videos built to turn scrolls into real results',
    render: (isFocused: boolean) => (
      <span>
        Idyll crafts high-retention videos built to turn scrolls into{' '}
        <span
          className="transition-colors duration-300"
          style={{ color: isFocused ? '#FF8156' : 'inherit' }}
        >
          real results
        </span>
      </span>
    )
  },
  {
    id: 2,
    plainText: 'From viral short-form to cinematic long-form, delivered in one day',
    render: (isFocused: boolean) => (
      <span>
        From viral short-form to cinematic long-form, delivered in{' '}
        <span
          className="transition-colors duration-300"
          style={{ color: isFocused ? '#FF8156' : 'inherit' }}
        >
          one day
        </span>
      </span>
    )
  },
  {
    id: 3,
    plainText: "Three free revisions, one point of contact and edits your audience can't skip",
    render: (isFocused: boolean) => (
      <span>
        Three free revisions, one point of contact and edits your audience{' '}
        <span
          className="transition-colors duration-300"
          style={{ color: isFocused ? '#FF8156' : 'inherit' }}
        >
          can't skip
        </span>
      </span>
    )
  }
];

export const ScrollTextReveal: React.FC = () => {
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const [lineStyles, setLineStyles] = useState<
    { opacity: number; isFocused: boolean }[]
  >(lines.map((_, i) => ({ opacity: i === 0 ? 1 : 0.15, isFocused: i === 0 })));

  useEffect(() => {
    let rafId: number;

    const updateVisibility = () => {
      const vh = window.innerHeight;
      const viewportCenter = vh / 2;
      // Distance from viewport center where opacity falls off
      const fadeRadius = vh * 0.28;

      const updated = lineRefs.current.map((el) => {
        if (!el) return { opacity: 0.15, isFocused: false };

        const rect = el.getBoundingClientRect();
        const lineCenter = rect.top + rect.height / 2;
        const dist = Math.abs(lineCenter - viewportCenter);

        // Normalized proximity: 1 at dead center, 0 at fadeRadius or further
        const rawProximity = Math.max(0, 1 - dist / fadeRadius);
        // Smoothstep curve for silky gradual transition
        const proximity = rawProximity * rawProximity * (3 - 2 * rawProximity);

        // Opacity smoothly scales from 0.15 (unfocused) to 1.0 (centered in viewport)
        const opacity = parseFloat((0.15 + 0.85 * proximity).toFixed(3));
        const isFocused = proximity > 0.45;

        return { opacity, isFocused };
      });

      setLineStyles(updated);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section
      id="scroll-statement"
      aria-label="Idyll Productions Value Statement"
      className="w-full bg-white py-24 sm:py-32 md:py-40 lg:py-48 px-4 sm:px-6 md:px-8 border-y border-slate-100/60"
    >
      <div className="w-full max-w-4xl lg:max-w-5xl mx-auto">
        <div
          className="flex flex-col gap-14 sm:gap-20 md:gap-28 lg:gap-32 text-center items-center font-inter-tight font-bold tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] leading-[1.26] sm:leading-[1.22] md:leading-[1.18]"
          style={{
            fontFamily:
              "'Inter Tight', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          }}
        >
          {lines.map((line, index) => {
            const style = lineStyles[index] || { opacity: 0.15, isFocused: false };

            return (
              <p
                key={line.id}
                ref={(el) => {
                  lineRefs.current[index] = el;
                }}
                className="m-0 p-0 text-center will-change-[opacity,transform,color]"
                style={{
                  opacity: style.opacity,
                  color: style.isFocused ? '#000000' : '#64748b',
                  transform: style.isFocused ? 'scale(1)' : 'scale(0.98)',
                  transition:
                    'color 0.25s ease-out, transform 0.25s ease-out, opacity 0.1s linear'
                }}
              >
                {line.render(style.isFocused)}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ScrollTextReveal;
