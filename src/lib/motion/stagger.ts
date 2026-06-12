import type { Variants } from 'motion/react';
import { MOTION_TOKENS } from '@/config/motion';

/**
 * Stagger Container - Parent for staggered children
 * Use for: Lists, grids, card groups
 */
export const staggerContainer = (
  staggerDelay: number = MOTION_TOKENS.stagger.relaxed as number,
  delayChildren: number = 0.2
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});
