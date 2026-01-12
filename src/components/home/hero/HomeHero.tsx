'use client';

import * as React from 'react';
import { useRef, useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Preloader } from '@/components/ui/Preloader';
// import { useMediaQuery } from '@/hooks/useMediaQuery';
// import { useReducedMotion } from '@/hooks/useReducedMotion';

import HeroCopy from './HeroCopy';
import HeroCTA from './HeroCTA';

// Dynamic import for WebGL Scene
const GhostScene = dynamic(
  () => import('@/components/canvas/home/hero/GhostScene'),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-background" />,
  }
);

const CONFIG = {
  preloadMs: 2000,
} as const;

// heroGradient removed

import { Container } from '@/components/layout/Container';

export default function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), CONFIG.preloadMs);
    return () => clearTimeout(timer);
  }, []);

  // Performance: Desativa WebGL em mobile para garantir LCP < 2.5s (Lei da Performance Mobile)
  // const isMobile = useMediaQuery('(max-width: 768px)');

  const handlePreloaderDone = useCallback(() => setIsLoaded(true), []);

  return (
    <>
      <section
        id="hero"
        ref={heroRef}
        className="relative w-full min-h-screen bg-[#040013]"
        aria-label="Portfolio Hero Section"
      >
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

        {/* Camada: Texto Editorial (Z-0) - Abaixo do Ghost conforme solicitado */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="sticky top-0 h-screen w-full flex items-center justify-center">
            <Container className="pointer-events-auto">
              <HeroCopy isLoaded={isLoaded} />
            </Container>
          </div>
        </div>

        {/* Camada: Ghost WebGL (Z-10) - Acima do Texto */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          <div className="sticky top-0 h-screen w-full">
            <GhostScene />
          </div>
        </div>

        {/* Camada: CTA (Z-50) */}
        <div className="absolute inset-0 z-50 pointer-events-none">
          <div className="sticky top-0 h-screen w-full flex items-end justify-center pb-12 lg:pb-20">
            <HeroCTA isLoaded={isLoaded} />
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
