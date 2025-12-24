'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { BRAND } from '@/config/brand';
import { NAV_LINKS } from '@/config/navigation';

// Dynamically import WebGL component to avoid SSR issues
const FluidGlass = dynamic(() => import('./webgl/FluidGlass'), {
  ssr: false,
  loading: () => null,
});

/**
 * Desktop Fluid Glass Header
 *
 * Visual Behavior:
 * - Translucent element with real refraction (MeshTransmissionMaterial)
 * - Subtle optical distortion
 * - Controlled chromatic aberration
 * - Follows cursor with smooth delay
 * - Renders content behind (no solid background)
 *
 * Z-Index Strategy:
 * - z-[100] → Header (above everything for glass distortion effect)
 * - z-40 → Video
 * - z-20 → Hero WebGL Canvas
 * - z-10 → Hero Text
 */

export default function DesktopFluidHeader() {
  const pathname = usePathname();

  const getAriaCurrent = (href: string): 'page' | undefined => {
    if (href === '/' && pathname === '/') return 'page';
    if (href !== '/' && pathname?.startsWith(href)) return 'page';
    return undefined;
  };

  return (
    <>
      {/* Fluid Glass WebGL Layer - Fixed above everything */}
      <div
        className="fixed inset-x-0 top-0 z-[100] h-20 pointer-events-none"
        role="img"
        aria-label="Elemento de vidro fluido decorativo"
      >
        <Suspense fallback={null}>
          <FluidGlass
            scale={0.25}
            ior={1.15}
            thickness={5}
            chromaticAberration={0.1}
            anisotropy={0.01}
          />
        </Suspense>
      </div>

      {/* Static Header Content - Navigation */}
      <header
        className="fixed inset-x-0 top-0 z-[101] pointer-events-none"
        role="banner"
      >
        <div className="pointer-events-auto">
          <nav
            className="relative mx-auto flex max-w-4xl items-center justify-between gap-8 px-8 py-4"
            aria-label="Menu principal"
          >
            {/* Logo */}
            <Link
              href="/"
              aria-label="Ir para a home"
              className="relative block shrink-0 transition-opacity duration-300 hover:opacity-80"
            >
              <div className="relative h-10 w-28">
                <Image
                  src={BRAND.logos.faviconLight}
                  alt={BRAND.name}
                  fill
                  className="object-contain"
                  sizes="160px"
                  priority
                />
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-6">
              {NAV_LINKS.map((link) => {
                const isActive = getAriaCurrent(link.href) === 'page';
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    aria-label={`Ir para página ${link.label}`}
                    aria-current={isActive ? 'page' : undefined}
                    className={`text-xs font-medium uppercase tracking-[0.3em] transition-opacity duration-200 ${
                      isActive
                        ? 'text-white opacity-100'
                        : 'text-white/70 hover:opacity-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
