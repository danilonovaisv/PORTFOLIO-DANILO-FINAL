'use client';

import { useAntigravityStore } from '@/store/antigravity.store';
import { useState, useEffect } from 'react';

/**
 * Central gate for animations. Returns true when motion should be disabled
 * (user OS pref or runtime flag from the experience store).
 */
export function useMotionGate(): boolean {
  const flags = useAntigravityStore((state) => state.flags);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Check OS preferences for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    // Modern event listener support
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(listener);
      return () => mediaQuery.removeListener(listener);
    }
  }, []);

  // Hydration safety: Return false during initial render to match server
  if (!isMounted) return false;

  return prefersReduced || flags.reducedMotion;
}
