'use client';

import { motion, useTransform, type MotionValue } from 'motion/react';

export function BeliefOverlay({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.16, 0.24, 0.33, 0.41, 0.5, 0.58, 0.66, 0.74, 0.83, 0.91, 1],
    [0, 0.15, 0, 0.15, 0, 0.15, 0, 0.15, 0, 0.15, 0, 0.15, 0]
  );

  return (
    <motion.div
      className="absolute inset-0 z-10 bg-black pointer-events-none"
      style={{ opacity }}
    />
  );
}
