'use client';

import { motion, useTransform, type MotionValue } from 'framer-motion';
import {
  BELIEF_INTRO_END,
  BELIEF_PHRASE_ZONE_END,
} from '@/hooks/useBeliefsAnimation';

const COLORS = [
  'hsl(230, 85%, 30%)',
  'hsl(270, 80%, 40%)',
  'hsl(330, 85%, 50%)',
  'hsl(230, 85%, 30%)',
  'hsl(270, 80%, 40%)',
  'hsl(330, 85%, 50%)',
];

export function BeliefBackground({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const inputRange = [
    0,
    ...COLORS.map(
      (_, i) =>
        BELIEF_INTRO_END +
        (i / (COLORS.length - 1)) * (BELIEF_PHRASE_ZONE_END - BELIEF_INTRO_END)
    ),
    1,
  ];
  const outputColors = [COLORS[0], ...COLORS, COLORS[COLORS.length - 1]];
  const backgroundColor = useTransform(
    scrollYProgress,
    inputRange,
    outputColors
  );

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-0"
      style={{ backgroundColor }}
    />
  );
}
