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
          {CLIENT_LOGOS.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="w-full max-w-[140px] opacity-70 hover:opacity-100 transition-opacity duration-300"
            >
              <img
                src={logo}
                alt={`Client ${index + 1}`}
                loading="lazy"
                decoding="async"
                sizes="(min-width: 1024px) 12vw, 40vw"
                className="w-full h-auto brightness-0 invert"
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
