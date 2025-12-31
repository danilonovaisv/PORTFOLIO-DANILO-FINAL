'use client';

import React from 'react';
import { CTAButton } from '@/components/ui/CTAButton';

export default function CTAProjectCard() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h3 className="text-5xl md:text-8xl font-bold text-center mb-16 tracking-tighter leading-[0.85] lowercase text-white">
        like what <br /> you see?
      </h3>

      <CTAButton href="/portfolio">view projects</CTAButton>
    </div>
  );
}
