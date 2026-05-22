// =============================================================================
// useBodyLock Hook - Ghost Era v2.0
// Bloqueia o scroll do body quando modal está aberto
// =============================================================================

'use client';

import { useEffect, useRef } from 'react';

type BodyLockSnapshot = {
  bodyOverflow: string;
  bodyPosition: string;
  bodyTop: string;
  bodyLeft: string;
  bodyRight: string;
  bodyPaddingRight: string;
  htmlOverflow: string;
};

let activeBodyLocks = 0;
let lockedScrollY = 0;
let snapshot: BodyLockSnapshot | null = null;

function applyBodyLock() {
  if (typeof window === 'undefined') return;

  const html = document.documentElement;
  const body = document.body;

  if (activeBodyLocks === 0) {
    lockedScrollY = window.scrollY;
    snapshot = {
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyPaddingRight: body.style.paddingRight,
      htmlOverflow: html.style.overflow,
    };

    const scrollbarWidth = window.innerWidth - html.clientWidth;

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${lockedScrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.paddingRight = `${Math.max(0, scrollbarWidth)}px`;
    html.style.overflow = 'hidden';
  }

  activeBodyLocks += 1;
}

function releaseBodyLock() {
  if (typeof window === 'undefined' || activeBodyLocks === 0) return;

  activeBodyLocks -= 1;

  if (activeBodyLocks > 0) return;

  const html = document.documentElement;
  const body = document.body;

  body.style.overflow = snapshot?.bodyOverflow ?? '';
  body.style.position = snapshot?.bodyPosition ?? '';
  body.style.top = snapshot?.bodyTop ?? '';
  body.style.left = snapshot?.bodyLeft ?? '';
  body.style.right = snapshot?.bodyRight ?? '';
  body.style.paddingRight = snapshot?.bodyPaddingRight ?? '';
  html.style.overflow = snapshot?.htmlOverflow ?? '';

  window.scrollTo(0, lockedScrollY);
  snapshot = null;
}

/**
 * Hook para bloquear scroll do body
 * Usado principalmente em modais para evitar scroll indesejado
 */
export function useBodyLock(isLocked: boolean): void {
  const appliedRef = useRef(false);

  useEffect(() => {
    if (isLocked) {
      if (!appliedRef.current) {
        applyBodyLock();
        appliedRef.current = true;
      }
    } else if (appliedRef.current) {
      releaseBodyLock();
      appliedRef.current = false;
    }

    return () => {
      if (appliedRef.current) {
        releaseBodyLock();
        appliedRef.current = false;
      }
    };
  }, [isLocked]);
}
