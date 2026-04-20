'use client';

/**
 * BeliefBackground — Layer 0 (z-0).
 * Interpolação contínua HSL via useTransform — vinculada ao scroll.
 *
 * CORREÇÃO CRÍTICA v2:
 * NUNCA usar animate() para mudar backgroundColor aqui.
 * animate() é disparo discreto — não lê o MotionValue do scroll em tempo real.
 * useTransform mapeia o MotionValue diretamente: 0fps overhead quando parado.
 *
 * Ciclo obrigatório: Deep Void → bluePrimary → purpleDetails → pinkDetails → loop.
 * Fonte: Motion docs — "Map scroll progress to CSS values with useTransform"
 */

import { motion, useTransform, type MotionValue } from 'motion/react';

interface BeliefBackgroundProps {
  scrollProgress: MotionValue<number>;
}

// Pontos de parada do ciclo (8 valores = entrada + 6 frases + saída)
const PROGRESS_POINTS = [0, 0.12, 0.28, 0.44, 0.58, 0.72, 0.86, 1.0] as const;
const COLOR_STOPS = [
  '#040013', // Deep Void — intro
  '#0048ff', // bluePrimary — frase 1
  '#8705f2', // purpleDetails — frase 2
  '#f501d3', // pinkDetails — frase 3
  '#0048ff', // bluePrimary — frase 4
  '#8705f2', // purpleDetails — frase 5
  '#f501d3', // pinkDetails — frase 6
  '#040013', // Deep Void — clímax/saída
] as const;

export const BeliefBackground = ({ scrollProgress }: BeliefBackgroundProps) => {
  const backgroundColor = useTransform(
    scrollProgress,
    [...PROGRESS_POINTS],
    [...COLOR_STOPS]
  );

  return (
    <motion.div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ backgroundColor }}
      aria-hidden="true"
    />
  );
};
