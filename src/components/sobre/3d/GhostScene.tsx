'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import type { MotionValue } from 'motion/react';
import type { BufferGeometry, Group, Material, Object3D } from 'three';
import { useBeliefStore } from '@/store/beliefStore';

const LOCAL_GHOST_GLB_URL = '/site.assets/3d/ghost-v1.glb';
const SUPABASE_GHOST_GLB_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_FALLBACK_URL
    ? `${(
        process.env.NEXT_PUBLIC_SUPABASE_URL ||
        process.env.NEXT_PUBLIC_SUPABASE_FALLBACK_URL ||
        ''
      ).replace(
        /\/$/,
        ''
      )}/storage/v1/object/public/site-assets/3d/ghost-v1.glb`
    : LOCAL_GHOST_GLB_URL;

if (typeof window !== 'undefined') {
  useGLTF.preload(SUPABASE_GHOST_GLB_URL);
}

interface GhostModelProps {
  scrollProgress: MotionValue<number>;
}

function GhostModel({ scrollProgress }: GhostModelProps) {
  const { scene } = useGLTF(SUPABASE_GHOST_GLB_URL);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const meshRef = useRef<Group>(null);
  const invalidate = useThree((state) => state.invalidate);
  const isMobile = useBeliefStore((s) => s.isMobile);
  const prefersReducedMotion = useBeliefStore((s) => s.prefersReducedMotion);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const unsubScroll = scrollProgress.on('change', () => invalidate());

    return () => unsubScroll();
  }, [invalidate, scrollProgress]);

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const handleMove = (e: PointerEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      invalidate();
    };

    window.addEventListener('pointermove', handleMove, { passive: true });

    return () => window.removeEventListener('pointermove', handleMove);
  }, [invalidate, isMobile, prefersReducedMotion]);

  useEffect(() => {
    return () => {
      clonedScene.traverse((obj: Object3D) => {
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
  }, [clonedScene]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const { ghostIntensity } = useBeliefStore.getState();
    const p = ghostIntensity;
    const isClimax = p > 0.85;
    const targetX = isClimax ? 0 : isMobile ? -1.2 : 0;
    const targetY = isClimax ? 0 : isMobile ? 1.5 : 0;
    const lerpFactor = Math.min(delta * 8, 0.15);
    const parallaxX =
      !prefersReducedMotion && !isMobile ? mouseRef.current.x * 0.4 : 0;
    const parallaxY =
      !prefersReducedMotion && !isMobile ? mouseRef.current.y * 0.2 : 0;

    meshRef.current.position.x +=
      (targetX + parallaxX - meshRef.current.position.x) * lerpFactor;
    meshRef.current.position.y +=
      (targetY + parallaxY - meshRef.current.position.y) * lerpFactor;

    if (!prefersReducedMotion) {
      const floatSpeed = 0.6 + p * 0.6;
      const floatAmp = 0.036 + p * 0.03;
      meshRef.current.position.y +=
        Math.sin(state.clock.elapsedTime * floatSpeed) * floatAmp;
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.4 * (0.4 + p * 0.4)) *
        (0.06 + p * 0.04);
    }

    const targetScale = isClimax
      ? isMobile
        ? 1
        : 1.05
      : isMobile
        ? 0.9
        : 0.95;
    meshRef.current.scale.x +=
      (targetScale - meshRef.current.scale.x) * lerpFactor;
    meshRef.current.scale.y = meshRef.current.scale.x;
    meshRef.current.scale.z = meshRef.current.scale.x;
  });

  return <primitive object={clonedScene} ref={meshRef} />;
}

interface GhostSceneProps {
  scrollProgress: MotionValue<number>;
}

export function GhostScene({ scrollProgress }: GhostSceneProps) {
  const isMobile = useBeliefStore((s) => s.isMobile);

  return (
    <div
      className="sticky md:top-0 top-[20vh] h-[100dvh] w-full z-[70] pointer-events-none"
      data-testid="beliefs-ghost-scene"
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, isMobile ? 1 : 2]}
        camera={{ position: [0, 0, isMobile ? 7 : 6], fov: 35 }}
        frameloop="demand"
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <GhostModel scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
