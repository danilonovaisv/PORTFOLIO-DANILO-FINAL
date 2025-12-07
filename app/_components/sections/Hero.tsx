'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PrimaryButton } from '@/app/_components/ui';
import { ASSETS } from '@/src/lib/constants';

const HeroCanvasFallback = () => (
  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
    <div className="w-[32rem] h-[32rem] rounded-full bg-gradient-to-br from-[#d1e0ff] to-[#fefefe] opacity-70 blur-[160px]" />
  </div>
);

const HeroGlassCanvas = dynamic(
  () => import('@/src/components/three/HeroGlassCanvas'),
  {
    ssr: false,
    loading: () => <HeroCanvasFallback />,
  }
);

// Componente para animar texto letra por letra (efeito "digitação/reveal")
type AnimatedTextLineProps = {
  text: string;
  className?: string;
  delay?: number;
  colorClass?: string;
};

const MotionPrimaryButton = motion(PrimaryButton);

const AnimatedTextLine = ({
  text,
  className,
  delay = 0,
  colorClass = 'text-[#111111]',
}: AnimatedTextLineProps) => {
  // Separa o texto em caracteres
  const letters = text.split('');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03, // Stagger mais rápido para fluxo contínuo
        delayChildren: delay,
      },
    },
  };

  const child: Variants = {
    hidden: {
      y: '110%', // Garante que saia totalmente da máscara
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      // Curva "Premium": Rápida no início, muito suave no final
      transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      className={`flex overflow-hidden ${className}`} // overflow-hidden é crucial para o efeito de máscara
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          variants={child}
          className={`block ${colorClass} leading-[0.9]`}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Controle de Scroll para a animação da timeline
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Monitora o progresso do scroll para controlar o áudio do vídeo
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (videoRef.current) {
      if (latest > 0.01) {
        videoRef.current.muted = false;
      } else {
        videoRef.current.muted = true;
      }
    }
  });

  // Animações
  const contentOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const contentY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  // Animação específica para o Glass Orb (Desaparece mais rápido para limpar o vídeo)
  const glassOrbOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);
  const glassOrbScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Video transitions
  const videoScale = useTransform(scrollYProgress, [0, 0.25], [0.92, 1]);
  const videoX = useTransform(scrollYProgress, [0, 0.25], ['10%', '0%']);
  const videoY = useTransform(scrollYProgress, [0, 0.25], ['20%', '0%']);
  const videoRadius = useTransform(scrollYProgress, [0, 0.2], [6, 0]);
  const prefersReducedMotion = useReducedMotion();
  const textStyle = prefersReducedMotion
    ? { opacity: 1, scale: 1, y: 0 }
    : { opacity: contentOpacity, scale: contentScale, y: contentY };
  const orbStyle = prefersReducedMotion
    ? { opacity: 1, scale: 1 }
    : { opacity: glassOrbOpacity, scale: glassOrbScale };
  const videoStyle = prefersReducedMotion
    ? { scale: 1, x: '0%', y: '0%', borderRadius: 0 }
    : {
        scale: videoScale,
        x: videoX,
        y: videoY,
        borderRadius: videoRadius,
      };

  return (
    <section
      /* biome-ignore lint/correctness/useUniqueElementIds: Este ID precisa ser estático para anchors globais */
      id="hero"
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative h-[450vh] w-full bg-[#F4F5F7]"
    >
      {/* Container Sticky */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* 1. BACKGROUND AMBIENT 3D LAYER (Absolute behind everything) */}
        <motion.div
          style={orbStyle}
          className="absolute inset-0 z-[-1] pointer-events-auto"
        >
          <HeroGlassCanvas />
        </motion.div>

        {/* 2. TEXT + MEDIA GRID */}
        <motion.div
          style={textStyle}
          className="absolute inset-0 container mx-auto px-6 py-12 md:px-12 lg:px-16 h-full z-10 pointer-events-none"
        >
          <div className="relative h-full">
            <div className="grid h-full gap-12 md:gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <motion.div
                className="pointer-events-auto flex flex-col gap-8"
                initial={
                  prefersReducedMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 40 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
                }
              >
                <span className="text-[#0057FF] font-medium tracking-widest text-base md:text-lg uppercase">
                  [ BRAND AWARENESS ]
                </span>

                <div className="space-y-6">
                  <h1
                    id="hero-title"
                    className="text-[3.8rem] md:text-[5.5rem] lg:text-[7.5rem] font-extrabold tracking-[-0.04em] text-[#111111] leading-[0.95]"
                  >
                    Design, não é só estética.
                  </h1>
                  <div
                    aria-hidden="true"
                    className="hidden md:flex flex-col items-start gap-0"
                  >
                    <AnimatedTextLine
                      text="Design,"
                      delay={0.2}
                      colorClass="text-[#0057FF]"
                    />
                    <AnimatedTextLine
                      text="não é só"
                      delay={0.4}
                      colorClass="text-[#111111]"
                    />
                    <AnimatedTextLine
                      text="estética."
                      delay={0.6}
                      colorClass="text-[#111111]"
                    />
                  </div>
                </div>

                <p className="text-[#0057FF] text-lg md:text-xl font-medium tracking-wide bg-white/5 backdrop-blur-sm rounded-lg inline-block px-4 py-1">
                  [ É intenção, é estratégia, é experiência. ]
                </p>

                <div className="pointer-events-auto">
                  <MotionPrimaryButton
                    href="/sobre"
                    className="group"
                    whileHover={
                      prefersReducedMotion
                        ? undefined
                        : {
                            y: -2,
                            boxShadow: '0 15px 35px rgba(0, 87, 255, 0.3)',
                          }
                    }
                    whileTap={
                      prefersReducedMotion ? undefined : { scale: 0.98 }
                    }
                  >
                    <span>get to know me better</span>
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </span>
                  </MotionPrimaryButton>
                </div>
              </motion.div>

              <motion.div
                style={videoStyle}
                className="relative z-40 w-full h-full flex items-center justify-center overflow-hidden pointer-events-none"
              >
                <div className="relative w-full max-w-[560px] aspect-[4/3] rounded-[32px] bg-black shadow-2xl overflow-hidden pointer-events-auto">
                  <video
                    ref={videoRef}
                    src={ASSETS.videoManifesto}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
