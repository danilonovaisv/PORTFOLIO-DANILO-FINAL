'use client';

import * as React from 'react';
import { useRef, useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';

import { Container } from '@/components/layout/Container';
import { Preloader } from '@/components/ui/Preloader';

import HeroCTA from './HeroCTA';
import HeroCopy from './HeroCopy';
import MobileManifestoVideo from './MobileManifestoVideo';

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

export default function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

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

        {/* Mobile Video Section (Phase 2) */}
        <MobileManifestoVideo />

        {/* Camada: Texto Editorial (Z-0) - Abaixo do Ghost conforme solicitado */}
        {/* Mobile: Relative flow | Desktop: Absolute Sticky */}
        <div className="relative z-0 pointer-events-none md:absolute md:inset-0">
          <div className="flex items-center justify-center w-full min-h-[40vh] md:sticky md:top-0 md:h-screen">
            <Container className="pointer-events-auto">
              <HeroCopy isLoaded={isLoaded} />
            </Container>
          </div>
        </div>

        {/* Camada: Ghost WebGL (Z-10) - Acima do Texto */}
        {/* Mobile & Desktop: Visible com movimento automático no mobile */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          <div className="sticky top-0 h-screen w-full">
            <GhostScene />
          </div>
        </div>

        {/* Camada: CTA (Z-50) */}
        {/* Mobile: Relative flow | Desktop: Absolute Sticky */}
        <div className="relative z-50 pointer-events-none md:absolute md:inset-0">
          <div className="flex items-end justify-center w-full pb-12 md:sticky md:top-0 md:h-screen lg:pb-20">
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
