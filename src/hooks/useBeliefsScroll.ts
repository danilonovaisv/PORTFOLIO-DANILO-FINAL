import type { RefObject } from 'react';
import { useEffect, useState, useRef, useMemo } from 'react';
import { BELIEF_PHRASES } from '../config/beliefTokens';
import { useMediaQuery } from './useMediaQuery';

export function useBeliefsScroll(containerRef: RefObject<HTMLElement | null>) {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const progressRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isClimax, setIsClimax] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) =>
      setShouldReduceMotion(event.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const scrollYProgress = useMemo(
    () => ({
      get: () => progressRef.current,
    }),
    []
  );

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

      progressRef.current = nextProgress;

      setActiveIndex((prev) =>
        prev !== narrativeIndex ? narrativeIndex : prev
      );
      setIsClimax((prev) => {
        const nextClimax = nextProgress >= 0.82;
        return prev !== nextClimax ? nextClimax : prev;
      });
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [containerRef]);

  return {
    scrollYProgress,
    isMobile,
    shouldReduceMotion,
    activeIndex,
    isClimax,
  };
}
