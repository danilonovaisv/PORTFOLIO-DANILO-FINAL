'use client';

import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export type FluidGlassBarProps = {
  scale?: [number, number, number];
  ior?: number;
  thickness?: number;
  chromaticAberration?: number;
  anisotropy?: number;
  smoothness?: number;
};

export type FluidGlassProps = {
  mode?: 'bar';
  barProps?: FluidGlassBarProps;
  pointerX?: number;
  reducedMotion?: boolean;
  className?: string;
};

const GlassBar: React.FC<
  Required<Pick<FluidGlassProps, 'pointerX' | 'reducedMotion'>> & {
    barProps: Required<FluidGlassBarProps>;
  }
> = ({ barProps, pointerX, reducedMotion }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetRef = useRef(0);

  useFrame(() => {
    if (!meshRef.current) return;
    const targetX = reducedMotion ? 0 : pointerX * 0.35;
    targetRef.current = THREE.MathUtils.lerp(
      targetRef.current,
      targetX,
      reducedMotion ? 1 : 0.08
    );
    meshRef.current.position.x = targetRef.current;
  });

  const roughness = Math.min(1, Math.max(0, 1 - barProps.smoothness));

  return (
    <RoundedBox
      ref={meshRef}
      args={[1, 1, 1]}
      radius={0.4}
      smoothness={6}
      scale={barProps.scale}
    >
      <MeshTransmissionMaterial
        transmission={1}
        thickness={barProps.thickness}
        ior={barProps.ior}
        chromaticAberration={barProps.chromaticAberration}
        anisotropy={barProps.anisotropy}
        roughness={roughness}
        clearcoat={1}
        attenuationColor="#ffffff"
        attenuationDistance={0.4}
      />
    </RoundedBox>
  );
};

const FluidGlass: React.FC<FluidGlassProps> = ({
  mode = 'bar',
  barProps,
  pointerX = 0,
  reducedMotion = false,
  className,
}) => {
  const resolvedBarProps = useMemo(
    () => ({
      scale: barProps?.scale ?? [1.2, 0.25, 0.2],
      ior: barProps?.ior ?? 1.15,
      thickness: barProps?.thickness ?? 4,
      chromaticAberration: barProps?.chromaticAberration ?? 0.08,
      anisotropy: barProps?.anisotropy ?? 0.02,
      smoothness: barProps?.smoothness ?? 0.9,
    }),
    [barProps]
  );

  if (mode !== 'bar') {
    return null;
  }

  return (
    <div className={className}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 2.6], fov: 35 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 3, 2]} intensity={1} />
        <directionalLight position={[-2, -3, 3]} intensity={0.6} />
        <GlassBar
          barProps={resolvedBarProps}
          pointerX={pointerX}
          reducedMotion={reducedMotion}
        />
      </Canvas>
    </div>
  );
};

export default FluidGlass;
