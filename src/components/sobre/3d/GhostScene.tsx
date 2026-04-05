'use client';

import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, Environment, Float } from '@react-three/drei';
import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useIsMobile } from '@/components/sobre/beliefs/BeliefSection';
import { useMotionGate } from '@/hooks/useMotionGate';
import GhostModel from '@/components/sobre/3d/GhostModel';

interface GhostSceneProps {
  scrollProgress: MotionValue<number>;
  ghostIntensity: MotionValue<number>;
}

function GhostSceneContent({
  isMobile,
  ghostIntensity,
}: {
  isMobile: boolean;
  ghostIntensity: MotionValue<number>;
}) {
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
        speed={isMobile ? 1 : 1.08}
        rotationIntensity={0.05}
        floatIntensity={0.12}
        floatingRange={[-0.06, 0.06]}
      >
        <Center>
          <GhostModel
            intensity={ghostIntensity}
            scale={isMobile ? 0.34 : 0.42}
          />
        </Center>
      </Float>
    </>
  );
}

const GhostScene: React.FC<GhostSceneProps> = ({
  scrollProgress,
  ghostIntensity,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const shouldReduceMotion = useMotionGate();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const cursorX = useSpring(pointerX, { stiffness: 90, damping: 18, mass: 0.6 });
  const cursorY = useSpring(pointerY, { stiffness: 90, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (isMobile) {
      pointerX.set(0);
      pointerY.set(0);
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      pointerX.set(nx * 18);
      pointerY.set(ny * 14);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [isMobile, pointerX, pointerY]);

  const x = useTransform(scrollProgress, [0, 0.82, 1], isMobile
    ? ['-22vw', '-22vw', '0vw']
    : ['0vw', '0vw', '0vw']);
  const y = useTransform(scrollProgress, [0, 0.82, 1], isMobile
    ? ['-18vh', '-18vh', '0vh']
    : ['0vh', '0vh', '0vh']);
  const scale = useTransform(scrollProgress, [0.01, 0.12, 0.82, 1], isMobile
    ? [0.86, 0.9, 0.9, 0.99]
    : [0.95, 1, 1, 1.1]);
  const rotate = useTransform(scrollProgress, [0, 0.82, 1], isMobile
    ? [-4, -2, 0]
    : [-1.5, 0, 0]);
  const opacity = useTransform(scrollProgress, [0.01, 0.08], [0, 1]);
  const cursorRotateY = useTransform(cursorX, [-18, 18], [4, -4]);
  const cursorRotateX = useTransform(cursorY, [-14, 14], [-3, 3]);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <motion.div
      ref={containerRef}
      style={{ x, y, scale, rotate, opacity }}
      className="pointer-events-none flex h-full w-full items-center justify-center"
      aria-hidden="true"
    >
      <motion.div
        style={isMobile ? undefined : { x: cursorX, y: cursorY, rotateX: cursorRotateX, rotateY: cursorRotateY }}
        className="pointer-events-none"
      >
        <div
          data-testid="ghost-figure"
          className="relative h-[30vh] w-[42vw] min-w-[170px] max-w-[230px] md:h-[46vh] md:w-[24vw] md:min-w-[280px] md:max-w-[340px]"
        >
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          camera={{
            position: [0, 0.15, isMobile ? 14.5 : 12.2],
            fov: isMobile ? 20 : 16,
          }}
          className="absolute inset-0"
        >
          <GhostSceneContent
            isMobile={isMobile}
            ghostIntensity={ghostIntensity}
          />
        </Canvas>
        </div>
      </motion.div>
    </motion.div>
  );
};

export { GhostScene };
export default GhostScene;
