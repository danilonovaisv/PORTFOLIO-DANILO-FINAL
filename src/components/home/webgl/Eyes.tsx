'use client';

import React from 'react';
import { GhostParams } from './ghost/GhostParams';

interface EyesProps {
  eyeOpacity: number;
}

export function Eyes({ eyeOpacity }: EyesProps) {
  // Escala aumentada em 50% conforme o CodePen original
  return (
    <group>
      {/* Sockets (Buracos pretos) */}
      <mesh position={[-0.7, 0.6, 1.9]} scale={[1.1, 1.0, 0.6]}>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshBasicMaterial color="black" />
      </mesh>
      <mesh position={[0.7, 0.6, 1.9]} scale={[1.1, 1.0, 0.6]}>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshBasicMaterial color="black" />
      </mesh>

      {/* Glowing Eyes */}
      <mesh position={[-0.7, 0.6, 2.0]}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshBasicMaterial
          color={GhostParams.eyeGlowColor}
          transparent
          opacity={eyeOpacity}
        />
      </mesh>
      <mesh position={[0.7, 0.6, 2.0]}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshBasicMaterial
          color={GhostParams.eyeGlowColor}
          transparent
          opacity={eyeOpacity}
        />
      </mesh>

      {/* Outer Glow */}
      <mesh position={[-0.7, 0.6, 1.95]}>
        <sphereGeometry args={[0.525, 12, 12]} />
        <meshBasicMaterial
          color={GhostParams.eyeGlowColor}
          transparent
          opacity={eyeOpacity * 0.3}
          side={2} // BackSide
        />
      </mesh>
      <mesh position={[0.7, 0.6, 1.95]}>
        <sphereGeometry args={[0.525, 12, 12]} />
        <meshBasicMaterial
          color={GhostParams.eyeGlowColor}
          transparent
          opacity={eyeOpacity * 0.3}
          side={2} // BackSide
        />
      </mesh>
    </group>
  );
}
