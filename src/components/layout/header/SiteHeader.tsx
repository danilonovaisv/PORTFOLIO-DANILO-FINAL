'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { BRAND } from '@/config/brand';
import StaggeredMenu from './StaggeredMenu';
import DesktopFluidHeader from './DesktopFluidHeader';

/**
 * SiteHeader Component
 *
 * SECTION PURPOSE:
 * - Provide global navigation and site visual identity
 * - Remain visible across all pages
 * - Reinforce the premium + experimental project identity
 * - Act as an atmospheric layer complementing the Hero Ghost
 *
 * BREAKPOINT STRATEGY:
 * - Desktop ≥ 1024px: Fluid Glass Header (WebGL)
 * - Tablet ≤ 1023px: Staggered Menu
 * - Mobile ≤ 640px: Staggered Menu
 *
 * Z-INDEX STRATEGY:
 * - z-[100] → Header / Glass effect (above everything for distortion effect)
 * - z-40 → Hero Video
 * - z-20 → Hero WebGL Canvas
 * - z-10 → Hero Content
 *
 * NON-NEGOTIABLES:
 * - ❌ Header does not compete with Hero
 * - ❌ No fake CSS glassmorphism
 * - ❌ No gratuitous decorative animations
 * - ✅ WebGL only on Desktop
 * - ✅ Mobile without heavy WebGL
 * - ✅ Mandatory functional fallback
 */

export default function SiteHeader() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Update scroll state for mobile compact mode
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 40);
  });

  return (
    <>
      {/* Desktop Fluid Glass Header (≥1024px) */}
      <div className="hidden lg:block">
        <DesktopFluidHeader />
      </div>

      {/* Mobile / Tablet Header (< 1024px) */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] lg:hidden transition-all duration-300 ${
          isScrolled ? 'backdrop-blur-md bg-black/30' : ''
        }`}
      >
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between px-4 transition-all duration-300 ${
            isScrolled ? 'py-3' : 'py-5'
          }`}
        >
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
      </header>
    </>
  );
}
