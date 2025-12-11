'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { CLIENT_LOGOS } from '@/lib/constants';

export default function ClientsBrandsSection() {
  const reduced = usePrefersReducedMotion();

  const sectionProps = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.6 },
      };

  return (
    <motion.section className="bg-[#0057FF] py-16 text-white" {...sectionProps}>
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-8 text-center text-xl font-semibold md:text-2xl">
          marcas com as quais já trabalhei
        </h2>

        <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6">
          {CLIENT_LOGOS.map((logo, index) => (
            <motion.div
              key={logo.src}
              className="flex items-center justify-center"
              initial={reduced ? undefined : { opacity: 0, y: 12, scale: 0.9 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              whileHover={reduced ? undefined : { scale: 1.04 }}
            >
              <Image
                src={logo.src}
                alt={`Logo do cliente ${index + 1}`}
                width={120}
                height={40}
                className="h-8 w-auto filter invert brightness-0 contrast-100 md:h-9"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
