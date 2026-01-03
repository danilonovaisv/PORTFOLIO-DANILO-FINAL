'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { motionTokens } from './motion';
import { kw } from './keywords';

export function AboutClosing() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="min-h-[80vh] flex items-center px-6 md:px-16 lg:px-24 bg-(--ghost-bg) py-24 mt-32 md:mt-40">
      <motion.div
        variants={motionTokens.fadeGhost}
        custom={0.2}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        className="max-w-[560px] text-(--ghost-text)"
      >
        <p className="mb-12 text-lg md:text-xl leading-relaxed">
          Hoje sou Diretor de Criação, com mais de 10 anos de estrada. Quero
          criar algo que {kw('permaneça')} — com você.
        </p>

        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-8">
          <a className="cta">Fale comigo</a>
          <a className="cta">Download CV</a>
        </div>
      </motion.div>
    </section>
  );
}
