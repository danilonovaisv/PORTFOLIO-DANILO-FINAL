'use client';

import { useRef, useMemo } from 'react';
import { Text, shaderMaterial } from '@react-three/drei';
import { useFrame, extend, useThree, Object3DNode } from '@react-three/fiber';
import * as THREE from 'three';

// Material Shader
const RevealMaterial = shaderMaterial(
  {
    uGhostPos: new THREE.Vector3(0, 0, 0),
    uRevealRadius: 4.0,
    uColor: new THREE.Color('#ffffff'),
    uOpacity: 1.0,
  },
  `
    varying vec3 vPos;
    void main() {
      vPos = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * viewMatrix * vec4(vPos, 1.0);
    }
  `,
  `
    uniform vec3 uGhostPos;
    uniform float uRevealRadius;
    uniform vec3 uColor;
    uniform float uOpacity;
    varying vec3 vPos;

    void main() {
      float dist = distance(vPos.xy, uGhostPos.xy);
      float alpha = 1.0 - smoothstep(uRevealRadius * 0.3, uRevealRadius, dist);
      alpha = max(alpha, 0.0);
      gl_FragColor = vec4(uColor, alpha * uOpacity);
    }
  `
);

extend({ RevealMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    revealMaterial: Object3DNode<
      THREE.ShaderMaterial,
      typeof THREE.ShaderMaterial
    > & {
      uGhostPos?: THREE.Vector3;
      uRevealRadius?: number;
      uColor?: THREE.Color;
      uOpacity?: number;
      transparent?: boolean;
    };
  }
}

export default function RevealingText({
  ghostRef,
}: {
  ghostRef: React.RefObject<THREE.Group>;
}) {
  const titleMat = useRef<THREE.ShaderMaterial>(null);
  const subMat = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const isMobile = viewport.width < 5.5;

  const config = useMemo(
    () => ({
      titleSize: isMobile ? 0.6 : 1.1,
      subSize: isMobile ? 0.4 : 0.75,
      titleY: isMobile ? 0.3 : 0.5,
      subY: isMobile ? -0.3 : -0.35,
      radius: isMobile ? 3.5 : 6.0,
      letterSpacing: -0.05,
    }),
    [isMobile]
  );

  useFrame(() => {
    if (ghostRef.current) {
      const ghostPos = ghostRef.current.position;
      if (titleMat.current) titleMat.current.uGhostPos.copy(ghostPos);
      if (subMat.current) subMat.current.uGhostPos.copy(ghostPos);
    }
  });

  // SOLUÇÃO INFALÍVEL: Usar uma fonte do Google Fonts como fallback se a local falhar.
  // Assim o texto aparece sempre.
  const fontUrl =
    'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff';

  return (
    <group position={[0, 0, -1.5]}>
      {/* Título */}
      <Text
        font={fontUrl}
        fontSize={config.titleSize}
        lineHeight={1.0}
        letterSpacing={config.letterSpacing}
        textAlign="center"
        position={[0, config.titleY, 0]}
        maxWidth={viewport.width * 0.9}
        anchorY="bottom"
      >
        VOCÊ NÃO VÊ{'\n'}O DESIGN.
        <revealMaterial
          ref={titleMat}
          transparent
          uColor={new THREE.Color('#ffffff')}
          uRevealRadius={config.radius}
          uOpacity={1.0}
        />
      </Text>

      {/* Subtítulo */}
      <Text
        font={fontUrl}
        fontSize={config.subSize}
        letterSpacing={config.letterSpacing}
        textAlign="center"
        position={[0, config.subY, 0]}
        maxWidth={viewport.width * 0.9}
        anchorY="top"
      >
        MAS ELE VÊ VOCÊ.
        <revealMaterial
          ref={subMat}
          transparent
          uColor={new THREE.Color('#cccccc')}
          uRevealRadius={config.radius}
          uOpacity={0.9}
        />
      </Text>
    </group>
  );
}
