// src/components/canvas/home/RevealingText.tsx
'use client';

import { useRef } from 'react';
import { Text, shaderMaterial } from '@react-three/drei';
import { useFrame, extend, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Material personalizado para o efeito de revelação
const RevealShaderMaterial = shaderMaterial(
  {
    uGhostPos: new THREE.Vector3(0, 0, 0),
    uRevealRadius: 4.0,
    uColor: new THREE.Color('#ffffff'),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vPos;
    void main() {
      vUv = uv;
      vPos = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * viewMatrix * vec4(vPos, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform vec3 uGhostPos;
    uniform float uRevealRadius;
    uniform vec3 uColor;
    varying vec3 vPos;

    void main() {
      // Calcula a distância entre o pixel do texto e o fantasma
      float dist = distance(vPos.xy, uGhostPos.xy);
      
      // Cria o gradiente de revelação (mais visível perto, invisível longe)
      // Ajuste os valores smoothstep para controlar a suavidade da borda
      float alpha = 1.0 - smoothstep(uRevealRadius * 0.3, uRevealRadius, dist);
      
      gl_FragColor = vec4(uColor, alpha);
    }
  `
);

extend({ RevealShaderMaterial });

export default function RevealingText({
  ghostRef,
}: {
  ghostRef: React.RefObject<THREE.Group>;
}) {
  const titleMat = useRef<any>(null);
  const subMat = useRef<any>(null);
  const { viewport } = useThree();

  // Lógica responsiva
  // Lógica responsiva (Valores reduzidos para caber na tela com FOV 35)
  const isMobile = viewport.width < 5;
  const titleSize = isMobile ? 0.25 : 0.45; // Reduzido de 0.85 para 0.45
  const subtitleSize = titleSize * 0.6;

  useFrame(() => {
    // Sincroniza a posição do fantasma com o shader do texto
    if (ghostRef.current) {
      if (titleMat.current)
        titleMat.current.uGhostPos.copy(ghostRef.current.position);
      if (subMat.current)
        subMat.current.uGhostPos.copy(ghostRef.current.position);
    }
  });

  return (
    <group position={[0, 0, -1.0]}>
      {/* Título */}
      <Text
        fontSize={titleSize}
        lineHeight={1.0}
        letterSpacing={-0.05}
        textAlign="center"
        position={[0, 0.35, 0]} // Mais próximo do centro (era 0.8)
        maxWidth={viewport.width * 0.8} // Margem de segurança maior
        anchorY="bottom"
      >
        VOCÊ NÃO VÊ{'\n'}O DESIGN.
        <revealShaderMaterial
          ref={titleMat}
          transparent
          uColor="#ffffff"
          uRevealRadius={isMobile ? 3.5 : 5.0}
        />
      </Text>

      {/* Subtítulo */}
      <Text
        fontSize={subtitleSize}
        lineHeight={1.0}
        letterSpacing={0.2} // Tracking maior para o subtítulo
        textAlign="center"
        position={[0, -0.4, 0]} // Mais próximo do centro (era -1.0)
        maxWidth={viewport.width * 0.8}
        anchorY="top"
      >
        MAS ELE VÊ VOCÊ.
        <revealShaderMaterial
          ref={subMat}
          transparent
          uColor="#cccccc"
          uRevealRadius={isMobile ? 3.5 : 5.0} // Wider radius
        />
      </Text>
    </group>
  );
}
