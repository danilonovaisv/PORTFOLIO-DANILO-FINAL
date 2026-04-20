'use client';

import { useScroll, useReducedMotion } from 'motion/react';
import { useEffect, useState, type RefObject } from 'react';

/**
 * Scroll provider central da Seção 06.
 * offset: ['start start', 'end end'] — timeline íntegra enquanto a
 * seção ocupa a viewport, alinhada ao blueprint técnico da seção 06.
 */
export const useBeliefsScroll = (containerRef: RefObject<HTMLElement | null>) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const prefersReducedMotion = useReducedMotion() ?? false;

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile(e.matches);
    handler(mql);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return { scrollYProgress, prefersReducedMotion, isMobile };
};
