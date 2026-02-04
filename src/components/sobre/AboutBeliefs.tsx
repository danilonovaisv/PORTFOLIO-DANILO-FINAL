'use client';
import React, { Suspense } from 'react';
import { cubicBezier, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, Center } from '@react-three/drei';
import { BeliefSection, BeliefMobileTextLayer } from './BeliefSection';
import { BeliefFinalSection } from './BeliefFinalSection';
import { BeliefFixedHeader } from './BeliefFixedHeader';
import { GhostModel } from './GhostModel';

const PHRASES = [
  'Um\nvídeo\nque\nrespira.',
  'Uma\nmarca\nque se\nreconhece.',
  'Um\ndetalhe\nque\nfica.',
  'Crio\npara\ngerar\npresença.',
  'Mesmo\nquando\nnão\nestou\nali.',
  'Mesmo\nquando\nninguém\npercebe\no esforço.',
];

import { BRAND } from '@/config/brand';

const COLORS = [
  BRAND.colors.bluePrimary,
  BRAND.colors.purpleDetails,
  BRAND.colors.pinkDetails,
  BRAND.colors.bluePrimary,
  BRAND.colors.purpleDetails,
  BRAND.colors.pinkDetails,
];

import { ProceduralGhost } from './ProceduralGhost';

class GLTFErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('GhostModel GLTF failed to load:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export const AboutBeliefs: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  // Easing Ghost Padrão
  const ghostEase = cubicBezier(0.22, 1, 0.36, 1);

  // Opacidade do Header Fixo
  const headerOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.12, 0.85, 0.95],
    [0, 1, 1, 0],
    { ease: ghostEase }
  );

  return (
    <section ref={containerRef} className="relative w-full">
      {/* LAYER 1: Backgrounds coloridos (Behind Everything) */}
      <div className="relative pointer-events-none z-10">
        <BeliefFixedHeader opacity={headerOpacity} progress={scrollYProgress} />

        {PHRASES.map((phrase, index) => (
          <BeliefSection
            key={index}
            text={phrase}
            bgColor={COLORS[index] || COLORS[0]}
            isFirst={index === 0}
          />
        ))}
        <BeliefFinalSection
          scrollProgress={scrollYProgress}
          bgColor={BRAND.colors.bluePrimary}
        />
      </div>

      {/* LAYER 2: Texto Mobile Fixed no Footer */}
      <BeliefMobileTextLayer
        phrases={PHRASES}
        scrollYProgress={scrollYProgress}
      />

      {/* LAYER 3: Canvas 3D (Sticky - Top Layer) */}
      {/* Z-Index 50: FANTASMA ACIMA DO TEXTO (GARANTIDO) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-50">
        <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-auto">
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 0, 8], fov: 35 }}
            gl={{ alpha: true, antialias: true }}
            className="w-full h-full"
          >
            <Environment preset="city" />
            <ambientLight intensity={0.8} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              intensity={1}
            />
            <Suspense
              fallback={
                <Center>
                  <ProceduralGhost />
                </Center>
              }
            >
              <GLTFErrorBoundary
                fallback={
                  <Center>
                    <ProceduralGhost />
                  </Center>
                }
              >
                <Center>
                  <GhostModel
                    scrollProgress={scrollYProgress}
                    position={[0, 0, 0]}
                    rotation={[0, 0, 0]}
                  />
                </Center>
              </GLTFErrorBoundary>
            </Suspense>
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default AboutBeliefs;
