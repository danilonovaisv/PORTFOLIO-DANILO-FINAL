'use client';

import { useRef } from 'react';
import { m } from 'framer-motion';

import { useMotionGate } from '@/hooks/useMotionGate';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ResponsiveCaptionTrack } from '@/components/ui/ResponsiveCaptionTrack';
import { ABOUT_CONTENT } from '@/config/content';

import {
  ghostReveal,
  ghostRevealSimple,
  ghostFade,
  MOTION_TOKENS,
} from '@/config/motion';
import { DEFAULT_VIDEO_POSTER, DEFAULT_CAPTIONS } from '@/lib/video';

export default function AboutMethod() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMotionGate();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100svh] w-full flex-col bg-background lg:min-h-[110vh]"
      aria-labelledby="method-heading"
    >
      {/* Background Video Container */}
      <div className="absolute inset-0 w-full h-full z-[var(--z-layer-base)] overflow-hidden flex justify-center">
        <m.div className="w-full h-full lg:h-[120%]">
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
            role="presentation"
          >
            <ResponsiveCaptionTrack src={DEFAULT_CAPTIONS} />
          </video>
        </m.div>

        {/* Global Dark Gradient Overlay */}
        <div
          className="absolute inset-0 z-[var(--z-layer-glass)] bg-linear-to-b from-background/85 via-background/65 to-background/40 md:bg-linear-to-r md:from-background/85 md:via-background/65 md:to-background/40"
          aria-hidden="true"
        />
      </div>

      <div className="std-grid relative z-[var(--z-layer-content)] h-full w-full">
        <div className="flex h-full w-full flex-col pt-24 md:pt-28 lg:min-h-[110vh] lg:flex-row lg:pt-24">
          <div className="flex w-full flex-col justify-center py-20 lg:ml-[8.333333%] lg:w-1/2 lg:py-32 lg:pr-20">
            <m.div className="flex w-full flex-col items-center lg:items-start">
              <div className="w-full max-w-[44rem] py-7 lg:py-9">
                <m.p
                  variants={
                    prefersReducedMotion ? ghostRevealSimple : ghostReveal
                  }
                  initial={prefersReducedMotion ? 'visible' : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  className="mb-4 text-center font-sans text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/55 lg:text-left"
                >
                  Processo criativo
                </m.p>

                {/* Título */}
                <m.div
                  variants={
                    prefersReducedMotion ? ghostRevealSimple : ghostReveal
                  }
                  initial={prefersReducedMotion ? 'visible' : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  className="mb-6 text-center lg:mb-8 lg:text-left"
                >
                  <h2
                    id="method-heading"
                    className="font-display text-[clamp(2rem,4.8vw,4rem)] font-bold leading-[1.04] tracking-[-0.03em] text-text"
                  >
                    <span className="text-bluePrimary">Criatividade</span> com{' '}
                    <span className="text-bluePrimary">método</span>.
                    <br />
                    <span className="text-text">Impacto sem ruído.</span>
                  </h2>
                </m.div>

                {/* Texto introdutório */}
                <m.div
                  variants={
                    prefersReducedMotion ? ghostRevealSimple : ghostFade
                  }
                  initial={prefersReducedMotion ? 'visible' : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  className="mb-8 max-w-[34rem] text-center text-h3 text-text lg:mb-10 lg:text-left"
                >
                  {ABOUT_CONTENT.method.intro.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </m.div>

                {/* Steps List */}
                <m.ul
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: MOTION_TOKENS.stagger.relaxed,
                        delayChildren: MOTION_TOKENS.delay.medium,
                      },
                    },
                  }}
                  initial={prefersReducedMotion ? 'visible' : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  className="flex w-full flex-col border-t border-bluePrimary/30 pt-0"
                >
                  {ABOUT_CONTENT.method.steps.map((step) => (
                    <m.li
                      key={step.id}
                      variants={
                        prefersReducedMotion ? ghostRevealSimple : ghostReveal
                      }
                      className="group flex flex-row items-center gap-4 border-b border-bluePrimary/30 py-4 lg:gap-5 lg:py-5"
                    >
                      <span className="font-display text-xl md:text-2xl font-bold tabular-nums text-bluePrimary">
                        {String(step.id).padStart(2, '0')}
                      </span>
                      <p className="text-left text-base font-medium leading-[1.45] text-text transition-colors group-hover:text-blueAccent md:text-lg lg:text-xl">
                        {step.text}
                      </p>
                    </m.li>
                  ))}
                </m.ul>
              </div>
            </m.div>
          </div>

          <div className="hidden flex-1 lg:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
