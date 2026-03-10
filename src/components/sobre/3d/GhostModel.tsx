// GhostModel.tsx
import * as THREE from 'three';
import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { MotionValue } from 'framer-motion';
import { useRealtimeAsset } from '@/hooks/useRealtimeAssets';
import { SITE_ASSET_KEYS } from '@/config/site-assets';
import { getSupabaseStorageUrl } from '@/lib/supabase/storage-url';

type GLTFResult = GLTF & {
  nodes: {
    Body_Ghost_White_0: THREE.Mesh;
    Eyes_Eyes_0: THREE.Mesh;
    Hat_Hat_Black_0: THREE.Mesh;
    Rim_Rim_Red_0: THREE.Mesh;
  };
  materials: {
    Ghost_White: THREE.MeshStandardMaterial;
    Eyes: THREE.MeshStandardMaterial;
    Hat_Black: THREE.MeshStandardMaterial;
    Rim_Red: THREE.MeshStandardMaterial;
  };
};

const GHOST_MODEL_URL = getSupabaseStorageUrl(
  'site-assets/about/beliefs/ghost.glb'
);

interface GhostModelProps {
  scrollProgress: MotionValue<number>;
  isMobile: boolean;
}

const GhostModel: React.FC<GhostModelProps> = ({
  scrollProgress,
  isMobile,
}) => {
  const group = useRef<THREE.Group>(null);
  const lastScrollRef = useRef(0);
  const scrollImpulseRef = useRef(0);
  const { viewport } = useThree();

  const { asset } = useRealtimeAsset(SITE_ASSET_KEYS.about.beliefs.ghostModel);
  const modelUrl = useMemo(() => {
    const assetUrl = asset?.publicUrl;
    if (!assetUrl) return GHOST_MODEL_URL;

    // Evita runtime 400 quando o CMS aponta para ghost-transformed.glb inexistente.
    if (assetUrl.includes('ghost-transformed.glb')) return GHOST_MODEL_URL;

    return assetUrl;
  }, [asset?.publicUrl]);

  const { nodes, materials } = useGLTF(modelUrl) as unknown as GLTFResult;

  // Configuração responsiva refinada para Mobile/Desktop - Posições Absolutas
  const config = useMemo(
    () => ({
      // Desktop: Centralizado (0)
      // Mobile: Posicionado no lado esquerdo para layout lado a lado
      // 🟣 [CONFIG VISUAL]: Posição Base X
      baseX: isMobile ? -viewport.width / 4.0 : 0,

      // Centralizado verticalmente no desktop, mas a 20% do topo no mobile (viewport.height / 2 é o topo, logo viewport.height * 0.3 = 20% abaixo)
      // 🟣 [CONFIG VISUAL]: Posição Base Y (Cima = Positivo em R3F)
      baseY: isMobile ? viewport.height * 0.3 : 0,

      // Intensidade flutuante (Movimento MUITO mais pronunciado)
      floatBase: isMobile ? 0.18 : 0.15,
      floatAmplitude: 0.75,
      tiltBase: 0.2,

      // Escala ajustada para maior presença
      // 🟣 [CONFIG VISUAL]: Escala Base - Tamanho inicial do Ghost
      baseScale: isMobile ? 0.378 : 0.585,
      // Compensa pivot do GLB para centralização visual
      modelOffsetY: isMobile ? -1.0 : -1.9,
      // 🟣 [CONFIG VISUAL]: Boost de Escala - Quanto o Ghost cresce na fase final
      scaleBoost: 0.15, // +15% no final
      scrollResponse: isMobile ? 0.65 : 0.85,
      scrollYResponse: isMobile ? 0.22 : 0.3,
      scrollZResponse: isMobile ? 0.45 : 0.55,
      scrollImpulseGain: isMobile ? 1.4 : 1.8,

      // Saída (Exit)
      // 🟣 [CONFIG VISUAL]: Posição de Saída Y - Define o quanto ele sobe ao sair da tela
      exitY: 6, // Sobe para sair
    }),
    [isMobile, viewport.width, viewport.height]
  );

  useFrame((state) => {
    if (!group.current) return;

    const scroll = THREE.MathUtils.clamp(scrollProgress.get(), 0, 1);
    const t = scroll;
    const enterProgress = THREE.MathUtils.clamp((scroll - 0.015) / 0.075, 0, 1);
    const finalPhaseProgress = THREE.MathUtils.clamp(
      (scroll - 0.85) / 0.12,
      0,
      1
    );
    const scrollDelta = scroll - lastScrollRef.current;
    lastScrollRef.current = scroll;
    const scrollKick = THREE.MathUtils.clamp(scrollDelta * 32, -0.65, 0.65);
    scrollImpulseRef.current = THREE.MathUtils.lerp(
      scrollImpulseRef.current,
      Math.min(1, Math.abs(scrollDelta) * 140),
      0.28
    );
    const scrollImpulse = scrollImpulseRef.current;

    // Sempre recomeça ao voltar no scroll: nenhuma fase fica "presa".
    // === ESCALA DINÂMICA (final: +15%) ===
    const baseScale = config.baseScale;
    const scaleFactor = 1 + config.scaleBoost * finalPhaseProgress;
    const targetScale = THREE.MathUtils.lerp(
      0.1,
      baseScale * scaleFactor,
      enterProgress
    );

    // Lerp scale
    group.current.scale.x = THREE.MathUtils.lerp(
      group.current.scale.x,
      targetScale,
      0.07
    );
    group.current.scale.y = THREE.MathUtils.lerp(
      group.current.scale.y,
      targetScale,
      0.07
    );
    group.current.scale.z = THREE.MathUtils.lerp(
      group.current.scale.z,
      targetScale,
      0.07
    );

    // === FINAL PHASE & EXIT ===
    const targetX = THREE.MathUtils.lerp(config.baseX, 0, finalPhaseProgress);
    const targetY = THREE.MathUtils.lerp(
      config.baseY,
      0, // Centered at the end
      finalPhaseProgress
    );

    // X Position Logic with Wiggle
    const wiggleX = isMobile
      ? Math.sin(state.clock.getElapsedTime() * 2.5) *
        config.floatAmplitude *
        0.5
      : 0;
    const scrollWaveX =
      Math.sin(t * Math.PI * 2.2) *
      config.scrollResponse *
      (0.25 + scrollImpulse * 0.75);
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      targetX + wiggleX + scrollWaveX + scrollKick * 0.5,
      0.06
    );

    // === POSIÇÃO Y/Z (profundidade e reação ao scroll) ===
    const scrollWaveY =
      Math.sin(t * Math.PI * 3.1) *
      config.scrollYResponse *
      (0.2 + scrollImpulse * 0.8);
    const yTargetWithScroll =
      targetY + scrollWaveY - Math.abs(scrollKick) * 0.08;
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      yTargetWithScroll,
      0.1
    );

    const scrollWaveZ =
      Math.cos(t * Math.PI * 2.2) *
      config.scrollZResponse *
      (0.2 + scrollImpulse * 0.9);
    const targetZ =
      Math.cos(t * Math.PI * 0.8) * 0.3 +
      scrollWaveZ +
      Math.abs(scrollKick) * 0.3;
    group.current.position.z = THREE.MathUtils.lerp(
      group.current.position.z,
      targetZ,
      0.06
    );

    // === TILT (mouse + scroll) ===
    const mouseTiltX = state.mouse.y * config.tiltBase;
    const mouseTiltZ = -state.mouse.x * config.tiltBase;

    // Scroll também afeta tilt (mais intenso no final + saída)
    const scrollTiltFactor =
      0.45 +
      t * (scroll > 0.95 ? 4 : 1.3 + finalPhaseProgress * 1.8) +
      scrollImpulse * 1.6;
    const scrollTiltX =
      Math.sin(t * Math.PI * 3) * config.tiltBase * 0.42 * scrollTiltFactor;
    const scrollTiltZ =
      Math.cos(t * Math.PI * 3) * config.tiltBase * 0.42 * scrollTiltFactor;
    const impulseTiltX = -scrollKick * config.scrollImpulseGain * 0.8;
    const impulseTiltZ = scrollKick * config.scrollImpulseGain * 0.6;

    const targetRotX = mouseTiltX + scrollTiltX + impulseTiltX;
    const targetRotZ = mouseTiltZ + scrollTiltZ + impulseTiltZ;

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetRotX,
      0.12
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      targetRotZ,
      0.12
    );

    // === Saltitante no final (wobble + bounce) ===
    if (finalPhaseProgress > 0.001) {
      const bounce = Math.sin(state.clock.getElapsedTime() * 6) * 0.035;
      const wobble = Math.sin(state.clock.getElapsedTime() * 4 + 1) * 0.025;

      // Se estiver saindo, reduz o wobble para focar na subida
      const exitDamp = (scroll > 0.95 ? 0.2 : 1) * finalPhaseProgress;

      group.current.position.y += bounce * exitDamp;
      group.current.rotation.x += wobble * exitDamp;
      group.current.rotation.z += wobble * 0.5 * exitDamp;
    }
  });

  return (
    <group ref={group} scale={0.1} dispose={null}>
      <group position={[0, config.modelOffsetY, 0]}>
        <Float
          speed={2.2}
          rotationIntensity={0.6}
          floatIntensity={0.5}
          floatingRange={[-config.floatBase, config.floatBase]}
        >
          <mesh
            name="Body_Ghost_White_0"
            castShadow
            receiveShadow
            geometry={nodes.Body_Ghost_White_0.geometry}
            material={materials.Ghost_White}
            position={[0, 1.5578, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <mesh
            name="Eyes_Eyes_0"
            castShadow
            receiveShadow
            geometry={nodes.Eyes_Eyes_0.geometry}
            material={materials.Eyes}
            position={[0, 1.5578, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <mesh
            name="Hat_Hat_Black_0"
            castShadow
            receiveShadow
            geometry={nodes.Hat_Hat_Black_0.geometry}
            material={materials.Hat_Black}
            position={[0, 2.9913, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <mesh
            name="Rim_Rim_Red_0"
            castShadow
            receiveShadow
            geometry={nodes.Rim_Rim_Red_0.geometry}
            material={materials.Rim_Red}
            position={[0, 2.3541, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        </Float>
      </group>
    </group>
  );
};

// Only preload in browser environment
if (typeof window !== 'undefined') {
  useGLTF.preload(GHOST_MODEL_URL);
}

export default GhostModel;
