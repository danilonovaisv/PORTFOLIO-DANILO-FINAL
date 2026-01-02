'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { kw } from './keywords';

export function AboutBeliefs() {
  const prefersReducedMotion = useReducedMotion();

  const manifestoVariants = {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: (custom: number) => ({
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        delay: prefersReducedMotion ? 0 : custom + 0.2,
        duration: prefersReducedMotion ? 0 : 0.9,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section className="min-h-screen flex items-center justify-center text-center bg-(--ghost-bg) py-24 mt-24 md:mt-28">
      <div className="max-w-[40ch] space-y-10 px-6">
        <motion.p
          custom={0}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          animate="visible"
          variants={manifestoVariants}
          className="text-xl md:text-3xl lg:text-4xl text-(--ghost-text) leading-relaxed"
        >
          Acredito no design que muda o dia de alguém. Não pelo {kw('choque')} —
          mas pela conexão.
        </motion.p>

        <motion.p
          custom={1.2}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          animate="visible"
          variants={manifestoVariants}
          className="text-xl md:text-3xl lg:text-4xl text-(--ghost-text) leading-relaxed"
        >
          Um vídeo que {kw('respira')}. Uma marca que se reconhece.
        </motion.p>

        <motion.p
          custom={2.4}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          animate="visible"
          variants={manifestoVariants}
          className="text-xl md:text-3xl lg:text-4xl text-(--ghost-text) leading-relaxed"
        >
          Isso é {kw('ghost design')}.
        </motion.p>
      </div>
    </section>
  );
}
