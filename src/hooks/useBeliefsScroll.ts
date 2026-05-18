import type { RefObject } from 'react';
import { useState, useRef, useEffect } from 'react';
import { BELIEF_PHRASES } from '../config/beliefTokens';
import { useMediaQuery } from './useMediaQuery';
import { useMotionGate } from './useMotionGate';

export function useBeliefsScroll(containerRef: RefObject<HTMLElement | null>) {
  const shouldReduceMotion = useMotionGate();
  const isMobile = useMediaQuery('(max-width: 767px)');

  const progressRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isClimax, setIsClimax] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = rect.top + window.scrollY;
      const containerHeight = containerRef.current.scrollHeight;

      const raw = (window.scrollY - containerTop) / containerHeight;
      const progress = Math.min(1, Math.max(0, raw));

      progressRef.current = progress;

      const narrativeIndex = Math.min(
        BELIEF_PHRASES.length - 1,
        Math.max(0, Math.round(progress * (BELIEF_PHRASES.length - 1)))
      );

      setActiveIndex((prev) =>
        prev !== narrativeIndex ? narrativeIndex : prev
      );
      setIsClimax((prev) => {
        const next = progress >= 0.82;
        return prev !== next ? next : prev;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef]);

  return {
    scrollYProgress: { get: () => progressRef.current },
    isMobile,
    shouldReduceMotion,
    activeIndex,
    isClimax,
  };
}
