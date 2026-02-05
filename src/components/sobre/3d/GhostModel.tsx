// GhostModel.tsx
import * as THREE from 'three';
import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { MotionValue } from 'framer-motion';

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

const GHOST_URL =
  'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb';

interface GhostModelProps {
  scrollProgress: MotionValue<number>;
  isMobile: boolean;
}

const GhostModel: React.FC<GhostModelProps> = ({
  scrollProgress,
  isMobile,
}) => {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const { nodes, materials } = useGLTF(GHOST_URL) as unknown as GLTFResult;

  // Configuração responsiva refinada para Mobile/Desktop - Posições Absolutas
  const config = useMemo(
    () => ({
      // Desktop: Centralizado (0)
      // Mobile: Canto esquerdo superior (ajuste negativo em X, positivo em Y)
      baseX: isMobile ? -viewport.width / 3.5 : 0,

      // Desktop: Centralizado (0)
      // Mobile: 17% do topo (alinhado com titulo)
      startY: isMobile ? viewport.height * 0.17 : 0,
      endY: isMobile ? viewport.height * 0.17 : 0, // Mantém posição fixa até o final

      // Intensidade flutuante
      floatBase: isMobile ? 0.08 : 0.05,
      floatAmplitude: 0.1,
      tiltBase: 0.15,
      // Escala ajustada
      baseScale: isMobile ? 0.22 : 0.35,
      scaleBoost: 0.1, // +10% apenas
      scrollResponse: isMobile ? 0.2 : 0.5,

      // Saída (Exit)
      exitY: 5, // Sobe para sair
    }),
    [isMobile, viewport.width, viewport.height]
  );

  const [isEntering, setIsEntering] = useState(true);
  const isFinalPhase = useRef(false);

  useEffect(() => {
    // Sincronização estrita com "Acredito no..." (0.1 ~ 0.2 no BeliefFixedHeader)
    const unsubscribe = scrollProgress.on('change', (val) => {
      if (val > 0.05 && isEntering) {
        setIsEntering(false);
      }
      // Final phase triggers warning/exit prep
      if (val > 0.85 && !isFinalPhase.current) {
        isFinalPhase.current = true;
      }
    });
    return () => unsubscribe();
  }, [scrollProgress, isEntering]);

  useFrame((state) => {
    if (!group.current) return;

    const scroll = scrollProgress.get();
    const t = Math.min(1, Math.max(0, scroll)); // Clamp entre 0 e 1

    // === ESCALA DINÂMICA (final: +10%) ===
    const baseScale = config.baseScale;
    const scaleFactor = 1 + (isFinalPhase.current ? config.scaleBoost : 0);
    const targetScale = baseScale * scaleFactor;

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
    let targetY = config.startY;
    let targetX = config.baseX;

    if (isFinalPhase.current) {
      // Fase Final: Centraliza X e Y
      targetX = 0;
      targetY = 0;
    }

    // Saída Suave (Exit Phase)
    // O CSS Sticky cuida da saída junto com o scroll da seção.
    // O Ghost permanece centralizado (0,0) e a seção o leva embora ao terminar.

    // Aplica Low Pass
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      targetY,
      0.1
    );

    // X Position Logic with Wiggle
    const wiggleX =
      Math.sin(state.clock.getElapsedTime() * 2.5) *
      config.floatAmplitude *
      0.5;
    const scrollDriftX =
      Math.sin(t * Math.PI * 2) * config.scrollResponse * 0.1;
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      targetX + wiggleX + scrollDriftX,
      0.06
    );

    // === POSIÇÃO Z (leve profundidade) ===
    const targetZ = Math.cos(t * Math.PI * 0.8) * 0.3;
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
      t * (scroll > 0.95 ? 4 : isFinalPhase.current ? 2.5 : 1);
    const scrollTiltX =
      Math.sin(t * Math.PI * 3) * config.tiltBase * 0.3 * scrollTiltFactor;
    const scrollTiltZ =
      Math.cos(t * Math.PI * 3) * config.tiltBase * 0.3 * scrollTiltFactor;

    const targetRotX = mouseTiltX + scrollTiltX;
    const targetRotZ = mouseTiltZ + scrollTiltZ;

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
    if (isFinalPhase.current) {
      const bounce = Math.sin(state.clock.getElapsedTime() * 6) * 0.035;
      const wobble = Math.sin(state.clock.getElapsedTime() * 4 + 1) * 0.025;

      // Se estiver saindo, reduz o wobble para focar na subida
      const exitDamp = scroll > 0.95 ? 0.2 : 1;

      group.current.position.y += bounce * exitDamp;
      group.current.rotation.x += wobble * exitDamp;
      group.current.rotation.z += wobble * 0.5 * exitDamp;
    }
  });

  // Escala de entrada (animação de fade-in + boost final)
  const targetScale =
    config.baseScale * (isFinalPhase.current ? 1 + config.scaleBoost : 1);
  const enterScale = isEntering ? 0.1 : config.baseScale;
  const currentScale = THREE.MathUtils.lerp(enterScale, targetScale, 0.07); // Lerp suave

  return (
    <group ref={group} scale={currentScale} dispose={null}>
      <Float
        speed={2.2}
        rotationIntensity={isFinalPhase.current ? 1.2 : 0.6}
        floatIntensity={isFinalPhase.current ? 1.0 : 0.5}
        floatingRange={[
          -config.floatBase * (isFinalPhase.current ? 1.5 : 1),
          config.floatBase * (isFinalPhase.current ? 1.5 : 1),
        ]}
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
  );
};

useGLTF.preload(GHOST_URL);
export default GhostModel;
