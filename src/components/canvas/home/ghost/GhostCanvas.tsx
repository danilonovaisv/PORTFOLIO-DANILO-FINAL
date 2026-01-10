'use client';

import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Suspense } from 'react';
import type { RefObject } from 'react';
import { GHOST_CONFIG } from '@/config/ghostConfig';
import type { Group } from 'three';

import Ghost from '../Ghost';
import { AnalogDecay } from './AnalogDecayPass';
import GhostEyes from './GhostEyes';
import Particles from './Particles';

type GhostCanvasProps = {
  ghostRef?: RefObject<Group>;
};

export default function GhostCanvas({ ghostRef }: GhostCanvasProps) {
  const cfg = GHOST_CONFIG;

  return (
    <div className="absolute inset-0 z-0 h-full w-full">
      <Canvas
        eventSource={document.body}
        eventPrefix="client"
        dpr={[1, 1.2]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        // CAMERA AJUSTADA: Z=7 afasta, FOV=45 dá estilo de cinema sem exagerar no zoom
        camera={{ position: [0, 0, 7], fov: 35 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />

          {/* Primary Ghost Light - Glow intenso */}
          <pointLight
            position={[2, 3, 4]}
            intensity={2}
            color={cfg.glowColor}
            distance={0.9}
          />

          {/* Extra Glow Light - Cyan atmosférico (inspirado no CodePen) */}
          <pointLight
            position={[0, 0, 3]}
            intensity={8}
            color="#00f0ff"
            distance={12}
            decay={2}
          />

          {/* Rim Light - Contorno cyan sutil */}
          <pointLight
            position={[-3, -2, 2]}
            intensity={4}
            color="#4fe6ff"
            distance={8}
            decay={2}
          />

          {/* RevealingText removed in favor of HTML HeroCopy */}

          <group position={[0, -0.2, 0]}>
            <Ghost ref={ghostRef}>
              <GhostEyes color={cfg.eyeGlowColor} />
            </Ghost>
          </group>

          <Particles count={90} color={cfg.glowColor} />

          <EffectComposer enableNormalPass={false}>
            {/* Bloom mais intenso para glow fantasmagórico */}
            <Bloom
              luminanceThreshold={0.15}
              mipmapBlur
              intensity={3.5}
              radius={0.7}
            />
            {/* Optimized: Combined Noise and Vignette into AnalogDecay to reduce shader passes */}
            <AnalogDecay
              intensity={0.7}
              scanlines={0.08}
              grain={0.3}
              vignette={4.0}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
