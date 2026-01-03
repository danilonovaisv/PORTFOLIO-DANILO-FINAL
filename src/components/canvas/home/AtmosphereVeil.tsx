'use client';

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

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
    
    // Pulsing reveal radius
    float dynamicRadius = revealRadius + sin(time * 2.0) * 5.0;
    
    // Create smooth reveal gradient
    float reveal = smoothstep(dynamicRadius * 0.2, dynamicRadius, dist);
    reveal = pow(reveal, fadeStrength);
    
    // Mix between revealed and base opacity
    float opacity = mix(revealOpacity, baseOpacity, reveal);
    
    // Slight blue tint instead of pure black
    gl_FragColor = vec4(0.02, 0.02, 0.05, opacity);
  }
`;

interface AtmosphereVeilProps {
  ghostRef?: React.RefObject<THREE.Group | null>;
}

export default function AtmosphereVeil({ ghostRef }: AtmosphereVeilProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      ghostPosition: { value: new THREE.Vector3(0, 0, 0) },
      revealRadius: { value: 37 },
      fadeStrength: { value: 1.7 },
      baseOpacity: { value: 0.9 },
      revealOpacity: { value: 0.05 },
      time: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.getElapsedTime();

      if (ghostRef?.current) {
        materialRef.current.uniforms.ghostPosition.value.copy(
          ghostRef.current.position
        );
      }
    }
  });

  return (
    <mesh position={[0, 0, -50]} renderOrder={-100}>
      <planeGeometry args={[300, 300]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
