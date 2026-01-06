'use client';

import * as React from 'react';
import { useRef, useEffect, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Preloader } from '@/components/ui/Preloader';

import { GhostStage } from './hero/GhostStage';
import HeroCopy from './hero/HeroCopy';
import { useHeroAnimation } from './hero/useHeroAnimation';
import ManifestoThumb from './hero/ManifestoThumb';

const CONFIG = {
  preloadMs: 2000,
  bgColor: '#050511',
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

  const [isLoading, setIsLoading] = useState(true);

  const prefersReducedMotion = usePrefersReducedMotion();

  // Hook de animação do Hero (Controla o ManifestoThumb)
  const { videoWidth, videoHeight, videoRadius, copyOpacity } =
    useHeroAnimation(sectionRef);

  const handlePreloaderDone = useCallback(() => setIsLoading(false), []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[120vh] md:h-[250vh] bg-[#050511] overflow-hidden"
      aria-label="Home hero section"
    >
      {/* Sticky Context */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background Gradient */}
        <div
          className="absolute inset-0 z-0 bg-[linear-gradient(180deg,#040013_0%,#0b0d3a_100%)]"
          aria-hidden
        />

        {/* Preloader Ghost */}
        <AnimatePresence>
          {isLoading && (
            <Preloader
              durationMs={CONFIG.preloadMs}
              onComplete={handlePreloaderDone}
              label="Summoning spirits"
            />
          )}
        </AnimatePresence>

        {/* WebGL Atmosphere */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <GhostStage reducedMotion={prefersReducedMotion} />
        </div>

        {/* Hero Copy (Editorial) */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ opacity: copyOpacity }}
        >
          <HeroCopy />
        </motion.div>

        {/* Manifesto Thumb (Desktop Transition) */}
        {/* Renderiza apenas se não estiver carregando, para evitar glitches visuais */}
        {!isLoading && (
          <ManifestoThumb
            style={{
              width: videoWidth,
              height: videoHeight,
              borderRadius: videoRadius,
            }}
          />
        )}

        {/* Scroll Helper */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 0.6 }}
          className="absolute bottom-10 left-10 z-40 hidden md:flex flex-col items-start gap-4"
        >
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-[0.4em] text-cyan-400 font-mono">
              Scroll to step inside
            </span>
            <motion.div
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="h-px w-24 bg-linear-to-r from-cyan-400 to-transparent origin-left"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll Space */}
      <div className="h-screen w-full pointer-events-none" />
    </section>
  );
}
