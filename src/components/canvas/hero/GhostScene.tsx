'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { usePerformanceAdaptive } from '@/hooks/usePerformanceAdaptive';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import Ghost from './Ghost';
import Fireflies from './Fireflies';
import { Atmosphere } from './Atmosphere';
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
  ChromaticAberration,
  Scanline,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

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
  const { quality, fireflyCount, pixelRatio, enablePostProcessing } =
    usePerformanceAdaptive();

  // Fallback estático para prefers-reduced-motion
  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 bg-linear-to-br from-neutral-950 to-neutral-900">
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
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
        {/* Luzes ambiente REDUZIDA */}
        <ambientLight color="#001020" intensity={0.5} />

        {/* Rim lights direcionais FOCADAS */}
        {/* Main Blue Rim */}
        <spotLight
          position={[-10, 8, -5]}
          color="#0048ff"
          intensity={8.0}
          angle={0.5}
          penumbra={1}
        />

        {/* Secondary Cyan Rim (Counter-light) */}
        <spotLight
          position={[10, -5, -5]}
          color="#4fe6ff"
          intensity={4.0}
          angle={0.6}
          penumbra={1}
        />

        <Suspense fallback={null}>
          {/* Plano de atmosfera (shader customizado) */}
          <Atmosphere />

          {/* Personagem principal */}
          <Ghost />

          {/* Vagalumes (quantidade adaptativa) */}
          <Fireflies count={fireflyCount} />

          {/* Post-Processing Pipeline (Agent 5) */}
          {enablePostProcessing && (
            <EffectComposer>
              <Bloom
                luminanceThreshold={0}
                mipmapBlur
                intensity={1.25}
                radius={0.4}
              />
              <ChromaticAberration
                offset={new THREE.Vector2(0.002, 0.002)}
                radialModulation={true}
                modulationOffset={0}
              />
              <Scanline
                density={1.25}
                opacity={0.05} // Subtle scanlines (Ghost Monitor)
              />
              <Noise opacity={0.15} blendFunction={BlendFunction.OVERLAY} />
              <Vignette eskil={false} offset={0.1} darkness={0.9} />
            </EffectComposer>
          )}
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
