'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

export default function HeroOverlay() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
      {/* Left */}
      <div className="lg:col-span-6">
        <motion.h1
          className="leading-[0.9] tracking-tighter font-display"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <span className="block text-[clamp(42px,8vw,100px)] font-bold text-[#1457ff]">
            Design,
          </span>
          <span className="mt-1 block text-[clamp(42px,8vw,100px)] font-bold text-black">
            não é só
          </span>
          <span className="mt-1 block text-[clamp(42px,8vw,100px)] font-bold text-black">
            estética.
          </span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl text-[clamp(16px,1.3vw,18px)] font-medium text-[#1457ff]"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.2, 0.8, 0.2, 1] }}
        >
          [É intenção, é estratégia, é experiência.]
        </motion.p>

        <motion.div
          className="mt-10 flex items-center gap-4"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.14, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <Link
            href="#sobre"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#1457ff] px-7 py-4 text-base font-semibold text-white shadow-[0_16px_40px_rgba(20,87,255,0.25)] transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#1457ff]/40"
          >
            get to know me better
            <span
              aria-hidden
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15"
            >
              ↗
            </span>
          </Link>

          <div className="hidden h-10 w-px bg-black/10 sm:block" />

          <p className="hidden max-w-[220px] text-sm font-medium text-black/60 sm:block">
            WebGL • UI • Motion • Brand systems
          </p>
        </motion.div>
      </div>

      {/* Right label / card (layout hint) */}
      <div className="lg:col-span-6 lg:justify-self-end">
        <motion.div
          className="ml-auto w-full max-w-md"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="flex items-center justify-end">
            <span className="select-none rounded-md bg-black/[0.035] px-6 py-4 text-lg font-semibold tracking-wide text-[#1457ff]">
              [ BRAND AWARENESS ]
            </span>
          </div>

          <div className="mt-10 flex items-center justify-end">
            <div className="relative h-[92px] w-[170px] overflow-hidden rounded-md bg-[#c8f7ff]/80 ring-1 ring-black/10">
              <div className="absolute inset-2 rounded bg-white/60" />
              <div className="absolute right-2 top-2 text-[#1457ff]">↙</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
