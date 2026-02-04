'use client';

import type { MouseEvent } from 'react';
import { cn } from '@/lib/utils';

type PortfolioCTAProps = {
  label: string;
  href: string;
  onClick?: (_event: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  external?: boolean;
};

export default function PortfolioCTA({
  label,
  href,
  onClick,
  className,
  external = false,
}: PortfolioCTAProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn(
        'inline-flex min-h-[48px] items-center justify-center gap-3 rounded-full',
        'bg-primary px-6 py-3 text-sm font-medium tracking-[0.08em] text-white sm:text-base',
        'transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
        'hover:bg-[#0038d9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className
      )}
      aria-label={label}
    >
      <span>{label}</span>
      <span aria-hidden>→</span>
    </a>
  );
}
