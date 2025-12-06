'use client';

import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

const TorusDan = () => {
  const { viewport } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Continuous slow rotation
      meshRef.current.rotation.z += delta * 0.05;

      // Mouse interaction (Parallax/Tilt)
      const { x, y } = state.pointer;

      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        y * 0.2, // Sensitivity
        0.05 // Smoothness
      );

      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        x * 0.2, // Sensitivity
        0.05 // Smoothness
      );
    }
  });

  // Responsive scale for procedural torus
  const responsiveScale = viewport.width < 5 ? 2.5 : 3.0;

  return (
    // @ts-ignore
    <group scale={responsiveScale}>
      <Float
        speed={1.5}
        rotationIntensity={0.2}
        floatIntensity={0.5}
        floatingRange={[-0.1, 0.1]}
      >
        {/* @ts-ignore */}
        <mesh ref={meshRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
          {/* Procedural Geometry to replace missing GLB */}
          {/* @ts-ignore */}
          <torusGeometry args={[1, 0.4, 64, 128]} />

          <MeshTransmissionMaterial
            backside={true}
            samples={6}
            resolution={512}
            transmission={0.98}
            roughness={0.0}
            clearcoat={1}
            clearcoatRoughness={0}
            thickness={2.5}
            ior={1.4}
            chromaticAberration={0.04}
            anisotropy={0}
            distortion={0.6}
            distortionScale={0.4}
            temporalDistortion={0.1}
            attenuationDistance={0.5}
            attenuationColor="#ffffff"
            color="#ffffff"
            background={new THREE.Color('#F4F5F7')}
          />
        </mesh>
      </Float>
    </group>
  );
};

export default TorusDan;
