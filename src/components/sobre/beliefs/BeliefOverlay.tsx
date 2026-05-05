'use client';

import { m, useTransform } from 'framer-motion';
import { useBeliefsScrollContext } from './BeliefsScrollContext';
import { Z_INDEX } from '@/config/z-indices';

export function BeliefOverlay() {
  const { scrollYProgress, shouldReduceMotion } = useBeliefsScrollContext();

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.1, 0]);

  return (
    <m.div
      aria-hidden="true"
      style={{
        opacity: shouldReduceMotion ? 0 : opacity,
        zIndex: Z_INDEX.beliefs.overlay,
      }}
      className="pointer-events-none absolute inset-0 bg-black"
    />
  );
}
