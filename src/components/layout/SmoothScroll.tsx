'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import type Lenis from 'lenis';
import { ScrollContext } from '@/contexts/ScrollContext';

import { useAntigravityStore } from '@/store/antigravity.store';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const { flags } = useAntigravityStore();
  const pathname = usePathname();

  // Admin screens should keep the browser's native scroll to avoid
  // smooth-scroll side effects (Playwright needs window.scrollY to change).
  const isAdminRoute = useMemo(
    () => pathname?.startsWith('/admin') ?? false,
    [pathname]
  );

  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    if (isAdminRoute) {
      document.documentElement.classList.add('admin-page');
    } else {
      document.documentElement.classList.remove('admin-page');
    }
  }, [isAdminRoute]);

  useEffect(() => {
    // ♿ SE REDUCED MOTION → SEM LENIS
    if (flags.reducedMotion || isAdminRoute) {
      setLenisInstance(null);
      return;
    }

    let lenis: any;
    let rafId: number;

    const initLenis = async () => {
      const LenisModule = (await import('lenis')).default;
      lenis = new LenisModule({
        lerp: 0.08,
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
      });

      setLenisInstance(lenis);

      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
      setLenisInstance(null);
    };
  }, [flags.reducedMotion, isAdminRoute]);

  return (
    <ScrollContext.Provider
      value={{ lenis: isAdminRoute ? null : lenisInstance }}
    >
      {children}
    </ScrollContext.Provider>
  );
}
