'use client';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';

import { ABOUT_CONTENT } from '@/config/content';
import EditorialText from '@/components/ui/EditorialText';
import { useEditorialMotion } from '@/hooks/useEditorialMotion';

export default function AboutMethod() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion, variants } = useEditorialMotion();
  const { title, intro, steps } = ABOUT_CONTENT.method;
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const yRaw = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);
  const y = useSpring(yRaw, { stiffness: 40, damping: 20 });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-32 md:py-48 flex flex-col justify-center overflow-hidden bg-(--ghost-bg)"
      aria-label="Como Eu Trabalho"
    >
      {/* Background - Full bleed video with parallax */}
      <motion.div
        style={{ y: prefersReducedMotion ? 0 : y, willChange: 'transform' }}
        className="absolute inset-0 z-0 h-[110%] -top-[5%]"
      >
        <video
          src={ABOUT_CONTENT.method.video}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-(--ghost-bg)/60" />
      </motion.div>

      <div className="relative z-10 w-full max-w-[1680px] mx-auto px-6 md:px-24">
        {/* Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-20 md:gap-x-12">
          {/* Left Column: Title & Label */}
          <motion.div
            variants={variants.floatMemory}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true }}
            className="md:col-span-5 relative"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <span className="inline-block px-3 py-1 border border-white/20 rounded-full text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-(--ghost-flare) mb-4">
                Method
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-(--ghost-text) tracking-tighter leading-[0.9] text-left">
              {title.text.replace(title.highlight, '')}
              <span className="block text-[#0057FF] opacity-80">
                {title.highlight}
              </span>
            </h2>
          </motion.div>

          {/* Right Column: Editorial Text & Steps */}
          <div className="md:col-span-6 md:col-start-7 flex flex-col justify-center">
            {/* Editorial Intro - Staggered Reveal */}
            <div className="mb-20 md:mb-32 space-y-6">
              {intro.map((line, i) => (
                <EditorialText
                  key={i}
                  text={line}
                  className="text-2xl md:text-3xl font-light leading-tight text-(--ghost-text-main)"
                  delay={i * 2 + 1}
                />
              ))}
            </div>

            {/* Steps List (Focus Effect) */}
            <div
              className="grid grid-cols-1 gap-y-8"
              onMouseLeave={() => setActiveStep(null)}
            >
              {steps.map((item, i) => (
                <motion.div
                  key={i}
                  variants={variants.riseSoft}
                  initial={prefersReducedMotion ? 'visible' : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  onMouseEnter={() => setActiveStep(i)}
                  animate={{
                    opacity: activeStep !== null && activeStep !== i ? 0.3 : 1,
                    x: activeStep === i ? 10 : 0,
                  }}
                  className="group flex items-start gap-6 border-t border-white/10 pt-6 transition-colors duration-500 hover:border-[#0057FF]/50 cursor-default"
                >
                  <span className="font-mono text-[#0057FF] text-sm font-bold pt-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    0{i + 1}
                  </span>
                  <p className="text-lg md:text-xl text-(--ghost-text-secondary) font-light group-hover:text-white transition-colors duration-300">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
