'use client';

import * as React from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { Environment, Preload } from '@react-three/drei';
import type { MotionValue } from 'framer-motion';
import GlassOrb from './GlassOrb';

type Props = {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
  reducedMotion: boolean;
};

export default function HeroScene({
  mouseX,
  mouseY,
  scrollYProgress,
  reducedMotion,
}: Props) {
  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 5.25], fov: 50, near: 0.1, far: 30 }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 5.05;
        gl.setClearColor(0x000000, 0);
      }}
    >
      <React.Suspense fallback={null}>
        {/* Minimal lighting (HDRI does most of the work) */}
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 3, 2]} intensity={1.2} />

        {/* HDRI */}
        <Environment preset="city" />

        {/* Orb */}
        <GlassOrb
          modelUrl="/models/torus_dan.glb"
          materialVariant="transmission"
          mouseX={mouseX}
          mouseY={mouseY}
          scrollYProgress={scrollYProgress}
          reducedMotion={reducedMotion}
        />

        <Preload all />
      </React.Suspense>
    </Canvas>
  );
}
