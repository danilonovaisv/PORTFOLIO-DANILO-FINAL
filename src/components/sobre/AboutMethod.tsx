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
      className="relative w-full bg-background flex flex-col items-start md:items-center md:py-32"
      aria-label="Como Eu Trabalho"
    >
      {/* Background Video Container - Fixed height on Mobile to allow content to "exit" */}
      <div className="absolute top-0 left-0 w-full h-screen md:h-full z-0 overflow-hidden">
        <motion.div
          style={{ y: isMobile ? 0 : videoParallaxY }}
          className={`${isMobile ? 'h-full' : 'h-[120%]'} w-full`}
        >
          <motion.video
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
            className={`w-full h-full opacity-60 ${
              isMobile ? 'object-contain' : 'object-cover'
            }`}
            aria-hidden="true"
          />
        </motion.div>

        {/* Mobile Transition Gradient (Bottom) */}
        {isMobile ? (
          <div
            className="absolute bottom-0 left-0 w-full h-[40%] bg-linear-to-t from-background via-background/80 to-transparent z-1"
            aria-hidden="true"
          />
        ) : (
          /* Desktop Overlay */
          <div
            className="absolute inset-0 z-1 bg-linear-to-r from-[rgba(10,10,20,0.85)] via-[rgba(10,10,20,0.85)] to-[rgba(10,10,20,0.4)]"
            aria-hidden="true"
          />
        )}
      </div>

      <Container>
        <div className="relative z-10 pt-[50vh] pb-20 md:py-0 px-6 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            {/* Content - Starts at 50vh on Mobile */}
            <div className="col-span-1 md:col-span-6 lg:col-span-5 flex flex-col justify-center w-full">
              <motion.div style={{ y: textY }} className="w-full">
                {/* Títulos */}
                <motion.div
                  variants={motionTokens.fadeGhost}
                  initial={prefersReducedMotion ? 'visible' : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true, margin: '-20%' }}
                  className="mb-8 md:mb-10 text-center md:text-left"
                >
                  <h2 className="type-display text-white leading-[1.1] tracking-tight text-[32px] md:text-5xl lg:text-6xl">
                    <span className="text-primary block mb-1">
                      {ABOUT_CONTENT.method.title[0]}
                    </span>
                    <span className="text-white/40">
                      {ABOUT_CONTENT.method.title[1]}
                    </span>
                  </h2>
                </motion.div>

                {/* Texto introdutório */}
                <motion.div
                  variants={motionTokens.fadeGhost}
                  initial={prefersReducedMotion ? 'visible' : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true, margin: '-20%' }}
                  className="type-body text-white/70 leading-relaxed space-y-4 mb-12 md:mb-12 text-center md:text-left text-[16px] md:text-[17px] max-w-full"
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
                  className="flex flex-col gap-4 md:gap-4"
                >
                  {ABOUT_CONTENT.method.steps.map((step) => (
                    <motion.div
                      key={step.id}
                      variants={motionTokens.riseSoft}
                      className="
                        group flex items-center gap-6 
                        p-5 pr-6 rounded-r-xl rounded-l-none
                        border-l-[3px] border-primary
                        transition-all duration-300
                        bg-[rgba(26,26,46,0.85)] md:bg-transparent
                        md:hover:bg-white/5 md:hover:translate-x-2
                      "
                    >
                      <span
                        className="
                        flex h-10 w-10 shrink-0 items-center justify-center 
                        rounded-full bg-primary/20 text-primary font-bold text-sm
                        group-hover:bg-primary group-hover:text-white transition-colors duration-300
                      "
                      >
                        {step.id}
                      </span>
                      <p className="type-body text-white/80 group-hover:text-white transition-colors font-medium text-left">
                        {step.text}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
