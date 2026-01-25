'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';

// =============================================================================
// AboutWhatIDo - Ghost System v3.0
// Horizontal scroll-driven animation with Ghost Design aesthetics
// =============================================================================

const SERVICES = [
  {
    id: '01',
    keyword: 'Direção',
    description: 'criativa que organiza o caos',
  },
  {
    id: '02',
    keyword: 'Design',
    description: 'estratégico que guia decisões',
  },
  {
    id: '03',
    keyword: 'Identidades',
    description: 'que permanecem na memória',
  },
  {
    id: '04',
    keyword: 'Campanhas',
    description: 'multicanais com lógica e emoção',
  },
  {
    id: '05',
    keyword: 'Branding',
    description: 'que não grita — mas marca',
  },
  {
    id: '06',
    keyword: 'Inteligência Artificial',
    description: 'aplicada à criação',
  },
  {
    id: '07',
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

// Ghost easing curve
const ghostEase = [0.22, 1, 0.36, 1] as const;

export function AboutWhatIDo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = !!useReducedMotion();

  // Scroll-driven horizontal animation for desktop
  // Maps vertical scroll progress (0→1) to horizontal translation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Spring for smoother motion (Ghost feel)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // X translation: starts at +120vw (off-screen right), ends at -100% (off-screen left)
  const x = useTransform(smoothProgress, [0, 1], ['120vw', '-120%']);

  // Opacity for fade in/out at edges
  const trackOpacity = useTransform(
    smoothProgress,
    [0, 0.05, 0.95, 1],
    [0, 1, 1, 0]
  );

  return (
    <section
      ref={containerRef}
      className="relative z-10 w-full bg-[#040013] text-white"
      aria-labelledby="what-i-do-heading"
    >
      {/* ============================================
          DESKTOP LAYOUT (≥ 1024px)
          Sticky container with horizontal scroll-driven animation
          ============================================ */}
      <div className="hidden lg:block lg:h-[300vh]">
        <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
          {/* Header */}
          <div className="absolute top-0 z-20 flex w-full justify-center pt-20">
            <div className="max-w-[900px] text-center">
              <h2
                id="what-i-do-heading"
                className="font-display text-5xl font-black leading-[1.15] tracking-tight text-white md:text-6xl"
              >
                Do <span className="text-[#0048ff]">insight</span> ao{' '}
                <span className="text-[#0048ff]">impacto</span>.
              </h2>
              <p className="mt-3 font-display text-4xl font-black leading-[1.15] tracking-tight text-white/90 md:text-5xl">
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
            className="flex gap-6 will-change-transform pt-32"
          >
            {SERVICES.map((service, index) => (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                  ease: ghostEase,
                }}
                className="group flex min-h-[140px] min-w-[380px] items-center gap-5 rounded-2xl bg-[#0048ff] p-6 shadow-[0_25px_50px_-12px_rgba(0,72,255,0.5)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_30px_60px_-12px_rgba(0,72,255,0.65)]"
              >
                {/* Number */}
                <span
                  className="shrink-0 font-display text-5xl font-black text-[#8705f2] transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                >
                  {service.id}
                </span>
                {/* Text */}
                <p className="font-display text-xl font-bold leading-tight text-white">
                  <strong className="text-[#4fe6ff]">{service.keyword}</strong>{' '}
                  {service.description}
                </p>
              </motion.article>
            ))}
          </motion.div>

          {/* Ghost Gradient Edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-linear-to-r from-[#040013] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-linear-to-l from-[#040013] to-transparent" />
        </div>
      </div>

      {/* ============================================
          MOBILE LAYOUT (< 1024px)
          Vertical stack with viewport-triggered horizontal entrance
          ============================================ */}
      <div className="block py-16 lg:hidden">
        <div className="std-grid">
          {/* Header */}
          <header className="mb-12 text-center">
            <h2
              id="what-i-do-heading-mobile"
              className="font-display text-[2.5rem] font-black leading-[1.1] tracking-tight text-white"
            >
              Do <span className="text-[#0048ff]">insight</span> ao{' '}
              <span className="text-[#0048ff]">impacto</span>.
            </h2>
            <p className="mt-2 font-display text-[1.75rem] font-black leading-[1.1] tracking-tight text-white/90">
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
                    : { opacity: 0, x: 80 }
                }
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                  ease: ghostEase,
                }}
                className="group flex min-h-[76px] w-full items-center gap-4 rounded-xl bg-[#0048ff] px-5 py-4 shadow-[0_16px_40px_-12px_rgba(0,72,255,0.4)] transition-all duration-300 active:scale-[0.98]"
              >
                {/* Number */}
                <span
                  className="shrink-0 font-display text-2xl font-black text-[#8705f2]"
                  aria-hidden="true"
                >
                  {service.id}
                </span>
                {/* Text */}
                <p className="text-sm font-semibold leading-snug text-white">
                  <strong className="text-[#4fe6ff]">{service.keyword}</strong>{' '}
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
      <div className="relative overflow-hidden border-t border-white/5 bg-[#040013] py-6">
        {/* Dual marquee for seamless loop */}
        <div className="flex w-max animate-marquee gap-12">
          {/* First set */}
          {MARQUEE_KEYWORDS.map((keyword, i) => (
            <span
              key={`a-${i}`}
              className="text-sm font-medium uppercase tracking-[0.2em] text-white/30"
            >
              {keyword}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {MARQUEE_KEYWORDS.map((keyword, i) => (
            <span
              key={`b-${i}`}
              className="text-sm font-medium uppercase tracking-[0.2em] text-white/30"
            >
              {keyword}
            </span>
          ))}
        </div>

        {/* Ghost gradient edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-[#040013] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-[#040013] to-transparent" />
      </div>
    </section>
  );
}

export default AboutWhatIDo;
