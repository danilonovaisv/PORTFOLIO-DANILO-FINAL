// src/components/home/webgl/Particles.tsx
'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Particles({ count = 250 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      // Particles closer to ghost origin (per reference: scatterRange 3.5)
      const xFactor = (Math.random() - 0.5) * 3.5;
      const yFactor = (Math.random() - 0.5) * 3.5 - 0.8; // Offset down
      const zFactor = -0.8 - Math.random() * 0.6; // Behind ghost
      const speed = 0.003 + Math.random() * 0.005;
      const decay = Math.random() * 0.003 + 0.005;
      const phase = Math.random() * Math.PI * 2;
      temp.push({
        xFactor,
        yFactor,
        zFactor,
        speed,
        decay,
        phase,
        life: Math.random(), // Stagger initial life
        velocity: {
          x: (Math.random() - 0.5) * 0.012,
          y: (Math.random() - 0.5) * 0.012 - 0.002,
          z: (Math.random() - 0.5) * 0.012 - 0.006,
        },
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    particles.forEach((particle, i) => {
      // Update life and reset when dead
      particle.life -= particle.decay;
      if (particle.life <= 0) {
        particle.life = 1.0;
        particle.xFactor = (Math.random() - 0.5) * 3.5;
        particle.yFactor = (Math.random() - 0.5) * 3.5 - 0.8;
        particle.zFactor = -0.8 - Math.random() * 0.6;
      }

      // Position with swirling motion
      const swirl = Math.cos(t * 1.8 + particle.phase) * 0.3;
      dummy.position.set(
        particle.xFactor + swirl + particle.velocity.x * t * 15,
        particle.yFactor + particle.velocity.y * t * 15,
        particle.zFactor + particle.velocity.z * t * 15
      );

      // Scale based on life (fade out)
      const scale = (0.02 + Math.random() * 0.03) * particle.life;
      dummy.scale.set(scale, scale, scale);

      // Rotation animation
      dummy.rotation.set(t * 1.5, t * 0.3, t * 0.2);
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
      <sphereGeometry args={[3, 6, 6]} />
      <meshBasicMaterial color="#5e00f5" transparent opacity={0.5} />
    </instancedMesh>
  );
}
