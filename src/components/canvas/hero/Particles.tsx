'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Particles({
  count = 60,
  color = '#4d8dff',
}: {
  count?: number;
  color?: string;
}) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Dados iniciais das partículas (não são recriados a cada render)
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        t: Math.random() * 100,
        factor: 20 + Math.random() * 100,
        speed: 0.01 + Math.random() / 200,
        xFactor: -5 + Math.random() * 10,
        yFactor: -5 + Math.random() * 10,
        zFactor: -5 + Math.random() * 10,
        mx: 0,
        my: 0,
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const instancedMesh = mesh.current;
    const time = state.clock.getElapsedTime();

    particles.forEach((particle, i) => {
      // Atualiza o tempo individual da partícula
      particle.t += particle.speed / 2;
      const { t, factor, xFactor, yFactor, zFactor } = particle;

      // Matemática de movimento orgânico (Lissajous figures / Noise simplificado)
      const s = Math.cos(t);

      // Define posição no dummy
      dummy.position.set(
        xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );

      // Escala pulsante para simular brilho variando
      const scale = (Math.sin(time + xFactor) + 2) * 0.02;
      dummy.scale.set(scale, scale, scale);
      dummy.rotation.set(s * 5, s * 5, s * 5);

      dummy.updateMatrix();

      // Atualiza a matriz na instância específica
      instancedMesh.setMatrixAt(i, dummy.matrix);
    });

    instancedMesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.2, 0]} />
      {/* Blending Additive é crucial para o efeito "luz sobre luz" */}
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}
