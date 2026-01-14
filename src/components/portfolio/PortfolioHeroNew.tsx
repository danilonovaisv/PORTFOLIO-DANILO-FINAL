// =============================================================================
// PortfolioHeroNew - Ghost Era v2.2
// Hero com video loop responsivo, atmosfera Ghost e animações etéreas
// Conforme especificação: PORTFOLIO - PROTÓTIPO INTERATIVO.md
// =============================================================================

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { PORTFOLIO_CONTENT } from '@/config/content';
import { 
  MOTION_TOKENS, 
  ghostTransition
} from '@/config/motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import AntigravityCTA from '@/components/ui/AntigravityCTA';

// Motion config - Ghost Era ethereal timing
const { duration, offset } = MOTION_TOKENS;

export default function PortfolioHeroNew() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Seleciona o vídeo correto baseado no dispositivo
  const videoSrc = isMobile
    ? PORTFOLIO_CONTENT.hero.video.mobile
    : PORTFOLIO_CONTENT.hero.video.desktop;

  const handleCTAClick = () => {
    // Scroll suave para a seção de contato
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="portfolio-hero"
      aria-label="Portfolio Hero"
      // Mobile: h-[70vh] to allow scroll. Desktop: h-screen
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Video Background - Responsivo Desktop/Mobile */}
      <div className="absolute inset-0 z-0">
        <video
          key={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* Main Gradient Overlay - Intenso nas bordas para legibilidade */}
      <div 
        className="absolute inset-0 z-10 bg-linear-to-b from-black/60 via-black/40 to-black/60" 
      />

      {/* Ghost Atmospheric Radial Gradients - Enhanced */}
      <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true">
        {/* Primary blue glow - top left */}
        <div className="absolute inset-0 portfolio-hero-glow-primary" />
        {/* Accent cyan glow - top right */}
        <div className="absolute inset-0 portfolio-hero-glow-accent" />
        {/* Subtle purple accent - mid-left */}
        <div className="absolute inset-0 portfolio-hero-glow-purple" />
        {/* Vignette effect - focus attention */}
        <div className="absolute inset-0 portfolio-hero-vignette" />
      </div>

      {/* Content - Centralizado */}
      <div className="relative z-20 h-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-6 md:px-12">
        {/* Título principal - "portfólio" em azul acento, "showcase" em branco */}
        <motion.h1
          initial={prefersReducedMotion ? false : { opacity: 0, y: offset.large, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={ghostTransition(0.2, duration.slow)}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-[1.05] will-change-transform text-center md:text-left"
        >
          <span className="text-blueAccent font-bold">portfólio</span>{' '}
          <span className="text-white font-bold">showcase</span>
        </motion.h1>

        {/* Separador vertical apenas no desktop */}
        <motion.div 
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={ghostTransition(0.4, duration.normal)}
          className="hidden md:block w-px h-16 bg-white/20 self-center"
        />

        {/* CTA Button - Using AntigravityCTA component */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: offset.standard }}
          animate={{ opacity: 1, y: 0 }}
          transition={ghostTransition(0.4, duration.normal)}
          className="flex justify-center"
        >
          <AntigravityCTA
            onClick={handleCTAClick}
            text="vamos trabalhar juntos"
            className="relative"
          />
        </motion.div>
      </div>
    </section>
  );
}
