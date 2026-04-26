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
    offset: ['start end', 'end end'],
  });

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const el = containerRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const nextProgress =
          rect.height > 0
            ? Math.min(
                1,
                Math.max(0, (window.innerHeight - rect.top) / rect.height)
              )
            : 0;

        scrollYProgress.set(nextProgress);
      });
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [containerRef, scrollYProgress]);

  return { containerRef, scrollYProgress };
}
