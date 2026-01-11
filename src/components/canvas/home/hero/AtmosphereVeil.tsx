'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * AtmosphereVeil component
 * Creates a "veil" that covers the screen and reveals content based on the ghost's position.
 * Aligned with Ghost Era specifications and CodePen visual references.
 */
export function AtmosphereVeil() {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  useFrame(({ clock, scene }) => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.time.value = clock.getElapsedTime();

    const ghost = scene.getObjectByName('ghost');
    if (ghost) {
      materialRef.current.uniforms.ghostPosition.value.copy(ghost.position);
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    void main() {
      vUv = uv;
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
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
      // Small pulse effect on the reveal radius
      float dynamicRadius = revealRadius + sin(time * 2.0) * 5.0;
      float reveal = smoothstep(dynamicRadius * 0.2, dynamicRadius, dist);
      reveal = pow(reveal, fadeStrength);
      
      float opacity = mix(revealOpacity, baseOpacity, reveal);
      
      // Extremely low RGB to avoid bloom while keeping the "veil" effect
      gl_FragColor = vec4(0.001, 0.001, 0.002, opacity);
    }
  `;

  return (
    <mesh position={[0, 0, -10]} renderOrder={-100}>
      <planeGeometry args={[300, 300]} />
      <shaderMaterial
        ref={materialRef}
        attach="material"
        uniforms={{
          ghostPosition: { value: new THREE.Vector3(0, 0, 0) },
          revealRadius: { value: 37 },
          fadeStrength: { value: 1.7 },
          baseOpacity: { value: 0.9 },
          revealOpacity: { value: 0.05 },
          time: { value: 0 },
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default AtmosphereVeil;
