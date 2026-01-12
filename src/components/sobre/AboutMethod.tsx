'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ABOUT_CONTENT } from '@/config/content';
import { Container } from '@/components/layout/Container';

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
              isMobile
                ? ABOUT_CONTENT.method.videos.mobile
                : ABOUT_CONTENT.method.videos.desktop
            }
            autoPlay
            loop
            muted
            playsInline
            className={`w-full h-full ${
              isMobile
                ? 'object-cover object-[right_center] opacity-100'
                : 'object-cover opacity-100'
            }`}
            aria-hidden="true"
          />
        </motion.div>

        {/* Vertical Gradient Decay (Fim do vídeo no Mobile) */}
        {isMobile && (
          <div
            className="absolute bottom-0 left-0 w-full h-[50%] bg-linear-to-t from-background via-background/80 to-transparent z-1"
            aria-hidden="true"
          />
        )}

        {/* Desktop Editorial Overlay */}
        {!isMobile && (
          <div
            className="absolute inset-0 z-1 bg-linear-to-r from-[rgba(10,10,20,0.85)] via-[rgba(10,10,20,0.85)] to-[rgba(10,10,20,0.4)]"
            aria-hidden="true"
          />
        )}
      </div>

      <Container>
        <div className="relative z-10 w-full h-full">
          <div className="flex flex-col lg:grid lg:grid-cols-12 w-full h-full">
            {/* Content Area */}
            <div className="w-full lg:col-start-2 lg:col-span-6 flex flex-col justify-center px-5 md:px-6 lg:px-10 pt-[50vh] pb-16 lg:py-[100px]">
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
                  className="mb-8 lg:mb-10 text-center lg:text-left"
                >
                  <h2 className="text-white leading-[1.15] tracking-tight text-[32px] md:text-[36px] lg:text-[52px] font-bold">
                    <div>
                      <span className="text-primary">Criatividade</span>{' '}
                      <span className="text-white">com</span>{' '}
                      <span className="text-primary">método</span>.
                    </div>
                    <div>
                      <span className="text-white">Impacto</span>{' '}
                      <span className="text-white">sem</span>{' '}
                      <span className="text-white/40">ruído</span>.
                    </div>
                  </h2>
                </motion.div>

                {/* Texto introdutório */}
                <motion.div
                  variants={motionTokens.fadeGhost}
                  initial={prefersReducedMotion ? 'visible' : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true, margin: '-20%' }}
                  className="text-white leading-[1.6] space-y-4 mb-10 lg:mb-14 text-center lg:text-left text-[16px] md:text-[17px] lg:text-[20px] font-normal opacity-90 max-w-full lg:max-w-[520px]"
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
                  className="flex flex-col gap-3.5 md:gap-4 lg:gap-5 w-full"
                >
                  {ABOUT_CONTENT.method.steps.map((step) => (
                    <motion.div
                      key={step.id}
                      variants={motionTokens.riseSoft}
                      className="
                        group flex items-start gap-4 lg:gap-5 
                        p-4 md:p-5 lg:p-6 rounded-lg
                        border-l-[3px] border-primary
                        transition-all duration-300
                        bg-[rgba(26,26,46,0.85)] backdrop-blur-md
                        lg:hover:translate-x-2
                      "
                    >
                      <span className="text-primary font-bold text-lg lg:text-[18px]">
                        {step.id}
                      </span>
                      <p className="text-white/90 group-hover:text-white transition-colors font-normal text-left text-[16px] lg:text-[18px] leading-[1.5]">
                        {step.text}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Right Visual Area (Desktop Only) */}
            <div className="hidden lg:block lg:col-start-8 lg:col-span-5 h-full pointer-events-none" />
          </div>
        </div>
      </Container>
    </section>
  );
}
