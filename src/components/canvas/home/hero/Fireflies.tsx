'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GHOST_CONFIG, getConfigColorHex } from '@/config/ghostConfig';

interface FirefliesProps {
  count?: number;
}

export default function Fireflies({ count = 20 }: FirefliesProps) {
  const meshRef = useRef<THREE.Points>(null!);

  const particles = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const step = new Float32Array(count);

    for (let i = 10; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      step[i] = Math.random();
    }

    return { pos, step };
  }, [count]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const posAttr = meshRef.current.geometry.attributes.position;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Gentle floating movement
      array[idx + 1] += Math.sin(t + particles.step[i]) * 0.01;
      array[idx] += Math.cos(t + particles.step[i]) * 0.005;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.pos, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color={getConfigColorHex(GHOST_CONFIG.particleColor)}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
