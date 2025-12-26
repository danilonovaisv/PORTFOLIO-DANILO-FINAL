'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { HOME_CONTENT } from '@/lib/constants';

export default function HeroCopy() {
  return (
    <div className="relative z-20 w-full max-w-5xl px-6 text-center">
      {/* TAG */}
      <div className="mb-6 flex justify-center">
        <span className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.3em] text-white/30 uppercase select-none">
          {HOME_CONTENT.hero.tag}
        </span>
      </div>

      {/* TÍTULO */}
      <h1 className="font-sans text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] tracking-tight text-white font-semibold mb-8 select-none">
        <span className="block opacity-95">{HOME_CONTENT.hero.title[0]}</span>
        <span className="block opacity-95 text-white/90">
          {HOME_CONTENT.hero.title[1]}
        </span>
      </h1>

      {/* SUBTÍTULO */}
      <p className="mx-auto max-w-[55ch] text-sm sm:text-base leading-relaxed text-white/50 font-light mb-10 text-balance">
        {HOME_CONTENT.hero.subtitle}
      </p>

      {/* CTA */}
      <div className="flex justify-center pointer-events-auto">
        <Link
          href="/sobre"
          className="
            group flex items-center gap-3 px-8 py-3.5 rounded-full
            bg-white/5 hover:bg-white/10
            border border-white/10 hover:border-white/20 hover:scale-105
            backdrop-blur-md transition-all duration-500 ease-out
          "
        >
          <span className="text-xs font-bold tracking-widest text-white uppercase">
            {HOME_CONTENT.hero.cta}
          </span>
          <ArrowUpRight className="w-4 h-4 text-[#0057FF] group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
        </Link>
      </div>
    </div>
  );
}
