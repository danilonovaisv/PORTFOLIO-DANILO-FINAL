import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FirefliesProps {
  count?: number;
}

function Firefly() {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  // Random initial state
  const [initialData] = useState(() => ({
    position: new THREE.Vector3(
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 20
    ),
    velocity: new THREE.Vector3(
      (Math.random() - 0.5) * 0.09,
      (Math.random() - 0.5) * 0.09,
      (Math.random() - 0.5) * 0.09
    ),
    pulseSpeed: 2 + Math.random() * 3,
    phase: Math.random() * Math.PI * 2,
  }));

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Move
    groupRef.current.position.add(initialData.velocity);

    // Bounds check - simple wrap or bounce? Gist didn't show, but let's wrap around -20 to 20
    const pos = groupRef.current.position;
    if (pos.x > 20) pos.x = -20;
    if (pos.x < -20) pos.x = 20;
    if (pos.y > 15) pos.y = -15;
    if (pos.y < -15) pos.y = 15;
    if (pos.z > 10) pos.z = -10;
    if (pos.z < -10) pos.z = 10;

    // Pulse
    const pulse =
      Math.sin(t * initialData.pulseSpeed + initialData.phase) * 0.5 + 0.5;

    if (glowRef.current) {
      // Opacity pulse (base 0.4)
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.2 + pulse * 0.3;
    }

    if (lightRef.current) {
      lightRef.current.intensity = 0.5 + pulse * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={initialData.position}>
      {/* Core */}
      <mesh>
        <sphereGeometry args={[0.02, 4, 4]} />
        <meshBasicMaterial color={0xffff44} transparent opacity={0.9} />
      </mesh>

      {/* Glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial
          color={0xffff88}
          transparent
          opacity={0.4}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Light */}
      <pointLight
        ref={lightRef}
        color={0xffff44}
        distance={3}
        decay={2}
        intensity={0.8}
      />
    </group>
  );
}

export default function Fireflies({ count = 20 }: FirefliesProps) {
  const fireflies = useMemo(() => new Array(count).fill(0), [count]);

  return (
    <group>
      {fireflies.map((_, i) => (
        <Firefly key={i} />
      ))}
    </group>
  );
}
