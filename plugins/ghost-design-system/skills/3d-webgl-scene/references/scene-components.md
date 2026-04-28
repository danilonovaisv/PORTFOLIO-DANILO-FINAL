# R3F Scene Component Implementations

## components/3d/Scene.tsx — Main Canvas Wrapper

```typescript
'use client';

import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Preload, PerspectiveCamera } from '@react-three/drei';
import { FloatingObject } from './FloatingObject';
import type { SceneConfig } from '@/types';

const DEFAULT_CONFIG: SceneConfig = {
  camera: { position: [0, 0, 5], fov: 45, near: 0.1, far: 100 },
  dpr: [1, 2],
  shadows: false,
  gl: {
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  },
};

interface SceneProps {
  config?: Partial<SceneConfig>;
}

export default function Scene({ config = {} }: SceneProps) {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  return (
    <Canvas
      dpr={mergedConfig.dpr}
      gl={mergedConfig.gl}
      shadows={mergedConfig.shadows}
      // 'demand' only re-renders when something changes — saves GPU for static scenes
      frameloop="always"
      className="h-full w-full"
      aria-hidden="true" // 3D canvas is decorative; screen readers skip it
    >
      <PerspectiveCamera
        makeDefault
        position={mergedConfig.camera.position}
        fov={mergedConfig.camera.fov}
        near={mergedConfig.camera.near}
        far={mergedConfig.camera.far}
      />

      <Suspense fallback={null}>
        {/* Ambient + directional lighting via HDR environment */}
        <Environment preset="city" />

        {/* Your scene objects */}
        <FloatingObject />

        {/* Preload all assets declared via useGLTF.preload / useTexture.preload */}
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
```

## components/3d/FloatingObject.tsx — Example R3F Mesh

```typescript
'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';

interface FloatingObjectProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
  speed?: number;
}

export function FloatingObject({
  position = [0, 0, 0],
  scale = 1,
  color = '#6366f1',
  speed = 0.5,
}: FloatingObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const prefersReduced = useReducedMotion();
  const { size } = useThree();

  // Memoize geometry and material to prevent re-creation on every render
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1, 4), []);
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color,
        roughness: 0.1,
        metalness: 0.8,
        envMapIntensity: 1.5,
      }),
    [color]
  );

  // Cleanup on unmount — critical for memory management
  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  // Responsive scale based on viewport
  const responsiveScale = useMemo(() => {
    const baseScale = scale;
    if (size.width < 768) return baseScale * 0.65;
    if (size.width < 1024) return baseScale * 0.85;
    return baseScale;
  }, [size.width, scale]);

  // Animation loop — skip if prefers-reduced-motion
  useFrame((state, delta) => {
    if (!meshRef.current || prefersReduced) return;
    meshRef.current.rotation.x += delta * speed * 0.3;
    meshRef.current.rotation.y += delta * speed * 0.5;
  });

  return (
    <Float
      speed={prefersReduced ? 0 : 1.5}
      rotationIntensity={prefersReduced ? 0 : 0.5}
      floatIntensity={prefersReduced ? 0 : 1}
    >
      <mesh
        ref={meshRef}
        position={position}
        scale={responsiveScale}
        geometry={geometry}
        material={material}
        castShadow={false}
        receiveShadow={false}
      />
    </Float>
  );
}
```

## components/3d/ModelViewer.tsx — GLTF Model Loader

```typescript
'use client';

import { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';

// Preload outside component — runs once at module load
useGLTF.preload('/models/hero.glb');

interface ModelViewerProps {
  path?: string;
  scale?: number;
  position?: [number, number, number];
  autoRotate?: boolean;
}

export function ModelViewer({
  path = '/models/hero.glb',
  scale = 1,
  position = [0, 0, 0],
  autoRotate = true,
}: ModelViewerProps) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(path);
  const { actions } = useAnimations(animations, group);
  const prefersReduced = useReducedMotion();

  // Play first animation if available
  useEffect(() => {
    if (animations.length > 0 && !prefersReduced) {
      const firstAction = Object.values(actions)[0];
      firstAction?.play();
    }
  }, [actions, animations, prefersReduced]);

  // Cleanup cloned scene on unmount
  useEffect(() => {
    const cloned = scene.clone(true);
    return () => {
      cloned.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    };
  }, [scene]);

  useFrame((_, delta) => {
    if (!group.current || !autoRotate || prefersReduced) return;
    group.current.rotation.y += delta * 0.3;
  });

  return (
    <group ref={group} position={position} scale={scale} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}
```

## components/3d/PostProcessing.tsx — Effects Pipeline

```typescript
'use client';

import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useReducedMotion } from 'framer-motion';

interface PostProcessingProps {
  bloom?: boolean;
  chromatic?: boolean;
  vignette?: boolean;
}

export function PostProcessing({
  bloom = true,
  chromatic = false,
  vignette = true,
}: PostProcessingProps) {
  const prefersReduced = useReducedMotion();

  // Disable expensive post-processing for users who prefer reduced motion
  if (prefersReduced) return null;

  return (
    <EffectComposer multisampling={0}>
      {bloom && (
        <Bloom
          luminanceThreshold={0.9}
          luminanceSmoothing={0.3}
          intensity={0.8}
          blendFunction={BlendFunction.ADD}
        />
      )}
      {chromatic && (
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.002, 0.002]}
        />
      )}
      {vignette && (
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
      )}
    </EffectComposer>
  );
}
```
