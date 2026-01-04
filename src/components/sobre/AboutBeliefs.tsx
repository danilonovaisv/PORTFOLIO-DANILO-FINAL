'use client';

import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useReducedMotion,
  AnimatePresence,
  useInView,
} from 'framer-motion';
import GhostEyes from './GhostEyes';
import { motionTokens, GHOST_EASE } from './motion';

export function AboutBeliefs() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Rotating logic
  const [step, setStep] = useState(0);
  const isInView = useInView(sectionRef, { amount: 0.3, once: true });

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    // Total steps: 0 (Phrase 1), 1 (Phrase 2), 2 (Ghost Reveal)
    const totalSteps = 2;

    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev >= totalSteps) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 4200);

    return () => clearInterval(interval);
  }, [isInView, prefersReducedMotion]);

  // If reduced motion, show final state immediately
  useEffect(() => {
    if (prefersReducedMotion && isInView) {
      setStep(2);
    }
  }, [prefersReducedMotion, isInView]);

  return (
    <section
      ref={sectionRef}
      className="bg-ghost-surface-deep relative overflow-hidden py-20 md:py-24"
      aria-label="O que me move"
    >
      <div className="w-full max-w-[1200px] px-6 relative z-10 mx-auto min-h-[50vh] flex flex-col justify-center">
        {/* Title - Static */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={motionTokens.riseSoft}
          initial={prefersReducedMotion || !isInView ? 'visible' : 'hidden'}
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2 className="text-[30px] sm:text-[36px] md:text-[36px] lg:text-[42px] font-semibold text-white leading-[1.2]">
            Acredito no{' '}
            <span className="text-primary">design que muda o dia</span> de
            alguém.
            <br className="hidden md:block" />
            Não pelo choque,{' '}
            <span className="text-primary">mas pela conexão.</span>
          </h2>
        </motion.div>

        {/* Rotating Content */}
        <div className="relative h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="phrase-1"
                initial={{ opacity: 0, filter: 'blur(8px)', y: 18 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                exit={{ opacity: 0, filter: 'blur(8px)', y: -18 }}
                transition={{ duration: 0.8, ease: GHOST_EASE }}
                className="absolute text-center max-w-[480px]"
              >
                <p className="text-[20px] md:text-[24px] text-white/90 leading-relaxed font-light">
                  Um vídeo que{' '}
                  <span className="text-primary font-semibold">respira</span>.
                  <br />
                  Uma marca que se{' '}
                  <span className="text-primary font-semibold">reconhece</span>.
                  <br />
                  Um detalhe que{' '}
                  <span className="text-primary font-semibold">fica</span>.
                </p>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="phrase-2"
                variants={motionTokens.timeBased}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute text-center max-w-[480px]"
              >
                <p className="text-[20px] md:text-[24px] text-white/90 leading-relaxed font-light">
                  <span className="text-primary font-semibold">Crio</span> para
                  gerar presença.
                  <br />
                  <span className="text-primary font-semibold">Mesmo</span>{' '}
                  quando não estou ali.
                </p>
              </motion.div>
            )}

            {step >= 2 && (
              <motion.div
                key="ghost-reveal"
                variants={motionTokens.fadeGhost}
                initial="hidden"
                animate="visible"
                transition={{ duration: 1.2 }}
                className="flex flex-col md:flex-row items-center justify-center gap-6"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 relative">
                  <GhostEyes interactive={!prefersReducedMotion} />
                </div>
                <div className="text-center md:text-left">
                  <p className="text-[28px] md:text-[40px] font-semibold leading-none tracking-tight">
                    <span className="text-white block opacity-60 text-lg md:text-xl tracking-[0.2em] mb-2 font-mono">
                      ISSO É
                    </span>
                    <span className="text-primary block glow-text">GHOST</span>
                    <span className="text-white block">DESIGN.</span>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
