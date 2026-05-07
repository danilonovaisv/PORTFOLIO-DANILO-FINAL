'use client';

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState, useMemo } from 'react';
import { Group, MathUtils, Mesh, MeshBasicMaterial } from 'three';
import { getAssetUrl } from '@/lib/utils';

const MODEL_PATH = getAssetUrl('site-assets/3d/ghost-v1.glb');

type GhostModelProps = {
  progressRef: React.RefObject<number>;
  reducedMotion: boolean;
};

export function GhostModel({ progressRef, reducedMotion }: GhostModelProps) {
  const group = useRef<Group>(null);
  const { scene } = useGLTF(MODEL_PATH);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    setIsMobile(media.matches);
    const listener = () => setIsMobile(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  // Optimize material for mobile
  const optimizedScene = useMemo(() => {
    const s = scene.clone();
    s.traverse((node) => {
      if (node instanceof Mesh) {
        node.frustumCulled = true;
        if (isMobile && node.material) {
          node.material = new MeshBasicMaterial({ color: '#ffffff' });
        }
      }
    });
    return s;
  }, [scene, isMobile]);

  useFrame((state) => {
    if (!group.current) return;

    const p = progressRef.current ?? 0;
    const t = state.clock.elapsedTime;

    if (!reducedMotion) {
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
      targetX = 0;
      targetY = 0;
      if (p < 0.5) {
        targetX = -1.2;
        targetY = 1.5;
      }
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
      const hoverY = reducedMotion
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
      <primitive object={optimizedScene} />
    </group>
  );
}

if (typeof window !== 'undefined') {
  useGLTF.preload(MODEL_PATH);
}
