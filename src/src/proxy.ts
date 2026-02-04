import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from './lib/supabase/middleware';

const IS_PROD = process.env.NODE_ENV === 'production';

const buildContentSecurityPolicy = () => {
  const connectSrc = [
    "'self'",
    'https://*.supabase.co',
    'https://*.firebaseio.com',
    'https://dl.polyhaven.org',
    'https://raw.githack.com', // Para assets do drei/three.js
    'https://www.gstatic.com', // Para DRACO decoder
    'https://raw.githubusercontent.com', // Para assets do drei/three.js
  ];
  const scriptSrc = ["'self'"];
  const fontSrc = [
    "'self'",
    'data:',
    'https://*.supabase.co',
    'https://assets.codepen.io',
  ];
  const imgSrc = [
    "'self'",
    'https:',
    'data:',
    'https://raw.githack.com',
    'https://dl.polyhaven.org',
    'https://www.gstatic.com',
    'https://raw.githubusercontent.com',
  ];
  const mediaSrc = ["'self'", 'https:', 'data:', 'blob:'];

  // Em dev, liberar HMR/WebSocket e inline/eval para webpack
  if (!IS_PROD) {
    connectSrc.push('ws://localhost:3000', 'ws://127.0.0.1:3000');
    scriptSrc.push("'unsafe-eval'", "'unsafe-inline'");
  }

  const directives = [
    "default-src 'self' https: data: blob:",
    `script-src ${scriptSrc.join(' ')}`,
    "style-src 'self' 'unsafe-inline'",
    `img-src ${imgSrc.join(' ')}`,
    `font-src ${fontSrc.join(' ')}`,
    `media-src ${mediaSrc.join(' ')}`,
    `connect-src ${connectSrc.join(' ')}`,
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ];

  // Só força upgrade-insecure-requests em produção; em dev quebra http://localhost
  if (IS_PROD) {
    directives.push('upgrade-insecure-requests');
  }

  return directives.join('; ');
};

const securityHeaders = {
  get 'Content-Security-Policy'() {
    return buildContentSecurityPolicy();
  },
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
};

const cacheControlHtml =
  'public, max-age=0, s-maxage=300, stale-while-revalidate=600';

export async function proxy(request: NextRequest) {
  const res = await updateSession(request);

  // Se updateSession não retornar Response, cai para NextResponse.next()
  const response = res ? res : NextResponse.next();

  // Aplica headers de segurança e cache curto para HTML/SSR
  response.headers.set('Cache-Control', cacheControlHtml);
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  response.headers.delete('x-powered-by');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
