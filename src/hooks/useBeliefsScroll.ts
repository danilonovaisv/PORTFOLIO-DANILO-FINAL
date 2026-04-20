'use client';

/**
 * useBeliefsScroll — Hook central da Seção 06 "O Que Me Move".
 *
 * CORREÇÕES v2 (2026-04-16):
 * • offset: ['start end', 'end end']
 *   Início: quando o TOPO da seção toca o RODAPÉ da viewport (entrada antecipada).
 *   Fim: quando o RODAPÉ da seção toca o RODAPÉ da viewport (saída suave).
 *   NUNCA usar ['start start', 'end end'] — atrasa o início, causa dessincronia
 *   entre cor do BG e texto.
 *
 * • useReducedMotion() da Motion (não hook customizado)
 *   Retorna boolean nativo do device. Trava animações em estado final.
 *
 * Fonte: Motion docs — useScroll offset + useReducedMotion
 */

import { useScroll, useReducedMotion } from 'motion/react';
import { useEffect, useState, type RefObject } from 'react';

interface UseBeliefsScrollReturn {
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  prefersReducedMotion: boolean;
  isMobile: boolean;
}

export const useBeliefsScroll = (
  containerRef: RefObject<HTMLElement | null>
): UseBeliefsScrollReturn => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  // Motion's built-in hook — auto-rerender on setting change
  const reducedMotion = useReducedMotion();
  const prefersReducedMotion = reducedMotion ?? false;

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryList | MediaQueryListEvent) =>
      setIsMobile(e.matches);
    handler(mql);
    mql.addEventListener('change', handler as (e: MediaQueryListEvent) => void);
    return () =>
      mql.removeEventListener(
        'change',
        handler as (e: MediaQueryListEvent) => void
      );
  }, []);

  return { scrollYProgress, prefersReducedMotion, isMobile };
};
