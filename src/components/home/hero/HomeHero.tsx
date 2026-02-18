'use client';

import * as React from 'react';
import { useRef, useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';

import { Preloader } from '@/components/ui/Preloader';
import GhostSceneWrapper from '@/components/canvas/home/hero/GhostSceneWrapper';

import HeroCopy from './HeroCopy';
import HeroCTA from './HeroCTA';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useWebGLSupport } from '@/hooks/useWebGLSupport';
import { useMotionGate } from '@/hooks/useMotionGate';
import { useAntigravityStore } from '@/store/antigravity.store';

const CONFIG = {
  // Aumentado levemente para evitar flicker e permitir percepção da atmosfera.
  preloadMs: 500,
} as const;

export default function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [allowHeavyWebGL, setAllowHeavyWebGL] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const supportsWebGL = useWebGLSupport();
  const mountWebGL = useAntigravityStore((state) => state.flags.mountWebGL);
  // `shouldReduceMotion` agora controla tanto a preferência do usuário quanto a flag global
  const shouldReduceMotion = useMotionGate();

  // Só renderiza WebGL em dispositivos que suportam custo gráfico adicional
  const shouldRenderWebGL =
    supportsWebGL && mountWebGL && !shouldReduceMotion && allowHeavyWebGL;

  const handleWebGLCreated = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Fallback de segurança: se o WebGL não carregar em 3s, remove preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || !mountWebGL || !isDesktop) {
      setAllowHeavyWebGL(false);
      return;
    }

    type NavigatorWithHints = Navigator & {
      deviceMemory?: number;
      connection?: {
        saveData?: boolean;
        effectiveType?: string;
      };
    };

    const nav = navigator as NavigatorWithHints;
    const lowCpu =
      typeof nav.hardwareConcurrency === 'number' &&
      nav.hardwareConcurrency <= 4;
    const lowMemory =
      typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4;
    const saveData = !!nav.connection?.saveData;
    const slowNetwork =
      typeof nav.connection?.effectiveType === 'string' &&
      /2g/.test(nav.connection.effectiveType);

    setAllowHeavyWebGL(!(lowCpu || lowMemory || saveData || slowNetwork));
  }, [isDesktop, mountWebGL, shouldReduceMotion]);

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
          <div className="absolute inset-0 z-0 opacity-60 bg-[radial-gradient(circle_at_50%_50%,#0a0029_0%,#040013_70%)]" />
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

        {/* Camada: Texto Editorial (ABAIXO do WebGL para efeito de fog, mas acessível via pointer-events) */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          <div className="flex items-center justify-center w-full h-screen md:sticky md:top-0">
            <div className="w-full pointer-events-auto pb-24 md:pb-0 flex flex-col items-center">
              {/* isLoaded agora é true muito mais rápido */}
              <HeroCopy isLoaded={isLoaded} />
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* Camada: HERO CTA — z-50: ACIMA do Ghost WebGL (z-40)             */}
        {/* e do texto (z-30). Abaixo do Header (z-1000).                    */}
        {/* Extraído do z-30 para ter stacking context independente.          */}
        {/* Posicionado 10% acima do rodapé da sessão e centralizado.        */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div className="absolute inset-0 z-50 pointer-events-none">
          <div className="absolute bottom-[10%] left-0 right-0 flex justify-center">
            <div className="pointer-events-auto">
              <HeroCTA />
            </div>
          </div>
        </div>

        {/* Camada: Ghost WebGL (ACIMA do conteúdo textual para efeito de fog/imersão) */}
        <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
          <div className="sticky top-0 h-screen w-full">
            {shouldRenderWebGL ? (
              <GhostSceneWrapper onCreated={handleWebGLCreated} />
            ) : (
              <div
                className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,#0a0029_0%,#040013_70%)]"
                aria-hidden="true"
              />
            )}
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
