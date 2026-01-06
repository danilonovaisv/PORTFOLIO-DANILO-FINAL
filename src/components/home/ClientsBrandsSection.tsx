'use client';

import Image from 'next/image';
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HOME_CONTENT } from '@/config/content';
import { MOTION_TOKENS, ghostTransition } from '@/config/motion';

const { duration, stagger, offset } = MOTION_TOKENS;

const logos = HOME_CONTENT.clients.logos.map((src, i) => ({
  src,
  alt: `Logo cliente ${i + 1}`,
}));

export default function ClientsBrandsSection() {
  const reducedMotion = useReducedMotion();
  const hasLogos = logos.length > 0;

  // Ghost Era: sem scale, apenas opacity + y movement
  const logoVariants = reducedMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        show: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y: offset.subtle, filter: 'blur(4px)' },
        show: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: ghostTransition(0, duration.normal),
        },
      };

  return (
    <section
      id="clients"
      className="bg-section-clients py-16 md:py-24 relative z-10"
      aria-label="Clientes e Parcerias"
    >
      <div className="max-w-[1300px] mx-auto px-[clamp(24px,5vw,72px)]">
        <motion.div
          initial={
            reducedMotion ? { opacity: 1 } : { opacity: 0, y: offset.subtle }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={ghostTransition(0, duration.normal)}
          className="mb-10 md:mb-12"
        >
          <h2 className="text-white text-[20px] md:text-[22px] lg:text-[22px] font-semibold text-center tracking-tight">
            {HOME_CONTENT.clients.title}.
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
                transition: {
                  staggerChildren: reducedMotion ? 0 : stagger.tight,
                },
              },
            }}
            className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-items-center"
          >
            {logos.map((l) => (
              <motion.div
                key={l.src}
                variants={logoVariants}
                // Ghost Era: subtle brightness change instead of scale
                className="group relative w-full h-10 md:h-12 flex items-center justify-center outline-none transition-all duration-300 hover:brightness-110"
                tabIndex={0}
                aria-label={l.alt}
              >
                <Image
                  src={l.src}
                  alt={l.alt}
                  fill
                  unoptimized
                  className="object-contain filter brightness-0 invert opacity-[0.9] transition-all duration-500 group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
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
