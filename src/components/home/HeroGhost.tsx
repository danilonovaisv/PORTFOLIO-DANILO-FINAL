'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import Ghost from './webgl/Ghost';
import { AnalogDecayEffect } from './webgl/postprocessing/AnalogDecayPass';

/**
 * HeroGhost renders the 3D spectral ghost within an R3F Canvas.
 * It's now a standalone component, with its size/position controlled by the parent container.
 */
export default function HeroGhost() {
  return (
    <div className="w-full h-full relative">
      <Canvas
        dpr={[1, 1.5]} // Performance optimization
        camera={{ position: [0, 0, 20], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.9,
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <Ghost />
          <EffectComposer enableNormalPass={false}>
            <Bloom
              luminanceThreshold={0}
              mipmapBlur
              intensity={0.5}
              radius={0.6}
            />
            <AnalogDecayEffect />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
