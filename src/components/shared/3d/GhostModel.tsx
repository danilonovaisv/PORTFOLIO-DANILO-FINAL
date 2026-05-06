'use client';

import * as React from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import type { GLTF } from 'three-stdlib';
import { Group } from 'three';
import { MotionValue } from 'framer-motion';

// Primary: local public/ path (always available, no DNS dependency).
// Supabase URL is available as prop override for production CDN scenarios.
const GHOST_LOCAL_PATH = '/site.assets/3d/ghost-v1.glb';

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
  src = GHOST_LOCAL_PATH,
  intensity = 0,
  ...props
}: GhostModelProps) {
  // Fallback: if URL resolves to ghost-transformed.glb or stale Supabase path, use local
  const resolvedSrc =
    src?.includes('ghost-transformed') || !src ? GHOST_LOCAL_PATH : src;
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

  // Optimizing shaders and materials for mobile (60FPS mandate)
  const optimizedScene = React.useMemo(() => {
    const sceneCopy = gltf.scene.clone();

    sceneCopy.traverse((child: any) => {
      if (child.isMesh) {
        // Frustum culling optimization
        child.frustumCulled = true;

        // Material optimization (downgrade to MeshBasicMaterial for performance)
        if (child.material) {
          // Store original material if needed later
          child.userData.originalMaterial = child.material;

          // Use basic material with Ghost Blue color (#0048ff)
          // If it's a PBR material, converting it to Basic avoids lighting calculations on GPU
          // We can't directly copy Standard to Basic easily without losing properties,
          // so we create a new BasicMaterial using the color.
          import('three').then(({ MeshBasicMaterial, Color }) => {
            const color = child.material.color || new Color('#0048ff');
            child.material = new MeshBasicMaterial({
              color: color,
              transparent: child.material.transparent,
              opacity: child.material.opacity,
              wireframe: child.material.wireframe,
              depthWrite: !child.material.transparent, // Disable depthWrite for transparent objects
            });
          });
        }
      }
    });

    return sceneCopy;
  }, [gltf.scene]);

  return (
    <group ref={meshRef} {...props} dispose={null}>
      <primitive object={optimizedScene} />
    </group>
  );
}

// Preload para evitar “pop-in” quando a seção entrar

if (typeof window !== 'undefined') {
  useGLTF.preload(GHOST_LOCAL_PATH);
}
