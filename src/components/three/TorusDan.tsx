'use client';

import React, { useMemo, useRef, memo } from 'react';
import { Float, MeshTransmissionMaterial, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type TorusDanProps = {
  reduceMotion?: boolean;
  isMobile?: boolean;
  scale?: number | [number, number, number];
  position?: [number, number, number];
};

const TorusDan = memo(
  ({
    reduceMotion = false,
    isMobile = false,
    scale = 3.2,
    position = [0, 0, 0],
  }: TorusDanProps) => {
    const groupRef = useRef<THREE.Group>(null);
    const GLTF_PATH = '/media/torus_dan.glb';
    const { nodes } = useGLTF(GLTF_PATH);

    const geometry =
      (nodes as any).Torus?.geometry ||
      (nodes as any).Torus002?.geometry ||
      (nodes as any).Mesh?.geometry;

    if (!geometry) {
      return null;
    }

    const materialConfig = useMemo(() => {
      const common = {
        ior: 1.25,
        chromaticAberration: 0.06,
        backside: true,
      };

      if (reduceMotion) {
        return {
          ...common,
          transmission: 0.9,
          roughness: 0.15,
          thickness: 0.35,
          samples: 2,
          resolution: 256,
        };
      }

      if (isMobile) {
        return {
          ...common,
          transmission: 1,
          roughness: 0.1,
          thickness: 0.4,
          samples: 3,
          resolution: 320,
        };
      }

      return {
        ...common,
        transmission: 1,
        roughness: 0.05,
        thickness: 0.55,
        samples: 6, // Reduced from 12 to 6 for better performance without much visual loss
        resolution: 512, // Reduced from 1024 to 512 for better performance
      };
    }, [isMobile, reduceMotion]);

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
        <MeshTransmissionMaterial {...materialConfig} />
      </mesh>
    );

    if (reduceMotion) {
      return (
        // @ts-ignore
        <group
          ref={groupRef}
          dispose={null}
          scale={scale}
          position={position}
          rotation={[0.18, Math.PI / 5, 0]}
        >
          {mesh}
        </group>
      );
    }

    return (
      // @ts-ignore
      <group
        ref={groupRef}
        dispose={null}
        scale={scale}
        position={position}
        rotation={[0.18, Math.PI / 5, 0]}
      >
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
  }
);

TorusDan.displayName = 'TorusDan';

// Preload ensuring absolute path
useGLTF.preload('/media/torus_dan.glb');

export default TorusDan;
