'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CLIENT_LOGOS } from '../../lib/constants';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

const Clients: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const headingMotion = prefersReducedMotion
    ? {}
    : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 } };

  return (
    <section
      id="clients"
      aria-labelledby="clients-title"
      className="py-16 md:py-20 bg-[#0057FF] text-white"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center max-w-7xl">
        <motion.h2
          id="clients-title"
          {...headingMotion}
          viewport={prefersReducedMotion ? undefined : { once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 tracking-tight"
        >
          marcas com as quais já trabalhei.
        </motion.h2>

        <ul
          role="list"
          className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-10 md:gap-x-12 md:gap-y-12 items-center justify-items-center py-6 md:py-8 px-2"
        >
          {CLIENT_LOGOS.map((logo, index) => {
            return (
              <motion.li
                key={logo.src}
                role="listitem"
                initial={
                  prefersReducedMotion ? undefined : { opacity: 0, y: 10 }
                }
                whileInView={
                  prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={prefersReducedMotion ? undefined : { once: true }}
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { delay: index * 0.03, duration: 0.4 }
                }
                className="w-full flex items-center justify-center"
              >
                <div className="relative w-20 h-14 md:w-28 md:h-16 flex items-center justify-center group">
                  <div className="relative w-full h-full flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-300 min-h-[72px] max-h-16">
                    <Image
                      src={logo.src}
                      alt={`Logo da ${logo.name}`}
                      fill
                      sizes="(max-width: 640px) 60px, (max-width: 1024px) 80px, 112px"
                      className="object-contain brightness-0 invert"
                    />
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Clients;
