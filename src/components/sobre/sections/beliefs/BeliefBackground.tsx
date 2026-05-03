'use client';

import type { RefObject } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { colorPalette } from '@/lib/colors';

interface BeliefBackgroundProps {
  targetRef: RefObject<HTMLElement | null>;
  prefersReducedMotion?: boolean;
}

const toHsl = ([h, s, l]: [number, number, number]) =>
  `hsl(${h}, ${s}%, ${l}%)`;

export function BeliefBackground({
  targetRef,
  prefersReducedMotion,
}: BeliefBackgroundProps) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end end'],
  });

  const colorValues = [
    '#040013', // Abertura
    toHsl(colorPalette.bluePrimary), // Frase 1
    toHsl(colorPalette.blueDeep), // Frase 2
    toHsl(colorPalette.blueCyan), // Frase 3
    toHsl(colorPalette.bluePrimary), // Frase 4
    toHsl(colorPalette.blueDeep), // Frase 5
    toHsl(colorPalette.bluePrimary), // Frase 6 - trava final
    toHsl(colorPalette.bluePrimary), // Saída - trava final
  ];

  const step = 1 / (colorValues.length - 1);
  const points = colorValues.map((_, i) => i * step);

  const backgroundColor = useTransform(scrollYProgress, points, colorValues, {
    clamp: true,
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.03, 0.97, 1],
    [1, 1, 1, 1]
  );

  return (
    <motion.div
      className="absolute inset-0 z-0 pointer-events-none"
      data-testid="beliefs-background"
      style={{
        backgroundColor,
        opacity: prefersReducedMotion ? 0.94 : opacity,
        transition: 'none',
        willChange: 'background-color, opacity',
      }}
      aria-hidden="true"
    />
  );
}
