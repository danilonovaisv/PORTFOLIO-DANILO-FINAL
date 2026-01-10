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
  const textY = useTransform(
    smoothProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [12, -12]
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-background overflow-hidden"
      aria-label="Hero - Manifesto"
    >
      {/* Background Video - Desktop */}
      <motion.video
        ref={videoRef}
        src={ABOUT_CONTENT.hero.videos.desktop}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="hidden lg:block absolute inset-0 w-full h-full object-cover object-top opacity-[0.68]"
        style={{ y: mediaY }}
        aria-hidden="true"
      />

      {/* Dark Gradient Overlay for Desktop */}
      <div
        className="hidden lg:block absolute inset-0 bg-linear-to-b from-black/60 via-black/45 to-background/85 pointer-events-none z-1"
        aria-hidden="true"
      />

      {/* Desktop Content */}
      <div className="relative z-10 hidden lg:flex min-h-screen items-center std-grid">
        <motion.div
          style={{ y: textY }}
          className="w-full max-w-[680px] lg:ml-auto text-left lg:-translate-y-6"
        >
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
            className="space-y-6 md:space-y-7"
          >
            <motion.h1
              variants={motionTokens.fadeGhost}
              className="text-[32px] lg:text-[36px] xl:text-[40px] font-semibold tracking-tight text-text-light leading-tight"
            >
              Sou <span className="text-primary">Danilo Novais.</span>
            </motion.h1>

            <motion.div
              variants={motionTokens.fadeGhost}
              className="space-y-1.5"
            >
              <p className="text-[38px] lg:text-[42px] xl:text-[48px] text-text-light font-semibold tracking-tight leading-[1.05]">
                <span className="text-primary">Você</span> não vê tudo
              </p>
              <p className="text-[38px] lg:text-[42px] xl:text-[48px] text-text-light font-semibold tracking-tight leading-[1.05]">
                o que eu faço. Mas
              </p>
              <p className="text-[38px] lg:text-[42px] xl:text-[48px] text-text-light font-semibold tracking-tight leading-[1.05]">
                sente quando
              </p>
              <p className="text-[38px] lg:text-[42px] xl:text-[48px] text-text-light font-semibold tracking-tight leading-[1.05]">
                <span className="text-primary">funciona.</span>
              </p>
            </motion.div>

            <motion.div
              variants={motionTokens.fadeGhost}
              className="text-[16px] lg:text-[17px] text-white/85 font-normal leading-[1.6] tracking-tight max-w-[420px]"
            >
              Crio design que observa, entende
              <br />
              e guia experiências com intenção,
              <br />
              estratégia e tecnologia — na medida certa.
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile Hero Video */}
      <div className="lg:hidden">
        <div className="relative h-[55vh] w-full overflow-hidden">
          <motion.video
            ref={mobileVideoRef}
            src={ABOUT_CONTENT.hero.videos.mobile}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover object-top opacity-[0.78]"
            style={{ y: mediaY }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/85 to-background/95" />
        </div>
        <div className="relative z-10 px-6 pt-10 pb-12 text-center">
          <motion.div
            style={{ y: textY }}
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
            <motion.div variants={motionTokens.fadeGhost} className="space-y-0">
              <h1 className="text-[clamp(1.75rem,8vw,2.5rem)] font-semibold tracking-tight text-text-light leading-[1.18]">
                Sou <span className="text-primary">Danilo Novais.</span>{' '}
                <span className="text-primary">Você</span> não vê tudo o
                <br />
                que eu faço. Mas sente quando{' '}
                <span className="text-primary">funciona.</span>
              </h1>
            </motion.div>
            <motion.div
              variants={motionTokens.fadeGhost}
              className="text-[16px] sm:text-[17px] text-white/85 font-normal leading-[1.6] tracking-tight"
            >
              Crio design que observa, entende e guia experiências com
              <br />
              intenção, estratégia e tecnologia — na medida certa.
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
