'use client';

import { motion } from 'framer-motion';
import { kw } from './keywords';
import { useEditorialMotion } from '@/hooks/useEditorialMotion';

const items = [
  <>Direção criativa que organiza o {kw('caos')}</>,
  <>Design estratégico que guia {kw('decisões')}</>,
  <>Identidades que permanecem na {kw('memória')}</>,
  <>Campanhas multicanais com lógica e {kw('emoção')}</>,
  <>Branding que não grita — mas {kw('marca')}</>,
  <>IA aplicada à {kw('criação')} e automação</>,
  <>Liderança criativa com {kw('visão')} e método</>,
];

export function AboutWhatIDo() {
  const { prefersReducedMotion, variants } = useEditorialMotion();

  return (
    <section className="bg-(--ghost-bg) py-20 md:py-28">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="flex items-start justify-between gap-6 mb-10 md:mb-14">
          <motion.span
            variants={variants.fadeGhost}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true }}
            className="inline-flex px-3 py-1 border border-white/15 rounded-full text-[11px] md:text-xs font-mono uppercase tracking-[0.18em] text-(--ghost-flare)"
          >
            O que eu faço
          </motion.span>

          <motion.p
            variants={variants.fadeGhost}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true }}
            className="text-sm text-(--ghost-text-secondary) max-w-[360px] text-right leading-relaxed hidden md:block"
          >
            Direcionei o conteúdo para pontos de ação claros, com frases curtas
            que cabem em telas menores sem perder ritmo.
          </motion.p>
        </div>

        <motion.ul
          variants={variants.staggerContainer} // Use standardized stagger
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-[2px] divide-y divide-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.35)]"
        >
          {items.map((item, i) => (
            <motion.li
              key={i}
              variants={variants.riseSoft}
              whileHover={
                prefersReducedMotion ? undefined : { opacity: 1, x: 6 }
              } // Added subtle hover move
              className="text-base md:text-lg text-(--ghost-text-secondary) opacity-95 transition-all duration-300 px-6 md:px-10 py-5 md:py-7 flex items-center"
            >
              <span className="mr-3 text-xs font-mono text-(--ghost-flare)/70">
                0{i + 1}
              </span>
              <span className="leading-relaxed">{item}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
