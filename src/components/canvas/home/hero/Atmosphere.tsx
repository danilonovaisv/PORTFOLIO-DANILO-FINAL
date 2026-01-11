'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GHOST_CONFIG } from '@/config/ghostConfig';

const atmosphereShader = {
  uniforms: {
    ghostPosition: { value: new THREE.Vector3() },
    time: { value: 0 },
    revealRadius: { value: GHOST_CONFIG.revealRadius },
    fadeStrength: { value: GHOST_CONFIG.fadeStrength },
    baseOpacity: { value: GHOST_CONFIG.baseOpacity },
    revealOpacity: { value: GHOST_CONFIG.revealOpacity },
  },
  vertexShader: `
    varying vec3 vWorldPosition;
    void main() {
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 ghostPosition;
    uniform float time;
    uniform float revealRadius;
    uniform float fadeStrength;
    uniform float baseOpacity;
    uniform float revealOpacity;
    varying vec3 vWorldPosition;
    
    void main() {
      float dist = distance(vWorldPosition.xy, ghostPosition.xy);
      // FIXED: Match CodePen dynamics exactly
      float dynamicRadius = revealRadius * 0.3 + sin(time * 2.0) * 1.0;
      float reveal = smoothstep(dynamicRadius * 0.4, dynamicRadius, dist);
      reveal = pow(reveal, fadeStrength * 2.5);
      
      float finalOpacity = mix(revealOpacity * 0.5, baseOpacity * 0.3, reveal);
      
      // FIXED: Blue-tinted atmosphere like CodePen (was near-black)
      gl_FragColor = vec4(0.0, 0.2, 1.0, finalOpacity * 0.8);
    }
  `,
  transparent: true,
};

export function Atmosphere() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock, scene }) => {
    if (!meshRef.current) return;

    const ghost = scene.getObjectByName('ghost');
    const mat = meshRef.current.material as THREE.ShaderMaterial;

    mat.uniforms.time.value = clock.getElapsedTime();

    if (ghost) {
      mat.uniforms.ghostPosition.value.copy(ghost.position);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -10]}>
      <planeGeometry args={[100, 100]} />
      <shaderMaterial attach="material" args={[atmosphereShader]} />
    </mesh>
  );
}

export default Atmosphere;
