'use client';

import type { RefObject } from 'react';
import { useEffect } from 'react';
import { useMotionValue, useReducedMotion } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export function useBeliefsScroll(containerRef: RefObject<HTMLElement | null>) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const isMobile = useMediaQuery('(max-width: 767px)');
  const scrollYProgress = useMotionValue(0);

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

      scrollYProgress.set(Math.min(1, Math.max(0, progress)));
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
  };
}
