// src/components/home/webgl/Fireflies.tsx
'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Fireflies({ count = 20 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const fireflies = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05
        ),
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 1 + Math.random() * 2,
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    fireflies.forEach((data, i) => {
      // Update position
      data.position.add(data.velocity);

      // Bounds check
      if (Math.abs(data.position.x) > 25) data.velocity.x *= -1;
      if (Math.abs(data.position.y) > 20) data.velocity.y *= -1;
      if (Math.abs(data.position.z) > 15) data.velocity.z *= -1;

      dummy.position.copy(data.position);

      // Pulse scale/opacity
      const pulse = Math.sin(t * data.pulseSpeed + data.phase) * 0.5 + 0.5;
      const scale = 0.8 + pulse * 0.4;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();

      if (meshRef.current) {
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
    });

    if (meshRef.current) {
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.06, 8, 8]} />
      <meshBasicMaterial color="#f75f2d" transparent opacity={0.6} />
    </instancedMesh>
  );
}
