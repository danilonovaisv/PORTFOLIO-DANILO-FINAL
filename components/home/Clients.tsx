'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CLIENT_LOGOS } from '../../lib/constants';

const Clients: React.FC = () => {
  return (
    <section
      id="clients"
      aria-labelledby="clients-title"
      className="bg-neutral-950 text-white py-32 md:py-40"
    >
      <div className="container mx-auto px-6 md:px-12">
        <motion.h2
          id="clients-title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-[clamp(2rem,4vw,3.5rem)] font-semibold text-center md:text-left mb-14 md:mb-16"
        >
          marcas que confiam no meu trabalho
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-10 gap-y-14 place-items-center">
          {CLIENT_LOGOS.map(({ src, name }, index) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.04,
                duration: 0.45,
                ease: 'easeOut',
              }}
              whileHover={{ scale: 1.06, opacity: 0.95 }}
              className="relative flex h-16 w-32 sm:w-36 items-center justify-center rounded-2xl bg-white/5 p-3 shadow-[0_10px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/10"
              aria-label={`Logo da marca ${name}`}
            >
              <Image
                src={src}
                alt={name}
                fill
                sizes="(min-width: 1024px) 9rem, (min-width: 640px) 8rem, 7rem"
                loading="lazy"
                className="object-contain opacity-80 transition duration-300 ease-out hover:opacity-100"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
