'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { useEffect, Suspense } from 'react';
import { m, useTransform } from 'motion/react';

import { usePointerParallax } from '../../../hooks/usePointerParallax';
import { useWebGLSupport } from '../../../hooks/useWebGLSupport';
import { useBeliefsScrollContext } from '../beliefs/BeliefsScrollContext';
import { GhostModel } from './GhostModel';
import { GhostSceneFallback } from './GhostSceneFallback';
import { beliefZIndex } from '../../../config/beliefTokens';

function SceneInvalidator() {
  const { invalidate, gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;
    if (!canvas) return;

    let isVisible = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    observer.observe(canvas);

    const handleUpdate = () => {
      if (!isVisible) return;
      invalidate();
    };

    window.addEventListener('scroll', handleUpdate, { passive: true });
    window.addEventListener('mousemove', handleUpdate, { passive: true });

    invalidate();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleUpdate);
      window.removeEventListener('mousemove', handleUpdate);
    };
  }, [invalidate, gl]);

  return null;
}

export function GhostScene() {
  const { scrollYProgress, isMobile, shouldReduceMotion } =
    useBeliefsScrollContext();
  const supportsWebGL = useWebGLSupport();
  const pointer = usePointerParallax();

  // Strict visibility control:
  // 1. Fade in quickly after entry (0 -> 0.05)
  // 2. Stay visible (0.05 -> 0.9)
  // 3. Fade out before exit (0.9 -> 0.98)
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.9, 0.98],
    [0, 1, 1, 0]
  );

  // TranslateY for entrance/exit (allowed by spec)
  const y = useTransform(
    scrollYProgress,
    [0, 0.05, 0.9, 0.98],
    [20, 0, 0, -20]
  );

  if (!supportsWebGL) {
    return <GhostSceneFallback />;
  }

  return (
    <m.div
      data-testid="beliefs-ghost-scene"
      data-ghost-scene
      style={{ opacity, y, zIndex: beliefZIndex.ghost }}
      className="pointer-events-none absolute inset-0"
    >
      <Canvas
        aria-hidden="true"
        frameloop="demand"
        dpr={isMobile ? [1, 1.2] : [1, 1.5]}
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
        <SceneInvalidator />
        <Suspense fallback={null}>
          <GhostModel
            isMobile={isMobile}
            shouldReduceMotion={shouldReduceMotion}
            scrollYProgress={scrollYProgress}
            pointerX={pointer.x}
            pointerY={pointer.y}
          />
        </Suspense>
      </Canvas>
    </m.div>
  );
}
