'use client';

import { Canvas } from '@react-three/fiber';
import { m } from 'framer-motion';
import { beliefMotion, beliefZIndex } from '@/config/beliefTokens';
import { usePointerParallax } from '@/hooks/usePointerParallax';
import { useWebGLSupport } from '@/hooks/useWebGLSupport';
import { useBeliefsScrollContext } from '@/components/sobre/beliefs/BeliefsScrollContext';
import { GhostModel } from './GhostModel';
import { GhostSceneFallback } from './GhostSceneFallback';

export function GhostScene() {
  const { scrollYProgress, isMobile, shouldReduceMotion } =
    useBeliefsScrollContext();
  const supportsWebGL = useWebGLSupport();
  const pointer = usePointerParallax();

  const isOnline = typeof window !== 'undefined' ? window.navigator.onLine : true;

  if (!supportsWebGL || !isOnline) {
    return <GhostSceneFallback />;
  }

  return (
    <m.div
      data-testid="beliefs-ghost-scene"
      data-ghost-scene
      className="pointer-events-none col-span-full row-start-1 col-start-1 relative h-full w-full"
      style={{ zIndex: beliefZIndex.ghost }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: beliefMotion.ghostIntroDuration,
        ease: beliefMotion.ghostEase,
      }}
    >
      <Canvas
        frameloop="always"
        dpr={[1, isMobile ? 1 : 2]}
        camera={{ position: isMobile ? [0, 0, 7.4] : [0, 0, 6.9], fov: 35 }}
      >
        <ambientLight intensity={0.9} color="#ffffff" />
        <directionalLight
          position={[2.4, 3.2, 5]}
          intensity={1.35}
          color="#ffffff"
        />
        <pointLight position={[-3, 1.8, 4]} intensity={0.55} color="#bfe8ff" />
        <pointLight
          position={[2.2, -1.5, 3.8]}
          intensity={0.3}
          color="#ffd8f8"
        />
        <GhostModel
          isMobile={isMobile}
          shouldReduceMotion={shouldReduceMotion}
          scrollYProgress={scrollYProgress}
          pointerX={pointer.x}
          pointerY={pointer.y}
        />
      </Canvas>
    </m.div>
  );
}
