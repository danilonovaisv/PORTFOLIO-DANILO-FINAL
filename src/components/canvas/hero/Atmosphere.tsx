import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const atmosphereShader = {
  uniforms: {
    ghostPosition: { value: new THREE.Vector3() },
    revealRadius: { value: 20 },
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
      float dynamicRadius = revealRadius + sin(time * 2.0) * 5.0;
      
      float reveal = smoothstep(dynamicRadius * 0.2, dynamicRadius, dist);
      reveal = pow(reveal, fadeStrength);
      
      float opacity = mix(revealOpacity, baseOpacity, reveal);
      
      // Cor da atmosfera (Dark Ghost)
      gl_FragColor = vec4(0.001, 0.001, 0.002, opacity);
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
