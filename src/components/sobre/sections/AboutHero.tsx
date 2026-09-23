'use client';

import { useRef } from 'react';
import { m, useScroll, useTransform } from 'motion/react';
import { useMotionGate } from '@/hooks/useMotionGate';

import { ABOUT_CONTENT } from '@/config/content';
import {
  titleLineVariants,
  subtitleVariants,
  staggerContainer,
} from '@/lib/motion';

import { DEFAULT_VIDEO_POSTER } from '@/lib/video';
import { getAssetUrl } from '@/lib/utils';
import { ResponsiveVideo } from '@/components/ui/shared/ResponsiveVideo';
import { RESPONSIVE_VIDEOS } from '@/lib/video-assets';

export function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.4], [0, -40]);
  const blur = useTransform(scrollYProgress, [0, 0.3], [0, 8]);

  const prefersReducedMotion = useMotionGate();
  const shouldPlayVideo = !prefersReducedMotion;

  const activePosterDesk = getAssetUrl(DEFAULT_VIDEO_POSTER, {
    width: 1920,
    quality: 60,
  });
  const activePosterMobile = getAssetUrl(DEFAULT_VIDEO_POSTER, {
    width: 1080,
    quality: 60,
  });

  const heroSrTitle = [
    ABOUT_CONTENT.hero.title.text,
    ABOUT_CONTENT.hero.title.highlight,
    ...ABOUT_CONTENT.hero.manifesto.flatMap((item) => [
      item.text,
      item.highlight,
      item.textEnd,
    ]),
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section
      ref={containerRef}
      className="bg-background"
      aria-labelledby="about-hero-title"
    >
      <div className="relative min-h-screen overflow-hidden">
        <h1 id="about-hero-title" className="sr-only">
          {heroSrTitle}
        </h1>

        {/* Background Video - Native responsive `<source>` implementation */}
        <div className="relative aspect-[9/16] w-full overflow-hidden md:absolute md:inset-0 md:h-full md:aspect-auto">
          <ResponsiveVideo
            desktopSrc={RESPONSIVE_VIDEOS.aboutHero.desktop}
            mobileSrc={RESPONSIVE_VIDEOS.aboutHero.mobile}
            desktopPoster={activePosterDesk}
            mobilePoster={activePosterMobile}
            fitPolicy={RESPONSIVE_VIDEOS.aboutHero.fitPolicy}
            autoPlay={shouldPlayVideo}
            muted
            loop={shouldPlayVideo}
            className="absolute inset-0 h-full w-full object-contain md:object-cover object-top opacity-[0.78] md:object-center md:z-[var(--z-layer-base)]"
          />
          {/* Mobile Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/70 to-transparent z-[var(--z-layer-glass)] md:hidden" />
          {/* Desktop Overlay */}
          <div
            className="hidden md:block absolute inset-0 pointer-events-none z-[var(--z-layer-glass)] mix-blend-multiply bg-linear-to-l from-background via-background/80 to-background/40"
            aria-hidden="true"
          />
        </div>

        {/* Gradient Bottom Decay */}
        <div className="absolute bottom-0 left-0 w-full h-[25vh] md:h-[40vh] bg-linear-to-t from-background via-background/80 to-transparent pointer-events-none z-[var(--z-layer-content)]" />

        {/* Unified Semantic Content Tree (Single source of truth, responsive via CSS) */}
        <div className="relative z-[var(--z-layer-content)] flex min-h-[70vh] md:min-h-screen items-center w-full pt-10 pb-20 md:py-0">
          <div className="std-grid w-full">
            <div className="grid grid-cols-1 md:grid-cols-12 w-full gap-8">
              {/* Negative space for desktop video composition */}
              <div
                className="hidden md:block col-span-4 lg:col-span-5 xl:col-span-6"
                aria-hidden="true"
              />

              {/* Content block: centered on mobile, right-aligned on desktop */}
              <m.div
                style={
                  prefersReducedMotion
                    ? {}
                    : { opacity, y, filter: `blur(${blur}px)` }
                }
                className="col-span-1 md:col-span-8 lg:col-span-7 xl:col-span-6 flex flex-col items-center md:items-end text-center md:text-right md:-translate-y-[10%]"
              >
                <m.div
                  initial={prefersReducedMotion ? 'visible' : 'hidden'}
                  animate="visible"
                  variants={staggerContainer(0.08, 0.2)}
                  className="w-full flex flex-col items-center md:items-end max-w-[750px] md:ml-auto"
                >
                  {/* Intro & Manifesto */}
                  <div className="mb-8 md:mb-12 flex flex-col items-center md:items-end gap-1">
                    <div className="overflow-hidden">
                      <m.div
                        variants={titleLineVariants}
                        className="text-[clamp(32px,4.5vw,64px)] font-medium leading-[1.08] tracking-[-0.02em] text-textSecondary text-center md:text-right"
                      >
                        {ABOUT_CONTENT.hero.title.text}
                        {ABOUT_CONTENT.hero.title.highlight && (
                          <span className="text-bluePrimary font-black ml-1 md:ml-2">
                            {ABOUT_CONTENT.hero.title.highlight}
                          </span>
                        )}
                      </m.div>
                    </div>

                    <div
                      className="flex flex-col items-center md:items-end"
                      aria-hidden="true"
                    >
                      {ABOUT_CONTENT.hero.manifesto.map((item, index) => (
                        <div key={index} className="overflow-hidden">
                          <m.p
                            variants={titleLineVariants}
                            className="text-[clamp(32px,4.5vw,64px)] font-bold leading-[1.08] tracking-[-0.02em] text-text text-center md:text-right"
                          >
                            {item.text}
                            {item.highlight && (
                              <span className="text-bluePrimary font-black ml-1 md:ml-2">
                                {item.highlight}
                              </span>
                            )}
                            {item.textEnd}
                          </m.p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <m.div variants={subtitleVariants}>
                    <p className="text-body md:text-h3 text-text/90 text-center md:text-right font-medium max-w-[540px] leading-relaxed">
                      {ABOUT_CONTENT.hero.description.join(' ')}
                    </p>
                  </m.div>

                  {/* Executive Credential Line (<5s clarity of seniority and scope) */}
                  <m.div
                    variants={subtitleVariants}
                    className="mt-6 flex flex-col items-center md:items-end gap-3 pt-2"
                  >
                    <p className="text-small font-medium uppercase tracking-[0.16em] md:tracking-[0.18em] text-blueAccent">
                      Diretor de Criação · 12+ anos · Liderança criativa,
                      branding & IA
                    </p>
                    <a
                      href="#04-o-que-eu-faco"
                      className="group inline-flex items-center gap-1.5 text-small font-medium text-text/70 transition-colors hover:text-bluePrimary focus-visible:outline-none focus-visible:text-bluePrimary cursor-pointer"
                    >
                      ver como trabalho
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-fast group-hover:translate-y-0.5"
                      >
                        ↓
                      </span>
                    </a>
                  </m.div>
                </m.div>
              </m.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
