'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';

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

export function AboutClosing() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="min-h-[70vh] flex items-center justify-center px-6 md:px-12 lg:px-20 bg-ghost-surface-deep py-20 md:py-24"
      aria-label="Fechamento"
    >
      <motion.div
        variants={fadeGhost}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        className="w-full max-w-[1100px]"
      >
        {/* Título Principal + Linhas */}
        <div className="flex flex-col items-center text-center">
          <div className="h-px w-full bg-[#4fe6ff]/60 mb-8 md:mb-10" />
          <h2 className="text-[30px] md:text-[36px] lg:text-[42px] font-bold leading-tight text-white max-w-[900px]">
            Hoje sou <span className="text-primary">Diretor de Criação</span>,
            <br />
            com mais de{' '}
            <span className="text-primary">10 anos de estrada</span>.
          </h2>
          <div className="h-px w-full bg-[#4fe6ff]/60 mt-8 md:mt-10" />
        </div>

        <div className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-12 items-start">
          {/* Parágrafos de Contexto */}
          <div className="space-y-6 md:space-y-7 max-w-[560px] mx-auto lg:mx-0 text-center lg:text-left">
            <p className="text-[17px] md:text-[19px] lg:text-[20px] font-light leading-relaxed text-[#fcffff] opacity-90">
              Já liderei marcas, agências, eventos
              <br className="hidden md:block" />e{' '}
              <span className="text-primary font-medium">
                criei experiências
              </span>{' '}
              para todos os canais.
            </p>
            <p className="text-[17px] md:text-[19px] lg:text-[20px] font-light leading-relaxed text-[#fcffff] opacity-90">
              Agora, quero criar algo que permaneça —<br />
              <span className="text-primary font-medium">com você</span>.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-row lg:flex-col items-center justify-center lg:justify-start lg:items-end gap-4 md:gap-5 lg:justify-self-end">
            <Link
              href="/contato"
              className="group inline-flex items-center gap-2 rounded-full bg-primary text-white pl-4 pr-2 py-2 md:pl-6 md:pr-3 md:py-3 text-[13px] md:text-sm font-medium shadow-lg shadow-primary/20 transition-transform duration-300 lowercase"
            >
              Fale comigo
              <span className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-full bg-[#0b1a6b] text-white text-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                ↗
              </span>
            </Link>

            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-primary text-white pl-4 pr-2 py-2 md:pl-6 md:pr-3 md:py-3 text-[13px] md:text-sm font-medium shadow-lg shadow-primary/20 transition-transform duration-300 lowercase"
            >
              Baixar curriculum
              <span className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-full bg-[#0b1a6b] text-white text-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
