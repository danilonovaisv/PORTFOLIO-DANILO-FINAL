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
      className="relative h-screen flex items-center bg-[#040013] overflow-hidden"
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
        className="block lg:hidden absolute inset-0 w-full h-full object-cover object-top opacity-[0.55]"
        aria-hidden="true"
      />

      {/* Dark Gradient Overlay for Legibility */}
      <div
        className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-[#040013] pointer-events-none z-1"
        aria-hidden="true"
      />

      {/* Content Container - Centralizado mobile, direita desktop */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-[8vw]">
        <div className="mx-auto md:ml-auto md:mr-0 max-w-[680px] text-center md:text-right">
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
            <motion.h1
              variants={fadeGhost}
              className="text-[clamp(28px,7vw,64px)] md:text-[clamp(36px,5vw,64px)] text-[#fcffff] font-semibold tracking-[-0.02em] leading-[1.08]"
            >
              Sou <span className="ghost-accent">Danilo Novais.</span>
            </motion.h1>

            {/* Manifesto Text Block */}
            <motion.div variants={fadeGhost} className="space-y-1 md:space-y-2">
              <p className="text-[clamp(20px,5.5vw,44px)] md:text-[clamp(28px,3.5vw,44px)] text-[#fcffff] font-medium tracking-[-0.02em] leading-[1.2] md:leading-[1.15]">
                <span className="ghost-accent">Você não vê</span> tudo
              </p>
              <p className="text-[clamp(20px,5.5vw,44px)] md:text-[clamp(28px,3.5vw,44px)] text-[#fcffff] font-medium tracking-[-0.02em] leading-[1.2] md:leading-[1.15]">
                o que eu faço. Mas
              </p>
              <p className="text-[clamp(20px,5.5vw,44px)] md:text-[clamp(28px,3.5vw,44px)] text-[#fcffff] font-medium tracking-[-0.02em] leading-[1.2] md:leading-[1.15]">
                sente quando
              </p>
              <p className="text-[clamp(20px,5.5vw,44px)] md:text-[clamp(28px,3.5vw,44px)] text-[#fcffff] font-medium tracking-[-0.02em] leading-[1.2] md:leading-[1.15]">
                <span className="ghost-accent">funciona.</span>
              </p>
            </motion.div>

            {/* Description Paragraph */}
            <motion.div
              variants={fadeGhost}
              transition={{ delay: 0.4 }}
              className="max-w-[520px] mx-auto md:ml-auto md:mr-0 space-y-1 md:space-y-2"
            >
              <p className="text-sm md:text-base lg:text-lg text-[#a1a3a3] font-light leading-[1.7] tracking-tight">
                <span className="ghost-accent">Crio design</span> que observa,
                entende
              </p>
              <p className="text-sm md:text-base lg:text-lg text-[#a1a3a3] font-light leading-[1.7] tracking-tight">
                e guia experiências com intenção,
              </p>
              <p className="text-sm md:text-base lg:text-lg text-[#a1a3a3] font-light leading-[1.7] tracking-tight">
                <span className="ghost-accent">estratégia e tecnologia</span> —
                na medida certa.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
