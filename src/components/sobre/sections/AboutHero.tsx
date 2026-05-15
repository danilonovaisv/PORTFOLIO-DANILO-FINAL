'use client';

import { useRef } from 'react';
import { m, useScroll, useTransform } from 'motion/react';
import { useMotionGate } from '@/hooks/useMotionGate';

import { ABOUT_CONTENT } from '@/config/content';
import {
  MOTION_TOKENS,
  GHOST_EASE,
  ghostFade,
} from '@/config/motion';
import { SITE_ASSET_KEYS } from '@/config/site-assets';
import { DEFAULT_VIDEO_POSTER } from '@/lib/video';

import { DynamicAssetVideo } from '@/components/ui/shared/DynamicAssetVideo';

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

        {/* Background Video - Desktop - Sincronização Realtime */}
        <DynamicAssetVideo
          assetKey={SITE_ASSET_KEYS.heroVideos.aboutDesktop}
          fallbackUrl={ABOUT_CONTENT.hero.videos.desktop || undefined}
          playbackRate={0.4}
          autoPlay={shouldPlayVideo}
          muted
          loop={shouldPlayVideo}
          poster={DEFAULT_VIDEO_POSTER}
          className="hidden lg:block absolute inset-0 w-full h-full object-cover opacity-[0.78] z-[var(--z-layer-base)]"
        />

        {/* Desktop Overlay - Contrast Exception Control */}
        <div
          className="hidden lg:block absolute inset-0 pointer-events-none z-[var(--z-layer-glass)] mix-blend-multiply bg-linear-to-l from-background via-background/80 to-background/40"
          aria-hidden="true"
        />

        {/* Desktop Content - 12 Column Grid Concept */}
        <div className="relative z-[var(--z-layer-content)] hidden lg:flex h-screen items-center overflow-hidden w-full">
          <div className="std-grid w-full">
            <div className="grid grid-cols-12 w-full gap-8">
              {/* Columns 1-6: Empty Space / Negative Space for Video Presence */}
              <div className="col-span-6" aria-hidden="true" />

              {/* Columns 7-12: Content Block */}
              <m.div
                style={prefersReducedMotion ? {} : { opacity, y, filter: `blur(${blur}px)` }}
                className="col-span-6 flex flex-col items-end text-right -translate-y-[10%]"
              >
                <div className="w-full flex flex-col items-end max-w-[750px] ml-auto">
                  {/* Intro & Manifesto - Unified for natural wrapping */}
                  <m.div className="mb-12 flex flex-col items-end gap-1">
                    <div
                      aria-hidden="true"
                      className="text-[clamp(44px,4.5vw,64px)] font-medium leading-[1.08] tracking-[-0.02em] text-textSecondary text-right"
                    >
                      {ABOUT_CONTENT.hero.title.text}
                      {ABOUT_CONTENT.hero.title.highlight && (
                        <span className="text-bluePrimary font-black ml-2">
                          {ABOUT_CONTENT.hero.title.highlight}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col items-end" aria-hidden="true">
                      {ABOUT_CONTENT.hero.manifesto.map((item, index) => (
                        <p
                          key={index}
                          className="text-[clamp(44px,4.5vw,64px)] font-bold leading-[1.08] tracking-[-0.02em] text-bold text-right"
                        >
                          {item.text}
                          {item.highlight && (
                            <span className="text-bluePrimary font-black ml-2">
                              {item.highlight}
                            </span>
                          )}
                          {item.textEnd}
                        </p>
                      ))}
                    </div>
                  </m.div>

                  {/* Description - Responsive line breaks */}
                  <m.div>
                    <p className="text-h3 text-text text-right font-medium max-w-[520px]">
                      {ABOUT_CONTENT.hero.description.join(' ')}
                    </p>
                  </m.div>
                </div>
              </m.div>
            </div>
          </div>
        </div>

        {/* Gradient Bottom Decay - Suaviza transição para próxima sessão */}
        <div className="absolute bottom-0 left-0 w-full h-[30vh] md:h-[40vh] bg-linear-to-t from-background via-background/80 to-transparent pointer-events-none z-[var(--z-layer-content)]" />

        {/* Mobile Hero Video - Sincronização Realtime */}
        <div className="lg:hidden">
          <div className="relative aspect-square w-full overflow-hidden">
            <div className="w-full h-full">
              <DynamicAssetVideo
                assetKey={SITE_ASSET_KEYS.heroVideos.aboutMobile}
                fallbackUrl={ABOUT_CONTENT.hero.videos.mobile || undefined}
                playbackRate={0.4}
                autoPlay={shouldPlayVideo}
                muted
                loop={shouldPlayVideo}
                poster={DEFAULT_VIDEO_POSTER}
                className="absolute inset-0 w-full h-full object-cover object-top opacity-[0.78]"
              />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/70 to-transparent z-[var(--z-layer-glass)]" />
          </div>
          <div className="std-grid relative z-[var(--z-layer-content)] pt-10 pb-20 text-center">
            <m.div
              initial={prefersReducedMotion ? 'visible' : 'hidden'}
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: MOTION_TOKENS.stagger.normal,
                    delayChildren: MOTION_TOKENS.delay.medium,
                  },
                },
              }}
              className="space-y-6"
            >
              <m.div
                variants={{
                  hidden: { opacity: 0, filter: 'blur(10px)' },
                  visible: {
                    opacity: 1,
                    filter: 'blur(0px)',
                    transition: {
                      duration: MOTION_TOKENS.duration.slow,
                      ease: GHOST_EASE,
                    },
                  },
                }}
                className="space-y-4"
              >
                {/* TÍTULO MOBILE AJUSTADO
                    1. text-[clamp(1.8rem...)]: Reduzi o mínimo para caber melhor em telas pequenas.
                    2. text-balance: Garante que as linhas fiquem visualmente equilibradas.
                */}
                <div
                  aria-hidden="true"
                  className="text-h1 text-[clamp(1.75rem,4vw+1rem,3.25rem)] font-bold text-text leading-[1.1] flex flex-col gap-0.5 text-balance"
                >
                  <span>
                    Sou <span className="text-bluePrimary">Danilo Novais.</span>
                  </span>
                  <span>
                    Você <span className="text-bluePrimary">não vê tudo</span>{' '}
                    <span className="whitespace-nowrap">o que eu faço.</span>
                  </span>
                  <span>
                    Mas sente quando{' '}
                    <span className="text-bluePrimary whitespace-nowrap">
                      funciona.
                    </span>
                  </span>
                </div>
              </m.div>

              <m.div
                variants={ghostFade}
                className="text-[clamp(1.35rem,4.8vw,1.62rem)] text-text/95 leading-snug tracking-tight max-w-[99%] mx-auto font-medium"
              >
                {ABOUT_CONTENT.hero.description.map((line, index) => (
                  <span key={index} className="block">
                    {line}
                  </span>
                ))}
              </m.div>
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
