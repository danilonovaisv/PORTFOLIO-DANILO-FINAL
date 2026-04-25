'use client';

import { useEffect, useRef } from 'react';
import { animate, inView } from 'motion';
import type { MotionValue } from 'motion/react';
import { GHOST_EASE_AMBIENT } from '@/config/motion';

const COLOR_STOPS = [
  '#040013', // Deep Void — intro
  '#0048ff', // bluePrimary — frase 1
  '#8705f2', // purpleDetails — frase 2
  '#f501d3', // pinkDetails — frase 3
  '#0048ff', // bluePrimary — frase 4
  '#8705f2', // purpleDetails — frase 5
  '#f501d3', // pinkDetails — frase 6
  '#0048ff', // bluePrimary — clímax/final frame
] as const;

const CLIMAX_THRESHOLD = 0.82;

interface BeliefBackgroundProps {
  scrollProgress: MotionValue<number>;
}

export const BeliefBackground = ({ scrollProgress }: BeliefBackgroundProps) => {
  const bgRef = useRef<HTMLDivElement>(null);
  const climaxFiredRef = useRef(false);

  useEffect(() => {
    let stopInView: (() => void) | null = null;

    stopInView = inView('.scroll-section', (section) => {
      // Guard: do not override the explicit climax lock once fired
      if (climaxFiredRef.current) return;

      const indexAttr = section.getAttribute('data-index');
      if (indexAttr === null) return;

      const index = parseInt(indexAttr, 10);
      const targetColor = COLOR_STOPS[index + 1] || COLOR_STOPS[0];

      if (bgRef.current) {
        animate(
          bgRef.current,
          { backgroundColor: targetColor },
          { duration: 0.9, ease: GHOST_EASE_AMBIENT }
        );
      }

      // Bidirectional reset: revert to previous color when section exits viewport
      return () => {
        if (climaxFiredRef.current) return;
        const prevColor = COLOR_STOPS[index] || COLOR_STOPS[0];
        if (bgRef.current) {
          animate(
            bgRef.current,
            { backgroundColor: prevColor },
            { duration: 0.6, ease: GHOST_EASE_AMBIENT }
          );
        }
      };
    });

    const unsubProgress = scrollProgress.on('change', (value) => {
      if (
        value >= CLIMAX_THRESHOLD &&
        !climaxFiredRef.current &&
        bgRef.current
      ) {
        climaxFiredRef.current = true;
        animate(
          bgRef.current,
          { backgroundColor: COLOR_STOPS[7] },
          { duration: 0.9, ease: GHOST_EASE_AMBIENT }
        );
      }
      if (value < CLIMAX_THRESHOLD) {
        climaxFiredRef.current = false;
      }
    });

    return () => {
      stopInView?.();
      unsubProgress();
    };
  }, [scrollProgress]);

  return (
    <div
      ref={bgRef}
      className="absolute inset-0 z-[var(--z-layer-base)] pointer-events-none bg-background"
      data-testid="beliefs-background"
      aria-hidden="true"
    />
  );
};
