'use client';

import React, { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface MobileHeaderBarProps {
  logoUrl: string;
  onLogoClick: () => void;
  children: ReactNode;
  isLight?: boolean;
}

export default function MobileHeaderBar({
  logoUrl,
  onLogoClick,
  children,
  isLight = false,
}: MobileHeaderBarProps) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-300 ease-in-out ${
        isLight ? 'header--light' : ''
      }`}
    >
      <div
        className={`w-full h-[60px] pointer-events-auto transition-colors duration-300 ${
          isLight
            ? 'bg-white border-b border-black/5'
            : 'bg-background border-b border-white/5 shadow-lg shadow-black/20'
        }`}
      >
        <div className="flex items-center justify-between h-full px-6">
          <Link href="/" onClick={onLogoClick}>
            <Image
              src={logoUrl}
              alt="Danilo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
              style={{ width: 'auto' }}
              unoptimized
              loading="eager"
            />
          </Link>

          {children}
        </div>
      </div>
    </header>
  );
}
