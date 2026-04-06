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
        speed={isMobile ? 0.9 : 0.98}
        rotationIntensity={0.035}
        floatIntensity={0.09}
        floatingRange={[-0.045, 0.045]}
      >
        <Center>
          <GhostModel
            intensity={ghostIntensity}
            scale={isMobile ? 0.29 : 0.47}
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
  const cursorX = useSpring(pointerX, {
    stiffness: 90,
    damping: 18,
    mass: 0.6,
  });
  const cursorY = useSpring(pointerY, {
    stiffness: 90,
    damping: 18,
    mass: 0.6,
  });

  useEffect(() => {
    if (isMobile) {
      pointerX.set(0);
      pointerY.set(0);
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      pointerX.set(nx * 7);
      pointerY.set(ny * 6);
    };

    window.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [isMobile, pointerX, pointerY]);

  const x = useTransform(
    scrollProgress,
    isMobile ? [0, 0.14, 0.9, 1] : [0, 1],
    isMobile ? ['-6vw', '-5vw', '-2vw', '0vw'] : ['0vw', '0vw']
  );
  const y = useTransform(
    scrollProgress,
    isMobile ? [0, 0.14, 0.9, 1] : [0, 1],
    isMobile ? ['6vh', '7vh', '4vh', '0vh'] : ['0vh', '0vh']
  );
  const scale = useTransform(
    scrollProgress,
    isMobile ? [0, 0.08, 0.9, 1] : [0, 0.08, 0.82, 1],
    isMobile ? [1, 1.04, 0.98, 1.04] : [0.95, 1, 1.01, 1.09]
  );
  const rotate = useTransform(
    scrollProgress,
    isMobile ? [0, 0.9, 1] : [0, 0.14, 1],
    isMobile ? [-4, -2, 0] : [-0.6, 0, 0]
  );
  const cursorRotateY = useTransform(cursorX, [-7, 7], [1.8, -1.8]);
  const cursorRotateX = useTransform(cursorY, [-6, 6], [-1.2, 1.2]);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <motion.div
      ref={containerRef}
      style={{
        x,
        y,
        scale,
        rotate,
        transformOrigin: isMobile ? '22% 20%' : '50% 50%',
      }}
      className="pointer-events-none flex h-full w-full items-center justify-center"
      aria-hidden="true"
    >
      <motion.div
        style={
          isMobile
            ? undefined
            : {
                x: cursorX,
                y: cursorY,
                rotateX: cursorRotateX,
                rotateY: cursorRotateY,
              }
        }
        className="pointer-events-none"
      >
        <div
          data-testid="ghost-figure"
          className="relative h-[25vh] w-[36vw] min-w-[140px] max-w-[196px] md:h-[52vh] md:w-[28vw] md:min-w-[316px] md:max-w-[388px]"
        >
          <Canvas
            dpr={[1, 1.5]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
            }}
            camera={{
              position: [0, 0.1, isMobile ? 15.6 : 11.2],
              fov: isMobile ? 18 : 14.5,
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
