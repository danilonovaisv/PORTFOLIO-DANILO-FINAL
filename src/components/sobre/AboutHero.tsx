'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
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
      className="relative min-h-screen lg:h-screen flex flex-col lg:block bg-ghost-surface-deep overflow-hidden"
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

      {/* Content Container */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-[8vw] pt-24 md:pt-28 pb-24 lg:py-0 lg:h-full lg:flex lg:items-center">
        <motion.div
          style={{ y: textY }}
          className="mx-auto md:ml-auto md:mr-0 max-w-[660px] text-center md:text-right lg:-translate-y-6"
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
            {/* H1 - Título principal */}
            <motion.h1
              variants={fadeGhost}
              className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] font-semibold tracking-tight text-text-light"
            >
              Sou <span className="text-primary">Danilo Novais.</span>
            </motion.h1>

            {/* Manifesto Text Block */}
            <motion.div
              variants={fadeGhost}
              className="space-y-1 md:space-y-1.5"
            >
              <p className="text-[30px] sm:text-[34px] md:text-[38px] lg:text-[42px] xl:text-[48px] text-text-light font-semibold tracking-tight leading-[1.05]">
                <span className="text-primary">Você</span> não vê tudo
              </p>
              <p className="text-[30px] sm:text-[34px] md:text-[38px] lg:text-[42px] xl:text-[48px] text-text-light font-semibold tracking-tight leading-[1.05]">
                o que eu faço. Mas
              </p>
              <p className="text-[30px] sm:text-[34px] md:text-[38px] lg:text-[42px] xl:text-[48px] text-text-light font-semibold tracking-tight leading-[1.05]">
                sente quando
              </p>
              <p className="text-[30px] sm:text-[34px] md:text-[38px] lg:text-[42px] xl:text-[48px] text-text-light font-semibold tracking-tight leading-[1.05]">
                <span className="text-primary">funciona.</span>
              </p>
            </motion.div>

            {/* Description Paragraph */}
            <motion.div
              variants={fadeGhost}
              transition={{ delay: 0.4 }}
              className="max-w-[420px] mx-auto md:ml-auto md:mr-0"
            >
              <p className="text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] text-white/85 font-normal leading-[1.6] tracking-tight">
                Crio design que observa, entende
                <br className="hidden md:block" />e guia experiências com
                intenção,
                <br className="hidden md:block" />
                estratégia e tecnologia — na medida certa.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
