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

  // Ajuste: Detecção mobile mais robusta ou via props
  const viewportMobile = isMobile ?? size.width < 600;
  const useLowQuality = lowRenderMode || viewportMobile;

  // Configuração Tiering de Performance
  const config = useLowQuality
    ? { resolution: 512, samples: 4, anisotropy: 0 }
    : { resolution: 1024, samples: 12, anisotropy: 16 };

  const geometry = useMemo(() => {
    const mesh = gltf.scene.children.find(
      (child): child is THREE.Mesh => (child as THREE.Mesh).isMesh === true
    );
    return mesh?.geometry ?? new THREE.TorusGeometry(1, 0.4, 64, 128);
  }, [gltf]);

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
      if (scrollYProgress) {
        const scroll = scrollYProgress.get();
        // Aumenta a distorção levemente ao rolar (0.5 base + up to 0.4 based on scroll)
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
        <MeshTransmissionMaterial
          ref={materialRef}
          backside
          background={new THREE.Color('#F4F5F7')}
          {...config}
          transmission={1}
          thickness={0.8} // Aumentado para mais volume
          roughness={0.02} // Mais liso (vidro molhado)
          ior={1.25} // Índice de refração "aquoso"
          chromaticAberration={0.06} // Separação de cores nas bordas
          distortion={0.5} // Distorção média
          distortionScale={0.4}
          temporalDistortion={0.25} // Movimento interno do material
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
          color="#f0f5ff" // Leve tint azulado para integrar com a marca
        />
      </mesh>
    </Float>
  );
};

export default TorusDan;
