'use client';

import React from 'react';
import Link from 'next/link';
import { HOME_CONTENT } from '@/config/content';

/**
 * HeroCopy - Editorial text block for Hero section
 * Features:
 * - Static text display (no animations)
 * - Full mobile responsiveness with centered layout
 * - Responsive line breaks: Mobile 3 lines, Desktop/Tablet 2 lines
 */
export default function HeroCopy() {
  const { hero } = HOME_CONTENT;

  return (
    <div className="absolute inset-0 z-10 flex flex-col justify-center items-center pointer-events-none px-4 pt-16 pb-12 sm:pt-20 sm:pb-16 md:pt-0 md:pb-[5vh]">
      {/* Container de texto: 70% no mobile, 80% tablet, 55% desktop */}
      <div className="w-[70vw] sm:w-[75vw] md:w-[80vw] lg:w-[55vw] max-w-[1400px] pointer-events-auto text-center flex flex-col items-center transition-all duration-500">
        {/* Tag */}
        <div className="font-mono text-[11px] sm:text-[12px] md:text-[14px] uppercase tracking-[0.2em] text-[#9cb3ff] mb-4 sm:mb-6 md:mb-10 font-normal opacity-80">
          {hero.tag}
        </div>

        {/* Main Quote (H1) - Responsive Line Breaks */}
        {/* Desktop/Tablet: 2 linhas | Mobile: 3 linhas */}
        {/* Font: TT Norms Pro Black, 6-9rem, tracking-tight */}
        <h1 className="font-sans font-black tracking-tight text-[#d9ddec] mix-blend-screen max-w-[1200px] drop-shadow-[0_0_24px_rgba(71,128,255,0.35)] flex flex-col items-center leading-[0.95] py-4 text-[clamp(3.5rem,13vw,6rem)] md:text-[clamp(6rem,9vw,9rem)]">
          {/* Mobile Version: 3 linhas - Visível apenas abaixo de md */}
          {/* "Você não" | "vê o" | "design." */}
          <span className="md:hidden flex flex-col items-center">
            {hero.titleMobile.map((line, index) => (
              <span key={`mobile-${index}`} className="block">
                {line}
              </span>
            ))}
          </span>

          {/* Desktop/Tablet Version: 2 linhas - Visível apenas em md+ */}
          {/* "Você não vê" | "o design." */}
          <span className="hidden md:flex flex-col items-center">
            {hero.title.map((line, index) => (
              <span key={`desktop-${index}`} className="block">
                {line}
              </span>
            ))}
          </span>
        </h1>

        {/* Sub Quote (H2) - Static */}
        <h2 className="font-sans font-bold tracking-tight mt-4 sm:mt-6 mb-8 sm:mb-12 text-[#9ca5c3] mix-blend-screen max-w-[800px] drop-shadow-[0_0_18px_rgba(71,128,255,0.25)] leading-[1.1] text-[clamp(1rem,4vw,2.5rem)] sm:text-[clamp(1.2rem,4vw,2.5rem)]">
          {hero.subtitle}
        </h2>

        {/* CTA Button (Center) - Full width on mobile */}
        <div className="w-full sm:w-auto">
          <CtaButton href="/sobre" label={hero.cta} />
        </div>
      </div>
    </div>
  );
}

function CtaButton({ href, label }: { href: string; label: string }) {
  const cleanLabel = label.replace('→', '').trim();

  return (
    <Link
      href={href}
      className="group flex items-center justify-center gap-3 bg-[#0c5bff] text-white no-underline font-semibold lowercase transition-all duration-300 shadow-[0_0_40px_rgba(12,91,255,0.55)] ring-1 ring-white/12 hover:bg-[#0a46d4] hover:shadow-[0_0_55px_rgba(12,91,255,0.75)] text-[14px] sm:text-[15px] px-6 sm:px-8 py-3 rounded-full w-full max-w-xs sm:w-auto sm:max-w-none mx-auto"
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
