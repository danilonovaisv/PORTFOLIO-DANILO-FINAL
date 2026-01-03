'use client';

import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import GhostEyes from './GhostEyes';

// Conteúdo oficial do protótipo interativo
const BELIEFS_CONTENT = [
  {
    text: 'Acredito no design que muda o dia de alguém.',
    line2: 'Não pelo choque —',
    line3: 'mas pela conexão.',
  },
  {
    text: 'Um vídeo que respira.',
    line2: 'Uma marca que se reconhece.',
    line3: 'Um detalhe que fica.',
  },
  {
    text: 'Crio para gerar presença.',
    line2: 'Mesmo quando não estou ali.',
    line3: 'Mesmo quando ninguém percebe o esforço.',
  },
  {
    isClosing: true,
    text: 'Isso é ghost design.',
  },
];

// Ghost Motion Tokens
const GHOST_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Variante para frases time-based (não scroll)
const timeBasedFade = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.4, ease: GHOST_EASE },
  },
  exit: {
    opacity: 0,
    filter: 'blur(6px)',
    transition: { duration: 0.6, ease: GHOST_EASE },
  },
};

export function AboutBeliefs() {
  const prefersReducedMotion = useReducedMotion();
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);

  // Time-based: cada bloco aparece após delay (1s+ entre blocos)
  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    const timer = setTimeout(
      () => {
        if (currentBlockIndex < BELIEFS_CONTENT.length - 1) {
          setCurrentBlockIndex((prev) => prev + 1);
        }
      },
      currentBlockIndex === 0 ? 2000 : 1500
    );

    return () => clearTimeout(timer);
  }, [currentBlockIndex, isInView, prefersReducedMotion]);

  return (
    <section
      className="min-h-screen flex items-center justify-center text-center bg-[#040013] py-16 md:py-24 lg:py-32"
      aria-label="O que me move"
    >
      <motion.div
        onViewportEnter={() => setIsInView(true)}
        viewport={{ once: true, margin: '-20%' }}
        className="max-w-[780px] w-full px-6 md:px-8 flex flex-col items-center gap-8 md:gap-12 lg:gap-20"
      >
        {/* Blocos de texto - Aparecem por tempo, não por scroll */}
        <div className="space-y-16 min-h-[300px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {prefersReducedMotion ? (
              // Modo estático para reduced motion
              BELIEFS_CONTENT.map((block, index) => (
                <div key={index} className="space-y-2">
                  {block.isClosing ? (
                    <GhostDesignStatement />
                  ) : (
                    <>
                      <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-[#fcffff] leading-relaxed font-light">
                        {block.text}
                      </p>
                      {block.line2 && (
                        <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-[#fcffff] leading-relaxed font-light">
                          {block.line2}
                        </p>
                      )}
                      {block.line3 && (
                        <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-[#fcffff] leading-relaxed font-light">
                          {block.line3}
                        </p>
                      )}
                    </>
                  )}
                </div>
              ))
            ) : (
              <motion.div
                key={currentBlockIndex}
                variants={timeBasedFade}
                initial="hidden"
                animate="visible"
                className="space-y-2"
              >
                {BELIEFS_CONTENT[currentBlockIndex].isClosing ? (
                  <GhostDesignStatement />
                ) : (
                  <>
                    <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-[#fcffff] leading-relaxed font-light">
                      {BELIEFS_CONTENT[currentBlockIndex].text}
                    </p>
                    {BELIEFS_CONTENT[currentBlockIndex].line2 && (
                      <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-[#fcffff] leading-relaxed font-light">
                        {BELIEFS_CONTENT[currentBlockIndex].line2}
                      </p>
                    )}
                    {BELIEFS_CONTENT[currentBlockIndex].line3 && (
                      <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-[#fcffff] leading-relaxed font-light">
                        {BELIEFS_CONTENT[currentBlockIndex].line3}
                      </p>
                    )}
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Ghost Eyes - Aparece após todos os textos */}
        {(currentBlockIndex === BELIEFS_CONTENT.length - 1 ||
          prefersReducedMotion) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="w-full max-w-[280px] h-[200px] md:h-[260px] flex items-center justify-center"
          >
            <GhostEyes />
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

// Componente para o statement final "ISSO É GHOST DESIGN"
function GhostDesignStatement() {
  return (
    <div className="space-y-1 md:space-y-2">
      <p className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter text-[#fcffff]">
        ISSO É
      </p>
      <p className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter">
        <span className="text-[#0048ff]">GHOST</span>{' '}
        <span className="text-[#fcffff]">DESIGN.</span>
      </p>
    </div>
  );
}
