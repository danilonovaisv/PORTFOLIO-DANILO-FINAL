'use client';

import { animate, inView } from 'motion';
import { useEffect, useRef } from 'react';
import { BELIEF_BACKGROUND_STOPS, beliefMotion, beliefZIndex } from '@/config/beliefTokens';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

export function BeliefBackground() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { shouldReduceMotion } = useBeliefsScrollContext();

  useEffect(() => {
    if (!ref.current) return;

    const stop = inView(
      '#o-que-me-move [data-belief-section]',
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

        const controls = animate(
          ref.current!,
          { backgroundColor: color },
          {
            duration: beliefMotion.backgroundDuration,
            ease: beliefMotion.referenceEase as any,
          }
        );

        return () => controls.stop();
      },
      { amount: 0.55 }
    );

    return () => stop();
  }, [shouldReduceMotion]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-testid="beliefs-background"
      data-belief-background
      className="absolute inset-0 bg-[#040013]"
      style={{ zIndex: beliefZIndex.background }}
    />
  );
}
