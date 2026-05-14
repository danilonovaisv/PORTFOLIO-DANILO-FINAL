import type { RefObject } from 'react';
import { useState, useMemo } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { BELIEF_PHRASES } from '../config/beliefTokens';
import { useMediaQuery } from './useMediaQuery';
import { useMotionGate } from './useMotionGate';

export function useBeliefsScroll(containerRef: RefObject<HTMLElement | null>) {
  const shouldReduceMotion = useMotionGate();
  const isMobile = useMediaQuery('(max-width: 767px)');
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isClimax, setIsClimax] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextProgress = Math.min(1, Math.max(0, latest));
    
    const narrativeIndex = Math.min(
      BELIEF_PHRASES.length - 1,
      Math.max(0, Math.round(nextProgress * (BELIEF_PHRASES.length - 1)))
    );

    setActiveIndex(narrativeIndex);
    setIsClimax(nextProgress >= 0.82);
  });

  return {
    scrollYProgress,
    isMobile,
    shouldReduceMotion,
    activeIndex,
    isClimax,
  };
}
