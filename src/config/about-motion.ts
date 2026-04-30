// src/config/about-motion.ts
// Ghost Design Motion Tokens - Fonte da verdade para animações da página Sobre

import { GHOST_EASE } from '@/config/motion';

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

export { GHOST_EASE };
