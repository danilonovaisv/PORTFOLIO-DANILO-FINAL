'use client';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { GHOST_CONFIG } from '@/config/ghostConfig';

const FIREFLY_COUNT = GHOST_CONFIG.fireflyCount; // Use o valor do config

export default function Fireflies() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Gere dados iniciais para cada firefly
  const particles = useMemo(() => {
    return Array.from({ length: FIREFLY_COUNT }, () => ({
      t: Math.random() * 1000, // Offset de tempo
      speed: GHOST_CONFIG.fireflySpeed * (0.5 + Math.random() * 1.5), // Variação de velocidade
      xFactor: (Math.random() - 0.5) * 40, // Posição inicial X
      yFactor: (Math.random() - 0.5) * 30, // Posição inicial Y
      zFactor: (Math.random() - 0.5) * 20, // Posição inicial Z
      phase: Math.random() * Math.PI * 2, // Fase para pulsação
      pulseSpeed: 2 + Math.random() * 3, // Velocidade de pulsação
    }));
  }, []);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const t = state.clock.getElapsedTime();
    particles.forEach((particle, i) => {
      const { speed, xFactor, yFactor, zFactor, phase, pulseSpeed } = particle;

      // Movimento baseado no tempo e velocidade
      const time = t * speed + particle.t;
      dummy.position.set(
        xFactor + Math.sin(time) * 10, // Movimento mais amplo
        yFactor + Math.cos(time * 0.8) * 5,
        zFactor + Math.sin(time * 0.6) * 5
      );

      // Pulsar escala
      const pulse = Math.sin(t * pulseSpeed + phase) * 0.4 + 0.6;
      const scale = 0.02 * pulse; // Escala base pequena com pulsação
      dummy.scale.setScalar(scale);

      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, FIREFLY_COUNT]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial
        color="#ffff44" // Cor base do CodePen
        transparent
        opacity={GHOST_CONFIG.fireflyOpacity * 0.9} // Use o valor do config
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </instancedMesh>
  );
}
