// src/components/home/webgl/AtmosphereVeil.tsx
'use client';

import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function AtmosphereVeil() {
  const meshRef = useRef<THREE.Mesh>(null);

  const atmosphereMaterial = {
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
    `,
  };

  useFrame((state) => {
    if (!meshRef.current) return;
    const material = meshRef.current.material as THREE.ShaderMaterial;
    material.uniforms.time.value = state.clock.elapsedTime;

    // We'll need to sync ghostPosition here if we want the reveal to follow
    // For now, let's just make it a static atmosphere veil as defined
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -50]} renderOrder={-100}>
      <planeGeometry args={[300, 300]} />
      <shaderMaterial
        args={[atmosphereMaterial]}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
