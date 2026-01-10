'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ABOUT_CONTENT } from '@/config/content';
import { motionTokens, motionSprings } from './motion';

export default function AboutMethod() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, motionSprings.ghost);
  const effectiveProgress = prefersReducedMotion
    ? scrollYProgress
    : smoothProgress;

  const mediaY = useTransform(
    effectiveProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [56, -56]
  );
  const textY = useTransform(
    effectiveProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [16, -16]
  );

  return (
    <section
      ref={containerRef}
      className="relative bg-background overflow-hidden"
      aria-label="Como Eu Trabalho"
    >
      <div className="relative z-30 std-grid">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-20 md:py-32">
          {/* Content Left */}
          <div className="flex flex-col justify-center order-1 md:order-1">
            <motion.div style={{ y: textY }} className="max-w-[640px]">
              {/* Títulos */}
              <motion.div
                variants={motionTokens.fadeGhost}
                initial={prefersReducedMotion ? 'visible' : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, margin: '-20%' }}
                className="mb-8 md:mb-10 text-left"
              >
                <h2 className="text-[32px] sm:text-[40px] lg:text-[56px] font-bold text-white leading-[1.1] tracking-tight">
                  <span className="text-primary block mb-1">
                    Criatividade com método.
                  </span>
                  <span className="text-white/40">Impacto sem ruído.</span>
                </h2>
              </motion.div>

              {/* Texto introdutório */}
              <motion.div
                variants={motionTokens.fadeGhost}
                initial={prefersReducedMotion ? 'visible' : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, margin: '-20%' }}
                className="text-[16px] md:text-[18px] text-white/70 font-normal leading-relaxed space-y-4 mb-12 text-left"
              >
                {ABOUT_CONTENT.method.intro.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </motion.div>

              {/* Steps List */}
              <motion.div
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                initial={prefersReducedMotion ? 'visible' : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, margin: '-10%' }}
                className="flex flex-col gap-4"
              >
                {ABOUT_CONTENT.method.steps.map((step, i) => (
                  <motion.div
                    key={i}
                    variants={motionTokens.riseSoft}
                    className="
                      group flex items-center gap-6 
                      p-4 pr-6 rounded-xl
                      bg-white/5 border border-white/5 backdrop-blur-sm
                      hover:bg-primary/10 hover:border-primary/30 hover:translate-x-2 
                      transition-all duration-300
                    "
                  >
                    <span
                      className="
                      flex h-10 w-10 shrink-0 items-center justify-center 
                      rounded-full bg-primary/20 text-primary font-bold text-sm
                      group-hover:bg-primary group-hover:text-white transition-colors duration-300
                    "
                    >
                      0{i + 1}
                    </span>
                    <p className="text-[15px] sm:text-[16px] text-white/80 group-hover:text-white transition-colors font-medium">
                      {step}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Right Visual Area (Video) */}
          <div className="h-full min-h-[400px] md:min-h-[600px] relative rounded-2xl overflow-hidden order-2 md:order-2">
            <motion.div
              style={{ y: mediaY }}
              className="absolute inset-0 z-0 h-[120%] -top-[10%]"
            >
              <div className="absolute inset-0 bg-black/20 z-10" />
              <motion.video
                src={ABOUT_CONTENT.method.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                aria-hidden="true"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
