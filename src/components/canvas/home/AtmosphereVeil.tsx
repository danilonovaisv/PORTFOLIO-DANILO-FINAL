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
    float dynamicRadius = revealRadius * 0.3 + sin(time * 2.0) * 1.0;
    float reveal = smoothstep(dynamicRadius * 0.4, dynamicRadius, dist);
    reveal = pow(reveal, fadeStrength * 2.5);
    float opacity = mix(revealOpacity * 0.5, baseOpacity * 0.3, reveal);
    gl_FragColor = vec4(0.0, 0.2, 1.0, opacity * 0.8);
  }
`;

interface AtmosphereProps {
  ghostRef: React.RefObject<THREE.Group>; // Precisa saber onde o fantasma está
}

export default function AtmosphereVeil({ ghostRef }: AtmosphereProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      ghostPosition: { value: new THREE.Vector3(0, 0, 0) },
      revealRadius: { value: 15.0 },
      fadeStrength: { value: 2.5 },
      baseOpacity: { value: 0.3 },
      revealOpacity: { value: 0.01 },
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
