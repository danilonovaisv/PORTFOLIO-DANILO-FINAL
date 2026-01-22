'use client';

import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Header from '@/components/layout/Header';

import { useExperience } from '@/hooks/useExperience';
import { useEffect } from 'react';

import { AntigravityDebugger } from '@/components/debug/AntigravityDebugger';

/**
 * Client-side layout wrapper that handles:
 * - Smooth scrolling (Lenis)
 * - Experience orchestration (device detection, WebGL flags)
 * - Header/Footer rendering
 * - Debug overlay
 */
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = useMemo(
    () => pathname?.startsWith('/admin') ?? false,
    [pathname]
  );

  // 🧠 ORQUESTRAÇÃO GLOBAL DA EXPERIÊNCIA (desativada no /admin para evitar scroll lock)
  useExperience(!isAdmin);

  useEffect(() => {
    if (isAdmin) {
      document.documentElement.classList.add('admin-page');
      return () => {
        document.documentElement.classList.remove('admin-page');
      };
    }
    return;
  }, [isAdmin]);

  if (isAdmin) {
    return (
      <main
        id="main-content"
        className="admin-surface relative min-h-screen bg-slate-950 text-slate-50"
      >
        {children}
      </main>
    );
  }

  return (
    <SmoothScroll>
      <Header />
      <main id="main-content" className="relative grow">
        {children}
      </main>
      {process.env.NODE_ENV === 'development' && <AntigravityDebugger />}
    </SmoothScroll>
  );
}
