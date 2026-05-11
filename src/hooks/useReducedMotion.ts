/**
 * Canonical motion preference hooks.
 * `useReducedMotion` is an alias for `useMotionGate`.
 * Use either — they are interchangeable.
 *
 * @canonical useMotionGate → src/hooks/useMotionGate.ts
 */
import { useMotionGate } from '@/hooks/useMotionGate';

/** Returns true if the user prefers reduced motion. */
export function useReducedMotion() {
  return useMotionGate();
}

