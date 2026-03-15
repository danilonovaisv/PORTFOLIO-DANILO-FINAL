'use client';

import type { MouseEvent } from 'react';
import AntigravityCTA from '@/components/ui/AntigravityCTA';
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
    <AntigravityCTA
      as="a"
      href={href}
      text={label}
      onClick={onClick ? (event) => onClick(event as MouseEvent<HTMLAnchorElement>) : undefined}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn(
        'relative inline-flex w-full max-w-full justify-start md:w-auto',
        className
      )}
    />
  );
}
