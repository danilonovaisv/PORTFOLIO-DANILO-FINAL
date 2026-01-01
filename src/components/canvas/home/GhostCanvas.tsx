'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import Ghost from './Ghost';
import Particles from './Particles';
import Fireflies from './Fireflies';
import AtmosphereVeil from './AtmosphereVeil';

import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
  Scanline,
  ChromaticAberration,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

// ============================================================================
// CONFIGURAÇÃO CRÍTICA: A COR DO FUNDO DEVE SER IDÊNTICA À COR DA MÁSCARA
// ============================================================================
const BACKGROUND_COLOR = '#06071f';

export default function GhostCanvas() {
  const dpr: [number, number] = [1, 2];

  const ghostRef = useRef<THREE.Group>(null);

  return (
    <Canvas
      dpr={dpr}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      camera={{ position: [0, 0, 6], fov: 35 }}
    >
      <color attach="background" args={[BACKGROUND_COLOR]} />

      <Suspense fallback={null}>
        <AtmosphereVeil />

        {/* Ghost (Z ~ 0) */}
        <Ghost ref={ghostRef} scale={0.22} position={[0, -0.2, 0]} />

        {/* Partículas decorativas */}
        <Particles />
        <Fireflies />

        {/* Post-processing (Ghost Atmosphere Spine) */}
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom
            luminanceThreshold={0.15}
            mipmapBlur
            intensity={2.8}
            radius={0.4}
          />
          <ChromaticAberration
            offset={[0.0015, 0.0015]}
            radialModulation={true}
            modulationOffset={0.5}
            blendFunction={BlendFunction.SCREEN}
          />
          <Scanline density={1.4} opacity={0.1} />
          <Noise
            opacity={0.08}
            premultiply
            blendFunction={BlendFunction.OVERLAY}
          />
          <Vignette eskil={false} offset={0.2} darkness={0.8} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
