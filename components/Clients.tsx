import React from 'react';
import { motion } from 'framer-motion';
import { CLIENT_LOGOS } from '../constants';

const Clients: React.FC = () => {
  return (
    <section id="clients" className="py-20 bg-primary text-white">
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
                    {/* Placeholder Logic for SVG Logos - styling them white */}
                    <img 
                        src={logo} 
                        alt={`Client ${index + 1}`} 
                        className="w-full h-auto brightness-0 invert" 
                        onError={(e) => {
                            // Fallback if image fails to load
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.innerHTML = `<div class="text-white font-bold text-xl opacity-50">CLIENT ${index+1}</div>`;
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