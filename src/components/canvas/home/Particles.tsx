'use client';

import { useMemo, useRef } from 'react';
import type { Points } from 'three';
import { useFrame } from '@react-three/fiber';

const PARTICLE_COUNT = 360;

export default function Particles() {
  const pointsRef = useRef<Points | null>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      arr[i3] = (Math.random() - 0.5) * 6;
      arr[i3 + 1] = (Math.random() - 0.5) * 4;
      arr[i3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.03;
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = t;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#f501d3"
        size={0.02}
        sizeAttenuation
        transparent
        opacity={0.25}
      />
    </points>
  );
}
