'use client';

import { useGLTF, useMask } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState, useMemo } from 'react';
import { Group, MathUtils, Mesh } from 'three';
import { getAssetUrl } from '@/lib/utils';

const MODEL_PATH = getAssetUrl('site-assets/3d/ghost-v1.glb');

interface GhostModelProps {
  progressRef: React.RefObject<number>;
  reducedMotion: boolean;
}

export function GhostModel({
  progressRef,
  reducedMotion,
}: GhostModelProps) {
  const group = useRef<Group>(null);
  const { scene } = useGLTF(MODEL_PATH);
  const [isMobile, setIsMobile] = useState(false);

  // Stencil mask — model only renders inside mask portal
  const stencil = useMask(1);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    setIsMobile(media.matches);
    const listener = () => setIsMobile(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  // Clone scene and apply stencil material properties
  const optimizedScene = useMemo(() => {
    const s = scene.clone();
    s.traverse((node) => {
      if (node instanceof Mesh) {
        node.frustumCulled = true;
        // Apply stencil read so model only shows through the mask
        if (node.material) {
          node.material = node.material.clone();
          Object.assign(node.material, stencil);
          // Ghost tint
          if ('color' in node.material) {
            node.material.color.setHex(0xffffff);
          }
          if ('roughness' in node.material) {
            node.material.roughness = 0.15;
          }
          if ('metalness' in node.material) {
            node.material.metalness = 0.7;
          }
        }
      }
    });
    return s;
  }, [scene, stencil]);

  useFrame((state) => {
    if (!group.current) return;

    const p = progressRef.current ?? 0;
    const t = state.clock.elapsedTime;

    // Floating animation (Ghost ethereal motion)
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

    // Position logic
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

    // Invalidate to trigger re-render (frameloop="demand")
    state.invalidate();
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
