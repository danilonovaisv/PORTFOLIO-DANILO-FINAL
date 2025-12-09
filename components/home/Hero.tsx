'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  useReducedMotion,
  Variants,
} from 'framer-motion';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Button from '../ui/Button';
import { BRAND_ASSETS } from '../../config/brand';

const HeroGlassCanvas = dynamic(() => import('../three/HeroGlassCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center opacity-50">
      <div className="w-[60vmin] h-[60vmin] rounded-full bg-linear-to-br from-[#E0E5EC] to-[#FFFFFF] animate-pulse blur-3xl opacity-60 mix-blend-multiply" />
    </div>
  ),
});
import { ASSETS } from '../../lib/constants';

// Componente para animar texto letra por letra (efeito "digitação/reveal")
type AnimatedTextLineProps = {
  text: string;
  className?: string;
  delay?: number;
  colorClass?: string;
  shouldReduceMotion?: boolean;
};

const AnimatedTextLine = ({
  text,
  className,
  delay = 0,
  colorClass = 'text-[#111111]',
  shouldReduceMotion = false,
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

  // Se o usuário preferir movimento reduzido, simplificamos para um fade in
  if (shouldReduceMotion) {
    return (
      <motion.div
        className={`flex ${className}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <span className={`block ${colorClass} leading-[0.9]`}>{text}</span>
      </motion.div>
    );
  }

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

const HERO_AUDIO_MUTE_THRESHOLD = 0.9;
const thumbVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const heroStickyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [thumbRevealed, setThumbRevealed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const updateHeroAudioMute = useCallback(
    (progress: number) => {
      if (!videoRef.current) return;
      // Mute while it's a "thumb" (start of scroll), Unmute when expanded
      const shouldMute = progress < 0.2;
      if (videoRef.current.muted !== shouldMute) {
        videoRef.current.muted = shouldMute;
      }
    },
    [videoRef]
  );

  // Controle de Scroll para a animação da timeline
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Monitora o progresso do scroll para controlar o áudio do vídeo
  useMotionValueEvent(scrollYProgress, 'change', updateHeroAudioMute);
  useEffect(() => {
    updateHeroAudioMute(scrollYProgress.get());
  }, [scrollYProgress, updateHeroAudioMute]);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) {
      setThumbRevealed(true);
      return undefined;
    }

    const target = heroStickyRef.current;
    if (!target || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting && entry.intersectionRatio >= 0.99) {
          setThumbRevealed(true);
        }
      },
      { threshold: [0.99, 1] }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!isModalOpen) {
      return undefined;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = isModalOpen ? 'hidden' : originalOverflow;

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isModalOpen]);

  const thumbSizeClasses =
    'w-[260px] h-[150px] md:w-[280px] md:h-[160px] lg:w-[200px] lg:h-[120px]';
  const thumbHoverClasses = shouldReduceMotion
    ? ''
    : 'transition-all duration-300 ease hover:scale-[1.05] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]';
  const thumbAnimationState =
    shouldReduceMotion || thumbRevealed ? 'visible' : 'hidden';
  const thumbInitialState = shouldReduceMotion ? 'visible' : 'hidden';

  // Animações Scroll-Driven
  // (Simplified or disabled if reduced motion is preferred could be handled here,
  // but framer motion handles some automatically. We explicitly limit ranges for performance)

  const contentOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.98]); // Reduced scale intensity
  const contentY = useTransform(
    scrollYProgress,
    [0, 0.15],
    [0, shouldReduceMotion ? 0 : -30]
  );

  // Animação Glass Orb
  const glassOrbOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const glassOrbScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]); // Subtle scale

  // Video transitions


  return (
    <section
      /* biome-ignore lint/correctness/useUniqueElementIds: Este ID precisa ser estático para anchors globais */
      id="hero"
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative h-[450vh] w-full bg-[#F4F5F7]"
    >
      {/* Container Sticky */}
      <div
        ref={heroStickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
      >
        {/* Logo no canto superior esquerdo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="absolute top-6 left-6 md:top-8 md:left-8 lg:top-10 lg:left-12 z-50"
        >
          <Image
            src={BRAND_ASSETS.logo}
            alt="Danilo Novais Logo"
            width={120}
            height={40}
            priority
            className="h-8 md:h-10 lg:h-12 w-auto"
          />
        </motion.div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 lg:left-auto lg:right-6 lg:translate-x-0 md:bottom-8 lg:bottom-10 pointer-events-none">
            <motion.button
              type="button"
              aria-label="Abrir manifesto em vídeo"
              className={`pointer-events-auto relative group rounded-[1.75rem] bg-white/90 shadow-[0_15px_35px_rgba(15,23,42,0.2)] border border-[#CAE0FF] overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0057FF] ${thumbSizeClasses} ${thumbHoverClasses}`}
              onClick={handleOpenModal}
              variants={thumbVariants}
              initial={thumbInitialState}
              animate={thumbAnimationState}
            >
              <div className="relative w-full h-full rounded-[1.75rem] overflow-hidden">
                <Image
                  src={ASSETS.heroManifestThumb}
                  alt="Miniatura do manifesto em vídeo"
                  fill
                  sizes="(max-width: 1024px) 280px, 200px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-white/75 backdrop-blur-sm" />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
                <span className="text-[0.65rem] md:text-[0.75rem] tracking-[0.35em] font-semibold text-[#0057FF]">
                  [ BRAND AWARENESS ]
                </span>
                <span className="text-2xl md:text-[2.4rem] text-[#0057FF] leading-none">↓</span>
              </div>
            </motion.button>
          </div>
        </div>
        {/* Main Content Layer */}
        <motion.div
          style={{
            opacity: contentOpacity,
            scale: shouldReduceMotion ? 1 : contentScale,
            y: contentY,
          }}
          className="absolute inset-0 container mx-auto px-6 md:px-12 lg:px-16 h-full z-10 pointer-events-none"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-8">
            {/* Coluna Esquerda: Texto e CTA */}
            <div className="flex flex-col justify-center items-start h-full pt-24 md:pt-0 max-w-4xl lg:max-w-none">
              {/* Título Principal */}
              <div className="relative w-full mb-6 md:mb-10">
                <h1 id="hero-title" className="sr-only">
                  Design, não é só estética. É intenção, é estratégia, é
                  experiência.
                </h1>
                <div
                  aria-hidden="true"
                  className="text-[3.5rem] sm:text-[4.5rem] md:text-7xl lg:text-[7.5rem] font-extrabold tracking-[-0.04em] font-sans flex flex-col items-start gap-1"
                >
                  {/* Mobile: Fade In Simples */}
                  <div className="md:hidden flex flex-col leading-[0.9]">
                    <motion.span
                      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-[#0057FF]"
                    >
                      Design,
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-[#111111]"
                    >
                      não é só
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-[#111111]"
                    >
                      estética.
                    </motion.span>
                  </div>

                  {/* Desktop: Animação Letra por Letra */}
                  <div className="hidden md:flex flex-col items-start gap-0">
                    <AnimatedTextLine
                      text="Design,"
                      delay={0.2}
                      colorClass="text-[#0057FF]"
                      shouldReduceMotion={Boolean(shouldReduceMotion)}
                    />
                    <AnimatedTextLine
                      text="não é só"
                      delay={0.4}
                      colorClass="text-[#111111]"
                      shouldReduceMotion={Boolean(shouldReduceMotion)}
                    />
                    <AnimatedTextLine
                      text="estética."
                      delay={0.6}
                      colorClass="text-[#111111]"
                      shouldReduceMotion={Boolean(shouldReduceMotion)}
                    />
                  </div>
                </div>
              </div>

              {/* Subtítulo */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 1.2 }}
                className="mb-10 md:mb-14 relative"
              >
                <p className="text-[#0057FF] text-lg md:text-xl font-medium tracking-wide bg-white/5 backdrop-blur-sm rounded-lg pr-4 inline-block">
                  [ É intenção, é estratégia, é experiência. ]
                </p>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                className="pointer-events-auto"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 1.4,
                }}
              >
                <Button href="/sobre">get to know me better</Button>
              </motion.div>
            </div>

            {/* Coluna Direita: Orb 3D (Desktop) */}
            {/* Coluna Direita: Orb 3D / Video (Desktop) */}
            <div className="hidden lg:flex flex-col justify-center items-end relative h-full pointer-events-none">
               <motion.div
                 initial={{ opacity: 0, x: 40 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.6, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                 className="pointer-events-auto relative z-20 w-full max-w-[400px] xl:max-w-[480px] mr-0 xl:mr-8"
               >
                  <div className="relative overflow-hidden rounded-[1.75rem] border border-white/60 bg-[#050505] shadow-[0_25px_60px_rgba(2,6,23,0.65)]">
                     <div className="aspect-video w-full">
                       <video
                         ref={videoRef}
                         src={ASSETS.videoManifesto}
                         autoPlay
                         muted
                         loop
                         playsInline
                         className="w-full h-full object-cover"
                       />
                     </div>
                     <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/40" />
                  </div>
               </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 md:translate-x-12"
              >
                <span className="writing-vertical-rl text-[#0057FF] font-medium tracking-widest text-lg md:text-xl opacity-80 whitespace-nowrap rotate-180">
                  [ BRAND AWARENESS ]
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {isModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Vídeo manifesto em fullscreen"
            tabIndex={-1}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-6"
            onClick={handleCloseModal}
          >
            <div
              className="relative w-full max-w-4xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Fechar vídeo"
                onClick={(event) => {
                  event.stopPropagation();
                  handleCloseModal();
                }}
                className="absolute right-4 top-4 z-10 rounded-full border border-white/40 bg-black/40 px-3 py-1 text-lg font-semibold text-white transition-all duration-200 hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                ×
              </button>
              <div className="aspect-video w-full rounded-[2rem] border border-white/40 bg-black shadow-[0_20px_60px_rgba(2,6,23,0.6)]">
                <video
                  src={ASSETS.videoManifesto}
                  autoPlay
                  muted
                  playsInline
                  loop
                  controls
                  className="h-full w-full rounded-[2rem] object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* 3D Orb Background/Layer - Mantendo posicionado e dimensionado via container, mas visualmente "atrás" */}
        <motion.div
          style={{
            opacity: glassOrbOpacity,
            scale: shouldReduceMotion ? 1 : glassOrbScale,
          }}
          className="absolute inset-0 z-0 pointer-events-auto flex items-center justify-center lg:justify-end"
        >
          {/* Container for the 3D canvas that mostly sits on the right in desktop */}
          <div className="w-full h-full lg:w-3/5 lg:translate-x-20">
            <HeroGlassCanvas />
          </div>
        </motion.div>

        {/* 3. VIDEO LAYER (Foreground) */}

      </div>
    </section>
  );
};

export default Hero;
