// lib/motion.ts
export const motionConfig = {
  transition: {
    default: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }, // easeOutExpo-like
    fast: { duration: 0.4, ease: [0.26, 0.84, 0.44, 1] as const },
  },
  float: {
    amplitude: 0.12, // intensidade do float da orb
    speed: 0.6, // rotações por segundo
  },
};
