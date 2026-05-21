'use client';

import { useRef } from 'react';
import { m } from 'motion/react';

import { useMotionGate } from '@/hooks/useMotionGate';
import { ResponsiveCaptionTrack } from '@/components/ui/ResponsiveCaptionTrack';
import { ABOUT_CONTENT } from '@/config/content';
import { ResponsiveVideo } from '@/components/ui/shared/ResponsiveVideo';
import { RESPONSIVE_VIDEOS } from '@/lib/video-assets';
import { getAssetUrl } from '@/lib/utils';

import {
  ghostReveal,
  ghostRevealSimple,
  ghostFade,
  MOTION_TOKENS,
} from '@/config/motion';
import { DEFAULT_VIDEO_POSTER, DEFAULT_CAPTIONS } from '@/lib/video';

export function AboutMethod() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useMotionGate();

  const activePosterDesk = getAssetUrl(DEFAULT_VIDEO_POSTER, {
    width: 1920,
    quality: 60,
  });
  const activePosterMobile = getAssetUrl(DEFAULT_VIDEO_POSTER, {
    width: 1080,
    quality: 60,
  });

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100svh] w-full flex-col bg-background lg:min-h-[110vh]"
      aria-labelledby="method-heading"
    >
      {/* Background Video Container */}
      <div className="absolute inset-0 z-[var(--z-layer-base)] h-full w-full overflow-hidden">
        <ResponsiveVideo
          ref={videoRef}
          desktopSrc={RESPONSIVE_VIDEOS.aboutMethod.desktop}
          mobileSrc={RESPONSIVE_VIDEOS.aboutMethod.mobile}
          desktopPoster={activePosterDesk}
          mobilePoster={activePosterMobile}
          breakpoint="(max-width: 1023px)"
          fitPolicy={RESPONSIVE_VIDEOS.aboutMethod.fitPolicy}
          autoPlay={!prefersReducedMotion}
          loop={!prefersReducedMotion}
          muted
          playsInline
          className="block h-full w-full object-contain object-center opacity-55"
          aria-hidden="true"
        >
          <ResponsiveCaptionTrack src={DEFAULT_CAPTIONS} />
        </ResponsiveVideo>

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
                    className="font-display text-display text-[clamp(2.25rem,6.8vw,4.5rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-text [text-shadow:0_0_12px_rgba(0,72,255,0.4),0_0_30px_rgba(0,72,255,0.2),0_4px_20px_rgba(4,0,19,0.85)]"
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
