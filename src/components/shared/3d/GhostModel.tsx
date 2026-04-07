'use client';

import * as React from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import type { GLTF } from 'three-stdlib';
import { Group } from 'three';
import { MotionValue } from 'framer-motion';

const GHOST_GLB_URL =
  'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost.glb';

type GhostGLTF = GLTF & {
  nodes: Record<string, unknown>;
  materials: Record<string, unknown>;
};

export type GhostModelProps = React.ComponentProps<'group'> & {
  /** Optional: override the default Supabase URL (useful for local/dev A/B). */
  src?: string;
  intensity?: number | MotionValue<number>;
  scrollProgress?: MotionValue<number>;
};

export function GhostModel({
  src = GHOST_GLB_URL,
  intensity = 0,
  ...props
}: GhostModelProps) {
  // Fallback: if URL resolves to ghost-transformed.glb, use the correct URL
  const resolvedSrc = src?.includes('ghost-transformed') ? GHOST_GLB_URL : src;
  const gltf = useGLTF(resolvedSrc) as GhostGLTF;
  const meshRef = React.useRef<Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Get current intensity value (handle both number and MotionValue)
    const currentIntensity =
      typeof intensity === 'number' ? intensity : intensity.get();

    // Time-based animation
    const t = state.clock.getElapsedTime();

    // Float amplitude scales with intensity: subtle at start, pronounced at climax
    const floatLift = Math.sin(t * 0.55) * (0.055 + currentIntensity * 0.065);
    const pulseLift =
      Math.sin(t * (0.95 + currentIntensity * 0.35)) * 0.025 * currentIntensity;
    const swayX = Math.sin(t * 0.42) * 0.02 * currentIntensity;
    const swayZ = Math.cos(t * 0.38) * 0.018 * currentIntensity;
    const scalePulse =
      1 + currentIntensity * 0.04 + Math.sin(t * 1.1) * 0.01 * currentIntensity;

    meshRef.current.position.y = floatLift + pulseLift;
    meshRef.current.position.x = swayX;
    meshRef.current.position.z = swayZ;
    meshRef.current.rotation.y =
      Math.sin(t * (0.3 + currentIntensity * 0.22)) *
      (0.08 + currentIntensity * 0.14);
    meshRef.current.rotation.x = Math.sin(t * 0.45) * 0.03 * currentIntensity;
    meshRef.current.scale.setScalar(scalePulse);
  });

  return (
    <group ref={meshRef} {...props} dispose={null}>
      <primitive object={gltf.scene} />
    </group>
  );
}

// Preload para evitar “pop-in” quando a seção entrar
// Apenas no cliente para evitar erros em testes Node/SSG
if (typeof window !== 'undefined') {
  useGLTF.preload(GHOST_GLB_URL);
}
