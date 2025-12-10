'use client';

import React, { useCallback, useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from 'framer-motion';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import HeroGlassCanvas from '@/components/three/HeroGlassCanvas';
import Button from '@/components/ui/Button';
import { ASSETS } from '@/lib/constants';

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

const HERO_FADE_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
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

const HERO_TITLE_LINE_VARIANTS = {
  hidden: { opacity: 0, y: 40, rotateX: 20 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.2, 0.65, 0.3, 0.9],
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

  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Ajuste das transformações do vídeo para melhor comportamento responsivo
  // Mobile: Começa maior e centralizado em baixo. Desktop: Canto direito.
  const expandProgress = prefersReducedMotion
    ? useMotionValue(0)
    : useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const videoWidth = useMotionTemplate`
    calc(280px + (100vw - 280px) * ${expandProgress})
  `;
  const videoHeight = useMotionTemplate`
    calc(160px + (100vh - 160px) * ${expandProgress})
  `;

  // Desktop positions (calculado em % para fluidez)
  const desktopX = prefersReducedMotion
    ? useMotionValue('35vw')
    : useTransform(scrollYProgress, [0, 0.35], ['35vw', '0vw']);
  const desktopY = prefersReducedMotion
    ? useMotionValue('30vh')
    : useTransform(scrollYProgress, [0, 0.35], ['30vh', '0vh']);

  const videoRadius = prefersReducedMotion
    ? useMotionValue('16px')
    : useTransform(scrollYProgress, [0, 0.35], ['16px', '0px']);

  const handleVideoExpand = useCallback(() => {
    if (typeof window === 'undefined') return;
    const target = document.getElementById('manifesto');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('hero:playManifesto'));
    }
  }, []);

  const heroIntroMotionProps = prefersReducedMotion
    ? {}
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-100px' },
        variants: HERO_SECTION_VARIANTS,
      };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[250vh] w-full bg-[#F4F5F7]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Layer 1: 3D Canvas Background */}
        <div className="pointer-events-none fixed inset-0 z-0 select-none">
          <HeroGlassCanvas
            className="pointer-events-none"
            scrollYProgress={scrollYProgress}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>

        {/* Layer 2: Main Content (Text) */}
        <div className="relative z-10 h-full w-full pointer-events-none">
          {/* Container limits content width but allows interactions inside */}
          <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-6 lg:px-12">
            <motion.div
              {...heroIntroMotionProps}
              style={{ opacity: textOpacity, scale: textScale }}
              className="pointer-events-auto max-w-4xl relative z-20"
            >
              <motion.div
                {...(!prefersReducedMotion ? { variants: HERO_FADE_VARIANTS } : {})}
                className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#111111]/5 bg-white/50 px-4 py-1.5 backdrop-blur-md"
              >
                {/* Updated to match reference color and style */}
                <span className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#0057FF]">
                  [ BRAND AWARENESS ]
                </span>
              </motion.div>

              {/* H1 Typography updates: Tighter tracking, specific leading for display font */}
              <motion.h1 // Changed to motion.h1
                {...(!prefersReducedMotion ? { variants: HERO_HEADLINE_VARIANTS } : {})}
                className="font-display font-extrabold text-[clamp(3.5rem,10vw,8rem)] leading-[0.9] tracking-tighter text-[#111111] mb-8"
              >
                <motion.span
                  {...(!prefersReducedMotion ? { variants: HERO_TITLE_LINE_VARIANTS } : {})}
                  className="block text-[#0057FF]"
                >
                  Design,
                </motion.span>
                {/* Added indentation (pl-12 / md:pl-24) to match visual hierarchy */}
                <motion.span
                  {...(!prefersReducedMotion ? { variants: HERO_TITLE_LINE_VARIANTS } : {})}
                  className="block pl-12 md:pl-24"
                >
                  não é só
                </motion.span>
                <motion.span
                  {...(!prefersReducedMotion ? { variants: HERO_TITLE_LINE_VARIANTS } : {})}
                  className="block"
                >
                  estética.
                </motion.span>
              </motion.h1>

              <motion.div
                {...(!prefersReducedMotion ? { variants: HERO_FADE_VARIANTS } : {})}
                className="mt-8 max-w-lg rounded-lg sm:bg-transparent sm:p-0 sm:backdrop-blur-none"
              >
                <p className="font-sans text-xl md:text-2xl font-medium leading-relaxed text-[#111111]/80">
                  [É intenção, é estratégia, é experiência.]
                </p>
              </motion.div>

              <motion.div
                {...(!prefersReducedMotion ? { variants: HERO_FADE_VARIANTS } : {})}
                className="mt-12 flex flex-wrap gap-4"
              >
                <Button
                  variant="primary"
                  href="/sobre"
                  className="uppercase tracking-widest text-xs py-5 px-10"
                >
                  get to know me better →
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Layer 3: Video Thumbnail (Floating Element) */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <motion.button
            type="button"
            onClick={handleVideoExpand}
            style={{
              width: videoWidth,
              height: videoHeight,
              borderRadius: videoRadius,
              x: desktopX,
              y: desktopY,
            }}
            className="pointer-events-auto absolute flex cursor-pointer overflow-hidden shadow-2xl origin-center will-change-transform"
          >
            <div className="relative h-full w-full bg-black">
              <video
                src={ASSETS.videoManifesto}
                className="h-full w-full object-cover opacity-90 transition-opacity duration-500 hover:opacity-100"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/5">
                <div className="h-14 w-14 rounded-full border border-white/20 bg-white/10" />
              </div>
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
