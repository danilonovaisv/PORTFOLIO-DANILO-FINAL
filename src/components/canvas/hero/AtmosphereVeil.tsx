// src/components/canvas/AtmosphereVeil.tsx
'use client';

import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { GHOST_SCREEN_MULTIPLIER } from '@/components/canvas/Ghost';

// Shader para o véu atmosférico (efeito de lanterna)
const atmosphereVertexShader = `
varying vec2 vUv;
varying vec3 vWorldPosition;

void main() {
  vUv = uv;
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPos.xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const atmosphereFragmentShader = `
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

  // Pulsing reveal radius
  float dynamicRadius = revealRadius + sin(time * 2.0) * 5.0;

  // Create smooth reveal gradient
  float reveal = smoothstep(dynamicRadius * 0.2, dynamicRadius, dist);
  reveal = pow(reveal, fadeStrength);

  // Mix between revealed and base opacity
  float opacity = mix(revealOpacity, baseOpacity, reveal);

  // EXTREMELY low RGB values to avoid bloom
  gl_FragColor = vec4(0.001, 0.001, 0.002, opacity);
}
`;

export default function AtmosphereVeil({
  ghostPosition,
}: {
  ghostPosition: [number, number];
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  // Cria o material com o shader (uma única vez ou quando necessário)
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        ghostPosition: { value: new THREE.Vector3(0, 0, 0) },
        revealRadius: { value: 37 },
        fadeStrength: { value: 1.7 },
        baseOpacity: { value: 0.9 },
        revealOpacity: { value: 0.05 },
        time: { value: 0 },
      },
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
  }, []);

  // Cria a geometria (uma única vez)
  const geometry = useMemo(() => new THREE.PlaneGeometry(300, 300), []);

  useFrame((state) => {
    if (!materialRef.current) return;

    const time = state.clock.elapsedTime;
    materialRef.current.uniforms.time.value = time;

    // Atualiza a posição do ghost com a mesma escala do componente Ghost.tsx
    materialRef.current.uniforms.ghostPosition.value.set(
      ghostPosition[0] * GHOST_SCREEN_MULTIPLIER.x,
      ghostPosition[1] * GHOST_SCREEN_MULTIPLIER.y,
      0
    );
  });

  return (
    <mesh
      position={[0, 0, -50]} // Posiciona atrás do ghost
      renderOrder={-100} // Garante que fique atrás dos outros elementos
      material={material}
      geometry={geometry}
    >
      <primitive object={material} ref={materialRef} attach="material" />
    </mesh>
  );
}
