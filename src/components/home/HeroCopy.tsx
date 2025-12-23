'use client';

import { Button } from '@/ui/Button';
import { ArrowUpRight } from 'lucide-react';

export default function HeroCopy() {
  return (
    <div className="text-center text-ghost-text">
      <div className="mb-4 text-xs font-medium tracking-[0.28em] text-ghost-text/70">
        [BRAND AWARENESS]
      </div>

      {/* Text centered, no animations */}
      <h1 className="text-balance font-semibold leading-[1.05] tracking-[-0.03em] text-4xl sm:text-5xl md:text-6xl drop-shadow-2xl">
        <span className="block">Design, não</span>
        <span className="block">é só estética.</span>
      </h1>

      <p className="mt-5 text-pretty text-base text-ghost-text/80 sm:text-lg">
        [É intenção, é estratégia, é experiência.]
      </p>

      <div className="mt-8 flex justify-center">
        <Button href="#manifesto" className="group" size="lg">
          get to know me better
          <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Button>
      </div>
    </div>
  );
}
