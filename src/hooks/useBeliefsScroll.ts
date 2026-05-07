'use client';

import { useMemo, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { BELIEF_SCROLL_THRESHOLDS } from '@/components/sobre/beliefs/belief.constants';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useBeliefsScroll() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = Boolean(useReducedMotion());

  const value = useMemo(
    () => ({
      sectionRef,
      containerRef,
      prefersReducedMotion,
      thresholds: BELIEF_SCROLL_THRESHOLDS,
    }),
    [prefersReducedMotion]
  );

  return value;
}
