'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, RoundedBox } from '@react-three/drei';
import { RoundedBoxGeometry } from 'three-stdlib';
import * as THREE from 'three';

interface FluidGlassProps {
  mode: 'lens' | 'bar';
  lensProps: {
    scale: number;
    ior: number;
    thickness: number;
    chromaticAberration: number;
    anisotropy: number;
    navItems: { label: string; link: string }[];
  };
}

const GlassLens = ({
  lensProps,
}: {
  lensProps: FluidGlassProps['lensProps'];
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const { ior, thickness, chromaticAberration, anisotropy } = lensProps;

  const glowGeom = useMemo(() => new RoundedBoxGeometry(7.8, 1.7, 0.24, 12, 0.5), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const { mouse } = state;
    const targetX = mouse.x * 0.4;
    const targetY = mouse.y * 0.3;
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetX,
      0.08
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      0.08
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.x * 0.08,
      0.1
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouse.y * 0.05,
      0.1
    );
  });

  return (
    <group ref={groupRef} scale={0.92}>
      <RoundedBox args={[7.6, 1.5, 0.22]} radius={0.5} smoothness={12}>
        <MeshTransmissionMaterial
          backside
          samples={10}
          resolution={256}
          transmission={1}
          roughness={0.12}
          thickness={thickness}
          ior={ior}
          chromaticAberration={chromaticAberration}
          anisotropy={anisotropy}
          distortion={0.12}
          distortionScale={0.16}
          temporalDistortion={0.08}
          color="#05060f"
          attenuationColor="#0b1a3f"
          attenuationDistance={0.4}
        />
      </RoundedBox>

      <mesh geometry={glowGeom} position={[0, 0, -0.08]}>
        <meshBasicMaterial
          color="#6f7bff"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh geometry={glowGeom} position={[0, 0, -0.12]} scale={1.05}>
        <meshBasicMaterial
          color="#5327ff"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

const FluidGlass = ({ lensProps }: FluidGlassProps) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 48 }}
      dpr={[1, 1.5]}
      gl={{
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
      }}
      style={{ pointerEvents: 'none' }}
      className="pointer-events-none select-none"
    >
      <color attach="background" args={['transparent']} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[0, 2.5, 3]} intensity={0.6} color="#ffffff" />
      <pointLight position={[0, 0, 2]} intensity={0.5} color="#4b7cff" />

      <GlassLens lensProps={lensProps} />
    </Canvas>
  );
};

export default FluidGlass;
