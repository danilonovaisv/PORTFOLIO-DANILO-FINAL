'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
  Scanline,
} from '@react-three/postprocessing';
import React, { memo, useMemo, useRef } from 'react';
import * as THREE from 'three';

function Ghost({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const ghostMesh = useRef<THREE.Mesh>(null);
  const target = useRef(new THREE.Vector3(0, 0, 0));

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0b0d3a'),
      emissive: new THREE.Color('#0057FF'),
      emissiveIntensity: 2.0,
      roughness: 0.35,
      metalness: 0.0,
    });
  }, []);

  useFrame((state) => {
    if (!group.current || !ghostMesh.current) return;

    const t = state.clock.elapsedTime;

    if (!reducedMotion) {
      const mx = (state.pointer.x ?? 0) * 0.75;
      const my = (state.pointer.y ?? 0) * 0.35;
      target.current.set(mx, my, 0);

      group.current.position.lerp(target.current, 0.08);
      group.current.position.y += Math.sin(t * 0.8) * 0.06;
      group.current.rotation.z = Math.sin(t * 0.35) * 0.08;
    }

    material.emissiveIntensity = 2.0 + Math.sin(t * 1.2) * 0.25;

    const s = 1.0 + Math.sin(t * 0.9) * 0.035;
    ghostMesh.current.scale.setScalar(s);
  });

  return (
    <group ref={group}>
      <mesh ref={ghostMesh} material={material}>
        <sphereGeometry args={[0.7, 64, 64]} />
      </mesh>

      <mesh position={[-0.22, 0.08, 0.55]}>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshStandardMaterial
          emissive={'#ffffff'}
          emissiveIntensity={2.6}
          color={'#0b0d3a'}
        />
      </mesh>

      <mesh position={[0.22, 0.08, 0.55]}>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshStandardMaterial
          emissive={'#ffffff'}
          emissiveIntensity={2.6}
          color={'#0b0d3a'}
        />
      </mesh>
    </group>
  );
}

function Particles({
  count = 800,
  reducedMotion,
}: {
  count?: number;
  reducedMotion: boolean;
}) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = THREE.MathUtils.randFloat(0.8, 3.0);
      const theta = Math.random() * Math.PI * 2;
      const y = THREE.MathUtils.randFloatSpread(1.8);
      pos[i * 3 + 0] = Math.cos(theta) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * r - 0.5;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!points.current || reducedMotion) return;
    const t = state.clock.elapsedTime;
    points.current.rotation.y = t * 0.05;
    points.current.rotation.x = Math.sin(t * 0.12) * 0.04;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color={'#FFFFFF'}
        transparent
        opacity={0.35}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function Fireflies({
  count = 28,
  reducedMotion,
}: {
  count?: number;
  reducedMotion: boolean;
}) {
  const group = useRef<THREE.Group>(null);

  const items = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      key: i,
      x: THREE.MathUtils.randFloatSpread(3.2),
      y: THREE.MathUtils.randFloatSpread(1.6),
      z: THREE.MathUtils.randFloat(-1.2, 1.2),
      s: THREE.MathUtils.randFloat(0.02, 0.05),
      sp: THREE.MathUtils.randFloat(0.6, 1.4),
      ph: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  useFrame((state) => {
    if (!group.current || reducedMotion) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, idx) => {
      const it = items[idx];
      child.position.y = it.y + Math.sin(t * it.sp + it.ph) * 0.18;
      child.position.x = it.x + Math.cos(t * (it.sp * 0.7) + it.ph) * 0.12;
    });
  });

  return (
    <group ref={group}>
      {items.map((it) => (
        <mesh key={it.key} position={[it.x, it.y, it.z]}>
          <sphereGeometry args={[it.s, 12, 12]} />
          <meshStandardMaterial
            emissive={'#5227FF'}
            emissiveIntensity={2.5}
            color={'#06071f'}
          />
        </mesh>
      ))}
    </group>
  );
}

const GhostCanvas = memo(function GhostCanvas({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true }}
      camera={{ position: [0, 0, 5], fov: 45 }}
    >
      <ambientLight intensity={0.65} />
      <directionalLight
        position={[4, 3, 5]}
        intensity={0.85}
        color={'#9fb8ff'}
      />
      <pointLight position={[-3, 0.5, 2]} intensity={1.2} color={'#0057FF'} />

      <Ghost reducedMotion={reducedMotion} />
      <Particles reducedMotion={reducedMotion} />
      <Fireflies reducedMotion={reducedMotion} />

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={2.8}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Noise opacity={0.12} />
        <Scanline density={1.25} opacity={0.18} />
        <Vignette eskil={false} offset={0.25} darkness={0.55} />
      </EffectComposer>
    </Canvas>
  );
});

export default GhostCanvas;
