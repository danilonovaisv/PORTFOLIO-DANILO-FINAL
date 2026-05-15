'use client';

import { m, useTransform } from 'motion/react';
import { beliefZIndex } from '@/config/beliefTokens';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

export function BeliefOverlay() {
  const { scrollYProgress, shouldReduceMotion } = useBeliefsScrollContext();

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.5, 0.82, 1],
    [0.04, 0.08, 0.1, 0.08, 0.04]
  );

  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-black"
      style={{
        zIndex: beliefZIndex.overlay,
        opacity: shouldReduceMotion ? 0.06 : opacity,
      }}
    />
  );
}
