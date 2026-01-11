'use client';

import Image from 'next/image';
import React from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import { HOME_CONTENT } from '@/config/content';

// Use logos directly from content - already includes id, src, alt
const logos = HOME_CONTENT.clients.logos;

export default function ClientsBrandsSection() {
  const reducedMotion = useReducedMotion();
  const hasLogos = logos.length > 0;

  // Ghost Era: Spec scroll reveal (opacity 0->1, y 12->0, scale 0.9->1)
  const logoVariants: Variants = reducedMotion
    ? {
        hidden: { opacity: 1, y: 0, scale: 1 },
        show: { opacity: 1, y: 0, scale: 1 },
      }
    : {
        hidden: { opacity: 0, y: 12, scale: 0.9 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      };

  return (
    <section
      id="clients"
      // Spec: Full-width blue bar bg-[#0048ff]
      className="bg-[#0048ff] py-12 md:py-20 lg:py-24 relative z-10 overflow-hidden"
      aria-label="marcas com as quais já trabalhei"
    >
      <div className="max-w-[1680px] mx-auto px-4 md:px-[clamp(24px,5vw,96px)]">
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="mb-10 md:mb-16 lg:mb-20"
        >
          {/* Título: white, bold, 1.5rem mobile / 2rem desktop (spec) */}
          <h2 className="text-white text-[1.5rem] md:text-[2rem] font-bold text-center tracking-tight leading-tight lowercase">
            {HOME_CONTENT.clients.title}
          </h2>
        </motion.div>

        {hasLogos ? (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: reducedMotion ? 0 : 0.03, // Spec: 0.03
                },
              },
            }}
            // Spec Grid: 2 cols small mob, 3 larger mob, 6+ desktop
            // Spec Spacing: 24px vertical on mobile
            // Spec Padding: 16px (px-4 in tailwind)
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-[24px] gap-x-6 sm:gap-8 md:gap-x-12 md:gap-y-16 lg:gap-x-16 lg:gap-y-20 items-center justify-items-center"
          >
            {logos.map((l) => (
              <motion.div
                key={l.src}
                variants={logoVariants}
                className="group relative w-full h-10 sm:h-12 lg:h-16 flex items-center justify-center outline-none"
                tabIndex={0}
                aria-label={l.alt}
              >
                {/* 
                  Spec: Logos scaled 70% of desktop size on mobile.
                  Desktop max-w target: ~140px. Mobile target: ~100px.
                */}
                <div className="relative w-full h-full max-w-[98px] md:max-w-[140px] transition-all duration-300 group-hover:scale-[1.04] group-hover:brightness-[1.1]">
                  <Image
                    src={l.src}
                    alt={l.alt}
                    fill
                    unoptimized
                    className="object-contain filter brightness-0 invert opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p
            role="status"
            className="text-center text-white/40 text-sm font-mono uppercase tracking-widest"
            aria-live="polite"
          >
            Failed to load partners.
          </p>
        )}
      </div>
    </section>
  );
}
