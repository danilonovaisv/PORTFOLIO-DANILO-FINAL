'use client';

import {
  AccumulativeShadows,
  RandomizedLight,
  Environment,
} from '@react-three/drei';

export default function GlassSceneLighting() {
  return (
    <>
      <ambientLight intensity={0.6} />

      <AccumulativeShadows
        temporal
        frames={60}
        alphaTest={0.85}
        scale={12}
        opacity={0.9}
      >
        <RandomizedLight
          amount={8}
          radius={10}
          ambient={0.5}
          intensity={2}
          position={[5, 5, -10]}
        />
      </AccumulativeShadows>

      <Environment preset="city" />
    </>
  );
}
