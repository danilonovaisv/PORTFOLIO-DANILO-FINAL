'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMotionGate } from '@/hooks/useMotionGate';

interface HeroBackCTAProps {
  href: string;
  label: string;
  className?: string;
  size?: 'default' | 'compact';
}

export const HeroBackCTA = ({
  href,
  label,
  className,
  size = 'default',
}: HeroBackCTAProps) => {
  const reduceMotion = useMotionGate();
  const isCompact = size === 'compact';

  return (
    <Link
      href={href}
      className={cn(
        'group cta-button inline-flex items-center gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
        className
      )}
    >
      <div
        className={cn(
          'flex items-center justify-center rounded-full bg-bluePrimary text-white shadow-[0_4px_24px_rgba(0,122,255,0.4)]',
          isCompact
            ? 'h-10 w-10 sm:h-11 sm:w-11'
            : 'h-12 w-12 sm:h-[60px] sm:w-[60px]',
          !reduceMotion &&
            'transition-transform duration-200 ease-out group-hover:-translate-y-px'
        )}
      >
        <ArrowLeft
          className={cn(
            isCompact ? 'h-4 w-4 sm:h-5 sm:w-5' : 'h-5 w-5 sm:h-6 sm:w-6'
          )}
          strokeWidth={2}
        />
      </div>
      <span
        className={cn(
          'font-medium lowercase tracking-tight text-white',
          isCompact ? 'text-lg sm:text-xl' : 'text-[24px] sm:text-[34px]'
        )}
      >
        {label}
      </span>
    </Link>
  );
};
