import { GHOST_EASE } from '@/config/motion';

export const easing = GHOST_EASE;

// Canon Timeline Delays (Ghost Era v3.0 - Optimized UI Timing)
export const MODAL_TIMELINE = {
  BACKDROP: 0.18,
  CONTAINER: 0.28,
  MEDIA: 0.22,
  TITLE: 0.18,
  META: 0.24,
  SECONDARY: 0.12,
  STAGGER: 0.04,
} as const;

export const getBackdropVariants = (shouldReduceMotion: boolean | null) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: shouldReduceMotion ? 0.12 : MODAL_TIMELINE.BACKDROP,
      ease: easing,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: shouldReduceMotion ? 0.12 : 0.14,
      ease: easing,
    },
  },
});

export const getContainerVariants = (shouldReduceMotion: boolean | null) => ({
  hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: shouldReduceMotion ? 0.18 : MODAL_TIMELINE.CONTAINER,
      ease: easing,
      delay: shouldReduceMotion ? 0 : 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: shouldReduceMotion ? 0 : 8,
    transition: { duration: shouldReduceMotion ? 0.14 : 0.14, ease: easing },
  },
});

export const getContentVariants = (shouldReduceMotion: boolean | null) => ({
  hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: shouldReduceMotion ? 0.16 : 0.22,
      delay: shouldReduceMotion ? 0 : MODAL_TIMELINE.SECONDARY,
      ease: easing,
      staggerChildren: shouldReduceMotion ? 0 : MODAL_TIMELINE.STAGGER,
    },
  },
});
