'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import {HeroGlassScene} from './HeroGlassScene';

function FloatingGlass({ mouse }: { mouse: { x: number; y: number } }) {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!ref.current) return;

    // movimento contínuo
    ref.current.rotation.y += 0.02;

    // parallax do mouse
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      mouse.y * 1.35,
      1.1
    );
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      mouse.x * 0.35,
      0.1
    );
  });

  return (
    <group ref={ref} position={[0, 0.8, 0]}>
      <HeroGlassScene />
    </group>
  );
}

export default function HeroGlass({ mouse }: { mouse: { x: number; y: number } }) {
  return (
    <Canvas camera={{ position: [1, 1, 4], fov: 40 }}>
      <ambientLight intensity={1.9} />
      <Environment preset="city" />
      <FloatingGlass mouse={mouse} />
    </Canvas>
  );
}
