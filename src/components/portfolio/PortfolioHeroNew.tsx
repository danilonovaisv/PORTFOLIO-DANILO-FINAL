// =============================================================================
// PortfolioHeroNew - Ghost Era v2.2
// Hero com video loop responsivo, atmosfera Ghost e animações etéreas
// Conforme especificação: PORTFOLIO - PROTÓTIPO INTERATIVO.md
// =============================================================================

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PORTFOLIO_CONTENT } from '@/config/content';
import { 
  MOTION_TOKENS, 
  GHOST_EASE, 
  ghostTransition
} from '@/config/motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

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
      className="relative h-screen min-h-[600px] max-h-[900px] w-full overflow-hidden"
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
        className="absolute inset-0 z-10 bg-linear-to-b from-(--color-ghost-bg)/60 via-transparent to-(--color-ghost-bg)/90" 
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

      {/* Content - Posicionado no rodapé da seção */}
      <div className="relative z-20 h-full flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-16 md:pb-24">
        {/* Título principal - "portfólio" em azul primário, "showcase" em branco */}
        <motion.h1
          initial={prefersReducedMotion ? false : { opacity: 0, y: offset.large, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={ghostTransition(0.2, duration.slow)}
          className="text-[clamp(2.5rem,7vw,5rem)] font-bold tracking-[-0.02em] text-white leading-[1.05] mb-6 md:mb-8 will-change-transform"
        >
          <span className="text-primary">portfólio</span>{' '}
          <span className="text-white">showcase</span>
        </motion.h1>

        {/* CTA Button - Enhanced glow and ethereal hover */}
        <motion.button
          initial={prefersReducedMotion ? false : { opacity: 0, y: offset.standard }}
          animate={{ opacity: 1, y: 0 }}
          transition={ghostTransition(0.4, duration.normal)}
          whileHover={prefersReducedMotion ? {} : { y: -3 }}
          whileTap={prefersReducedMotion ? {} : { y: 0 }}
          onClick={handleCTAClick}
          className="group inline-flex items-center gap-3 bg-primary text-white px-7 md:px-8 py-3.5 md:py-4 rounded-full font-medium text-sm md:text-base transition-all duration-500 w-fit shadow-[0_0_30px_rgba(0,72,255,0.25),0_4px_20px_rgba(0,72,255,0.12)] hover:shadow-[0_0_50px_rgba(0,72,255,0.4),0_8px_30px_rgba(0,72,255,0.25)] will-change-transform"
        >
          vamos trabalhar juntos
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-500 ease-out group-hover:translate-x-1.5" />
        </motion.button>
      </div>

      {/* Scroll indicator - Ethereal animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={ghostTransition(1.2, duration.slow)}
        className="absolute bottom-10 right-6 md:right-12 lg:right-16 z-20 flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.35em] font-medium text-text-light/60">
          scroll
        </span>
        <motion.div
          animate={prefersReducedMotion ? {} : { 
            y: [0, 12, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2.8, 
            ease: GHOST_EASE,
          }}
          className="w-px h-10 portfolio-hero-scroll-line will-change-transform"
        />
      </motion.div>
    </section>
  );
}
