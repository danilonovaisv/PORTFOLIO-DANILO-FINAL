'use client';

import { Canvas } from '@react-three/fiber';
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from '@react-three/postprocessing';
import { Suspense } from 'react';
import type { RefObject } from 'react';
import { motion } from 'framer-motion';
import { GHOST_CONFIG } from '@/config/ghostConfig';
import type { Group } from 'three';

import Ghost from '../Ghost';
import { AnalogDecay } from './AnalogDecayPass';
import GhostEyes from './GhostEyes';
import Particles from './Particles';
import Fireflies from './Fireflies';

type GhostCanvasProps = {
  ghostRef?: RefObject<Group>;
};

export default function GhostCanvas({ ghostRef }: GhostCanvasProps) {
  const cfg = GHOST_CONFIG;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="absolute inset-0 z-0 h-full w-full"
    >
      <Canvas
        eventSource={document.body}
        eventPrefix="client"
        dpr={[1, 2]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        camera={{ position: [0, 0, 7], fov: 35 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />

          {/* Primary Ghost Light - Glow intenso */}
          <pointLight
            position={[2, 3, 4]}
            intensity={2}
            color={cfg.glowColor}
            distance={0.9}
          />

          {/* Extra Glow Light - Cyan atmosférico (inspirado no CodePen) */}
          <pointLight
            position={[0, 0, 3]}
            intensity={8}
            color="#00f0ff"
            distance={12}
            decay={2}
          />

          {/* Rim Light - Contorno cyan sutil */}
          <pointLight
            position={[-3, -2, 2]}
            intensity={4}
            color="#4fe6ff"
            distance={8}
            decay={2}
          />

          {/* RevealingText removed in favor of HTML HeroCopy */}
          <group position={[0, -0.2, 0]}>
            <Ghost ref={ghostRef}>
              <GhostEyes color={cfg.eyeGlowColor} />
            </Ghost>
          </group>

          <Particles count={cfg.particleCount} color={cfg.particleColor} />

          {/* Fireflies - Orbiting particles for atmospheric depth */}
          <Fireflies />

          <EffectComposer enableNormalPass={false}>
            {/* Bloom ajustado para glow fantasmagórico (spec: 2.8) */}
            <Bloom
              luminanceThreshold={0.15}
              mipmapBlur
              intensity={2.8}
              radius={0.7}
            />
            <AnalogDecay
              intensity={cfg.analogIntensity}
              scanlines={cfg.analogScanlines}
              grain={cfg.analogGrain}
              bleeding={cfg.analogBleeding}
              vignette={cfg.analogVignette}
              jitter={cfg.analogJitter}
              vsync={cfg.analogVSync}
            />
            <Noise opacity={0.015} />
            <Vignette eskil={false} offset={0.6} darkness={0.7} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </motion.div>
  );
}
