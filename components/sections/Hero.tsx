'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import HeroGlassCanvas from '../three/HeroGlassCanvas';
import { ASSETS } from '../../lib/constants';

const Hero: React.FC = () => {
  const reducedMotionPreference = useReducedMotion();
  const shouldReduceMotion = Boolean(reducedMotionPreference);
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), 100);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const easing = [0.22, 1, 0.36, 1] as const;

  const headingVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easing,
        staggerChildren: 0.08,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: easing },
    },
  };

  const fadeIn = (delay = 0.2): Variants => ({
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easing, delay },
    },
  });

  return (
    <section
      id="hero"
      className="bg-surface-main text-text-main"
      aria-labelledby="hero-title"
    >
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-8 px-6 py-14 md:gap-14 md:py-24 lg:px-10">
        <div className="grid items-center gap-12 md:grid-cols-[1.05fr,0.95fr] lg:items-center">
          <div className="flex flex-col gap-5 md:gap-8">
            <motion.span
              className="text-sm font-semibold uppercase tracking-[0.28em] text-primary"
              variants={fadeIn(0)}
              initial="hidden"
              animate={isVisible ? 'visible' : 'hidden'}
            >
              [ BRAND AWARENESS ]
            </motion.span>

            <motion.div
              id="hero-title"
              variants={headingVariants}
              initial="hidden"
              animate={isVisible ? 'visible' : 'hidden'}
              className="flex flex-col gap-1 text-5xl font-extrabold leading-[0.92] tracking-[-0.04em] md:text-7xl lg:text-8xl"
            >
              <motion.span className="text-primary" variants={lineVariants}>
                Design,
              </motion.span>
              <motion.span variants={lineVariants}>não é só</motion.span>
              <motion.span variants={lineVariants}>estética.</motion.span>
            </motion.div>

            <motion.p
              variants={fadeIn(0.25)}
              initial="hidden"
              animate={isVisible ? 'visible' : 'hidden'}
              className="inline-block rounded-lg bg-white/60 px-3 py-2 text-lg font-medium text-primary shadow-sm backdrop-blur"
            >
              [ É intenção, é estratégia, é experiência. ]
            </motion.p>

            <motion.div
              variants={fadeIn(0.35)}
              initial="hidden"
              animate={isVisible ? 'visible' : 'hidden'}
              className="flex items-center gap-6"
            >
              <motion.a
                href="/sobre"
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 1.02,
                        transition: { duration: 0.3, ease: 'easeOut' },
                      }
                }
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#0057FF]/20 transition-all duration-300"
                aria-label="Ir para a página sobre"
              >
                get to know me better
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-colors group-hover:bg-white/30">
                  <ArrowRight className="h-4 w-4 text-white" />
                </span>
              </motion.a>

              <a
                href="#manifesto"
                className="text-sm font-medium text-gray-700 underline decoration-primary/60 decoration-2 underline-offset-4 transition-colors hover:text-primary"
                aria-label="Ir para a seção manifesto"
              >
                manifesto
              </a>
            </motion.div>
          </div>

          <div className="relative flex flex-col items-end gap-6 md:gap-8">
            <div className="relative w-full max-w-xl overflow-hidden rounded-[48px] bg-white/60 shadow-xl ring-1 ring-black/5">
              <div className="relative aspect-square flex items-center justify-center">
                <HeroGlassCanvas reduceMotion={shouldReduceMotion} />
              </div>
            </div>

            <motion.a
              variants={fadeIn(0.45)}
              initial="hidden"
              animate={isVisible ? 'visible' : 'hidden'}
              href="#manifesto"
              className="group relative w-full max-w-xs overflow-hidden rounded-3xl bg-black shadow-lg shadow-black/15 ring-1 ring-black/5 transition-transform hover:-translate-y-1"
              aria-label="Ver manifesto em vídeo"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <video
                  ref={videoRef}
                  src={ASSETS.videoManifesto}
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                  aria-label="Vídeo manifesto do portfólio"
                />
              </div>
            </motion.a>

            <motion.div
              variants={fadeIn(0.55)}
              initial="hidden"
              animate={isVisible ? 'visible' : 'hidden'}
              className="flex w-full max-w-xs items-center justify-end gap-3"
            >
              <button
                type="button"
                onClick={() => setIsMuted((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-full border border-primary bg-white/90 px-4 py-2 text-sm font-medium text-primary shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-pressed={!isMuted}
                aria-label={
                  isMuted ? 'Ativar áudio do vídeo' : 'Desativar áudio do vídeo'
                }
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
                <span>{isMuted ? 'Ativar áudio' : 'Áudio ligado'}</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
