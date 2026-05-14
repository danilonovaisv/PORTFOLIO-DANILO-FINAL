import {
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { useMotionGate } from '@/hooks/useMotionGate';

export function useGhostParallaxY(
  target: React.RefObject<HTMLElement | null>,
  amplitude = 12
): MotionValue<number> {
  const reduce = useMotionGate();
  const { scrollYProgress } = useScroll({
    target,
    offset: ['start end', 'end start'],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    restDelta: 0.001,
  });

  const clamped = Math.min(Math.abs(amplitude), 18);
  return useTransform(smooth, [0, 1], reduce ? [0, 0] : [-clamped, clamped]);
}
