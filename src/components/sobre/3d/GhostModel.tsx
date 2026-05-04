'use client';

import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Group, MathUtils } from 'three';
import { getAssetUrl } from '@/lib/utils';
import { useBeliefsScrollContext } from '../beliefs/BeliefsScrollContext';
import { usePointerParallax } from '@/hooks/usePointerParallax';

const MODEL_PATH = getAssetUrl('site-assets/3d/ghost-v1.glb');

export function GhostModel() {
  const group = useRef<Group>(null);
  const { scrollYProgress, isMobile, shouldReduceMotion } =
    useBeliefsScrollContext();
  const { x: pointerX, y: pointerY } = usePointerParallax();
  const { invalidate } = useThree();
  const { scene } = useGLTF(MODEL_PATH);

  // Trigger re-render explicitly when scroll progress updates,
  // since Canvas uses frameloop="demand".
  useEffect(() => {
    return scrollYProgress.on('change', () => invalidate());
  }, [scrollYProgress, invalidate]);

  useEffect(() => {
    return pointerX.on('change', () => invalidate());
  }, [pointerX, invalidate]);

  useFrame((state) => {
    if (!group.current) return;

    const t = state.clock.elapsedTime;
    const p = scrollYProgress.get();

    // Hover effect
    if (!shouldReduceMotion) {
      const floatSpeed = 0.6 + p * 0.6;
      const floatAmplitude = 0.036 + p * 0.03;
      group.current.position.y = MathUtils.lerp(
        group.current.position.y,
        Math.sin(t * floatSpeed) * floatAmplitude,
        0.1
      );

      group.current.rotation.y = MathUtils.lerp(
        group.current.rotation.y,
        Math.sin(t * (0.4 + p * 0.4)) * (0.06 + p * 0.04),
        0.1
      );
    }

    // Positions logic based on viewport and scroll climax
    let targetX = 0;
    let targetY = 0;

    if (isMobile) {
      targetX = -1.2;
      targetY = 1.5;
    } else {
      targetX = shouldReduceMotion ? 0 : pointerX.get() * 0.4;
      targetY = shouldReduceMotion ? 0 : pointerY.get() * 0.4;
    }

    if (p > 0.85) {
      targetX = 0;
      targetY = 0;
    }

    group.current.position.x = MathUtils.lerp(
      group.current.position.x,
      targetX,
      0.1
    );

    if (isMobile) {
      group.current.position.y = MathUtils.lerp(
        group.current.position.y,
        targetY +
          (shouldReduceMotion
            ? 0
            : Math.sin(t * (0.6 + p * 0.6)) * (0.036 + p * 0.03)),
        0.1
      );
    } else {
      const hoverY = shouldReduceMotion
        ? 0
        : Math.sin(t * (0.6 + p * 0.6)) * (0.036 + p * 0.03);
      group.current.position.y = MathUtils.lerp(
        group.current.position.y,
        targetY + hoverY,
        0.1
      );
    }

    // Invalidate if things are still moving
    invalidate();
  });

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

if (typeof window !== 'undefined') {
  useGLTF.preload(MODEL_PATH);
}
