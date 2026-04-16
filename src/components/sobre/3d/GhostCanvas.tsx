'use client';

import { Canvas } from '@react-three/fiber';
import { GhostModel } from '@/components/sobre/3d/GhostModel';

export function GhostCanvas() {
  return (
    <Canvas
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        pointerEvents: 'none',
      }}
      camera={{ position: [0, 0, 5], fov: 45 }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <GhostModel />
    </Canvas>
  );
}
