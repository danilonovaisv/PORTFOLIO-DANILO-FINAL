// GlassSceneLighting.tsx
import React, { useRef } from 'react';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import {
  Environment,
  RandomizedLight,
  AccumulativeShadows,
  Caustics,
  OrbitControls,
  EnvironmentProps,
} from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useControls } from 'leva';

// Definição das props para o componente de iluminação
type GlassSceneLightingProps = {
  children: React.ReactNode; // O modelo 3D que receberá esta iluminação
  environment?: EnvironmentProps['files']; // Caminho para o HDRI
  enableControls?: boolean; // Permitir controle da câmera manualmente (útil para debug)
  reduceMotion?: boolean; // Para acessibilidade
};

export default function GlassSceneLighting({
  children,
  environment = 'city', // Padrão para o preset do ambiente
  enableControls = false,
  reduceMotion = false,
}: GlassSceneLightingProps) {
  const { camera } = useThree(); // Acesso à câmera principal se necessário
  const causticsRef = useRef<any>(null);

  // Controles Leva para ajustar parâmetros de iluminação, efeitos, transformações do modelo e bloom
  const lightingConfig = useControls('Glass Lighting', {
    // --- Transformações do Modelo ---
    modelPosition: { x: 0, y: 0, z: 0 }, // Posição do modelo
    modelScale: { value: 1, min: 0.1, max: 3, step: 0.1 }, // Escala do modelo

    // --- Iluminação ---
    ambientIntensity: { value: 0.5 * Math.PI, min: 0, max: 5, step: 0.1 },
    pointLightIntensity: { value: Math.PI, min: 0, max: 5, step: 0.1 },
    pointLightPosition: { x: 5, y: 5, z: -10 }, // Posição da luz pontual principal
    randomizedLightAmount: { value: 8, min: 1, max: 20, step: 1 },
    randomizedLightRadius: { value: 10, min: 1, max: 20, step: 1 },
    randomizedLightAmbient: { value: 0.5, min: 0, max: 1, step: 0.1 },

    // --- Sombras ---
    accumulativeShadowsOpacity: { value: 1, min: 0, max: 2, step: 0.1 },
    accumulativeShadowsColor: '#FF8F20', // Cor das sombras acumuladas (laranja)
    accumulativeShadowsColorBlend: { value: 2, min: 0, max: 5, step: 0.1 },
    accumulativeShadowsScale: { value: 12, min: 1, max: 50, step: 1 },

    // --- Cáusticas ---
    causticsIntensity: { value: 0.1, min: 0, max: 1, step: 0.01 },
    causticsWorldRadius: { value: 0.1, min: 0.01, max: 1, step: 0.01 },
    causticsIor: { value: 1.8, min: 1, max: 3, step: 0.1 },
    causticsBackfaceIor: { value: 1.1, min: 1, max: 3, step: 0.1 },
    causticsColor: '#ffffff', // Cor base para as cáusticas

    // --- Bloom ---
    bloomEnabled: { value: true }, // Habilitar/desabilitar bloom
    bloomIntensity: { value: 1.5, min: 0, max: 5, step: 0.1 },
    bloomRadius: { value: 0.5, min: 0, max: 2, step: 0.1 },
    bloomThreshold: { value: 0.5, min: 0, max: 1, step: 0.01 },

    // --- Outros ---
    resolution: { value: 1024, min: 256, max: 2048, step: 256 },
  });

  return (
    <>
      {/* Luz ambiente geral */}
      <ambientLight intensity={lightingConfig.ambientIntensity} />

      {/* Luz pontual principal para criar brilhos e sombras direcionais */}
      <pointLight
        intensity={lightingConfig.pointLightIntensity}
        position={[
          lightingConfig.pointLightPosition.x,
          lightingConfig.pointLightPosition.y,
          lightingConfig.pointLightPosition.z,
        ]}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={100}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Sombras acumulativas para efeito suave e dinâmico */}
      <AccumulativeShadows
        temporal
        frames={reduceMotion ? 1 : 100} // Reduz frames se movimento for reduzido
        color={lightingConfig.accumulativeShadowsColor}
        colorBlend={lightingConfig.accumulativeShadowsColorBlend}
        toneMapped={true}
        alphaTest={0.7}
        opacity={lightingConfig.accumulativeShadowsOpacity}
        scale={lightingConfig.accumulativeShadowsScale}
        position={[0, -0.5, 0]} // Ajuste a posição conforme necessário
      >
        <RandomizedLight
          amount={lightingConfig.randomizedLightAmount}
          radius={lightingConfig.randomizedLightRadius}
          ambient={lightingConfig.randomizedLightAmbient}
          position={[5, 5, -10]} // Posição relativa para a luz aleatória
          bias={0.001}
        />
      </AccumulativeShadows>

      {/* Ambiente HDR para reflexos ricos */}
      <Environment preset={environment as any} files={environment} />

      {/* Grupo para aplicar transformações ao modelo */}
      <group
        position={[
          lightingConfig.modelPosition.x,
          lightingConfig.modelPosition.y,
          lightingConfig.modelPosition.z,
        ]}
        scale={lightingConfig.modelScale}
      >
        {/* Efeito de cáusticas envolto ao modelo */}
        <Caustics
          ref={causticsRef}
          backfaces
          color={lightingConfig.causticsColor}
          position={[0, -0.5, 0]} // Ajuste a posição das cáusticas
          lightSource={[5, 5, -10]} // Alinhe com a luz principal
          worldRadius={lightingConfig.causticsWorldRadius}
          ior={lightingConfig.causticsIor}
          backfaceIor={lightingConfig.causticsBackfaceIor}
          intensity={lightingConfig.causticsIntensity}
        >
          {/* O modelo filho será renderizado aqui dentro do efeito de cáustica */}
          {children}
        </Caustics>
      </group>

      {/* Efeito de Bloom (Brilho) */}
      {lightingConfig.bloomEnabled && ( // Renderiza o Bloom apenas se estiver habilitado
        <Bloom
          intensity={lightingConfig.bloomIntensity}
          radius={lightingConfig.bloomRadius}
          threshold={lightingConfig.bloomThreshold}
          mipmapBlur // Opcional: ativa o blur de mipmap para um efeito mais suave
        />
      )}

      {/* Controles Orbit (opcional, útil para debug) */}
      {enableControls && <OrbitControls makeDefault />}
    </>
  );
}
