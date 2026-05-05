'use client';

import { RefObject, useRef } from 'react';
import { useScroll, MotionValue } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface UseBeliefsScrollReturn {
  scrollYProgress: MotionValue<number>;
  isMobile: boolean;
  shouldReduceMotion: boolean;
}

export function useBeliefsScroll(
  containerRef?: RefObject<HTMLElement | null>
): UseBeliefsScrollReturn {
  const fallbackRef = useRef<HTMLElement | null>(null);
  const targetRef = containerRef || fallbackRef;

  const shouldReduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isMobile = useMediaQuery('(max-width: 767px)');

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end end'],
  });

  return {
    scrollYProgress,
    isMobile,
    shouldReduceMotion,
  };
}
