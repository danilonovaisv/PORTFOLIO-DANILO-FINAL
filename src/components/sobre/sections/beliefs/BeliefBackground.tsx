'use client';

import { motion, useTransform, MotionValue } from 'motion/react';
import { colorSequence, interpolateHSL } from '@/lib/colors';

interface BeliefBackgroundProps {
  scrollProgress: MotionValue<number>;
  prefersReducedMotion?: boolean;
}

export function BeliefBackground({
  scrollProgress,
  prefersReducedMotion,
}: BeliefBackgroundProps) {
  // Interpolação contínua entre as cores da sequência
  const backgroundColor = useTransform(scrollProgress, (v) => {
    if (prefersReducedMotion) return '#040013';

    const segments = colorSequence.length - 1;
    const position = v * segments;
    const index = Math.floor(position);
    const nextIndex = Math.min(index + 1, segments);
    const t = position - index;

    return interpolateHSL(colorSequence[index], colorSequence[nextIndex], t);
  });

  const opacity = useTransform(
    scrollProgress,
    [0, 0.05, 0.9, 0.98],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      className="absolute inset-0 z-0 pointer-events-none"
      data-testid="beliefs-background"
      style={{ backgroundColor, opacity }}
      aria-hidden="true"
    />
  );
}
