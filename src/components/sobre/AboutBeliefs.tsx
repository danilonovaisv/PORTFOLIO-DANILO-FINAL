'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import GhostEyes from './GhostEyes';
import { motionTokens } from './motion';

export function AboutBeliefs() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.3, once: true });

  return (
    <section
      ref={sectionRef}
      className="bg-ghost-surface-deep relative overflow-hidden py-20 md:py-32"
      aria-label="O que me move"
    >
      <div className="w-full max-w-[1400px] px-6 relative z-10 mx-auto min-h-[50vh] flex flex-col justify-center">
        {/* Title - Static */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          variants={motionTokens.riseSoft}
          initial={prefersReducedMotion || !isInView ? 'visible' : 'hidden'}
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2 className="text-[30px] sm:text-[36px] md:text-[42px] lg:text-[56px] font-semibold text-white leading-[1.1] tracking-tight">
            Acredito no{' '}
            <span className="text-primary">design que muda o dia</span> de
            alguém.
            <br className="hidden md:block" />
            Não pelo choque,{' '}
            <span className="text-primary">mas pela conexão.</span>
          </h2>
        </motion.div>

        {/* Static Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column: Manifesto Texts */}
          <motion.div
            variants={motionTokens.fadeGhost}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col gap-8 md:gap-10 text-center lg:text-right items-center lg:items-end order-1 lg:order-1"
          >
            <div className="max-w-[480px]">
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
            </div>

            <div className="max-w-[480px]">
              <p className="text-[20px] md:text-[24px] text-white/90 leading-relaxed font-light">
                <span className="text-primary font-semibold">Crio</span> para
                gerar presença.
                <br />
                <span className="text-primary font-semibold">Mesmo</span> quando
                não estou ali.
                <br />
                <span className="text-white/60 text-[0.9em]">
                  Mesmo quando ninguém percebe o esforço.
                </span>
              </p>
            </div>
          </motion.div>

          {/* Right Column: Ghost Identity */}
          <motion.div
            variants={motionTokens.fadeGhost}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.2 }}
            className="flex flex-row items-center justify-center lg:justify-start gap-6 md:gap-8 order-2 lg:order-2"
          >
            {/* Ghost Icon */}
            <div className="w-28 h-28 md:w-40 md:h-40 xl:w-48 xl:h-48 relative shrink-0">
              <GhostEyes interactive={!prefersReducedMotion} />
            </div>

            {/* Typography */}
            <div className="text-left">
              <p className="font-black leading-[0.85] tracking-tighter">
                <span className="text-white block opacity-60 text-xs md:text-sm tracking-[0.35em] mb-2 md:mb-3 font-mono font-bold pl-1">
                  ISSO É
                </span>
                <span className="text-primary block glow-text text-[48px] md:text-[64px] xl:text-[80px]">
                  GHOST
                </span>
                <span className="text-white block text-[48px] md:text-[64px] xl:text-[80px]">
                  DESIGN.
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
