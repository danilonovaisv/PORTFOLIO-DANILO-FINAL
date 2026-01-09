'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { HOME_CONTENT } from '@/config/content';
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
  const { hero } = HOME_CONTENT;
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
      className="absolute inset-0 z-10 flex flex-col justify-center items-center pointer-events-none px-4 pt-16 pb-12 sm:pt-20 sm:pb-16 md:pt-0 md:pb-[5vh]"
    >
      <div className="w-[70vw] sm:w-[75vw] md:w-[80vw] lg:w-[55vw] max-w-[1400px] pointer-events-auto text-center flex flex-col items-center gap-4">
        <span className="font-mono text-[11px] sm:text-[12px] md:text-[14px] uppercase tracking-[0.2em] text-[#9cb3ff] mb-4 sm:mb-6 md:mb-10 font-normal opacity-80">
          {hero.tag}
        </span>

        <h1 className="font-sans font-black tracking-tight text-[#d9ddec] drop-shadow-[0_0_24px_rgba(71,128,255,0.35)] leading-[0.95] text-[clamp(3.5rem,13vw,6rem)] md:text-[clamp(6rem,9vw,9rem)] flex flex-col items-center">
          <span className="md:hidden flex flex-col items-center">
            {hero.titleMobile.map((line, index) => (
              <span key={`mobile-${index}`} className="block">
                {line}
              </span>
            ))}
          </span>
          <span className="hidden md:flex flex-col items-center">
            {hero.title.map((line, index) => (
              <span key={`desktop-${index}`} className="block">
                {line}
              </span>
            ))}
          </span>
        </h1>

        <h2 className="font-sans font-bold tracking-tight text-[#9ca5c3] drop-shadow-[0_0_18px_rgba(71,128,255,0.25)] leading-[1.1] text-[clamp(1rem,4vw,2.5rem)] sm:text-[clamp(1.2rem,4vw,2.5rem)] max-w-[800px]">
          {hero.subtitle}
        </h2>

        <HeroCTA
          href={hero.scrollHint ?? '/sobre'}
          label={hero.cta}
          reducedMotion={prefersReducedMotion}
        />
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
  const motionProps = reducedMotion
    ? {}
    : {
        whileHover: { y: -1 },
        whileTap: { scale: 0.98 },
        transition: { duration: 0.2 },
      };

  return (
    <motion.div className="inline-flex items-center gap-0" {...motionProps}>
      <Link
        href={href}
        className="group relative inline-flex items-center"
        aria-label="Ir para seção sobre"
      >
        <span
          className="
            px-6 py-3
            bg-[#0048ff] text-white
            text-sm uppercase tracking-wide font-medium
            rounded-l-full
            transition-colors duration-300
            group-hover:bg-[#0042d4]
            focus-visible:outline-2
            focus-visible:outline-[#4fe6ff]
            focus-visible:outline-offset-4
          "
        >
          {cleanLabel}
        </span>

        <span
          className="
            w-12 h-12
            bg-[#0048ff] text-white
            rounded-r-full
            flex items-center justify-center
            transition-all duration-300
            group-hover:bg-[#0042d4]
            group-hover:translate-x-1
          "
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>
      </Link>
    </motion.div>
  );
}
