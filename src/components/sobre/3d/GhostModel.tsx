'use client';

import { useRef } from 'react';
import { Float, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useMotionValueEvent } from 'motion/react';
import * as THREE from 'three';
import { ghostIntensity } from '@/store/beliefStore';
import type { MotionValue } from 'framer-motion';

const GLB_URL =
  'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/3d/ghost-v1.glb';

export interface GhostModelProps {
  intensity?: MotionValue<number>;
  scale?: number;
  position?: [number, number, number];
}

export function GhostModel({
  intensity,
  scale = 1,
  position = [0, 0, 0],
}: GhostModelProps = {}) {
  const { scene } = useGLTF(GLB_URL);
  const groupRef = useRef<THREE.Group>(null);
  const { viewport, pointer } = useThree();
  const intensityRef = useRef(0);

  const isMobile = viewport.width < 7.68;

  useMotionValueEvent(intensity ?? ghostIntensity, 'change', (value) => {
    intensityRef.current = value;
  });

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const t = state.clock.elapsedTime;
    const intensity = intensityRef.current;
    const floatY = Math.sin(t * 0.8) * 0.15;
    const floatX = Math.cos(t * 0.4) * 0.08;

    if (isMobile) {
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        floatY + intensity * 0.3,
        delta * 2
      );
    } else {
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        pointer.x * 0.4 + floatX,
        delta * 3
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        pointer.y * 0.2 + floatY,
        delta * 3
      );
    }

    const targetScale = 0.95 + intensity * 0.1;
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, delta * 2)
    );
  });

  return (
    <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={groupRef}>
        <primitive object={scene} scale={scale} position={position} />
      </group>
    </Float>
  );
}

useGLTF.preload(GLB_URL);

export default GhostModel;
