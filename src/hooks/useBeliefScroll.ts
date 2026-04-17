'use client';

import { useRef, type RefObject } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import {
  BELIEF_INTRO_END,
  BELIEF_PHRASE_ZONE_END,
} from './useBeliefsAnimation';

const COLORS = [
  'hsl(230, 85%, 30%)',
  'hsl(270, 80%, 40%)',
  'hsl(330, 85%, 50%)',
  'hsl(230, 85%, 30%)',
  'hsl(270, 80%, 40%)',
  'hsl(330, 85%, 50%)',
];

export function useBeliefScroll(containerRef: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const inputRange = useRef([
    0,
    ...COLORS.map(
      (_, i) =>
        BELIEF_INTRO_END +
        (i / (COLORS.length - 1)) * (BELIEF_PHRASE_ZONE_END - BELIEF_INTRO_END)
    ),
    1,
  ]);

  const outputColors = [COLORS[0], ...COLORS, COLORS[COLORS.length - 1]];

  const backgroundColor = useTransform(
    scrollYProgress,
    inputRange.current,
    outputColors
  );

  return { scrollYProgress, backgroundColor };
}
