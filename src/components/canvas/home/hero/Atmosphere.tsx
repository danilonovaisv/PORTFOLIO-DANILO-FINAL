'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GHOST_CONFIG } from '@/config/ghostConfig';

export function Atmosphere({
  ghostRef,
}: {
  ghostRef: React.RefObject<THREE.Group | null>;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  const atmosphereShader = useMemo(() => {
    return {
      uniforms: {
        ghostPosition: { value: new THREE.Vector3(0, 0, 0) },
        revealRadius: { value: GHOST_CONFIG.revealRadius },
        fadeStrength: { value: GHOST_CONFIG.fadeStrength },
        baseOpacity: { value: GHOST_CONFIG.baseOpacity },
        revealOpacity: { value: GHOST_CONFIG.revealOpacity },
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
  }, []);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime();
      if (ghostRef.current) {
        materialRef.current.uniforms.ghostPosition.value.copy(
          ghostRef.current.position
        );
      }
    }
  });

  return (
    <mesh position={[0, 0, -50]} renderOrder={-100}>
      <planeGeometry args={[500, 500]} />
      <shaderMaterial
        ref={materialRef}
        args={[atmosphereShader]}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
