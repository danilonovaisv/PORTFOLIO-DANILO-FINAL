'use client';

import React, { memo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import TorusDan from './TorusDan';

function HeroGlassScene() {
  return (
    <>
      <Suspense fallback={null}>
        <TorusDan position={[0, 0, 0]} />
        <Environment preset="city" background={false} blur={1} />
      </Suspense>
      <ambientLight intensity={0.2} />
      {/* rim light para recorte suave */}
      {/* @ts-ignore */}
      <directionalLight position={[2, 3, 5]} intensity={1.1} />
    </>
  );
}

function HeroGlassCanvasInner() {
  return (
    <Canvas
      className="absolute inset-0 -z-10 pointer-events-none"
      dpr={[1, 1.5]}
      camera={{ fov: 40, position: [0, 0, 6] }}
      eventSource={typeof document !== 'undefined' ? document.body : undefined}
    >
      <HeroGlassScene />
    </Canvas>
  );
}

export default memo(HeroGlassCanvasInner);
