'use client';

import { animate, inView } from 'motion';
import { useEffect, useRef } from 'react';
import {
  BELIEF_BACKGROUND_STOPS,
  beliefMotion,
} from '@/config/beliefTokens';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

export function BeliefBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress, shouldReduceMotion } = useBeliefsScrollContext();

  useEffect(() => {
    if (!ref.current) return;

    ref.current.style.backgroundColor = BELIEF_BACKGROUND_STOPS[0];

    const stop = inView(
      '.belief-scroll-section',
      (element) => {
        const index = Number.parseInt(
          element.getAttribute('data-index') ?? '0',
          10
        );
        const color =
          BELIEF_BACKGROUND_STOPS[
            Math.min(index + 1, BELIEF_BACKGROUND_STOPS.length - 1)
          ];

        if (shouldReduceMotion) {
          ref.current!.style.backgroundColor = color;
          return;
        }

        animate(
          ref.current!,
          { backgroundColor: color },
          {
            duration: beliefMotion.revealDuration,
            ease: beliefMotion.ambientEase,
          }
        );
      },
      { amount: 0.55 }
    );

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (!ref.current || latest < 0.94) return;

      const color = BELIEF_BACKGROUND_STOPS[BELIEF_BACKGROUND_STOPS.length - 1];
      if (shouldReduceMotion) {
        ref.current.style.backgroundColor = color;
        return;
      }

      animate(
        ref.current,
        { backgroundColor: color },
        {
          duration: beliefMotion.revealDuration,
          ease: beliefMotion.ambientEase,
        }
      );
    });

    return () => {
      stop();
      unsubscribe();
    };
  }, [scrollYProgress, shouldReduceMotion]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-testid="beliefs-background"
      data-belief-background
      className="absolute inset-0 bg-[#040013]"
      style={{ zIndex: 0 }}
    />
  );
}
