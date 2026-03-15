'use client';

// GhostScene.tsx
import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import GhostModel from '@/components/sobre/3d/GhostModel'; // Caminho relativo para GhostModel
import {
  MotionValue,
  motion,
  useTransform,
  cubicBezier,
  useInView,
} from 'framer-motion';
// Importar o hook do BeliefSection.tsx
import { useIsMobile } from '@/components/sobre/beliefs/BeliefSection';
import { useMotionGate } from '@/hooks/useMotionGate';

interface GhostSceneProps {
  scrollProgress: MotionValue<number>;
}

const GhostScene: React.FC<GhostSceneProps> = ({ scrollProgress }) => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: '200px' });
  const is3DDisabled = process.env.NEXT_PUBLIC_DISABLE_3D === 'true';
  const shouldReduceMotion = useMotionGate();

  // Easing Ghost Padrão
  const ghostEase = cubicBezier(0.22, 1, 0.36, 1);

  // Entrada mais rápida do Ghost 3D.
  const opacity = useTransform(scrollProgress, [0.015, 0.09], [0, 1], {
    ease: ghostEase,
  });
  const blur = useTransform(
    scrollProgress,
    [0.015, 0.09],
    ['blur(12px)', 'blur(0px)'],
    { ease: ghostEase }
  );

  if (is3DDisabled || shouldReduceMotion) {
    return (
      <motion.div
        ref={containerRef}
        style={{ opacity, filter: blur }}
        className="w-full h-full pointer-events-none"
      />
    );
  }

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity, filter: blur }}
      className="w-full h-full pointer-events-none"
    >
      <Canvas
        shadows={{ type: THREE.PCFSoftShadowMap }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        // 🟣 [CONFIG VISUAL]: Câmera - Posição Z=6
        camera={{ position: [0, 0, 6], fov: 35 }}
        frameloop={isInView ? 'always' : 'demand'}
        aria-hidden="true"
      >
        {/* Environment map é VITAL para dar profundidade e volume aos materiais PBS do GLTF */}
        <Environment preset="city" />

        <ambientLight intensity={1.5} />

        {/* Strong Key Light (Front-Right) com sombras suaves */}
        <spotLight
          position={[5, 8, 5]}
          angle={0.4}
          penumbra={0.5}
          intensity={3.5}
          castShadow
          shadow-bias={-0.0005}
        />

        {/* Fill Light (Left) - Soft */}
        <pointLight position={[-5, 5, -5]} intensity={1.2} color="#e6e6ff" />

        {/* Rim Light (Back) - Creates silhouette/separation */}
        <pointLight
          position={[0, 4, -8]}
          intensity={4}
          color="#ffffff"
          distance={25}
        />

        <Suspense fallback={null}>
          <GhostModel scrollProgress={scrollProgress} isMobile={isMobile} />
        </Suspense>

        {/* 🟣 [CONFIG VISUAL]: Sombra de contato */}
        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.8}
          scale={15}
          blur={2}
          far={5}
          color="#000000"
        />
      </Canvas>
    </motion.div>
  );
};

export default GhostScene;
