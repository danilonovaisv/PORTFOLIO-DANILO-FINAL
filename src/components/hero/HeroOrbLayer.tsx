'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, useEnvironment } from '@react-three/drei';
import * as THREE from 'three';
import { useRef } from 'react';
import type { MotionValue } from 'framer-motion';
import GlassSceneLighting from './GlassSceneLighting';

function Orb({
  mouse,
  scrollYProgress,
}: {
  mouse: { x: number; y: number };
  scrollYProgress: MotionValue<number>;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const env = useEnvironment({ preset: 'city' });

  useFrame(({ clock }, dt) => {
    if (!ref.current) return;

    const t = clock.getElapsedTime();
    const p = scrollYProgress.get();

    ref.current.rotation.y += dt * 0.22;

    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      mouse.y * 0.4,
      0.08
    );
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      mouse.x * 0.4,
      0.08
    );

    ref.current.position.x = THREE.MathUtils.lerp(
      ref.current.position.x,
      mouse.x * 0.7,
      0.06
    );

    ref.current.position.y = 0.15 + Math.sin(t * 1.2) * 0.12 + mouse.y * 0.18;

    ref.current.position.z = THREE.MathUtils.lerp(-1.6, 0.9, p);
  });

  return (
    <mesh ref={ref} scale={1.6}>
      <torusGeometry args={[1, 0.35, 128, 256]} />
      <MeshTransmissionMaterial
        envMap={env}
        transmission={1}
        thickness={3.5}
        roughness={0}
        ior={1.5}
        chromaticAberration={0.06}
        distortion={0.1}
        distortionScale={0.3}
        temporalDistortion={0.4}
        clearcoat={1}
      />
    </mesh>
  );
}

export default function HeroOrbLayer({
  mouse,
  scrollYProgress,
}: {
  mouse: { x: number; y: number };
  scrollYProgress: MotionValue<number>;
}) {
  return (
    <div className="absolute inset-0 z-[55] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45, near: 0.1, far: 20 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <GlassSceneLighting />
        <Orb mouse={mouse} scrollYProgress={scrollYProgress} />
      </Canvas>
    </div>
  );
}
