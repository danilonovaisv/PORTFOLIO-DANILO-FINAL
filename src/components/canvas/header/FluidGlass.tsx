'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';
import FluidGlassScene from './FluidGlassScene';
import { type FluidGlassMaterialProps } from './GlassBar';

export type FluidGlassMode = 'bar';

export interface FluidGlassProps {
  mode: FluidGlassMode;
  barProps?: {
    scale?: [number, number, number];
    ior?: number;
    thickness?: number;
    chromaticAberration?: number;
    anisotropy?: number;
    smoothness?: number;
  };
  pointer?: { x: number; y: number };
  parallax?: number;
  reducedMotion?: boolean;
  className?: string;
}

export function FluidGlass({
  mode = 'bar',
  barProps,
  pointer = { x: 0.5, y: 0.5 },
  parallax = 0,
  reducedMotion = false,
  className,
}: FluidGlassProps) {
  if (mode !== 'bar') return null;

  const materialProps: FluidGlassMaterialProps = {
    ior: 1.15,
    thickness: 2,
    chromaticAberration: 0.05,
    anisotropy: 0.01,
    smoothness: 0.9,
    ...barProps,
  };

  return (
    // Inline style é necessário para altura dinâmica baseada em HEADER_TOKENS
    <div className={`relative w-full h-16 ${className}`}>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.NoToneMapping,
        }}
        frameloop={reducedMotion ? 'demand' : 'always'}
        className="absolute inset-0 z-40 pill-canvas"
      >
        <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={90} />
        <Suspense fallback={null}>
          <FluidGlassScene
            materialProps={materialProps}
            pointer={pointer}
            parallax={parallax}
            reducedMotion={reducedMotion}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default FluidGlass;
