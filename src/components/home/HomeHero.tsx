'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import GhostStage from './GhostStage';
import HeroCopy from './HeroCopy';
import HeroPreloader from './HeroPreloader';
import ManifestoThumb from './ManifestoThumb';
import PlayButton from './PlayButton';

// --- SUB-COMPONENTE COM LÓGICA DE SCROLL SEGURA ---
// Este componente só é montado quando o browser está pronto, evitando o erro de "ref not hydrated"
function HomeHeroContent() {
  const heroRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Scroll progress relativo APENAS à Hero
  // Agora é seguro porque heroRef estará sempre ligado ao <section> retornado
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'], // 0 → 1 ao longo da Hero
  });

  // PlayButton timetable
  const playButtonOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 0.6],
    [0, 1, 1, 0]
  );

  // HeroCopy limpa rapidamente (0 -> 10%)
  const copyOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  useEffect(() => {
    // Deteção de mobile dentro do componente montado
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section
      ref={heroRef}
      // Scroll curto e direto para o takeover do vídeo
      className={`relative w-full bg-[#06071f] ${isMobile ? 'h-[120vh]' : 'h-[130vh]'}`}
    >
      {/* Layer 0 — WebGL Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <GhostStage enabled />
      </div>

      {/* Layer 2 — Texto Editorial (Z-20 para ficar ACIMA do vídeo inicialmente) */}
      <motion.div
        style={{ opacity: copyOpacity }}
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
      >
        <HeroCopy />
      </motion.div>

      {/* Layer 1 — Vídeo HERO (Sticky + Scroll Driven) - Z-10 */}
      <div className="absolute inset-0 z-10">
        <div className="sticky top-0 h-screen w-full flex items-end justify-end overflow-hidden">
          <ManifestoThumb
            scrollProgress={scrollYProgress}
            isMobile={isMobile}
          />
        </div>
      </div>

      {/* Layer 3 — Play Button */}
      <motion.div
        style={{ opacity: playButtonOpacity }}
        className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
      >
        <div className="pointer-events-auto cursor-pointer">
          <PlayButton />
        </div>
      </motion.div>
    </section>
  );
}

// --- COMPONENTE PRINCIPAL (WRAPPER) ---
export default function HomeHero() {
  const [isMounted, setIsMounted] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    const timeout = setTimeout(() => setShowPreloader(false), 1200);
    return () => clearTimeout(timeout);
  }, []);

  // Se não estiver montado, mostramos apenas o placeholder/preloader
  // O hook useScroll NÃO corre aqui, prevenindo o erro.
  if (!isMounted) {
    return (
      <>
        <HeroPreloader isVisible={true} />
        <div className="h-screen w-full bg-[#06071f]" />
      </>
    );
  }

  return (
    <>
      <HeroPreloader isVisible={showPreloader} />
      {/* Renderizamos o conteúdo real apenas agora */}
      <HomeHeroContent />
    </>
  );
}
