import type { Variants } from 'motion/react';
import { GHOST_EASE, MOTION_TOKENS } from '@/config/motion';

/**
 * Ghost Reveal - Standard entry with heavy blur
 */
export const ghostReveal: Variants = {
  hidden: { opacity: 0, filter: MOTION_TOKENS.blur.hidden },
  visible: {
    opacity: 1,
    filter: MOTION_TOKENS.blur.visible,
    transition: {
      duration: MOTION_TOKENS.duration.GHOST_REVEAL,
      ease: GHOST_EASE,
    },
  },
};

/**
 * Ghost Rise - Entry with subtle vertical movement
 */
export const ghostRise: Variants = {
  hidden: {
    opacity: 0,
    y: MOTION_TOKENS.offset.standard,
    filter: MOTION_TOKENS.blur.hidden,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: MOTION_TOKENS.blur.visible,
    transition: {
      duration: MOTION_TOKENS.duration.GHOST_REVEAL,
      ease: GHOST_EASE,
    },
  },
};

/**
 * Simple fade transition
 */
export const ghostFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: MOTION_TOKENS.duration.normal,
      ease: GHOST_EASE,
    },
  },
};

/**
 * Simplified reveal (no blur, subtle Y)
 */
export const ghostRevealSimple: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_TOKENS.duration.normal,
      ease: GHOST_EASE,
    },
  },
};
