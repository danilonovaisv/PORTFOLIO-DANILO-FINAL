'use client';
import React, { Suspense } from 'react';
import { cubicBezier, useScroll, useTransform } from 'framer-motion';
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
  'Mesmo\nquando\nninguém\npercebe\no esforço.',
];

const COLORS = [
  'bg-bluePrimary', // Azul Real
  'bg-purpleDetails', // Roxo Vibrante
  'bg-pinkDetails', // Rosa Choque
  'bg-bluePrimary', // Azul Real
  'bg-purpleDetails', // Roxo Vibrante
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
  // Ajustado para garantir visibilidade correta durante o scroll
  const headerOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.12, 0.85, 0.95],
    [0, 1, 1, 0],
    { ease: ghostEase }
  );

  return (
    <section
      ref={containerRef}
      className={`relative w-full ${COLORS[0]}`} // Removido overflow-hidden para corrigir behavior do sticky
    >
      {/* LAYER 1: Canvas 3D (Background/Middle - Sticky) */}
      {/* Z-Index 10: Fica atrás do texto, mas acima do background base das seções */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-auto">
          {/* pointer-events-auto no container sticky interno para capturar mouse */}
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
                scale={0.6}
                position={[0, -1, 0]}
                rotation={[0, 0, 0]}
              />
            </Suspense>
          </Canvas>
        </div>
      </div>

      {/* LAYER 2: Conteúdo Textual (Foreground) */}
      {/* Z-Index 20: Texto sobre o Ghost */}
      <div className="relative pointer-events-none z-20">
        <BeliefFixedHeader opacity={headerOpacity} progress={scrollYProgress} />
        {PHRASES.map((phrase, index) => (
          <BeliefSection
            key={index}
            text={phrase}
            bgColor={COLORS[index]}
            isFirst={index === 0}
          />
        ))}
        <BeliefFinalSection
          bgColor={FINAL_COLOR}
          scrollProgress={scrollYProgress}
        />
      </div>
    </section>
  );
};

export default AboutBeliefs;
