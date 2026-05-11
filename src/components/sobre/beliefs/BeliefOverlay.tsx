'use client';

import { m, useTransform } from 'framer-motion';
import { useBeliefsScrollContext } from './BeliefsScrollContext';
import { BELIEF_SCROLL_THRESHOLDS } from './belief.constants';

export function BeliefOverlay() {
  const { scrollYProgress, prefersReducedMotion } = useBeliefsScrollContext();

  const opacity = useTransform(
    scrollYProgress,
    [
      0,
      0.05,
      0.35,
      BELIEF_SCROLL_THRESHOLDS.climaxStart,
      BELIEF_SCROLL_THRESHOLDS.climaxEnd,
      BELIEF_SCROLL_THRESHOLDS.finalLock,
    ],
    [0.05, 0.05, 0.15, 0.35, 0.3, 0.1]
  );

  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[var(--z-layer-glass)] bg-background/10 mix-blend-overlay"
      style={{
        opacity: prefersReducedMotion ? 0.2 : opacity,
        backgroundImage:
          'radial-gradient(circle at center, transparent 0%, color-mix(in oklab, var(--color-background) 40%, transparent) 100%)',
      }}
    />
  );
}
