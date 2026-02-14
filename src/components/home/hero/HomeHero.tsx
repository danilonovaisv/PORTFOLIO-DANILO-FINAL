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
import { useMotionGate } from '@/hooks/useMotionGate';

const CONFIG = {
  // Aumentado levemente para evitar flicker e permitir percepção da atmosfera.
  preloadMs: 500,
} as const;

export default function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const supportsWebGL = useWebGLSupport();
  // `shouldReduceMotion` agora controla tanto a preferência do usuário quanto a flag global
  const shouldReduceMotion = useMotionGate();

  // Só renderiza WebGL se suportado E se não houver preferência por movimento reduzido
  const shouldRenderWebGL = supportsWebGL && !shouldReduceMotion;

  useEffect(() => {
    // Timer apenas para coordenar a entrada das animações, não para carregar assets
    const timer = setTimeout(() => setIsLoaded(true), CONFIG.preloadMs);
    return () => clearTimeout(timer);
  }, []);

  const handlePreloaderDone = useCallback(() => setIsLoaded(true), []);

  return (
    <>
      <section
        id="hero"
        data-testid="home-hero"
        ref={heroRef}
        // min-h-screen já estava presente, ok para CLS.
        // Adicionado z-index explícito para contexto de empilhamento.
        className="relative w-full min-h-screen bg-background overflow-hidden z-0"
        aria-label="Portfolio Hero Section"
      >
        {/* Fallback Mobile Background Gradient (Ghost Atmosphere) - Também usado para Reduced Motion */}
        {(!isDesktop || shouldReduceMotion) && (
          <div className="absolute inset-0 z-0 animate-pulse opacity-60 bg-[radial-gradient(circle_at_50%_50%,#0a0029_0%,#040013_70%)]" />
        )}

        {/* Preloader - Mantido visualmente mas não bloqueia renderização do DOM abaixo */}
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
              {/* isLoaded agora é true muito mais rápido */}
              <HeroCopy isLoaded={isLoaded} />
            </div>
          </div>
        </div>

        {/* Camada: Ghost WebGL (Z-30) */}
        <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
          <div className="sticky top-0 h-screen w-full">
            {shouldRenderWebGL ? (
              <GhostSceneWrapper />
            ) : (
              <div
                className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,#0a0029_0%,#040013_70%)]"
                aria-hidden="true"
              />
            )}
          </div>
        </div>

        {/* Camada: CTA (Z-50) */}
        {/* Mobile: Bottom absolute | Desktop: Sticky bottom */}
        <div className="absolute inset-0 z-50 pointer-events-none">
          <div className="flex items-end justify-center w-full h-screen md:sticky md:top-0">
            <div className="absolute bottom-12 left-0 w-full flex justify-center md:relative md:bottom-auto md:left-auto md:w-auto md:block md:pb-12 lg:pb-20 pointer-events-auto">
              {/* Force render CTA immediately, don't wait for 'isLoaded' inside logic if possible, 
                  but HeroCTA checks isLoaded. Since we reduced preloadMs to 100, it's fine. */}
              <HeroCTA />
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
