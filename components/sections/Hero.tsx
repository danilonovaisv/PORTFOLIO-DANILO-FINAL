'use client';

import { useRef } from 'react';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import type { Variants } from 'framer-motion';
import HeroGlassCanvas from '../three/HeroGlassCanvas';
import { ArrowRight } from 'lucide-react';
import { ASSETS } from '../../lib/constants';

// Componente para animar texto letra por letra (efeito "digitação/reveal")
type AnimatedTextLineProps = {
  text: string;
  className?: string;
  delay?: number;
  colorClass?: string;
};

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
  const glassOrbOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const glassOrbScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  // Video transitions
  const videoScale = useTransform(scrollYProgress, [0, 0.25], [0.25, 1]);
  const videoX = useTransform(scrollYProgress, [0, 0.25], ['35%', '0%']);
  const videoY = useTransform(scrollYProgress, [0, 0.25], ['30%', '0%']);
  const videoRadius = useTransform(scrollYProgress, [0, 0.2], [12, 0]);

  return (
    <section
      /* biome-ignore lint/correctness/useUniqueElementIds: Este ID precisa ser estático para anchors globais */
      id="hero"
      ref={sectionRef}
      className="relative h-[450vh] w-full bg-[#F4F5F7]"
    >
      {/* Container Sticky */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* 1. BACKGROUND AMBIENT 3D LAYER (Absolute behind everything) */}
        <motion.div
          style={{ opacity: glassOrbOpacity, scale: glassOrbScale }}
          className="absolute inset-0 z-[-1] pointer-events-auto"
        >
          <HeroGlassCanvas />
        </motion.div>

        {/* 2. TEXT CONTENT LAYER */}
        <motion.div
          style={{ opacity: contentOpacity, scale: contentScale, y: contentY }}
          className="absolute inset-0 container mx-auto px-6 md:px-12 lg:px-16 h-full z-10 pointer-events-none"
        >
          {/* TAG LATERAL: BRAND AWARENESS */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden md:block"
          >
            <span className="text-[#0057FF] font-medium tracking-widest text-lg md:text-xl">
              [ BRAND AWARENESS ]
            </span>
          </motion.div>

          <div className="flex flex-col justify-center items-start h-full pt-24 md:pt-0 max-w-4xl">
            {/* Título Principal */}
            <div className="text-[4.5rem] md:text-7xl lg:text-[7.5rem] font-extrabold tracking-[-0.04em] mb-6 md:mb-10 font-sans flex flex-col items-start gap-1">
              {/* Mobile: Fade In Simples */}
              <div className="md:hidden flex flex-col leading-[0.9]">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-[#0057FF]"
                >
                  Design,
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-[#111111]"
                >
                  não é só
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
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
                />
                <AnimatedTextLine
                  text="não é só"
                  delay={0.5}
                  colorClass="text-[#111111]"
                />
                <AnimatedTextLine
                  text="estética."
                  delay={0.8}
                  colorClass="text-[#111111]"
                />
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
              className="pointer-events-auto" // Re-enable clicks
            >
              <motion.a
                href="/sobre"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 1.4,
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 30px -10px rgba(0, 87, 255, 0.5)',
                }}
                whileTap={{ scale: 0.98 }}
                className="group bg-[#0057FF] text-white rounded-full pl-8 pr-6 py-4 flex items-center gap-3 font-semibold text-base md:text-lg shadow-xl shadow-[#0057FF]/20 transition-all"
              >
                get to know me better
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                  <ArrowRight className="w-4 h-4 text-white" />
                </span>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

        {/* 3. VIDEO LAYER (Foreground) */}
        <motion.div
          style={{
            scale: videoScale,
            x: videoX,
            y: videoY,
            borderRadius: videoRadius,
          }}
          className="absolute z-40 w-full h-full flex items-center justify-center overflow-hidden shadow-2xl origin-center bg-black pointer-events-none"
        >
          <div className="relative w-full h-full block group pointer-events-auto">
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
    </section>
  );
};

export default Hero;
