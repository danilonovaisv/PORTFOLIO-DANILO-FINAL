'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { BRAND } from '@/config/brand';
import { NAV_LINKS } from '@/config/navigation';

export default function DesktopFluidHeader() {
  const pathname = usePathname();

  const getAriaCurrent = (href: string): 'page' | undefined => {
    if (href === '/' && pathname === '/') return 'page';
    if (href !== '/' && pathname?.startsWith(href)) return 'page';
    return undefined;
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 pointer-events-none">
      <div className="pointer-events-auto">
        <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-10 rounded-b-[10px] border-b border-white/20 bg-linear-to-b from-[#03040c]/90 via-[#010108]/90 to-[#010104]/70 px-8 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/80 backdrop-blur-lg shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          <Link
            href="/"
            aria-label="Ir para a home"
            className="relative block shrink-0 transition-transform duration-300 hover:scale-110"
          >
            <div className="relative h-10 w-28">
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

          <nav className="flex items-center gap-6" aria-label="Menu principal">
            {NAV_LINKS.map((link) => {
              const isActive = getAriaCurrent(link.href) === 'page';
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-label={`Ir para página ${link.label}`}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group relative px-1 text-[0.75rem] tracking-[0.5em] transition-colors duration-200 ${
                    isActive
                      ? 'text-[#0057FF]'
                      : 'text-white/70 hover:text-white/90'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-[2px] w-full origin-left rounded-full bg-[#0057FF] transition-transform duration-300 ${
                      isActive
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                    aria-hidden
                  />
                </Link>
              );
            })}
          </nav>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-white/80 via-white/40 to-transparent opacity-60" />
        </div>
      </div>
    </header>
  );
}
