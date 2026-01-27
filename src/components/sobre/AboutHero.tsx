'use client';

import { useRef, useEffect } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

import { ABOUT_CONTENT } from '@/config/content';
import { motionTokens, motionSprings } from './motion';
import { useSiteAssetUrl } from '@/contexts/site-assets';
import { SITE_ASSET_KEYS } from '@/config/site-assets';

export function AboutHero() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // REDUCE PLAYBACK SPEED FOR SUBTLE LOOK
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.4;
    if (mobileVideoRef.current) mobileVideoRef.current.playbackRate = 0.4;
  }, []);

  const smoothProgress = useSpring(scrollYProgress, motionSprings.ghost);

  const mediaY = useTransform(
    smoothProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [48, -48]
  );

  // Forçar uso dos URLs padrão do HOME_CONTENT caso os assets do Supabase não estejam disponíveis
  const desktopVideo = useSiteAssetUrl(
    SITE_ASSET_KEYS.heroVideos.aboutDesktop,
    ABOUT_CONTENT.hero.videos.desktop ||
      '/public/videos/about.hero.desktop_video.mp4'
  );
  const mobileVideo = useSiteAssetUrl(
    SITE_ASSET_KEYS.heroVideos.aboutMobile,
    ABOUT_CONTENT.hero.videos.mobile ||
      '/public/videos/about.hero.mobile_video.mp4'
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-background overflow-hidden"
      aria-label="Hero - Manifesto"
    >
      {/* Background Video - Desktop - Forçar exibição mesmo se o URL estiver vazio */}
      <motion.video
        ref={videoRef}
        src={desktopVideo || '/public/videos/about.hero.desktop_video.mp4'}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="hidden lg:block absolute inset-0 w-full h-full object-cover opacity-[0.55]"
        aria-hidden="true"
      />

      {/* Desktop Overlay - Contrast Exception Control */}
      <div
        className="hidden lg:block absolute inset-0 bg-background/60 bg-linear-to-r from-background via-background/40 to-background/80 pointer-events-none z-1"
        aria-hidden="true"
      />

      {/* Desktop Content - 12 Column Grid Concept */}
      <div className="relative z-10 hidden lg:flex h-screen items-center overflow-hidden w-full">
        <div className="std-grid w-full">
          <div className="grid grid-cols-12 w-full gap-8">
            {/* Columns 1-6: Empty Space / Negative Space for Video Presence */}
            <div className="col-span-6" aria-hidden="true" />

            {/* Columns 7-12: Content Block */}
            {/* Columns 7-12: Content Block */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="col-span-6 flex flex-col items-end text-right -translate-y-[10%]"
            >
              <div className="w-full flex flex-col items-end max-w-[750px] ml-auto">
                {/* Intro & Manifesto - Unified for natural wrapping */}
                <motion.div
                  initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 1.2,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0,
                  }}
                  className="mb-12 flex flex-col items-end gap-1"
                >
                  <h1 className="text-[clamp(44px,4.5vw,64px)] font-medium leading-[1.08] tracking-[-0.02em] text-text-light text-right">
                    {ABOUT_CONTENT.hero.title.text}
                    {ABOUT_CONTENT.hero.title.highlight && (
                      <span className="text-bluePrimary font-semibold ml-2">
                        {ABOUT_CONTENT.hero.title.highlight}
                      </span>
                    )}
                  </h1>

                  <div className="flex flex-col items-end">
                    {ABOUT_CONTENT.hero.manifesto.map((item, index) => (
                      <p
                        key={index}
                        className="text-[clamp(44px,4.5vw,64px)] font-medium leading-[1.08] tracking-[-0.02em] text-text-light text-right"
                      >
                        {item.text}
                        {item.highlight && (
                          <span className="text-bluePrimary font-semibold ml-2">
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
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1.2,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.4,
                  }}
                >
                  <h3 className="type-h3 text-white text-right font-medium max-w-[620px]">
                    {ABOUT_CONTENT.hero.description.join(' ')}
                  </h3>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Gradient Bottom Decay */}
      {/* Gradient Bottom Decay - Suaviza transição para próxima sessão */}
      <div className="absolute bottom-0 left-0 w-full h-[30vh] md:h-[40vh] bg-linear-to-t from-background via-background/80 to-transparent pointer-events-none z-20" />

      {/* Mobile Hero Video */}
      <div className="lg:hidden">
        <div className="relative aspect-square w-full overflow-hidden">
          <motion.video
            ref={mobileVideoRef}
            src={mobileVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover object-top opacity-[0.78]"
            style={{ y: mediaY }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent z-10" />
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
                    duration: 1.4,
                    ease: [0.22, 1, 0.36, 1] as const,
                  },
                },
              }}
              className="space-y-4"
            >
              <h1 className="type-h2 text-white leading-tight flex flex-col gap-1">
                <span>
                  Sou <span className="text-bluePrimary">Danilo Novais.</span>
                </span>
                <span>
                  Você <span className="text-bluePrimary">não vê tudo</span> o
                  que eu faço.
                </span>
                <span>
                  Mas sente quando{' '}
                  <span className="text-bluePrimary">funciona.</span>
                </span>
              </h1>
            </motion.div>
            <motion.div
              variants={motionTokens.fadeGhost}
              className="type-h3 text-white leading-snug tracking-tight max-w-[98%] mx-auto font-medium"
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
