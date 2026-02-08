import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { GHOST_CONFIG } from '@/config/ghostConfig';
import { Ghost } from './Ghost';
import { Atmosphere } from './Atmosphere';

export function GhostCanvas() {
  const ghostRef = useRef<THREE.Group>(null!);

  // Removed usePerformanceAdaptive and related variables.
  // Defaulting dpr to 1 for now, or it can be removed if not strictly needed.
  // Particle count and quality checks will need to be re-evaluated if performance adaptation is desired.

  return (
    <div className="w-full h-full relative bg-transparent">
      <Canvas
        shadows={false}
        dpr={1} // Defaulting dpr to 1 after removing performance hook
        camera={{ position: [0, 0, 25], fov: 75 }}
        gl={{
          antialias: false, // Start with false for post-processing
          powerPreference: 'high-performance',
          alpha: true,
          stencil: false,
          depth: true,
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <AdaptiveDpr pixelated={performance.quality === 'low'} />

          <ambientLight
            color={GHOST_CONFIG.ambientLightColor}
            intensity={GHOST_CONFIG.ambientLightIntensity}
          />

          <directionalLight
            position={[-8, 6, -4]}
            intensity={GHOST_CONFIG.rimLightIntensity}
            color="#4a90e2"
          />

          <directionalLight
            position={[8, -4, -6]}
            intensity={GHOST_CONFIG.rimLightIntensity * 0.7}
            color="#50e3c2"
          />

          <Ghost
            ghostRef={ghostRef}
            particleCount={performance.particleCount * 5}
          />

          <Atmosphere ghostRef={ghostRef} />

          {/* Post-Processing: Old TV / Signal Failure Look - DISABLED per user feedback (prefer Spectral look) */}
          {/* {isHighQuality && (
            <EffectComposer enableNormalPass={false} multisampling={0}>
              <Noise opacity={0.15} blendFunction={BlendFunction.OVERLAY} />
              <Scanline
                density={1.5}
                opacity={0.2}
                scrollSpeed={0.05}
                blendFunction={BlendFunction.OVERLAY}
              />
              <ChromaticAberration
                offset={[0.002, 0.002]}
                radialModulation={false}
                modulationOffset={0}
              />
              <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
          )} */}

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default GhostCanvas;
