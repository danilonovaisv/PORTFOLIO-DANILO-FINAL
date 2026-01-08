'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export default function AtmosphereVeil() {
  const veilRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!veilRef.current) return;
    const pulse = (Math.sin(state.clock.getElapsedTime() * 0.3) + 1) / 2;
    const material = veilRef.current.material as THREE.Material & {
      opacity?: number;
    };
    if (material.opacity !== undefined) {
      material.opacity = 0.32 + pulse * 0.08;
    }
  });

  return (
    <group>
      {/* Glow volumétrico atrás do fantasma */}
      <mesh
        ref={veilRef}
        position={[1, 1, -3]}
        scale={[1.2, 1.1, 1.1]}
        renderOrder={2}
      >
        <sphereGeometry args={[5.5, 64, 64]} />
        <meshStandardMaterial
          color="#0b0d3a"
          emissive="#0f0f4a"
          emissiveIntensity={0.6}
          transparent
          opacity={0.4}
          depthWrite={false}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </mesh>

      {/* Véu de fundo para integrar com o CSS */}
      <mesh position={[0, -2.5, -4]} rotation={[-0.1, 0, 0]} renderOrder={1}>
        <planeGeometry args={[18, 12]} />
        <meshStandardMaterial
          color="#03041c"
          transparent
          opacity={0.38}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
