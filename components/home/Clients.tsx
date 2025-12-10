'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CLIENT_LOGOS } from '../../lib/constants';

const Clients: React.FC = () => {
  return (
    <section
      id="clients"
      aria-labelledby="clients-title"
      className="py-20 md:py-24 bg-[#0057FF] text-white"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center max-w-7xl">
        <motion.h2
          id="clients-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 tracking-tight"
        >
          marcas com as quais já trabalhei.
        </motion.h2>

        <ul
          role="list"
          className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-8 md:gap-x-12 md:gap-y-10 items-center justify-items-center py-4 md:py-6 px-2"
        >
          {CLIENT_LOGOS.map((logo, index) => {
            const clientName = `Cliente Parceiro ${index + 1}`;

            return (
              <motion.li
                key={index}
                role="listitem"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03, duration: 0.4 }}
                className="w-full flex items-center justify-center"
              >
                <div className="relative w-20 h-12 md:w-28 md:h-16 flex items-center justify-center group">
                  <div className="relative w-full h-full flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-300 min-h-[72px]">
                    <Image
                      src={logo}
                      alt={`Logo ${clientName}`}
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
