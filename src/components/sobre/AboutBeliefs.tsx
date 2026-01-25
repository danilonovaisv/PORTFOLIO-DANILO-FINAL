'use client';

import React, { useRef, Suspense } from 'react';
import { useScroll, useTransform, cubicBezier } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';

import { BeliefSection } from './BeliefSection';
import { BeliefFinalSection } from './BeliefFinalSection';
import { BeliefFixedHeader } from './BeliefFixedHeader';
import { GhostModel } from './GhostModel';

const PHRASES = [
  'Um \nvídeo \nque \nrespira.',
  'Uma \nmarca\n que se\n reconhece.',
  'Um \ndetalhe\n que \nfica.',
  'Crio \npara\n gerar\n presença.',
  'Mesmo\n quando\n ninguém \npercebe\n o esforço.',
];

// As cores originais eram usadas como background sólido.
// Para o efeito Ghost 3D, usaremos transparente para revelar o Canvas,
// mas podemos manter como referência se necessário futuramente.
const COLORS = [
  'bg-bluePrimary', // Azul Real
  'bg-purpleDetails', // Roxo Vibrante
  'bg-pinkDetails', // Rosa Choque
  'bg-bluePrimary', // Azul Real
  'bg-purpleDetails', // Roxo Vibrante
];

const FINAL_COLOR = 'bg-bluePrimary';

export function AboutBeliefs() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hook de Scroll do Framer Motion para controlar a rotação do fantasma
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
    <section
      ref={containerRef}
      className={`relative w-full bg-background`} // Fundo Deep Void
    >
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
      <div className="relative z-10 pointer-events-none">
        <BeliefFixedHeader opacity={headerOpacity} progress={scrollYProgress} />

        {PHRASES.map((phrase, index) => (
          <BeliefSection
            key={index}
            text={phrase}
            bgColor={COLORS[index]}
            isFirst={index === 0}
          />
        ))}

        <BeliefFinalSection bgColor={FINAL_COLOR} />
      </div>

      {/* 
        LAYER 2: Canvas 3D (Overlay Top)
        Z-index maior que o texto.
        Sticky container para acompanhar o scroll.
      */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
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
              {/* Scale 0.6 para ser "menor". Rotation ajustada para frente. */}
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
}

export default AboutBeliefs;
