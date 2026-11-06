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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Admin screens should keep the browser's native scroll to avoid
  // smooth-scroll side effects (Playwright needs window.scrollY to change).
  const isAdminRoute = useMemo(
    () => pathname?.startsWith('/admin') ?? false,
    [pathname]
  );

  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const isPlaywrightTest = process.env.NEXT_PUBLIC_PLAYWRIGHT_TEST === 'true';

  useEffect(() => {
    if (isAdminRoute) {
      document.documentElement.classList.add('admin-page');
    } else {
      document.documentElement.classList.remove('admin-page');
    }
  }, [isAdminRoute]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    syncPreference();

    mediaQuery.addEventListener('change', syncPreference);
    return () => mediaQuery.removeEventListener('change', syncPreference);
  }, []);

  useEffect(() => {
    // ♿ SE REDUCED MOTION → SEM LENIS
    if (
      flags.reducedMotion ||
      prefersReducedMotion ||
      isAdminRoute ||
      isPlaywrightTest
    ) {
      setLenisInstance(null);
      return;
    }

    let lenis: any;
    let tickerCallback: ((_time: number) => void) | null = null;
    let gsapInstance: any = null;
    let scrollTriggerInstance: any = null;

    const initLenis = async () => {
      const LenisModule = (await import('lenis')).default;
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      gsapInstance = gsap;
      scrollTriggerInstance = ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      lenis = new LenisModule({
        lerp: 0.08,
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
      });

      if (typeof window !== 'undefined') {
        (window as Window & { lenis?: unknown }).lenis = lenis;
      }

      setLenisInstance(lenis);

      // Sincroniza GSAP ScrollTrigger com as atualizações de scroll do Lenis
      lenis.on('scroll', ScrollTrigger.update);

      // GSAP ticker unificado para dirigir o loop de animação do Lenis
      tickerCallback = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
    };

    initLenis();

    return () => {
      if (tickerCallback && gsapInstance) {
        gsapInstance.ticker.remove(tickerCallback);
      }
      if (lenis) {
        if (
          typeof window !== 'undefined' &&
          (window as { lenis?: unknown }).lenis === lenis
        ) {
          (window as { lenis?: unknown }).lenis = null;
        }
        if (scrollTriggerInstance) {
          lenis.off?.('scroll', scrollTriggerInstance.update);
        }
        lenis.destroy();
      }
      setLenisInstance(null);
    };
  }, [
    flags.reducedMotion,
    prefersReducedMotion,
    isAdminRoute,
    isPlaywrightTest,
  ]);

  return (
    <ScrollContext.Provider
      value={{ lenis: isAdminRoute ? null : lenisInstance }}
    >
      {children}
    </ScrollContext.Provider>
  );
}
