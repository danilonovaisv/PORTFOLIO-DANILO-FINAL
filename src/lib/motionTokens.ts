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

// floatMemory: Pequeno deslocamento lateral/vertical
// Uso: Imagens flutuantes na seção Origem
export const floatMemory: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    x: 10,
  },
  visible: (customDelay = 0) => ({
    opacity: 0.65, // Opacity 0.6-0.7 conforme spec
    y: 0,
    x: 0,
    transition: {
      opacity: { duration: 1.2, delay: customDelay, ease: GHOST_EASE },
      y: { duration: 1.2, delay: customDelay, ease: GHOST_EASE },
      x: { duration: 1.2, delay: customDelay, ease: GHOST_EASE },
    },
  }),
};

// imageFloat: Entrada suave para imagens intercaladas
// Uso: Imagens da seção Origem (sem blur, opacity controlada)
// NOTA: Sem scale/bounce/rotate conforme Ghost Design System
export const imageFloat: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: (customDelay = 0) => ({
    opacity: 0.65, // Opacity 0.6-0.7 conforme spec
    y: 0,
    transition: {
      duration: 1,
      delay: customDelay,
      ease: GHOST_EASE,
    },
  }),
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
