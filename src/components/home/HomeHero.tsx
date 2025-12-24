// src/components/home/HomeHero.tsx
'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { BRAND } from '@/config/brand';

// Dynamically import WebGL canvas to avoid SSR issues
const GhostStage = dynamic(() => import('@/components/canvas/GhostStage'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_#0b0d3a_0%,_#050505_60%)]" />
  ),
});

// Animated Text Component (letter-by-letter reveal)
const AnimatedText: React.FC<{
  text: string;
  className?: string;
  delayStart?: number;
}> = ({ text, className, delayStart = 0 }) => {
  const letters = text.split('');

  return (
    <p
      className={`ref-word-anim flex overflow-hidden leading-[1.15] ${className}`}
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

export default function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  // Trigger text animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Scroll tracking for the entire hero section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Monitor scroll for video audio control
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (videoRef.current) {
      // Unmute only when scrolled into section but not leaving
      if (latest > 0.01 && latest < 0.9) {
        videoRef.current.muted = false;
      } else {
        videoRef.current.muted = true;
      }
    }
  });

  // Content animations (fade out as video expands)
  const contentOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const contentY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  // Video animations (scale up from corner to fullscreen)
  const videoScale = useTransform(scrollYProgress, [0, 0.25], [0.25, 1]);
  const videoX = useTransform(scrollYProgress, [0, 0.25], ['35%', '0%']);
  const videoY = useTransform(scrollYProgress, [0, 0.25], ['30%', '0%']);
  const videoRadius = useTransform(scrollYProgress, [0, 0.2], [12, 0]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[250vh] w-full bg-[#050505]"
    >
      {/* CSS for letter animation */}
      <style>{`
        .ref-word-anim {
          --trans-duration: 1500ms;
          --trans-delay-factor: 25ms;
          --trans-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
        }
        
        .ref-word-anim span {
          transform: translateY(110%);
          opacity: 0;
          transition: transform var(--trans-duration) var(--trans-timing-function), 
                      opacity var(--trans-duration) var(--trans-timing-function);
          transition-delay: calc(var(--i) * var(--trans-delay-factor));
        }

        .hero-text-visible .ref-word-anim span {
          transform: translateY(0);
          opacity: 1;
        }
      `}</style>

      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Layer 0: WebGL Atmosphere */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <GhostStage />
        </div>

        {/* Layer 1: Text Content */}
        <motion.div
          style={{
            opacity: reduceMotion ? 1 : contentOpacity,
            scale: reduceMotion ? 1 : contentScale,
            y: reduceMotion ? 0 : contentY,
          }}
          className={`absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pointer-events-none ${
            isVisible ? 'hero-text-visible' : ''
          }`}
        >
          {/* Brand Tag */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-6"
          >
            <span className="text-[#0057FF] font-medium tracking-widest text-sm uppercase">
              [ BRAND AWARENESS ]
            </span>
          </motion.div>

          {/* Main Title */}
          <div className="text-center mb-6 pointer-events-auto">
            <div className="text-[clamp(2.5rem,8vw,6rem)] font-extrabold tracking-[-0.04em] flex flex-col items-center gap-1">
              <AnimatedText
                text="Design,"
                className="text-[#0057FF]"
                delayStart={0}
              />
              <AnimatedText
                text="não é só"
                className="text-[#d9dade]"
                delayStart={7}
              />
              <AnimatedText
                text="estética."
                className="text-[#d9dade]"
                delayStart={15}
              />
            </div>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-[#888888] text-base md:text-lg mb-10 text-center"
          >
            [ É intenção, é estratégia, é experiência. ]
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto"
          >
            <Link
              href="/sobre"
              className="group inline-flex items-center gap-3 bg-[#0057FF] hover:bg-[#0047DD] text-white font-semibold text-sm md:text-base rounded-full px-6 py-3.5 transition-all duration-300 shadow-lg shadow-[#0057FF]/25 hover:shadow-xl hover:shadow-[#0057FF]/30"
            >
              get to know me better
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Layer 2: Video (Foreground) - Expands from corner to fullscreen */}
        <motion.div
          style={{
            scale: reduceMotion ? 1 : videoScale,
            x: reduceMotion ? '0%' : videoX,
            y: reduceMotion ? '0%' : videoY,
            borderRadius: reduceMotion ? 0 : videoRadius,
          }}
          className="absolute z-40 w-full h-full flex items-center justify-center overflow-hidden shadow-2xl origin-center bg-black pointer-events-none"
        >
          <div className="relative w-full h-full pointer-events-auto">
            <video
              ref={videoRef}
              src={BRAND.video.manifesto}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              aria-label="Showreel video"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
