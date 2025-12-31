'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { riseSoft, staggerGhost } from '@/lib/motionTokens';

const services = [
  'Direção criativa que organiza o caos',
  'Design estratégico que guia decisões',
  'Identidades que permanecem na memória',
  'Campanhas multicanais com lógica e emoção',
  'Branding que não grita — mas marca',
  'Inteligência artificial aplicada à criação e automação',
  'Liderança criativa com visão e método',
];

export default function AboutServices() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative min-h-[80vh] py-24 flex items-center justify-center bg-[#000022]"
      aria-label="O Que Eu Faço"
    >
      <div className="w-full max-w-[560px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-10%' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-none text-white">
            <span className="text-white">Do insight ao impacto.</span>
            <br />
            <span className="text-[#0057FF] block mt-2">
              Mesmo quando você não percebe.
            </span>
          </h2>
        </motion.div>

        <motion.ul
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ margin: '-10%' }}
          variants={staggerGhost(0.12)}
          className="flex flex-col gap-8 md:gap-10"
        >
          {services.map((service, i) => (
            <motion.li
              key={i}
              variants={riseSoft}
              whileHover={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
              className="text-center group"
            >
              <span className="text-xl md:text-2xl font-light text-white/70 transition-opacity duration-300 group-hover:text-white">
                {service}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
