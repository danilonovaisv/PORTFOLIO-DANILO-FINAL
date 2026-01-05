// =============================================================================
// PortfolioHeroNew - Ghost Era v2.0
// Hero com video loop e gradient overlay
// Conforme especificação: PORTFOLIO - PROTÓTIPO INTERATIVO.md
// =============================================================================

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { BRAND } from '@/config/brand';

const easing = [0.22, 1, 0.36, 1] as const;

export default function PortfolioHeroNew() {
  const prefersReducedMotion = useReducedMotion();

  const handleCTAClick = () => {
    // Scroll suave para a seção de contato
    const contactSection = document.querySelector('#contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="portfolio-hero"
      className="relative h-screen min-h-[600px] max-h-[900px] w-full overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          poster="/images/portfolio-hero-poster.webp"
        >
          <source src={BRAND.video.manifesto} type="video/mp4" />
        </video>
      </div>

      {/* Gradient Overlay - Conforme spec: from-black/60 via-black/40 to-black/60 */}
      <div className="absolute inset-0 z-10 bg-linear-to-b from-black/60 via-black/40 to-black/60" />

      {/* Ghost radial gradients para atmosfera */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,87,255,0.15),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(79,230,255,0.1),transparent_35%)]" />
      </div>

      {/* Content - Centralizado conforme protótipo */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
        {/* Título principal - "portfólio" em azul, "showcase" em branco */}
        <motion.h1
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easing }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-8"
        >
          <span className="text-[#3b82f6]">portfólio</span> showcase
        </motion.h1>

        {/* CTA Button - Conforme especificação */}
        <motion.button
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easing, delay: 0.2 }}
          onClick={handleCTAClick}
          className="group inline-flex items-center gap-3 bg-[#0048ff] hover:bg-[#0057ff] text-white px-8 py-3.5 rounded-full font-medium text-base transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
        >
          vamos trabalhar juntos
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-white/50">scroll</span>
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5, 
            ease: 'easeInOut',
          }}
          className="w-px h-8 bg-linear-to-b from-white/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
