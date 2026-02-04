
import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useScroll } from '@react-three/drei';
import * as THREE from 'three';

const Mesh = 'mesh' as any;

const GHOST_URL = 'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb';

const GhostModel: React.FC = () => {
  const group = useRef<THREE.Group>(null);
  const internalRef = useRef<THREE.Group>(null); 
  const scroll = useScroll();
  const { viewport } = useThree();

  // Carrega o modelo com os materiais originais do arquivo
  const { nodes, materials } = useGLTF(GHOST_URL) as any;

  useFrame((state) => {
    if (!group.current || !internalRef.current) return;

    const t = state.clock.getElapsedTime();
    const scrollOffset = scroll.offset;

    // Movimento de flutuação orgânico (bobbing)
    internalRef.current.position.y = Math.sin(t * 1.5) * 0.1;
    internalRef.current.position.x = Math.cos(t * 0.8) * 0.03;
    internalRef.current.rotation.z = Math.sin(t * 0.5) * 0.02;

    // Movimento vertical baseado no scroll (sobe conforme desce a página)
    const targetY = THREE.MathUtils.lerp(-1.0, 3.5, scrollOffset);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, 0.1);

    // Movimento horizontal leve
    const horizontalShift = Math.sin(scrollOffset * Math.PI) * 0.5;
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, horizontalShift, 0.05);

    // Rotação leve acompanhando o scroll
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, scrollOffset * Math.PI * 2, 0.05);

    // Parallax suave com o mouse
    const targetTiltX = state.mouse.y * 0.1;
    const targetTiltZ = -state.mouse.x * 0.1;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetTiltX, 0.1);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, targetTiltZ, 0.1);

    // Mantém a câmera focada na posição Y do Ghost
    state.camera.lookAt(0, group.current.position.y, 0);
  });

  const responsiveScale = Math.min(viewport.width / 4, 1.4);

  return (
    <group 
      ref={group} 
      scale={responsiveScale}
      dispose={null}
    >
      <group ref={internalRef}>
        {/* Corpo - Usando material original do arquivo Ghost_White */}
        <Mesh
          castShadow
          receiveShadow
          geometry={nodes.Body_Ghost_White_0.geometry}
          material={materials.Ghost_White}
          position={[0, 1.558, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        />

        {/* Olhos - Usando material original do arquivo Eyes */}
        <Mesh
          castShadow
          receiveShadow
          geometry={nodes.Eyes_Eyes_0.geometry}
          material={materials.Eyes}
          position={[0, 1.558, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        />

        {/* Cartola - Usando material original do arquivo Hat_Black */}
        <Mesh
          castShadow
          receiveShadow
          geometry={nodes.Hat_Hat_Black_0.geometry}
          material={materials.Hat_Black}
          position={[0, 2.991, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        />

        {/* Detalhe da cartola - Usando material original do arquivo Rim_Red */}
        <Mesh
          castShadow
          receiveShadow
          geometry={nodes.Rim_Rim_Red_0.geometry}
          material={materials.Rim_Red}
          position={[0, 2.354, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </group>
    </group>
  );
};

useGLTF.preload(GHOST_URL);

export default GhostModel;
