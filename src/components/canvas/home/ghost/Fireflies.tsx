'use client';

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { GHOST_CONFIG, FLUORESCENT_COLORS } from '@/config/ghostConfig';

const FIREFLY_COUNT = GHOST_CONFIG.fireflyCount ?? 200;

export default function Fireflies() {
  const spritesRef = useRef<(THREE.Sprite | null)[]>([]);
  const resolvedColor =
    FLUORESCENT_COLORS[
      GHOST_CONFIG.particleColor as keyof typeof FLUORESCENT_COLORS
    ] || GHOST_CONFIG.particleColor;

  const spriteMaterial = useMemo(
    () =>
      new THREE.SpriteMaterial({
        color: resolvedColor,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
        transparent: true,
      }),
    [resolvedColor]
  );

  const fireflies = useMemo(() => {
    return Array.from({ length: FIREFLY_COUNT }, (_, index) => {
      const phase = index * 0.6;
      return {
        basePhase: phase,
        radius: 3.2 + Math.sin(index * 0.4) * 0.8,
        xFactor: Math.sin(index * 0.37) * 3,
        yFactor: Math.cos(index * 0.22) * 1.8,
        zFactor: Math.sin(index * 0.56) * 3,
        scaleBase: 0.02 + Math.abs(Math.sin(index * 0.21)) * 0.04,
      };
    });
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    fireflies.forEach((firefly, index) => {
      const sprite = spritesRef.current[index];
      if (!sprite) return;

      const floatSpeed = Math.sin(elapsed * 0.5 + index) * 0.005;
      const orbitTime = elapsed * GHOST_CONFIG.fireflySpeed + firefly.basePhase;
      const wobble = Math.sin(orbitTime * 1.3) * 0.2;

      sprite.position.set(
        firefly.xFactor +
          Math.cos(orbitTime * 0.8) * firefly.radius +
          floatSpeed,
        firefly.yFactor +
          Math.sin(orbitTime * 0.6) * firefly.radius * 0.4 +
          wobble,
        firefly.zFactor + Math.cos(orbitTime * 0.4) * firefly.radius * 0.6
      );

      const pulse = 0.6 + Math.sin(orbitTime * 2.2) * 0.35;
      const scale = firefly.scaleBase * pulse;
      sprite.scale.setScalar(scale);
    });
  });

  return (
    <group>
      {fireflies.map((firefly, index) => (
        <sprite
          key={index}
          ref={(el) => {
            spritesRef.current[index] = el;
          }}
          material={spriteMaterial}
        />
      ))}
    </group>
  );
}
