import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GHOST_CONFIG } from '@/config/ghostConfig';

const atmosphereShader = {
  uniforms: {
    ghostPosition: { value: new THREE.Vector3() },
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
      
      // Dynamic pulsing radius
      float dynamicRadius = revealRadius + sin(time * 2.5) * 2.0;
      
      // Flashlight Logic: 1.0 at center, 0.0 at edge
      // smoothstep(edge, center, dist) would be inverted
      float glow = 1.0 - smoothstep(0.0, dynamicRadius, dist);
      
      // Pow for falloff curve (soft edge)
      glow = pow(glow, fadeStrength);
      
      float finalOpacity = mix(0.0, baseOpacity, glow);
      
      // Cor da atmosfera (Electric Blue Glow)
      // mix-blend-screen handle blending with text
      gl_FragColor = vec4(0.0, 0.4, 1.0, finalOpacity);
    }
  `,
  transparent: true,
};

export function Atmosphere() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock, scene }) => {
    if (!meshRef.current) return;

    const ghost =
      scene.getObjectByName('Ghost') || scene.getObjectByName('ghost'); // Try both casings
    const mat = meshRef.current.material as THREE.ShaderMaterial;

    mat.uniforms.time.value = clock.getElapsedTime();

    if (ghost) {
      mat.uniforms.ghostPosition.value.copy(ghost.position);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -50]} renderOrder={-100}>
      <planeGeometry args={[300, 300]} />
      <shaderMaterial attach="material" args={[atmosphereShader]} />
    </mesh>
  );
}
