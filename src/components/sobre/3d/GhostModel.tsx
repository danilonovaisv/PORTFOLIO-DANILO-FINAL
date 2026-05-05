'use client';

import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Group, MathUtils } from 'three';
import { getAssetUrl } from '@/lib/utils';
import { useBeliefsScrollContext } from '../beliefs/BeliefsScrollContext';

const MODEL_PATH = getAssetUrl('site-assets/3d/ghost-v1.glb');

export function GhostModel() {
  const group = useRef<Group>(null);
  const { scrollYProgress, isMobile, shouldReduceMotion } =
    useBeliefsScrollContext();
  const { invalidate } = useThree();
  const { scene } = useGLTF(MODEL_PATH);

  useEffect(() => {
    invalidate();
  }, [scene, invalidate]);

  useEffect(() => {
    return scrollYProgress.on('change', () => invalidate());
  }, [scrollYProgress, invalidate]);

  useFrame((state) => {
    if (!group.current) return;

    const t = state.clock.elapsedTime;
    const p = scrollYProgress.get();

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

    let targetX = 0;
    let targetY = 0;

    if (isMobile) {
      targetX = -1.2;
      targetY = 1.5;
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
      const hoverY = shouldReduceMotion
        ? 0
        : Math.sin(t * (0.6 + p * 0.6)) * (0.036 + p * 0.03);
      group.current.position.y = MathUtils.lerp(
        group.current.position.y,
        targetY + hoverY,
        0.1
      );
    }
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
