'use client';

/**
 * BeliefOverlay — Layer 1 (z-10).
 * Cross-fade transitional para evitar banding OLED entre cores HSL.
 * Opacidade pulsa levemente nas transições de cor sem dominar a cena.
 */

import { motion, useTransform, type MotionValue } from 'motion/react';

interface BeliefOverlayProps {
  scrollProgress: MotionValue<number>;
}

export const BeliefOverlay = ({ scrollProgress }: BeliefOverlayProps) => {
  // Pulso suave de opacidade nas bordas de cada transição de cor
  const opacity = useTransform(
    scrollProgress,
    [0, 0.1, 0.2, 0.28, 0.36, 0.44, 0.52, 0.58, 0.66, 0.72, 0.8, 0.86, 1.0],
    [0, 0, 0.1, 0, 0.1, 0, 0.1, 0, 0.1, 0, 0.1, 0, 0]
  );

  return (
    <motion.div
      className="absolute inset-0 z-10 pointer-events-none bg-black"
      style={{ opacity }}
      aria-hidden="true"
    />
  );
};
