'use client';

import React from 'react';
import { Environment, Lightformer, SpotLight } from '@react-three/drei';
import { GlassBar, type FluidGlassMaterialProps } from './GlassBar';

export interface FluidGlassSceneProps {
  materialProps: FluidGlassMaterialProps;
  pointer: { x: number; y: number };
  parallax: number;
  reducedMotion: boolean;
}

export default function FluidGlassScene({
  materialProps,
  pointer,
  parallax,
  reducedMotion,
}: FluidGlassSceneProps) {
  return (
    <>
      <color attach="background" args={['transparent']} />
      <ambientLight intensity={0.48} />
      <SpotLight
        position={[-2, 3, 6]}
        angle={0.45}
        penumbra={0.7}
        intensity={1.4}
        color="#9fd8ff"
        distance={16}
      />
      <Environment resolution={64}>
        <Lightformer
          intensity={2.4}
          color="#6da8ff"
          position={[0, 0.6, 4]}
          scale={[6, 2, 1]}
          form="rect"
        />
        <Lightformer
          intensity={1.8}
          color="#ffffff"
          position={[2.5, -2, 3]}
          scale={[4, 1, 1]}
          form="rect"
        />
      </Environment>
      <GlassBar
        materialProps={materialProps}
        pointer={pointer}
        parallax={parallax}
        reducedMotion={reducedMotion}
      />
    </>
  );
}
