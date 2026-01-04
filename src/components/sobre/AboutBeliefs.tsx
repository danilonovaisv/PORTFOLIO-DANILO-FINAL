'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import GhostEyes from './GhostEyes';

// Ghost Motion Tokens
const GHOST_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeGhost = {
  hidden: { opacity: 0, y: 18, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: GHOST_EASE },
  },
};

export function AboutBeliefs() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [12, -12]
  );
  const ghostY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [40, -40]
  );

  return (
    <section
      ref={sectionRef}
      className="bg-ghost-surface-deep relative overflow-hidden py-20 md:py-24"
      aria-label="O que me move"
    >
      <div className="w-full max-w-[1200px] px-6 relative z-10 mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={fadeGhost}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2 className="text-[26px] sm:text-[30px] md:text-[36px] lg:text-[42px] font-semibold text-white leading-[1.2]">
            Acredito no{' '}
            <span className="text-primary">design que muda o dia</span> de
            alguém.
            <br className="hidden md:block" />
            Não pelo choque,{' '}
            <span className="text-primary">mas pela conexão.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 md:gap-12 items-center">
          {/* Phrases */}
          <motion.div
            style={{ y: textY }}
            variants={fadeGhost}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center lg:text-left max-w-[420px] mx-auto lg:mx-0"
          >
            <div className="space-y-1 text-[15px] md:text-[16px] text-white/90 leading-relaxed">
              <p>
                Um vídeo que <span className="text-primary">respira</span>.
              </p>
              <p>
                Uma marca que se <span className="text-primary">reconhece</span>
                .
              </p>
              <p>
                Um detalhe que <span className="text-primary">fica</span>.
              </p>
            </div>
            <div className="mt-6 space-y-1 text-[15px] md:text-[16px] text-white/90 leading-relaxed">
              <p>
                <span className="text-primary">Crio</span> para gerar presença.
              </p>
              <p>
                <span className="text-primary">Mesmo</span> quando não estou
                ali.
              </p>
              <p>
                <span className="text-primary">Mesmo</span> quando ninguém
                percebe o esforço.
              </p>
            </div>
          </motion.div>

          {/* Ghost + Manifesto */}
          <motion.div
            style={{ y: ghostY }}
            variants={fadeGhost}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex items-center justify-center lg:justify-end"
          >
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 relative">
                <GhostEyes interactive={!prefersReducedMotion} />
              </div>
              <div className="text-left">
                <p className="text-[28px] md:text-[36px] lg:text-[44px] font-semibold leading-[1.05] tracking-tight">
                  <span className="text-white block">ISSO É</span>
                  <span className="text-primary block">GHOST</span>
                  <span className="text-white block">DESIGN.</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
