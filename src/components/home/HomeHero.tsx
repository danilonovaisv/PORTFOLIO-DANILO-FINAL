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
import { HOME_CONTENT } from '@/config/content';

// Dynamically import WebGL canvas to avoid SSR issues
const GhostStage = dynamic(() => import('@/components/canvas/GhostStage'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0 bg-[#050505]" />,
});

export default function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll tracking for the entire hero section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Desktop context animations (fade out as video expands)
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);

  // Video animations (Desktop only)
  const videoScale = useTransform(scrollYProgress, [0, 0.8], [0.3, 1]); // Expand over most of the scroll
  const videoX = useTransform(scrollYProgress, [0, 0.8], ['35%', '0%']);
  const videoY = useTransform(scrollYProgress, [0, 0.8], ['30%', '0%']);
  const videoRadius = useTransform(scrollYProgress, [0, 0.6], [12, 0]);

  // Handle Video Unmute on Scroll (Desktop only)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (!isMobile && videoRef.current) {
      if (latest > 0.1 && latest < 0.95) {
        videoRef.current.muted = false;
      } else {
        videoRef.current.muted = true;
      }
    }
  });

  return (
    <>
      <section
        id="hero"
        ref={sectionRef}
        className={`relative w-full bg-[#050505] overflow-hidden ${isMobile ? 'h-screen' : 'h-[140vh]'}`}
      >
        {/* SYNC MASK STYLES */}
        <style>{`
          .hero-masked-content {
            -webkit-mask-image: ${
              reduceMotion
                ? 'none'
                : `radial-gradient(
              circle clamp(120px, 15vw, 250px) at var(--gx, 50%) var(--gy, 50%),
              rgba(0, 0, 0, 1) 0%,
              rgba(0, 0, 0, 1) 30%,
              rgba(0, 0, 0, 0) 80%
            )`
            };
            mask-image: ${
              reduceMotion
                ? 'none'
                : `radial-gradient(
              circle clamp(120px, 15vw, 250px) at var(--gx, 50%) var(--gy, 50%),
              rgba(0, 0, 0, 1) 0%,
              rgba(0, 0, 0, 1) 30%,
              rgba(0, 0, 0, 0) 80%
            )`
            };
            transition: none; /* Instant update from JS */
          }
          
          .hero-base-layer {
            opacity: ${reduceMotion ? 0 : 0.15}; /* Hide base layer if fully revealed by mask removal */
          }
        `}</style>

        {/* Sticky Container (Desktop) or Full Height (Mobile) */}
        <div
          className={`${isMobile ? 'relative h-full' : 'sticky top-0 h-screen'} w-full overflow-hidden flex items-center justify-center`}
        >
          {/* Layer 2: WebGL Atmosphere - ABOVE text */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <GhostStage />
          </div>

          {/* Layer 0: Hidden/Base Text Layer (Accessibility & subtle hint) */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center pointer-events-none hero-base-layer outline-hidden">
            {/* Same content as masked one but dimmed */}
            <div className="mb-6">
              <span className="text-white/40 font-medium tracking-widest text-xs md:text-sm uppercase">
                {HOME_CONTENT.hero.tag}
              </span>
            </div>
            <div className="text-[clamp(2.5rem,8vw,7.5rem)] font-extrabold tracking-[-0.04em] leading-[1.02] text-white/40 select-none">
              {HOME_CONTENT.hero.title[0]}
              <br />
              {HOME_CONTENT.hero.title[1]}
            </div>
          </div>

          {/* Layer 1: Masked Content (Revealed by Ghost) */}
          <motion.div
            style={{
              opacity: isMobile ? 1 : contentOpacity,
              scale: isMobile ? 1 : contentScale,
            }}
            className="absolute inset-0 z-15 flex flex-col items-center justify-center px-6 text-center pointer-events-none hero-masked-content"
          >
            {/* Brand Tag */}
            <div className="mb-6">
              <span className="text-white font-medium tracking-widest text-xs md:text-sm uppercase">
                {HOME_CONTENT.hero.tag}
              </span>
            </div>

            {/* Main Title */}
            <div className="mb-6">
              <h1 className="text-[clamp(2.5rem,8vw,7.5rem)] font-extrabold tracking-[-0.04em] leading-[1.02] text-white">
                {HOME_CONTENT.hero.title[0]}
                <br />
                {HOME_CONTENT.hero.title[1]}
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-white/80 text-sm md:text-lg mb-10 max-w-[600px] leading-relaxed">
              {HOME_CONTENT.hero.subtitle}
            </p>

            {/* CTA Button */}
            <div className="pointer-events-auto">
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-3 bg-[#0057FF] hover:bg-white hover:text-[#0057FF] text-white font-bold text-xs md:text-sm uppercase tracking-widest rounded-full px-8 py-4 transition-all duration-500 shadow-xl shadow-[#0057FF]/20"
              >
                {HOME_CONTENT.hero.cta.replace(' →', '')}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* Layer 3: Video (Desktop only, scroll-expanded) */}
          {!isMobile && (
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
          )}
        </div>
      </section>

      {/* Mobile Manifesto Video Section (Separate from Hero) */}
      {isMobile && (
        <section className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
          <video
            src={BRAND.video.manifesto}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            aria-label="Manifesto Video Mobile"
          />
        </section>
      )}
    </>
  );
}
