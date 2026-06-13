import type { Variants } from 'motion/react';
import { GHOST_EASE, MOTION_TOKENS } from '@/config/motion';

/**
 * Page route transition variants
 */
export const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    y: MOTION_TOKENS.offset.standard,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_TOKENS.duration.textIn,
      ease: GHOST_EASE,
    },
  },
};
