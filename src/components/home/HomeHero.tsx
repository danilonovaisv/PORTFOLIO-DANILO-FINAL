'use client';

import { useState, useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';

import GhostStage from './GhostStage';
import HeroCopy from './HeroCopy';
import HeroPreloader from './HeroPreloader';
import ManifestoThumb from './ManifestoThumb';

// --- SUB-COMPONENTE COM LÓGICA DE SCROLL SEGURA ---
// Este componente só é montado quando o browser está pronto, evitando o erro de "ref not hydrated"
function HomeHeroContent() {
  const heroRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  // Scroll progress relativo APENAS à Hero
  // Agora é seguro porque heroRef estará sempre ligado ao <section> retornado
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'], // 0 → 1 ao longo da Hero
  });

  useEffect(() => {
    // Deteção de mobile dentro do componente montado
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full min-h-[90vh] overflow-hidden bg-[#06071f]"
    >
      {/* Layer 0 — Background */}
      <div
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,#0b0d3a_0%,#06071f_60%)]"
        aria-hidden
      />

      {/* Layer 1 — WebGL Ghost (Desktop only) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <GhostStage enabled={isDesktop} />
      </div>

      {/* Layer 2 — Conteúdo estático */}
      <div className="relative z-20 flex min-h-[90vh] items-center justify-center">
        <HeroCopy />
      </div>

      {/* Layer 3 — Manifesto Thumb (Desktop only) */}
      {isDesktop && (
        <div className="absolute inset-0 z-30 pointer-events-none">
          <div className="absolute bottom-10 right-10">
            <ManifestoThumb scrollProgress={scrollYProgress} />
          </div>
        </div>
      )}
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
        <div className="h-screen w-full bg-ghost-void" />
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
