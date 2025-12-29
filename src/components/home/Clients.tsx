'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HOME_CONTENT } from '@/config/content';

const Clients: React.FC = () => {
  return (
    <section
      id="clients"
      className="relative bg-focus-ring py-24 md:py-32 overflow-hidden"
    >
      <div className="mx-auto w-full px-[clamp(1.5rem,5vw,6rem)] max-w-[1680px]">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
        >
          <span className="text-white/80 text-xs font-bold uppercase tracking-[0.4em] mb-4">
            Trusted By
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-sans tracking-tight text-white">
            Marcas com as quais já trabalhei.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-12 items-center justify-items-center">
          {HOME_CONTENT.clients.logos.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              whileHover={{ scale: 1.05 }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.03,
              }}
              className="relative h-12 md:h-14 w-full max-w-[120px] flex items-center justify-center transition-transform duration-300"
            >
              <Image
                src={src}
                alt={`Client ${index + 1}`}
                fill
                className="object-contain brightness-0 invert"
                sizes="(max-width: 768px) 33vw, 16vw"
                aria-label={`Logo of Client ${index + 1}`}
              />
              <span className="sr-only">{`Client ${index + 1}`}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
