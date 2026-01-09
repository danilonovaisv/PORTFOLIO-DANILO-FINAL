'use client';

import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { GHOST_CONFIG } from '@/config/ghostConfig';

interface AtmosphereVeilProps {
  ghostPosition?: THREE.Vector3;
}

/**
 * AtmosphereVeil - Dark veil that reveals based on ghost proximity
 * Matches the CodePen reference: creates a "lantern" effect around the ghost
 */
export default function AtmosphereVeil({ ghostPosition }: AtmosphereVeilProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const timeRef = useRef(0);

  const cfg = GHOST_CONFIG;

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        ghostPosition: { value: new THREE.Vector3(0, 0, 0) },
        revealRadius: { value: cfg.revealRadius },
        fadeStrength: { value: cfg.fadeStrength },
        baseOpacity: { value: cfg.baseOpacity },
        revealOpacity: { value: cfg.revealOpacity },
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
          
          // Very dark blue background to avoid bloom interference
          gl_FragColor = vec4(0.001, 0.001, 0.002, opacity);
        }
      `,
      transparent: true,
      depthWrite: false,
    });
  }, [cfg.revealRadius, cfg.fadeStrength, cfg.baseOpacity, cfg.revealOpacity]);

  useFrame((state, delta) => {
    if (!materialRef.current) return;

    timeRef.current += delta;
    materialRef.current.uniforms.time.value = timeRef.current;

    // Update ghost position from prop or use default
    if (ghostPosition) {
      materialRef.current.uniforms.ghostPosition.value.copy(ghostPosition);
    }
  });

  return (
    <mesh position={[0, 0, -50]} renderOrder={-100}>
      <planeGeometry args={[300, 300]} />
      <primitive ref={materialRef} object={shaderMaterial} attach="material" />
    </mesh>
  );
}
