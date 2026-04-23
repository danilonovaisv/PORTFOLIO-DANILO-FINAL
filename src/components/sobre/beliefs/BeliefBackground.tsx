'use client';

import { useEffect, useRef } from 'react';
import { animate, inView } from 'motion';
import type { MotionValue } from 'motion/react';
import { GHOST_EASE } from '@/config/motion';

const COLOR_STOPS = [
  '#040013', // Deep Void — intro
  '#0048ff', // bluePrimary — frase 1
  '#8705f2', // purpleDetails — frase 2
  '#f501d3', // pinkDetails — frase 3
  '#0048ff', // bluePrimary — frase 4
  '#8705f2', // purpleDetails — frase 5
  '#f501d3', // pinkDetails — frase 6
  '#040013', // Deep Void — clímax/saída (triggered by scrollProgress >= 0.82)
] as const;

// scrollProgress drives the final return to Deep Void — not reachable via inView
// because there are only 6 scroll-sections (indices 0-5, covering COLOR_STOPS[1-6]).
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
      // Guard: do not override climax Deep Void once fired
      if (climaxFiredRef.current) return;

      const indexAttr = section.getAttribute('data-index');
      if (indexAttr === null) return;

      const index = parseInt(indexAttr, 10);
      const targetColor = COLOR_STOPS[index + 1] || COLOR_STOPS[0];

      if (bgRef.current) {
        animate(
          bgRef.current,
          { backgroundColor: targetColor },
          { duration: 0.9, ease: [0.17, 0.55, 0.55, 1] }
        );
      }

      // Anti-banding overlay pulse
      const overlay = document.getElementById('belief-overlay');
      if (overlay) {
        animate(
          overlay,
          { opacity: [0, 0.1, 0] },
          { duration: 0.9, ease: GHOST_EASE }
        );
      }
    });

    // Final stop: Deep Void return — triggered once when manifesto enters.
    // Stops the inView observer immediately so no concurrent inView animation
    // can race against or override the climax transition.
    const unsubProgress = scrollProgress.on('change', (value) => {
      if (value >= CLIMAX_THRESHOLD && !climaxFiredRef.current && bgRef.current) {
        climaxFiredRef.current = true;
        stopInView?.();
        stopInView = null;
        animate(
          bgRef.current,
          { backgroundColor: COLOR_STOPS[7] },
          { duration: 0.9, ease: [0.17, 0.55, 0.55, 1] }
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
      className="absolute inset-0 z-0 pointer-events-none bg-background"
      aria-hidden="true"
    />
  );
};
