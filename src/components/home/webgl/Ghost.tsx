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

    // Pulsing emissive intensity (per reference: 5.8 base, pulse 0.6)
    const pulse = Math.sin(t * 1.6) * 0.6;
    const breathe = Math.sin(t * 0.6) * 0.12;
    material.emissiveIntensity = 5.8 + pulse + breathe;

    // Floating animation (per reference: floatSpeed 1.6)
    const float1 = Math.sin(t * 1.5 * 1.6) * 0.03;
    const float2 = Math.cos(t * 0.7 * 1.6) * 0.018;
    const float3 = Math.sin(t * 2.3 * 1.6) * 0.008;
    meshRef.current.position.y = float1 + float2 + float3;

    // Gentle wobble (per reference: wobbleAmount 0.35)
    meshRef.current.rotation.y = Math.sin(t * 1.4) * 0.05 * 0.35;
    meshRef.current.rotation.z = Math.sin(t * 0.8) * 0.03 * 0.35;

    // Scale breathing variation
    const scaleBreath = 1 + Math.sin(t * 0.8) * 0.012;
    meshRef.current.scale.setScalar(scaleBreath);
  });

  return (
    <group scale={1.3}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color="#06071f"
          emissive={ghostColor}
          emissiveIntensity={8.8}
          transparent
          opacity={0.78}
          roughness={0.02}
          metalness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      <Eyes />
    </group>
  );
}
