'use client';

import { useScroll, useReducedMotion } from 'motion/react';
import { useEffect, useRef, type RefObject } from 'react';
import { useBeliefStore } from '@/store/beliefStore';

export function useBeliefsScroll(
  externalRef?: RefObject<HTMLDivElement | HTMLElement | null>
) {
  const localRef = useRef<HTMLDivElement>(null);
  const containerRef = externalRef ?? localRef;
  const setMobile = useBeliefStore((s) => s.setMobile);
  const setReducedMotion = useBeliefStore((s) => s.setReducedMotion);
  const prefersReducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    setReducedMotion(prefersReducedMotion);

    const mq = window.matchMedia('(max-width: 767px)');
    setMobile(mq.matches);

    const handler = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener('change', handler);

    return () => mq.removeEventListener('change', handler);
  }, [prefersReducedMotion, setMobile, setReducedMotion]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return { containerRef, scrollYProgress };
}
