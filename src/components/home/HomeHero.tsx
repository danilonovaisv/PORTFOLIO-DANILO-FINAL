// src/components/home/HomeHero.tsx
'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';

import HeroCopy from './hero/HeroCopy';

// Dynamic import for the GhostHero component
const GhostHero = dynamic(() => import('./GhostHero'), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-black" />,
});

// Video URL from ManifestoSection reference (Supabase)
const MANIFESTO_VIDEO_URL =
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4';

export default function HomeHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // --- DESKTOP ANIMATIONS ---

  // Ghost: Fades out as we scroll
  const ghostOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const ghostScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  const ghostBlur = useTransform(
    scrollYProgress,
    [0, 0.3],
    ['blur(0px)', 'blur(10px)']
  );

  // Video: Scales up from a bottom-right thumbnail to fullscreen
  const videoScale = useTransform(scrollYProgress, [0, 0.8], [0.35, 1]); // Expand from 35%
  const videoRadius = useTransform(scrollYProgress, [0, 0.8], ['16px', '0px']);
  // Keep video fully opaque if it's meant to be visible as a thumb
  // const videoOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 1]);

  // Text Overlay on Video (Manifesto Title)
  const textOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.7, 0.9], [50, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[250vh] bg-black z-40"
      data-section="home"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden text-center">
        {/* === LAYER 1: GHOST HERO (Base) === */}
        {/* Wrapped in motion div to handle scroll fade out */}
        <motion.div
          className="relative w-full h-full z-10"
          style={{
            opacity: ghostOpacity,
            scale: ghostScale,
            filter: ghostBlur,
          }}
        >
          <GhostHero />
          <HeroCopy />
        </motion.div>

        {/* === LAYER 2: MANIFESTO VIDEO (Desktop Only) === */}
        {/* Hidden on mobile, handled by ManifestoSection */}
        <div className="hidden lg:flex absolute inset-0 z-20">
          {/* Thumb container positioning: Absolute Bottom Right */}
          {/* Pivot Point: origin-bottom-right is crucial for the effect */}
          <motion.div
            className="absolute bottom-12 right-12 aspect-video overflow-hidden shadow-[0_0_50px_rgba(14,68,255,0.35)] border border-white/8 bg-black/25 backdrop-blur pointer-events-auto"
            style={{
              width: '100%',
              height: '100%',
              scale: videoScale,
              borderRadius: videoRadius,
              originX: 1, // Right
              originY: 1, // Bottom
            }}
          >
            <div className="absolute -top-6 right-4 text-white opacity-80">
              <svg
                width="46"
                height="46"
                viewBox="0 0 46 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 31c6-1 15-6 19-12m0 0C29 13 34 8 39 7m-13 12L38 20"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M32.5 9.5L38.5 7l-2.5 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {/* The Video */}
            <video
              src={MANIFESTO_VIDEO_URL}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Slight Overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/10 to-transparent" />

            {/* Manifesto Text (Reveals at end of scroll) */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto"
              style={{ opacity: textOpacity, y: textY }}
            >
              <h2 className="text-white text-6xl md:text-8xl font-bold tracking-tighter mix-blend-overlay">
                MANIFESTO
              </h2>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
