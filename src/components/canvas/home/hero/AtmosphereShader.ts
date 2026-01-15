// src/components/canvas/home/hero/AtmosphereShader.ts
import * as THREE from 'three';

export const AtmosphereShader = {
  uniforms: {
    ghostPosition: { value: new THREE.Vector3(0, 0, 0) },
    revealRadius: { value: 37 },
    fadeStrength: { value: 1.7 },
    baseOpacity: { value: 0.9 },
    revealOpacity: { value: 0.05 },
    time: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    void main() {
      vUv = uv;
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 ghostPosition;
    uniform float revealRadius;
    uniform float fadeStrength;
    uniform float baseOpacity;
    uniform float revealOpacity;
    uniform float time;
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    void main() {
      float dist = distance(vWorldPosition.xy, ghostPosition.xy);
      float dynamicRadius = revealRadius + sin(time * 2.0) * 5.0;
      float reveal = smoothstep(dynamicRadius * 0.2, dynamicRadius, dist);
      reveal = pow(reveal, fadeStrength);
      float opacity = mix(revealOpacity, baseOpacity, reveal);
      gl_FragColor = vec4(0.001, 0.001, 0.002, opacity);
    }
  `,
};
