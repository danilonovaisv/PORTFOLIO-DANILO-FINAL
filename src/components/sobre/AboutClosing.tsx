'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { motionTokens } from './motion';
import { AntigravityCTA } from '@/components/ui/AntigravityCTA';
import { ABOUT_CONTENT } from '@/config/content';

export function AboutClosing() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="flex items-center justify-center px-6 md:px-12 lg:px-20 bg-background py-20 md:py-24"
      aria-label="Fechamento"
    >
      <motion.div
        variants={motionTokens.fadeGhost}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="w-full max-w-[1200px]"
      >
        {/* Título Principal + Linhas */}
        <div className="flex flex-col items-center text-center">
          <div className="h-px w-full max-w-[980px] bg-blueAccent/60 mb-8 md:mb-10" />
          <h2 className="type-h2 font-semibold leading-tight text-white max-w-[900px] lowercase">
            hoje sou{' '}
            <span className="text-bluePrimary">diretor de criação</span>,
            <br />
            com mais de{' '}
            <span className="text-bluePrimary">10 anos de estrada</span>.
          </h2>
          <div className="h-px w-full max-w-[980px] bg-blueAccent/60 mt-8 md:mt-10" />
        </div>

        <div className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">
          {/* Parágrafos de Contexto */}
          <div className="space-y-5 max-w-[560px] mx-auto text-center">
            {ABOUT_CONTENT.closing.text.map((paragraph, idx) => (
              <p
                key={idx}
                className="type-body text-text leading-relaxed opacity-90"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* CTAs - Using AntigravityCTA component */}
          <div className="flex flex-row lg:flex-col items-center justify-center gap-4 md:gap-5 justify-self-center">
            {ABOUT_CONTENT.closing.ctas.map((cta, index) => (
              <AntigravityCTA
                key={index}
                href={cta.href}
                label={cta.label}
                variant={cta.variant as 'primary' | 'secondary' | 'ghost'}
                size="sm"
                external={cta.external}
                ariaLabel={cta.label}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
