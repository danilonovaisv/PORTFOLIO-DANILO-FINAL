'use client';

import { m, useTransform } from 'framer-motion';
import { MOTION_TOKENS } from '@/config/motion';
import { useBeliefsScrollContext } from './BeliefsScrollContext';
import { Z_INDEX } from '@/config/z-indices';

// Continuous color progression keyed to scroll progress — no inView race conditions
const COLOR_PROGRESS = [0, 0.10, 0.24, 0.38, 0.52, 0.66, 0.80, 0.82, 1.0];
const COLOR_VALUES = [
  '#040013', // void
  '#0048ff', // blue
  '#8705f2', // purple
  '#f501d3', // pink
  '#0048ff', // blue
  '#8705f2', // purple
  '#f501d3', // pink
  '#0048ff', // blue climax
  '#0048ff', // locked blue
];

export function BeliefBackground() {
  const { scrollYProgress, shouldReduceMotion } = useBeliefsScrollContext();

  const backgroundColor = useTransform(
    scrollYProgress,
    COLOR_PROGRESS,
    COLOR_VALUES
  );

  return (
    <m.div
      data-testid="beliefs-background"
      data-belief-background
      aria-hidden="true"
      style={{
        backgroundColor: shouldReduceMotion ? MOTION_TOKENS.colors.deepVoid : backgroundColor,
        zIndex: Z_INDEX.beliefs.background,
        willChange: 'background-color',
      }}
      className="absolute inset-0"
    />
  );
}
