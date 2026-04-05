'use client';

import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, Environment, Float } from '@react-three/drei';
import { MotionValue, motion, useTransform } from 'framer-motion';
import { useIsMobile } from '@/components/sobre/beliefs/BeliefSection';
import { useMotionGate } from '@/hooks/useMotionGate';
import GhostModel from '@/components/sobre/3d/GhostModel';

interface GhostSceneProps {
  scrollProgress: MotionValue<number>;
}

function GhostSceneContent({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      <ambientLight intensity={1.4} />
      <directionalLight
        position={[4.5, 6, 6]}
        intensity={2.4}
        color="#ffffff"
      />
      <directionalLight
        position={[-5, 2, 4]}
        intensity={0.55}
        color="#4fe6ff"
      />
      <spotLight
        position={[0, 8, 8]}
        angle={0.34}
        penumbra={0.9}
        intensity={1.2}
        color="#ffffff"
      />
      <Environment preset="studio" />

      <Float
        speed={1.1}
        rotationIntensity={0.08}
        floatIntensity={0.16}
        floatingRange={[-0.08, 0.08]}
      >
        <Center>
          <GhostModel scale={isMobile ? 0.36 : 0.44} />
        </Center>
      </Float>
    </>
  );
}

const GhostScene: React.FC<GhostSceneProps> = ({ scrollProgress }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const shouldReduceMotion = useMotionGate();

  const x = useTransform(
    scrollProgress,
    [0, 0.82, 1],
    [isMobile ? '-9vw' : '0vw', '0vw', '0vw']
  );
  const y = useTransform(
    scrollProgress,
    [0, 0.82, 1],
    [isMobile ? '-10vh' : '0vh', '0vh', '-1vh']
  );
  const scale = useTransform(
    scrollProgress,
    [0.02, 0.14, 0.82, 1],
    [0.82, isMobile ? 0.92 : 1, isMobile ? 0.96 : 1.03, 1.08]
  );
  const rotate = useTransform(
    scrollProgress,
    [0, 0.82, 1],
    [isMobile ? -6 : -2, isMobile ? 3 : 2, 0]
  );

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <motion.div
      ref={containerRef}
      style={{ x, y, scale, rotate }}
      className="pointer-events-none flex h-full w-full items-center justify-center"
      aria-hidden="true"
    >
      <div
        data-testid="ghost-figure"
        className="relative h-[44vh] w-[44vw] min-w-[240px] max-w-[420px] md:h-[70vh] md:w-[38vw] md:min-w-[360px] md:max-w-[620px]"
      >
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          camera={{
            position: [0, 0.15, isMobile ? 16 : 13],
            fov: isMobile ? 23 : 18,
          }}
          className="absolute inset-0"
        >
          <GhostSceneContent isMobile={isMobile} />
        </Canvas>
      </div>
    </motion.div>
  );
};

export { GhostScene };
export default GhostScene;
