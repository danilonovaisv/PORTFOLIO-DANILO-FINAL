import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Eyes from './Eyes';

export default function Ghost() {
  const meshRef = useRef<THREE.Mesh>(null);
  // Color from spec: #0057FF
  const ghostColor = new THREE.Color('#0057FF');

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Pulsing emissive (Google Antigravity Spec)
    if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
      meshRef.current.material.emissiveIntensity =
        5.8 + Math.sin(t * 1.6) * 0.6;
    }

    // Floating animation (Google Antigravity Style)
    // 3 overlay sine waves for organic feel
    const float1 = Math.sin(t * 1.6) * 0.03; // Main movement
    const float2 = Math.cos(t * 0.7) * 0.018; // Secondary
    const float3 = Math.sin(t * 2.3) * 0.008; // Micro-movement

    meshRef.current.position.y = float1 + float2 + float3;

    // Gentle wobble
    meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.1;
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#06071f"
          emissive={ghostColor}
          emissiveIntensity={3.5}
          transparent
          opacity={0.85}
          roughness={0}
          metalness={0}
          side={THREE.DoubleSide}
          depthWrite={false}  // Important: allows the ghost to blend with content below
          blending={THREE.AdditiveBlending}  // Creates the glowing effect
        />
      </mesh>
      <Eyes />
    </group>
  );
}
