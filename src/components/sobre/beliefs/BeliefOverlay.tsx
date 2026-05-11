'use client';

import { m, useTransform } from 'framer-motion';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

export function BeliefOverlay() {
  const { scrollYProgress, shouldReduceMotion } = useBeliefsScrollContext();
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.1, 0]);

  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-black"
      style={{
        zIndex: 10,
        opacity: shouldReduceMotion ? 0.06 : opacity,
      }}
    />
  );
}
