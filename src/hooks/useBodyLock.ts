// =============================================================================
// useBodyLock Hook - Ghost Era v2.0
// Bloqueia o scroll do body quando modal está aberto
// =============================================================================

'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * Hook para bloquear scroll do body
 * Usado principalmente em modais para evitar scroll indesejado
 */
export function useBodyLock(isLocked: boolean): void {
  const scrollPositionRef = useRef<number>(0);
  const lockedRef = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const html = document.documentElement;
    const body = document.body;

    if (isLocked) {
      // Salva a posição atual do scroll
      scrollPositionRef.current = window.scrollY;
      lockedRef.current = true;

      // Aplica estilos para bloquear scroll
      const scrollbarWidth = window.innerWidth - html.clientWidth;

      body.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.top = `-${scrollPositionRef.current}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.paddingRight = `${scrollbarWidth}px`;
      html.style.overflow = 'hidden';
    } else {
      // Remove os estilos e restaura a posição do scroll
      lockedRef.current = false;
      body.style.overflow = '';
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.paddingRight = '';
      html.style.overflow = '';

      // Restaura a posição do scroll
      window.scrollTo(0, scrollPositionRef.current);
    }

    // Cleanup ao desmontar
    return () => {
      // Apenas limpa se ainda estava locked (componente desmontado enquanto modal aberto)
      if (lockedRef.current) {
        body.style.overflow = '';
        body.style.position = '';
        body.style.top = '';
        body.style.left = '';
        body.style.right = '';
        body.style.paddingRight = '';
        html.style.overflow = '';
        window.scrollTo(0, scrollPositionRef.current);
      }
    };
  }, [isLocked]);
}

/**
 * Hook alternativo que retorna funções de controle
 */
export function useBodyLockControls() {
  const scrollPositionRef = useRef<number>(0);
  const isLockedRef = useRef<boolean>(false);

  const lock = useCallback(() => {
    if (typeof window === 'undefined' || isLockedRef.current) return;

    const html = document.documentElement;
    const body = document.body;

    scrollPositionRef.current = window.scrollY;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollPositionRef.current}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.paddingRight = `${scrollbarWidth}px`;
    html.style.overflow = 'hidden';

    isLockedRef.current = true;
  }, []);

  const unlock = useCallback(() => {
    if (typeof window === 'undefined' || !isLockedRef.current) return;

    const html = document.documentElement;
    const body = document.body;

    body.style.overflow = '';
    body.style.position = '';
    body.style.top = '';
    body.style.left = '';
    body.style.right = '';
    body.style.paddingRight = '';
    html.style.overflow = '';

    window.scrollTo(0, scrollPositionRef.current);
    isLockedRef.current = false;
  }, []);

  const toggle = useCallback(() => {
    if (isLockedRef.current) {
      unlock();
    } else {
      lock();
    }
  }, [lock, unlock]);

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      if (isLockedRef.current) {
        const body = document.body;
        const html = document.documentElement;

        body.style.overflow = '';
        body.style.position = '';
        body.style.top = '';
        body.style.left = '';
        body.style.right = '';
        body.style.paddingRight = '';
        html.style.overflow = '';
      }
    };
  }, []);

  return { lock, unlock, toggle, isLocked: isLockedRef.current };
}

export default useBodyLock;
