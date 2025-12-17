// GlassSceneLighting.tsx
import React from 'react';
import { Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useControls } from 'leva';

export default function GlassSceneLighting({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  const l = useControls('Lighting', {
    envPreset: {
      value: 'city',
      options: ['city', 'dawn', 'forest', 'apartment', 'sunset', 'warehouse'],
    },

    // key light (azul)
    lightAColor: '#4f7dff',
    lightAIntensity: { value: 2.2, min: 0, max: 10, step: 0.1 },
    lightAX: { value: 3.5, min: -10, max: 10, step: 0.1 },
    lightAY: { value: 3.0, min: -10, max: 10, step: 0.1 },
    lightAZ: { value: 2.0, min: -10, max: 10, step: 0.1 },

    // fill/rim light (rosa/laranja)
    lightBColor: '#ff6bd6',
    lightBIntensity: { value: 1.8, min: 0, max: 10, step: 0.1 },
    lightBX: { value: -3.5, min: -10, max: 10, step: 0.1 },
    lightBY: { value: -0.5, min: -10, max: 10, step: 0.1 },
    lightBZ: { value: -2.0, min: -10, max: 10, step: 0.1 },

    ambient: { value: 0.6, min: 0, max: 2, step: 0.01 },

    bloom: true,
    bloomIntensity: { value: 0.4, min: 0, max: 3, step: 0.01 },
    bloomThreshold: { value: 0.75, min: 0, max: 1, step: 0.01 },
    bloomSmoothing: { value: 0.2, min: 0, max: 1, step: 0.01 },
  });

  return (
    <>
      <ambientLight intensity={l.ambient} />

      <pointLight
        color={l.lightAColor}
        intensity={l.lightAIntensity}
        position={[l.lightAX, l.lightAY, l.lightAZ]}
      />

      <pointLight
        color={l.lightBColor}
        intensity={l.lightBIntensity}
        position={[l.lightBX, l.lightBY, l.lightBZ]}
      />

      <Environment preset={l.envPreset as any} />

      {l.bloom && !reduceMotion && (
        <EffectComposer>
          <Bloom
            intensity={l.bloomIntensity}
            threshold={l.bloomThreshold}
            smoothing={l.bloomSmoothing}
          />
        </EffectComposer>
      )}
    </>
  );
}
