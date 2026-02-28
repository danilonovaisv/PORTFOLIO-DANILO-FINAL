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
  const gltf = useGLTF(src) as GhostGLTF;
  const meshRef = React.useRef<Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Get current intensity value (handle both number and MotionValue)
    const currentIntensity =
      typeof intensity === 'number' ? intensity : intensity.get();

    // Time-based animation
    const t = state.clock.getElapsedTime();

    // Base Floating (always happening)
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.1;

    // Intensity-based agitation (Speed up rotation and add jitter)
    // Rotation: Base slow rotation + intensity-driven acceleration
    meshRef.current.rotation.y += 0.002 + currentIntensity * 0.02;

    // Jitter: Random micromovements based on intensity
    if (currentIntensity > 0.5) {
      const jitter = (Math.random() - 0.5) * 0.05 * currentIntensity;
      meshRef.current.position.x += jitter;
      meshRef.current.position.z += jitter;
    }
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
