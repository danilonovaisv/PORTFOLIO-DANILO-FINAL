'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

import { useExperienceStore } from '@/store/experience.store';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const { flags } = useExperienceStore();

  useEffect(() => {
    // ♿ SE REDUCED MOTION → SEM LENIS
    if (flags.reducedMotion) return;

    const lenis = new Lenis({
      smooth: true,
      lerp: 0.08,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      smoothTouch: false
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [flags.reducedMotion]);

  return <>{children}</>;
}