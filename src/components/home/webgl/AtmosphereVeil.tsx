// src/components/home/webgl/AtmosphereVeil.tsx
'use client';

import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function AtmosphereVeil({
  ghostPosRef,
}: {
  ghostPosRef?: React.RefObject<THREE.Vector3>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const atmosphereMaterial = {
    uniforms: {
      ghostPosition: { value: new THREE.Vector3(0, 0, 0) },
      revealRadius: { value: 0.7 },
      fadeStrength: { value: 1.7 },
      baseOpacity: { value: 0.03 }, // Reduced from 0.9 to keep text visible
      revealOpacity: { value: 0.001 }, // Reduced from 0.1 for subtler effect
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
        // Calculate distance in screen-ish space for reveal
        float dist = distance(vWorldPosition.xy, ghostPosition.xy);
        
        // Pulsing reveal radius
        float dynamicRadius = revealRadius + sin(time * 2.0) * 5.0;
        
        // Create smooth reveal gradient
        float reveal = smoothstep(dynamicRadius * 0.1, dynamicRadius, dist);
        reveal = pow(reveal, fadeStrength);
        
        // Mix between revealed and base opacity
        float opacity = mix(revealOpacity, baseOpacity, reveal);
        
        // Very dark overlay with low alpha for subtle effect
        gl_FragColor = vec4(0.02, 0.02, 0.03, opacity);
      }
    `,
  };

  useFrame((state) => {
    if (!meshRef.current) return;
    const material = meshRef.current.material as THREE.ShaderMaterial;
    material.uniforms.time.value = state.clock.elapsedTime;

    if (ghostPosRef?.current) {
      material.uniforms.ghostPosition.value.copy(ghostPosRef.current);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -40]} renderOrder={-100}>
      <planeGeometry args={[200, 200]} />
      <shaderMaterial
        args={[atmosphereMaterial]}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
