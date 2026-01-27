'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ABOUT_CONTENT } from '@/config/content';
// import { Container } from '@/components/layout/Container'; // Removed in favor of std-grid

import { motionTokens, motionSprings } from './motion';

export default function AboutMethod() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');

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
      className="relative w-full bg-background flex flex-col min-h-screen lg:min-h-[120vh]"
      aria-label="Como Eu Trabalho"
    >
      {/* Background Video Container */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
        <motion.div
          style={{ y: isMobile ? 0 : videoParallaxY }}
          className="w-full h-full lg:h-[120%]"
        >
          <video
            key={isMobile ? 'mobile' : 'desktop'}
            src={
              (isMobile
                ? ABOUT_CONTENT.method.videos.mobile
                : ABOUT_CONTENT.method.videos.desktop) || ''
            }
            autoPlay
            loop
            muted
            playsInline
            className={`w-full h-full ${
              isMobile
                ? 'object-cover object-center opacity-55'
                : 'object-cover object-right opacity-55'
            }`}
            aria-hidden="true"
          />
        </motion.div>

        {/* Global Dark Gradient Overlay */}
        <div
          className="absolute inset-0 z-1 bg-linear-to-b from-background via-background/40 to-background md:bg-linear-to-r md:from-background md:via-background/60 md:to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="std-grid relative z-10 w-full h-full">
        <div className="flex flex-col lg:grid lg:grid-cols-12 w-full h-full pt-[50vh] md:pt-[100px]">
          {/* Content Area */}
          <div className="w-full lg:col-span-8 flex flex-col justify-center px-0 lg:pr-20 py-20 lg:py-32">
            <motion.div
              style={{ y: textY }}
              className="w-full flex flex-col items-center lg:items-start"
            >
              {/* Título */}
              <motion.div
                variants={motionTokens.fadeGhost}
                initial={prefersReducedMotion ? 'visible' : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, margin: '-20%' }}
                className="mb-8 lg:mb-12 text-center lg:text-left"
              >
                <h2 className="font-display leading-[1.08] tracking-[-0.02em] text-[clamp(32px,5vw,64px)] font-bold">
                  <div className="text-white leading-tight">
                    <span className="text-bluePrimary">Criatividade</span> com{' '}
                    <span className="text-bluePrimary">método</span>.
                  </div>
                  <div className="text-white leading-tight">
                    Impacto sem ruído.
                  </div>
                </h2>
              </motion.div>

              {/* Texto introdutório */}
              <motion.div
                variants={motionTokens.fadeGhost}
                initial={prefersReducedMotion ? 'visible' : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, margin: '-20%' }}
                className="text-white type-h3 mb-12 lg:mb-16 text-center lg:text-left max-w-full lg:max-w-[550px]"
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
                      staggerChildren: 0.1,
                    },
                  },
                }}
                initial={prefersReducedMotion ? 'visible' : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, margin: '-10%' }}
                className="flex flex-col w-full border-t border-primary/40"
              >
                {ABOUT_CONTENT.method.steps.map((step) => (
                  <motion.div
                    key={step.id}
                    variants={motionTokens.riseSoft}
                    className="
                        group flex items-center gap-4 lg:gap-6 
                        bg-[rgba(26,26,46,0.85)] lg:bg-transparent
                        p-5 lg:py-6 lg:px-0
                        mb-4 lg:mb-0
                        rounded-xl lg:rounded-none
                        lg:border-b lg:border-primary/40
                        transition-all duration-300
                        hover:bg-primary/5
                      "
                  >
                    <span className="text-primary font-bold text-[16px] lg:text-[20px] tabular-nums">
                      {step.id}
                    </span>
                    <p className="text-white group-hover:text-primary transition-colors font-medium text-left text-[14px] md:text-[16px] lg:text-[20px] leading-[1.4]">
                      {step.text}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Ghost Visual Area Spacer (Reserved for the character on the right) */}
          <div className="hidden lg:block lg:col-span-4" />
        </div>
      </div>
    </section>
  );
}
