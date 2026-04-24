'use client';

/**
 * GhostScene — Canvas R3F da Seção 06 "O Que Me Move".
 *
 * Ajuste 2026-04-23:
 * • wrapper segue somente opacity + translateY
 * • modelo 3D abandona scale/rotate procedural e cursor parallax
 * • movimento fica essencialmente vertical e scroll-linked
 * • Ghost continua acima do manifesto via token local da seção
 */

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Center, useGLTF } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import type { MotionValue } from 'motion/react';
import type { BufferGeometry, Group, Material, Object3D } from 'three';

import { GhostErrorBoundary } from '@/components/sobre/3d/GhostErrorBoundary';
import { MOTION_TOKENS } from '@/config/motion';
import { getAssetUrl } from '@/lib/utils';

const GHOST_GLB_URL = getAssetUrl('site-assets/3d/ghost-v1.glb', {
  isVideo: true,
});

useGLTF.preload(GHOST_GLB_URL);

interface GhostModelProps {
  scrollProgress: MotionValue<number>;
  isMobile: boolean;
  prefersReducedMotion: boolean;
}

const interpolateProgress = (
  value: number,
  input: readonly number[],
  output: readonly number[]
) => {
  if (input.length !== output.length || input.length === 0) return 0;
  if (value <= input[0]) return output[0];

  for (let index = 1; index < input.length; index += 1) {
    const start = input[index - 1];
    const end = input[index];

    if (value <= end) {
      const progress = (value - start) / (end - start || 1);
      const from = output[index - 1];
      const to = output[index];
      return from + (to - from) * progress;
    }
  }

  return output[output.length - 1];
};

const GhostModel = ({
  scrollProgress,
  isMobile,
  prefersReducedMotion,
}: GhostModelProps) => {
  const { scene } = useGLTF(GHOST_GLB_URL);
  const groupRef = useRef<Group>(null);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    const unsubScroll = scrollProgress.on('change', () => invalidate());

    return () => {
      unsubScroll();
    };
  }, [invalidate, scrollProgress]);

  useEffect(() => {
    return () => {
      scene.traverse((obj: Object3D) => {
        const mesh = obj as Object3D & {
          geometry?: BufferGeometry;
          material?: Material | Material[];
        };
        mesh.geometry?.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material) => material.dispose());
        } else {
          mesh.material?.dispose();
        }
      });
    };
  }, [scene]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const progress = scrollProgress.get();
    const lerpFactor = Math.min(delta * 7, 0.12);
    const drift = prefersReducedMotion
      ? 0
      : Math.sin(state.clock.elapsedTime * 0.65) * 0.02;
    const targetY = isMobile
      ? interpolateProgress(progress, [0, 0.75, 1], [0.34, 0.08, -0.06])
      : interpolateProgress(
          progress,
          [0, 0.2, 0.82, 1],
          [0.14, 0.02, -0.08, -0.16]
        );

    groupRef.current.position.y +=
      (targetY + drift - groupRef.current.position.y) * lerpFactor;
  });

  return (
    <Center>
      <group
        ref={groupRef}
        position={[0, isMobile ? 0.34 : 0.14, 0]}
        rotation={[0.03, isMobile ? -0.04 : -0.06, 0]}
        scale={isMobile ? 0.78 : 0.68}
      >
        <primitive object={scene} dispose={null} />
      </group>
    </Center>
  );
};

interface GhostSceneProps {
  scrollProgress: MotionValue<number>;
  isMobile?: boolean;
  prefersReducedMotion?: boolean;
}

export const GhostScene = ({
  scrollProgress,
  isMobile,
  prefersReducedMotion,
}: GhostSceneProps) => {
  const resolvedIsMobile = isMobile ?? false;
  const resolvedPrefersReducedMotion = prefersReducedMotion ?? false;
  const smoothProgress = useSpring(
    scrollProgress,
    MOTION_TOKENS.spring.scrollScrub
  );
  const opacity = useTransform(
    smoothProgress,
    [0, 0.06, 0.98, 1],
    [0, 1, 1, 0]
  );
  const y = useTransform(smoothProgress, [0, 0.08, 0.98, 1], [18, 0, 0, -18]);

  return (
    <motion.div
      data-testid="beliefs-ghost-scene"
      className="fixed inset-0 h-full w-full z-[var(--z-layer-lightbox)] pointer-events-none"
      aria-hidden="true"
      role="presentation"
      style={{ opacity, y }}
    >
      <GhostErrorBoundary>
        <Canvas
          frameloop="demand"
          dpr={[1, resolvedIsMobile ? 1 : 2]}
          camera={{
            position: [0, 0, resolvedIsMobile ? 6.8 : 6],
            fov: resolvedIsMobile ? 38 : 35,
          }}
          performance={{ min: 0.5, max: 1, debounce: 200 }}
          gl={{
            antialias: !resolvedIsMobile,
            alpha: true,
            powerPreference: 'high-performance',
          }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[4, 4, 4]} intensity={1.2} />
          <pointLight position={[0, 2, 3]} color="#4fe6ff" intensity={0.4} />
          <Suspense fallback={null}>
            <GhostModel
              scrollProgress={smoothProgress}
              isMobile={resolvedIsMobile}
              prefersReducedMotion={resolvedPrefersReducedMotion}
            />
          </Suspense>
        </Canvas>
      </GhostErrorBoundary>
    </motion.div>
  );
};
