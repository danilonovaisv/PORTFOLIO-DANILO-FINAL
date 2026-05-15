'use client';

import * as React from 'react';
import { useRef, useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';

import { Preloader } from '@/components/ui/Preloader';
import GhostSceneWrapper from '@/components/canvas/home/hero/GhostSceneWrapper';

import HeroCopy from '@/components/home/hero/HeroCopy';
import HeroCTA from '@/components/home/hero/HeroCTA';

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
        className="relative w-full min-h-[100svh] bg-background overflow-hidden isolate z-[var(--z-layer-base)]"
        aria-label="Portfolio Hero Section"
      >
        {/* Fallback Mobile Background Gradient (Ghost Atmosphere) - Também usado para Reduced Motion */}
        {(!isDesktop || shouldReduceMotion) && (
          <div
            className={`absolute inset-0 z-[var(--z-layer-base)] opacity-60 bg-[radial-gradient(circle_at_50%_50%,var(--color-neutral)_0%,var(--color-background)_70%)] ${
              shouldReduceMotion ? '' : 'animate-pulse'
            }`}
          />
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

        {/* Camada: Texto Editorial (z-layer-content — abaixo do WebGL) */}
        <div className="absolute inset-0 z-[var(--z-layer-content)] pointer-events-none">
          <div className="flex items-center justify-center w-full h-[100svh] md:h-screen md:sticky md:top-0">
            <div className="w-full pointer-events-auto pb-32 md:pb-0">
              {/* isLoaded agora é true muito mais rápido */}
              <HeroCopy isLoaded={isLoaded} />
            </div>
          </div>
        </div>

        {/* Camada: Ghost WebGL (z-layer-3d — acima do texto) */}
        {/* pointer-events gerenciado com cuidado se hover 3D ativo (pointer-events-none no wrapper e deixa canvas lidar) */}
        <div className="absolute inset-0 z-[var(--z-layer-3d)] pointer-events-none overflow-hidden" aria-hidden="true" role="presentation">
          <div className="sticky top-0 h-[100svh] md:h-screen w-full">
            {shouldRenderWebGL ? (
              <GhostSceneWrapper />
            ) : (
              <div
                className="absolute inset-0 z-[var(--z-layer-base)] opacity-20 bg-[radial-gradient(circle_at_50%_50%,var(--color-neutral)_0%,var(--color-background)_70%)]"
                aria-hidden="true"
              />
            )}
          </div>
        </div>

        {/* Camada: CTA (z-layer-cta — acima de TODOS) */}
        <div className="absolute inset-0 z-[var(--z-layer-cta)] pointer-events-none">
          <div className="relative h-full w-full flex items-end justify-center pb-[5%]">
            <div className="pointer-events-auto">{isLoaded && <HeroCTA />}</div>
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
