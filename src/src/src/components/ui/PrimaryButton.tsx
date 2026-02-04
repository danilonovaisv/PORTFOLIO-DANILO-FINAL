'use client';

import type { ReactNode } from 'react';

type Variant = 'solid' | 'outline';

interface PrimaryButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
}

export function PrimaryButton({
  href,
  children,
  variant = 'solid',
}: PrimaryButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium uppercase tracking-[0.22em] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  const variantClasses =
    variant === 'solid'
      ? 'bg-primary text-white hover:bg-primary-hover focus-visible:ring-primary focus-visible:ring-offset-background'
      : 'border border-primary text-primary hover:bg-primary hover:text-white focus-visible:ring-primary focus-visible:ring-offset-background';

  return (
    <a href={href} className={`${baseClasses} ${variantClasses}`}>
      {children}
    </a>
  );
}
