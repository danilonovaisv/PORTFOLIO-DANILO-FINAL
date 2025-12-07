'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { Instances, Model } from './Model';

export default function OrbCanvas() {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
      <Suspense fallback={null}>
        <Stage preset="rembrandt" intensity={1} environment="city">
          <Instances>
            <Model />
          </Instances>
        </Stage>
      </Suspense>
      <OrbitControls ref={controlsRef} autoRotate />
    </Canvas>
  );
}
