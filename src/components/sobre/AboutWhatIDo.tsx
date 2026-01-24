'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { ABOUT_CONTENT } from '@/config/content';
import { staggerContainer, MOTION_TOKENS } from '@/config/motion';

import { DesktopCard } from './what-i-do/DesktopCard';
import { MobileCard } from './what-i-do/MobileCard';

export function AboutWhatIDo() {
  const prefersReducedMotion = !!useReducedMotion();
  const cards = ABOUT_CONTENT.whatIDo.cards;
  const marquee = ABOUT_CONTENT.whatIDo.marquee;

  return (
    <section className="relative w-full bg-[#040013] py-16 text-white lg:py-24">
      <div className="mx-auto max-w-[1300px] px-6 lg:px-8">
        <header className="mb-10 text-center lg:mb-14">
          <motion.h2
            initial={
              prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 18 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            className="font-display text-[2.1rem] font-black leading-tight tracking-tight text-white sm:text-[2.6rem] lg:text-[3.4rem]"
          >
            Do <span className="text-[#2f57ff]">insight</span> ao{' '}
            <span className="text-[#2f57ff]">impacto</span>.
          </motion.h2>
          <motion.p
            initial={
              prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 14 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base font-semibold text-[#cfd0d7] sm:text-lg lg:mt-5 lg:text-xl"
          >
            Mesmo quando você não percebe.
          </motion.p>
        </header>

        {/* Desktop / large layout */}
        <motion.div
          variants={staggerContainer(MOTION_TOKENS.stagger.tight)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="hidden lg:grid lg:grid-cols-7 lg:gap-4"
        >
          {cards.map((service, index) => (
            <DesktopCard
              key={service.id}
              index={index}
              text={service.text}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </motion.div>

        {/* Mobile layout */}
        <motion.div
          variants={staggerContainer(MOTION_TOKENS.stagger.tight)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="lg:hidden flex flex-col gap-3"
        >
          {cards.map((service, index) => (
            <MobileCard
              key={service.id}
              index={index}
              text={service.text}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </motion.div>
      </div>

      {/* Marquee bar */}
      <div className="relative mt-12 overflow-hidden bg-[#1c2bff] py-3">
        <div className="marquee flex whitespace-nowrap text-sm font-semibold uppercase tracking-[0.25em] text-white">
          {[...marquee, ...marquee].map((item, idx) => (
            <span key={`${item}-${idx}`} className="mx-4">
              {item} •
            </span>
          ))}
        </div>
        <style jsx>{`
          .marquee {
            animation: marquee 18s linear infinite;
          }
          @keyframes marquee {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </div>
    </section>
  );
}
