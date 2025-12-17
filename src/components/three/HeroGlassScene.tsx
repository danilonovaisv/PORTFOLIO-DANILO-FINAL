// HeroGlassScene.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, MeshTransmissionMaterial } from '@react-three/drei';
import { useControls } from 'leva';
import GlassSceneLighting from './GlassSceneLighting'; // Importe o novo componente

// Este componente será importado no HomeHero
export default function HeroGlassScene({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  const torusRef = useRef<any>(null);

  // Controles para ajustar o MATERIAL DE VIDRO (separado da iluminação)
  const materialProps = useControls('Glass Material', {
    thickness: { value: 0.5, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0.1, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1.8, min: 0, max: 10, step: 0.1 },
    chromaticAberration: { value: 0.05, min: 0, max: 1 },
    anisotropy: { value: 0.5, min: 0, max: 1, step: 0.1 },
    distortion: { value: 0.3, min: 0, max: 1, step: 0.1 },
    distortionScale: { value: 0.8, min: 0, max: 2, step: 0.1 },
    backside: { value: true },
    color: '#ffffff', // Cor base do vidro
    resolution: { value: 1024, min: 256, max: 2048, step: 256 }, // Resolução do material
  });

  // Carrega o modelo GLB
  const { nodes } = useGLTF('/media/torus_dan.glb');

  // Animação de rotação contínua
  useFrame(() => {
    if (torusRef.current && !reduceMotion) {
      torusRef.current.rotation.x += 0.005;
      torusRef.current.rotation.y += 0.003;
    }
  });

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{
        background: 'transparent',
        width: '100%',
        height: '100%',
      }}
      shadows
    >
      {/* Passa o modelo como filho para o componente de iluminação */}
      <GlassSceneLighting reduceMotion={reduceMotion} environment="city">
        {' '}
        {/* Pode trocar 'city' por um caminho para um HDRI personalizado */}
        <mesh ref={torusRef} {...nodes.Torus002}>
          {/* Aplica o material de vidro refinado */}
          <MeshTransmissionMaterial
            {...materialProps}
            resolution={materialProps.resolution}
            toneMapped={false}
          />
        </mesh>
      </GlassSceneLighting>

      {/* Adiciona interação de parallax com o mouse (opcional, conforme especificação) */}
      <ParallaxMouseInteraction reduceMotion={reduceMotion} />
    </Canvas>
  );
}

// Componente auxiliar para adicionar efeito de parallax com o mouse
function ParallaxMouseInteraction({ reduceMotion }: { reduceMotion: boolean }) {
  const { camera, size } = useThree();
  const mouse = useRef([0, 0]);

  useEffect(() => {
    if (reduceMotion) return;

    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / size.width) * 2 - 1;
      const y = -(event.clientY / size.height) * 2 + 1;
      mouse.current = [x, y];
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [size, reduceMotion]);

  useFrame(() => {
    if (reduceMotion || !camera) return;

    // Aplica um leve movimento de parallax à câmera
    const speed = 0.5; // Ajuste a velocidade do parallax aqui
    camera.position.x = mouse.current[0] * speed;
    camera.position.y = mouse.current[1] * speed;
    camera.lookAt(0, 0, 0);
  });

  return null;
}
