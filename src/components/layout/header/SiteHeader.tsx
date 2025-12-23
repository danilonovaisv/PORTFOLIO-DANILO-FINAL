'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { BRAND } from '@/config/brand';
import { NAV_LINKS } from '@/config/navigation';
import StaggeredMenu from './StaggeredMenu';

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
  const pathname = usePathname();

  // Update scroll state for compact mode
  useMotionValueEvent(scrollY, 'change', (latest) => {
    // Threshold > 40px as per workflow
    setIsScrolled(latest > 40);
  });

  // Determines if a link is active
  const isLinkActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        isScrolled
          ? 'py-2 border-b border-gray-100 shadow-sm'
          : 'py-4 border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="relative block w-24 h-8 shrink-0 group">
          <Image
            src={BRAND.logos.dark}
            alt={BRAND.name}
            fill
            className="object-contain object-left transition-opacity duration-300 group-hover:opacity-80"
            sizes="(max-width: 768px) 100vw, 120px"
            priority
          />
        </Link>

        {/* Right: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {NAV_LINKS.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`relative text-sm font-medium lowercase tracking-wide transition-colors duration-200 group ${
                      active
                        ? 'text-[#0057FF]'
                        : 'text-gray-700 hover:text-[#0057FF]'
                    }`}
                  >
                    {link.label}
                    {/* Animated Underline */}
                    <span
                      className={`absolute left-0 bottom-[-4px] h-[2px] w-full bg-[#0057FF] origin-left transition-transform duration-300 ${
                        active
                          ? 'scale-x-100'
                          : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right: Mobile Menu */}
        <StaggeredMenu />
      </div>
    </header>
  );
}
