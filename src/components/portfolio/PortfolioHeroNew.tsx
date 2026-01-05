// =============================================================================
// PortfolioHeroNew - Ghost Era v2.0
// Hero com video loop e gradient overlay
// =============================================================================

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { BRAND } from '@/config/brand';

const easing = [0.22, 1, 0.36, 1] as const;

export default function PortfolioHeroNew() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section 
      id="portfolio-hero"
      className="relative h-[70vh] min-h-[500px] max-h-[800px] w-full overflow-hidden"
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

      {/* Gradient Overlay - From black/60 para legibilidade */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/40 to-ghost-bg" />

      {/* Ghost radial gradients */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,87,255,0.2),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(79,230,255,0.15),transparent_35%)]" />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-end pb-16 md:pb-24">
        <div className="mx-auto w-full max-w-[1680px] px-6 md:px-[clamp(24px,5vw,96px)]">
          <motion.span
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easing }}
            className="inline-block text-xs uppercase tracking-[0.4em] text-white/60 mb-4"
          >
            [portfólio showcase]
          </motion.span>

          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easing, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.05]"
          >
            portfólio{' '}
            <span className="text-ghost-accent">showcase</span>
          </motion.h1>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easing, delay: 0.2 }}
            className="mt-4 max-w-xl text-base md:text-lg text-white/70 leading-relaxed"
          >
            Uma curadoria de campanhas, identidades, web e motion — pensadas 
            para manter você no fluxo.
          </motion.p>
        </div>
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
          animate={{ y: [0, 8, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5, 
            ease: 'easeInOut',
          }}
          className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
