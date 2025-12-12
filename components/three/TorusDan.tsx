'use client';

import React, { useMemo, useRef } from 'react';
import { Float, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type TorusDanProps = {
  reduceMotion?: boolean;
};

const TorusDan = ({ reduceMotion = false }: TorusDanProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/media/torus_dan.glb');

  const glassScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshPhysicalMaterial({
          transmission: 1,
          roughness: 0.05,
          clearcoat: 1,
          clearcoatRoughness: 0.02,
          thickness: 0.85,
          ior: 1.2,
          attenuationColor: new THREE.Color('#f4f5f7'),
          attenuationDistance: 2.5,
          color: new THREE.Color('#ffffff'),
        });
        mesh.castShadow = false;
        mesh.receiveShadow = false;
      }
    });
    return clone;
  }, [scene]);

  useFrame((_, delta) => {
    if (reduceMotion) return;
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.35;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      0.15,
      0.05
    );
  });

  if (reduceMotion) {
    return (
      // @ts-ignore
      <group ref={groupRef} dispose={null} scale={3}>
        {/* @ts-ignore */}
        <primitive object={glassScene} />
      </group>
    );
  }

  return (
    // @ts-ignore
    <group ref={groupRef} dispose={null} scale={3}>
      <Float
        speed={1.4}
        rotationIntensity={0.2}
        floatIntensity={0.35}
        floatingRange={[-0.1, 0.2]}
      >
        {/* @ts-ignore */}
        <primitive object={glassScene} />
      </Float>
    </group>
  );
};

useGLTF.preload('/media/torus_dan.glb');

export default TorusDan;
