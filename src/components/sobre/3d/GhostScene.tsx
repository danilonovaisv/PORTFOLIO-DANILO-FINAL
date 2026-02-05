// GhostScene.tsx
import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import GhostModel from './GhostModel'; // Caminho relativo para GhostModel
import { MotionValue, motion, useTransform, cubicBezier } from 'framer-motion';
// Importar o hook do BeliefSection.tsx
import { useIsMobile } from '../beliefs/BeliefSection';

interface GhostSceneProps {
  scrollProgress: MotionValue<number>;
}

const GhostScene: React.FC<GhostSceneProps> = ({ scrollProgress }) => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  // Easing Ghost Padrão
  const ghostEase = cubicBezier(0.22, 1, 0.36, 1);

  // Sync com BeliefFixedHeader (range 0.1 ~ 0.2)
  const opacity = useTransform(scrollProgress, [0.1, 0.25], [0, 1], {
    ease: ghostEase,
  });
  const blur = useTransform(
    scrollProgress,
    [0.1, 0.25],
    ['blur(12px)', 'blur(0px)'],
    { ease: ghostEase }
  );

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity, filter: blur }}
      className="w-full h-full pointer-events-none"
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 6], fov: 35 }}
      >
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1.5}
          castShadow
        />
        <pointLight position={[-5, 5, -5]} intensity={1} />
        <Suspense fallback={null}>
          <GhostModel scrollProgress={scrollProgress} isMobile={isMobile} />
        </Suspense>
        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.2}
          scale={15}
          blur={2}
          far={4}
        />
      </Canvas>
    </motion.div>
  );
};

export default GhostScene;
