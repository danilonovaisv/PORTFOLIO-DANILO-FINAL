// src/components/home/webgl/postprocessing/AnalogDecayPass.ts
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';

const AnalogDecayShader = shaderMaterial(
  {
    tDiffuse: new THREE.Texture(),
    uTime: 0,
    uIntensity: 0.7,
    uGrain: 0.4,
    uScanlines: 1.0,
    uJitter: 0.5,
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

      vec4 color = texture2D(tDiffuse, uv);

      // Grain
      if (uGrain > 0.01) {
        float grain = rand(uv + uTime) * 2.0 - 1.0;
        color.rgb += grain * uGrain * 0.08 * uIntensity;
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

// Define types for JSX
declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        analogDecayShader: any;
        shaderPass: any;
      }
    }
  }
}

export default function AnalogDecayPass() {
  return (
    <shaderPass
      args={[AnalogDecayShader]}
      uTime={0}
      uIntensity={0.7}
      uGrain={0.4}
      uScanlines={1.0}
      uJitter={0.5}
    />
  );
}
