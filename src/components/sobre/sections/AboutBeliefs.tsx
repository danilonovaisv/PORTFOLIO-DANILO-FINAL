'use client';

import React, { useRef } from 'react';
import { useScroll } from 'framer-motion';
import {
  BeliefSection,
  BeliefMobileTextLayer,
  BeliefMobileBackground,
  BeliefFinalSection,
  BeliefFinalSectionOverlay,
  BeliefFixedHeader,
} from '../beliefs';
import { BRAND } from '@/config/brand';
import GhostModel from '../3d/GhostModel';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { useWebGLSupport } from '@/hooks/useWebGLSupport';
import { useMotionGate } from '@/hooks/useMotionGate';
import { useBeliefsAnimation } from '@/hooks/useBeliefsAnimation';
import { motion } from 'framer-motion';

const PHRASES = [
  'Um\nvídeo\nque\nrespira.',
  'Uma\nmarca\nque se\nreconhece.',
  'Um\ndetalhe\nque\nfica.',
  'Crio\npara\ngerar\npresença.',
  'Mesmo\nquando\nnão\nestou\nali.',
  'Mesmo\nquando\nninguém\npercebe\no esforço.',
];

const COLORS = [
  BRAND.colors.bluePrimary,
  BRAND.colors.purpleDetails,
  BRAND.colors.pinkDetails,
  BRAND.colors.bluePrimary,
  BRAND.colors.purpleDetails,
  BRAND.colors.bluePrimary,
];

export function AboutBeliefs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const supportsWebGL = useWebGLSupport();
  const shouldReduceMotion = useMotionGate();
  // 3D only if WebGL supported + No Reduced Motion
  const shouldRender3D = supportsWebGL && !shouldReduceMotion;

  // Centralized Animation Hook
  const { backgroundColor, ghostIntensity, headerOpacity } = useBeliefsAnimation({
    scrollYProgress,
    totalPhrases: PHRASES.length,
    colors: COLORS,
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[750vh]"
    >
      {/* LAYER 0: Background - Z-0 */}
      <div className="absolute inset-0 bg-background" />
      {/* Shared animated background for Desktop */}
      <motion.div
        style={{ backgroundColor }}
        className="absolute inset-0 z-0 w-full h-full transition-colors duration-500 pointer-events-none hidden md:block"
      />
      {/* Shared animated background/colors for Mobile */}
      <BeliefMobileBackground
        colors={COLORS}
        scrollYProgress={scrollYProgress}
        finalColor={BRAND.colors.bluePrimary}
      />

      {/* LAYER 1: Ghost - Z-10 */}
      <div className="sticky top-0 h-screen w-full z-10 overflow-hidden pointer-events-none">
        {/* Desktop Ghost: Right Side (Cols 7-12) */}
        <div className="hidden md:grid std-grid h-full w-full">
          <div className="col-start-7 col-span-6 h-full flex items-center justify-center">
            {shouldRender3D ? (
              <div className="w-full h-[80%] relative">
                <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[2, 5, 2]} intensity={1} />
                  <GhostModel isMobile={false} intensity={ghostIntensity} scrollProgress={scrollYProgress} />
                  <Environment preset="city" />
                </Canvas>
              </div>
            ) : null}
          </div>
        </div>

        {/* Mobile Ghost: Left Side (Row with invisible text space mentally) */}
        {/* Composition: Ghost (Left 40%) / Space for Footer Text (Right) */}
        <div className="md:hidden absolute top-[15%] left-0 w-[40%] h-[40%]">
          {shouldRender3D ? (
            <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[2, 5, 2]} intensity={1} />
              <GhostModel isMobile={true} intensity={ghostIntensity} scrollProgress={scrollYProgress} />
              <Environment preset="city" />
            </Canvas>
          ) : null}
        </div>
      </div>

      {/* Content Scroller - Z-10 (Interleaved with Ghost mentally, but DOM-wise distinct) */}
      <div className="relative z-10 pointer-events-none">
        {PHRASES.map((phrase, index) => (
          <BeliefSection
            key={index}
            text={phrase}
            bgColor={COLORS[index] || COLORS[0]}
            isFirst={index === 0}
            isMobileTextLayer={true} // Mobile handled by footer layer
          />
        ))}

        <BeliefFinalSection
          scrollProgress={scrollYProgress}
          bgColor={BRAND.colors.bluePrimary}
        />
      </div>

      {/* LAYER 2: Sticky Header - Z-20 */}
      <BeliefFixedHeader scrollProgress={scrollYProgress} opacity={headerOpacity} />

      {/* LAYER 3: Mobile Footer Text - Z-20 */}
      <BeliefMobileTextLayer
        phrases={PHRASES}
        scrollYProgress={scrollYProgress}
      />

      {/* LAYER 4: Final Overlay - Z-30 */}
      <div className="absolute bottom-0 left-0 w-full h-screen pointer-events-none z-30">
        <BeliefFinalSectionOverlay />
      </div>
    </section>
  );
}
