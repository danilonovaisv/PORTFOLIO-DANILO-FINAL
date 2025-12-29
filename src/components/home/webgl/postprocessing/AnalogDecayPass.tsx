import React from 'react';
import { shaderMaterial } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const AnalogDecayShader = shaderMaterial(
  {
    tDiffuse: new THREE.Texture(),
    uTime: 10,
    uIntensity: 1.35,
    uGrain: 1.4,
    uScanlines: 1.0,
    uJitter: 0.9,
  },
  /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uIntensity;
    uniform float uGrain;
    uniform float uScanlines;
    uniform float uJitter;
    varying vec2 vUv;

    float rand(vec2 co) {
      return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      vec2 uv = vUv;
      
      // Jitter sutil
      if (uJitter > 0.01) {
        uv += (rand(vec2(uTime)) - 0.5) * uJitter * 0.002;
      }

      vec2 jitter = vec2(
        rand(vec2(uTime * 0.7, uv.y)) - 0.5,
        rand(vec2(uv.x, uTime * 0.9)) - 0.5
      ) * uJitter * 0.0015;

      vec4 baseColor = texture2D(tDiffuse, uv + jitter);
      vec4 colorR = texture2D(tDiffuse, uv + jitter + vec2(0.001 * uJitter, 0.0));
      vec4 colorB = texture2D(tDiffuse, uv + jitter - vec2(0.001 * uJitter, 0.0));
      vec4 color = vec4(colorR.r, baseColor.g, colorB.b, baseColor.a);

      // Grain
      if (uGrain > 0.01) {
        float grain = rand(uv + uTime) * 2.0 - 1.0;
        color.rgb += grain * uGrain * 0.06 * uIntensity;
      }

      // Scanlines
      if (uScanlines > 0.01) {
        float scan = sin(uv.y * 1200.0 + uTime * 2.0) * 0.5 + 0.5;
        color.rgb *= mix(1.0, 0.97, scan * uScanlines * uIntensity);
      }

      gl_FragColor = color;
    }
  `
);

import { ShaderPass } from 'three-stdlib';

extend({ AnalogDecayShader, ShaderPass });

// Types are defined in src/types/global.d.ts

export default function AnalogDecayPass({ enabled = true }: { enabled?: boolean }): React.JSX.Element | null {
  const material = React.useMemo(() => new AnalogDecayShader(), []);

  useFrame((state) => {
    if (material) {
      material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return <shaderPass args={[material]} enabled={enabled} />;
}
