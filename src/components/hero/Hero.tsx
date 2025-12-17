'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ASSETS } from '../../lib/constants';

// Dynamic import of the existing Glass Scene
const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

// Reference Animation Logic adapted for React
// Uses the specific linear() easing from the provided CSS reference
const RefAnimatedText: React.FC<{
  text: string;
  className?: string;
  delayStart?: number; // offset index for stagger
}> = ({ text, className, delayStart = 0 }) => {
  const letters = text.split('');

  return (
    <p
      className={`ref-word-anim flex overflow-hidden leading-[0.9] ${className}`}
      aria-label={text}
    >
      {letters.map((letter, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{ '--i': i + delayStart } as React.CSSProperties}
          className="block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </p>
  );
};

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  // Mouse / Cursor Logic (Migrated from previous Hero.tsx)
  const mouseXRaw = useMotionValue(0);
  const mouseYRaw = useMotionValue(0);
  const mouseX = useSpring(mouseXRaw, {
    stiffness: 120,
    damping: 26,
    mass: 0.8,
  });
  const mouseY = useSpring(mouseYRaw, {
    stiffness: 120,
    damping: 26,
    mass: 0.8,
  });

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseXRaw.set((x - 0.5) * 2);
      mouseYRaw.set((y - 0.5) * 2);
    },
    [mouseXRaw, mouseYRaw]
  );

  const onPointerLeave = useCallback(() => {
    mouseXRaw.set(0);
    mouseYRaw.set(0);
  }, [mouseXRaw, mouseYRaw]);

  // Trigger animation on mount/view
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Control Scroll for timeline animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Monitor scroll for video audio
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (videoRef.current) {
      if (latest > 0.01) {
        videoRef.current.muted = false;
      } else {
        videoRef.current.muted = true;
      }
    }
  });

  // Animations
  const contentOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const contentY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  // Video transitions
  const videoScale = useTransform(scrollYProgress, [0, 0.25], [0.25, 1]);
  const videoX = useTransform(scrollYProgress, [0, 0.25], ['35%', '0%']);
  const videoY = useTransform(scrollYProgress, [0, 0.25], ['30%', '0%']);
  const videoRadius = useTransform(scrollYProgress, [0, 0.2], [12, 0]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative h-[250vh] w-full bg-[#F4F5F7]" // Adjusted height to be functional but allow scroll
    >
      {/* Inject specific CSS for the reference animation */}
      <style>{`
        .ref-word-anim {
          --trans-duration: 1800ms; /* Slightly faster than 3000ms for snapping feel */
          --trans-delay-factor: 30ms;
          /* The specific linear easing from the reference */
          --trans-timing-function: linear(0, 0.011 0.6%, 0.041 1.2%, 0.173 2.6%, 0.894 7.4%, 1.128 9.3%, 1.271 11.1%, 1.311 12%, 1.333 13%, 1.328 14.4%, 1.286 15.9%, 1.031 21%, 0.95 23%, 0.907 24.7%, 0.888 26.5%, 0.89 27.9%, 0.904 29.4%, 1.034 42.5%, 0.997 49.3%, 0.987 53.3%, 1.004 66.5%, 1);
        }
        
        .ref-word-anim span {
          transform: translateY(110%);
          opacity: 0;
          transition: transform var(--trans-duration) var(--trans-timing-function), opacity var(--trans-duration) var(--trans-timing-function);
          transition-delay: calc(var(--i) * var(--trans-delay-factor));
        }

        .hero-text-visible .ref-word-anim span {
          transform: translateY(0);
          opacity: 1;
        }
      `}</style>

      {/* Container Sticky */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* 0. ORB LAYER (Background) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <HeroScene
            mouseX={mouseX}
            mouseY={mouseY}
            scrollYProgress={scrollYProgress}
            reducedMotion={!!reduceMotion}
          />
        </div>

        {/* 1. TEXT CONTENT LAYER */}
        <motion.div
          style={{ opacity: contentOpacity, scale: contentScale, y: contentY }}
          className={`absolute inset-0 container mx-auto px-6 md:px-12 lg:px-16 h-full z-10 pointer-events-none ${isVisible ? 'hero-text-visible' : ''}`}
        >
          {/* TAG LATERAL: BRAND AWARENESS */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden md:block" // Hidden on mobile to avoid overlap
          >
            <span className="text-[#0057FF] font-medium tracking-widest text-lg md:text-xl">
              [ BRAND AWARENESS ]
            </span>
          </motion.div>

          {/* Wrapper for text content */}
          <div className="flex flex-col justify-center items-start h-full pt-20 max-w-4xl cursor-auto pointer-events-auto">
            {/* Título Principal */}
            <div className="text-[clamp(3.5rem,10vw,7.5rem)] font-extrabold tracking-[-0.04em] mb-6 md:mb-10 font-display flex flex-col items-start gap-1">
              {/* Animação unificada (Mobile & Desktop) usando a referência CSS */}
              <div className="flex flex-col items-start gap-0">
                <RefAnimatedText
                  text="Design,"
                  className="text-[#0057FF]"
                  delayStart={0}
                />
                <RefAnimatedText
                  text="não é só"
                  className="text-[#111111]"
                  delayStart={7}
                />
                <RefAnimatedText
                  text="estética."
                  className="text-[#111111]"
                  delayStart={15}
                />
              </div>
            </div>

            {/* Subtítulo */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 1.8 }}
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
                  delay: 2.0,
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

        {/* 2. VIDEO LAYER (Foreground) */}
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
