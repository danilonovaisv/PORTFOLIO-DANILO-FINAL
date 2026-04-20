'use client';

import { useScroll, useReducedMotion } from 'motion/react';
import { useEffect, useState, type RefObject } from 'react';

/**
 * Scroll provider central da Seção 06.
 * offset: ['start end', 'end end'] — começa quando topo da seção toca
 * o rodapé da viewport (entrada cedo); termina quando o rodapé da seção
 * toca o rodapé da viewport (fim suave). Corrigido em 2026-04-16.
 */
export const useBeliefsScroll = (containerRef: RefObject<HTMLElement | null>) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
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
