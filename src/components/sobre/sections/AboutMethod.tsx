'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

import { useMotionGate } from '@/hooks/useMotionGate';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ResponsiveCaptionTrack } from '@/components/ui/ResponsiveCaptionTrack';
import { ABOUT_CONTENT } from '@/config/content';
// import { Container } from '@/components/layout/Container'; // Removed in favor of std-grid

import { motionTokens, motionSprings } from '@/config/about-motion';
import { DEFAULT_CAPTIONS, DEFAULT_VIDEO_POSTER } from '@/lib/video';

export default function AboutMethod() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMotionGate();
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
    prefersReducedMotion ? ['0%', '0%'] : ['-7%', '7%']
  );

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100svh] w-full flex-col bg-background lg:min-h-[110vh]"
      aria-label="Como Eu Trabalho"
    >
      {/* Background Video Container */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden flex justify-center">
        <motion.div
          style={{ y: isMobile ? 0 : videoParallaxY }}
          className="w-full h-full max-w-[1680px] lg:h-[120%]"
        >
          <video
            key={isMobile ? 'mobile' : 'desktop'}
            src={
              (isMobile
                ? ABOUT_CONTENT.method.videos.mobile
                : ABOUT_CONTENT.method.videos.desktop) || undefined
            }
            autoPlay={!prefersReducedMotion}
            loop={!prefersReducedMotion}
            muted
            playsInline
            poster={DEFAULT_VIDEO_POSTER}
            className={`w-full h-full ${
              isMobile
                ? 'object-cover object-center opacity-55'
                : 'object-cover object-center opacity-55'
            }`}
            aria-hidden="true"
          >
            <ResponsiveCaptionTrack src={DEFAULT_CAPTIONS} />
          </video>
        </motion.div>

        {/* Global Dark Gradient Overlay */}
        <div
          className="absolute inset-0 z-1 bg-linear-to-b from-background/95 via-background/58 to-background/92 md:bg-linear-to-r md:from-background/95 md:via-background/72 md:to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="std-grid relative z-10 w-full h-full">
        <div className="flex h-full w-full flex-col pt-24 md:pt-28 lg:grid lg:grid-cols-12 lg:pt-24">
          {/* Content Area: Cols 2-7 (Span 6) */}
          <div className="w-full lg:col-start-2 lg:col-span-6 flex flex-col justify-center px-0 lg:pr-20 py-20 lg:py-32">
            <motion.div
              style={{ y: textY }}
              className="flex w-full flex-col items-center lg:items-start"
            >
              <div className="w-full max-w-[44rem] rounded-[28px] border border-white/10 bg-[rgba(4,0,19,0.9)] px-6 py-7 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.88)] backdrop-blur-none lg:px-8 lg:py-9">
                <motion.p
                  variants={motionTokens.fadeGhost}
                  initial={prefersReducedMotion ? 'visible' : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: false, margin: '-20%' }}
                  className="mb-4 text-center font-sans text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/55 lg:text-left"
                >
                  Processo criativo
                </motion.p>

                {/* Título */}
                <motion.div
                  variants={motionTokens.fadeGhost}
                  initial={prefersReducedMotion ? 'visible' : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: false, margin: '-20%' }}
                  className="mb-6 text-center lg:mb-8 lg:text-left"
                >
                  <h2 className="font-display text-[clamp(2rem,4.8vw,4rem)] font-bold leading-[1.04] tracking-[-0.03em] text-text">
                    <span className="text-bluePrimary">Criatividade</span> com{' '}
                    <span className="text-bluePrimary">método</span>.
                    <br />
                    <span className="text-text">Impacto sem ruído.</span>
                  </h2>
                </motion.div>

                {/* Texto introdutório */}
                <motion.div
                  variants={motionTokens.fadeGhost}
                  initial={prefersReducedMotion ? 'visible' : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: false, margin: '-20%' }}
                  className="mb-8 max-w-[34rem] text-center text-h3 text-text lg:mb-10 lg:text-left"
                >
                  {ABOUT_CONTENT.method.intro.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </motion.div>

                {/* Steps List */}
                <motion.ul
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.1,
                      },
                    },
                  }}
                  initial={prefersReducedMotion ? 'visible' : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: false, margin: '-10%' }}
                  className="flex w-full flex-col border-t border-white/10 pt-3"
                >
                  {ABOUT_CONTENT.method.steps.map((step) => (
                    <motion.li
                      key={step.id}
                      variants={motionTokens.riseSoft}
                      className="group grid grid-cols-[auto_1fr] items-start gap-4 border-b border-white/10 py-4 last:border-b-0 lg:gap-5"
                    >
                      <span className="mt-0.5 inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-bluePrimary/35 bg-bluePrimary/10 px-3 font-bold tabular-nums text-bluePrimary">
                        {step.id}
                      </span>
                      <p className="border-l-2 border-bluePrimary/55 pl-4 text-left text-small font-medium leading-[1.45] text-text transition-colors group-hover:text-blueAccent md:text-body lg:text-body-enhanced">
                        {step.text}
                      </p>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          </div>

          {/* Ghost Visual Area Spacer (Reserved for columns 8-12) */}
          <div className="hidden lg:block lg:col-span-5" />
        </div>
      </div>
    </section>
  );
}
