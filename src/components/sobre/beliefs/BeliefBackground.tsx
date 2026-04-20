'use client';

import { motion, useTransform } from 'motion/react';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

const BELIEF_INTRO_END = 0.06;
const BELIEF_PHRASE_ZONE_END = 0.72;

const COLORS = [
  'hsl(230, 85%, 30%)',
  'hsl(270, 80%, 40%)',
  'hsl(330, 85%, 50%)',
  'hsl(230, 85%, 30%)',
  'hsl(270, 80%, 40%)',
  'hsl(330, 85%, 50%)',
];

export function BeliefBackground() {
  const { scrollYProgress } = useBeliefsScrollContext();

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
