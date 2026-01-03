'use client';

import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import GhostEyes from './GhostEyes';

// Conteúdo oficial do protótipo interativo
const BELIEFS_CONTENT = [
  [
    'Acredito no design que muda o dia de alguém.',
    'Não pelo choque —',
    'mas pela conexão.',
  ],
  [
    'Um vídeo que respira.',
    'Uma marca que se reconhece.',
    'Um detalhe que fica.',
  ],
  [
    'Crio para gerar presença.',
    'Mesmo quando não estou ali.',
    'Mesmo quando ninguém percebe o esforço.',
  ],
];

// Ghost Motion Tokens
const GHOST_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const timeBasedFade = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: GHOST_EASE },
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

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    const timer = setTimeout(
      () => {
        if (currentBlockIndex < BELIEFS_CONTENT.length - 1) {
          setCurrentBlockIndex((prev) => prev + 1);
        }
      },
      currentBlockIndex === 0 ? 1800 : 1500
    );

    return () => clearTimeout(timer);
  }, [currentBlockIndex, isInView, prefersReducedMotion]);

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center bg-ghost-surface-deep py-20 md:py-28 lg:py-32"
      aria-label="O que me move"
    >
      <div className="w-full max-w-[1200px] px-6 md:px-12 lg:px-20 grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <div className="flex flex-col justify-center min-h-[320px] text-center lg:text-left">
          <AnimatePresence mode="wait">
            {prefersReducedMotion ? (
              <div className="space-y-12">
                {BELIEFS_CONTENT.map((block, idx) => (
                  <div key={idx} className="space-y-2">
                    {block.map((line) => (
                      <p
                        key={line}
                        className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed font-light"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                key={currentBlockIndex}
                variants={timeBasedFade}
                initial="hidden"
                animate="visible"
                exit="exit"
                onViewportEnter={() => setIsInView(true)}
                viewport={{ once: true, margin: '-20%' }}
                className="space-y-2"
              >
                {BELIEFS_CONTENT[currentBlockIndex].map((line) => (
                  <p
                    key={line}
                    className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed font-light"
                  >
                    {line}
                  </p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Ghost Eyes - 2nd Column on desktop */}
        <motion.div
          variants={timeBasedFade}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col items-center gap-6 opacity-80"
        >
          <div className="flex items-center justify-center w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
            <GhostEyes interactive={true} />
          </div>
          <div className="space-y-1 text-center">
            <p className="text-xl md:text-2xl font-semibold tracking-tight text-white/90">
              ISSO É
            </p>
            <p className="text-xl md:text-2xl font-semibold tracking-tight">
              <span className="text-primary">GHOST</span>{' '}
              <span className="text-white/90">DESIGN.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
