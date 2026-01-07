'use client';

import * as React from 'react';
import { useRef, useEffect, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Preloader } from '@/components/ui/Preloader';

import { GhostStage } from './GhostStage';
import HeroCopy from './hero/HeroCopy';
import { useHeroAnimation } from './hero/useHeroAnimation';
import ManifestoThumb from './ManifestoThumb';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import ManifestoSection from './ManifestoSection';
import type { Group } from 'three';

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
  const ghostRef = useRef<Group | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [isLoading, setIsLoading] = useState(true);

  const prefersReducedMotion = usePrefersReducedMotion();

  const { videoScale, videoRadius, copyOpacity } = useHeroAnimation(sectionRef);

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
        <div className="absolute inset-0 z-20">
          <GhostStage reducedMotion={prefersReducedMotion} ghostRef={ghostRef} />
        </div>

        {/* Hero Copy (Editorial) */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center text-center px-6"
          style={{ opacity: copyOpacity }}
        >
          <HeroCopy />
        </motion.div>

        {/* Manifesto Thumb — segue referência CodePen: shrinked corner video that expands on scroll */}
        {!isMobile && (
          <motion.div
            className="absolute bottom-10 right-6 md:right-10 lg:right-14 z-30 w-[32vw] max-w-[560px] aspect-video overflow-hidden border border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
            style={{
              scale: videoScale,
              borderRadius: videoRadius,
              transformOrigin: 'center',
            }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          >
            <ManifestoThumb selfAnimate={false} />
          </motion.div>
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

      {/* Mobile: Manifesto em seção dedicada (fullscreen) logo após a Hero */}
      {isMobile && <ManifestoSection />}
    </section>
  );
}
