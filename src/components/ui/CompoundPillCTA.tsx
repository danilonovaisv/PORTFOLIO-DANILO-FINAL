/**
 * @deprecated Use `AntigravityCTA` instead for consistent CTA styling across the app.
 * This component is kept for backward compatibility but should not be used for new implementations.
 */
'use client';

import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ArrowIcon } from './ArrowIcon';
import { cn } from '@/lib/utils';

interface CompoundPillCTAProps {
  href: string;
  label: string;
  size?: 'default' | 'compact';
  direction?: 'forward' | 'back';
  className?: string;
}

export const CompoundPillCTA = ({
  href,
  label,
  size = 'default',
  direction = 'forward',
  className,
}: CompoundPillCTAProps) => {
  const isCompact = size === 'compact';
  const isBack = direction === 'back';

  // Idle orbital animation for the arrow
  const time = useMotionValue(0);
  useEffect(() => {
    if (isCompact) return;

    let frame: number;
    const animate = (t: number) => {
      time.set(t / 1000);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isCompact, time]);

  // Orbital motion (very subtle idle)
  const radius = 2;
  const speed = 2.5;
  const orbitX = useTransform(time, (t) => Math.cos(t * speed) * radius);
  const orbitY = useTransform(time, (t) => Math.sin(t * speed) * radius);

  const labelPill = (
    <div
      className={cn(
        'relative z-10 flex items-center justify-center rounded-full bg-bluePrimary transition-all duration-200 ease-out shadow-[0_15px_45px_var(--color-bluePrimary-faint)] group-hover:bg-blueAccent',
        isCompact ? 'h-12 px-5' : 'h-[58px] px-14'
      )}
    >
      <span
        className={cn(
          'transition-colors duration-200 ease-out group-hover:text-background',
          isCompact
            ? 'text-[11px] font-medium uppercase tracking-[0.14em] text-white/92'
            : 'text-base font-bold lowercase tracking-tight text-white'
        )}
      >
        {label}
      </span>
    </div>
  );

  const arrowPill = (
    <motion.div
      style={isCompact ? undefined : { x: orbitX, y: orbitY }}
      className={cn(
        'flex items-center justify-center bg-bluePrimary text-white transition-all duration-200 ease-out group-hover:bg-blueAccent group-hover:text-background shadow-[0_10px_30px_rgba(0,0,0,0.1)]',
        isCompact && isBack
          ? 'h-10 w-10 rounded-lg'
          : isCompact
            ? 'h-10 w-10 rounded-full'
            : 'h-[46px] w-[46px] rounded-full'
      )}
      aria-hidden="true"
    >
      {isBack ? (
        <ArrowLeft className="h-5 w-5" />
      ) : (
        <ArrowIcon className="h-6 w-6" />
      )}
    </motion.div>
  );

  return (
    <div
      className={cn(
        'relative flex items-center',
        isCompact ? 'justify-start py-0' : 'justify-center py-12',
        className
      )}
    >
      <Link
        href={href}
        className={cn(
          'group inline-flex items-center gap-[5px] transition-opacity duration-200 ease-out hover:opacity-90',
          isCompact && 'gap-2'
        )}
      >
        {isBack ? (
          <>
            {arrowPill}
            {labelPill}
          </>
        ) : (
          <>
            {labelPill}
            {arrowPill}
          </>
        )}
      </Link>
    </div>
  );
};
