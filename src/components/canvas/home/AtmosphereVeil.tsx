'use client';

import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';

// Shader copiado e adaptado da referência (CodePen) - Updated
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
    float dynamicRadius = revealRadius * 0.32 + sin(time * 1.4) * 1.2;
    float core = 1.0 - smoothstep(dynamicRadius * 0.25, dynamicRadius, dist);
    float halo = 1.0 - smoothstep(dynamicRadius, dynamicRadius * 1.85, dist);
    float opacity = mix(revealOpacity, baseOpacity, core) + halo * 0.25;
    vec3 innerColor = vec3(0.18, 0.42, 1.0);
    vec3 outerColor = vec3(0.02, 0.08, 0.24);
    vec3 color = mix(outerColor, innerColor, pow(core, fadeStrength));
    gl_FragColor = vec4(color, clamp(opacity * 0.9, 0.0, 1.0));
  }
`;

interface AtmosphereProps {
  ghostRef: React.RefObject<THREE.Group | null>; // Precisa saber onde o fantasma está
}

export default function AtmosphereVeil({ ghostRef }: AtmosphereProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      ghostPosition: { value: new THREE.Vector3(0, 0, 0) },
      revealRadius: { value: 22.0 },
      fadeStrength: { value: 2.2 },
      baseOpacity: { value: 0.62 },
      revealOpacity: { value: 0.08 },
      time: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.time.value = state.clock.getElapsedTime();

    // Atualiza a posição do shader para seguir o fantasma
    if (ghostRef.current) {
      materialRef.current.uniforms.ghostPosition.value.copy(
        ghostRef.current.position
      );
    }
  });

  return (
    <mesh position={[0, 0, -10]} renderOrder={-100}>
      <planeGeometry args={[300, 300]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}
