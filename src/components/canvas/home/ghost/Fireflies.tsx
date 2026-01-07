// Fireflies.tsx
'use client';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { FLUORESCENT_COLORS, GHOST_CONFIG } from '@/config/ghostConfig';

export default function Fireflies() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const fireflyCount = GHOST_CONFIG.fireflyCount;
  const fireflyColor =
    FLUORESCENT_COLORS[
      GHOST_CONFIG.fireflyColor as keyof typeof FLUORESCENT_COLORS
    ] || GHOST_CONFIG.fireflyColor;
  const fireflyOpacity = Math.min(1, GHOST_CONFIG.fireflyGlowIntensity / 5);
  const particles = useMemo(() => {
    return Array.from({ length: fireflyCount }, () => ({
      t: Math.random() * 1000,
      factor: 20 + Math.random() * 100,
      speed: (0.2 + Math.random() * 0.5) * GHOST_CONFIG.fireflySpeed,
      xFactor: -4 + Math.random() * 8,
      yFactor: -2 + Math.random() * 4,
      zFactor: -4 + Math.random() * 8,
      scaleBase:
        GHOST_CONFIG.fireflyScaleMin +
        Math.random() *
          (GHOST_CONFIG.fireflyScaleMax - GHOST_CONFIG.fireflyScaleMin),
    }));
  }, [fireflyCount]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const t = state.clock.getElapsedTime();
    particles.forEach((particle, i) => {
      const {
        t: offset,
        speed,
        xFactor,
        yFactor,
        zFactor,
        scaleBase,
      } = particle;

      const time = t * speed + offset;
      dummy.position.set(
        xFactor + Math.cos(time) + Math.sin(time * 0.5) * 0.5,
        yFactor + Math.sin(time * 0.8) + Math.cos(time * 0.3) * 0.5,
        zFactor + Math.cos(time * 0.6) + Math.sin(time * 0.2) * 0.5
      );

      // Piscar suave
      const blink = (Math.sin(t * 3 + offset) + 1) * 0.5;
      const scale = scaleBase * (0.6 + blink * 0.6);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, fireflyCount]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial
        color={fireflyColor}
        transparent
        opacity={fireflyOpacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </instancedMesh>
  );
}
