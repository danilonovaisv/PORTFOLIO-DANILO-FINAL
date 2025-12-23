'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HOME_CONTENT } from '@/config/content';

const Clients: React.FC = () => {
  return (
    <section
      id="clients"
      className="bg-[#050505] py-24 md:py-32 border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
        >
          <span className="text-[#0057FF] text-xs font-bold uppercase tracking-[0.4em] mb-4">
            Trusted By
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-sans tracking-tight text-[#F0F0F0]">
            Marcas com as quais já trabalhei.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-12 items-center justify-items-center">
          {HOME_CONTENT.clients.map(({ src, name }, index) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, filter: 'brightness(1.2)' }}
              transition={{
                duration: 0.5,
                ease: [0.21, 0.47, 0.32, 0.98],
                delay: index * 0.06,
              }}
              className="relative h-12 md:h-14 w-full max-w-[120px] flex items-center justify-center opacity-90 transition-all duration-300"
            >
              <Image
                src={src}
                alt={name}
                fill
                className="object-contain brightness-0 invert"
                sizes="(max-width: 768px) 33vw, 16vw"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
