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
      float dynamicRadius = revealRadius + sin(time * 2.0) * 5.0;
      float reveal = smoothstep(dynamicRadius * 0.2, dynamicRadius, dist); // Updated 0.3 -> 0.2 to match CodePen
      reveal = pow(reveal, fadeStrength);
      
      float finalOpacity = mix(revealOpacity, baseOpacity, reveal);
      
      // EXTREMELY low RGB values to avoid bloom (Matched to CodePen)
      gl_FragColor = vec4(0.001, 0.001, 0.002, finalOpacity);
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
