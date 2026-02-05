// GhostScene.tsx
import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  ContactShadows,
} from '@react-three/drei';
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
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#e6e6ffa0" />

        {/* Rim Light (Back) - Creates silhouette/separation */}
        <pointLight position={[0, 5, -10]} intensity={3} color="#ffffff" distance={20} />



        <Suspense fallback={null}>
          <GhostModel scrollProgress={scrollProgress} isMobile={isMobile} />
        </Suspense>
        {/* Stronger, grounded shadow */}
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

