'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HOME_CONTENT } from '@/config/content';

/**
 * ManifestoText
 * High-fidelity typography section for the brand message.
 * Strictly follows the Ghost Theme (Void bg, Off-White text).
 */
export default function ManifestoText() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const words = HOME_CONTENT.hero.title.split(' ');

  return (
    <section
      ref={containerRef}
      className="relative min-h-[60vh] flex flex-col items-center justify-center py-32 bg-[#050505] overflow-hidden"
    >
      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-6 text-center"
      >
        <span className="inline-block mb-8 px-4 py-1.5 rounded-full border border-white/10 text-[10px] uppercase tracking-[0.4em] text-[#888888] font-medium">
          {HOME_CONTENT.hero.tag}
        </span>

        <h2 className="max-w-5xl mx-auto text-[clamp(2.5rem,8vw,5.5rem)] font-bold tracking-tighter leading-[0.95] text-[#F0F0F0]">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block mr-[0.3em]"
            >
              {word === 'não' || word === 'é' || word === 'só' ? (
                <span className="text-[#0057FF]">{word}</span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="mt-12 max-w-2xl mx-auto text-lg md:text-xl text-[#888888] font-medium leading-relaxed"
        >
          {HOME_CONTENT.hero.subtitle}
        </motion.p>
      </motion.div>

      {/* Decorative Blur Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#0057FF]/10 rounded-full blur-[120px] pointer-events-none z-0" />
    </section>
  );
}
