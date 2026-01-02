'use client';

import { Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';

// ============================================================================
// Shader da "Darkness Layer" (Cortina de Escuridão)
// CONCEITO: Renderizamos um Plane opaco na cor do fundo. Onde o Ghost
// estiver, o Alpha cai para 0 (transparente), revelando o texto.
// ============================================================================

const MASK_VERTEX_SHADER = `
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  
  void main() {
    vUv = uv;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const MASK_FRAGMENT_SHADER = `
  uniform vec3 uGhostPosition;
  uniform float uRevealRadius;
  uniform vec3 uBackgroundColor;
  uniform float uTime;
  
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  
  void main() {
    // Distância 2D entre o pixel atual e a posição do Ghost
    float dist = distance(vWorldPosition.xy, uGhostPosition.xy);
    
    // Pulso sutil no raio de revelação
    float dynamicRadius = uRevealRadius + sin(uTime * 2.0) * 0.2;
    
    // smoothstep: 
    //   - Se dist < dynamicRadius * 0.3 → alpha = 0.0 (buraco, transparente)
    //   - Se dist > dynamicRadius → alpha = 1.0 (opaco, cor do fundo)
    //   - Entre os dois: gradiente suave
    float alpha = smoothstep(dynamicRadius * 0.25, dynamicRadius, dist);
    
    // Adiciona leve fade nas bordas para suavizar
    alpha = pow(alpha, 0.9);
    
    // Pintar com a cor do fundo e aplicar a transparência
    gl_FragColor = vec4(uBackgroundColor, alpha);
  }
`;

// ============================================================================
// CONFIGURAÇÕES
// ============================================================================
const BACKGROUND_COLOR = '#050511'; // DEVE SER IDÊNTICO AO CANVAS BACKGROUND

// Fonte TTF local disponível no projeto
const FONT_ROBOTO_BLACK = '/fonts/RobotoBlack.ttf';
const FONT_ROBOTO_VARIABLE = '/fonts/Roboto-VariableFont_wdth,wght.ttf';

interface RevealingTextProps {
  ghostRef: React.RefObject<THREE.Group | null>;
}

export default function RevealingText({ ghostRef }: RevealingTextProps) {
  const maskMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport, size } = useThree();
  const isMobile = size.width < 768;

  // Criar o material da máscara uma vez
  const darknessMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uGhostPosition: { value: new THREE.Vector3(0, 0, 0) },
        uRevealRadius: { value: isMobile ? 2.0 : 3.2 },
        uBackgroundColor: { value: new THREE.Color(BACKGROUND_COLOR) },
        uTime: { value: 0 },
      },
      vertexShader: MASK_VERTEX_SHADER,
      fragmentShader: MASK_FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false, // CRÍTICO: não bloqueia depth
      depthTest: true,
      side: THREE.DoubleSide,
    });
  }, [isMobile]);

  useFrame((state) => {
    // Atualizar posição do Ghost no shader
    if (ghostRef.current && maskMaterialRef.current) {
      maskMaterialRef.current.uniforms.uGhostPosition.value.lerp(
        ghostRef.current.position,
        0.12
      );
      maskMaterialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  // ============================================================================
  // HIERARQUIA DE Z:
  //   - Texto: Z = -0.5 (mais distante da câmera)
  //   - Máscara: Z = -0.1 (na frente do texto, mas atrás do Ghost)
  //   - Ghost: Z ~ 0 (mais próximo da câmera)
  // ============================================================================

  return (
    <group>
      {/* ====================================================================
          1. GRUPO DO TEXTO (Z = -0.5)
          O texto é branco simples, usando fonte TTF local.
          ==================================================================== */}
      <group position={[0, 0, -0.5]}>
        {/* TAG - [ BRAND AWARENESS ] */}
        <Text
          fontSize={isMobile ? 0.08 : 0.09}
          position={[0, isMobile ? 1.1 : 1.35, 0]}
          letterSpacing={0.25}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          color="#ffffff"
          font={FONT_ROBOTO_VARIABLE}
        >
          [ BRAND AWARENESS ]
        </Text>

        {/* H1 - TÍTULO PRINCIPAL (Bold - usando Roboto Black) */}
        <Text
          fontSize={isMobile ? 0.38 : 0.62}
          lineHeight={1}
          textAlign="center"
          anchorX="center"
          anchorY="bottom"
          position={[0, 0.1, 0]}
          color="#ffffff"
          font={FONT_ROBOTO_BLACK}
        >
          você não vê
        </Text>
        <Text
          fontSize={isMobile ? 0.38 : 0.62}
          lineHeight={1}
          textAlign="center"
          anchorX="center"
          anchorY="top"
          position={[0, -0.05, 0]}
          color="#ffffff"
          font={FONT_ROBOTO_BLACK}
        >
          o design.
        </Text>

        {/* H2 - SUBTÍTULO (Regular) */}
        <Text
          fontSize={isMobile ? 0.22 : 0.32}
          position={[0, isMobile ? -0.85 : -1.0, 0]}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          color="#cccccc"
          font={FONT_ROBOTO_VARIABLE}
        >
          mas ele vê você.
        </Text>
      </group>

      {/* ====================================================================
          2. MÁSCARA DE ESCURIDÃO (Z = -0.1)
          Um Plane que cobre tudo com a cor do fundo, exceto onde o Ghost está.
          ==================================================================== */}
      <mesh position={[0, 0, -0.1]} renderOrder={10}>
        <planeGeometry args={[viewport.width * 2.5, viewport.height * 2.5]} />
        <primitive
          object={darknessMaterial}
          ref={maskMaterialRef}
          attach="material"
        />
      </mesh>
    </group>
  );
}
