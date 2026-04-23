'use client';

/**
 * BeliefFixedHeader — Layer 2 (z-30, sticky).
 *
 * CORREÇÃO v2 (2026-04-16):
 * • initial opacity: 0 (era 0.3 — causava header visível antes do tempo)
 * • useInView com margin '-10%' para gatilho preciso
 * • Sequência obrigatória: Header → Ghost → Texto Rotativo
 *
 * Layout:
 * • Desktop: sticky top-0, alinhado à direita
 * • Mobile: sticky top-[14vh], mesma coreografia
 */

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { SplitText } from '@/lib/motion/split-text';
import { GHOST_EASE, GHOST_EASE_SOFT } from '@/config/motion';

export const BeliefFixedHeader = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    margin: '-10% 0px 0px 0px',
    once: false,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 18, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: GHOST_EASE,
        staggerChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      y: -18,
      filter: 'blur(8px)',
      transition: {
        duration: 0.5,
        ease: GHOST_EASE_SOFT,
      },
    },
  } as const;

  const wordVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: GHOST_EASE },
    },
  } as const;

  return (
    <motion.header
      ref={ref}
      className="sticky top-[14vh] md:top-0 z-[var(--z-layer-header)] w-full pointer-events-none py-8"
      initial="hidden"
      animate={inView ? 'visible' : 'exit'}
      variants={containerVariants}
      aria-label="Acredito no design que muda o dia de alguém"
    >
      <div className="mx-auto flex w-full max-w-[1680px] justify-end px-6 md:px-12 lg:px-16 xl:px-24">
        <div className="max-w-xs text-right md:max-w-sm lg:max-w-md">
          <motion.p
            className="font-display text-sm md:text-base text-white/70
                       uppercase tracking-widest leading-relaxed"
            variants={wordVariants}
          >
            <SplitText
              text="Acredito no design que muda o dia de alguém."
              mode="words"
              variants={wordVariants}
            />
          </motion.p>

          <motion.h2
            className="font-h1 font-bold text-white text-lg md:text-xl
                       mt-2 leading-tight"
            variants={wordVariants}
          >
            <SplitText
              text="Não pelo choque, mas pela conexão."
              mode="words"
              variants={wordVariants}
            />
          </motion.h2>
        </div>
      </div>
    </motion.header>
  );
};
