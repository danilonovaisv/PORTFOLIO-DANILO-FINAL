'use client';

import { useRef, type RefObject } from 'react';
import { useScroll, useTransform } from 'framer-motion';

const COLORS = [
  'hsl(230, 85%, 30%)',
  'hsl(270, 80%, 40%)',
  'hsl(330, 85%, 50%)',
  'hsl(230, 85%, 30%)',
  'hsl(270, 80%, 40%)',
  'hsl(330, 85%, 50%)',
  'hsl(230, 85%, 30%)',
];

export function useBeliefScroll(containerRef: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const inputRange = useRef(COLORS.map((_, i) => i / (COLORS.length - 1)));
  const backgroundColor = useTransform(
    scrollYProgress,
    inputRange.current,
    COLORS
  );

  return { scrollYProgress, backgroundColor };
}
