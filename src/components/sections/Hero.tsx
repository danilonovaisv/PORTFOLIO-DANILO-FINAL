'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ASSETS } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

// Dynamically import the 3D component with SSR disabled
const HeroGlassCanvas = dynamic(
  () => import('@/components/three/HeroGlassCanvas'),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center">
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 animate-pulse" />
      </div>
    ),
  }
);

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
  const letters = text.split('');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  };

  const child: Variants = {
    hidden: {
      y: '110%',
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      className={`flex overflow-hidden ${className}`}
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
  const prefersReducedMotion = usePrefersReducedMotion();

  // Scroll Progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Audio Control
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (videoRef.current) {
      if (latest > 0.01 && latest < 0.9) {
        videoRef.current.muted = false;
      } else {
        videoRef.current.muted = true;
      }
    }
  });

  // --- TRANSFORMS ---
  // Text Content (Parallax & Fade)
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  // 3D Element (Moves differently than text)
  const orbY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const orbScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);

  // Video Thumb (Scrolls into view / expands)
  // Starts small/offset, expands to full or focal point
  // Note: The prompt implies the thumb is VISIBLE initially in the 2-col layout.
  // The expansion logic might be for the "Manifesto" transition or just parallax.
  // Based on "Thumb não vira fullscreen", we keep it contained.
  const thumbY = useTransform(scrollYProgress, [0, 0.3], [0, -150]);
  const thumbScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full bg-[#F4F5F7] min-h-screen md:h-[300vh]"
    >
      {/* --- MOBILE LAYOUT (Default < md) --- */}
      <div className="md:hidden flex flex-col items-center text-center px-6 pt-24 pb-16 gap-10">
        {/* 3D Element - Increased Presence */}
        <div className="relative w-[85vw] h-[85vw] max-w-[360px] max-h-[360px] -mt-8">
          <HeroGlassCanvas />
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center gap-2 z-10">
          <div className="flex flex-col items-center text-[clamp(2.5rem,12vw,4rem)] font-extrabold tracking-[-0.04em] leading-[0.95]">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="text-[#0057FF]"
            >
              Design,
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              className="text-[#111111]"
            >
              não é só
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
              className="text-[#111111]"
            >
              estética.
            </motion.span>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[#0057FF] text-sm font-semibold tracking-widest uppercase mt-4"
          >
            [ É intenção, é estratégia, é experiência. ]
          </motion.p>
        </div>

        {/* CTA */}
        <motion.a
          href="/sobre"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#0057FF] px-10 py-5 text-base font-semibold text-white shadow-[0_10px_24px_-12px_rgba(0,87,255,0.6)] transition-all active:scale-95"
        >
          get to know me better
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </motion.a>

        {/* Video Thumb (Mobile Bottom) */}
        <div className="w-full mt-8 rounded-2xl overflow-hidden shadow-2xl aspect-video relative">
          <video
             src={ASSETS.videoManifesto}
             autoPlay
             muted
             loop
             playsInline
             className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* --- DESKTOP LAYOUT (md+) --- */}
      <div className="hidden md:block sticky top-0 h-screen w-full overflow-hidden">
         {/* Container Grid */}
         <div className="container mx-auto h-full grid grid-cols-12 px-6 lg:px-12 gap-8 items-center">

            {/* LEFT COLUMN: TEXT CONTENT (Span 7) */}
            <motion.div
               style={{ opacity: contentOpacity, y: contentY }}
               className="col-span-12 lg:col-span-7 flex flex-col items-start justify-center relative z-20 pl-4 lg:pl-12"
            >
               {/* Headline */}
               <div className="flex flex-col items-start font-extrabold tracking-[-0.04em] text-[clamp(3.5rem,5.5vw,7.5rem)] leading-[0.95] mb-8 lg:mb-12">
                  <AnimatedTextLine
                    text="Design,"
                    delay={0.2}
                    colorClass="text-[#0057FF]"
                  />
                  <AnimatedTextLine
                    text="não é só"
                    delay={0.35}
                    colorClass="text-[#111111]"
                  />
                  <AnimatedTextLine
                    text="estética."
                    delay={0.5}
                    colorClass="text-[#111111]"
                  />
               </div>

               {/* Subtitle */}
               <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                  className="mb-12"
               >
                  <p className="text-[#0057FF] text-lg lg:text-xl font-medium tracking-wide bg-white/5 backdrop-blur-sm rounded-lg inline-block">
                    [ É intenção, é estratégia, é experiência. ]
                  </p>
               </motion.div>

               {/* CTA */}
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
               >
                  <a
                    href="/sobre"
                    className="group bg-[#0057FF] text-white rounded-full pl-10 pr-8 py-5 flex items-center gap-4 font-semibold text-lg shadow-xl shadow-[#0057FF]/20 hover:shadow-[#0057FF]/40 hover:scale-105 transition-all duration-300"
                  >
                    get to know me better
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </span>
                  </a>
               </motion.div>
            </motion.div>

            {/* RIGHT COLUMN: VISUALS (Span 5) */}
            <div className="col-span-12 lg:col-span-5 relative h-full flex items-center justify-center lg:justify-end z-10">
               {/* 3D Orb - Floating/Parallax */}
               <motion.div
                  style={{ y: orbY, scale: orbScale }}
                  className="absolute inset-0 lg:right-[-10%] lg:w-[120%] lg:h-full pointer-events-none"
               >
                  <HeroGlassCanvas />
               </motion.div>

               {/* Video Thumb - Floating with offset */}
               <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: 50 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 1.0, delay: 1.2, ease: "easeOut" }}
                  style={{ y: thumbY, scale: thumbScale }}
                  className="relative z-20 w-[280px] lg:w-[320px] aspect-[9/16] lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 translate-y-24 lg:translate-y-32 lg:translate-x-12 backdrop-blur-md"
               >
                  <video
                    ref={videoRef}
                    src={ASSETS.videoManifesto}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                  />
                  {/* Brand Tag on Thumb */}
                  <div className="absolute bottom-6 left-6 right-6">
                     <span className="text-[10px] uppercase tracking-[0.3em] text-white/80 font-bold block mb-1">
                        Showcase
                     </span>
                     <span className="text-white text-sm font-medium leading-tight block">
                        Visual Manifesto
                     </span>
                  </div>
               </motion.div>

               {/* Brand Awareness Tag (Floating) */}
               <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                  className="absolute top-1/4 right-0 lg:-right-8 hidden lg:block"
               >
                 <span className="text-[#0057FF]/40 font-bold tracking-widest text-sm writing-mode-vertical rotate-180">
                   [ BRAND AWARENESS ]
                 </span>
               </motion.div>
            </div>
         </div>
      </div>
    </section>
  );
};

export default Hero;
