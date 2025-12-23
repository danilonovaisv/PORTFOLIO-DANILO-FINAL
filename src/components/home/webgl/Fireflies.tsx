// src/components/home/webgl/Fireflies.tsx
'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Fireflies({ count = 20 }) {
  const meshRef = useRef<THREE.Group>(null);

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
          (Math.random() - 0.5) * 0.09,
          (Math.random() - 0.5) * 0.09,
          (Math.random() - 0.5) * 0.09
        ),
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 2 + Math.random() * 3,
      });
    }
    return temp;
  }, [count]);

  const fireflyRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    fireflyRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const data = fireflies[i];

      // Update position
      mesh.position.add(data.velocity);

      // Pulse opacity
      const pulse = Math.sin(t * data.pulseSpeed + data.phase) * 0.5 + 0.5;
      (mesh.material as THREE.MeshBasicMaterial).opacity = 0.4 + pulse * 0.5;

      // Bounds check
      if (Math.abs(mesh.position.x) > 25) data.velocity.x *= -1;
      if (Math.abs(mesh.position.y) > 20) data.velocity.y *= -1;
      if (Math.abs(mesh.position.z) > 15) data.velocity.z *= -1;
    });
  });

  return (
    <group ref={meshRef}>
      {fireflies.map((data, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) fireflyRefs.current[i] = el;
          }}
          position={data.position}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#ffff88" transparent opacity={0.8} />
          <pointLight color="#ffff44" intensity={0.5} distance={3} />
        </mesh>
      ))}
    </group>
  );
}
