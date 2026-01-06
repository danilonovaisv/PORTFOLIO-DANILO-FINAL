'use client';

import { Canvas } from '@react-three/fiber';
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from '@react-three/postprocessing';
import { Suspense } from 'react';
import { useControls, folder } from 'leva';
import { Group } from 'three';
import { RefObject } from 'react';

// Componentes da Cena
import Ghost from './Ghost';
import GhostEyes from './GhostEyes';
import Particles from './Particles';
// Ajusta o caminho conforme a tua estrutura de pastas real
import { AnalogDecay } from './postprocessing/AnalogDecayPass';

interface GhostCanvasProps {
  onCreated?: (_state: any) => void;
  ghostRef?: RefObject<Group | null>;
}

// Fluorescent color palette
const fluorescentColors = {
  cyan: '#00ffff',
  lime: '#00ff00',
  magenta: '#ff00ff',
  yellow: '#ffff00',
  orange: '#ff4500',
  pink: '#ff1493',
  purple: '#9400d3',
  blue: '#0080ff',
  green: '#00ff80',
  red: '#ff0040',
  teal: '#00ffaa',
  violet: '#8a2be2',
};

export default function GhostCanvas({ onCreated, ghostRef }: GhostCanvasProps) {
  // 1. Controles de Debug (Leva)
  // Agrupei para facilitar a passagem de props
  const config = useControls('Ghost Atmosphere', {
    // Iluminação Global
    mainColor: { value: '#4d8dff' },
    fillColor: { value: '#6e00ff' },

    // Ghost Appearance
    GhostAppearance: folder({
      bodyColor: { value: '#0f2027' },
      glowColor: { value: 'blue', options: Object.keys(fluorescentColors) },
      eyeGlowColor: {
        value: 'violet',
        options: Object.keys(fluorescentColors),
      },
      ghostOpacity: { value: 0.88, min: 0, max: 1 },
      ghostScale: { value: 2.4, min: 0.1, max: 5 },
    }),

    // Glow Effects
    GlowEffects: folder({
      emissiveIntensity: { value: 5.8, min: 0, max: 20 },
      pulseSpeed: { value: 1.6, min: 0, max: 10 },
      pulseIntensity: { value: 0.6, min: 0, max: 2 },
    }),

    // Eyes
    Eyes: folder({
      eyeGlowIntensity: { value: 4.5, min: 0, max: 10 },
      eyeGlowDecay: { value: 0.95, min: 0.1, max: 1 },
      eyeGlowResponse: { value: 0.31, min: 0, max: 1 },
    }),

    // Behavior
    Behavior: folder({
      followSpeed: { value: 0.05, min: 0, max: 1 },
      wobbleAmount: { value: 0.35, min: 0, max: 1 },
      floatSpeed: { value: 1.6, min: 0, max: 5 }, // Maps to wobbleSpeed
      movementThreshold: { value: 0.07, min: 0, max: 1 },
      rimLightIntensity: { value: 1.8, min: 0, max: 5 }, // Unused in current material but kept for props
    }),

    // Particles
    Particles: folder({
      particleCount: { value: 250, min: 0, max: 1000, step: 1 },
      particleDecayRate: { value: 0.005, min: 0, max: 0.1 },
      particleColor: {
        value: 'violet',
        options: Object.keys(fluorescentColors),
      },
      createParticlesOnlyWhenMoving: { value: true },
      particleCreationRate: { value: 5, min: 0, max: 20 },
    }),

    // Background Reveal (Atmosphere)
    Atmosphere: folder({
      revealRadius: { value: 37, min: 0, max: 100 },
      fadeStrength: { value: 1.7, min: 0, max: 5 },
      baseOpacity: { value: 0.9, min: 0, max: 1 },
      revealOpacity: { value: 0.05, min: 0, max: 1 },
    }),

    // Fireflies
    Fireflies: folder({
      fireflyGlowIntensity: { value: 4.3, min: 0, max: 10 },
      fireflySpeed: { value: 0.09, min: 0, max: 1 },
    }),

    // Post-Processing
    PostProcessing: folder({
      bloomIntensity: { value: 1.5, min: 0, max: 3 },
      bloomThreshold: { value: 0.2, min: 0, max: 1 },
      noiseOpacity: { value: 0.05, min: 0, max: 0.2 },
      // Analog Decay
      analogIntensity: { value: 0.9, min: 0, max: 2 },
      analogGrain: { value: 0.4, min: 0, max: 1 },
      analogBleeding: { value: 0.9, min: 0, max: 1 }, // Maps to speed or custom
      analogVSync: { value: 1.7, min: 0, max: 2 },
      analogScanlines: { value: 1.0, min: 0, max: 2 },
      analogVignette: { value: 2.4, min: 0, max: 3 },
      analogJitter: { value: 0.5, min: 0, max: 1 },
      analogSpeed: { value: 0.5, min: 0, max: 2 },
      limboMode: { value: false },
    }),
  });

  // Helper to get color code
  const getColor = (colorName: string) => {
    // @ts-ignore
    return fluorescentColors[colorName] || colorName;
  };

  return (
    <div className="absolute inset-0 z-20 h-full w-full">
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: false,
          alpha: true,
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 0, 5], fov: 50 }}
        onCreated={onCreated}
      >
        <Suspense fallback={null}>
          {/* Iluminação Dramática Controlada pelo Leva */}
          <ambientLight intensity={0.2} />
          <pointLight
            position={[2, 3, 4]}
            intensity={2}
            color={config.mainColor}
            distance={10}
          />
          <pointLight
            position={[-3, -2, 2]}
            intensity={1.5}
            color={config.fillColor}
            distance={10}
          />

          {/* O Ator Principal */}
          {/* IMPORTANTE: Passamos as props do Leva para o Ghost */}
          <group position={[0, -0.5, 0]}>
            <Ghost
              ref={ghostRef}
              color={config.bodyColor}
              emissive={getColor(config.glowColor)}
              emissiveIntensity={config.emissiveIntensity}
              wobbleSpeed={config.floatSpeed} // Mapping floatSpeed to wobbleSpeed
              wobbleAmount={config.wobbleAmount}
              followSpeed={config.followSpeed}
              breathSpeed={config.pulseSpeed}
              pulseIntensity={config.pulseIntensity}
              ghostOpacity={config.ghostOpacity}
              ghostScale={config.ghostScale}
            >
              {/* CRUCIAL: Os olhos são FILHOS (children) do Ghost.
                  Assim, quando o corpo inclina (tilt), os olhos acompanham. */}
              <GhostEyes
                color={getColor(config.eyeGlowColor)}
                eyeGlowIntensity={config.eyeGlowIntensity}
                eyeGlowDecay={config.eyeGlowDecay}
                eyeGlowResponse={config.eyeGlowResponse}
              />
            </Ghost>
          </group>

          {/* Atmosfera */}
          <Particles
            count={Math.floor(config.particleCount)}
            decayRate={config.particleDecayRate}
            color={getColor(config.particleColor)}
            creationRate={config.particleCreationRate}
            createParticlesOnlyWhenMoving={config.createParticlesOnlyWhenMoving}
          />

          {/* Pipeline de Pós-Processamento */}
          <EffectComposer enableNormalPass={false}>
            <Bloom
              luminanceThreshold={config.bloomThreshold}
              mipmapBlur
              intensity={config.bloomIntensity}
              radius={0.6}
            />

            <AnalogDecay
              intensity={config.analogIntensity}
              speed={config.analogSpeed}
              grain={config.analogGrain}
              scanlines={config.analogScanlines}
              vignette={config.analogVignette}
              jitter={config.analogJitter}
            />

            <Noise opacity={config.noiseOpacity} />

            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
