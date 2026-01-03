// src/components/about/motion.ts
// src/components/about/motion.ts
// Physics: Slower, heavier inertia (Phantom Land style)
const GHOST_EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];

export const motionTokens = {
  ghostIn: {
    hidden: { opacity: 0, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.9, delay: 0.15, ease: GHOST_EASE },
    },
  },
  fadeGhost: {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: (customDelay = 0) => ({
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: GHOST_EASE, delay: customDelay },
    }),
  },
  riseSoft: {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.0, ease: GHOST_EASE },
    },
  },
  clipReveal: {
    hidden: {
      clipPath: 'inset(100% 0 0 0)',
      y: 20,
      opacity: 0,
    },
    visible: {
      clipPath: 'inset(0% 0 0 0)',
      y: 0,
      opacity: 1,
      transition: { duration: 1.4, ease: GHOST_EASE },
    },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: (customDelay = 0) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: customDelay,
      },
    }),
  },
  floatMemory: {
    hidden: { opacity: 1, y: 0 },
    visible: {
      opacity: 1,
      y: [0, -4, 0, 4, 0],
      transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' as const },
    },
  },
  imageFloat: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 0.65,
      scale: 1,
      transition: { duration: 1.4, ease: GHOST_EASE },
    },
  },
};
