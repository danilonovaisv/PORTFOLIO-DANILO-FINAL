'use client';

import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, MeshTransmissionMaterial } from '@react-three/drei';
import { useControls } from 'leva';
import type { MotionValue } from 'framer-motion';

export default function OrbModel({
  mouse,
  scroll,
}: {
  mouse: { x: number; y: number };
  scroll: MotionValue<number>;
}) {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/orb.glb');

  const config = useControls('Orb Material', {
    transmission: { value: 1, min: 0, max: 1 },
    roughness: { value: 0, min: 0, max: 1 },
    thickness: { value: 2.5, min: 0, max: 10 },
    ior: { value: 1.4, min: 1, max: 3 },
    chromaticAberration: { value: 0.06, min: 0, max: 1 },
    anisotropy: { value: 0.2, min: 0, max: 1 },
    distortion: { value: 0.15, min: 0, max: 1 },
    distortionScale: { value: 0.35, min: 0, max: 1 },
    temporalDistortion: { value: 0.5, min: 0, max: 1 },
    color: '#ffffff',
  });

  useFrame((_, dt) => {
    if (!ref.current) return;
    const p = scroll.get();

    ref.current.rotation.y += dt * 0.25;
    ref.current.rotation.x += mouse.y * 0.002;
    ref.current.rotation.y += mouse.x * 0.002;

    ref.current.position.x = mouse.x * 0.6;
    ref.current.position.y = mouse.y * 0.3;
    ref.current.position.z = THREE.MathUtils.lerp(-1.5, 0.8, p);
  });

  scene.traverse((child: any) => {
    if (child.isMesh) {
      child.material = (
        <MeshTransmissionMaterial
          {...config}
          background={new THREE.Color('#f4f4f4')}
        />
      );
    }
  });

  return <primitive ref={ref} object={scene} scale={1.8} />;
}
