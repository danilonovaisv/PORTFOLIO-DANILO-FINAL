'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ASSETS } from '@/lib/constants';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

// Canvas da orb 3D – carregado só no client
const HeroGlassCanvas = dynamic(
  () => import('@/components/three/HeroGlassCanvas'),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-[60vw] w-[60vw] max-h-[300px] max-w-[300px] rounded-full bg-gradient-to-br from-blue-400/30 to-indigo-600/30 blur-3xl animate-pulse" />
      </div>
    ),
  }
);

const MotionLink = motion(Link);

// ========== AnimatedTextLine (letra a letra) ==========

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
  const letters = text.split('');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  };

  const child: Variants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.span
      className={`inline-flex overflow-hidden ${className ?? ''}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          variants={child}
          className={`block leading-[0.9] ${colorClass}`}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

// ========== Hero ==========

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Scroll progress para parallax suave (texto e thumb)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -24]);

  const thumbScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const thumbY = useTransform(scrollYProgress, [0, 1], [0, -24]);

  const orbScrollIntensity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const handleThumbClick = () => {
    if (typeof window === 'undefined') return;
    const manifesto = document.getElementById('manifesto');
    if (manifesto) {
      manifesto.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative w-full bg-[#F4F5F7] min-h-[85vh] md:min-h-screen"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-12 md:grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center md:gap-12 md:px-8 lg:px-12 lg:py-20">
        {/* COLUNA ESQUERDA – TEXTO */}
        <motion.div
          style={
            prefersReducedMotion
              ? {}
              : {
                  opacity: textOpacity,
                  y: textY,
                }
          }
          className="order-2 flex flex-col gap-6 text-center md:order-1 md:text-left"
        >
          {/* Headline */}
          <div className="font-sans text-[clamp(2.6rem,5.4vw,4.8rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
            {/* Mobile + Desktop: mesmo conteúdo, só mudando alinhamento */}
            <div className="flex flex-col gap-1">
              <AnimatedTextLine
                text="Design,"
                colorClass="text-[#0057FF]"
                delay={0.1}
              />
              <AnimatedTextLine
                text="não é só"
                colorClass="text-[#111111]"
                delay={0.25}
              />
              <AnimatedTextLine
                text="estética."
                colorClass="text-[#111111]"
                delay={0.4}
              />
            </div>
          </div>

          {/* Subheadline */}
          <motion.p
            id="hero-heading"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.6,
            }}
            className="inline-block rounded-lg bg-white/40 px-4 py-2 text-sm font-medium tracking-wide text-[#0057FF] backdrop-blur-sm md:text-base"
          >
            [ É intenção, é estratégia, é experiência. ]
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.8,
            }}
            className="flex justify-center md:justify-start"
          >
            <MotionLink
              href="/sobre"
              whileHover={
                prefersReducedMotion
                  ? {}
                  : {
                      scale: 1.05,
                      boxShadow: '0 10px 30px -10px rgba(0, 87, 255, 0.5)',
                    }
              }
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              className="group inline-flex items-center gap-3 rounded-full bg-[#0057FF] px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-[#0057FF]/25 transition-all md:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2"
            >
              get to know me better
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#0057FF] shadow-sm transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </MotionLink>
          </motion.div>
        </motion.div>

        {/* COLUNA DIREITA – ORB + TAG + THUMB */}
        <div className="order-1 flex flex-col items-center gap-8 md:order-2 md:items-end">
          {/* Orb 3D */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[260px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[440px]"
          >
            {/* Glow */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-56 w-56 rounded-full bg-[#2f5bff]/25 blur-3xl md:h-72 md:w-72" />
            </div>

            <div className="relative aspect-square w-full">
              <HeroGlassCanvas
                scrollIntensity={
                  prefersReducedMotion ? 0 : (orbScrollIntensity as any)
                }
              />
            </div>
          </motion.div>

          {/* Tag + Thumb */}
          <motion.div className="flex flex-col items-center gap-4 md:flex-row md:justify-end md:gap-6">
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#0057FF] md:text-sm">
              [ BRAND AWARENESS ]
            </span>

            <motion.button
              type="button"
              aria-label="Abrir manifesto em vídeo"
              onClick={handleThumbClick}
              style={
                prefersReducedMotion
                  ? {}
                  : {
                      scale: thumbScale,
                      y: thumbY,
                    }
              }
              whileHover={
                prefersReducedMotion
                  ? {}
                  : {
                      scale: 1.03,
                      y: -4,
                      boxShadow: '0 20px 40px -18px rgba(0, 0, 0, 0.45)',
                    }
              }
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              className="relative inline-flex items-center justify-center rounded-3xl border-[6px] border-[#19E0FF] bg-[#C5F4FF] p-1 shadow-[0_18px_45px_rgba(0,0,0,0.22)]"
            >
              <div className="overflow-hidden rounded-2xl bg-black">
                <video
                  src={ASSETS.videoManifesto}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-[150px] w-[240px] object-cover md:h-[170px] md:w-[280px]"
                />
              </div>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
