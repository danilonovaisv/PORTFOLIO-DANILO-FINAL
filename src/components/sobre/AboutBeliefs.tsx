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
    offset: ['start end', 'end end'], // Ajuste para que o scroll termine quando a seção termina no final da viewport
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
    <section
      ref={containerRef}
      className={`relative w-full overflow-hidden ${COLORS[0]}`} // Mantém a cor da primeira seção como padrão
    >
      {/* LAYER 1: Conteúdo Textual (Background Relative) */}
      <div className="relative pointer-events-none z-10"> {/* Adicionado z-10 para garantir que o texto fique sob o canvas, mas acima de outros backgrounds */}
        <BeliefFixedHeader opacity={headerOpacity} progress={scrollYProgress} />
        {PHRASES.map((phrase, index) => (
          <BeliefSection
            key={index}
            text={phrase}
            bgColor={COLORS[index]}
            isFirst={index === 0}
          />
        ))}
        {/* Passando o scrollYProgress para o BeliefFinalSection */}
        <BeliefFinalSection bgColor={FINAL_COLOR} scrollProgress={scrollYProgress} />
      </div>

      {/* LAYER 2: Canvas 3D (Overlay Top) */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto z-20"> {/* Mudei para pointer-events-auto para permitir interação com o mouse */}
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 0, 8], fov: 35 }} // Camera mais longe para reduzir tamanho visual
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
              {/* Passando o scrollYProgress para o GhostModel */}
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
    </section>
  );
};

export default AboutBeliefs;
