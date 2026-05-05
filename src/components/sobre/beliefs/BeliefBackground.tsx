'use client';

import { useEffect, useRef } from 'react';
import { animate, inView } from 'motion';
import { GHOST_EASE_AMBIENT, MOTION_TOKENS } from '@/config/motion';
import { useBeliefsScrollContext } from './BeliefsScrollContext';
import { Z_INDEX } from '@/config/z-indices';
import { BELIEF_BACKGROUND_STOPS } from '@/config/beliefTokens';

const stops = BELIEF_BACKGROUND_STOPS;

export function BeliefBackground() {
  const { shouldReduceMotion } = useBeliefsScrollContext();
  const backgroundRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = backgroundRef.current;
    if (!element || shouldReduceMotion) {
      if (element)
        element.style.backgroundColor = MOTION_TOKENS.colors.deepVoid;
      return;
    }

    element.style.backgroundColor = stops[0];

    return inView(
      '.belief-scroll-section',
      (section) => {
        const index = Number((section as HTMLElement).dataset.index ?? 0);
        const nextColor = stops[index + 1] ?? stops[stops.length - 1];
        const previousColor = stops[index] ?? stops[0];

        animate(
          element,
          { backgroundColor: nextColor },
          { duration: MOTION_TOKENS.duration.bg, ease: GHOST_EASE_AMBIENT }
        );

        return () => {
          animate(
            element,
            { backgroundColor: previousColor },
            {
              duration: MOTION_TOKENS.duration.GHOST_EXIT,
              ease: GHOST_EASE_AMBIENT,
            }
          );
        };
      },
      { amount: 0.55 }
    );
  }, [shouldReduceMotion]);

  return (
    <div
      ref={backgroundRef}
      data-testid="beliefs-background"
      aria-hidden="true"
      style={{
        backgroundColor: MOTION_TOKENS.colors.deepVoid,
        zIndex: Z_INDEX.beliefs.background,
        willChange: 'background-color',
      }}
      className="absolute inset-0"
    />
  );
}
