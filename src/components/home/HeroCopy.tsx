import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { HOME_CONTENT } from '@/config/content';

export default function HeroCopy() {
  const { hero } = HOME_CONTENT;

  return (
    <div className="z-20 flex flex-col items-start text-left px-4 sm:px-6 max-w-3xl">
      <div className="text-[#d9dade] text-sm uppercase tracking-[0.3em] mb-4">
        {hero.tag}
      </div>
      <h1 className="text-[#d9dade] font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6 drop-shadow-[0_12px_60px_rgba(0,87,255,0.18)]">
        {hero.title[0]}
        <br />
        {hero.title[1]}
      </h1>
      <div className="text-[#d9dade] text-base md:text-lg mb-8 tracking-wide">
        {hero.subtitle}
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="#contact"
          className="inline-flex items-center gap-3 rounded-full bg-[#0b5bff] px-6 py-3 text-base font-medium text-white shadow-[0_20px_60px_rgba(0,87,255,0.35)] transition-transform duration-300 hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b5bff]"
          aria-label="Entre em contato com Danilo Novais"
        >
          <span className="tracking-wide">{hero.cta}</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 border border-white/15">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </div>
  );
}
