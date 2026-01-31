export const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Canon Timeline Delays (Ghost Era v2.0)
export const MODAL_TIMELINE = {
  BACKDROP: 0.18,
  CONTAINER: 0.26,
  MEDIA: 0.52,
  TITLE: 0.76,
  META: 0.96,
  SECONDARY: 1.12,
  STAGGER: 0.08,
} as const;

export const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.4, ease: easing },
};

export const getBackdropVariants = (shouldReduceMotion: boolean | null) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: shouldReduceMotion ? 0 : MODAL_TIMELINE.BACKDROP,
      ease: 'linear' as const,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: shouldReduceMotion ? 0 : 0.15, ease: 'linear' as const },
  },
});

export const getContainerVariants = (shouldReduceMotion: boolean | null) => ({
  hidden: { opacity: 0, scale: 0.98, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: shouldReduceMotion ? 0 : MODAL_TIMELINE.CONTAINER,
      ease: easing,
      delay: shouldReduceMotion ? 0 : 0.12,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: 8,
    transition: { duration: shouldReduceMotion ? 0 : 0.18, ease: easing },
  },
});

export const getMediaVariants = (shouldReduceMotion: boolean | null) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: shouldReduceMotion ? 0 : 0.24,
      delay: shouldReduceMotion ? 0 : MODAL_TIMELINE.MEDIA,
    },
  },
});

export const getTitleVariants = (shouldReduceMotion: boolean | null) => ({
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: shouldReduceMotion ? 0 : 0.2,
      delay: shouldReduceMotion ? 0 : MODAL_TIMELINE.TITLE,
      ease: easing,
    },
  },
});

export const getMetaVariants = (shouldReduceMotion: boolean | null) => ({
  hidden: { opacity: 0, y: 4 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: shouldReduceMotion ? 0 : 0.16,
      delay: shouldReduceMotion ? 0 : MODAL_TIMELINE.META,
      ease: easing,
    },
  },
});

export const getContentVariants = (shouldReduceMotion: boolean | null) => ({
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: shouldReduceMotion ? 0 : 0.24,
      delay: shouldReduceMotion ? 0 : MODAL_TIMELINE.SECONDARY,
      ease: easing,
      staggerChildren: shouldReduceMotion ? 0 : MODAL_TIMELINE.STAGGER,
    },
  },
});
