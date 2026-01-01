'use client';

import * as React from 'react';
import { useRef, useEffect, useState, useCallback } from 'react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import { Preloader } from '@/components/ui/Preloader';
import { HeroCopy } from './HeroCopy';
import { GhostStage } from './GhostStage';
import { ManifestoThumb, type ManifestoThumbHandle } from './ManifestoThumb';

const CONFIG = {
  preloadMs: 2000,
  videoSrc:
    'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4',
  bgColor: '#050511',

  // Thumb entrance animation (Ghost-style: slow, ethereal, floaty)
  entrance: {
    initial: {
      opacity: 0,
      scale: 0.92,
      y: 60,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      delay: 0.5, // Wait for preloader fade
    },
  },

  // Hover effect on thumbnail
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
} as const;

function usePrefersReducedMotion() {
  const [pref, setPref] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      const apply = () => setPref(!!mq.matches);
      apply();
      try {
        mq.addEventListener('change', apply);
        return () => mq.removeEventListener('change', apply);
      } catch {
        mq.addListener?.(apply);
        return () => mq.removeListener?.(apply);
      }
    }
  }, []);
  return pref;
}

export default function HomeHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const manifestoRef = useRef<ManifestoThumbHandle | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreenHold, setIsFullscreenHold] = useState(false);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);

  const prefersReducedMotion = usePrefersReducedMotion();

  // Scroll progress para morph do vídeo
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Morph transforms (Thumb 30vw -> Fullscreen approx 100vw)
  // progress 0 a 0.9: morphing
  const morphProgress = useTransform(scrollYProgress, [0, 0.9], [0, 1]);

  // Para cobrir a tela vindo de 30vw (bottom-right), precisamos de scale ~3.4
  // e origin na ponta inferior direita.
  const videoScale = useTransform(morphProgress, [0, 1], [1, 3.4]);
  const borderRadius = useTransform(morphProgress, [0, 0.7], [16, 0]);

  // Audio & Hold Logic
  useMotionValueEvent(scrollYProgress, 'change', (latest: number) => {
    // Entra no hold ao atingir o final da seção
    if (latest >= 0.99 && !isFullscreenHold && !hasReachedEnd) {
      setIsFullscreenHold(true);
    }

    // Mute se o usuário subir o scroll significativamente
    if (latest < 0.9) {
      manifestoRef.current?.setMuted(true);
      setHasReachedEnd(false);
    }

    // Auto-mute ao sair da seção
    if (latest < 0.01 || latest > 1.05) {
      manifestoRef.current?.setMuted(true);
    }
  });

  useEffect(() => {
    if (isFullscreenHold) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Unmute no hold
      manifestoRef.current?.setMuted(false);

      const timer = setTimeout(() => {
        document.body.style.overflow = prevOverflow;
        setIsFullscreenHold(false);
        setHasReachedEnd(true);
        manifestoRef.current?.setMuted(true);
      }, 2000);

      return () => {
        document.body.style.overflow = prevOverflow;
        clearTimeout(timer);
      };
    }
  }, [isFullscreenHold]);

  const handlePreloaderDone = useCallback(() => setIsLoading(false), []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[200vh] bg-[#06071f] overflow-hidden"
      aria-label="Hero section"
    >
      {/* Sticky Wrapper - Mantém Ghost, Texto e Vídeo na viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Preloader */}
        <AnimatePresence>
          {isLoading && (
            <Preloader
              durationMs={CONFIG.preloadMs}
              onComplete={handlePreloaderDone}
              label="Summoning spirits"
            />
          )}
        </AnimatePresence>

        {/* WebGL Stage - Base Layer */}
        <div className="absolute inset-0 z-0">
          <GhostStage reducedMotion={prefersReducedMotion} />
        </div>

        {/* Editorial Text Block (HeroCopy) - Middle Layer */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 pointer-events-none">
          <div className="pointer-events-auto">
            <HeroCopy />
          </div>
        </div>

        {/* Video Manifesto (Desktop Only) - Higher Layer than Copy */}
        {!prefersReducedMotion && (
          <motion.div
            className="fixed bottom-6 right-6 md:right-10 z-20 pointer-events-auto hidden md:block"
            style={{
              scale: videoScale,
              borderRadius,
              width: '30vw',
              aspectRatio: '16/9',
              originX: 1,
              originY: 1,
              overflow: 'hidden',
            }}
            initial={CONFIG.entrance.initial}
            animate={CONFIG.entrance.animate}
            transition={CONFIG.entrance.transition}
          >
            <ManifestoThumb
              ref={manifestoRef}
              onClick={() => {
                // Clique na thumb scrolla para o final para trigger do hold
                window.scrollTo({
                  top: window.innerHeight * 2,
                  behavior: 'smooth',
                });
              }}
            />
          </motion.div>
        )}
        {/* Scroll Hint / Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 0.6 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 hidden md:flex flex-col items-center gap-2"
        >
          <button
            onClick={() =>
              window.scrollTo({
                top: window.innerHeight * 2,
                behavior: 'smooth',
              })
            }
            className="group flex flex-col items-center gap-3 transition-opacity hover:opacity-100"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/50 group-hover:text-cyan-400 transition-colors">
              scroll down
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-px h-12 bg-linear-to-b from-cyan-400 to-transparent"
            />
          </button>
        </motion.div>
      </div>

      {/* Placeholder para ocupar o scroll de 200vh */}
      <div className="h-screen w-full pointer-events-none" />
    </section>
  );
}
