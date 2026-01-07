'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HOME_CONTENT } from '@/config/content';
import { MOTION_VARIANTS, fadeGhost } from '@/lib/motionTokens';

export default function HeroCopy() {
  const { hero } = HOME_CONTENT;

  return (
    <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
      <motion.div
        className="w-full h-full max-w-[1920px] mx-auto flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 text-center"
        initial="hidden"
        animate="visible"
        variants={MOTION_VARIANTS.container}
      >
        {/* Tag */}
        <motion.div
          variants={fadeGhost}
          custom={0}
          className="font-mono text-[12px] md:text-[14px] uppercase tracking-[0.2em] text-[#9cb3ff] opacity-80 mb-6 md:mb-10 font-normal pointer-events-auto"
        >
          {hero.tag}
        </motion.div>

        {/* Main Quote (H1) */}
        <h1 className="font-sans font-black tracking-tighter text-[#fcffff] mix-blend-screen max-w-full drop-shadow-[0_0_24px_rgba(71,128,255,0.35)] flex flex-col items-center leading-[0.9] text-[clamp(3.5rem,10vw,9.5rem)] pointer-events-auto">
          {hero.title.map((line, index) => (
            <motion.span
              key={index}
              className="block"
              variants={MOTION_VARIANTS.item}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        {/* Sub Quote (H2/Intro) */}
        <motion.h2
          variants={fadeGhost}
          custom={0.4}
          className="font-sans font-black tracking-tighter mt-6 mb-12 text-[#9ca5c3] mix-blend-screen max-w-[800px] drop-shadow-[0_0_18px_rgba(71,128,255,0.25)] leading-[1.1] text-[clamp(1.5rem,4vw,3.5rem)] pointer-events-auto"
        >
          {hero.subtitle}
        </motion.h2>

        {/* CTA Button */}
        <motion.div
          variants={fadeGhost}
          custom={0.6}
          className="pointer-events-auto"
        >
          <CtaButton href="/sobre" label={hero.cta} />
        </motion.div>
      </motion.div>
    </div>
  );
}

function CtaButton({ href, label }: { href: string; label: string }) {
  const cleanLabel = label.replace('→', '').trim();

  return (
    <Link
      href={href}
      className="group flex items-center gap-3 bg-[#0c5bff] text-white no-underline font-semibold lowercase transition-all duration-300 shadow-[0_0_40px_rgba(12,91,255,0.55)] ring-1 ring-white/12 hover:bg-[#0a46d4] hover:shadow-[0_0_55px_rgba(12,91,255,0.75)] text-[15px] px-8 py-3 rounded-full"
    >
      <span>{cleanLabel}</span>
      <span className="flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 7H13M13 7L7 1M13 7L7 13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
