'use client';

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { useRef } from 'react';
import { ABOUT_CONTENT } from '@/config/content';

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

export default function AboutMethod() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax sutil no vídeo de fundo - apenas desktop
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] py-20 md:py-28 lg:py-32 overflow-hidden bg-ghost-surface-deep"
      aria-label="Como Eu Trabalho"
    >
      {/* Background Video full-bleed */}
      <motion.div
        style={{ y: prefersReducedMotion ? 0 : y }}
        className="absolute inset-0 z-0"
      >
        <video
          src={ABOUT_CONTENT.method.video}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover object-center opacity-75"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-linear-to-r from-ghost-surface-deep via-ghost-surface-deep/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/10 to-ghost-surface-deep" />
      </motion.div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-start">
          <div className="max-w-[640px]">
            {/* Títulos */}
            <motion.div
              variants={fadeGhost}
              initial={prefersReducedMotion ? 'visible' : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="mb-8 md:mb-10"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#fcffff] tracking-tight leading-tight mb-3">
                Criatividade com{' '}
                <span className="ghost-accent">
                  {ABOUT_CONTENT.method.title.highlight}
                </span>
              </h2>
            </motion.div>

            {/* Texto introdutório */}
            <motion.div
              variants={fadeGhost}
              initial={prefersReducedMotion ? 'visible' : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="text-base md:text-lg lg:text-xl text-ghost-text-secondary font-light leading-relaxed space-y-3 mb-10 md:mb-12"
            >
              {ABOUT_CONTENT.method.intro.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </motion.div>

            {/* Steps List - Using neutral background as per prototype */}
            <div className="space-y-4">
              {ABOUT_CONTENT.method.steps.map((step, i) => (
                <motion.div
                  key={i}
                  variants={cardRise}
                  initial={prefersReducedMotion ? 'visible' : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.08 }}
                  className="group flex items-start gap-4 bg-[#0b0d3a]/30 backdrop-blur-xs border-t border-white/5 p-5 md:p-6 transition-colors duration-300 hover:bg-[#0b0d3a]/50"
                >
                  <span className="font-mono text-primary text-sm font-bold tracking-[0.08em] shrink-0 mt-1">
                    0{i + 1}
                  </span>
                  <p className="text-base md:text-lg text-[#d5d7e4] font-light group-hover:text-white transition-colors duration-300">
                    {step}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
