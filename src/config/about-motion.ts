// src/config/about-motion.ts
// Ghost Design Motion Tokens - Fonte da verdade para animações da página Sobre

/**
 * Ghost Easing - A curva de animação principal do sistema
 * Suave, etérea, sem bounce ou elastic
 */
const GHOST_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Tokens de Motion para a página Sobre
 * REGRAS ABSOLUTAS:
 * - ❌ Scale proibido
 * - ❌ Bounce proibido
 * - ❌ Rotate proibido
 * - ✅ Opacity + Blur permitidos
 * - ✅ TranslateY máx 18px permitido
 */
export const motionTokens = {
  /**
   * FadeGhost - Entrada padrão com blur
   * Uso: Textos, títulos, seções
   */
  fadeGhost: {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.9, ease: GHOST_EASE },
    },
  },

  /**
   * RiseSoft - Entrada com leve rise (18px máx)
   * Uso: Cards, itens de lista
   */
  riseSoft: {
    hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.9, ease: GHOST_EASE },
    },
  },

  /**
   * ImageFloat - Entrada lateral para imagens
   * Nota: Imagens NUNCA chegam a 100% opacity (máx 0.85)
   */
  imageFloat: {
    hidden: { opacity: 0, x: 12 },
    visible: {
      opacity: 0.85,
      x: 0,
      transition: { duration: 1.2, ease: GHOST_EASE },
    },
  },

  /**
   * TimeBased - Para textos que aparecem por tempo, não scroll
   * Uso: Seção Beliefs/Manifesto
   */
  timeBased: {
    hidden: { opacity: 0, filter: 'blur(8px)', y: 18 },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: { duration: 0.8, ease: GHOST_EASE },
    },
    exit: {
      opacity: 0,
      filter: 'blur(8px)',
      y: -18,
      transition: { duration: 0.6, ease: GHOST_EASE },
    },
  },
};

/**
 * Delays padrão do sistema
 */
export const motionDelays = {
  none: 0,
  short: 0.2,
  base: 0.4,
  long: 1.0,
  stagger: 0.18,
};

/**
 * Durações padrão do sistema
 */
export const motionDurations = {
  fast: 0.6,
  base: 0.9,
  slow: 1.4,
};

/**
 * Configurações de Spring (Física)
 */
export const motionSprings = {
  ghost: {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  },
};

export { GHOST_EASE };
