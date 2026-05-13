'use client';

import { useState, useEffect, type RefObject } from 'react';
import { useScroll, useReducedMotion } from 'motion/react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export function useBeliefsScroll(containerRef: RefObject<HTMLElement | null>) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const isMobile = useMediaQuery('(max-width: 767px)');
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  // Mantemos estados básicos de fallback ou triggers simples se necessário
  const [activeIndex, setActiveIndex] = useState(0);
  const [isClimax, setIsClimax] = useState(false);

  useEffect(() => {
    // Sincronização básica para atributos de dados, se necessário
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const index = Math.min(5, Math.round(latest * 6));
      setActiveIndex(index);
      setIsClimax(latest >= 0.82);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return {
    scrollYProgress,
    isMobile,
    shouldReduceMotion,
    activeIndex,
    isClimax,
  };
}
