'use client';

import { motion, useTransform, type MotionValue } from 'framer-motion';

export function BeliefOverlay({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  // Reduced overlay flicker: fewer pulses (3 instead of 6) and lower peak
  // amplitude (0.09 instead of 0.15) keep the color transitions smooth
  // without triggering WCAG 2.3.3 sensitivity from repeated black flashes.
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.16, 0.33, 0.5, 0.66, 0.83, 1],
    [0, 0.09, 0, 0.09, 0, 0.09, 0]
  );

  return (
    <motion.div
      className="absolute inset-0 z-10 bg-black pointer-events-none"
      style={{ opacity }}
    />
  );
}
