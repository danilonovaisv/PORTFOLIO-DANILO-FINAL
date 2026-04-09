import { useEffect, useMemo, useRef } from 'react';
import { Float } from '@react-three/drei';
import type { ThreeElements } from '@react-three/fiber';
import * as THREE from 'three';

export const ProceduralGhost: React.FC<ThreeElements['group']> = (props) => {
  const groupRef = useRef<THREE.Group>(null);

  const headGeo = useMemo(() => new THREE.SphereGeometry(0.6, 32, 32), []);
  const bodyGeo = useMemo(
    () => new THREE.CylinderGeometry(0.6, 0.2, 1.2, 32),
    []
  );
  const brimGeo = useMemo(
    () => new THREE.CylinderGeometry(0.8, 0.8, 0.05, 32),
    []
  );
  const topGeo = useMemo(
    () => new THREE.CylinderGeometry(0.45, 0.45, 0.7, 32),
    []
  );
  const ribbonGeo = useMemo(
    () => new THREE.CylinderGeometry(0.46, 0.46, 0.1, 32),
    []
  );
  const eyeGeo = useMemo(() => new THREE.SphereGeometry(0.08, 16, 16), []);

  useEffect(() => {
    return () => {
      headGeo.dispose();
      bodyGeo.dispose();
      brimGeo.dispose();
      topGeo.dispose();
      ribbonGeo.dispose();
      eyeGeo.dispose();
    };
  }, [headGeo, bodyGeo, brimGeo, topGeo, ribbonGeo, eyeGeo]);

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <group ref={groupRef} {...props}>
        {/* Head */}
        <mesh position={[0, 0, 0]} geometry={headGeo}>
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
        <mesh position={[0, -0.8, 0]} geometry={bodyGeo}>
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.2}
            metalness={0.1}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Hat (Brim) */}
        <mesh position={[0, 0.45, 0]} rotation={[0, 0, 0]} geometry={brimGeo}>
          <meshStandardMaterial color="#050505" roughness={0.8} />
        </mesh>

        {/* Hat (Top) */}
        <mesh position={[0, 0.8, 0]} geometry={topGeo}>
          <meshStandardMaterial color="#050505" roughness={0.8} />
        </mesh>

        {/* Hat Ribbon (Red) */}
        <mesh position={[0, 0.5, 0]} geometry={ribbonGeo}>
          <meshStandardMaterial color="#ff0000" />
        </mesh>

        {/* Left Eye */}
        <mesh position={[-0.2, 0.1, 0.5]} geometry={eyeGeo}>
          <meshStandardMaterial color="black" />
        </mesh>

        {/* Right Eye */}
        <mesh position={[0.2, 0.1, 0.5]} geometry={eyeGeo}>
          <meshStandardMaterial color="black" />
        </mesh>
      </group>
    </Float>
  );
};
