import type { Variants } from 'motion/react';
import { GHOST_EASE, MOTION_TOKENS } from '@/config/motion';

/**
 * Eyebrow entrance variants
 */
export const eyebrowVariants: Variants = {
  hidden: {
    opacity: 0,
    y: MOTION_TOKENS.offset.standard,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 0.7,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: MOTION_TOKENS.duration.normal,
      ease: GHOST_EASE,
      delay: 0.2,
    },
  },
};

/**
 * Title Line entrance variants (Word/Line reveals)
 */
export const titleLineVariants: Variants = {
  hidden: {
    opacity: 0,
    y: MOTION_TOKENS.offset.standard,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: MOTION_TOKENS.duration.ghostIn,
      ease: GHOST_EASE,
    },
  },
};

/**
 * Subtitle entrance variants (Fade + Blur)
 */
export const subtitleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: MOTION_TOKENS.offset.standard,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 0.6,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: MOTION_TOKENS.duration.slow,
      ease: GHOST_EASE,
      delay: 0.4,
    },
  },
};

/**
 * CTA entrance variants (snappy and delayed)
 */
export const ctaVariants: Variants = {
  hidden: {
    opacity: 0,
    y: MOTION_TOKENS.offset.standard,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: MOTION_TOKENS.duration.normal,
      ease: GHOST_EASE,
      delay: 1.0,
    },
  },
};
