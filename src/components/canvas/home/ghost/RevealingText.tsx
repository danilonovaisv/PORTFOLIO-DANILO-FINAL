'use client';

import { useRef, useMemo } from 'react';
import { Text, shaderMaterial } from '@react-three/drei';
import { useFrame, extend, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Material de shader para revelação
const RevealMaterial = shaderMaterial(
  {
    uGhostPos: new THREE.Vector3(0, 0, 0),
    uRevealRadius: 2.4,
    uBaseColor: new THREE.Color('#02040a'),
    uRevealColor: new THREE.Color('#ffffff'),
    uOpacity: 2.0,
    uRevealColor2: new THREE.Color('#8a9bbd'), // Nova cor para subtítulo
  },
  // Vertex shader: passa a posição do mundo para o fragment shader
  `
    varying vec3 vWorldPosition;
    void main() {
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,
  // Fragment shader: efeito de revelação com ruído
  `
    uniform vec3 uGhostPos;
    uniform float uRevealRadius;
    uniform vec3 uBaseColor;
    uniform vec3 uRevealColor;
    uniform vec3 uRevealColor2;
    uniform float uOpacity;
    varying vec3 vWorldPosition;
    
    // Função de ruído para textura orgânica
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    void main() {
      // Calcula distância com leve ajuste de escala
      float dist = distance(vWorldPosition.xy, uGhostPos.xy * 0.8);
      // Adiciona ruído para efeito orgânico
      float noise = random(vWorldPosition.xy * 15.0) * 0.1;  
      float radius = uRevealRadius + noise;
      // Função suave para transição
      float alpha = 1.0 - smoothstep(radius * 0.4, radius, dist);
      // Mistura cores baseada na revelação
      vec3 finalColor = mix(uBaseColor, uRevealColor, alpha);
      // Calcula opacidade final
      gl_FragColor = vec4(finalColor, uOpacity * (0.3 + alpha * 0.7)); 
    }
  `
);

extend({ RevealMaterial });

export default function RevealingText({
  ghostRef,
}: {
  ghostRef?: React.RefObject<THREE.Group | null>;
}) {
  const titleMat = useRef<THREE.ShaderMaterial>(null);
  const subMat = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;

  // URL da fonte
  const fontUrl = useMemo(
    () =>
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Black.woff2',
    []
  );

  useFrame(() => {
    if (!ghostRef?.current) return;

    const ghostPos = ghostRef.current.position;
    const radius = isMobile ? 1.2 : 1.4;

    if (titleMat.current) {
      // Suaviza movimento do fantasma com interpolação
      (titleMat.current.uniforms.uGhostPos.value as THREE.Vector3).lerp(
        ghostPos,
        0.1
      );
      titleMat.current.uniforms.uRevealRadius.value = radius;
    }

    if (subMat.current) {
      (subMat.current.uniforms.uGhostPos.value as THREE.Vector3).lerp(
        ghostPos,
        0.1
      );
      subMat.current.uniforms.uRevealRadius.value = radius;
      // Define cor específica para subtítulo
      subMat.current.uniforms.uRevealColor.value = new THREE.Color('#8a9bbd');
    }
  });

  return (
    <group position={[0, 0, -2]}>
      {/* Texto principal com efeito de revelação */}
      <Text
        font={fontUrl}
        fontSize={isMobile ? 0.35 : 0.65}
        fontWeight={900}
        letterSpacing={-0.05}
        textAlign="center"
        position={[0, 0.3, 0]}
        maxWidth={viewport.width * 0.8}
        anchorY="bottom"
      >
        Você não vê{'\n'}o design..
        <RevealMaterial ref={titleMat} transparent />
      </Text>

      {/* Subtítulo com cor de revelação diferente */}
      <Text
        font={fontUrl}
        fontSize={isMobile ? 0.12 : 0.2}
        fontWeight={500}
        letterSpacing={0.2}
        textAlign="center"
        position={[0, -0.1, 0]}
        maxWidth={viewport.width * 0.8}
        anchorY="top"
      >
        Mas ele vê você.
        <RevealMaterial
          ref={subMat}
          transparent
          uniforms={
            subMat.current?.uniforms || {
              uRevealColor2: new THREE.Color('#8a9bbd'),
            }
          }
        />
      </Text>
    </group>
  );
}
