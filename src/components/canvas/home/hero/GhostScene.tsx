'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { usePerformanceAdaptive } from '@/hooks/usePerformanceAdaptive';
import { Ghost } from './Ghost';
import { AtmosphereVeil } from './AtmosphereVeil';
import { Preload } from '@react-three/drei';

/**
 * GhostScene component
 * Main WebGL container for the Ghost Hero experience.
 * Orchestrates the Ghost, Particles, Fireflies, and Atmosphere Veil.
 */
export default function GhostScene() {
  const { pixelRatio, particleCount } = usePerformanceAdaptive();

  return (
    <>
      <Canvas
        className="absolute inset-0"
        dpr={pixelRatio}
        gl={{
          antialias: false, // Performance non-negotiable for target FPS
          powerPreference: 'high-performance',
          alpha: true,
        }}
        camera={{ position: [0, 0, 15], fov: 75 }}
        eventSource={
          typeof document !== 'undefined'
            ? (document.body as HTMLElement)
            : undefined
        }
        eventPrefix="client"
        role="presentation"
      >
        <ambientLight intensity={0.08} color={0x0a0a2e} />

        {/* RIM LIGHTS - CRITICAL for Ghost blue/teal contour glow (CodePen reference) */}
        <directionalLight
          position={[-8, 6, -4]}
          color="#4a90e2"
          intensity={1.8}
        />
        <directionalLight
          position={[8, -4, -6]}
          color="#50e3c2"
          intensity={1.26}
        />

        <Suspense fallback={null}>
          <AtmosphereVeil />
          <Ghost particleCount={particleCount} />
          <Preload all />
        </Suspense>
      </Canvas>

      {/* Screen reader description */}
      <div className="sr-only">
        Decorative animation of a floating spectral ghost with glowing particles
        following your cursor.
      </div>
    </>
  );
}
