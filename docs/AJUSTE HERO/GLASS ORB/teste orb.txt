'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import {
  MeshTransmissionMaterial,
  MeshRefractionMaterial,
  useGLTF,
} from '@react-three/drei';

type TorusDanProps = {
  variant?: 'transmission' | 'refraction';
  scrollIntensity?: number; // 0–1 vindo do Hero
};

// Type leve pra evitar brigar com types de GLTF gerados
type GLTFResult = {
  nodes: Record<string, { geometry?: THREE.BufferGeometry }>;
};

export function TorusDan({
  variant = 'transmission',
  scrollIntensity = 0,
}: TorusDanProps) {
  const { nodes } = useGLTF(
    '/media/Torus_dan.glb'
  ) as unknown as GLTFResult;

  const meshRef = useRef<Mesh>(null);

  // tenta achar a geometria principal independente do nome do node
  const geometry = useMemo(() => {
    const candidates = ['Torus', 'torus', 'Mesh_0', 'Mesh001', 'Object_0'];
    for (const key of candidates) {
      if (nodes[key]?.geometry) return nodes[key]!.geometry!;
    }
    // fallback: primeira geometry encontrada
    const first = Object.values(nodes).find((n) => n.geometry);
    return first?.geometry;
  }, [nodes]);

  // animação contínua + leve resposta ao scroll
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const t = state.clock.getElapsedTime();

    const baseX = 0.15;
    const baseY = 0.25;
    const scrollBoost = scrollIntensity * 0.35;

    meshRef.current.rotation.x += delta * (baseX + scrollBoost);
    meshRef.current.rotation.y += delta * (baseY + scrollBoost);
    meshRef.current.position.y = Math.sin(t * 0.6) * 0.05;
  });

  if (!geometry) return null;

  return (
    <group position={[0.5, 0.2, 0]} scale={50}>
      <mesh
        ref={meshRef}
        geometry={geometry}
        castShadow
        receiveShadow
      >
        {variant === 'refraction' ? (
          // Variante inspirada na doc de MeshRefractionMaterial
          <MeshRefractionMaterial
            envMapIntensity={1.2}
            aberrationStrength={0.02}
            color="#ffffff"
            ior={2.1}
            fresnel={1}
            bounces={2}
            fastChroma
          />
        ) : (
          // Variante “glass líquido” MeshTransmissionMaterial
          <MeshTransmissionMaterial
            backside
            samples={16}
            resolution={1024}
            thickness={0.65}
            chromaticAberration={0.18}
            anisotropy={0.2}
            distortion={0.25}
            distortionScale={0.4}
            temporalDistortion={0.2}
            iridescence={0.8}
            iridescenceIOR={1.1}
            iridescenceThicknessRange={[50, 300]}
            attenuationColor="#91c9ff"
            attenuationDistance={0.8}
            roughness={0.1}
            envMapIntensity={1.3}
          />
        )}
      </mesh>
    </group>
  );
}

// Preload para evitar flash na primeira render
useGLTF.preload('/media/Torus_dan.glb');
