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
    [0, 0.166, 0.333, 0.5, 0.666, 0.833, 1],
    [
      'hsl(230, 85%, 30%)',
      'hsl(270, 80%, 40%)',
      'hsl(330, 85%, 50%)',
      'hsl(230, 85%, 30%)',
      'hsl(270, 80%, 40%)',
      'hsl(330, 85%, 50%)',
      'hsl(230, 85%, 30%)'
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
