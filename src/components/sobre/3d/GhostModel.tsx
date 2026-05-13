import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import { Group, MathUtils, Mesh, MeshStandardMaterial, Object3D } from 'three';
import { getAssetUrl } from '../../../lib/utils';
import { GHOST_MATERIAL_CONFIG } from '../beliefs/belief.constants';

const MODEL_PATH = getAssetUrl('site-assets/3d/ghost-v1.glb');

type GhostModelProps = {
  isMobile: boolean;
  shouldReduceMotion: boolean;
  scrollYProgress: { get: () => number };
  pointerX: { get: () => number };
  pointerY: { get: () => number };
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

    clone.traverse((node: Object3D) => {
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
    const isClimax = progress > 0.85;
    
    // Smooth scale boost as progress approaches climax
    const scaleBoost = progress > 0.8 ? MathUtils.mapLinear(progress, 0.8, 1, 1, 1.15) : 1;
    
    // Animation constants for wow factor
    const floatFreq = isClimax ? 1.8 : 1.2;
    const floatAmp = isClimax ? 0.12 : 0.18;
    const floating = Math.sin(state.clock.elapsedTime * floatFreq) * floatAmp;
    
    const rotSpeed = 0.6;
    const rotBoost = progress > 0.8 ? MathUtils.mapLinear(progress, 0.8, 1, 1, 2) : 1;
    const rotationY = shouldReduceMotion 
      ? 0 
      : Math.sin(state.clock.elapsedTime * rotSpeed * rotBoost) * (0.05 + progress * 0.05);

    // Dynamic positioning
    const targetX = isMobile
      ? isClimax ? 0 : -0.85
      : shouldReduceMotion ? 0.05 : 0.05 + pointerX.get() * 0.42;
      
    const targetY = isMobile
      ? isClimax ? 0.05 : 0.48
      : shouldReduceMotion ? 0.15 : 0.15 + pointerY.get() * 0.35;
      
    const baseScale = isMobile ? 0.75 : 1.15;
    const targetScale = baseScale * scaleBoost;
    const lerpAlpha = 0.12;

    groupRef.current.position.x = MathUtils.lerp(
      groupRef.current.position.x,
      targetX,
      lerpAlpha
    );
    groupRef.current.position.y = MathUtils.lerp(
      groupRef.current.position.y,
      targetY + floating,
      lerpAlpha
    );
    groupRef.current.rotation.y = MathUtils.lerp(
      groupRef.current.rotation.y,
      rotationY,
      lerpAlpha
    );
    groupRef.current.rotation.x = MathUtils.lerp(
      groupRef.current.rotation.x,
      isMobile ? -0.05 : -0.02,
      0.08
    );
    groupRef.current.scale.setScalar(
      MathUtils.lerp(groupRef.current.scale.x, targetScale, lerpAlpha)
    );
  });

  return <primitive ref={groupRef} object={ghostScene} />;
}

if (typeof window !== 'undefined') {
  useGLTF.preload(MODEL_PATH);
}
