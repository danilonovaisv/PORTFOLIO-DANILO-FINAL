'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, MeshDistortMaterial } from '@react-three/drei';
import { MathUtils } from 'three';
import type { Group, Mesh } from 'three';
import type { MotionValue } from 'motion/react';

interface GhostModelProps {
  isMobile: boolean;
  shouldReduceMotion: boolean;
  scrollYProgress: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
}

export function GhostModel({
  isMobile,
  shouldReduceMotion,
  scrollYProgress,
  pointerX,
  pointerY,
}: GhostModelProps) {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  
  // O modelo e materiais são carregados via useGLTF. 
  // O GhostScene pai deve estar envolto em Suspense.
  // URL do GLB oficial no Supabase baseada na env var para maior resiliência
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://umkmwbkwvulxtdodzmzf.supabase.co';
  const GHOST_GLB_URL = `${supabaseUrl}/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb`;
  const { nodes, materials } = useGLTF(GHOST_GLB_URL) as any;

  useFrame((state) => {
    if (!groupRef.current || !meshRef.current) return;

    const progress = scrollYProgress.get();
    const isClimax = progress > 0.85;
    
    // 1. Definição de alvos (Target Positions) conforme Guia Visual
    // Mobile: Ghost à ESQUERDA, alinhado com o texto no rodapé
    // Desktop: Ghost à DIREITA, alinhado com o texto lateral
    // Climax: Centro absoluto
    const targetX = isClimax ? 0 : (isMobile ? -1.8 : 2.4);
    const targetY = isClimax ? 0 : (isMobile ? -1.2 : 0);
    
    // Base scale based on device
    const baseScale = isMobile ? 0.8 : 1.2;
    // Boost scale by 10% between 80% and 100% progress
    const scaleBoost = progress > 0.8 ? MathUtils.mapLinear(progress, 0.8, 1, 1, 1.1) : 1;
    // Climax size adjustment
    const climaxScale = isClimax ? (isMobile ? 1.4 : 1.8) : 1;
    
    const targetScale = baseScale * scaleBoost * climaxScale;
    
    // 2. Animações de Atmosfera (Floating & Parallax)
    const floatingFreq = isClimax ? 1.8 : 1.2;
    const floatingAmp = isClimax ? 0.15 : 0.2;
    const floating = Math.sin(state.clock.getElapsedTime() * floatingFreq) * floatingAmp;
    
    const parallaxFactor = shouldReduceMotion ? 0 : 0.45;

    // 3. Interpolação Suave (Lerp)
    groupRef.current.position.x = MathUtils.lerp(
      groupRef.current.position.x,
      targetX + pointerX.get() * parallaxFactor,
      0.06
    );
    
    groupRef.current.position.y = MathUtils.lerp(
      groupRef.current.position.y,
      targetY + floating + pointerY.get() * parallaxFactor,
      0.06
    );

    groupRef.current.scale.setScalar(
      MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.08)
    );

    // 4. Rotação e Respiração baseada em Scroll
    // Rotação em Y mais rápida no final
    const baseRotSpeed = 0.6;
    const rotSpeedBoost = progress > 0.8 ? MathUtils.mapLinear(progress, 0.8, 1, 1, 2.5) : 1;
    const targetRotY = (shouldReduceMotion ? 0 : pointerX.get() * 0.3) + 
                       Math.sin(state.clock.getElapsedTime() * baseRotSpeed * rotSpeedBoost) * 0.15;
    
    groupRef.current.rotation.y = MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      0.05
    );

    // 5. Wobble dinâmico (Distort)
    if (meshRef.current.material) {
      const distortBase = 0.4;
      const distortBoost = progress > 0.8 ? MathUtils.mapLinear(progress, 0.8, 1, 1, 1.8) : 1;
      (meshRef.current.material as any).distort = shouldReduceMotion ? 0 : distortBase * distortBoost;
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      <mesh
        ref={meshRef}
        geometry={nodes.Ghost.geometry}
        material={materials.GhostMaterial}
      >
        <MeshDistortMaterial
          {...materials.GhostMaterial}
          distort={shouldReduceMotion ? 0 : 0.4}
          speed={2.5}
          color="#ffffff"
          emissive="#0048ff"
          emissiveIntensity={0.6}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}

const supabaseUrlPreload = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://umkmwbkwvulxtdodzmzf.supabase.co';
useGLTF.preload(`${supabaseUrlPreload}/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb`);
