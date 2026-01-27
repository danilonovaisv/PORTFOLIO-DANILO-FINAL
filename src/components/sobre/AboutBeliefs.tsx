'use client';

import React, { Suspense } from 'react';
import { cubicBezier, motion, useScroll, useTransform } from 'framer-motion';
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
  const headerOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.18, 0.82, 0.94],
    [0, 1, 1, 0],
    { ease: ghostEase }
  );

  // Fade-in do fundo base na entrada da seção
  const bgOpacity = useTransform(scrollYProgress, [0, 0.06, 0.12], [0, 0.6, 1]);

  // Fantasma fixo com fade-in/out sincronizado ao scroll
  const ghostOpacity = useTransform(
    scrollYProgress,
    [0.02, 0.12, 0.82, 0.94],
    [0, 1, 1, 0],
    { ease: ghostEase }
  );

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden">
      <motion.div
        aria-hidden
        className={`absolute inset-0 ${COLORS[0]}`}
        style={{ opacity: bgOpacity }}
      />
      {/* 
        LAYER 1: Canvas 3D (Background Fixed/Sticky) 
        Posicionado absolutamente/fixed por trás do conteúdo.
        Usamos sticky para ele acompanhar enquanto o pai estiver na viewport.
        h-screen garante que ocupe a janela toda.
      */}
      {/* 
        LAYER 1: Conteúdo Textual (Background Relative)
        O texto fica "atrás" visualmente ou no mesmo plano, mas o Canvas vai sobrepor.
        Para garantir leitura, o Canvas tem pointer-events-none.
      */}
      <div className="relative pointer-events-none z-10">
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

      {/* 
        LAYER 2: Canvas 3D (Overlay Top)
        Z-index maior que o texto.
        Sticky container para acompanhar o scroll.
      */}
      <motion.div
        aria-hidden
        className="fixed inset-0 w-full h-screen pointer-events-auto z-20"
        style={{ opacity: ghostOpacity }}
      >
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
            {/* Scale 0.6 para ser "menor". Rotation ajustada para frente. */}
            <GhostModel
              scrollProgress={scrollYProgress}
              scale={0.6}
              position={[0, -1, 0]}
              rotation={[0, 0, 0]}
            />
          </Suspense>
        </Canvas>
      </motion.div>
    </section>
  );
};

export default AboutBeliefs;
