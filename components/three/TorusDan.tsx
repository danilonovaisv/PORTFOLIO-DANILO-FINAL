'use client';

import React, { useMemo, useRef } from 'react';
import { MotionValue } from 'framer-motion';
import { useFrame, useThree } from '@react-three/fiber';
import {
  MeshTransmissionMaterial,
  Float,
  useGLTF,
  useScroll,
} from '@react-three/drei';
import * as THREE from 'three';
import useIsMobile from '@/hooks/useIsMobile';

interface TorusDanProps {
  scrollYProgress?: MotionValue<number>;
  prefersReducedMotion?: boolean;
  lowRenderMode?: boolean;
  isMobile?: boolean;
}

useGLTF.preload('/media/torus_dan.glb');

const TorusDan = ({
  scrollYProgress,
  prefersReducedMotion,
  lowRenderMode,
  isMobile,
}: TorusDanProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const gltf = useGLTF('/media/torus_dan.glb');
  const { size } = useThree();
  const persistedMobile = useIsMobile();
  const viewportMobile = size.width < 768;
  const isMobileDevice = (isMobile ?? persistedMobile) || viewportMobile;
  const usePhysicalFallback = lowRenderMode;
  const useTransmissionMaterial = !usePhysicalFallback;

  const geometry = useMemo(() => {
    const mesh = gltf.scene.children.find(
      (child): child is THREE.Mesh => (child as THREE.Mesh).isMesh === true
    );
    return mesh?.geometry ?? new THREE.TorusGeometry(1, 0.4, 64, 128);
  }, [gltf]);

  const backgroundColor = useMemo(() => new THREE.Color('#F4F5F7'), []);
  const transmissionQuality = useMemo(() => {
    if (isMobileDevice) {
      return {
        resolution: 512,
        samples: 6,
        anisotropy: 0,
        distortion: 0.28,
        distortionScale: 0.22,
        temporalDistortion: 0.12,
      };
    }

    return {
      resolution: 1024,
      samples: 12,
      anisotropy: 16,
      distortion: 0.5,
      distortionScale: 0.38,
      temporalDistortion: 0.2,
    };
  }, [isMobileDevice]);

  const transmissionMaterialProps = useMemo(
    () => ({
      backside: true,
      background: backgroundColor,
      transmission: 1,
      thickness: 0.8,
      roughness: 0.02,
      ior: 1.25,
      chromaticAberration: 0.06,
      attenuationDistance: 0.5,
      attenuationColor: '#ffffff',
      color: '#f0f5ff',
      ...transmissionQuality,
    }),
    [backgroundColor, transmissionQuality]
  );

  const fallbackMaterialProps = useMemo(
    () => ({
      color: '#f0f5ff',
      transparent: true,
      opacity: 0.7,
      roughness: 0.05,
      metalness: 0.15,
      reflectivity: 0.25,
      clearcoat: 0.2,
      clearcoatRoughness: 0.35,
      transmission: 0.6,
    }),
    []
  );

  /* @ts-ignore */
  const materialRef = useRef<any>(null);

  const scroll = useScroll();

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    if (prefersReducedMotion) {
      meshRef.current.rotation.x = THREE.MathUtils.damp(
        meshRef.current.rotation.x,
        0,
        6,
        delta
      );
      meshRef.current.rotation.y = THREE.MathUtils.damp(
        meshRef.current.rotation.y,
        0,
        6,
        delta
      );
      meshRef.current.rotation.z = THREE.MathUtils.damp(
        meshRef.current.rotation.z,
        0,
        6,
        delta
      );
      meshRef.current.position.x = THREE.MathUtils.damp(
        meshRef.current.position.x,
        0,
        4,
        delta
      );
      meshRef.current.position.y = THREE.MathUtils.damp(
        meshRef.current.position.y,
        0,
        4,
        delta
      );
      return;
    }

    const pointerInfluence = isMobileDevice ? 0.1 : 0.18;
    const pointerX = state.pointer.x * pointerInfluence;
    const pointerY = state.pointer.y * pointerInfluence;
    const scrollOffset = scroll.offset ?? 0;
    const timeRotate = lowRenderMode ? 0 : state.clock.elapsedTime * 0.05;

    const targetRotX = pointerY * 0.7;
    const targetRotZ = pointerX * 0.7;
    const targetRotY = scrollOffset * Math.PI * 1.6 + timeRotate;

    meshRef.current.rotation.x = THREE.MathUtils.damp(
      meshRef.current.rotation.x,
      targetRotX,
      6,
      delta
    );
    meshRef.current.rotation.z = THREE.MathUtils.damp(
      meshRef.current.rotation.z,
      targetRotZ,
      6,
      delta
    );
    meshRef.current.rotation.y = THREE.MathUtils.damp(
      meshRef.current.rotation.y,
      targetRotY,
      4,
      delta
    );

    const targetPosX = pointerX * 0.25;
    const targetPosY = pointerY * 0.1;

    meshRef.current.position.x = THREE.MathUtils.damp(
      meshRef.current.position.x,
      targetPosX,
      4,
      delta
    );
    meshRef.current.position.y = THREE.MathUtils.damp(
      meshRef.current.position.y,
      targetPosY,
      4,
      delta
    );

    if (scrollYProgress && useTransmissionMaterial) {
      const scrollValue = scrollYProgress.get();
      if (materialRef.current) {
        materialRef.current.distortion = 0.4 + scrollValue * 0.35;
        materialRef.current.chromaticAberration = 0.05 + scrollValue * 0.04;
      }
    }
  });

  return (
    <Float
      speed={prefersReducedMotion || lowRenderMode ? 0 : 2}
      rotationIntensity={prefersReducedMotion || lowRenderMode ? 0 : 0.45}
      floatIntensity={prefersReducedMotion || lowRenderMode ? 0 : 0.8}
      floatingRange={[-0.15, 0.15]}
    >
      {/* @ts-ignore */}
      <mesh ref={meshRef} geometry={geometry} position={[0, 0, 0]}>
        {useTransmissionMaterial ? (
          <MeshTransmissionMaterial
            ref={materialRef}
            {...transmissionMaterialProps}
          />
        ) : (
          <meshPhysicalMaterial ref={materialRef} {...fallbackMaterialProps} />
        )}
      </mesh>
    </Float>
  );
};

export default TorusDan;
