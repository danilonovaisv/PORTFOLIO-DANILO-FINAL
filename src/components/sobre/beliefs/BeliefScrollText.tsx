'use client';

/**
 * BeliefScrollText — Layer 3 (z-40).
 * Frases rotatórias em #4fe6ff (blueAccent).
 *
 * CORREÇÃO v3:
 * Removido scrollProgress. Agora utiliza seções sequenciais e scroll-triggered
 * animations com inView da vanilla Motion, em conformidade com o tutorial JS.
 */

import { useEffect } from 'react';
import { animate, inView } from 'motion';
import { GHOST_EASE, GHOST_EASE_AMBIENT } from '@/config/motion';

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

    // A callback will run when each .scroll-section p enters the viewport
    const stop = inView('.scroll-section p', (element) => {
      animate(
        element,
        { opacity: 1, y: [18, 0], filter: ['blur(6px)', 'blur(0px)'] },
        { duration: 0.9, ease: GHOST_EASE_AMBIENT }
      );

      // Return a cleanup function that runs when the element leaves
      return () => {
        animate(
          element,
          { opacity: 0, y: -18, filter: ['blur(0px)', 'blur(6px)'] },
          { duration: 0.5, ease: GHOST_EASE }
        );
      };
    });

    return () => stop();
  }, [prefersReducedMotion]);

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
            className={`font-h1 font-bold text-blueAccent leading-[1.05] ${
              isMobile
                ? 'text-center px-6'
                : 'left-6 md:left-16 lg:left-24 relative max-w-[38vw] lg:max-w-[34vw]'
            }`}
            style={{
              fontSize: isMobile
                ? 'clamp(2rem, 8vw, 3rem)'
                : 'clamp(2.8rem, 5.8vw, 6.3rem)',
              opacity: prefersReducedMotion ? 1 : 0,
              transform: prefersReducedMotion ? 'none' : 'translateY(18px)',
              filter: prefersReducedMotion ? 'none' : 'blur(6px)',
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
