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

  return (
    <section id="clients" className="bg-[#0057FF] py-12" aria-label="Marcas">
      <div className="max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)]">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: reducedMotion ? 0.2 : 0.55 }}
          className="text-white text-xl md:text-2xl font-bold text-center mb-8"
        >
          {HOME_CONTENT.clients.title}
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: reducedMotion ? 0 : 0.03 } },
          }}
          className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 items-center justify-items-center"
        >
          {logos.map((l) => (
            <motion.div
              key={l.src}
              variants={{
                hidden: { opacity: 0, y: 12, scale: 0.9 },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: reducedMotion ? 0.2 : 0.35 },
                },
              }}
              whileHover={reducedMotion ? undefined : { scale: 1.04 }}
              className="w-full max-w-[140px] h-12 relative outline-none"
              tabIndex={0}
              aria-label={l.alt}
            >
              <Image
                src={l.src}
                alt={l.alt}
                fill
                unoptimized
                className="object-contain"
                style={{ filter: 'brightness(0) invert(1)', opacity: 0.92 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
