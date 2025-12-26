'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ASSETS } from '@/lib/constants';
import HeroCopy from './HeroCopy';
import GhostStage from './GhostStage';
import HeroPreloader from './HeroPreloader';

// --- SUB-COMPONENTE DESKTOP ---
function DesktopHero() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  // Animação da Thumb (Dissolver)
  const thumbY = useTransform(smoothProgress, [0, 0.5], ['0%', '-20%']);
  const thumbScale = useTransform(smoothProgress, [0, 0.5], [1, 0.95]);
  const thumbOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
  const thumbBlur = useTransform(smoothProgress, [0, 0.4], ['0px', '12px']);

  // Ghost Fade Out
  const ghostOpacity = useTransform(smoothProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-[#06071f] overflow-hidden"
    >
      {/* 1. BACKGROUND AMBIENTAL (GHOST) */}
      <motion.div
        style={{ opacity: ghostOpacity }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <GhostStage enabled={true} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#06071f_90%)]" />
      </motion.div>

      {/* 2. TEXTO EDITORIAL */}
      <div className="relative z-10 flex h-full w-full items-center justify-center pointer-events-none">
        <HeroCopy />
      </div>

      {/* 3. MANIFESTO THUMB */}
      <motion.div
        style={{
          y: thumbY,
          scale: thumbScale,
          opacity: thumbOpacity,
          filter: thumbBlur, // Motion lida com strings de filtro em versões recentes
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="absolute bottom-8 right-8 z-20 w-[280px] aspect-video cursor-pointer overflow-hidden rounded-xl shadow-2xl bg-black/20 backdrop-blur-md border border-white/10 group"
        onClick={() => {
          const manifestoSection = document.getElementById('manifesto');
          if (manifestoSection) {
            manifestoSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            src={ASSETS.videoManifesto}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 scale-105 group-hover:scale-100 transition-transform"
          />

          <div className="absolute bottom-3 left-3 flex items-center gap-2 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0057FF] animate-pulse shadow-[0_0_8px_#0057FF]" />
            <span className="text-[10px] font-bold tracking-widest text-white/90 uppercase drop-shadow-md">
              Showreel
            </span>
          </div>

          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
        </div>
      </motion.div>
    </section>
  );
}

// --- COMPONENTE PRINCIPAL ---
export default function HomeHero() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMounted) return <div className="h-screen w-full bg-[#06071f]" />;

  return (
    <>
      <HeroPreloader isVisible={true} />

      {isMobile ? (
        <>
          <section className="relative min-h-[70vh] w-full bg-[#06071f] flex items-center justify-center overflow-hidden pt-20">
            <div className="absolute inset-0 opacity-40">
              <GhostStage enabled={false} />
            </div>
            <div className="relative z-10 px-4 w-full">
              <HeroCopy />
            </div>
          </section>
          {/* Manifesto Mobile */}
          <section
            id="manifesto-mobile"
            className="w-full bg-[#06071f] px-4 pb-12"
          >
            <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <video
                src={ASSETS.videoManifesto}
                autoPlay
                muted
                loop
                playsInline
                controls
                className="w-full h-full object-cover"
              />
            </div>
          </section>
        </>
      ) : (
        <DesktopHero />
      )}
    </>
  );
}
