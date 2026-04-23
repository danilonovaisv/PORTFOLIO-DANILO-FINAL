'use client';

/**
 * GhostScene — Canvas R3F da Seção 06 "O Que Me Move".
 *
 * Ajuste 2026-04-22:
 * • scroll-first motion inspirado na física do Drinksom
 * • smoothProgress via useSpring(MOTION_TOKENS.spring.scrollScrub)
 * • Ghost acima do manifesto no clímax (z-70 > z-50)
 * • cursor mantido apenas como parallax secundário no desktop
 * • ghostIntensity sincroniza a intensidade interna do modelo com o scroll
 * • reduced motion desativa float procedural e influência do cursor
 */

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Center, useGLTF } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import type { MotionValue } from 'motion/react';
import type { BufferGeometry, Group, Material, Object3D } from 'three';

import { GhostErrorBoundary } from '@/components/sobre/3d/GhostErrorBoundary';
import {
  GHOST_EASE_INOUT_SINE,
  MOTION_TOKENS,
} from '@/config/motion';
import { getAssetUrl } from '@/lib/utils';
import { ghostIntensity, cursorX, cursorY } from '@/store/beliefStore';

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

const getGhostPhase = (progress: number) => {
  if (progress < 0.12) return 'intro' as const;
  if (progress < 0.72) return 'narrative' as const;
  if (progress < 0.85) return 'pre-climax' as const;
  return 'climax' as const;
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
    const unsubIntensity = ghostIntensity.on('change', () => invalidate());
    const unsubX = cursorX.on('change', () => invalidate());
    const unsubY = cursorY.on('change', () => invalidate());

    return () => {
      unsubScroll();
      unsubIntensity();
      unsubX();
      unsubY();
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
    const intensity = ghostIntensity.get();
    const phase = getGhostPhase(progress);
    const lerpFactor = Math.min(delta * 8, 0.15);

    const cursorWeight = prefersReducedMotion
      ? 0
      : interpolateProgress(progress, [0, 0.7, 0.85, 1], [0.22, 0.22, 0.08, 0]);
    const cursorOffsetX = Number.isFinite(cursorX.get())
      ? cursorX.get() * 0.12 * cursorWeight
      : 0;
    const cursorOffsetY = Number.isFinite(cursorY.get())
      ? cursorY.get() * 0.08 * cursorWeight
      : 0;

    const targetScale = prefersReducedMotion
      ? isMobile
        ? ({
            intro: 0.88,
            narrative: 0.92,
            'pre-climax': 0.97,
            climax: 1,
          } as const)[phase]
        : ({
            intro: 0.96,
            narrative: 0.99,
            'pre-climax': 1.03,
            climax: 1.06,
          } as const)[phase]
      : isMobile
        ? interpolateProgress(progress, [0, 0.85, 1], [0.88, 0.96, 1])
        : interpolateProgress(progress, [0, 0.08, 0.85, 1], [0.96, 1, 1.03, 1.06]);

    const scrollTargetX = prefersReducedMotion
      ? isMobile
        ? ({
            intro: -1.2,
            narrative: -1,
            'pre-climax': -0.25,
            climax: 0,
          } as const)[phase]
        : 0
      : isMobile
        ? interpolateProgress(progress, [0, 0.6, 0.85, 1], [-1.2, -1, -0.25, 0])
        : 0;

    const scrollTargetY = prefersReducedMotion
      ? isMobile
        ? ({
            intro: 1.5,
            narrative: 1.35,
            'pre-climax': 0.35,
            climax: 0,
          } as const)[phase]
        : ({
            intro: 0.08,
            narrative: 0.02,
            'pre-climax': -0.04,
            climax: 0,
          } as const)[phase]
      : isMobile
        ? interpolateProgress(progress, [0, 0.6, 0.85, 1], [1.5, 1.35, 0.35, 0])
        : interpolateProgress(progress, [0, 0.6, 0.85, 1], [0.1, 0.02, -0.06, 0]);

    const floatAmplitude = prefersReducedMotion
      ? 0
      : interpolateProgress(intensity, [0, 1], [0.018, 0.04]);
    const floatSpeed = prefersReducedMotion
      ? 0
      : interpolateProgress(intensity, [0, 1], [0.55, 0.9]);
    const floatY =
      prefersReducedMotion || floatAmplitude === 0
        ? 0
        : Math.sin(state.clock.elapsedTime * floatSpeed) * floatAmplitude;

    const scrollRotationY = prefersReducedMotion
      ? ({
          intro: -0.08,
          narrative: 0.04,
          'pre-climax': 0.1,
          climax: 0,
        } as const)[phase]
      : interpolateProgress(progress, [0, 0.35, 0.75, 1], [-0.14, 0.02, 0.14, 0]);
    const scrollRotationX = prefersReducedMotion
      ? ({
          intro: 0.06,
          narrative: 0.04,
          'pre-climax': 0.02,
          climax: 0,
        } as const)[phase]
      : interpolateProgress(progress, [0, 0.75, 1], [0.08, 0.03, 0]);

    const proceduralYaw = prefersReducedMotion
      ? 0
      : Math.sin(state.clock.elapsedTime * (0.45 + intensity * 0.3)) *
        (0.008 + intensity * 0.012);
    const proceduralPitch = prefersReducedMotion
      ? 0
      : Math.cos(state.clock.elapsedTime * (0.32 + intensity * 0.2)) *
        (0.004 + intensity * 0.006);

    const targetX = scrollTargetX + (isMobile ? 0 : cursorOffsetX);
    const targetY = scrollTargetY + (isMobile ? 0 : cursorOffsetY) + floatY;

    groupRef.current.scale.x += (targetScale - groupRef.current.scale.x) * lerpFactor;
    groupRef.current.scale.y += (targetScale - groupRef.current.scale.y) * lerpFactor;
    groupRef.current.scale.z += (targetScale - groupRef.current.scale.z) * lerpFactor;

    groupRef.current.position.x += (targetX - groupRef.current.position.x) * lerpFactor;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * lerpFactor;
    groupRef.current.rotation.y +=
      (scrollRotationY + proceduralYaw - groupRef.current.rotation.y) * lerpFactor;
    groupRef.current.rotation.x +=
      (scrollRotationX + proceduralPitch - groupRef.current.rotation.x) * lerpFactor;
    groupRef.current.rotation.z += (0 - groupRef.current.rotation.z) * lerpFactor;
  });

  return (
    <Center>
      <group ref={groupRef}>
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
    [0, 0.05, 0.95, 1],
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    smoothProgress,
    [0, 0.08, 0.85, 1],
    [0.96, 1, 1.03, 1.02]
  );
  const intensity = useTransform(
    smoothProgress,
    [0, 0.15, 0.8, 1],
    [0, 0.35, 0.75, 1]
  );

  useEffect(() => {
    const unsubscribe = intensity.on('change', (value) => {
      ghostIntensity.set(value);
    });

    return () => {
      unsubscribe();
      ghostIntensity.set(0);
    };
  }, [intensity]);

  return (
    <motion.div
      data-testid="beliefs-ghost-scene"
      className="sticky md:top-0 top-[20vh] h-[100dvh] w-full z-[70] pointer-events-none"
      aria-hidden="true"
      role="presentation"
      style={{ opacity, scale }}
      transition={{ duration: 0.2, ease: GHOST_EASE_INOUT_SINE }}
    >
      <GhostErrorBoundary>
        <Canvas
          frameloop="demand"
          dpr={[1, resolvedIsMobile ? 1 : 2]}
          camera={{ position: [0, 0, resolvedIsMobile ? 7 : 6], fov: 35 }}
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
