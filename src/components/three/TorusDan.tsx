'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import {
  MeshTransmissionMaterial,
  MeshRefractionMaterial,
  useGLTF,
  useEnvironment,
} from '@react-three/drei';

import { MotionValue } from 'framer-motion';

type TorusDanProps = {
  variant?: 'transmission' | 'refraction';
  scrollIntensity?: number | MotionValue<number>; // 0–1 vindo do Hero
};

type GLTFResult = {
  nodes: Record<string, { geometry?: any }>;
};

export function TorusDan({
  variant = 'transmission',
  scrollIntensity = 0,
}: TorusDanProps) {
  const { nodes } = useGLTF('/media/torus_dan.glb') as unknown as GLTFResult;
  const envMap = useEnvironment({ preset: 'city' });

  const meshRef = useRef<Mesh | null>(null);

  const geometry = useMemo(() => {
    const candidates = ['Torus', 'torus', 'Mesh_0', 'Mesh001', 'Object_0'];
    for (const key of candidates) {
      if (nodes[key]?.geometry) return nodes[key]!.geometry!;
    }
    const first = Object.values(nodes).find((n) => n.geometry);
    return first?.geometry;
  }, [nodes]);

  // Animação contínua + resposta leve ao scroll
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const t = state.clock.getElapsedTime();
    const baseX = 0.15;
    const baseY = 0.25;

    // Resolve current scroll intensity (number or MotionValue)
    const currentIntensity =
      typeof scrollIntensity === 'number'
        ? scrollIntensity
        : scrollIntensity.get();

    const scrollBoost = (currentIntensity ?? 0) * 0.35;

    meshRef.current.rotation.x += delta * (baseX + scrollBoost);
    meshRef.current.rotation.y += delta * (baseY + scrollBoost);
    meshRef.current.position.y = Math.sin(t * 0.6) * 0.05;
  });

  if (!geometry) return null;

  return (
    <group position={[0.4, 0.2, 0]} scale={1.1}>
      <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
        {variant === 'refraction' ? (
          <MeshRefractionMaterial
            envMap={envMap}
            aberrationStrength={0.02}
            color="#ffffff"
            ior={2.1}
            fresnel={1}
            bounces={2}
            fastChroma
          />
        ) : (
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

useGLTF.preload('/media/torus_dan.glb');
