'use client';

import { useEffect } from 'react';
import { animate, inView } from 'motion';

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
  useEffect(() => {
    if (prefersReducedMotion) return;

    const enterDistance = isMobile ? 36 : 72;
    const exitDistance = isMobile ? 24 : 48;

    const stop = inView('.scroll-section p', (element) => {
      animate(
        element,
        {
          opacity: 1,
          x: [-enterDistance, 0],
          filter: ['blur(4px)', 'blur(0px)'],
        },
        { duration: 0.9, ease: [0.17, 0.55, 0.55, 1] }
      );

      return () => {
        animate(
          element,
          {
            opacity: 0,
            x: -exitDistance,
            filter: ['blur(0px)', 'blur(4px)'],
          },
          { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        );
      };
    });

    return () => stop();
  }, [isMobile, prefersReducedMotion]);

  return (
    <div className="relative w-full z-40" aria-label={phrases.join(' ')}>
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
          <p
            className={`font-h1 font-bold text-[#4fe6ff] leading-[1.05] ${
              isMobile
                ? 'text-center px-6'
                : 'left-6 md:left-16 lg:left-24 relative max-w-[38vw] lg:max-w-[34vw]'
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
        </section>
      ))}
    </div>
  );
};
