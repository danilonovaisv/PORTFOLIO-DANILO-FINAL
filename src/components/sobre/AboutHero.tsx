'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ABOUT_CONTENT } from '@/config/content';

// Motion tokens conforme protótipo Ghost Design
const GHOST_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeGhost = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: GHOST_EASE },
  },
};

export function AboutHero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative min-h-screen lg:h-screen flex flex-col lg:block bg-ghost-surface-deep overflow-hidden"
      aria-label="Hero - Manifesto"
    >
      {/* Background Video - Desktop */}
      <video
        src={ABOUT_CONTENT.hero.videos.desktop}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="hidden lg:block absolute inset-0 w-full h-full object-cover object-top opacity-[0.55]"
        aria-hidden="true"
      />

      {/* Background Video - Mobile */}
      <video
        src={ABOUT_CONTENT.hero.videos.mobile}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="lg:hidden absolute inset-0 w-full h-full object-cover object-top opacity-[0.8]"
        aria-hidden="true"
      />

      {/* Dark Gradient Overlay for Legibility - Desktop Only */}
      <div
        className="hidden lg:block absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-ghost-surface-deep pointer-events-none z-1"
        aria-hidden="true"
      />

      {/* Dark Gradient Overlay for Legibility - Mobile */}
      <div
        className="lg:hidden absolute inset-0 bg-linear-to-b from-black/50 via-black/65 to-ghost-surface-deep/90 pointer-events-none z-1"
        aria-hidden="true"
      />

      {/* Content Container */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-[8vw] pt-24 md:pt-28 pb-24 lg:py-0 lg:h-full lg:flex lg:items-center">
        <div className="mx-auto md:ml-auto md:mr-0 max-w-[680px] text-center md:text-left lg:-translate-y-8">
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.3,
                },
              },
            }}
            className="space-y-8 md:space-y-10"
          >
            {/* H1 - Título principal */}
            {/* H1 - Título principal */}
            <motion.h1
              variants={fadeGhost}
              className="text-[32px] md:text-[64px] text-[#fcffff] font-bold tracking-tight leading-[1.1]"
            >
              Sou <span className="text-primary">Danilo Novais.</span>
            </motion.h1>

            {/* Manifesto Text Block */}
            <motion.div
              variants={fadeGhost}
              className="space-y-0.5 md:space-y-2"
            >
              <p className="text-[32px] md:text-[44px] text-[#fcffff] font-bold tracking-tight leading-[1.1]">
                <span className="text-primary">Você não vê</span> tudo
              </p>
              <p className="text-[32px] md:text-[44px] text-[#fcffff] font-bold tracking-tight leading-[1.1]">
                o que eu faço.
              </p>
              <p className="text-[32px] md:text-[44px] text-[#fcffff] font-bold tracking-tight leading-[1.1]">
                Mas sente quando
              </p>
              <p className="text-[32px] md:text-[44px] text-[#fcffff] font-bold tracking-tight leading-[1.1]">
                <span className="text-primary">funciona.</span>
              </p>
            </motion.div>

            {/* Description Paragraph */}
            <motion.div
              variants={fadeGhost}
              transition={{ delay: 0.4 }}
              className="max-w-[520px] mx-auto md:ml-auto md:mr-0"
            >
              <p className="text-base md:text-lg text-white/85 font-light leading-[1.6] tracking-tight">
                Crio design que observa, entende
                <br className="hidden md:block" />e guia experiências com
                intenção,
                <br className="hidden md:block" />
                estratégia e tecnologia — na medida certa.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
