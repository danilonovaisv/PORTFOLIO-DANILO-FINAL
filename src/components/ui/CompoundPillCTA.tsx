'use client';

import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowIcon } from './ArrowIcon';

interface CompoundPillCTAProps {
  href: string;
  label: string;
}

export const CompoundPillCTA = ({ href, label }: CompoundPillCTAProps) => {
  // Idle orbital animation for the arrow
  const time = useMotionValue(0);
  useEffect(() => {
    let frame: number;
    const animate = (t: number) => {
      time.set(t / 1000);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [time]);

  // Orbital motion (very subtle idle)
  const radius = 2;
  const speed = 2.5;
  const orbitX = useTransform(time, (t) => Math.cos(t * speed) * radius);
  const orbitY = useTransform(time, (t) => Math.sin(t * speed) * radius);

  return (
    <div className="relative flex items-center justify-center py-12">
      <Link
        href={href}
        className="group flex items-center gap-[5px] transition-transform duration-200 ease-out hover:-translate-y-px"
      >
        {/* Pill Label */}
        <div className="relative z-10 flex h-[58px] items-center justify-center rounded-full bg-[#0057FF] px-10 transition-all duration-200 ease-out group-hover:bg-ghost-green shadow-[0_15px_45px_rgba(0,87,255,0.2)]">
          <span className="text-base font-bold lowercase tracking-tight text-white transition-colors duration-200 ease-out group-hover:text-[#000022]">
            {label}
          </span>
        </div>

        {/* Arrow Circle */}
        <motion.div
          style={{ x: orbitX, y: orbitY }}
          className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#0057FF] text-white transition-all duration-200 ease-out group-hover:bg-ghost-green group-hover:text-[#000022] group-hover:scale-105 shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
        >
          <ArrowIcon className="h-6 w-6" />
        </motion.div>
      </Link>
    </div>
  );
};
