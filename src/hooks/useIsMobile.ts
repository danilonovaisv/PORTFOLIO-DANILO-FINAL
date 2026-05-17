'use client';

import { useState, useEffect } from 'react';

/**
 * Hook para detectar dispositivos mobile baseado no breakpoint do Ghost System (767px).
 * Inclui proteção contra erros de hidratação (retorna false no server).
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Breakpoint padrão Ghost: 767px (mobile)
    const mql = window.matchMedia('(max-width: 767px)');
    
    // Atualiza estado inicial
    setIsMobile(mql.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return isMobile;
}
