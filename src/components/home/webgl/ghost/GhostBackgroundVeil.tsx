'use client';

import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMemo } from 'react';
import { GhostParams } from './GhostParams';

interface BackgroundVeilProps {
  ghostPos: THREE.Vector3;
}

export function GhostBackgroundVeil({ ghostPos }: BackgroundVeilProps) {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          ghostPosition: { value: ghostPos },
          revealRadius: { value: GhostParams.revealRadius },
          fadeStrength: { value: GhostParams.fadeStrength },
          baseOpacity: { value: GhostParams.baseOpacity },
          revealOpacity: { value: GhostParams.revealOpacity },
          time: { value: 0 },
        },
        vertexShader: /* glsl */ `
      varying vec2 vUv;
      varying vec3 vWorldPosition;
      void main() {
        vUv = uv;
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
        fragmentShader: /* glsl */ `
      uniform vec3 ghostPosition;
      uniform float revealRadius;
      uniform float fadeStrength;
      uniform float baseOpacity;
      uniform float revealOpacity;
      uniform float time;
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
        transparent: true,
        depthWrite: false,
      }),
    [ghostPos]
  );

  useFrame(({ clock }) => {
    mat.uniforms.time.value = clock.getElapsedTime();
  });

  return (
    <mesh position={[0, 0, -50]} renderOrder={-100}>
      <planeGeometry args={[300, 300]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
}
