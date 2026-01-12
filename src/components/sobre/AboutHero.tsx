'use client';

import { useRef, useEffect } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

import { Container } from '@/components/layout/Container';
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
        className="hidden lg:block absolute inset-0 w-full h-full object-cover opacity-100"
        aria-hidden="true"
      />

      {/* Desktop Overlay - Contrast Exception Control */}
      <div
        className="hidden lg:block absolute inset-0 bg-background/60 bg-linear-to-r from-background via-background/40 to-background/80 pointer-events-none z-1"
        aria-hidden="true"
      />

      {/* Desktop Content - 12 Column Grid Concept */}
      <div className="relative z-10 hidden lg:flex h-screen items-center overflow-hidden">
        <Container className="max-w-[1120px]">
          <div className="grid grid-cols-12 w-full gap-8">
            {/* Columns 1-6: Empty Space / Negative Space for Video Presence */}
            <div className="col-span-6" aria-hidden="true" />

            {/* Columns 7-12: Content Block */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.2,
                  },
                },
              }}
              className="col-span-6 flex flex-col items-end text-right -translate-y-[10%]"
            >
              <div className="space-y-8 w-full">
                {/* Intro & Manifesto - Unified for natural wrapping */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      transition: {
                        duration: 1,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                  className="flex flex-col items-end gap-2"
                >
                  <h1 className="type-h1 text-text-light tracking-tight leading-[1.1]">
                    {ABOUT_CONTENT.hero.title.text}
                    <span className="text-bluePrimary">
                      {ABOUT_CONTENT.hero.title.highlight}
                    </span>
                  </h1>

                  <div className="flex flex-col items-end">
                    {ABOUT_CONTENT.hero.manifesto.map((item, index) => (
                      <p
                        key={index}
                        className="type-h1 text-text-light font-bold tracking-tight leading-[1.05]"
                      >
                        {item.text}
                        {item.highlight && (
                          <span className="text-bluePrimary">
                            {item.highlight}
                          </span>
                        )}
                      </p>
                    ))}
                  </div>
                </motion.div>

                {/* Description - Responsive line breaks */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 1,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                  className="type-h3 text-text-secondary font-medium leading-relaxed max-w-[580px] ml-auto"
                >
                  {ABOUT_CONTENT.hero.description.join(' ')}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Gradient Bottom Decay */}
      {/* Gradient Bottom Decay - Suaviza transição para próxima sessão */}
      <div className="absolute bottom-0 left-0 w-full h-[30vh] md:h-[40vh] bg-linear-to-t from-background via-background/80 to-transparent pointer-events-none z-20" />

      {/* Mobile Hero Video */}
      <div className="lg:hidden">
        <div className="relative aspect-square w-full overflow-hidden">
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
              <h1 className="type-h1 text-text-light leading-[1.1] flex flex-col gap-1">
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
              className="text-[18px] md:type-h3 text-white leading-[1.6] tracking-tight max-w-[98%] mx-auto"
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
