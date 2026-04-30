'use client';

import { useScroll } from 'motion/react';
import { useEffect, useRef, type RefObject } from 'react';
import { useBeliefStore } from '@/store/beliefStore';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function useBeliefsScroll(
  externalRef?: RefObject<HTMLDivElement | HTMLElement | null>
) {
  const localRef = useRef<HTMLDivElement>(null);
  const containerRef = externalRef ?? localRef;
  const setMobile = useBeliefStore((s) => s.setMobile);
  const setReducedMotion = useBeliefStore((s) => s.setReducedMotion);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setReducedMotion(prefersReducedMotion);

    const mq = window.matchMedia('(max-width: 767px)');
    const syncMobile = () => setMobile(mq.matches);
    const mediaHandler = (e: MediaQueryListEvent) => setMobile(e.matches);

    syncMobile();
    mq.addEventListener('change', mediaHandler);
    window.addEventListener('resize', syncMobile, { passive: true });

    return () => {
      mq.removeEventListener('change', mediaHandler);
      window.removeEventListener('resize', syncMobile);
    };
  }, [prefersReducedMotion, setMobile, setReducedMotion]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return { containerRef, scrollYProgress };
}
