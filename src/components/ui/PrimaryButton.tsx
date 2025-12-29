import Link from 'next/link';
import React from 'react';

export function PrimaryButton({
  href,
  children,
  variant = 'outline',
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'outline' | 'solid';
  className?: string;
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-tight transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent';

  const styles =
    variant === 'solid'
      ? 'bg-[#0057FF] text-white hover:brightness-110'
      : 'border border-[#0057FF] text-[#0057FF] hover:bg-[#0057FF] hover:text-white';

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}
