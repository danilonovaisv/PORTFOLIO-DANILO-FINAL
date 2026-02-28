'use client';

import { useScroll, useTransform } from 'framer-motion';
import { MutableRefObject } from 'react';

/**
 * Hook for card parallax effect.
 * Calculates progress based on viewport position.
 */
export const useParallaxCard = (ref: MutableRefObject<HTMLElement | null>) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Parallax interno da imagem (move-se um pouco mais rápido/devagar que o scroll)
  // Ajustar valores conforme gosto: [-50, 50] pixels de deslocamento, por exemplo.
  // Como é percentual de altura no CSS (top -17.5%), podemos usar porcentagem aqui ou pixels.
  // Vamos usar pixels para startar.
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return { y };
};
