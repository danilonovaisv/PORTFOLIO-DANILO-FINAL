'use client';

import Image from 'next/image';
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HOME_CONTENT } from '@/config/content';

const logos = HOME_CONTENT.clients.logos.map((src, i) => ({
  src,
  alt: `Logo cliente ${i + 1}`,
}));

export default function ClientsBrandsSection() {
  const reducedMotion = useReducedMotion();
  const hasLogos = logos.length > 0;

  const logoVariants = reducedMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        show: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
        },
      };

  return (
    <section
      id="clients"
      className="bg-[#0048ff] py-16 md:py-24 relative z-10"
      aria-label="Clientes e Parcerias"
    >
      <div className="max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)]">
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <span className="block text-center font-mono text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-white/50 mb-4">
            [trusted by]
          </span>
          <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-semibold text-center tracking-tight">
            {HOME_CONTENT.clients.title}
          </h2>
        </motion.div>

        {hasLogos ? (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: reducedMotion ? 0 : 0.05 },
              },
            }}
            className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-12 md:gap-x-20 md:gap-y-20 items-center justify-items-center"
          >
            {logos.map((l) => (
              <motion.div
                key={l.src}
                variants={logoVariants}
                whileHover={reducedMotion ? undefined : { scale: 1.05 }}
                className="group relative w-full h-8 md:h-12 flex items-center justify-center outline-none"
                tabIndex={0}
                aria-label={l.alt}
              >
                <Image
                  src={l.src}
                  alt={l.alt}
                  fill
                  unoptimized
                  className="object-contain filter brightness-0 invert opacity-40 group-hover:opacity-100 transition-all duration-500 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                />
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
