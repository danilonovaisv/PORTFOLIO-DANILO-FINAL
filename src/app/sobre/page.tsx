'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ABOUT_CONTENT } from '@/config/content';
import { Button } from '@/components/ui/Button';
import { ArrowUpRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-surface-main text-[#F0F0F0] selection:bg-focus-ring selection:text-white pt-24 md:pt-32">
      {/* Hero Section */}
      <section className="relative px-6 md:px-12 lg:px-24 mb-24 md:mb-40">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 md:gap-8"
          >
            <span className="text-focus-ring font-mono tracking-widest uppercase text-sm md:text-base">
              {ABOUT_CONTENT.hero.subtitle}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-linear-to-b from-white to-white/60">
              {ABOUT_CONTENT.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-[#888888] max-w-2xl leading-relaxed">
              {ABOUT_CONTENT.hero.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bio & Stats Section */}
      <section className="relative px-6 md:px-12 lg:px-24 pb-24 md:pb-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          {/* Stats Column */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-8 md:gap-12 flex-wrap order-2 lg:order-1">
            {ABOUT_CONTENT.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="flex flex-col gap-2"
              >
                <span className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                  {stat.value}
                </span>
                <span className="text-sm text-[#888888] uppercase tracking-wider font-mono">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Bio Column */}
          <div className="lg:col-span-8 flex flex-col gap-8 order-1 lg:order-2">
            {ABOUT_CONTENT.bio.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
                className="text-lg md:text-2xl text-[#CCCCCC] leading-relaxed font-light"
              >
                {paragraph}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <Button
                href="/portfolio"
                size="lg"
                className="bg-focus-ring text-white hover:bg-[#0046CC] rounded-full px-8 py-6 text-lg gap-3 shadow-[0_0_20px_rgba(0,87,255,0.3)] hover:shadow-[0_0_30px_rgba(0,87,255,0.5)] transition-all"
              >
                Ver Projetos
                <ArrowUpRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
