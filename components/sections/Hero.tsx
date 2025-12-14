'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  
  // Parallax / Scroll Animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Thumb Animations linked to scroll
  const thumbScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const thumbY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  
  // Text Animations linked to scroll
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -40]);

  const scrollToManifesto = () => {
    const manifestoSection = document.getElementById('manifesto');
    if (manifestoSection) {
      manifestoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      /* biome-ignore lint/correctness/useUniqueElementIds: Este ID precisa ser estático para anchors globais */
      id="hero"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#F4F5F7] min-h-[90vh] flex items-center"
    >
      <div className="relative z-10 container mx-auto px-6 md:px-10 lg:px-16 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 items-center gap-10 py-12 md:grid-cols-12 md:gap-4 md:py-0 w-full min-h-[600px]">
          {/* --- Coluna 1: Texto e CTA (5 cols) --- */}
          <motion.div 
            style={{ opacity: textOpacity, y: textY }}
            className="flex flex-col items-center gap-8 text-center md:col-span-5 md:items-start md:text-left z-20 md:-mt-8"
          >
            {/* Mobile: 3D Placeholder (apenas mobile) */}
            <div className="md:hidden flex w-full justify-center mb-2 pointer-events-none">
              <div className="relative h-[260px] w-[260px] opacity-90">
                <HeroGlassCanvas className="h-full w-full" />
              </div>
            </div>

            <div className="flex flex-col gap-0 font-sans text-[clamp(3rem,8vw,7rem)] font-extrabold leading-[0.85] tracking-[-0.04em]">
              {/* Sequence: Tag(0.1) -> H1(0.2) -> Sub(0.6) -> CTA(0.8) */}
              <AnimatedTextLine
                text="Design,"
                delay={0.2}
                colorClass="text-[#0057FF]"
              />
              <AnimatedTextLine text="não é só" delay={0.45} />
              <AnimatedTextLine text="estética." delay={0.7} />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
              className="text-base font-medium tracking-widest text-[#0057FF] md:text-lg uppercase"
            >
              [ É intenção, é estratégia, é experiência. ]
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 }}
              className="flex w-full justify-center md:justify-start pt-4"
            >
              <motion.a
                href="/sobre"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#0057FF] px-8 py-4 text-base font-semibold text-white shadow-[0_20px_40px_-15px_rgba(0,87,255,0.6)] transition-transform duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0057FF]/30"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/10 via-white/40 to-white/10 transition-transform duration-500 group-hover:translate-x-full group-focus-visible:translate-x-full" />
                <span className="relative">get to know me better</span>
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#0057FF] shadow-[0_6px_14px_rgba(0,87,255,0.25)] transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* --- Coluna 2: 3D Orb Central (4 cols) --- */}
          {/* Desktop Only: Posicionado no grid mas permitindo overflow controlado para scale */}
          <div className="hidden md:flex md:col-span-4 h-full items-center justify-end relative min-h-[600px] pointer-events-none z-10">
            {/* Orb position slight adjustment to visual center */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, ease: 'easeOut' }}
              className="absolute w-[240%] aspect-square flex items-center justify-center top-[45%] left-[55%] -translate-x-1/2 -translate-y-1/2"
            >
              <div className="relative w-full h-full">
                <HeroGlassCanvas className="h-full w-full" />
              </div>
            </motion.div>
          </div>

          {/* --- Coluna 3: Video Thumb e Tag (3 cols) --- */}
          <motion.div 
             style={{ opacity: textOpacity, y: textY }}
             className="flex flex-col items-center gap-6 md:col-span-3 md:items-end md:self-end z-20 mt-12 md:mt-0 md:pb-12"
          >
            {/* Tag - First in sequence (Delay ~0.1) */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
              className="text-xs font-bold uppercase tracking-[0.25em] text-[#0057FF] md:text-sm text-right"
            >
              [ BRAND AWARENESS ]
            </motion.span>

            {/* Video Thumb - Last in sequence (Delay 0.9) */}
             <motion.div
                style={{ scale: thumbScale, y: thumbY }} // Parallax Wrapper
                className="relative w-full max-w-[360px] group cursor-pointer origin-center"
                onClick={scrollToManifesto}
             > 
                <motion.div // Entry Animation Inner
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: 0.9 }}
                  className="w-full"
                >
                   {/* Glass Effect Card Backing */}
                   <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-white/40 to-white/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                   
                   <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/40 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.3)] backdrop-blur-md transition-transform duration-500 group-hover:scale-[1.02]">
                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                      <video
                        src={ASSETS.videoManifesto}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 h-full w-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                      />
                      {/* Overlay Gradient for Text Readability if needed */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />
                    </div>
                  </div>
                </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
