'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';

import { useAntigravityStore } from '@/store/antigravity.store';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const { flags } = useAntigravityStore();

  useEffect(() => {
    // ♿ SE REDUCED MOTION → SEM LENIS
    if (flags.reducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      // smoothTouch is deprecated or not available in standard types depending on version,
      // but 'smooth' definitely doesn't exist. Keeping others for now.
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
