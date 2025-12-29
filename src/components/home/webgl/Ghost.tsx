import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface GhostProps {
  speedRef: React.MutableRefObject<number>;
}

export default function Ghost({ speedRef: _speedRef }: GhostProps) {
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Simple placeholder animation
    groupRef.current.rotation.y += delta * 0.5;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="white"
          transparent
          opacity={0.5}
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}
