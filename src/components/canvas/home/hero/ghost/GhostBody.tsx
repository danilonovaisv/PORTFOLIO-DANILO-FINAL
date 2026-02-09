'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { GHOST_CONFIG, getConfigColorHex } from '@/config/ghostConfig';

import { Trail } from '@react-three/drei';

interface GhostBodyProps {
  bodyRef: React.RefObject<THREE.Mesh | null>;
}

export function GhostBody({ bodyRef }: GhostBodyProps) {
  const onBeforeCompile = useMemo(
    () =>
      (shader: {
        uniforms: { [uniform: string]: THREE.IUniform };
        vertexShader: string;
        fragmentShader: string;
      }) => {
        shader.vertexShader = shader.vertexShader.replace(
          '#include <begin_vertex>',
          `
      #include <begin_vertex>
      
      // Ghost Skirt Deformation
      float y = position.y;
      if (y < -0.2) {
        float x = position.x;
        float z = position.z;
        
        float noise1 = sin(x * 5.0) * 0.35;
        float noise2 = cos(z * 4.0) * 0.25;
        float noise3 = sin((x + z) * 3.0) * 0.15;
        
        transformed.y = -2.0 + noise1 + noise2 + noise3;
      }
      `
        );
      },
    []
  );

  return (
    <Trail
      width={3}
      length={8}
      color={new THREE.Color(GHOST_CONFIG.bodyColor)} // Use config color
      attenuation={(t) => t * t}
    >
      <mesh ref={bodyRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color={getConfigColorHex(GHOST_CONFIG.bodyColor)}
          emissive={getConfigColorHex(GHOST_CONFIG.glowColor)}
          emissiveIntensity={GHOST_CONFIG.emissiveIntensity}
          roughness={0.02}
          metalness={0.0}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
          onBeforeCompile={onBeforeCompile}
        />
      </mesh>
    </Trail>
  );
}
