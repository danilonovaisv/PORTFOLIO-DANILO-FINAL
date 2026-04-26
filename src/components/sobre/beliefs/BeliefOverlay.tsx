'use client';

import { motion, useTransform, type MotionValue } from 'motion/react';

interface BeliefOverlayProps {
  scrollProgress: MotionValue<number>;
}

export function BeliefOverlay({ scrollProgress }: BeliefOverlayProps) {
  const opacity = useTransform(
    scrollProgress,
    [0, 0.15, 0.85, 1],
    [0, 0.08, 0.08, 0]
  );

  return (
    <motion.div
      className="absolute inset-0 z-10 bg-black pointer-events-none"
      data-testid="beliefs-overlay"
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
