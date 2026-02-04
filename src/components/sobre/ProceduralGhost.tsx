import { useRef } from 'react';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export const ProceduralGhost: React.FC<any> = (props) => {
  const groupRef = useRef<THREE.Group>(null);

  // Simple floating animation logic distinct from the main model if needed,
  // but we wrap it in <Float> anyway.

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <group ref={groupRef} {...props} dispose={null}>
        {/* Head */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.2}
            metalness={0.1}
            emissive="#ffffff"
            emissiveIntensity={0.1}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Body (Tapered Cylinder) */}
        <mesh position={[0, -0.8, 0]}>
          <cylinderGeometry args={[0.6, 0.2, 1.2, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.2}
            metalness={0.1}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Hat (Brim) */}
        <mesh position={[0, 0.45, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 0.05, 32]} />
          <meshStandardMaterial color="#050505" roughness={0.8} />
        </mesh>

        {/* Hat (Top) */}
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.45, 0.45, 0.7, 32]} />
          <meshStandardMaterial color="#050505" roughness={0.8} />
        </mesh>

        {/* Hat Ribbon (Red) */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.46, 0.46, 0.1, 32]} />
          <meshStandardMaterial color="#ff0000" />
        </mesh>

        {/* Left Eye */}
        <mesh position={[-0.2, 0.1, 0.5]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>

        {/* Right Eye */}
        <mesh position={[0.2, 0.1, 0.5]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </group>
    </Float>
  );
};
