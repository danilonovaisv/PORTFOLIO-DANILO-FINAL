'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useMotionGate } from '@/hooks/useMotionGate';

import { ABOUT_CONTENT } from '@/config/content';
import {
  MOTION_TOKENS,
  GHOST_EASE,
  ghostFade,
  viewportConfig,
} from '@/config/motion';
import { SITE_ASSET_KEYS } from '@/config/site-assets';
import { DEFAULT_VIDEO_POSTER } from '@/lib/video';

import { DynamicAssetVideo } from '@/components/ui/shared/DynamicAssetVideo';

export function AboutHero() {
  const prefersReducedMotion = useMotionGate();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, MOTION_TOKENS.spring.ghost);

  const mediaY = useTransform(
    smoothProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [18, -18]
  );

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
      className="relative min-h-screen bg-background overflow-hidden"
      aria-label="Hero - Manifesto"
    >
      <h1 className="sr-only">{heroSrTitle}</h1>

      {/* Background Video - Desktop - Sincronização Realtime */}
      <DynamicAssetVideo
        assetKey={SITE_ASSET_KEYS.heroVideos.aboutDesktop}
        fallbackUrl={ABOUT_CONTENT.hero.videos.desktop || undefined}
        playbackRate={0.4}
        autoPlay={shouldPlayVideo}
        muted
        loop={shouldPlayVideo}
        poster={DEFAULT_VIDEO_POSTER}
        className="hidden lg:block absolute inset-0 w-full h-full object-cover opacity-[0.78]"
        style={{ zIndex: 0 }}
      />

      {/* Desktop Overlay - Contrast Exception Control */}
      <div
        className="hidden lg:block absolute inset-0 pointer-events-none z-1 mix-blend-multiply bg-linear-to-l from-background via-background/80 to-background/40"
        aria-hidden="true"
      />

      {/* Desktop Content - 12 Column Grid Concept */}
      <div className="relative z-10 hidden lg:flex h-screen items-center overflow-hidden w-full">
        <div className="std-grid w-full">
          <div className="grid grid-cols-12 w-full gap-8">
            {/* Columns 1-6: Empty Space / Negative Space for Video Presence */}
            <div className="col-span-6" aria-hidden="true" />

            {/* Columns 7-12: Content Block */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="col-span-6 flex flex-col items-end text-right -translate-y-[10%]"
            >
              <div className="w-full flex flex-col items-end max-w-[750px] ml-auto">
                {/* Intro & Manifesto - Unified for natural wrapping */}
                <motion.div
                  initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={viewportConfig}
                  transition={{
                    duration: MOTION_TOKENS.duration.slow,
                    ease: GHOST_EASE,
                    delay: 0,
                  }}
                  className="mb-12 flex flex-col items-end gap-1"
                >
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
                </motion.div>

                {/* Description - Responsive line breaks */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportConfig}
                  transition={{
                    duration: MOTION_TOKENS.duration.slow,
                    ease: GHOST_EASE,
                    delay: 0.4,
                  }}
                >
                  <p className="text-h3 text-text text-right font-medium max-w-[520px]">
                    {ABOUT_CONTENT.hero.description.join(' ')}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Gradient Bottom Decay - Suaviza transição para próxima sessão */}
      <div className="absolute bottom-0 left-0 w-full h-[30vh] md:h-[40vh] bg-linear-to-t from-background via-background/80 to-transparent pointer-events-none z-20" />

      {/* Mobile Hero Video - Sincronização Realtime */}
      <div className="lg:hidden">
        <div className="relative aspect-square w-full overflow-hidden">
          <motion.div style={{ y: mediaY }} className="w-full h-full">
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
          </motion.div>
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/70 to-transparent z-10" />
        </div>
        <div className="relative z-10 px-6 pt-10 pb-20 text-center">
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.3,
                },
              },
            }}
            className="space-y-6"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, filter: 'blur(10px)' },
                visible: {
                  opacity: 1,
                  filter: 'blur(0px)',
                  transition: {
                    duration: MOTION_TOKENS.duration.slow,
                    ease: GHOST_EASE as any,
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
            </motion.div>

            <motion.div
              variants={ghostFade}
              className="text-[clamp(1.35rem,4.8vw,1.62rem)] text-text/95 leading-snug tracking-tight max-w-[99%] mx-auto font-medium"
            >
              {ABOUT_CONTENT.hero.description.map((line, index) => (
                <span key={index} className="block">
                  {line}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
