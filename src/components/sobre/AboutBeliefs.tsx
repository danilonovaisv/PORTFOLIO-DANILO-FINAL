'use client';
import React, { Suspense } from 'react';
import { cubicBezier, useScroll, useTransform, useMotionValueEvent, MotionValue } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { BeliefSection } from './BeliefSection';
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

const COLORS = [
  'bg-bluePrimary', // Azul Real
  'bg-purpleDetails', // Roxo Vibrante
  'bg-pinkDetails', // Rosa Choque
  'bg-bluePrimary', // Azul Real
  'bg-purpleDetails', // Roxo Vibrante
  'bg-pinkDetails', // Rosa Choque
];

const FINAL_COLOR = 'bg-bluePrimary'; // Azul Real

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
      {/* LAYER 0: Background Color (Sticky) - Changes based on scroll */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <div className="sticky top-0 w-full h-screen">
          <BackgroundController
            progress={scrollYProgress}
            colors={COLORS}
            finalColor={FINAL_COLOR}
          />
        </div>
      </div>

      {/* LAYER 2: Conteúdo Textual (Foreground - Behind Ghost) */}
      {/* Z-Index 20: Texto fica abaixo do Ghost agora, conforme solicitado */}
      <div className="relative pointer-events-none z-20">
        <BeliefFixedHeader opacity={headerOpacity} progress={scrollYProgress} />

        {PHRASES.map((phrase, index) => (
          <BeliefSection
            key={index}
            text={phrase}
            // Pass transparent explicitly, BG handled by BackgroundController
            bgColor="bg-transparent"
            isFirst={index === 0}
          />
        ))}
        <BeliefFinalSection
          bgColor="bg-transparent"
          scrollProgress={scrollYProgress}
        />
      </div>

      {/* LAYER 3: Canvas 3D (Sticky - Top Layer) */}
      {/* Z-Index 30: FANTASMA ACIMA DO TEXTO */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-30">
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
            <Suspense fallback={null}>
              <GhostModel
                scrollProgress={scrollYProgress}
                position={[0, -1, 0]}
                rotation={[0, 0, 0]}
              />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </section>
  );
};

// Sub-component to handle background classes efficiently
const BackgroundController = ({
  progress,
  colors,
  finalColor,
}: {
  progress: MotionValue<number>;
  colors: string[];
  finalColor: string;
}) => {
  const [currentClass, setCurrentClass] = React.useState(colors[0]);

  useMotionValueEvent(progress, 'change', (latest: number) => {
    // 6 sections + 1 final. Range 0 to 1.
    const total = colors.length;
    const step = 0.8 / total; // ~0.133 per section, leaving 0.2 for final

    if (latest >= 0.8) {
      if (currentClass !== finalColor) setCurrentClass(finalColor);
    } else {
      const index = Math.floor(latest / step);
      const targetColor = colors[Math.min(index, total - 1)] || colors[0];
      if (currentClass !== targetColor) setCurrentClass(targetColor);
    }
  });

  return (
    <div
      className={`w-full h-full transition-colors duration-700 ease-in-out ${currentClass}`}
    />
  );
};

export default AboutBeliefs;
