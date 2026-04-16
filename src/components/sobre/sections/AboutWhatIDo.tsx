'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useMotionGate } from '@/hooks/useMotionGate';
import { GHOST_EASE, viewportConfig } from '@/config/motion';

// =============================================================================
// AboutWhatIDo - Ghost System v3.0
// Subtle scroll-linked motion with Ghost Design aesthetics
// =============================================================================

const SERVICES = [
  {
    id: '1',
    keyword: 'Direção',
    description: 'criativa que organiza o caos',
  },
  {
    id: '2',
    keyword: 'Design',
    description: 'estratégico que guia decisões',
  },
  {
    id: '3',
    keyword: 'Identidades',
    description: 'que permanecem na memória',
  },
  {
    id: '4',
    keyword: 'Campanhas',
    description: 'multicanais com lógica e emoção',
  },
  {
    id: '5',
    keyword: 'Branding',
    description: 'que não grita — mas marca',
  },
  {
    id: '6',
    keyword: 'Inteligência Artificial',
    description: 'aplicada à criação',
  },
  {
    id: '7',
    keyword: 'Liderança Criativa',
    description: 'com visão e método',
  },
];

const MARQUEE_KEYWORDS = [
  'Branding',
  'Identidade Visual',
  'Motion Design',
  'Campanhas',
  'UI/UX',
  'Direção de Arte',
  'Creative Coding',
  'AI Design',
];

