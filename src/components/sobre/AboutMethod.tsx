'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ABOUT_CONTENT } from '@/config/content';
import { motionTokens, motionSprings } from './motion';

export default function AboutMethod() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, motionSprings.ghost);
  const effectiveProgress = prefersReducedMotion
    ? scrollYProgress
    : smoothProgress;

  const textY = useTransform(
    effectiveProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [16, -16]
  );

  const videoParallaxY = useTransform(
    effectiveProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : ['-10%', '10%']
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-background overflow-hidden flex items-center"
      aria-label="Como Eu Trabalho"
    >
      {/* Full Bleed Background Video */}
      <div className="absolute inset-0 z-0">
        <motion.div style={{ y: videoParallaxY }} className="h-[120%] w-full">
          <motion.video
            src={ABOUT_CONTENT.method.video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60"
            aria-hidden="true"
          />
        </motion.div>
        {/* Overlay Gradient Left -> Right */}
        <div
          className="absolute inset-0 bg-linear-to-r from-[rgba(10,10,20,0.85)] via-[rgba(10,10,20,0.85)] to-[rgba(10,10,20,0.4)] z-1"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 std-grid py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Content Left - 6 cols */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-center">
            <motion.div style={{ y: textY }} className="w-full">
              {/* Títulos */}
              <motion.div
                variants={motionTokens.fadeGhost}
                initial={prefersReducedMotion ? 'visible' : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, margin: '-20%' }}
                className="mb-8 md:mb-10 text-left"
              >
                <h2 className="type-display text-white leading-[1.1] tracking-tight">
                  <span className="text-primary block mb-1">
                    Criatividade com método.
                  </span>
                  <span className="text-white/40">Impacto sem ruído.</span>
                </h2>
              </motion.div>

              {/* Texto introdutório */}
              <motion.div
                variants={motionTokens.fadeGhost}
                initial={prefersReducedMotion ? 'visible' : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, margin: '-20%' }}
                className="type-body text-white/70 leading-relaxed space-y-4 mb-12 text-left"
              >
                {ABOUT_CONTENT.method.intro.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </motion.div>

              {/* Steps List */}
              <motion.div
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.12,
                    },
                  },
                }}
                initial={prefersReducedMotion ? 'visible' : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, margin: '-10%' }}
                className="flex flex-col gap-4"
              >
                {ABOUT_CONTENT.method.steps.map((step, i) => (
                  <motion.div
                    key={i}
                    variants={motionTokens.riseSoft}
                    className="
                      group flex items-center gap-6 
                      p-4 pr-6 rounded-r-xl rounded-l-none
                      bg-transparent
                      border-l-[3px] border-primary
                      hover:border-l-4
                      hover:bg-white/5 
                      hover:translate-x-2 
                      transition-all duration-300
                    "
                  >
                    <span
                      className="
                      flex h-10 w-10 shrink-0 items-center justify-center 
                      rounded-full bg-primary/20 text-primary font-bold text-sm
                      group-hover:bg-primary group-hover:text-white transition-colors duration-300
                    "
                    >
                      0{i + 1}
                    </span>
                    <p className="type-body text-white/80 group-hover:text-white transition-colors font-medium">
                      {step}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
