'use client';

import * as THREE from 'three';
import { GHOST_CONFIG } from '@/config/ghostConfig';

export default function AtmosphereVeil() {
  const {
    atmosphereGlowColor,
    atmosphereGlowOpacity,
    atmosphereGlowScale,
    atmosphereBackgroundColor,
    atmosphereBackgroundOpacity,
    atmosphereBackgroundScale,
  } = GHOST_CONFIG;

  return (
    <group>
      {/* Glow Volumétrico atrás do fantasma */}
      <mesh position={[1, 1, -3]} scale={atmosphereGlowScale}>
        <sphereGeometry args={[5.5, 32, 32]} />
        <meshBasicMaterial
          color={atmosphereGlowColor}
          transparent
          opacity={atmosphereGlowOpacity}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Véu de fundo para integrar com o CSS */}
      <mesh position={[0, -2, -4]}>
        <planeGeometry args={atmosphereBackgroundScale} />
        <meshBasicMaterial
          color={atmosphereBackgroundColor}
          transparent
          opacity={atmosphereBackgroundOpacity}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
