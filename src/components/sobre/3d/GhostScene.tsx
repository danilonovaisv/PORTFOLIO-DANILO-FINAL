'use client';

// GhostScene.tsx
import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
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
        shadows={{ type: THREE.PCFShadowMap }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        // 🟣 [CONFIG VISUAL]: Câmera - Posição Z=6 define o quão perto/longe o objeto parece estar. FOV=35 define a distorção da perspectiva.
        camera={{ position: [0, 0, 6], fov: 35 }}
        frameloop={isInView ? 'always' : 'demand'}
        aria-hidden="true"
      >
        {/* Low Ambient for higher contrast shadows */}
        <ambientLight intensity={1.2} />

        {/* Strong Key Light (Front-Right) */}
        <spotLight
          position={[5, 10, 5]}
          angle={0.25}
          penumbra={0.2}
          intensity={2.5}
          castShadow
          shadow-bias={-0.0001}
        />

        {/* Fill Light (Left) - Soft */}
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#e6e6ff" />

        {/* Rim Light (Back) - Creates silhouette/separation */}
        <pointLight
          position={[0, 5, -10]}
          intensity={3}
          color="#ffffff"
          distance={20}
        />

        <Suspense fallback={null}>
          <GhostModel scrollProgress={scrollProgress} isMobile={isMobile} />
        </Suspense>
        {/* Stronger, grounded shadow */}
        {/* 🟣 [CONFIG VISUAL]: Sombra de contato - Scale=18 define o tamanho da mancha no chão. Opacity=0.6 a intensidade. */}
        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.6}
          scale={18}
          blur={2.5}
          far={5}
          color="#000000"
        />
      </Canvas>
    </motion.div>
  );
};

export default GhostScene;
