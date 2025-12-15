'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';
import HeroGlassCanvas from '../three/HeroGlassCanvas';
import { ArrowRight } from 'lucide-react';
import { ASSETS } from '../../lib/constants';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

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

  // Scroll Control
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const prefersReducedMotion = usePrefersReducedMotion();

  // Animations
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  // Thumb Animation (Cinematic & Subtle)
  // Scale: 1.0 -> 1.08 (Growth)
  const videoScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.08]);
  // Y: Parallax effect (moves slower than scroll, creating depth)
  const videoY = useTransform(scrollYProgress, [0, 0.3], ['0%', '20%']);

  const handleThumbClick = () => {
    const manifestoSection = document.getElementById('manifesto');
    if (manifestoSection) {
      manifestoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      /* biome-ignore lint/correctness/useUniqueElementIds: This ID is static for global anchors */
      id="hero"
      ref={sectionRef}
      className="relative h-[200vh] w-full bg-[#F4F5F7]"
    >
      {/* Container Sticky */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* 1. BACKGROUND AMBIENT 3D LAYER */}
        <div className="absolute inset-0 z-[-1] pointer-events-auto opacity-60 mix-blend-multiply">
          {/* Maintained Glass Canvas but reduced prominence to let Thumb shine */}
          <HeroGlassCanvas />
        </div>

        {/* 2. TEXT CONTENT LAYER */}
        <motion.div
          style={{
            opacity: prefersReducedMotion ? 1 : contentOpacity,
            y: prefersReducedMotion ? 0 : contentY,
          }}
          className="absolute inset-0 container mx-auto px-6 md:px-12 lg:px-16 h-full z-10 pointer-events-none flex flex-col justify-center"
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

          <div className="flex flex-col justify-center items-start h-full pt-24 md:pt-0 max-w-4xl relative z-20">
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
            <motion.div className="pointer-events-auto">
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

        {/* 3. VIDEO THUMB LAYER (Cinematic Thumb on Right) */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          style={{
            scale: prefersReducedMotion ? 1 : videoScale,
            y: prefersReducedMotion ? 0 : videoY,
          }}
          className="absolute z-30 right-[5%] md:right-[8%] top-1/2 -translate-y-1/2 w-[85%] md:w-[35%] lg:w-[30%] aspect-video pointer-events-auto cursor-pointer"
          onClick={handleThumbClick}
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          role="button"
          aria-label="Ver Manifesto"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleThumbClick();
            }
          }}
        >
          <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl shadow-black/20 group">
            {/* Overlay sutil para integração */}
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10" />

            <video
              ref={videoRef}
              src={ASSETS.videoManifesto}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover transform scale-105" // Play safe scale
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
