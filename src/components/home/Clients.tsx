'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CLIENT_LOGOS } from '@/lib/constants';

const Clients: React.FC = () => {
  return (
    <section id="clients" className="bg-[#0057FF] py-16 md:py-20 text-white">
      <div className="container mx-auto px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-12 text-center text-2xl md:text-3xl font-semibold"
        >
          marcas com as quais já trabalhei.
        </motion.h2>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 items-center justify-items-center">
          {CLIENT_LOGOS.map(({ src, name }, index) => (
            <motion.a
              key={name}
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.04, opacity: 1 }}
              transition={{
                duration: 0.35,
                ease: 'easeOut',
                delay: index * 0.04,
              }}
              className="flex h-16 w-full max-w-[140px] items-center justify-center opacity-85 outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0057FF]"
              aria-label={name}
            >
              <img
                src={src}
                alt={name}
                className="h-full w-full object-contain brightness-0 invert drop-shadow"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
