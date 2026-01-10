'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

import { useReducedMotion } from '@/hooks/useReducedMotion';

const textAnimation: Variants = {
  initial: {
    opacity: 0,
    scale: 0.92,
    y: 60,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    scale: [0.92, 1.02, 1],
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function HeroCopy() {
  const prefersReducedMotion = useReducedMotion();

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: 'initial' as const,
        animate: 'animate' as const,
        variants: textAnimation,
      };

  return (
    <motion.div
      {...motionProps}
      className="absolute inset-0 z-10 flex flex-col justify-center pointer-events-none"
    >
      <div className="std-grid pointer-events-auto text-center flex flex-col items-center gap-4">
        {/* TAG */}
        <span className="font-mono text-[19px] uppercase tracking-normal text-[#9cb3ff] mb-4 sm:mb-6 md:mb-10 font-normal opacity-80">
          [BRAND AWARENESS]
        </span>

        {/* H1 DISPLAY */}
        <h1 className="font-sans font-black tracking-tight text-[#d9dade] drop-shadow-[0_0_24px_rgba(71,128,255,0.35)] leading-[0.95] text-[clamp(3.5rem,13vw,6rem)] md:text-[clamp(6rem,9vw,9rem)] flex flex-col items-center">
          {/* MOBILE: 3 Lines */}
          <span className="md:hidden flex flex-col items-center">
            <span className="block">Você não</span>
            <span className="block">vê o</span>
            <span className="block">design.</span>
          </span>

          {/* DESKTOP/TABLET: 2 Lines */}
          <span className="hidden md:flex flex-col items-center">
            <span className="block">Você não vê</span>
            <span className="block">o design.</span>
          </span>
        </h1>

        {/* H2 SUBHEADLINE */}
        <h2 className="font-sans font-bold tracking-tight text-[#9ca5c3] drop-shadow-[0_0_18px_rgba(71,128,255,0.25)] leading-[1.1] text-[clamp(1rem,4vw,2.5rem)] sm:text-[clamp(1.2rem,4vw,2.5rem)] max-w-[800px]">
          Mas ele vê você.
        </h2>

        {/* CTA */}
        <div className="mt-8">
          <HeroCTA
            href="/sobre"
            label="step inside"
            reducedMotion={prefersReducedMotion}
          />
        </div>
      </div>
    </motion.div>
  );
}

function HeroCTA({
  href,
  label,
  reducedMotion,
}: {
  href: string;
  label: string;
  reducedMotion?: boolean;
}) {
  const cleanLabel = label.replace('→', '').trim();

  // Physics: Animation & States
  // Using pure Tailwind classes for interaction states as per workflow
  // but keeping motion wrapper for entrance if needed

  return (
    <Link
      href={href}
      className="
        group
        relative
        flex flex-row items-center justify-center
        h-[64px]
        cursor-pointer
        transition-transform duration-200 ease-out
        hover:-translate-y-px
      "
      aria-label="Step Inside"
    >
      {/* NÓ 1: CÁPSULA DE TEXTO (Esquerda) */}
      <div
        className="
          flex items-center justify-center
          h-full
          pl-8 pr-4
          bg-[rgb(0,87,255)]
          group-hover:bg-[rgb(50,120,255)]
          text-white
          rounded-l-full
          transition-colors duration-300
        "
      >
        <span className="text-sm uppercase tracking-wider font-medium whitespace-nowrap">
          {cleanLabel}
        </span>
      </div>

      {/* NÓ 2: ESFERA DO ÍCONE (Direita) */}
      <div
        className="
          flex items-center justify-center
          h-full aspect-square
          bg-[rgb(0,87,255)]
          group-hover:bg-[rgb(50,120,255)]
          text-white
          rounded-r-full
          transition-colors duration-300
        "
      >
        <motion.svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={reducedMotion ? {} : undefined}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </motion.svg>
      </div>
    </Link>
  );
}
