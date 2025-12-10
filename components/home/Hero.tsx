'use client';

import React, { useCallback, useRef } from 'react';
import { motion, useScroll, useTransform, type Easing } from 'framer-motion';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import HeroGlassCanvas from '@/components/three/HeroGlassCanvas';
import ManifestoThumb from '@/components/home/ManifestoThumb';
import Button from '@/components/ui/Button';

const HERO_FADE_EASE: Easing = 'easeOut';
const HERO_TITLE_LINE_EASE: Easing = [0.2, 0.65, 0.3, 0.9] as const;

const HERO_SECTION_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const HERO_SECTION_VARIANTS_REDUCED = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const HERO_FADE_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: HERO_FADE_EASE },
  },
};

const HERO_FADE_VARIANTS_REDUCED = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: HERO_FADE_EASE },
  },
};

const HERO_HEADLINE_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const HERO_HEADLINE_VARIANTS_REDUCED = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const HERO_TITLE_LINE_VARIANTS = {
  hidden: { opacity: 0, y: 40, rotateX: 20 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: HERO_TITLE_LINE_EASE,
    },
  },
};

const HERO_TITLE_LINE_VARIANTS_REDUCED = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: HERO_TITLE_LINE_EASE,
    },
  },
};

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.25]);
  const textScale = useTransform(scrollYProgress, [0, 0.65], [1, 0.94]);

  const thumbScale = prefersReducedMotion
    ? useTransform(scrollYProgress, [0, 1], [1, 1])
    : useTransform(scrollYProgress, [0, 1], [0.9, 1.35]);
  const thumbTranslateY = prefersReducedMotion
    ? useTransform(scrollYProgress, [0, 1], [0, 0])
    : useTransform(scrollYProgress, [0, 1], [0, -220]);
  const thumbTranslateX = prefersReducedMotion
    ? useTransform(scrollYProgress, [0, 1], [0, 0])
    : useTransform(scrollYProgress, [0, 1], [0, -140]);
  const thumbRadius = prefersReducedMotion
    ? useTransform(scrollYProgress, [0, 1], ['16px', '16px'])
    : useTransform(scrollYProgress, [0, 1], ['18px', '6px']);

  const handleVideoExpand = useCallback(() => {
    if (typeof window === 'undefined') return;
    const target = document.getElementById('manifesto');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('hero:playManifesto'));
    }
  }, []);

  const sectionVariants = prefersReducedMotion
    ? HERO_SECTION_VARIANTS_REDUCED
    : HERO_SECTION_VARIANTS;
  const fadeVariants = prefersReducedMotion
    ? HERO_FADE_VARIANTS_REDUCED
    : HERO_FADE_VARIANTS;
  const headlineVariants = prefersReducedMotion
    ? HERO_HEADLINE_VARIANTS_REDUCED
    : HERO_HEADLINE_VARIANTS;
  const lineVariants = prefersReducedMotion
    ? HERO_TITLE_LINE_VARIANTS_REDUCED
    : HERO_TITLE_LINE_VARIANTS;

  const heroIntroMotionProps = {
    initial: 'hidden',
    whileInView: 'visible',
    viewport: prefersReducedMotion
      ? { once: true }
      : { once: true, margin: '-100px' },
    variants: sectionVariants,
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[200vh] bg-[#F4F5F7]"
    >
      <div className="sticky top-0 flex min-h-screen items-center">
        <div className="mx-auto flex w-full max-w-7xl flex-col justify-center px-6 pb-16 pt-28 lg:px-12 lg:pb-20 lg:pt-32">
          <motion.div
            {...heroIntroMotionProps}
            style={{ opacity: textOpacity, scale: textScale }}
            className="pointer-events-auto w-full"
          >
            <div className="grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-14">
              <div className="relative z-10 space-y-6 md:space-y-8">
                <motion.h1
                  variants={headlineVariants}
                  className="font-display font-extrabold text-[clamp(3.4rem,9vw,7.8rem)] leading-[0.9] tracking-tight text-[#111111]"
                >
                  <motion.span
                    variants={lineVariants}
                    className="block text-[#0057FF]"
                  >
                    Design,
                  </motion.span>
                  <motion.span variants={lineVariants} className="block">
                    não é só
                  </motion.span>
                  <motion.span variants={lineVariants} className="block">
                    estética.
                  </motion.span>
                </motion.h1>

                <motion.div
                  variants={fadeVariants}
                  className="inline-flex max-w-xl rounded-xl bg-white/70 px-4 py-3 text-lg font-medium leading-relaxed text-[#111111]/85 backdrop-blur-md shadow-sm"
                >
                  [É intenção, é estratégia, é experiência.]
                </motion.div>

                <motion.div
                  variants={fadeVariants}
                  className="flex flex-wrap gap-4"
                >
                  <Button
                    variant="primary"
                    href="/sobre"
                    className="text-base lowercase font-semibold px-8 py-4 rounded-full shadow-[0_20px_40px_rgba(0,87,255,0.18)]"
                    aria-label="Ir para página Sobre"
                  >
                    get to know me better →
                  </Button>
                </motion.div>
              </div>

              <div className="relative flex flex-col gap-6 md:pl-6">
                <motion.div
                  variants={fadeVariants}
                  className="flex w-full justify-end pr-1 md:pr-4"
                >
                  <div className="rounded-2xl bg-white/70 px-5 py-2 text-[13px] font-semibold tracking-[0.2em] uppercase text-[#0057FF] shadow-sm">
                    [ BRAND AWARENESS ]
                  </div>
                </motion.div>

                <div className="relative h-[360px] w-full overflow-visible sm:h-[420px] md:h-[520px]">
                  <HeroGlassCanvas
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    scrollYProgress={scrollYProgress}
                    prefersReducedMotion={prefersReducedMotion}
                  />

                  <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-black/5" />

                  <div className="pointer-events-none absolute inset-0" />
                </div>

                <div className="flex w-full justify-end pr-2 md:pr-6">
                  <div className="relative flex flex-col items-end gap-2">
                    <ManifestoThumb
                      onClick={handleVideoExpand}
                      prefersReducedMotion={prefersReducedMotion}
                      motionStyle={{
                        scale: thumbScale,
                        translateY: thumbTranslateY,
                        translateX: thumbTranslateX,
                        borderRadius: thumbRadius,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
