'use client';

import React, { useRef, useEffect, useState } from 'react';
import FluidGlassOverlay from './FluidGlassOverlay';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import dynamic from 'next/dynamic';
import { ArrowRight } from 'lucide-react';
import { ASSETS } from '../../lib/constants';
import FluidGlassOverlay from './FluidGlassOverlay';
import { useHeroMouse } from './useHeroMouse';

const HeroOrbLayer = dynamic(() => import('./HeroOrbLayer'), {
  ssr: false,
});

/* ===== TEXTO ANIMADO (SEU ORIGINAL) ===== */
const RefAnimatedText: React.FC<{
  text: string;
  blueStart?: boolean;
  delayBase?: number;
}> = ({ text, blueStart = false, delayBase = 0 }) => {
  const words = text.split(' ');
  let totalCharIndex = delayBase;

  return (
    <div className="flex flex-wrap gap-[0.25em]">
      {words.map((word, wIndex) => (
        <span
          key={wIndex}
          className={`word ${blueStart ? 'blue-start' : ''}`}
          aria-label={word}
        >
          {word.split('').map((letter, lIndex) => {
            const currentDelay = totalCharIndex++;
            return (
              <span
                key={lIndex}
                aria-hidden="true"
                style={{ '--i': currentDelay } as React.CSSProperties}
              >
                {letter}
              </span>
            );
          })}
        </span>
      ))}
    </div>
  );
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mouse = useHeroMouse();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (videoRef.current) {
      videoRef.current.muted = latest <= 0.01;
    }
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const contentY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  const videoScale = useTransform(scrollYProgress, [0, 0.25], [0.25, 1]);
  const videoX = useTransform(scrollYProgress, [0, 0.25], ['35%', '0%']);
  const videoY = useTransform(scrollYProgress, [0, 0.25], ['30%', '0%']);
  const videoRadius = useTransform(scrollYProgress, [0, 0.2], [12, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-[450vh] w-full bg-[#F4F4F4]"
    >
      {/* ===== CSS ORIGINAL + FLUID GLASS ===== */}
      <style>{`
        .fluid-glass-overlay {
          position: absolute;
          inset: -0.25em;
          pointer-events: none;
          z-index: 20;
          backdrop-filter: blur(10px) saturate(1.1);
          -webkit-backdrop-filter: blur(10px) saturate(1.1);
          border-radius: 0.3em;
          overflow: hidden;
        }
      `}</style>

      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* ===== TEXTO ===== */}
        <motion.div
          style={{
            opacity: contentOpacity,
            scale: contentScale,
            y: contentY,
          }}
          className={`absolute inset-0 container mx-auto px-6 md:px-12 lg:px-16 h-full z-10 pointer-events-none ${
            isVisible ? 'hero-text-visible' : ''
          }`}
        >
          <div className="flex flex-col justify-center h-full max-w-5xl pointer-events-auto">
            <div className="text-[4.5rem] md:text-[7rem] lg:text-[8.7rem] font-extrabold tracking-[-0.06em] leading-[0.9]">
              <RefAnimatedText text="Design," blueStart delayBase={0} />

              <div className="relative">
                <RefAnimatedText text="não é só" delayBase={6} />
                <FluidGlassOverlay progress={scrollYProgress} />
              </div>

              <RefAnimatedText text="estética." delayBase={14} />
            </div>

            <p className="mt-6 text-[#0057FF] text-lg md:text-xl font-medium">
              [ É intenção, é estratégia, é experiência. ]
            </p>

            <motion.a
              href="/sobre"
              className="mt-10 inline-flex items-center gap-3 bg-[#0057FF] text-white rounded-full pl-8 pr-6 py-4 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              get to know me better
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>

        {/* ===== ORB (ACIMA DO TEXTO) ===== */}
        <HeroOrbLayer mouse={mouse} scrollYProgress={scrollYProgress} />

        {/* ===== VÍDEO ===== */}
        <motion.div
          style={{
            scale: videoScale,
            x: videoX,
            y: videoY,
            borderRadius: videoRadius,
          }}
          className="absolute z-40 w-full h-full overflow-hidden bg-black pointer-events-none"
        >
          <video
            ref={videoRef}
            src={ASSETS.videoManifesto}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
