// AtmosphereVeil.tsx
'use client';
import * as THREE from 'three';

export default function AtmosphereVeil() {
  return (
    <group>
      {/* Glow Volumétrico atrás do fantasma */}
      <mesh position={[1, 1, -3]} scale={[1, 1, 1]}>
        <sphereGeometry args={[5.5, 32, 32]} />
        <meshBasicMaterial
          color="#5d00ff" // Azul profundo
          transparent
          opacity={0.72}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Véu de fundo para integrar com o CSS */}
      <mesh position={[0, -2, -4]}>
        <planeGeometry args={[15, 10]} />
        <meshBasicMaterial
          color="#03041c"
          transparent
          opacity={1.4}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
