import { useMemo } from 'react';
import { useMotionGate } from '@/hooks/useMotionGate';

const GHOST_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function useGhostReveal(y = 18, duration = 0.8, delay = 0) {
  const reduce = useMotionGate();

  return useMemo(() => {
    if (reduce) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.2 },
      };
    }

    return {
      initial: { opacity: 0, y: Math.min(y, 18), filter: 'blur(8px)' },
      animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
      transition: { duration, delay, ease: GHOST_EASE },
    };
  }, [reduce, y, duration, delay]);
}
