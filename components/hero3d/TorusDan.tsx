'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { MeshTransmissionMaterial, useGLTF } from '@react-three/drei';
import { useFrame, type ThreeElements } from '@react-three/fiber';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

type Props = ThreeElements['group'] & {
  rotationScroll?: number;
};

export default function TorusDan({ rotationScroll = 0, ...props }: Props) {
  const { nodes } = useGLTF('/media/torus_dan.glb') as any;
  const meshRef = useRef<THREE.Mesh>(null!);
  const reduced = usePrefersReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 768px)');
    const handle = () => setIsMobile(mq.matches);
    handle();
    mq.addEventListener?.('change', handle);
    return () => mq.removeEventListener?.('change', handle);
  }, []);

  const materialProps = useMemo(
    () => ({
      thickness: 0.6,
      roughness: 0.05,
      transmission: 1,
      ior: 1.25,
      chromaticAberration: 0.06,
      distortion: 0.52,
      distortionScale: 0.38,
      temporalDistortion: 0.22,
      backside: true,
      samples: isMobile ? 6 : 12,
      resolution: isMobile ? 256 : 512,
    }),
    [isMobile]
  );

  useFrame((state, delta) => {
    if (!meshRef.current || reduced) return;

    const t = state.clock.getElapsedTime();
    const targetY = rotationScroll * Math.PI * 2;
    const damp = THREE.MathUtils.damp;

    meshRef.current.rotation.y = damp(
      meshRef.current.rotation.y,
      targetY + t * 0.2,
      4,
      delta
    );
    meshRef.current.rotation.x = damp(
      meshRef.current.rotation.x,
      Math.sin(t * 0.2) * 0.15,
      4,
      delta
    );
  });

  const geometry =
    nodes?.Torus?.geometry ??
    nodes?.Torus002?.geometry ??
    nodes?.default?.geometry;

  return (
    <group {...props} dispose={null}>
      {geometry && (
        <mesh ref={meshRef} geometry={geometry}>
          {/* Vidro líquido */}
          <MeshTransmissionMaterial {...materialProps} />
        </mesh>
      )}
    </group>
  );
}

useGLTF.preload('/media/torus_dan.glb');
