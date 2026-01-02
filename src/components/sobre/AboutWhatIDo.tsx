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
    <section className="min-h-screen flex items-start justify-center bg-(--ghost-bg) py-24 md:py-32">
      <div className="w-full max-w-[560px] px-6 space-y-12 md:space-y-16">
        {items.map((item, i) => (
          <motion.div
            key={i}
            variants={variants.riseSoft}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: false, amount: 0.65 }}
            transition={{ delay: 0.08 * i }}
            className="min-h-[90vh] md:min-h-0 md:py-8 flex items-center"
          >
            <motion.p
              whileHover={
                prefersReducedMotion ? undefined : { opacity: 1, x: 6 }
              }
              className="text-lg md:text-xl text-(--ghost-text-secondary) opacity-95 transition-all duration-300 max-w-[40ch]"
            >
              {item}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
