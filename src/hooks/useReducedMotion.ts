import { useMotionGate } from '@/hooks/useMotionGate';

export function useReducedMotion() {
  return useMotionGate();
}

export default useReducedMotion;
