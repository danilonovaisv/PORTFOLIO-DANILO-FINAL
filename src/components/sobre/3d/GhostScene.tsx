'use client';

import { Canvas } from '@react-three/fiber';
import { motion, useTransform } from 'motion/react';
import { useBeliefsScrollContext } from '@/components/sobre/beliefs/BeliefsScrollProvider';
import { GhostModel } from './GhostModel';
import { GhostSceneFallback } from './GhostSceneFallback';

export function GhostScene() {
  const { scrollYProgress, prefersReducedMotion } = useBeliefsScrollContext();

  const opacity = useTransform(scrollYProgress, [0.12, 0.24, 0.9], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0.12, 0.72], [18, 0]);

  return (
    <motion.div
      data-testid="beliefs-ghost-scene"
      data-ghost-scene
      className="pointer-events-none fixed inset-0 z-[var(--z-layer-lightbox)]"
      style={{ opacity, y: prefersReducedMotion ? 0 : y }}
    >
      <Canvas
        frameloop="demand"
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 35 }}
        fallback={<GhostSceneFallback />}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 4, 4]} intensity={1.4} />
        <GhostModel
          scrollProgress={scrollYProgress}
          reducedMotion={prefersReducedMotion}
        />
      </Canvas>
    </motion.div>
  );
}
