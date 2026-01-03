'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ABOUT_CONTENT } from '@/config/content';

// Ghost Motion Tokens - Only opacity/translateY, no scale/bounce/rotate
const GHOST_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeGhost = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: GHOST_EASE },
  },
};

const itemRise = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: GHOST_EASE },
  },
};

export function AboutWhatIDo() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="min-h-[100vh] flex items-center justify-center bg-[#040013] py-24 md:py-32 lg:py-40"
      aria-label="O que eu faço"
    >
      <div className="w-full max-w-[1240px] px-6 md:px-12 mx-auto">
        {/* Título e subtítulo - Ghost Style */}
        <div className="text-center mb-16 md:mb-24 space-y-4 md:space-y-6 max-w-[700px] mx-auto">
          <motion.h2
            variants={fadeGhost}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.1]"
          >
            {ABOUT_CONTENT.whatIDo.title}
          </motion.h2>
          <motion.p
            variants={fadeGhost}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-[#a1a3a3] font-light"
          >
            {ABOUT_CONTENT.whatIDo.subtitle}
          </motion.p>
        </div>

        {/* Grid de Cards (GhostList) */}
        <motion.div
          variants={containerVariants}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5"
        >
          {ABOUT_CONTENT.whatIDo.items.map((item, i) => (
            <motion.div
              key={i}
              variants={itemRise}
              className="group relative bg-[#0b0d3a]/40 backdrop-blur-xs border-t border-white/5 p-8 md:p-10 min-h-[180px] flex flex-col justify-center
                         transition-colors duration-300 hover:bg-[#0b0d3a]/60"
            >
              <p className="text-lg md:text-xl text-[#d5d7e4]/90 font-light leading-relaxed tracking-tight group-hover:text-white transition-colors duration-300">
                {item.text}{' '}
                <span className="ghost-accent font-medium">
                  {item.highlight}
                </span>
                {item.suffix && <span>{item.suffix}</span>}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
