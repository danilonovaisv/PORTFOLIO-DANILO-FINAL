'use client';

import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DEFAULT, fluorescent } from './GhostParams';
import { GhostBackgroundVeil } from './GhostBackgroundVeil';

export function GhostSphere() {
  const group = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);

  const [mouse] = useState(() => new THREE.Vector2(0, 0));
  const target = useRef(new THREE.Vector2(0, 0));
  const ghostPos = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  // material
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x0f2027,
        transparent: true,
        opacity: 0.88,
        emissive: new THREE.Color(fluorescent[DEFAULT.glowColor]),
        emissiveIntensity: DEFAULT.emissiveIntensity,
        roughness: 0.02,
        metalness: 0.0,
        side: THREE.DoubleSide,
      }),
    []
  );

  const geometry = useMemo(() => {
    const g = new THREE.SphereGeometry(2, 40, 40);
    const pos = g.getAttribute('position');
    const arr = pos.array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      // y
      if (arr[i + 1] < -0.2) {
        const x = arr[i];
        const z = arr[i + 2];
        const noise1 = Math.sin(x * 5) * 0.35;
        const noise2 = Math.cos(z * 4) * 0.25;
        const noise3 = Math.sin((x + z) * 3) * 0.15;
        arr[i + 1] = -2.0 + (noise1 + noise2 + noise3);
      }
    }
    g.computeVertexNormals();
    return g;
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      target.current.set(x, y);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame(({ clock }) => {
    if (!group.current) return;

    // Smooth pointer
    mouse.lerp(target.current, 0.1);

    const targetX = mouse.x * 11;
    const targetY = mouse.y * 7;

    group.current.position.x +=
      (targetX - group.current.position.x) * DEFAULT.followSpeed;
    group.current.position.y +=
      (targetY - group.current.position.y) * DEFAULT.followSpeed;

    // Float
    const t = clock.getElapsedTime();
    group.current.position.y +=
      Math.sin(t * 1.6) * 0.03 + Math.cos(t * 1.12) * 0.018;

    ghostPos.copy(group.current.position);

    // Wobble
    if (bodyRef.current) {
      bodyRef.current.rotation.y =
        Math.sin(t * 1.4) * 0.05 * DEFAULT.wobbleAmount;
      const scale =
        1 +
        Math.sin(t * 2.1) * 0.025 * DEFAULT.wobbleAmount +
        Math.sin(t * 0.8) * 0.012;
      bodyRef.current.scale.setScalar(scale);
    }

    // Pulse
    mat.emissiveIntensity =
      DEFAULT.emissiveIntensity +
      Math.sin(t * 1.6) * 0.6 +
      Math.sin(t * 0.6) * 0.12;
  });

  return (
    <>
      <ambientLight intensity={0.08} color={0x0a0a2e} />
      <directionalLight
        position={[-8, 6, -4]}
        intensity={1.8}
        color={0x4a90e2}
      />
      <directionalLight
        position={[8, -4, -6]}
        intensity={1.26}
        color={0x50e3c2}
      />

      <group ref={group}>
        <Float speed={0.3} rotationIntensity={0.05} floatIntensity={0.2}>
          <mesh ref={bodyRef} geometry={geometry} material={mat} />
        </Float>
      </group>

      <GhostBackgroundVeil ghostPos={ghostPos} />
    </>
  );
}
