'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { BRAND } from '@/config/brand';
import StaggeredMenu from './StaggeredMenu';
import DesktopFluidHeader from './DesktopFluidHeader';

// Workflow: Header (SiteHeader)
// Visual Specification:
// - Position: Fixed top-0 left-0 right-0 z-50
// - Background: Solid White
// - Dimensions: max-w-6xl centered
// - Padding: Initial py-4, Condensed py-2
// - Logo: logoDark
// - interactions: Hover blue text + underline

export default function SiteHeader() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Update scroll state for compact mode
  useMotionValueEvent(scrollY, 'change', (latest) => {
    // Threshold > 40px as per workflow
    setIsScrolled(latest > 40);
  });

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] pointer-events-none">
      {/* Desktop Fluid Glass */}
      <div className="hidden lg:block pointer-events-auto transition-transform duration-500">
        <DesktopFluidHeader />
      </div>

      {/* Mobile / Tablet Staggered Menu */}
      <div
        className={`lg:hidden pointer-events-auto transition-all duration-300 ${
          isScrolled ? 'py-3 backdrop-blur-md bg-black/30' : 'py-5'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
          <Link
            href="/"
            className="relative block h-9 w-28 shrink-0"
            aria-label="Ir para a home"
          >
            <Image
              src={BRAND.logos.light}
              alt={BRAND.name}
              fill
              className="object-contain"
              sizes="140px"
              priority
            />
          </Link>
          <StaggeredMenu />
        </div>
      </div>
    </header>
  );
}
