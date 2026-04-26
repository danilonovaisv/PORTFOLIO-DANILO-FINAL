'use client';

import {
  motion,
  type MotionValue,
  useTransform,
  useMotionValue,
} from 'motion/react';
import { MOTION_TOKENS } from '@/config/motion';

interface BeliefBackgroundProps {
  scrollProgress?: MotionValue<number>;
  prefersReducedMotion?: boolean;
}

export function BeliefBackground({
  scrollProgress,
  prefersReducedMotion,
}: BeliefBackgroundProps) {
  // Reduced motion: static deep void color — no animated transitions
  if (prefersReducedMotion) {
    return (
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        data-testid="beliefs-background"
        style={{ backgroundColor: MOTION_TOKENS.colors.deepVoid }}
        aria-hidden="true"
      />
    );
  }

  // We map the scroll progress from 0 to 1 across the colors used in the original logic.
  // The original logic abruptly switched colors. We now provide smooth interpolation.
  const fallbackProgress = useMotionValue(0);
  const backgroundColor = useTransform(
    scrollProgress || fallbackProgress,
    [0, 0.16, 0.33, 0.5, 0.66, 0.82, 1],
    [
      MOTION_TOKENS.colors.bgCycle[1], // 0.00
      MOTION_TOKENS.colors.bgCycle[2], // 0.16
      MOTION_TOKENS.colors.bgCycle[3], // 0.33
      MOTION_TOKENS.colors.bgCycle[4], // 0.50
      MOTION_TOKENS.colors.bgCycle[5], // 0.66
      MOTION_TOKENS.colors.deepVoid, // 0.82
      MOTION_TOKENS.colors.deepVoid, // 1.00
    ]
  );

  return (
    <motion.div
      className="absolute inset-0 z-0 pointer-events-none"
      data-testid="beliefs-background"
      style={{ backgroundColor }}
      aria-hidden="true"
    />
  );
}
