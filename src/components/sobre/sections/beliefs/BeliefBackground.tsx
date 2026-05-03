'use client';

import { motion, useTransform, MotionValue } from 'motion/react';

interface BeliefBackgroundProps {
  scrollProgress: MotionValue<number>;
  prefersReducedMotion?: boolean;
}

export function BeliefBackground({
  scrollProgress,
  prefersReducedMotion,
}: BeliefBackgroundProps) {
  const colorStops = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1];
  const colorValues = [
    '#040013',
    '#0048ff',
    '#8705f2',
    '#f501d3',
    '#0048ff',
    '#8705f2',
    '#f501d3',
    '#040013',
  ];

  const backgroundColor = useTransform(
    scrollProgress,
    colorStops,
    colorValues,
    {
      clamp: true,
    }
  );

  const opacity = useTransform(
    scrollProgress,
    [0, 0.03, 0.97, 1],
    [1, 1, 1, 1]
  );

  return (
    <motion.div
      className="absolute inset-0 z-0 pointer-events-none"
      data-testid="beliefs-background"
      style={{
        backgroundColor,
        opacity: prefersReducedMotion ? 0.94 : opacity,
      }}
      aria-hidden="true"
    />
  );
}
