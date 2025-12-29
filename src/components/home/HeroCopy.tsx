'use client';

import Link from 'next/link';
import { HOME_CONTENT } from '@/config/content';
import { ArrowUpRight } from 'lucide-react';

export default function HeroCopy() {
  const { tag, title, subtitle } = HOME_CONTENT.hero;

  return (
    <div className="text-[#d9dade] max-w-3xl mx-auto flex flex-col items-center">
      {/* Tag */}
      <p className="font-mono text-xs uppercase tracking-[0.2em] mb-4 text-[#d9dade]/70">
        {tag}
      </p>

      {/* Headline */}
      <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-6 text-center">
        {title[0]}
        <br />
        {title[1]}
      </h1>

      {/* Subtitle */}
      <p className="text-base md:text-lg mb-10 text-[#d9dade]/80">
        {subtitle}
      </p>

      {/* CTA Button - Styled as per reference */}
      <Link
        href="/sobre"
        className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#d9dade]/30 bg-ghost-void/50 backdrop-blur-sm text-[#d9dade] text-sm uppercase tracking-wider transition-all duration-300 hover:border-[#d9dade]/60 hover:bg-[#0057FF]/20 hover:text-white"
      >
        <span>get to know me better</span>
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0057FF] text-white transition-transform duration-300 group-hover:rotate-45">
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </Link>
    </div>
  );
}
