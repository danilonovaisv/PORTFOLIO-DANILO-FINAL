'use client';

import { Canvas } from '@react-three/fiber';
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from '@react-three/postprocessing';
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
          <pointLight
            position={[2, 3, 4]}
            intensity={2}
            color={cfg.glowColor}
            distance={0.9}
          />

          {/* RevealingText removed in favor of HTML HeroCopy */}

          <group position={[0, -0.2, 0]}>
            <Ghost ref={ghostRef}>
              <GhostEyes color={cfg.eyeGlowColor} />
            </Ghost>
          </group>

          <Particles count={90} color={cfg.glowColor} />

          <EffectComposer enableNormalPass={false}>
            <Bloom
              luminanceThreshold={0.2}
              mipmapBlur
              intensity={2.5}
              radius={0.5}
            />
            <AnalogDecay intensity={0.8} scanlines={0.1} grain={0.3} />
            <Noise opacity={0.01} />
            <Vignette eskil={false} offset={0.8} darkness={0.8} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
