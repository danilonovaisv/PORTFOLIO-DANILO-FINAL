'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CLIENT_LOGOS } from '../../lib/constants';

const Clients: React.FC = () => {
  return (
    <section id="clients" className="py-20 bg-[#0057FF] text-white">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-16"
        >
          marcas com as quais já trabalhei.
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 items-center justify-items-center">
          {CLIENT_LOGOS.map(({ src, name }, index) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, opacity: 1 }}
              transition={{
                duration: 0.35,
                ease: 'easeOut',
                delay: index * 0.05,
              }}
              className="w-full max-w-[130px] opacity-80 transition-opacity duration-300 ease-out flex items-center justify-center"
            >
              <img
                src={src}
                alt={name}
                className="w-full h-full object-contain brightness-0 invert"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = `<div class="text-white font-bold text-xl opacity-50">CLIENT ${index + 1}</div>`;
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
