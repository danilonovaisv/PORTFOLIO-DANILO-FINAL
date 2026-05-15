'use client';

import { useRef } from 'react';
import { m, useScroll, useTransform, useSpring } from 'motion/react';
import { useMotionGate } from '@/hooks/useMotionGate';
import { GHOST_EASE, MOTION_TOKENS } from '@/config/motion';

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
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const { scrollYProgress: mobileScrollY } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const smoothMobileScrollY = useSpring(mobileScrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const x = useTransform(scrollYProgress, [0, 1], ['10%', '-40%']);
  const prefersReducedMotion = !!useMotionGate();

  return (
    <section
      ref={targetRef}
      id="04-o-que-eu-faco"
      className="relative z-[var(--z-layer-content)] w-full bg-background text-text"
      aria-labelledby="what-i-do-heading"
    >
      {/* ============================================
          DESKTOP LAYOUT (≥ 1024px)
          Sticky container with horizontal scroll-driven animation
          ============================================ */}
      <div className="hidden lg:block lg:h-[180vh]">
        <div className="sticky top-0 flex h-screen min-h-[620px] w-full flex-col items-center justify-center overflow-hidden">
          {/* Header */}
          <div className="absolute top-0 z-[var(--z-layer-content)] flex w-full justify-center pt-20">
            <div className="max-w-[960px] text-center">
              <h2
                id="what-i-do-heading"
                className="text-h1 font-black tracking-tight text-text"
              >
                Do <span className="text-bluePrimary">insight</span> ao{' '}
                <span className="text-bluePrimary">impacto</span>.
              </h2>
              <p className="mt-3 text-h2 font-black tracking-tight text-text/90">
                Mesmo quando você não percebe.
              </p>
            </div>
          </div>

          {/* Horizontal Track - Cards sliding right→left */}
          <m.ul
            aria-labelledby="what-i-do-heading"
            style={prefersReducedMotion ? {} : { x }}
            className="flex w-max items-stretch justify-center gap-6 px-10 will-change-transform"
          >
            {SERVICES.map((service, index) => (
              <m.li
                key={service.id}
                data-what-i-do-card=""
                transition={{
                  duration: MOTION_TOKENS.duration.modal,
                  delay: index * 0.06,
                  ease: GHOST_EASE,
                }}
                className="group flex min-h-[248px] w-[clamp(150px,10.6vw,196px)] flex-col items-center justify-start rounded-[22px] border border-bluePrimary/15 bg-neutral px-5 py-5 text-center shadow-lg shadow-bluePrimary/5 transition-all duration-standard hover:border-bluePrimary/40 hover:shadow-xl hover:shadow-bluePrimary/10 focus-within:border-bluePrimary/50"
              >
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-bluePrimary/30 bg-bluePrimary/10 font-sans text-h3 font-black text-blueAccent"
                  aria-hidden="true"
                >
                  {service.id.padStart(2, '0')}
                </span>
                <p className="mt-5 font-sans text-body-enhanced font-semibold leading-[1.4] text-text">
                  <strong className="block text-blueAccent">
                    {service.keyword}
                  </strong>
                  <span className="mt-1 block text-small text-text/80">
                    {service.description}
                  </span>
                </p>
              </m.li>
            ))}
          </m.ul>

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
              className="text-h2 font-black tracking-tight text-text text-balance"
            >
              Do <span className="text-bluePrimary">insight</span> ao{' '}
              <span className="text-bluePrimary">impacto</span>.
            </h2>
            <p className="mt-2 text-h3 font-black tracking-tight text-text/90 text-balance">
              Mesmo quando você não percebe.
            </p>
          </header>

          {/* Mobile Cards - Horizontal entrance from right */}
          <ul
            className="flex flex-col gap-3 p-0"
            aria-labelledby="what-i-do-heading-mobile"
          >
            {SERVICES.map((service, index) => {
              // Calculate specific scroll trigger points for each card
              const start = 0.1 + index * 0.05;
              const end = start + 0.15;

              const x = useTransform(
                smoothMobileScrollY,
                [start, end],
                [24, 0]
              );
              const opacity = useTransform(
                smoothMobileScrollY,
                [start, end],
                [0, 1]
              );

              return (
                <m.li
                  key={service.id}
                  style={prefersReducedMotion ? {} : { x, opacity }}
                  className="group flex min-h-[76px] w-full items-center gap-4 rounded-xl border border-bluePrimary/10 bg-neutral px-5 py-4 shadow-md shadow-bluePrimary/5 transition-all duration-standard"
                >
                  <span
                    className="shrink-0 font-sans text-display text-2xl font-black text-blueAccent flex h-10 w-10 items-center justify-center rounded-full bg-bluePrimary/10 border border-bluePrimary/30"
                    aria-hidden="true"
                  >
                    {service.id.padStart(2, '0')}
                  </span>
                  <p className="text-sm font-semibold leading-snug text-text">
                    <strong className="text-blueAccent">
                      {service.keyword}
                    </strong>{' '}
                    <span className="text-text/80">{service.description}</span>
                  </p>
                </m.li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* ============================================
          MARQUEE FOOTER (Ghost Design)
          Infinite horizontal scroll - keywords
          ============================================ */}
      <div
        className="relative hidden overflow-hidden border-t border-white/5 bg-background py-6 lg:block"
        aria-hidden="true"
      >
        {/* Dual marquee for seamless loop */}
        <div
          className={`flex w-max gap-12 hover:[animation-play-state:paused] ${prefersReducedMotion ? '' : 'animate-marquee'}`}
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
