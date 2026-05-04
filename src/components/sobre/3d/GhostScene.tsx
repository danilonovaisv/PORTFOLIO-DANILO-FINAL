'use client';

import { Canvas } from '@react-three/fiber';
import { motion, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { GhostModel } from './GhostModel';
import { GhostSceneFallback } from './GhostSceneFallback';
import { useBeliefsScrollContext } from '../beliefs/BeliefsScrollContext';
import { Z_INDEX } from '@/config/z-indices';

function detectWebGLSupport() {
  const canvas = document.createElement('canvas');
  return Boolean(
    canvas.getContext('webgl2') ||
    canvas.getContext('webgl') ||
    canvas.getContext('experimental-webgl')
  );
}

export function GhostScene() {
  const { scrollYProgress, isMobile, shouldReduceMotion } =
    useBeliefsScrollContext();
  const [canRenderWebGL, setCanRenderWebGL] = useState<boolean | null>(null);

  const opacity = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.85, 0.95],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.85, 0.95],
    [0.95, 1, 1.1, 1]
  );

  useEffect(() => {
    setCanRenderWebGL(detectWebGLSupport());
  }, []);

  if (!canRenderWebGL) {
    return <GhostSceneFallback />;
  }

  return (
    <motion.div
      data-testid="beliefs-ghost-scene"
      aria-hidden="true"
      style={{
        opacity,
        scale: shouldReduceMotion ? 1 : scale,
        zIndex: Z_INDEX.beliefs.ghost,
      }}
      className="pointer-events-none fixed inset-0"
    >
      <Canvas
        frameloop="demand"
        dpr={[1, isMobile ? 1 : 2]}
        camera={{
          position: [0, 0, isMobile ? 7 : 6],
          fov: 35,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <GhostModel />
      </Canvas>
    </motion.div>
  );
}
