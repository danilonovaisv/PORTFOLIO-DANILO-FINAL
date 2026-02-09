'use client';

import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { GHOST_CONFIG } from '@/config/ghostConfig';
import { usePerformanceAdaptive } from '@/hooks/usePerformanceAdaptive';
import { Ghost } from './Ghost';
import { Atmosphere } from './Atmosphere';

export function GhostCanvas() {
  const perfConfig = usePerformanceAdaptive();
  const ghostRef = useRef<THREE.Group>(null!);

  const dpr = perfConfig.pixelRatio;

  return (
    <div className="w-full h-full relative bg-transparent">
      <Canvas
        shadows={false}
        dpr={dpr}
        camera={{ position: [0, 0, 25], fov: 75 }}
        gl={{
          antialias: perfConfig.quality !== 'low',
          powerPreference: 'high-performance',
          alpha: true,
          stencil: false,
          depth: true,
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <AdaptiveDpr pixelated={perfConfig.quality === 'low'} />

          <ambientLight
            color={GHOST_CONFIG.ambientLightColor}
            intensity={GHOST_CONFIG.ambientLightIntensity}
          />

          <directionalLight
            position={[-8, 6, -4]}
            intensity={GHOST_CONFIG.rimLightIntensity}
            color="#4a90e2"
          />

          <directionalLight
            position={[8, -4, -6]}
            intensity={GHOST_CONFIG.rimLightIntensity * 0.7}
            color="#50e3c2"
          />

          <Ghost
            ghostRef={ghostRef}
            particleCount={perfConfig.particleCount * 5}
          />

          <Atmosphere ghostRef={ghostRef} />

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default GhostCanvas;
