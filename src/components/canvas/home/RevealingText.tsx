'use client';

import { useRef, useMemo, useCallback } from 'react';
import { Text, shaderMaterial } from '@react-three/drei';
import { useFrame, extend, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Shader de Revelação Corrigido - agora com distância 3D e suavização melhorada
const RevealMaterial = shaderMaterial(
  {
    uGhostPos: new THREE.Vector3(0, 0, 0),
    uRevealRadius: 4.0,
    uBaseColor: new THREE.Color('#ffffff'),
    uRevealColor: new THREE.Color('#00ffff'), // Azul ciano
    uOpacity: 1.0,
  },
  `
    varying vec3 vWorldPosition;
    void main() {
      vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform vec3 uGhostPos;
    uniform float uRevealRadius;
    uniform vec3 uBaseColor;
    uniform vec3 uRevealColor;
    uniform float uOpacity;
    varying vec3 vWorldPosition;

    void main() {
      float dist = distance(vWorldPosition, uGhostPos);
      float alpha = 1.0 - smoothstep(uRevealRadius * 0.3, uRevealRadius, dist);
      alpha = max(alpha, 0.0);

      // Mistura suave entre base e revelação
      vec3 finalColor = mix(uBaseColor, uRevealColor, alpha);
      gl_FragColor = vec4(finalColor, alpha * uOpacity);
    }
  `
);

extend({ RevealMaterial });

type RevealMaterialType = THREE.ShaderMaterial & {
  uGhostPos: THREE.Vector3;
  uRevealRadius: number;
  uBaseColor: THREE.Color;
  uRevealColor: THREE.Color;
  uOpacity: number;
};

declare module '@react-three/fiber' {
  interface ThreeElements {
    revealMaterial: any;
  }
}

export default function RevealingText({
  ghostRef,
  onReady,
}: {
  ghostRef: React.RefObject<THREE.Group | null>;
  onReady?: () => void;
}) {
  const titleMat = useRef<RevealMaterialType>(null);
  const subMat = useRef<RevealMaterialType>(null);
  const titleReady = useRef(false);
  const subReady = useRef(false);
  const readyNotified = useRef(false);
  const { viewport } = useThree();

  const isMobile = viewport.width < 5.5;

  const config = useMemo(
    () => ({
      titleSize: isMobile ? 0.55 : 1.2,
      subSize: isMobile ? 0.35 : 0.85,
      titleY: isMobile ? 0.35 : 0.5,
      subY: isMobile ? -0.35 : -0.4,
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

  const notifyReady = useCallback(() => {
    if (readyNotified.current || !titleReady.current || !subReady.current)
      return;
    readyNotified.current = true;
    onReady?.();
  }, [onReady]);

  const handleTitleSync = useCallback(() => {
    titleReady.current = true;
    notifyReady();
  }, [notifyReady]);

  const handleSubSync = useCallback(() => {
    subReady.current = true;
    notifyReady();
  }, [notifyReady]);

  // 🔧 CORRIGIDO: URL sem espaço no final
  const fontUrl =
    'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/fonts/TTNormsPro/TTNormsPro-Bold.otf';

  return (
    <group position={[0, 0, -1.5]}>
      {/* Título: "VOCÊ NÃO VÊ O DESIGN." */}
      <Text
        font={fontUrl}
        fontSize={config.titleSize}
        lineHeight={0.5}
        letterSpacing={config.letterSpacing}
        textAlign="center"
        position={[0, config.titleY, 0]}
        maxWidth={viewport.width * 0.5}
        anchorY="bottom"
        onSync={handleTitleSync}
      >
        VOCÊ NÃO VÊ{'\n'}O DESIGN.
        <revealMaterial
          ref={titleMat}
          transparent
          uBaseColor={new THREE.Color('#ffffff')}
          uRevealColor={new THREE.Color('#00ffff')} // Azul ciano
          uRevealRadius={config.radius}
          uOpacity={0.8} // Mais suave, como na imagem
        />
      </Text>

      {/* Subtítulo: "MAS ELE VÊ VOCÊ." */}
      <Text
        font={fontUrl}
        fontSize={config.subSize}
        letterSpacing={config.letterSpacing}
        textAlign="center"
        position={[0, config.subY, 0]}
        maxWidth={viewport.width * 0.9}
        anchorY="top"
        onSync={handleSubSync}
      >
        MAS ELE VÊ VOCÊ.
        <revealMaterial
          ref={subMat}
          transparent
          uBaseColor={new THREE.Color('#cccccc')}
          uRevealColor={new THREE.Color('#00ffff')} // Azul ciano
          uRevealRadius={config.radius}
          uOpacity={0.6} // Mais translúcido
        />
      </Text>
    </group>
  );
}
