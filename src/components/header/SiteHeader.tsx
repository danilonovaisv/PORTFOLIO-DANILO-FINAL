'use client';

import { useState, useEffect } from 'react';
import DesktopFluidHeader from './DesktopFluidHeader';
import MobileStaggeredMenu from './MobileStaggeredMenu';

export default function SiteHeader() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Breakpoint Strategy: Desktop >= 1024px
  useEffect(() => {
    setIsMounted(true);
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 1024);

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  if (!isMounted) return null;

  return (
    <header className="fixed left-0 right-0 top-0 z-50 pointer-events-none">
      <div className="pointer-events-auto w-full">
        {isDesktop ? (
          // DESKTOP: Fluid Glass (WebGL) - Objeto óptico, não reage ao scroll
          <DesktopFluidHeader />
        ) : (
          // MOBILE: Menu Funcional
          <MobileStaggeredMenu />
        )}
      </div>
    </header>
  );
}
