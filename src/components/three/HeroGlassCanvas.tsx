'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, Html } from '@react-three/drei';
import { TorusDan } from './TorusDan';

type HeroGlassCanvasProps = {
  /** 0–1, vindo do scroll da Hero (opcional) */
  scrollIntensity?: number | import('framer-motion').MotionValue<number>;
};

export default function HeroGlassCanvas({
  scrollIntensity = 0,
}: HeroGlassCanvasProps) {
  return (
    <Canvas
      dpr={[1, 1.7]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 4.5], fov: 35 }}
    >
      <color attach="background" args={['#F4F5F7']} />

      <Suspense
        fallback={
          <Html center>
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-400/40 to-indigo-500/40 blur-xl" />
          </Html>
        }
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} />
        <directionalLight position={[-4, -2, -4]} intensity={0.4} />

        <Environment preset="city" resolution={1024} />

        <TorusDan variant="refraction" scrollIntensity={scrollIntensity} />

        <ContactShadows
          position={[0, -1.4, 0]}
          opacity={0.35}
          blur={2.5}
          scale={8}
          far={4}
        />
      </Suspense>
    </Canvas>
  );
}
