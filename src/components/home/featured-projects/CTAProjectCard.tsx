'use client';

import Link from 'next/link';
import React from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowIcon } from '@/components/ui/ArrowIcon';

export default function CTAProjectCard() {
  const reducedMotion = useReducedMotion();

  return (
    <Link
      href="/portfolio"
      className="group flex flex-col items-center justify-center p-8 bg-primary text-white rounded-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary h-full"
      aria-label="Ver todos os projetos"
    >
      <h3 className="text-3xl md:text-5xl font-medium text-center mb-10 tracking-tight leading-[1.1]">
        Like what <br /> you see?
      </h3>

      <div className="inline-flex items-center gap-2 px-1 py-1 rounded-full bg-black text-white transition-transform duration-500 group-hover:scale-105">
        <span className="pl-6 pr-2 text-sm font-medium tracking-wide">
          view projects
        </span>
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10">
          <ArrowIcon
            className={`w-4 h-4 text-white transition-transform ${reducedMotion
              ? ''
              : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
              }`}
          />
        </div>
      </div>
    </Link>
  );
}
