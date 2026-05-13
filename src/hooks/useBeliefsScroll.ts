import type { RefObject } from 'react';
import { useEffect, useState, useRef } from 'react';
import { BELIEF_PHRASES } from '@/config/beliefTokens';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useBeliefsScroll(containerRef: RefObject<HTMLElement | null>) {
  // GSAP doesn't require reduced motion checks strictly, but we expose it for components that might
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const scrollYProgress = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isClimax, setIsClimax] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setShouldReduceMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const progress = self.progress;
          scrollYProgress.current = progress;

          const narrativeIndex = Math.min(
            BELIEF_PHRASES.length - 1,
            Math.max(0, Math.round(progress * (BELIEF_PHRASES.length - 1)))
          );

          setActiveIndex(narrativeIndex);
          setIsClimax(progress >= 0.82);
        },
      });
    }, section);

    return () => ctx.revert();
  }, [containerRef]);

  return {
    scrollYProgress,
    isMobile,
    shouldReduceMotion,
    activeIndex,
    isClimax,
  };
}
