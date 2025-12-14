'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ArrowRight } from 'lucide-react';
import { ASSETS } from '../../lib/constants';

const HeroGlassCanvas = dynamic(() => import('../three/HeroGlassCanvas'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-sm text-[#0057FF]/70">
      carregando orb 3D...
    </div>
  ),
});

// Componente para animar texto letra por letra (efeito "digitação/reveal")
type AnimatedTextLineProps = {
  text: string;
  className?: string;
  delay?: number;
  colorClass?: string;
};

const AnimatedTextLine = ({
  text,
  className,
  delay = 0,
  colorClass = 'text-[#111111]',
}: AnimatedTextLineProps) => {
  // Separa o texto em caracteres
  const letters = text.split('');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03, // Stagger mais rápido para fluxo contínuo
        delayChildren: delay,
      },
    },
  };

  const child: Variants = {
    hidden: {
      y: '110%', // Garante que saia totalmente da máscara
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      // Curva "Premium": Rápida no início, muito suave no final
      transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      className={`flex overflow-hidden ${className}`} // overflow-hidden é crucial para o efeito de máscara
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          variants={child}
          className={`block ${colorClass} leading-[0.9]`}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      /* biome-ignore lint/correctness/useUniqueElementIds: Este ID precisa ser estático para anchors globais */
      id="hero"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#F4F5F7]"
    >
      <div className="absolute inset-0 hidden items-center justify-center md:flex">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="pointer-events-none"
        >
          <div className="relative h-[720px] w-[760px] lg:h-[840px] lg:w-[880px]">
            <HeroGlassCanvas className="h-full w-full" />
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-10 pt-16 pb-14 md:grid-cols-12 md:gap-12 md:pt-28 md:pb-24">
          <div className="flex flex-col items-center gap-7 text-center md:col-span-5 md:items-start md:text-left">
            <div className="md:hidden flex w-full justify-center">
              <div className="relative h-[260px] w-[260px]">
                <HeroGlassCanvas className="h-full w-full" />
              </div>
            </div>

            <div className="flex flex-col gap-1 font-sans text-[clamp(2.8rem,7vw,6.4rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
              <AnimatedTextLine
                text="Design,"
                delay={0.1}
                colorClass="text-[#0057FF]"
              />
              <AnimatedTextLine text="não é só" delay={0.35} />
              <AnimatedTextLine text="estética." delay={0.6} />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
              className="text-base font-medium tracking-[0.08em] text-[#0057FF] md:text-lg"
            >
              [ É intenção, é estratégia, é experiência. ]
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.65 }}
              className="flex w-full justify-center md:justify-start"
            >
              <motion.a
                href="/sobre"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#0057FF] px-7 py-3 text-sm font-semibold text-white shadow-[0_18px_30px_-12px_rgba(0,87,255,0.55)] transition-transform duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0057FF]/30 md:px-8 md:py-4 md:text-base"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/10 via-white/40 to-white/10 transition-transform duration-500 group-hover:translate-x-full group-focus-visible:translate-x-full" />
                <span className="relative">get to know me better</span>
                <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#0057FF] shadow-[0_6px_14px_rgba(0,87,255,0.25)] transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </motion.a>
            </motion.div>
          </div>

          <div className="hidden md:block md:col-span-4" />

          <div className="flex flex-col items-center gap-8 md:col-span-3 md:items-end md:self-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.6 }}
              className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0057FF] md:text-base"
            >
              [ BRAND AWARENESS ]
            </motion.span>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: 'easeOut', delay: 0.8 }}
              className="w-full max-w-[280px] overflow-hidden rounded-2xl border border-white/60 bg-white/70 shadow-[0_22px_48px_-20px_rgba(0,0,0,0.45)] backdrop-blur"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <video
                  src={ASSETS.videoManifesto}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
