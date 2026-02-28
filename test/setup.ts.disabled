import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Mock do ResizeObserver que não existe no JSDOM
vi.stubGlobal('ResizeObserver', class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
});

// Mock do IntersectionObserver
vi.stubGlobal('IntersectionObserver', class IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  
  constructor(public callback: IntersectionObserverCallback, public options?: IntersectionObserverInit) {}
  
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] { return []; }
});

// Mock para window.scrollTo
window.scrollTo = vi.fn();