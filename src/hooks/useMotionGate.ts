'use client';

import { useReducedMotion } from 'framer-motion';
import { useAntigravityStore } from '@/store/antigravity.store';

/**
 * Central gate for animations. Returns true when motion should be disabled
 * (user OS pref or runtime flag from the experience store).
 */
export function useMotionGate(): boolean {
  const flags = useAntigravityStore((state) => state.flags);
  const prefersReduced = !!useReducedMotion();
  return prefersReduced || flags.reducedMotion;
}

export default useMotionGate;
