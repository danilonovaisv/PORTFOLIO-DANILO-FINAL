'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { m, useMotionValueEvent } from 'framer-motion';
import { beliefMotion, beliefZIndex } from '@/config/beliefTokens';
import { usePointerParallax } from '@/hooks/usePointerParallax';
import { useWebGLSupport } from '@/hooks/useWebGLSupport';
import { useBeliefsScrollContext } from '@/components/sobre/beliefs/BeliefsScrollContext';
import { GhostModel } from './GhostModel';
import { GhostSceneFallback } from './GhostSceneFallback';

function MotionInvalidator({
  scrollYProgress,
  pointerX,
  pointerY,
}: {
  scrollYProgress: ReturnType<
    typeof useBeliefsScrollContext
  >['scrollYProgress'];
  pointerX: ReturnType<typeof usePointerParallax>['x'];
  pointerY: ReturnType<typeof usePointerParallax>['y'];
}) {
  const { invalidate } = useThree();

  useMotionValueEvent(scrollYProgress, 'change', () => invalidate());
  useMotionValueEvent(pointerX, 'change', () => invalidate());
  useMotionValueEvent(pointerY, 'change', () => invalidate());

  useEffect(() => {
    invalidate();
  }, [invalidate]);

  return null;
}

export function GhostScene() {
  const { scrollYProgress, isMobile, shouldReduceMotion } =
    useBeliefsScrollContext();
  const supportsWebGL = useWebGLSupport();
  const pointer = usePointerParallax();

  if (!supportsWebGL) {
    return <GhostSceneFallback />;
  }

  return (
    <m.div
      data-testid="beliefs-ghost-scene"
      data-ghost-scene
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: beliefZIndex.ghost }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: beliefMotion.ghostIntroDuration,
        ease: beliefMotion.ghostEase,
      }}
    >
      <Canvas
        frameloop="demand"
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
        <MotionInvalidator
          scrollYProgress={scrollYProgress}
          pointerX={pointer.x}
          pointerY={pointer.y}
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
