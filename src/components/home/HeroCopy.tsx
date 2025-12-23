// src/components/home/HeroCopy.tsx
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface HeroCopyProps {
  className?: string;
}

export default function HeroCopy({ className = '' }: HeroCopyProps) {
  return (
    <div
      className={`relative z-20 flex flex-col items-center text-center px-4 sm:px-6 max-w-3xl mx-auto mb-12 lg:mb-0 lg:items-start lg:text-left ${className}`}
    >
      <div className="text-[#d9dade] text-sm md:text-xs uppercase tracking-[0.4em] mb-6 font-medium">
        [BRAND AWARENESS]
      </div>
      <h1 className="text-[#d9dade] font-bold text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-6">
        Design, não
        <br />é só estética.
      </h1>
      <div className="text-[#d9dade]/60 text-base md:text-lg mb-8 font-medium tracking-tight">
        [É intenção, é estratégia, é experiência.]
      </div>
      <Link
        href="/sobre"
        className="inline-flex items-center justify-center gap-3 rounded-full border border-transparent bg-[#0057FF] px-6 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.3em] text-white transition hover:-translate-y-0.5 hover:bg-[#1a6cff]"
        aria-label="Ir para a página Sobre"
      >
        <span>get to know me better</span>
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
