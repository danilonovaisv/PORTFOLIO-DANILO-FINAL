'use client';

import * as React from 'react';
import { useRef, useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';

import { Preloader } from '@/components/ui/Preloader';
import GhostSceneWrapper from '@/components/canvas/home/hero/GhostSceneWrapper';

import HeroCTA from './HeroCTA';
import HeroCopy from './HeroCopy';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useWebGLSupport } from '@/hooks/useWebGLSupport';

const CONFIG = {
  preloadMs: 2000,
} as const;

export default function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const supportsWebGL = useWebGLSupport();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), CONFIG.preloadMs);
    return () => clearTimeout(timer);
  }, []);

  const handlePreloaderDone = useCallback(() => setIsLoaded(true), []);

  return (
    <>
      <section
        id="hero"
        ref={heroRef}
        className="relative w-full min-h-screen bg-[#040013] overflow-hidden"
        aria-label="Portfolio Hero Section"
      >
        {/* Fallback Mobile Background Gradient (Ghost Atmosphere) */}
        {!isDesktop && (
          <div className="absolute inset-0 z-0 animate-pulse opacity-60 bg-[radial-gradient(circle_at_50%_50%,#0a0029_0%,#040013_70%)]" />
        )}

        {/* Preloader */}
        <AnimatePresence>
          {!isLoaded && (
            <Preloader
              durationMs={CONFIG.preloadMs}
              onComplete={handlePreloaderDone}
              label="Initializing Experience"
            />
          )}
        </AnimatePresence>

        {/* Camada: Texto Editorial (Z-20) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="flex items-center justify-center w-full h-screen md:sticky md:top-0">
            <div className="w-full pointer-events-auto pb-32 md:pb-0">
              <HeroCopy isLoaded={isLoaded} />
            </div>
          </div>
        </div>

        {/* Camada: Ghost WebGL (Z-30) - Agora ativo em mobile com auto-performance */}
        <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
          <div className="sticky top-0 h-screen w-full">
            {supportsWebGL ? (
              <GhostSceneWrapper />
            ) : (
              <div className="absolute inset-0 z-0 animate-pulse opacity-20 bg-[radial-gradient(circle_at_50%_50%,#0a0029_0%,#040013_70%)]" />
            )}
          </div>
        </div>

        {/* Camada: CTA (Z-50) */}
        {/* Mobile: Bottom absolute | Desktop: Sticky bottom */}
        <div className="absolute inset-0 z-50 pointer-events-none">
          <div className="flex items-end justify-center w-full h-screen md:sticky md:top-0">
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:relative md:bottom-auto md:left-auto md:translate-x-0 md:pb-12 lg:pb-20 pointer-events-auto">
              <HeroCTA isLoaded={isLoaded} />
            </div>
          </div>
        </div>

        <div className="sr-only">
          Decorative animation of a floating spectral ghost with glowing
          particles following your cursor.
        </div>
      </section>

      {/* Mobile-only Manifesto Section */}
    </>
  );
}
