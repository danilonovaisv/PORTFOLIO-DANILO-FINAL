'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { usePerformanceAdaptive } from '@/hooks/usePerformanceAdaptive';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import Ghost from './Ghost';
import Fireflies from './Fireflies';
import { Atmosphere } from './Atmosphere';

function GhostSVGStatic() {
  return (
    <svg
      className="w-32 h-32 text-neutral-700"
      viewBox="0 0 512 512"
      fill="currentColor"
    >
      <path d="m508.374 432.802s-46.6-39.038-79.495-275.781c-8.833-87.68-82.856-156.139-172.879-156.139-90.015 0-164.046 68.458-172.879 156.138-32.895 236.743-79.495 275.782-79.495 275.782-15.107 25.181 20.733 28.178 38.699 27.94 35.254-.478 35.254 40.294 70.516 40.294 35.254 0 35.254-35.261 70.508-35.261s37.396 45.343 72.65 45.343 37.389-45.343 72.651-45.343c35.254 0 35.254 35.261 70.508 35.261s35.27-40.772 70.524-40.294c17.959.238 53.798-2.76 38.692-27.94z" />
      <circle cx="208" cy="225" r="22" />
      <circle cx="297" cy="225" r="22" />
    </svg>
  );
}

export default function GhostScene() {
  const prefersReducedMotion = useReducedMotion();
  const { quality, fireflyCount, pixelRatio } = usePerformanceAdaptive();

  // Fallback estático para prefers-reduced-motion
  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 bg-linear-to-br from-neutral-950 to-neutral-900">
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <GhostSVGStatic />
        </div>
        <span className="sr-only">Decoração: Fantasma estático no fundo</span>
      </div>
    );
  }

  return (
    <>
      <Canvas
        className="absolute inset-0 z-0 h-full w-full"
        dpr={pixelRatio}
        gl={{
          antialias: quality !== 'low',
          powerPreference: 'high-performance',
          alpha: true,
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 0, 20], fov: 75 }}
        role="presentation"
        aria-hidden="true"
      >
        {/* Luzes ambiente */}
        <ambientLight color="#0a0a2e" intensity={0.08} />

        {/* Rim lights direcionais */}
        <directionalLight
          position={[-8, 6, -4]}
          color="#4a90e2"
          intensity={1.8}
        />
        <directionalLight
          position={[8, -4, -6]}
          color="#50e3c2"
          intensity={1.26}
        />

        <Suspense fallback={null}>
          {/* Plano de atmosfera (shader customizado) */}
          <Atmosphere />

          {/* Personagem principal */}
          <Ghost />

          {/* Vagalumes (quantidade adaptativa) */}
          <Fireflies count={fireflyCount} />
        </Suspense>
      </Canvas>

      {/* Descrição para screen readers */}
      <div className="sr-only">
        Animação decorativa de um fantasma flutuante com partículas luminosas
        que seguem o movimento do cursor
      </div>
    </>
  );
}
