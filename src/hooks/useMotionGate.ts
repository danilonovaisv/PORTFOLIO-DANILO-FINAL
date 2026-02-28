'use client';

import { useReducedMotion } from 'framer-motion';
import { useAntigravityStore } from '@/store/antigravity.store';

import { useState, useEffect } from 'react';

/**
 * Central gate for animations. Returns true when motion should be disabled
 * (user OS pref or runtime flag from the experience store).
 */
export function useMotionGate(): boolean {
  const flags = useAntigravityStore((state) => state.flags);
  const prefersReduced = !!useReducedMotion();

  // Hydration safety: Return false during initial render to match server
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return false;

  return prefersReduced || flags.reducedMotion;
}

export default useMotionGate;
