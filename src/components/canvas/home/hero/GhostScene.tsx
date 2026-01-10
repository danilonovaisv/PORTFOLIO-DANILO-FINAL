'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { usePerformanceAdaptive } from '@/hooks/usePerformanceAdaptive';
// import { useReducedMotion } from '@/hooks/useReducedMotion';
// import { GHOST_CONFIG, getConfigColorHex } from '@/config/ghostConfig';
import { Ghost } from './Ghost';
import { Atmosphere } from './Atmosphere';
import { Preload } from '@react-three/drei';

// function GhostSVGStatic() {
//   return (
//     <svg
//       className="w-64 h-64 text-blue-glow/10"
//       viewBox="0 0 512 512"
//       fill="currentColor"
//       aria-hidden="true"
//     >
//       <path d="m508.374 432.802s-46.6-39.038-79.495-275.781c-8.833-87.68-82.856-156.139-172.879-156.139-90.015 0-164.046 68.458-172.879 156.138-32.895 236.743-79.495 275.782-79.495 275.782-15.107 25.181 20.733 28.178 38.699 27.94 35.254-.478 35.254 40.294 70.516 40.294 35.254 0 35.254-35.261 70.508-35.261s37.396 45.343 72.65 45.343 37.389-45.343 72.651-45.343c35.254 0 35.254 35.261 70.508 35.261s35.27-40.772 70.524-40.294c17.959.238 53.798-2.76 38.692-27.94z" />
//     </svg>
//   );
// }

export default function GhostScene() {
  // const prefersReducedMotion = useReducedMotion();
  const { pixelRatio, particleCount } = usePerformanceAdaptive();

  // Fallback for prefers-reduced-motion
  // if (prefersReducedMotion) {
  //   return (
  //     <div className="absolute inset-0 bg-linear-to-br from-neutral-950 to-neutral-900 flex items-center justify-center opacity-30">
  //       <GhostSVGStatic />
  //       <span className="sr-only">Decoração: Fantasma estático no fundo</span>
  //     </div>
  //   );
  // }

  return (
    <>
      <Canvas
        className="absolute inset-0"
        dpr={pixelRatio}
        gl={{
          antialias: false, // Performance non-negotiable
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
        <ambientLight intensity={1} />
        <directionalLight position={[0, 0, 5]} intensity={2} />
        <Suspense fallback={null}>
          <Atmosphere />
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
