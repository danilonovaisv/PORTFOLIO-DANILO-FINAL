'use client';

import { RefObject, useRef, useState } from 'react';
import { useScroll, MotionValue, useMotionValueEvent } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { BELIEF_PHRASES } from '@/config/beliefTokens';
import { BELIEF_SCROLL_THRESHOLDS, BELIEF_PHRASE_RANGE } from '@/components/sobre/beliefs/belief.constants';

interface UseBeliefsScrollReturn {
  scrollYProgress: MotionValue<number>;
  isMobile: boolean;
  shouldReduceMotion: boolean;
  prefersReducedMotion: boolean;
  activePhraseIndex: number;
  isClimax: boolean;
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

  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const [isClimax, setIsClimax] = useState(false);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const phraseCount = BELIEF_PHRASES.length;
    const { start, end } = BELIEF_PHRASE_RANGE;
    const normalized = Math.max(0, Math.min(1, (latest - start) / (end - start)));
    const idx = Math.min(Math.floor(normalized * phraseCount), phraseCount - 1);
    setActivePhraseIndex(idx);
    setIsClimax(latest >= BELIEF_SCROLL_THRESHOLDS.finalLock);
  });

  return {
    scrollYProgress,
    isMobile,
    shouldReduceMotion,
    prefersReducedMotion: shouldReduceMotion,
    activePhraseIndex,
    isClimax,
  };
}
