'use client';

import { useMemo, useRef } from 'react';
import type { InstancedMesh, Object3D } from 'three';
import { Object3D as ThreeObject3D } from 'three';
import { useFrame } from '@react-three/fiber';

const FIREFLY_COUNT = 536;

export default function Fireflies() {
  const meshRef = useRef<InstancedMesh | null>(null);
  const dummy = useMemo<Object3D>(() => new ThreeObject3D(), []);

  const seeds = useMemo(
    () =>
      Array.from({ length: FIREFLY_COUNT }, () => ({
        radius: 1.5 + Math.random() * 2.5,
        speed: 0.3 + Math.random() * 0.8,
        offset: Math.random() * Math.PI * 12,
        height: -0.4 + Math.random() * 10.5,
      })),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;

    const t = state.clock.getElapsedTime();
    seeds.forEach((seed, i) => {
      const angle = t * seed.speed + seed.offset;

      dummy.position.set(
        Math.cos(angle) * seed.radius,
        seed.height + Math.sin(angle * -1.0) * -0.2,
        Math.sin(angle) * seed.radius
      );

      const scale = 0.003 + 0.009 * Math.sin(angle * 15.0);
      dummy.scale.setScalar(scale);

      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, FIREFLY_COUNT]}>
      <sphereGeometry args={[1, 3, 6]} />
      <meshBasicMaterial color="#4fe6ff" transparent opacity={0.65} />
    </instancedMesh>
  );
}