export function AboutWhatIDo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = !!useMotionGate();
  const [marqueePaused, setMarqueePaused] = useState(false);

  // Scroll-linked horizontal drift for desktop.
  // Keep the row visible from the start and avoid long empty stretches.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Spring for smoother motion (Ghost feel)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  });

  // Subtle drift only; content stays readable inside the viewport.
  const x = useTransform(smoothProgress, [0, 1], ['8vw', '-8vw']);

  // Opacity for fade in/out at edges
  const trackOpacity = useTransform(
    smoothProgress,
    [0, 0.12, 0.88, 1],
    [0, 1, 1, 0]
  );

  return (
    <section
      ref={containerRef}
      className="relative z-10 w-full bg-background text-text"
      aria-labelledby="what-i-do-heading"
    >
      {/* ============================================
          DESKTOP LAYOUT (≥ 1024px)
          Sticky container with horizontal scroll-driven animation
          ============================================ */}
      <div className="hidden lg:block lg:h-[180vh]">
        <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
          {/* Header */}
          <div className="absolute top-0 z-20 flex w-full justify-center pt-20">
            <div className="max-w-[900px] text-center">
              <h2
                id="what-i-do-heading"
                className="font-sans text-display text-5xl font-black leading-[1.15] tracking-tight text-text md:text-6xl"
              >
                Do <span className="text-bluePrimary">insight</span> ao{' '}
                <span className="text-bluePrimary">impacto</span>.
              </h2>
              <p className="mt-3 font-sans text-display text-4xl font-black leading-[1.15] tracking-tight text-text/90 md:text-5xl">
                Mesmo quando você não percebe.
              </p>
            </div>
          </div>

          {/* Horizontal Track - Cards sliding right→left */}
          <motion.div
            style={{
              x: prefersReducedMotion ? 0 : x,
              opacity: prefersReducedMotion ? 1 : trackOpacity,
            }}
            className="mt-[30vh] flex w-full max-w-[1520px] items-stretch justify-center gap-3 px-10 will-change-transform xl:gap-4"
          >
            {SERVICES.map((service, index) => (
              <motion.article
                key={service.id}
                data-what-i-do-card=""
                initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={viewportConfig}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                  ease: GHOST_EASE as any,
                }}
                className="group flex min-h-[248px] w-[clamp(150px,10.6vw,196px)] flex-col items-center justify-start rounded-[22px] bg-bluePrimary px-4 py-5 text-center shadow-[0_22px_48px_-20px_rgba(135,5,242,0.32)] transition-shadow duration-300 hover:shadow-[0_26px_56px_-22px_rgba(135,5,242,0.45)]"
              >
                {/* Number */}
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-purpleDetails/35 bg-[rgba(255,255,255,0.08)] font-sans text-display text-[2rem] font-black text-purpleDetails"
                  aria-hidden="true"
                >
                  {service.id.padStart(2, '0')}
                </span>
                {/* Text */}
                <p className="mt-5 font-sans text-display text-[clamp(1.05rem,1.55vw,1.35rem)] font-bold leading-[1.28] text-text">
                  <strong className="block text-blueAccent">
                    {service.keyword}
                  </strong>
                  <span className="mt-1.5 block text-text">
                    {service.description}
                  </span>
                </p>
              </motion.article>
            ))}
          </motion.div>

          {/* Ghost Gradient Edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-linear-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-linear-to-l from-background to-transparent" />
        </div>
      </div>

      {/* ============================================
          MOBILE LAYOUT (< 1024px)
          Vertical stack with viewport-triggered horizontal entrance
          ============================================ */}
      <div className="block py-16 lg:hidden">
        <div className="std-grid">
          {/* Header */}
          <header className="mb-10 text-center px-4">
            <h2
              id="what-i-do-heading-mobile"
              className="font-sans text-display text-[2.25rem] font-black leading-[1.1] tracking-tight text-text text-balance"
            >
              Do <span className="text-bluePrimary">insight</span> ao{' '}
              <span className="text-bluePrimary">impacto</span>.
            </h2>
            <p className="mt-2 font-sans text-display text-[1.5rem] font-black leading-[1.1] tracking-tight text-text/90 text-balance">
              Mesmo quando você não percebe.
            </p>
          </header>

          {/* Mobile Cards - Horizontal entrance from right */}
          <div className="flex flex-col gap-3">
            {SERVICES.map((service, index) => (
              <motion.article
                key={service.id}
                initial={
                  prefersReducedMotion
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: 18 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                  ease: GHOST_EASE as any,
                }}
                className="group flex min-h-[76px] w-full items-center gap-4 rounded-xl bg-bluePrimary px-5 py-4 shadow-[0_16px_40px_-12px_rgba(135,5,242,0.35)] transition-all duration-300"
              >
                {/* Number */}
                <span
                  className="shrink-0 font-sans text-display text-2xl font-black text-purpleDetails flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(255,255,255,0.10)] border border-purpleDetails/40"
                  aria-hidden="true"
                >
                  {service.id}
                </span>
                {/* Text */}
                <p className="text-sm font-semibold leading-snug text-text">
                  <strong className="text-blueAccent">{service.keyword}</strong>{' '}
                  {service.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================
          MARQUEE FOOTER (Ghost Design)
          Infinite horizontal scroll - keywords
          ============================================ */}
      <div className="relative overflow-hidden border-t border-white/5 bg-background py-6">
        {/* Dual marquee for seamless loop */}
        <div
          className={`flex w-max animate-marquee gap-12 ${prefersReducedMotion || marqueePaused ? 'pause-animation' : ''}`}
          onMouseEnter={() => setMarqueePaused(true)}
          onMouseLeave={() => setMarqueePaused(false)}
          onFocus={() => setMarqueePaused(true)}
          onBlur={() => setMarqueePaused(false)}
        >
          {/* First set */}
          {MARQUEE_KEYWORDS.map((keyword, i) => (
            <span
              key={`a-${i}`}
              className="text-sm font-medium uppercase tracking-[0.2em] text-white/60"
            >
              {keyword}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {MARQUEE_KEYWORDS.map((keyword, i) => (
            <span
              key={`b-${i}`}
              className="text-sm font-medium uppercase tracking-[0.2em] text-white/60"
            >
              {keyword}
            </span>
          ))}
        </div>

        {/* Ghost gradient edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-background to-transparent" />
      </div>
    </section>
  );
}

export default AboutWhatIDo;
