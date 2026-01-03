'use client';

import { motion, useReducedMotion } from 'framer-motion';

// Ghost Motion Tokens
const GHOST_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeGhost = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: GHOST_EASE },
  },
};

const cardRise = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: GHOST_EASE },
  },
};

// Conteúdo oficial do protótipo interativo
const WHAT_I_DO_CONTENT = {
  title: 'Do insight ao impacto.',
  subtitle: 'Mesmo quando você não percebe.',
  items: [
    'Direção criativa que organiza o caos',
    'Design estratégico que guia decisões',
    'Identidades que permanecem na memória',
    'Campanhas multicanais com lógica e emoção',
    'Branding que não grita — mas marca',
    'Inteligência artificial aplicada à criação e automação',
    'Liderança criativa com visão e método',
  ],
};

export function AboutWhatIDo() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-[#040013] py-16 md:py-24 lg:py-32"
      aria-label="O que eu faço"
    >
      <motion.div
        variants={{
          visible: {
            transition: { staggerChildren: 0.18 },
          },
        }}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        className="max-w-[600px] w-full px-6 md:px-8 flex flex-col items-center"
      >
        {/* Título e subtítulo */}
        <div className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4">
          <motion.h2
            variants={fadeGhost}
            className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-[#fcffff] tracking-tight leading-tight"
          >
            {WHAT_I_DO_CONTENT.title}
          </motion.h2>
          <motion.p
            variants={fadeGhost}
            className="text-base md:text-lg lg:text-xl xl:text-2xl text-[#a1a3a3] font-light"
          >
            {WHAT_I_DO_CONTENT.subtitle}
          </motion.p>
        </div>

        {/* Lista de Cards - Touch targets 48px+ */}
        <ul className="space-y-4 md:space-y-6 w-full max-w-[520px]">
          {WHAT_I_DO_CONTENT.items.map((item, i) => (
            <motion.li
              key={i}
              variants={cardRise}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : {
                      opacity: 1,
                      transition: { duration: 0.3 },
                    }
              }
              className="text-sm md:text-base lg:text-lg text-[#a1a3a3] opacity-90 text-center 
                         py-4 md:py-4 px-4 md:px-6 min-h-[48px]
                         border border-white/5 rounded-lg bg-white/2 
                         hover:bg-white/4 hover:border-white/10 
                         transition-all duration-300 cursor-default"
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
