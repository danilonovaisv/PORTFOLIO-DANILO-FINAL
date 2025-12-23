// src/components/home/webgl/Ghost.tsx
'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Eyes from './Eyes';

export default function Ghost() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ghostColor = useMemo(() => new THREE.Color('#0057FF'), []);

  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(2, 64, 64);
    const positions = geo.attributes.position.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      if (positions[i + 1] < -0.2) {
        const x = positions[i];
        const z = positions[i + 2];
        const noise1 = Math.sin(x * 5) * 0.35;
        const noise2 = Math.cos(z * 4) * 0.25;
        const noise3 = Math.sin((x + z) * 3) * 0.15;
        const combinedNoise = noise1 + noise2 + noise3;
        positions[i + 1] = -2.0 + combinedNoise;
      }
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const material = meshRef.current.material as THREE.MeshStandardMaterial;

    // Pulsing emissive
    material.emissiveIntensity = 3.5 + Math.sin(t * 1.6) * 0.6;

    // Floating animation
    meshRef.current.position.y = Math.sin(t * 1.2) * 0.15;

    // Gentle wobble
    meshRef.current.rotation.y = Math.sin(t * 0.4) * 0.1;
  });

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color="#06071f"
          emissive={ghostColor}
          emissiveIntensity={3.5}
          transparent
          opacity={0.88}
          roughness={0.02}
          metalness={0}
          side={THREE.DoubleSide}
        />
      </mesh>
      <Eyes />
    </group>
  );
}
