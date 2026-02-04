import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(_req: NextRequest) {
  const res = NextResponse.next();

  // Cache de HTML/SSR curto para evitar stale longo em edge
  res.headers.set(
    'Cache-Control',
    'public, max-age=0, s-maxage=300, stale-while-revalidate=600'
  );

  // Security headers
  res.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' https: data:",
      "font-src 'self' data:",
      "connect-src 'self' https://*.supabase.co https://*.firebaseio.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      'upgrade-insecure-requests',
    ].join('; ')
  );
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('X-Frame-Options', 'DENY');

  // Oculta stack
  res.headers.delete('x-powered-by');

  return res;
}

// Evita aplicar em assets estáticos
// Desativado porque o projeto já usa src/proxy.ts (Next middleware proxy pattern)
// Mantemos o código acima para referência; se reativar, cuidar do conflito com proxy.ts
export const config = undefined;
