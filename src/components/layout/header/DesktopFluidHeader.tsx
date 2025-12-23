'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { BRAND } from '@/config/brand';
import { NAV_LINKS } from '@/config/navigation';
import { Canvas } from '@react-three/fiber';
import FluidGlass from '@/components/canvas/webgl/FluidGlass';

// This component orchestrates the Desktop Header
// It layers HTML content over the WebGL canvas (or uses View if we want to embed)
// For a "Floating Header", we usually have:
// Z-0: Page Content
// Z-40: Header Container (Fixed)
//    - WebGL Canvas (Glass Background)
//    - HTML Nav (Links)

export default function DesktopFluidHeader() {
  const pathname = usePathname();

  const getAriaCurrent = (href: string): 'page' | undefined => {
    if (href === '/' && pathname === '/') return 'page';
    if (href !== '/' && pathname.startsWith(href)) return 'page';
    return undefined;
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-3xl h-16 flex items-center justify-center pointer-events-none">
      {/* HTML Content (Pointer Events Auto) */}
      <div className="relative z-10 flex items-center justify-between w-full px-8 pointer-events-auto">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Ir para a home"
          className="relative block shrink-0 transition-transform duration-300 hover:scale-105"
        >
          <div className="relative h-8 w-24 drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            <Image
              src={BRAND.logos.light}
              alt={BRAND.name}
              fill
              className="object-contain"
              sizes="160px"
              priority
            />
          </div>
        </Link>

        {/* Links */}
        <nav className="flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = getAriaCurrent(link.href) === 'page';
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`relative text-sm font-medium lowercase tracking-wide transition-colors duration-200 ${
                  isActive
                    ? 'text-[#0057FF]'
                    : 'text-white/85 hover:text-white'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] w-full origin-left rounded-full bg-[#0057FF] transition-transform duration-300 ${
                    isActive ? 'scale-x-100' : 'scale-x-0 hover:scale-x-100'
                  }`}
                  aria-hidden
                />
              </Link>
            );
          })}
        </nav>
      </div>

      {/* WebGL Glass Background - Absolute, covering the header area */}
      {/* We can use a dedicated Canvas here or a View into a global canvas.
            For simplicity and isolation, a local Canvas in the header.
            Performance warning: Multiple Canvases.
            But Spec says "Canvas WebGL isolado".
        */}
      <div className="absolute inset-0 z-0 rounded-full overflow-hidden shadow-[0_25px_90px_rgba(0,0,0,0.45)]">
        {/* Fallback CSS background if WebGL fails or loading */}
        <div className="absolute inset-0 -z-10 border border-white/8 bg-white/10 backdrop-blur-xl" />

        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 2]}
          className="pointer-events-none"
        >
          <ambientLight intensity={0.35} />
          <pointLight position={[10, 10, 10]} />
          <FluidGlass />
        </Canvas>
      </div>
    </header>
  );
}
