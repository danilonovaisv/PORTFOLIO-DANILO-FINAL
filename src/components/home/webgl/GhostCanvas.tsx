'use client';

import { Canvas } from '@react-three/fiber';
import { GhostSphere } from './ghost/GhostSphere';
import { GhostEffect } from './ghost/GhostEffect';

export default function GhostCanvas() {
  return (
    <Canvas
      className="h-full w-full"
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        premultipliedAlpha: false,
      }}
      camera={{ fov: 75, position: [0, 0, 20], near: 0.1, far: 1000 }}
      // We'll render through EffectComposer instead
      frameloop="always"
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <GhostSphere />
      <GhostEffect />
    </Canvas>
  );
}
