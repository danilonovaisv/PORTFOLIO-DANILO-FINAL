'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroCopy() {
  return (
    <div className="absolute inset-0 z-10 flex flex-col justify-center items-center pointer-events-none px-4 md:px-0">
      <div className="w-full max-w-[1200px] flex flex-col items-center text-center">
        {/* Tag */}
        <div className="font-mono text-[14px] uppercase tracking-widest text-blue-300/80 mb-6 md:mb-8 pointer-events-auto">
          [BRAND AWARENESS]
        </div>

        {/* Main Quote - H1 */}
        <h1
          className="font-sans font-black tracking-tighter leading-[0.9] text-white mix-blend-screen drop-shadow-[0_0_30px_rgba(71,128,255,0.4)]
          text-[3.5rem]      /* Mobile Base */
          md:text-[6rem]     /* Tablet */
          lg:text-[9rem]     /* Desktop */
          xl:text-[10rem]    /* Large Desktop */
          flex flex-col items-center
        "
        >
          <span className="block">Você não vê</span>
          <span className="block text-white/90">o design.</span>
        </h1>

        {/* Sub Quote - H2 */}
        <h2
          className="font-sans font-black tracking-tighter leading-[0.9] mt-2 md:mt-4 text-[#9ca5c3] mix-blend-screen drop-shadow-[0_0_20px_rgba(71,128,255,0.3)]
          text-[2.5rem]      /* Mobile Base */
          md:text-[5rem]     /* Tablet */
          lg:text-[7rem]     /* Desktop */
          xl:text-[8rem]     /* Large Desktop */
        "
        >
          Mas ele vê você.
        </h2>

        {/* CTA Button */}
        <Link
          href="/sobre"
          className="group pointer-events-auto mt-12 md:mt-16 flex items-center gap-3 text-white text-[15px] font-medium tracking-wide uppercase transition-all duration-300 hover:text-blue-400"
        >
          <span>step inside</span>
          <span className="flex items-center justify-center w-8 h-8 rounded-full border border-white/20 group-hover:border-blue-400/50 group-hover:bg-blue-600/10 transition-all duration-300">
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </Link>
      </div>
    </div>
  );
}
