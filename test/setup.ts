/**
 * Setup de testes global
 * Configura mocks necessários para o ambiente de testes
 */
import '@testing-library/jest-dom';

// Provide safe defaults for tests so Supabase helpers don't throw on missing env
process.env.NEXT_PUBLIC_SUPABASE_URL ??= 'https://test-project.supabase.co';
process.env.SUPABASE_URL ??= process.env.NEXT_PUBLIC_SUPABASE_URL;
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??= 'test-anon-key-placeholder';
process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ??=
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Mock window.matchMedia (não disponível no jsdom por padrão)
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any;
