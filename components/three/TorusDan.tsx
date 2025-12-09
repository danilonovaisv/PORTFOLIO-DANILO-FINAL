'use client';

import React, { useMemo, useRef } from 'react';
import { MotionValue } from 'framer-motion';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface TorusDanProps {
  scrollYProgress?: MotionValue<number>;
  prefersReducedMotion?: boolean;
  lowRenderMode?: boolean;
  isMobile?: boolean;
}

useGLTF.preload('/models/torus_dan.glb');

const TorusDan = ({
  scrollYProgress,
  prefersReducedMotion,
  lowRenderMode,
  isMobile,
}: TorusDanProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const gltf = useGLTF('/models/torus_dan.glb');
  const { size } = useThree();
  const viewportMobile = isMobile ?? size.width < 600;
  const useLowQuality = lowRenderMode || viewportMobile;
  const resolution = useLowQuality ? 512 : 1024;
  const samples = useLowQuality ? 4 : 10;

  const geometry = useMemo(() => {
    const mesh = gltf.scene.children.find(
      (child): child is THREE.Mesh => (child as THREE.Mesh).isMesh === true
    );

    return mesh?.geometry ?? new THREE.TorusGeometry(1, 0.4, 64, 128);
  }, [gltf]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      const pointer = prefersReducedMotion ? { x: 0, y: 0 } : state.pointer;
      const lerpFactor = prefersReducedMotion ? 0.01 : 0.05;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        pointer.y * 0.2,
        lerpFactor
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        pointer.x * 0.2,
        lerpFactor
      );

      const baseRotation = prefersReducedMotion ? 0.01 : 0.035;
      meshRef.current.rotation.y += delta * baseRotation;
      meshRef.current.rotation.x += delta * baseRotation * 0.4;

      if (scrollYProgress) {
        const scrollValue = scrollYProgress.get();
        meshRef.current.rotation.x += scrollValue * 0.1;
        meshRef.current.rotation.z += scrollValue * 0.05;
      }
    }
  });

  return (
    <Float
      speed={prefersReducedMotion ? 0 : 1.5}
      rotationIntensity={prefersReducedMotion ? 0 : 0.2}
      floatIntensity={0.5}
      floatingRange={prefersReducedMotion ? [0, 0] : [-0.1, 0.1]}
    >
      {/* @ts-ignore */}
      <mesh
        ref={meshRef}
        geometry={geometry}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      >

        <MeshTransmissionMaterial
          backside
          samples={samples}
          resolution={resolution}
          transmission={0.98}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0}
          thickness={0.5}
          ior={1.4}
          chromaticAberration={0.06}
          anisotropy={0.1}
          distortion={0.4}
          distortionScale={0.4}
          temporalDistortion={0.1}
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
          color="#ffffff"
          background={new THREE.Color('#F4F5F7')}
        />
      </mesh>
    </Float>
  );
};

export default TorusDan;
