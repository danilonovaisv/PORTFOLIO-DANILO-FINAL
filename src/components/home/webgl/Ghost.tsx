'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
// CORREÇÃO: Importação nomeada ao invés de default
import { Eyes } from './Eyes';

export default function Ghost() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return;

    const time = state.clock.getElapsedTime();

    // Animação suave de flutuação
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.2;

    // Rotação suave baseada no mouse (se necessário adicionar interatividade aqui)
    // Por enquanto, uma rotação leve para dar vida
    groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color="#0f2027"
          roughness={0.2}
          metalness={0.5}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* CORREÇÃO: Uso do componente nomeado (certifique-se de passar props se necessário) */}
      <Eyes eyeOpacity={1} />
    </group>
  );
}
