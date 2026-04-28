/**
 * Canonical motion preference hooks.
 * Both `useReducedMotion` and `usePrefersReducedMotion` are aliases for `useMotionGate`.
 * Use either — they are interchangeable.
 *
 * @canonical useMotionGate → src/hooks/useMotionGate.ts
 */
import { useMotionGate } from '@/hooks/useMotionGate';

/** Returns true if the user prefers reduced motion. */
export function useReducedMotion() {
  return useMotionGate();
}

/** Alias for `useReducedMotion`. @see useReducedMotion */
export function usePrefersReducedMotion() {
  return useMotionGate();
}

