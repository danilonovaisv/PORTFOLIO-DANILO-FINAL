'use client';

import { useMemo, useRef } from 'react';
import { useReducedMotion, useScroll, useTransform } from 'motion/react';
import {
  BELIEF_PHRASES,
  BELIEF_SCROLL_THRESHOLDS,
} from '@/components/sobre/beliefs/belief.constants';

export function useBeliefsScroll() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = Boolean(useReducedMotion());

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // phraseProgress mapped across the scroll duration before climax
  const phraseProgress = useTransform(
    scrollYProgress,
    [0.08, 0.76],
    [0, BELIEF_PHRASES.length - 1]
  );

  const value = useMemo(
    () => ({
      sectionRef,
      scrollYProgress,
      phraseProgress,
      prefersReducedMotion,
      thresholds: BELIEF_SCROLL_THRESHOLDS,
    }),
    [phraseProgress, prefersReducedMotion, scrollYProgress]
  );

  return value;
}
