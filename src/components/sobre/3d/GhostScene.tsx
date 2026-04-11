'use client';

import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { GhostErrorBoundary } from '@/components/3d/GhostErrorBoundary';
import { useIsMobile } from '@/components/sobre/beliefs/BeliefSection';
import { useMotionGate } from '@/hooks/useMotionGate';
import GhostModel from './GhostModel';

interface GhostSceneProps {
  scrollProgress: MotionValue<number>;
  ghostIntensity: MotionValue<number>;
}

function GhostFallbackFigure() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg
        aria-hidden="true"
        viewBox="0 0 240 280"
        className="h-[92%] w-[92%] drop-shadow-[0_24px_40px_rgba(4,0,19,0.34)]"
      >
        <ellipse cx="120" cy="252" rx="58" ry="16" fill="rgba(4,0,19,0.18)" />
        <rect x="86" y="24" width="68" height="62" rx="8" fill="#151515" />
        <rect x="86" y="72" width="68" height="14" rx="4" fill="#9a2219" />
        <rect x="62" y="86" width="116" height="10" rx="5" fill="#111111" />
        <path
          d="M74 118c0-31 21-54 46-54h0c25 0 46 23 46 54v63c0 11-6 21-15 27l-9 6-10-12-12 15-13-16-11 13-10-6c-10-6-16-16-16-28v-62z"
          fill="#f8fbff"
        />
        <circle cx="104" cy="145" r="13" fill="#222222" />
        <circle cx="136" cy="145" r="13" fill="#222222" />
        <circle cx="108" cy="140" r="4" fill="#ffffff" />
        <circle cx="140" cy="140" r="4" fill="#ffffff" />
        <path
          d="M84 190c9 11 18 11 27 0 9 11 18 11 27 0 9 11 18 11 27 0"
          fill="none"
          stroke="#dfe8f6"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
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
      {!isMobile ? <Environment preset="studio" /> : null}

      <Suspense
        fallback={
          <mesh>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
          </mesh>
        }
      >
        <GhostModel
          intensity={ghostIntensity}
          scale={isMobile ? 1.4 : 1.8}
          position={[0, 0, 0]}
        />
      </Suspense>
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
      pointerX.set(nx * 5);
      pointerY.set(ny * 4.5);
    };

    window.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [isMobile, pointerX, pointerY]);

  const x = useTransform(
    scrollProgress,
    isMobile ? [0, 0.12, 0.82, 1] : [0, 1],
    isMobile ? ['-32vw', '-32vw', '-16vw', '0vw'] : ['0vw', '0vw']
  );
  const y = useTransform(
    scrollProgress,
    isMobile ? [0, 0.12, 0.82, 1] : [0, 1],
    isMobile ? ['-28vh', '-28vh', '-12vh', '0vh'] : ['0vh', '0vh']
  );
  const scale = useTransform(
    scrollProgress,
    isMobile ? [0, 0.08, 0.86, 1] : [0, 0.08, 0.82, 1],
    isMobile ? [0.95, 1, 1.02, 1.1] : [0.95, 1, 1.04, 1.1]
  );
  const opacity = useTransform(scrollProgress, [0.02, 0.12], [0, 1]);
  const filter = useTransform(
    scrollProgress,
    [0.02, 0.12],
    ['blur(12px)', 'blur(0px)']
  );
  const rotate = useTransform(
    scrollProgress,
    isMobile ? [0, 0.9, 1] : [0, 0.14, 1],
    isMobile ? [-5, -3, 0] : [-0.6, 0, 0]
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
        opacity,
        filter,
        rotate,
        transformOrigin: '50% 50%',
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
          className="relative h-[25vh] w-[38vw] min-w-[148px] max-w-[210px] md:h-[52vh] md:w-[28vw] md:min-w-[316px] md:max-w-[388px]"
        >
          <GhostFallbackFigure />
          <GhostErrorBoundary fallback={<div className="absolute inset-0" />}>
            <Canvas
              dpr={isMobile ? [1, 1.25] : [1, 1.5]}
              gl={{
                antialias: !isMobile,
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
          </GhostErrorBoundary>
        </div>
      </motion.div>
    </motion.div>
  );
};

export { GhostScene };
export default GhostScene;
