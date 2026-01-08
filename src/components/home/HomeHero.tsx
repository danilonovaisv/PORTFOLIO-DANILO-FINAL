'use client';

import * as React from 'react';
import { useRef, useEffect, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { GhostStage } from './hero/GhostStage';
import HeroCopy from './hero/HeroCopy';
import { useHeroAnimation } from './hero/useHeroAnimation';
import ManifestoThumb from './hero/ManifestoThumb';
import GhostAura from './hero/GhostAura';

const CONFIG = {
  preloadMs: 1800,
  bgColor: '#050511',
} as const;

// Page Entry Animation - Immersive entrance effect
const ENTRY_ANIMATION = {
  initial: {
    opacity: 0,
    scale: 0.92,
    y: 60,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    scale: [1.02, 1],
    y: 0,
    filter: 'blur(0px)',
  },
  transition: {
    duration: 1.2,
    ease: [0.25, 0.46, 0.45, 0.94],
    delay: 0.1, // Small delay after preloader starts fading
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

  const [isLoading, setIsLoading] = useState(false);

  const prefersReducedMotion = usePrefersReducedMotion();

  // Hook de animação do Hero (Controla Copy Opacity agora)
  const { copyOpacity } = useHeroAnimation(sectionRef);

  const handlePreloaderDone = useCallback(() => setIsLoading(false), []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen h-[120vh] md:h-[250vh] bg-[#040013] overflow-hidden"
      aria-label="Home hero section"
    >
      {/* Preloader Ghost - Z-50 (Highest layer) */}
      <AnimatePresence>
        {isLoading && (
          <Preloader
            durationMs={CONFIG.preloadMs}
            onComplete={handlePreloaderDone}
            label="Summoning spirits"
          />
        )}
      </AnimatePresence>

      {/* Sticky Context with Entry Animation */}
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden"
        initial={prefersReducedMotion ? {} : ENTRY_ANIMATION.initial}
        animate={!prefersReducedMotion ? ENTRY_ANIMATION.animate : {}}
        transition={ENTRY_ANIMATION.transition}
      >
        {/* Z-0: Background Gradient */}
        <div
          className="absolute inset-0 z-0 bg-[linear-gradient(180deg,#040013_0%,#0b0d3a_100%)]"
          aria-hidden
        />

        {/* Z-10: Ghost Aura - Ethereal atmosphere layer */}
        <GhostAura />

        {/* Z-20: WebGL Ghost Atmosphere */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <GhostStage reducedMotion={prefersReducedMotion} />
        </div>

        {/* Z-10: Hero Copy (Editorial Text Block) - Above Ghost */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ opacity: copyOpacity }}
        >
          <HeroCopy />
        </motion.div>

        {/* Z-30: Manifesto Thumb (Desktop - Floating Video) */}
        <ManifestoThumb sectionRef={sectionRef} />
      </motion.div>

      {/* Anchor for Manifesto Scroll - Trigger point for fullscreen */}
      <div
        id="manifesto-trigger"
        className="absolute top-[70%] w-px h-px pointer-events-none"
      />

      {/* Scroll Space */}
      <div className="h-screen w-full pointer-events-none" />
    </section>
  );
}
