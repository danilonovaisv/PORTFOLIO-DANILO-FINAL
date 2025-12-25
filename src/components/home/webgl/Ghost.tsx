// src/components/home/webgl/Ghost.tsx
'use client';

import { MutableRefObject, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Eyes from './Eyes';

type GhostProps = {
  speedRef?: MutableRefObject<number>;
};

export default function Ghost({ speedRef }: GhostProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(2, 56, 56);
    const positions = geo.attributes.position.array as Float32Array;

    // Create the ghost "skirt" wavy bottom
    for (let i = 0; i < positions.length; i += 3) {
      if (positions[i + 1] < -0.4) {
        const x = positions[i];
        const z = positions[i + 2];
        const noise = Math.sin(x * 4) * 0.35 + Math.cos(z * 3) * 0.28;
        positions[i + 1] = -2.0 + noise;
      }
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const speed = speedRef?.current ?? 0;
    const speedNormalized = THREE.MathUtils.clamp(speed * 0.06, 0, 6);

    // Pulsing core
    const pulse = Math.sin(t * 1.5) * 0.15;
    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    material.emissiveIntensity = 5.5 + pulse * 8 + speedNormalized;

    // Floating animation
    const float = Math.sin(t * 1.2) * 0.2;
    meshRef.current.position.y = float;
    glowRef.current.position.y = float;

    // Scale breathing
    const s = 1 + Math.sin(t * 0.8) * 0.05 + speedNormalized * 0.01;
    meshRef.current.scale.setScalar(s);
    glowRef.current.scale.setScalar(s * (1.45 + speedNormalized * 0.02));

    // Rotation wobble
    meshRef.current.rotation.y = Math.sin(t * 0.8) * 0.1;
    meshRef.current.rotation.z = Math.sin(t * 0.4) * 0.05;
  });

  return (
    <group scale={1.2}>
      {/* INTERNAL CORE - Semi-solid but glowing */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color="#06123b"
          emissive="#0b4dff"
          emissiveIntensity={5.5}
          transparent
          opacity={0.82}
          roughness={0}
          metalness={1}
          side={THREE.DoubleSide}
        />
        <Eyes speedRef={speedRef} />
      </mesh>

      {/* EXTERNAL HALO - The "Soft Light" reveal component */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.28}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
