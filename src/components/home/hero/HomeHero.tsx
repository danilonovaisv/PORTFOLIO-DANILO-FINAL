'use client';

import * as React from 'react';
import { useRef, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Preloader } from '@/components/ui/Preloader';

import HeroCopy from './HeroCopy';
import { useHeroAnimation } from './useHeroAnimation';
import ManifestoThumb from './ManifestoThumb';

// Dynamic import for WebGL Scene
const GhostScene = dynamic(
  () => import('@/components/canvas/hero/GhostScene'),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#040013]" />,
  }
);

const CONFIG = {
  preloadMs: 2000,
  bgColor: '#040013',
} as const;

export default function HomeHero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  // Hook de animação do Hero (Controla Copy Opacity agora)
  const { copyOpacity } = useHeroAnimation(sectionRef);

  const handlePreloaderDone = useCallback(() => setIsLoading(false), []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen h-[120vh] md:h-[250vh] bg-[radial-gradient(circle,#0b0d3a,#06071f)] overflow-hidden"
      aria-label="Home hero section"
    >
      {/* Sticky Context */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background - Dark Void (Fixed) */}
        <div className="absolute inset-0 z-0 bg-transparent" aria-hidden />

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

        {/* Hero Copy (Editorial) - z-10 (Middle Layer) */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ opacity: copyOpacity }}
        >
          <HeroCopy />
        </motion.div>

        {/* WebGL Atmosphere/Ghost - z-20 (Ghost Layer - Above Text) */}
        <div className="absolute inset-0 z-20 pointer-events-none mix-blend-screen">
          <GhostScene />
        </div>

        {/* Manifesto Thumb - z-30 (Interactive Layer, expands to 50) */}
        <ManifestoThumb heroRef={sectionRef} />
      </div>

      {/* Scroll Space */}
      <div className="h-screen w-full pointer-events-none" />
    </section>
  );
}
