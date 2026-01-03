// src/components/sobre/motionTokens.ts
export const motionTokens = {
  fadeGhost: {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: {
      opacity: 1, filter: 'blur(0px)',
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
    }
  },
  riseSoft: {
    hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
    visible: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
    }
  }
} as const;
