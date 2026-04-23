'use client';

import { motion, useTransform, type MotionValue } from 'motion/react';

/**
 * BeliefOverlay — Layer 1 (z-10).
 * Cross-fade transitional para evitar banding OLED entre cores HSL.
 * Opacidade pulsa levemente nas transições de cor sem dominar a cena.
 */

interface BeliefOverlayProps {
  scrollProgress: MotionValue<number>;
}

export const BeliefOverlay = ({ scrollProgress }: BeliefOverlayProps) => {
  const opacity = useTransform(
    scrollProgress,
    [0, 0.08, 0.16, 0.24, 0.32, 0.4, 0.48, 0.56, 0.64, 0.72, 0.8, 0.9, 1],
    [
      0.02, 0.08, 0.025, 0.09, 0.025, 0.09, 0.025, 0.09, 0.025, 0.08, 0.03,
      0.06, 0.03,
    ]
  );

  return (
    <motion.div
      className="absolute inset-0 z-[var(--z-layer-glass)] pointer-events-none bg-black"
      data-testid="beliefs-overlay"
      style={{ opacity }}
      aria-hidden="true"
    />
  );
};
