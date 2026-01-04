'use client';

import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
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
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const mediaY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [48, -48]
  );
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [12, -12]
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen lg:h-screen bg-ghost-surface-deep overflow-hidden"
      aria-label="Hero - Manifesto"
    >
      {/* Background Video - Desktop */}
      <motion.video
        src={ABOUT_CONTENT.hero.videos.desktop}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="hidden lg:block absolute inset-0 w-full h-full object-cover object-top opacity-[0.68]"
        style={{ y: mediaY }}
        aria-hidden="true"
      />

      {/* Background Video - Mobile */}
      <motion.video
        src={ABOUT_CONTENT.hero.videos.mobile}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="lg:hidden absolute inset-0 w-full h-full object-cover object-top opacity-[0.78]"
        style={{ y: mediaY }}
        aria-hidden="true"
      />

      {/* Dark Gradient Overlay for Legibility - Desktop Only */}
      <div
        className="hidden lg:block absolute inset-0 bg-linear-to-b from-black/60 via-black/45 to-ghost-surface-deep/85 pointer-events-none z-1"
        aria-hidden="true"
      />

      {/* Dark Gradient Overlay for Legibility - Mobile */}
      <div
        className="lg:hidden absolute inset-0 bg-linear-to-b from-black/55 via-black/70 to-ghost-surface-deep/95 pointer-events-none z-1"
        aria-hidden="true"
      />

      {/* Content Container - Fixed to bottom on mobile */}
      <div className="relative z-10 min-h-screen lg:h-full flex flex-col justify-end lg:justify-center px-6 md:px-12 lg:px-[8vw] pb-16 md:pb-24 lg:py-0">
        <motion.div
          style={{ y: textY }}
          className="w-full max-w-[660px] mx-auto lg:ml-auto lg:mr-0 text-center lg:text-right lg:-translate-y-6"
        >
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
            className="space-y-6 md:space-y-7"
          >
            {/* MOBILE: Título + Manifesto consolidado em 2 linhas */}
            <motion.div variants={fadeGhost} className="lg:hidden space-y-0">
              <h1 className="text-[32px] sm:text-[36px] md:text-[38px] font-semibold tracking-tight text-text-light leading-[1.15]">
                Sou <span className="text-primary">Danilo Novais.</span>{' '}
                <span className="text-primary">Você</span> não vê tudo o
                <br />
                que eu faço. Mas sente quando{' '}
                <span className="text-primary">funciona.</span>
              </h1>
            </motion.div>

            {/* DESKTOP: H1 separado */}
            <motion.h1
              variants={fadeGhost}
              className="hidden lg:block text-[32px] lg:text-[36px] xl:text-[40px] font-semibold tracking-tight text-text-light leading-tight"
            >
              Sou <span className="text-primary">Danilo Novais.</span>
            </motion.h1>

            {/* DESKTOP: Manifesto em múltiplas linhas */}
            <motion.div
              variants={fadeGhost}
              className="hidden lg:block space-y-1.5"
            >
              <p className="text-[38px] lg:text-[42px] xl:text-[48px] text-text-light font-semibold tracking-tight leading-[1.05]">
                <span className="text-primary">Você</span> não vê tudo
              </p>
              <p className="text-[38px] lg:text-[42px] xl:text-[48px] text-text-light font-semibold tracking-tight leading-[1.05]">
                o que eu faço. Mas
              </p>
              <p className="text-[38px] lg:text-[42px] xl:text-[48px] text-text-light font-semibold tracking-tight leading-[1.05]">
                sente quando
              </p>
              <p className="text-[38px] lg:text-[42px] xl:text-[48px] text-text-light font-semibold tracking-tight leading-[1.05]">
                <span className="text-primary">funciona.</span>
              </p>
            </motion.div>

            {/* Description Paragraph */}
            <motion.div
              variants={fadeGhost}
              transition={{ delay: 0.4 }}
              className="max-w-[420px] mx-auto lg:ml-auto lg:mr-0"
            >
              {/* MOBILE: 2 linhas conforme especificado */}
              <p className="lg:hidden text-[16px] sm:text-[17px] text-white/85 font-normal leading-[1.6] tracking-tight">
                Crio design que observa, entende e guia experiências com
                <br />
                intenção, estratégia e tecnologia — na medida certa.
              </p>

              {/* DESKTOP: quebras originais */}
              <p className="hidden lg:block text-[16px] lg:text-[17px] text-white/85 font-normal leading-[1.6] tracking-tight">
                Crio design que observa, entende
                <br />
                e guia experiências com intenção,
                <br />
                estratégia e tecnologia — na medida certa.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
