'use client';

import * as React from 'react';
import { useRef, useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { BRAND } from '@/config/brand';
import { Preloader } from '@/components/ui/Preloader';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useReducedMotion } from '@/hooks/useReducedMotion';

import HeroCopy from './HeroCopy';
// ManifestoThumb removed

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

const heroGradient = `radial-gradient(circle at center, ${BRAND.colors.neutral}, ${BRAND.colors.background})`;

export default function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), CONFIG.preloadMs);
    return () => clearTimeout(timer);
  }, []);

  // Performance: Desativa WebGL em mobile para garantir LCP < 2.5s (Lei da Performance Mobile)
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handlePreloaderDone = useCallback(() => setIsLoaded(true), []);

  return (
    <>
      <section
        id="hero"
        ref={heroRef}
        className="relative w-full min-h-screen"
        style={{ backgroundImage: heroGradient }}
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

        {/* Background WebGL Layer (z-20) - Desktop Only */}
        <div className="sticky top-0 h-screen w-full z-20 overflow-hidden pointer-events-none">
          {!isMobile && !prefersReducedMotion && <GhostScene />}
        </div>

        {/* Hero Content Layer (z-10) */}
        <div className="absolute inset-0 z-10">
          <div className="sticky top-0 h-screen w-full flex items-center justify-center px-6 md:px-12 pointer-events-none">
            <HeroCopy />
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
