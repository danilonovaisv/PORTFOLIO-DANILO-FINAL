// src/components/home/HeroCopy.tsx
'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { HOME_CONTENT } from '@/lib/constants'; // Ajustado o import

export default function HeroCopy() {
  const reducedMotion = usePrefersReducedMotion();

  // Otimização: Memoizar ou definir estilo condicionalmente
  const maskStyle: React.CSSProperties | undefined = reducedMotion
    ? undefined
    : {
        WebkitMaskImage:
          'radial-gradient(140px circle at var(--gx, 25%) var(--gy, 48%), rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 65%)',
        maskImage:
          'radial-gradient(140px circle at var(--gx, 25%) var(--gy, 48%), rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 65%)',
      };

  return (
    <div className="relative z-30 w-full max-w-4xl px-4 sm:px-6 text-center">
      {/* ===== TAG ===== */}
      <div className="relative mb-4">
        <div className="select-none text-xs font-medium tracking-[0.28em] text-white/25">
          {HOME_CONTENT.hero.tag}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 select-none text-xs font-medium tracking-[0.28em] text-white/70 drop-shadow-[0_0_12px_rgba(120,180,255,0.4)]"
          style={maskStyle}
        >
          {HOME_CONTENT.hero.tag}
        </div>
      </div>

      {/* ===== TITLE ===== */}
      <div className="relative mx-auto max-w-[45ch]">
        <h1 className="select-none text-balance font-semibold leading-[0.92] tracking-[-0.03em] text-white/20 text-[clamp(2.5rem,6vw,4.6rem)]">
          <strong>
            {HOME_CONTENT.hero.title[0]}
            <br />
            {HOME_CONTENT.hero.title[1]}
          </strong>
        </h1>

        <h1
          aria-hidden
          className="pointer-events-none absolute inset-0 select-none text-balance font-semibold leading-[0.92] tracking-[-0.03em] text-white text-[clamp(2.5rem,6vw,4.6rem)] drop-shadow-[0_0_20px_rgba(120,180,255,0.55)]"
          style={maskStyle}
        >
          <strong>
            {HOME_CONTENT.hero.title[0]}
            <br />
            {HOME_CONTENT.hero.title[1]}
          </strong>
        </h1>
      </div>

      {/* ===== SUBTITLE ===== */}
      <div className="relative mx-auto mt-6 max-w-[58ch]">
        <p className="select-none text-pretty text-sm leading-relaxed text-white/25 md:text-base">
          {HOME_CONTENT.hero.subtitle}
        </p>

        <p
          aria-hidden
          className="pointer-events-none absolute inset-0 select-none text-pretty text-sm leading-relaxed text-white/65 md:text-base drop-shadow-[0_0_14px_rgba(120,180,255,0.35)]"
          style={maskStyle}
        >
          {HOME_CONTENT.hero.subtitle}
        </p>
      </div>

      {/* CTA */}
      <div className="mt-10 flex justify-center pointer-events-auto">
        <Link
          href="/sobre"
          className="
            inline-flex items-center gap-3 rounded-full bg-[#0057FF]
            px-6 py-3 text-sm font-medium text-white
            shadow-[0_14px_40px_rgba(0,87,255,0.28)]
            transition-transform duration-300
            hover:-translate-y-px
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-white focus-visible:ring-offset-2
            focus-visible:ring-offset-black
          "
        >
          {HOME_CONTENT.hero.cta}
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </Link>
      </div>
    </div>
  );
}
