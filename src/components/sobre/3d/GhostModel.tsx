'use client';

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import type { MotionValue } from 'framer-motion';
import { Group, MathUtils, Mesh, MeshStandardMaterial, Object3D } from 'three';
import { getAssetUrl } from '@/lib/utils';
import { GHOST_MATERIAL_CONFIG } from '../beliefs/belief.constants';

const MODEL_PATH = getAssetUrl('site-assets/3d/ghost-v1.glb');

type GhostModelProps = {
  isMobile: boolean;
  shouldReduceMotion: boolean;
  scrollYProgress: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
};

function disposeScene(root: Object3D) {
  root.traverse((node) => {
    if (node instanceof Mesh) {
      node.geometry?.dispose();

      const material = node.material;
      if (Array.isArray(material)) {
        material.forEach((item) => item.dispose());
      } else {
        material?.dispose();
      }
    }
  });
}

export function GhostModel({
  isMobile,
  shouldReduceMotion,
  scrollYProgress,
  pointerX,
  pointerY,
}: GhostModelProps) {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF(MODEL_PATH);

  const ghostScene = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((node) => {
      if (!(node instanceof Mesh)) return;

      node.castShadow = false;
      node.receiveShadow = false;
      node.frustumCulled = true;

      const baseMaterial = Array.isArray(node.material)
        ? node.material[0]
        : node.material;

      if (!(baseMaterial instanceof MeshStandardMaterial)) return;

      const material = baseMaterial.clone();
      const name = node.name.toLowerCase();

      if (name.includes('hat') || name.includes('tophat')) {
        material.color.set(GHOST_MATERIAL_CONFIG.hat.color);
        material.roughness = GHOST_MATERIAL_CONFIG.hat.roughness;
      } else if (name.includes('rim') || name.includes('ring')) {
        material.color.set(GHOST_MATERIAL_CONFIG.rim.color);
        material.emissive.set(GHOST_MATERIAL_CONFIG.rim.emissive);
        material.emissiveIntensity =
          GHOST_MATERIAL_CONFIG.rim.emissiveIntensity;
      } else {
        material.color.set(GHOST_MATERIAL_CONFIG.body.color);
        material.emissive.set(GHOST_MATERIAL_CONFIG.body.emissive);
        material.emissiveIntensity =
          GHOST_MATERIAL_CONFIG.body.emissiveIntensity;
        material.roughness = GHOST_MATERIAL_CONFIG.body.roughness;
        material.metalness = GHOST_MATERIAL_CONFIG.body.metalness;
      }

      node.material = material;
    });

    return clone;
  }, [scene]);

  useEffect(() => {
    return () => {
      disposeScene(ghostScene);
    };
  }, [ghostScene]);

  useFrame((state) => {
    if (!groupRef.current) return;

    const progress = scrollYProgress.get();
    const climax = progress > 0.85;
    const floatSpeed = 0.6 + progress * 0.6;
    const floatAmplitude = shouldReduceMotion ? 0 : 0.018 + progress * 0.015;
    const floatY = shouldReduceMotion
      ? 0
      : Math.sin(state.clock.elapsedTime * floatSpeed) * floatAmplitude;
    const rotationY = shouldReduceMotion
      ? 0
      : Math.sin(state.clock.elapsedTime * (0.4 + progress * 0.4)) *
        (0.028 + progress * 0.025);

    const targetX = isMobile
      ? climax
        ? 0
        : -0.88
      : shouldReduceMotion
        ? 0.02
        : 0.02 + pointerX.get() * 0.12;
    const targetY = isMobile
      ? climax
        ? 0.02
        : 0.54
      : shouldReduceMotion
        ? 0.12
        : 0.12 + pointerY.get() * 0.08;
    const baseScale = isMobile ? 0.3 : 0.58;
    const targetScale = baseScale * (climax ? 1.08 : 1);
    const lerpAlpha = 0.15;

    groupRef.current.position.x = MathUtils.lerp(
      groupRef.current.position.x,
      targetX,
      lerpAlpha
    );
    groupRef.current.position.y = MathUtils.lerp(
      groupRef.current.position.y,
      targetY + floatY,
      lerpAlpha
    );
    groupRef.current.rotation.y = MathUtils.lerp(
      groupRef.current.rotation.y,
      rotationY,
      lerpAlpha
    );
    groupRef.current.rotation.x = MathUtils.lerp(
      groupRef.current.rotation.x,
      isMobile ? -0.06 : -0.03,
      0.08
    );
    groupRef.current.scale.x = MathUtils.lerp(
      groupRef.current.scale.x,
      targetScale,
      lerpAlpha
    );
    groupRef.current.scale.y = MathUtils.lerp(
      groupRef.current.scale.y,
      targetScale,
      lerpAlpha
    );
    groupRef.current.scale.z = MathUtils.lerp(
      groupRef.current.scale.z,
      targetScale,
      lerpAlpha
    );
  });

  return <primitive ref={groupRef} object={ghostScene} />;
}

if (typeof window !== 'undefined') {
  useGLTF.preload(MODEL_PATH);
}
