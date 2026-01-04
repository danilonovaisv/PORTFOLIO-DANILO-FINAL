'use client';

import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ABOUT_CONTENT } from '@/config/content';

// Ghost Motion Tokens
const GHOST_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeGhost = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: GHOST_EASE },
  },
};

const cardRise = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: GHOST_EASE },
  },
};

export default function AboutMethod() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const mediaY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [56, -56]
  );
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [16, -16]
  );

  return (
    <section
      ref={containerRef}
      className="relative bg-ghost-surface-deep overflow-hidden"
      aria-label="Como Eu Trabalho"
    >
      {/* Background Video */}
      <motion.div style={{ y: mediaY }} className="absolute inset-0 z-0">
        <motion.video
          src={ABOUT_CONTENT.method.video}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-right lg:object-center"
          aria-hidden="true"
        />
        {/* Overlay: Darker on Left for text readability, lighter on right */}
        <div className="hidden lg:block absolute inset-0 bg-linear-to-r from-[#0a0b1f]/90 via-[#0a0b1f]/65 to-transparent" />
        <div className="lg:hidden absolute inset-0 bg-linear-to-b from-[#050511]/75 via-[#050511]/80 to-[#050511]/95" />
      </motion.div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 items-start">
          {/* Content (Left) - Desktop: Col 2-7 */}
          <div className="lg:col-start-2 lg:col-span-6 px-6 md:px-10 py-16 md:py-20 lg:py-28">
            <motion.div style={{ y: textY }} className="max-w-[720px]">
              {/* Títulos */}
              <motion.div
                variants={fadeGhost}
                initial={prefersReducedMotion ? 'visible' : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                className="mb-6 md:mb-8 text-center lg:text-left"
              >
                <h2 className="text-[34px] sm:text-[40px] md:text-[40px] lg:text-[48px] xl:text-[52px] font-semibold text-[#fcffff] tracking-tight leading-[1.08] mb-4">
                  <span className="text-primary">Criatividade com método.</span>
                  <br />
                  <span className="text-white">Impacto sem ruído.</span>
                </h2>
              </motion.div>

              {/* Texto introdutório */}
              <motion.div
                variants={fadeGhost}
                initial={prefersReducedMotion ? 'visible' : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                className="text-[16px] md:text-[16px] text-white/80 font-normal leading-relaxed space-y-1.5 mb-8 md:mb-10 max-w-[520px] mx-auto lg:mx-0 text-center lg:text-left"
              >
                {ABOUT_CONTENT.method.intro.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </motion.div>

              {/* Steps List */}
              <div className="max-w-[560px] mx-auto lg:mx-0 border-t border-[#4fe6ff]/60">
                {ABOUT_CONTENT.method.steps.map((step, i) => (
                  <motion.div
                    key={i}
                    variants={cardRise}
                    initial={prefersReducedMotion ? 'visible' : 'hidden'}
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-4 py-3 border-b border-[#4fe6ff]/60"
                  >
                    <span className="text-primary text-sm md:text-base font-semibold tracking-tight shrink-0">
                      0{i + 1}
                    </span>
                    <p className="text-[14px] md:text-[14px] text-white/90 font-normal">
                      {step}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Visual Area (Desktop only - Empty col to show video) */}
          <div className="hidden lg:block lg:col-span-5 h-full min-h-[50vh]" />
        </div>
      </div>
    </section>
  );
}
