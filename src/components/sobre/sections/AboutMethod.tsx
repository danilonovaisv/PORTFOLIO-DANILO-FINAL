'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';

import { useMotionGate } from '@/hooks/useMotionGate';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ResponsiveCaptionTrack } from '@/components/ui/ResponsiveCaptionTrack';
import { ABOUT_CONTENT } from '@/config/content';
// import { Container } from '@/components/layout/Container'; // Removed in favor of std-grid

import { motionTokens } from '@/config/about-motion';
import { DEFAULT_CAPTIONS, DEFAULT_VIDEO_POSTER } from '@/lib/video';

export default function AboutMethod() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMotionGate();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100svh] w-full flex-col bg-background lg:min-h-[110vh]"
      aria-label="Como Eu Trabalho"
    >
      {/* Background Video Container */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden flex justify-center">
        <motion.div
          style={{ y: 0 }}
          className="w-full h-full lg:h-[120%]"
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
            role="presentation"
          >
            <ResponsiveCaptionTrack src={DEFAULT_CAPTIONS} />
          </video>
        </motion.div>

        {/* Global Dark Gradient Overlay */}
        <div
          className="absolute inset-0 z-10 bg-linear-to-b from-[rgba(10,10,20,0.85)] via-[rgba(10,10,20,0.65)] to-[rgba(10,10,20,0.4)] md:bg-linear-to-r md:from-[rgba(10,10,20,0.85)] md:via-[rgba(10,10,20,0.65)] md:to-[rgba(10,10,20,0.4)]"
          aria-hidden="true"
        />
      </div>

      <div className="std-grid relative z-20 w-full h-full">
        <div className="flex h-full w-full flex-col pt-24 md:pt-28 lg:grid lg:grid-cols-12 lg:pt-24">
          {/* Content Area: Cols 2-7 (Span 6) */}
          <div className="w-full lg:col-start-2 lg:col-span-6 flex flex-col justify-center px-0 lg:pr-20 py-20 lg:py-32">
            <motion.div
              style={{ y: 0 }}
              className="flex w-full flex-col items-center lg:items-start"
            >
              <div className="w-full max-w-[44rem] px-6 py-7 lg:px-8 lg:py-9">
                <motion.p
                  variants={
                    prefersReducedMotion
                      ? {
                          hidden: { opacity: 0 },
                          visible: {
                            opacity: 1,
                            transition: {
                              duration: 0.9,
                              ease: [0.22, 1, 0.36, 1],
                            },
                          },
                        }
                      : motionTokens.fadeGhost
                  }
                  initial={prefersReducedMotion ? 'visible' : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  className="mb-4 text-center font-sans text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/55 lg:text-left"
                >
                  Processo criativo
                </motion.p>

                {/* Título */}
                <motion.div
                  variants={
                    prefersReducedMotion
                      ? {
                          hidden: { opacity: 0 },
                          visible: {
                            opacity: 1,
                            transition: {
                              duration: 0.9,
                              ease: [0.22, 1, 0.36, 1],
                            },
                          },
                        }
                      : motionTokens.fadeGhost
                  }
                  initial={prefersReducedMotion ? 'visible' : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
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
                  variants={
                    prefersReducedMotion
                      ? {
                          hidden: { opacity: 0 },
                          visible: {
                            opacity: 1,
                            transition: {
                              duration: 0.9,
                              ease: [0.22, 1, 0.36, 1],
                            },
                          },
                        }
                      : motionTokens.fadeGhost
                  }
                  initial={prefersReducedMotion ? 'visible' : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
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
                        staggerChildren: 0.12,
                        delayChildren: 0.4,
                      },
                    },
                  }}
                  initial={prefersReducedMotion ? 'visible' : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  className="flex w-full flex-col border-t border-bluePrimary/30 pt-0"
                >
                  {ABOUT_CONTENT.method.steps.map((step) => (
                    <motion.li
                      key={step.id}
                      variants={
                        prefersReducedMotion
                          ? {
                              hidden: { opacity: 0 },
                              visible: {
                                opacity: 1,
                                transition: {
                                  duration: 0.9,
                                  ease: [0.22, 1, 0.36, 1],
                                },
                              },
                            }
                          : motionTokens.riseSoft
                      }
                      className="group flex flex-row items-center gap-4 border-b border-bluePrimary/30 py-4 lg:gap-5 lg:py-5"
                    >
                      <span className="font-display text-xl md:text-2xl font-bold tabular-nums text-bluePrimary">
                        {String(step.id).padStart(2, '0')}
                      </span>
                      <p className="text-left text-base font-medium leading-[1.45] text-text transition-colors group-hover:text-blueAccent md:text-lg lg:text-xl">
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
