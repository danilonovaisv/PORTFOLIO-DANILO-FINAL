'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import Ghost from './Ghost';
import GhostEyes from './GhostEyes';
import Particles from './Particles';
import Fireflies from './Fireflies';
import AtmosphereVeil from './AtmosphereVeil';
import RevealingText from './RevealingText';
import AnalogDecayPass from './postprocessing/AnalogDecayPass';
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
  Scanline,
  ChromaticAberration,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

const BACKGROUND_COLOR = '#020204';

export default function GhostCanvas({ active = true }: { active?: boolean }) {
  const ghostRef = useRef<THREE.Group>(null);

  // AVISO: A lógica de "não renderizar em mobile" foi movida para HomeHero.tsx
  // Isso evita que o componente retorne null internamente e cause falha no layout.

  const dpr: [number, number] =
    typeof window !== 'undefined' && window.devicePixelRatio > 2
      ? [1, 1.5]
      : [1, 2];

  return (
    <Canvas
      dpr={dpr}
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      camera={{ position: [0, 0, 7], fov: 35 }}
      style={{ pointerEvents: 'none' }}
    >
      <color attach="background" args={[BACKGROUND_COLOR]} />
      <ambientLight intensity={0.5} color="#0a0a2e" />

      <Suspense fallback={null}>
        {/* <AtmosphereVeil ghostRef={ghostRef} /> */}

        <RevealingText ghostRef={ghostRef} />

        <Ghost
          ref={ghostRef}
          scale={0.22}
          position={[0, -0.2, 0]}
          active={active}
        >
          <GhostEyes />
        </Ghost>

        <Particles count={50} />
        <Fireflies />

        {/* <EffectComposer multisampling={0} enableNormalPass={false}>
          {/* <AnalogDecayPass /> 
          <Bloom
            luminanceThreshold={0.15}
            mipmapBlur
            intensity={1.8}
            radius={0.5}
          />
          <ChromaticAberration
            offset={[0.0015, 0.0015]}
            radialModulation={true}
            modulationOffset={0.7}
            blendFunction={BlendFunction.SCREEN}
          />
          <Scanline density={1.5} opacity={0.04} />
          <Noise
            opacity={0.08}
            premultiply
            blendFunction={BlendFunction.OVERLAY}
          />
          <Vignette eskil={false} offset={0.2} darkness={0.8} />
        </EffectComposer> */}
      </Suspense>
    </Canvas>
  );
}
