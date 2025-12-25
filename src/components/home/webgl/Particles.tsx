// src/components/home/webgl/Particles.tsx
'use client';

import { MutableRefObject, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type ParticlesProps = {
  count?: number;
  speedRef?: MutableRefObject<number>;
};

export default function Particles({ count = 250, speedRef }: ParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      // Particles closer to ghost origin (per reference: scatterRange 3.5)
      const xFactor = (Math.random() - 0.5) * 3.5;
      const yFactor = (Math.random() - 0.5) * 3.5 - 0.8; // Offset down
      const zFactor = -0.8 - Math.random() * 0.6; // Behind ghost
      const decay = Math.random() * 0.003 + 0.005;
      const phase = Math.random() * Math.PI * 2;
      temp.push({
        xFactor,
        yFactor,
        zFactor,
        decay,
        phase,
        life: Math.random(), // Stagger initial life
        baseScale: 0.018 + Math.random() * 0.028,
        spin: 0.6 + Math.random() * 0.8,
        velocity: {
          x: (Math.random() - 0.5) * 0.012,
          y: (Math.random() - 0.5) * 0.012 - 0.002,
          z: (Math.random() - 0.5) * 0.012 - 0.006,
        },
      });
    }
    return temp;
  }, [count]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const speedFactor = speedRef?.current
      ? THREE.MathUtils.clamp(0.6 + speedRef.current * 0.06, 0.6, 4.5)
      : 0.8;

    particles.forEach((particle, i) => {
      // Update life and reset when dead
      particle.life -= particle.decay * speedFactor * 0.65;
      if (particle.life <= 0) {
        particle.life = 1.0;
        particle.xFactor = (Math.random() - 0.5) * 3.5;
        particle.yFactor = (Math.random() - 0.5) * 3.5 - 0.8;
        particle.zFactor = -0.8 - Math.random() * 0.6;
      }

      // Position with swirling motion
      const swirl = Math.cos(t * 1.8 + particle.phase) * 0.28;
      dummy.position.set(
        particle.xFactor + swirl + particle.velocity.x * t * 8 * speedFactor,
        particle.yFactor + particle.velocity.y * t * 8 * speedFactor,
        particle.zFactor + particle.velocity.z * t * 8 * speedFactor
      );

      // Scale based on life (fade out)
      const scale = particle.baseScale * particle.life * speedFactor;
      dummy.scale.setScalar(scale);

      // Rotation animation
      dummy.rotation.set(
        t * 1.2 * particle.spin,
        t * 0.4 * particle.spin,
        t * 0.25 * particle.spin
      );
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
      <meshBasicMaterial color="#4b8dff" transparent opacity={0.55} />
    </instancedMesh>
  );
}
