'use client';

import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// O Fragment Shader calcula a distância entre o pixel do texto e o fantasma
const revealFragmentShader = `
  varying vec3 vWorldPosition;
  uniform vec3 uGhostPosition;
  uniform float uRevealRadius;
  uniform vec3 uColor;
  uniform float uOpacity;

  void main() {
    float dist = distance(vWorldPosition.xy, uGhostPosition.xy);
    
    // Cria uma "lanterna": 1.0 (visível) perto do centro, 0.0 (invisível) longe
    // uRevealRadius define o tamanho da luz
    float alpha = 1.0 - smoothstep(uRevealRadius * 0.4, uRevealRadius, dist);
    
    // Aplica a opacidade calculada
    alpha = clamp(alpha, 0.0, 1.0) * uOpacity;
    
    gl_FragColor = vec4(uColor, alpha);
  }
`;

const revealVertexShader = `
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
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    // Configuramos o material do texto
    const shaderMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uGhostPosition: { value: new THREE.Vector3(0, 0, 0) },
                uRevealRadius: { value: 4.0 }, // Aumente este valor para aumentar a área iluminada
                uColor: { value: new THREE.Color('#ffffff') },
                uOpacity: { value: 1.0 },
            },
            vertexShader: revealVertexShader,
            fragmentShader: revealFragmentShader,
            transparent: true,
            depthWrite: false, // Importante para não bugar com o fantasma transparente
        });
    }, []);

    useFrame(() => {
        if (ghostRef.current && materialRef.current) {
            // Atualiza a posição da luz suavemente seguindo o fantasma
            materialRef.current.uniforms.uGhostPosition.value.lerp(
                ghostRef.current.position,
                0.1
            );
        }
    });

    // URL da fonte (pode ser substituído por uma fonte local em /public/fonts se preferir)
    const fontUrl =
        'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff';

    return (
        <group position={[0, -0.8, -1.5]}>
            {' '}
            {/* Z=-1.5 coloca o texto "no fundo", atrás do fantasma */}
            <Text
                font={fontUrl}
                fontSize={0.8}
                maxWidth={8}
                lineHeight={1.1}
                letterSpacing={-0.05}
                textAlign="center"
                anchorX="center"
                anchorY="middle"
            >
                <primitive object={shaderMaterial} attach="material" />
                Design, não é{'\n'}só estética.
            </Text>
            <Text
                font={fontUrl}
                fontSize={0.25}
                maxWidth={6}
                position={[0, -1.4, 0]}
                textAlign="center"
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.1}
            >
                <primitive object={shaderMaterial} attach="material" />[ É INTENÇÃO, É
                ESTRATÉGIA, É EXPERIÊNCIA ]
            </Text>
        </group>
    );
}
