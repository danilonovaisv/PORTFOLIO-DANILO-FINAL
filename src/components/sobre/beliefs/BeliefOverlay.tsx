'use client';

import { motion, useTransform, type MotionValue } from 'motion/react';

interface BeliefOverlayProps {
  scrollProgress: MotionValue<number>;
}

/**
 * Overlay cross-fade sobre o BeliefBackground.
 * Opacidade oscila 0 → 0.12 → 0 nas transições de cor do background,
 * suavizando banding em telas OLED/gradiente HSL.
 */
export const BeliefOverlay = ({ scrollProgress }: BeliefOverlayProps) => {
  const opacity = useTransform(
    scrollProgress,
    [0, 0.15, 0.22, 0.30, 0.37, 0.45, 0.52, 0.60, 0.67, 0.75, 0.82, 0.88, 1.0],
    [0, 0, 0.12, 0, 0.12, 0, 0.12, 0, 0.12, 0, 0.12, 0, 0]
  );

  return (
    <motion.div
      className="absolute inset-0 z-10 pointer-events-none bg-black"
      style={{ opacity }}
      aria-hidden="true"
    />
  );
};
