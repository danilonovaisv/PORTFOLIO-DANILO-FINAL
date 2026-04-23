'use client';

import { useEffect, useState } from 'react';
import { animate, inView } from 'motion';
import { GHOST_EASE } from '@/config/motion';

interface BeliefScrollTextProps {
  phrases: readonly string[];
  isMobile?: boolean;
  prefersReducedMotion?: boolean;
}

export const BeliefScrollText = ({
  phrases,
  isMobile = false,
  prefersReducedMotion = false,
}: BeliefScrollTextProps) => {
  const [activePhrase, setActivePhrase] = useState(phrases[0] ?? '');

  useEffect(() => {
    if (prefersReducedMotion) {
      setActivePhrase(phrases[0] ?? '');
      return;
    }

    const stop = inView('[data-belief-phrase]', (element) => {
      const nextPhrase = element.textContent?.trim();
      if (nextPhrase) setActivePhrase(nextPhrase);

      animate(
        element,
        {
          opacity: 1,
          y: [18, 0],
          filter: ['blur(6px)', 'blur(0px)'],
        },
        { duration: 0.9, ease: GHOST_EASE }
      );

      return () => {
        animate(
          element,
          {
            opacity: 0,
            y: -18,
            filter: ['blur(0px)', 'blur(6px)'],
          },
          { duration: 0.5, ease: GHOST_EASE }
        );
      };
    });

    return () => stop();
  }, [isMobile, phrases, prefersReducedMotion]);

  return (
    <div
      className="relative w-full z-[var(--z-layer-cta)]"
      aria-label={phrases.join(' ')}
    >
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {activePhrase}
      </p>
      {phrases.map((phrase, index) => (
        <section
          key={index}
          className={`scroll-section h-[80vh] flex w-full ${
            isMobile
              ? 'items-end justify-center pb-[20vh]'
              : 'items-center justify-start'
          }`}
          data-index={index}
        >
          <div className="mx-auto w-full max-w-[1680px] px-6 md:px-12 lg:px-16 xl:px-24">
            <p
              data-belief-phrase="true"
              className={`font-h1 font-bold italic text-blueAccent leading-[1.05] ${
                isMobile
                  ? 'mx-auto max-w-[16ch] text-center'
                  : 'max-w-[34rem] lg:max-w-[38rem] xl:max-w-[42rem]'
              }`}
              style={{
                fontSize: isMobile
                  ? 'clamp(2rem, 8vw, 3rem)'
                  : 'clamp(2.8rem, 5.8vw, 6.3rem)',
                opacity: prefersReducedMotion ? 1 : 0,
                willChange: prefersReducedMotion
                  ? undefined
                  : 'transform, opacity, filter',
              }}
              aria-hidden="true"
            >
              {phrase}
            </p>
          </div>
        </section>
      ))}
    </div>
  );
};
