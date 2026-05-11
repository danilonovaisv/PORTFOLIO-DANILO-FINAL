'use client';

import type { RefObject } from 'react';
import { useEffect, useState } from 'react';
import { useMotionValue, useReducedMotion } from 'framer-motion';
import { BELIEF_PHRASES } from '@/config/beliefTokens';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export function useBeliefsScroll(containerRef: RefObject<HTMLElement | null>) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const isMobile = useMediaQuery('(max-width: 767px)');
  const scrollYProgress = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isClimax, setIsClimax] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const section = containerRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const start = sectionTop - window.innerHeight;
      const end = sectionTop + rect.height - window.innerHeight;
      const range = Math.max(1, end - start);
      const progress = (window.scrollY - start) / range;

      const nextProgress = Math.min(1, Math.max(0, progress));
      const narrativeIndex = Math.min(
        BELIEF_PHRASES.length - 1,
        Math.max(0, Math.round(nextProgress * (BELIEF_PHRASES.length - 1)))
      );

      scrollYProgress.set(nextProgress);
      setActiveIndex(narrativeIndex);
      setIsClimax(nextProgress >= 0.82);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [containerRef, scrollYProgress]);

  return {
    scrollYProgress,
    isMobile,
    shouldReduceMotion,
    activeIndex,
    isClimax,
  };
}
