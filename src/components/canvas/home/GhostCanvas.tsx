'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import Ghost from './Ghost';
import Particles from './Particles';
import Fireflies from './Fireflies';
import AtmosphereVeil from './AtmosphereVeil';
import RevealingText from './RevealingText';

import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
  Scanline,
  ChromaticAberration,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

export default function GhostCanvas() {
  const dpr: [number, number] =
    typeof window === 'undefined'
      ? [1, 1.5]
      : [1, Math.min(2, window.devicePixelRatio || 1)];

  // Ref do Fantasma (para passar posição ao texto)
  const ghostRef = useRef<THREE.Group>(null);

  return (
    <Canvas
      dpr={dpr}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.NoToneMapping,
      }}
      camera={{ position: [0, 0, 6], fov: 35 }}
    >
      <color attach="background" args={['#050511']} />

      <Suspense fallback={null}>
        <AtmosphereVeil />

        {/* Fantasma */}
        <Ghost ref={ghostRef} scale={0.22} position={[0, -0.2, 0]} />

        {/* Texto + Máscara de Luz */}
        <RevealingText ghostRef={ghostRef} />

        <Particles />
        <Fireflies />

        {/* Efeitos VHS/Cyberpunk */}
        <EffectComposer disableNormalPass multisampling={0}>
          <Bloom
            luminanceThreshold={1}
            mipmapBlur
            intensity={1.5}
            radius={0.6}
          />
          <ChromaticAberration
            offset={[0.002, 0.002]}
            radialModulation={false}
            modulationOffset={0}
          />
          <Scanline density={1.5} opacity={0.15} />
          <Noise
            opacity={0.15}
            premultiply
            blendFunction={BlendFunction.OVERLAY}
          />
          <Vignette eskil={false} offset={0.1} darkness={1.0} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
