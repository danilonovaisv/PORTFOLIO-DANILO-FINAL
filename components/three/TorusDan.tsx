'use client';

import React, { useMemo, useRef } from 'react';
import { MotionValue } from 'framer-motion';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, useGLTF } from '@react-three/drei';
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
        samples: 4,
        anisotropy: 0,
        distortion: 0.35,
        distortionScale: 0.3,
        temporalDistortion: 0.18,
      };
    }

    return {
      resolution: 1024,
      samples: 16,
      anisotropy: 16,
      distortion: 0.55,
      distortionScale: 0.45,
      temporalDistortion: 0.25,
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

  useFrame((state, delta) => {
    if (meshRef.current) {
      if (!prefersReducedMotion) {
        // Rotação base constante (líquido em movimento)
        meshRef.current.rotation.y += delta * 0.1;

        // Mouse Parallax Suave
        const { x, y } = state.pointer;
        meshRef.current.rotation.x = THREE.MathUtils.lerp(
          meshRef.current.rotation.x,
          y * 0.1,
          0.05
        );
        meshRef.current.rotation.z = THREE.MathUtils.lerp(
          meshRef.current.rotation.z,
          x * 0.1,
          0.05
        );
      }

      // Scroll interaction
      if (scrollYProgress && useTransmissionMaterial) {
        const scroll = scrollYProgress.get();
        if (materialRef.current) {
          materialRef.current.distortion = 0.5 + scroll * 0.4;
          materialRef.current.chromaticAberration = 0.06 + scroll * 0.05;
        }
      }
    }
  });

  return (
    <Float
      speed={prefersReducedMotion ? 0 : 2}
      rotationIntensity={prefersReducedMotion ? 0 : 0.5}
      floatIntensity={0.8}
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
