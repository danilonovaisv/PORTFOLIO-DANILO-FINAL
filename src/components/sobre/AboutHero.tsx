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
          className="w-full max-w-[800px] lg:ml-auto text-right lg:-translate-y-6"
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
            className="space-y-6 md:space-y-7 flex flex-col items-end"
          >
            {/* Intro H1 */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, filter: 'blur(10px)' },
                visible: {
                  opacity: 1,
                  filter: 'blur(0px)',
                  transition: {
                    duration: 1.4,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              className="type-h1 text-text-light tracking-tight leading-[1.1]"
            >
              Sou <span className="text-[#0048ff]">Danilo Novais.</span>
            </motion.h1>

            {/* Manifesto Display Text (treated as H1 visual) */}
            <motion.div
              variants={{
                hidden: { opacity: 0, filter: 'blur(10px)' },
                visible: {
                  opacity: 1,
                  filter: 'blur(0px)',
                  transition: {
                    duration: 1.4,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              className="space-y-1.5 flex flex-col items-end"
            >
              <p className="type-h1 text-text-light font-bold tracking-tight leading-[1.05]">
                Você <span className="text-[#0048ff]">não vê tudo</span>
              </p>
              <p className="type-h1 text-text-light font-bold tracking-tight leading-[1.05]">
                o que eu faço. Mas
              </p>
              <p className="type-h1 text-text-light font-bold tracking-tight leading-[1.05]">
                sente quando
              </p>
              <p className="type-h1 text-text-light font-bold tracking-tight leading-[1.05]">
                <span className="text-[#0048ff]">funciona.</span>
              </p>
            </motion.div>

            {/* Description H3 */}
            <motion.div
              variants={{
                hidden: { opacity: 0, filter: 'blur(10px)' },
                visible: {
                  opacity: 1,
                  filter: 'blur(0px)',
                  transition: {
                    duration: 1.4,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              className="type-h3 text-white/60 font-medium leading-[1.3] tracking-tight max-w-[620px]"
            >
              <span className="block">Crio design que observa, entende</span>
              <span className="block">e guia experiências com intenção,</span>
              <span className="block">
                estratégia e tecnologia — na medida certa.
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient Bottom Decay */}
      {/* Gradient Bottom Decay - Suaviza transição para próxima sessão */}
      <div className="absolute bottom-0 left-0 w-full h-[30vh] md:h-[40vh] bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-20" />

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
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              className="space-y-4"
            >
              <h1 className="type-display text-text-light leading-[1.1]">
                Sou <span className="text-bluePrimary">Danilo Novais.</span>{' '}
                Você <span className="text-bluePrimary">não vê tudo</span> o
                <br />
                que eu faço. Mas sente quando{' '}
                <span className="text-bluePrimary">funciona.</span>
              </h1>
            </motion.div>
            <motion.div
              variants={motionTokens.fadeGhost}
              className="type-body text-white/85 leading-[1.6] tracking-tight"
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
