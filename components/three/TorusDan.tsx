'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Float, MeshTransmissionMaterial, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type TorusDanProps = {
  reduceMotion?: boolean;
};

const TorusDan = ({ reduceMotion = false }: TorusDanProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { nodes } = useGLTF('/media/torus_dan.glb');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const geometry =
    (nodes as any).Torus?.geometry ||
    (nodes as any).Torus002?.geometry ||
    (nodes as any).Mesh?.geometry;

  if (!geometry) {
    return null;
  }

  const materialConfig = useMemo(
    () => ({
      transmission: 1,
      thickness: 0.65,
      roughness: 0.08,
      ior: 1.25,
      chromaticAberration: 0.06,
      backside: true,
      samples: isMobile ? 8 : 14,
      resolution: isMobile ? 420 : 720,
    }),
    [isMobile]
  );

  useFrame((_, delta) => {
    if (reduceMotion || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.35;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      0.15,
      0.05
    );
  });

  const mesh = (
    // @ts-ignore
    <mesh geometry={geometry}>
      {/* Ajuste de material para vidro com tier mobile */}
      <MeshTransmissionMaterial {...materialConfig} />
    </mesh>
  );

  if (reduceMotion) {
    return (
      // @ts-ignore
      <group ref={groupRef} dispose={null} scale={2.8}>
        {mesh}
      </group>
    );
  }

  return (
    // @ts-ignore
    <group ref={groupRef} dispose={null} scale={2.8}>
      <Float
        speed={1.4}
        rotationIntensity={0.2}
        floatIntensity={0.35}
        floatingRange={[-0.1, 0.2]}
      >
        {mesh}
      </Float>
    </group>
  );
};

useGLTF.preload('/media/torus_dan.glb');

export default TorusDan;
