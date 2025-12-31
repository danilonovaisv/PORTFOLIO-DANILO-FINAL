import { Variants, Transition } from 'framer-motion';

// Configurações base
export const GHOST_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const GHOST_DURATION = 0.9;
export const GHOST_DURATION_LONG = 1.4;

// Transition Helpers
export const ghostTransition = (
  delay = 0,
  duration = GHOST_DURATION
): Transition => ({
  duration,
  delay,
  ease: GHOST_EASE,
});

// Tokens de Motion

// ghostIn: Opacity + Blur (sem translate/scale)
// Uso: Texto principal, títulos
// Entrada longa e etérea
export const ghostIn: Variants = {
  hidden: {
    opacity: 0,
    filter: 'blur(10px)',
  },
  visible: (customDelay = 0) => ({
    opacity: 1,
    filter: 'blur(0px)',
    transition: ghostTransition(customDelay, GHOST_DURATION_LONG),
  }),
};

// fadeGhost: Variante mais leve de opacity + blur
// Uso: Blocos de texto secundários
export const fadeGhost: Variants = {
  hidden: {
    opacity: 0,
    filter: 'blur(8px)',
  },
  visible: (customDelay = 0.2) => ({
    opacity: 1,
    filter: 'blur(0px)',
    transition: ghostTransition(customDelay),
  }),
};

// riseSoft: Leve Y (~18px) + Opacity + Blur (sem bounce)
// Uso: Listas, cards
export const riseSoft: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: 'blur(8px)',
  },
  visible: (customDelay = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: ghostTransition(customDelay),
  }),
};

// floatMemory: Pequeno deslocamento lateral/vertical + leve blur permanente
// Uso: Imagens flutuantes na seção Origem
export const floatMemory: Variants = {
  hidden: {
    opacity: 0,
    filter: 'blur(12px)',
    x: 10, // Leve offset na entrada
  },
  visible: (customDelay = 0) => ({
    opacity: 0.85, // Nunca 100% opaco
    filter: 'blur(4px)', // Blur permanente leve
    x: 0,
    transition: {
      opacity: { duration: 1.2, delay: customDelay, ease: GHOST_EASE },
      filter: { duration: 1.2, delay: customDelay, ease: GHOST_EASE },
      x: { duration: 1.2, delay: customDelay, ease: GHOST_EASE },
    },
  }),
  // Variante extra para animação contínua (loop) se desejado depois
  float: {
    y: [0, -10, 0],
    x: [0, 5, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    },
  },
};

// staggerGhost: Helper para container de listas
export const staggerGhost = (staggerDelay = 0.18): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.2,
    },
  },
});
