import { useMotionGate } from '@/hooks/useMotionGate';

export function usePrefersReducedMotion() {
  return useMotionGate();
}
