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
      className="bg-background relative overflow-hidden py-20 md:py-32"
      aria-label="O que me move"
    >
      <div className="w-full max-w-[1440px] px-6 md:px-8 relative z-10 mx-auto min-h-[50vh] flex flex-col justify-center">
        {/* Title - Static */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          variants={motionTokens.riseSoft}
          initial={prefersReducedMotion || !isInView ? 'visible' : 'hidden'}
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[64px] font-bold text-white leading-[1.1] tracking-tight max-w-4xl mx-auto">
            Acredito no{' '}
            <span className="text-primary">design que muda o dia</span> de
            alguém.
            <br className="hidden md:block" />
            Não pelo choque,{' '}
            <span className="text-primary">mas pela conexão.</span>
          </h2>
        </motion.div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Manifesto Texts */}
          <div className="flex flex-col gap-8 md:gap-12 text-center lg:text-right items-center lg:items-end order-1 lg:order-1">
            <motion.div
              variants={motionTokens.fadeGhost}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 0.8 }}
              className="max-w-[520px]"
            >
              <p className="text-[20px] md:text-[24px] lg:text-[28px] text-white/90 leading-relaxed font-light">
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

            <motion.div
              variants={motionTokens.fadeGhost}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 1.6 }}
              className="max-w-[520px]"
            >
              <p className="text-[20px] md:text-[24px] lg:text-[28px] text-white/90 leading-relaxed font-light">
                <span className="text-primary font-semibold">Crio</span> para
                gerar presença.
                <br />
                <span className="text-primary font-semibold">Mesmo</span> quando
                não estou ali.
                <br />
                <span className="text-white/50 text-[0.8em] mt-2 block font-medium">
                  Mesmo quando ninguém percebe o esforço.
                </span>
              </p>
            </motion.div>
          </div>

          {/* Right Column: Ghost Identity */}
          <motion.div
            variants={motionTokens.fadeGhost}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 2.4 }}
            className="flex flex-row items-center justify-center lg:justify-start gap-6 md:gap-10 order-2 lg:order-2"
          >
            {/* Ghost Icon */}
            <div className="w-24 h-24 md:w-40 md:h-40 lg:w-48 lg:h-48 relative shrink-0">
              <GhostEyes interactive={!prefersReducedMotion} />
            </div>

            {/* Typography */}
            <div className="text-left">
              <p className="font-black leading-[0.85] tracking-tighter">
                <span className="text-white block opacity-60 text-xs md:text-sm tracking-[0.35em] mb-2 md:mb-4 font-mono font-bold pl-1">
                  ISSO É
                </span>
                <span className="text-primary block glow-text text-[42px] md:text-[64px] lg:text-[80px]">
                  GHOST
                </span>
                <span className="text-white block text-[42px] md:text-[64px] lg:text-[80px]">
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
