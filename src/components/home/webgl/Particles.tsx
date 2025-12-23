'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GhostParams } from './ghost/GhostParams';

interface ParticlesProps {
  ghostPosition: React.MutableRefObject<THREE.Vector3>;
  isGhostMoving: boolean;
  movementSpeed: number;
}

type ParticleData = {
  mesh: THREE.Mesh;
  life: number;
  decay: number;
  velocity: THREE.Vector3;
  rotationSpeed: THREE.Euler;
};

export function Particles({
  ghostPosition,
  isGhostMoving,
  movementSpeed,
}: ParticlesProps) {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<ParticleData[]>([]);
  const lastEmitTime = useRef(0);

  // Geometrias reutilizáveis
  const geometries = useMemo(
    () => [
      new THREE.SphereGeometry(0.05, 6, 6),
      new THREE.TetrahedronGeometry(0.04, 0),
      new THREE.OctahedronGeometry(0.045, 0),
    ],
    []
  );

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: GhostParams.particleColor,
        transparent: true,
        opacity: 0,
        alphaTest: 0.1,
      }),
    []
  );

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const now = performance.now();

    // --- Emissão de Partículas ---
    const shouldCreate = GhostParams.createParticlesOnlyWhenMoving
      ? isGhostMoving && movementSpeed > 0.5 // Ajuste de sensibilidade
      : true;

    if (shouldCreate && now - lastEmitTime.current > 100) {
      const count = Math.min(GhostParams.particleCreationRate, 5); // Limite por frame

      for (let i = 0; i < count; i++) {
        if (particlesRef.current.length >= GhostParams.particleCount) break;

        const geom = geometries[Math.floor(Math.random() * geometries.length)];
        const mesh = new THREE.Mesh(geom, material.clone());

        // Posição inicial (atrás do fantasma)
        mesh.position.copy(ghostPosition.current);
        mesh.position.z -= 0.8 + Math.random() * 0.6;
        mesh.position.x += (Math.random() - 0.5) * 3.5;
        mesh.position.y += (Math.random() - 0.5) * 3.5 - 0.8;

        const scale = 0.6 + Math.random() * 0.7;
        mesh.scale.set(scale, scale, scale);

        // Cor aleatória leve
        const color = new THREE.Color(GhostParams.particleColor);
        color.offsetHSL(Math.random() * 0.1 - 0.05, 0, 0);
        (mesh.material as THREE.MeshBasicMaterial).color = color;
        (mesh.material as THREE.MeshBasicMaterial).opacity =
          Math.random() * 0.9;

        groupRef.current?.add(mesh);

        particlesRef.current.push({
          mesh,
          life: 1.0,
          decay: Math.random() * 0.003 + GhostParams.particleDecayRate,
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.012,
            (Math.random() - 0.5) * 0.012 - 0.002,
            (Math.random() - 0.5) * 0.012 - 0.006
          ),
          rotationSpeed: new THREE.Euler(
            (Math.random() - 0.5) * 0.015,
            (Math.random() - 0.5) * 0.015,
            (Math.random() - 0.5) * 0.015
          ),
        });
      }
      lastEmitTime.current = now;
    }

    // --- Atualização de Partículas ---
    for (let i = particlesRef.current.length - 1; i >= 0; i--) {
      const p = particlesRef.current[i];
      p.life -= p.decay;
      (p.mesh.material as THREE.MeshBasicMaterial).opacity = p.life * 0.85;

      // Movimento
      p.mesh.position.add(p.velocity);
      const swirl = Math.cos(time * 1.8 + p.mesh.position.y) * 0.0008;
      p.mesh.position.x += swirl;

      // Rotação
      p.mesh.rotation.x += p.rotationSpeed.x;
      p.mesh.rotation.y += p.rotationSpeed.y;
      p.mesh.rotation.z += p.rotationSpeed.z;

      // Morte
      if (p.life <= 0) {
        groupRef.current?.remove(p.mesh);
        p.mesh.geometry.dispose(); // Opcional se geometria for compartilhada, mas material foi clonado
        (p.mesh.material as THREE.Material).dispose();
        particlesRef.current.splice(i, 1);
      }
    }
  });

  return <group ref={groupRef} />;
}
