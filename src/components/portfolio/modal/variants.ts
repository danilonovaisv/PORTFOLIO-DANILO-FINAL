import { GHOST_EASE } from '@/config/motion';

export const easing = GHOST_EASE;

// Canon Timeline Delays (Ghost Era v2.0)
export const MODAL_TIMELINE = {
  BACKDROP: 0.18,
  CONTAINER: 0.6,
  MEDIA: 0.52,
  TITLE: 0.76,
  META: 0.96,
  SECONDARY: 1.12,
  STAGGER: 0.08,
} as const;

export const getBackdropVariants = (shouldReduceMotion: boolean | null) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: shouldReduceMotion ? 0.15 : MODAL_TIMELINE.BACKDROP,
      ease: easing,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: shouldReduceMotion ? 0.15 : 0.15,
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
      duration: shouldReduceMotion ? 0.2 : MODAL_TIMELINE.CONTAINER,
      ease: easing,
      delay: shouldReduceMotion ? 0 : 0.12,
    },
  },
  exit: {
    opacity: 0,
    y: shouldReduceMotion ? 0 : 8,
    transition: { duration: shouldReduceMotion ? 0.18 : 0.18, ease: easing },
  },
});

export const getContentVariants = (shouldReduceMotion: boolean | null) => ({
  hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: shouldReduceMotion ? 0.2 : 0.24,
      delay: shouldReduceMotion ? 0 : MODAL_TIMELINE.SECONDARY,
      ease: easing,
      staggerChildren: shouldReduceMotion ? 0 : MODAL_TIMELINE.STAGGER,
    },
  },
});
