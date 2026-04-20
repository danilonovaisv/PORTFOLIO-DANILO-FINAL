'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import { useRef, useEffect, Suspense } from 'react';
import { motion } from 'motion/react';
import type { MotionValue } from 'motion/react';
import type { Group } from 'three';

const GHOST_GLB_URL =
  'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/3d/ghost-v1.glb';

// Preload fora do componente para evitar re-disparos
useGLTF.preload(GHOST_GLB_URL);

interface GhostModelProps {
  scrollProgress: MotionValue<number>;
  isMobile?: boolean;
}

const GhostModel = ({ scrollProgress, isMobile = false }: GhostModelProps) => {
  const { scene } = useGLTF(GHOST_GLB_URL);
  const groupRef = useRef<Group>(null);
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    const unsub = scrollProgress.on('change', () => invalidate());
    return () => unsub();
  }, [scrollProgress, invalidate]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const p = scrollProgress.get();
    const targetScale = isMobile
      ? 0.9 + Math.min(p, 0.1) * 1.0
      : 0.95 + Math.min(p, 0.1) * 0.5;

    groupRef.current.scale.lerp(
      { x: targetScale, y: targetScale, z: targetScale } as never,
      Math.min(delta * 8, 0.15)
    );

    if (isMobile) {
      const targetX = p > 0.85 ? 0 : -1.2;
      const targetY = p > 0.85 ? 0 : 1.5;
      groupRef.current.position.x +=
        (targetX - groupRef.current.position.x) * 0.08;
      groupRef.current.position.y +=
        (targetY - groupRef.current.position.y) * 0.08;
    }

    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
    groupRef.current.position.y +=
      Math.sin(state.clock.elapsedTime * 0.6) * 0.0008;
  });

  return (
    <Center>
      <group ref={groupRef}>
        <primitive object={scene} />
      </group>
    </Center>
  );
};

interface GhostSceneProps {
  scrollProgress: MotionValue<number>;
  isMobile?: boolean;
}

/**
 * GhostScene — Canvas R3F isolado.
 * z-30 (NÃO z-50). O manifesto em z-50 precisa ficar acima.
 */
export const GhostScene = ({
  scrollProgress,
  isMobile = false,
}: GhostSceneProps) => {
  return (
    <motion.div
      data-testid="ghost-figure"
      className="fixed inset-0 z-30 pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        frameloop="demand"
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 35 }}
        performance={{ min: 0.5, max: 1, debounce: 200 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        role="presentation"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 4, 4]} intensity={1.2} />
        <Suspense fallback={null}>
          <GhostModel scrollProgress={scrollProgress} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </motion.div>
  );
};
