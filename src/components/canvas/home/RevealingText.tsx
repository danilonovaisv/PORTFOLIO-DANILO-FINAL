'use client';

import { Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// --- SHADER DA CORTINA PRETA ---
const darknessFragmentShader = `
  varying vec3 vWorldPosition;
  uniform vec3 uGhostPosition;
  uniform float uRevealRadius;

  void main() {
    float dist = distance(vWorldPosition.xy, uGhostPosition.xy);
    
    // Calcula a opacidade da escuridão:
    // Perto do fantasma (dist 0) -> Alpha 0.0 (Transparente/Revela)
    // Longe do fantasma -> Alpha 0.98 (Quase preto total/Esconde)
    float darknessAlpha = smoothstep(uRevealRadius * 0.1, uRevealRadius, dist);
    
    // Garante que o fundo não fique 100% preto para dar profundidade (max 0.98)
    darknessAlpha = clamp(darknessAlpha, 0.0, 0.98);
    
    gl_FragColor = vec4(0.0, 0.0, 0.0, darknessAlpha);
  }
`;

const darknessVertexShader = `
  varying vec3 vWorldPosition;
  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

interface RevealingTextProps {
  ghostRef: React.RefObject<THREE.Group>;
}

export default function RevealingText({ ghostRef }: RevealingTextProps) {
  const maskMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;

  // Material da Cortina Preta
  const darknessMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uGhostPosition: { value: new THREE.Vector3(0, 0, 0) },
        uRevealRadius: { value: isMobile ? 3.5 : 5.0 },
      },
      vertexShader: darknessVertexShader,
      fragmentShader: darknessFragmentShader,
      transparent: true,
      depthWrite: false, // Importante: não bloquear a profundidade
    });
  }, [isMobile]);

  useFrame(() => {
    if (ghostRef.current && maskMaterialRef.current) {
      // A máscara segue o fantasma
      maskMaterialRef.current.uniforms.uGhostPosition.value.lerp(
        ghostRef.current.position,
        0.1
      );
    }
  });

  const fontUrl =
    'https://fonts.gstatic.com/s/bebasneue/v14/JTUSjIg69CK48gW7PXoo9WlhyyTh89Y.woff2';

  return (
    <group>
      {/* 1. TEXTO BRANCO (Renderizado no fundo, Z = -1) */}
      <group position={[0, 0.2, -1]}>
        <Text
          font={fontUrl}
          fontSize={isMobile ? 0.1 : 0.11}
          position={[0, isMobile ? 1.4 : 1.6, 0]}
          letterSpacing={0.15}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          color="white" // Texto sempre branco
        >
          [ BRAND AWARENESS ]
        </Text>

        <group position={[0, 0.3, 0]}>
          <Text
            font={fontUrl}
            fontSize={isMobile ? 0.6 : 0.85}
            lineHeight={0.9}
            letterSpacing={0.02}
            textAlign="center"
            anchorX="center"
            anchorY="bottom"
            position={[0, 0.05, 0]}
            color="white"
          >
            VOCÊ NÃO VÊ
          </Text>
          <Text
            font={fontUrl}
            fontSize={isMobile ? 0.6 : 0.85}
            lineHeight={0.9}
            letterSpacing={0.02}
            textAlign="center"
            anchorX="center"
            anchorY="top"
            position={[0, -0.05, 0]}
            color="white"
          >
            O DESIGN.
          </Text>
        </group>

        <Text
          font={fontUrl}
          fontSize={isMobile ? 0.3 : 0.45}
          position={[0, isMobile ? -1.1 : -1.2, 0]}
          letterSpacing={0.05}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          color="white"
        >
          MAS ELE VÊ VOCÊ.
        </Text>
      </group>

      {/* 2. A CORTINA PRETA (Z = -0.5) */}
      {/* Fica entre o Fantasma (Z=0) e o Texto (Z=-1).
          Cobre a tela inteira e esconde o texto, exceto onde o fantasma está. */}
      <mesh position={[0, 0, -0.5]}>
        <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
        <primitive
          object={darknessMaterial}
          ref={maskMaterialRef}
          attach="material"
        />
      </mesh>
    </group>
  );
}
