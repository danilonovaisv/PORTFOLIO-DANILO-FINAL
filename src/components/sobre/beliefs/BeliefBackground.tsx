'use client';

import { motion, useTransform, type MotionValue } from 'motion/react';

interface BeliefBackgroundProps {
  scrollProgress: MotionValue<number>;
}

/**
 * Background layer da Seção 06.
 * Ciclo obrigatório: bluePrimary → purpleDetails → pinkDetails → loop.
 * Interpolação contínua vinculada ao scroll via useTransform.
 * NUNCA usar animate() ou CSS transition aqui — causa flicker e dessincronia.
 */
export const BeliefBackground = ({ scrollProgress }: BeliefBackgroundProps) => {
  const backgroundColor = useTransform(
    scrollProgress,
    [0, 0.15, 0.30, 0.45, 0.60, 0.75, 0.88, 1.0],
    [
      '#040013', // intro — Deep Void
      '#0048ff', // bluePrimary
      '#8705f2', // purpleDetails
      '#f501d3', // pinkDetails
      '#0048ff', // bluePrimary (loop 2)
      '#8705f2', // purpleDetails
      '#f501d3', // pinkDetails
      '#040013', // fade-out para o manifesto
    ]
  );

  return (
    <motion.div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ backgroundColor }}
      aria-hidden="true"
    />
  );
};
