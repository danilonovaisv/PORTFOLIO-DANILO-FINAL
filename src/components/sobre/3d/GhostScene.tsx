'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import { useRef, useEffect, Suspense, useState } from 'react';
import { motion } from 'motion/react';
import type { MotionValue } from 'motion/react';
import type { Group } from 'three';
import { Vector3 } from 'three';
import { GhostErrorBoundary } from '@/components/3d/GhostErrorBoundary';
import { useBeliefsScrollContext } from '@/components/sobre/beliefs/BeliefsScrollContext';

const GHOST_GLB_URL = '/site.assets/3d/ghost.glb';

// Preload fora do componente para evitar re-disparos
useGLTF.preload(GHOST_GLB_URL);

const GhostModel = () => {
  const { scrollYProgress: scrollProgress, isMobile = true } =
    useBeliefsScrollContext();
  const { scene } = useGLTF(GHOST_GLB_URL);
  const groupRef = useRef<Group>(null);
  const invalidate = useThree((s) => s.invalidate);
  const pointerTargetRef = useRef(new Vector3(0, 0, 0));
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const unsub = scrollProgress.on('change', () => invalidate());
    return () => unsub();
  }, [scrollProgress, invalidate]);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 0.3;
      const y = (event.clientY / window.innerHeight - 0.5) * -0.22;
      mouseRef.current = { x, y };
      invalidate();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [invalidate, isMobile]);

  const scaleVectorRef = useRef(new Vector3());
  const positionVectorRef = useRef(new Vector3());

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const p = scrollProgress.get();
    const targetScale = isMobile
      ? 0.82 + Math.min(p, 0.12) * 0.85
      : 0.95 + Math.min(p, 0.12) * 0.45;

    scaleVectorRef.current.set(targetScale, targetScale, targetScale);
    groupRef.current.scale.lerp(
      scaleVectorRef.current,
      Math.min(delta * 8, 0.15)
    );

    if (isMobile) {
      const finalBlend = Math.max(0, Math.min(1, (p - 0.82) / 0.14));
      positionVectorRef.current.set(
        -1.2 + finalBlend * 1.2,
        1.45 - finalBlend * 1.45,
        0
      );
    } else {
      pointerTargetRef.current.set(mouseRef.current.x, mouseRef.current.y, 0);
      positionVectorRef.current.set(
        pointerTargetRef.current.x,
        pointerTargetRef.current.y,
        0
      );
    }

    groupRef.current.position.lerp(
      positionVectorRef.current,
      Math.min(delta * 4, 0.08)
    );
    groupRef.current.rotation.y =
      Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
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

export const GhostScene = () => {
  const { scrollYProgress: scrollProgress, isMobile = false } =
    useBeliefsScrollContext();
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsLowPower(window.matchMedia('(max-width: 767px)').matches);
  }, []);

  return (
    <motion.div
      data-testid="ghost-figure"
      className="fixed inset-0 z-30 pointer-events-none"
      aria-hidden="true"
    >
      <GhostErrorBoundary fallback={null}>
        <Canvas
          frameloop="demand"
          dpr={isLowPower ? [1, 1.25] : [1, 2]}
          camera={{ position: [0, 0, 6], fov: 35 }}
          performance={{ min: 0.5, max: 1, debounce: 200 }}
          gl={{
            antialias: !isLowPower,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          role="presentation"
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[4, 4, 4]} intensity={1.2} />
          <Suspense fallback={null}>
            <GhostModel />
          </Suspense>
        </Canvas>
      </GhostErrorBoundary>
    </motion.div>
  );
};
