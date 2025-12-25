'use client';

import Link from 'next/link';
import Image from 'next/image';
import LogoLight from '@/assets/logos/LogoLight.svg';
import FluidGlass from './webgl/FluidGlass';

const DesktopFluidHeader = () => {
  const navItems = [
    { label: 'home', link: '#hero' },
    { label: 'sobre', link: '/sobre' },
    { label: 'portfolio showcase', link: '/portfolio' },
    { label: 'contato', link: '#contact' },
  ];
  const activeIndex = 0;

  return (
    <header className="fixed left-1/2 top-6 z-40 w-full max-w-none -translate-x-1/2 px-4">
      <div className="relative h-[86px] w-full max-w-[1180px] overflow-visible sm:h-[92px]">
        <div className="absolute inset-0 -z-10 rounded-[32px] bg-[radial-gradient(circle_at_20%_10%,rgba(86,133,255,0.25),transparent_38%),radial-gradient(circle_at_80%_20%,rgba(120,66,255,0.2),transparent_40%)] opacity-60 blur-xl" />

        {/* WebGL lens */}
        <FluidGlass
          mode="lens"
          lensProps={{
            scale: 0.25,
            ior: 1.15,
            thickness: 5,
            chromaticAberration: 0.1,
            anisotropy: 0.01,
            navItems,
          }}
        />

        {/* DOM overlay for clarity and accessibility */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-6 text-white">
          <div className="pointer-events-auto flex items-center gap-3">
            <Image
              src={LogoLight}
              alt="Danilo Novais"
              className="h-10 w-auto drop-shadow-[0_0_18px_rgba(59,130,246,0.45)]"
              priority
            />
          </div>

          <nav className="pointer-events-auto hidden items-center gap-8 text-lg font-medium tracking-tight md:flex">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.link}
                className={`pb-1 transition-colors duration-200 ${
                  index === activeIndex
                    ? 'text-[#2c7bff]'
                    : 'text-white/90 hover:text-white'
                }`}
                aria-label={item.label}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default DesktopFluidHeader;
