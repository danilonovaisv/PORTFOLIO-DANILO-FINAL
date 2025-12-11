'use client';

import React from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import HeroGlassCanvas from '@/components/hero3d/HeroGlassCanvas';
import HeroThumbToManifesto from './HeroThumbToManifesto';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function Hero() {
  const reduced = usePrefersReducedMotion();

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 32, rotateX: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.08,
        ease: [0.22, 0.61, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section
      id="hero"
      className="relative h-[200vh] bg-[#F4F5F7]"
      aria-labelledby="hero-heading"
    >
      <div className="sticky top-0 min-h-screen overflow-hidden">
        {/* Canvas 3D como background */}
        <HeroGlassCanvas />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-start justify-center gap-10 px-4 py-12 md:flex-row md:items-center">
          <div className="max-w-xl">
            <motion.h1
              id="hero-heading"
              className="text-4xl font-extrabold leading-tight text-[#111111] sm:text-5xl lg:text-6xl"
              initial={reduced ? false : 'hidden'}
              animate={reduced ? undefined : 'visible'}
            >
              {['Design,', 'não é só', 'estética.'].map((line, index) => (
                <motion.span
                  key={line}
                  className="block"
                  custom={index}
                  variants={titleVariants}
                >
                  {line}
                </motion.span>
              ))}
            </motion.h1>

            <p className="mt-4 inline-block rounded-md bg-white/70 px-3 py-1 text-sm text-[#0057FF] shadow-sm backdrop-blur">
              [É intenção, é estratégia, é experiência.]
            </p>

            <div className="mt-6">
              <motion.div
                whileHover={reduced ? undefined : { y: -2, scale: 1.02 }}
                whileTap={reduced ? undefined : { scale: 0.98, y: 0 }}
              >
                <Link
                  href="/sobre"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0057FF] px-6 py-3 text-sm font-medium text-white shadow-md transition-colors hover:bg-[#0044cc] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F5F7]"
                >
                  <span>get to know me better →</span>
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="flex flex-1 flex-col items-end gap-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#0057FF]">
              [ BRAND AWARENESS ]
            </p>
            <HeroThumbToManifesto />
          </div>
        </div>
      </div>
    </section>
  );
}
