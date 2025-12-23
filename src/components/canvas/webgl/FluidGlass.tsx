'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

// Placeholder for the Fluid Glass effect
// In a real "Fluid Glass" implementation ref ReactBits, it usually involves a shader or specific physical material setup.
// Here we use MeshTransmissionMaterial to simulate the optical glass effect.

function GlassCapsule() {
  const mesh = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(t * 0.5) * 0.05;
      mesh.current.rotation.y = Math.sin(t * 0.3) * 0.05;
      mesh.current.position.x = THREE.MathUtils.lerp(
        mesh.current.position.x,
        pointer.x * 0.2,
        0.1
      );
      mesh.current.position.y = THREE.MathUtils.lerp(
        mesh.current.position.y,
        pointer.y * 0.15,
        0.1
      );
    }
  });

  return (
    <mesh
      ref={mesh}
      rotation={[0, 0, Math.PI / 2]}
      scale={[8, 1, 1]}
      position={[0, 0, 0]}
    >
      <capsuleGeometry args={[0.4, 1, 32, 64]} />
      <MeshTransmissionMaterial
        resolution={1024}
        distortion={0.22}
        anisotropy={0.01}
        chromaticAberration={0.1}
        thickness={5}
        ior={1.15}
        temporalDistortion={0.08}
        color="#dfe7ff"
        roughness={0.12}
        samples={12}
        transmission={1}
        attenuationDistance={2.5}
        attenuationColor="#7aa5ff"
        side={THREE.DoubleSide}
        toneMapped
      />
    </mesh>
  );
}

export default function FluidGlass() {
  return (
    <group>
      <GlassCapsule />
    </group>
  );
}
