'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { GHOST_CONFIG, getConfigColorHex } from '@/config/ghostConfig';

interface GhostBodyProps {
  bodyRef: React.RefObject<THREE.Mesh | null>;
}

import { Trail } from '@react-three/drei';

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
    <group>
      <Trail
        width={3} // Width of the trail
        length={8} // Length of the trail
        color={new THREE.Color('#0048ff')} // Trail color
        attenuation={(t) => t * t} // Trail transparency
      >
        <mesh ref={bodyRef}>
          <sphereGeometry args={[2, 64, 64]} />
          <meshStandardMaterial
            color={getConfigColorHex(GHOST_CONFIG.bodyColor)}
            emissive={getConfigColorHex(GHOST_CONFIG.glowColor)}
            emissiveIntensity={GHOST_CONFIG.emissiveIntensity}
            roughness={0.1}
            metalness={0.5}
            transparent
            opacity={0.8}
            blending={THREE.NormalBlending}
            side={THREE.DoubleSide}
            onBeforeCompile={onBeforeCompile}
          />
        </mesh>
      </Trail>
    </group>
  );
}
