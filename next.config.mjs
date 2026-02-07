/** @type {import('next').NextConfig} */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import withBundleAnalyzer from '@next/bundle-analyzer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_SUPABASE_HOST = 'umkmwbkwvulxtdodzmzf.supabase.co';

const buildSupabaseHosts = () => {
  const mainUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    process.env.NEXT_PUBLIC_SUPABASE_FALLBACK_URL ??
    `https://${DEFAULT_SUPABASE_HOST}`;

  let primaryHost = DEFAULT_SUPABASE_HOST;
  try {
    primaryHost = new URL(mainUrl).host;
  } catch {
    primaryHost = DEFAULT_SUPABASE_HOST;
  }
  const extraHosts = (process.env.NEXT_PUBLIC_SUPABASE_IMAGE_HOSTS ?? '')
    .split(',')
    .map((h) => h.trim())
    .filter(Boolean);

  return Array.from(new Set([primaryHost, ...extraHosts]));
};

const supabaseHosts = buildSupabaseHosts().join(' ');

// Adicionando hosts adicionais para assets do drei/three.js
const supabaseAndExternalHosts = `${supabaseHosts} https://raw.githack.com https://dl.polyhaven.org https://www.gstatic.com https://raw.githubusercontent.com`;

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:;
    worker-src 'self' blob:;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: ${supabaseAndExternalHosts} https://grainy-gradients.vercel.app;
    font-src 'self' https://assets.codepen.io ${supabaseHosts};
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    connect-src 'self' ${supabaseAndExternalHosts} https://*.supabase.co wss://*.supabase.co https://*.firebaseio.com https://dl.polyhaven.org ws://localhost:3000 ws://127.0.0.1:3000;
    media-src 'self' blob: data: ${supabaseAndExternalHosts} https://*.supabase.co;
`
  .replace(/\s{2,}/g, ' ')
  .trim();

const nextConfig = {
  /**
   * Mantém exatamente como você já tinha
   */
  output: 'standalone',
  reactStrictMode: true,

  // Removido experimental.turbopack pois causa warning
  experimental: {
    serverActions: {
      bodySizeLimit: '32mb',
      allowedOrigins: [
        'https://portfoliodanilo.com',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
      ],
    },
  },

  devIndicators: {
    allowedDevOrigins: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/portfolio/key_vision',
        destination: '/portfolio/key-vision',
        permanent: true,
      },
      {
        source: '/portfolio/brand_video',
        destination: '/portfolio/brand-video',
        permanent: true,
      },
    ];
  },

  /**
   * Configuração de imagens (Supabase)
   * Mantida INTACTA
   */
  images: {
    // Hosts dinâmicos com base na URL do Supabase configurada no ambiente
    remotePatterns: buildSupabaseHosts().flatMap((hostname) => [
      {
        protocol: 'https',
        hostname,
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname,
        port: '',
        pathname: '/storage/v1/render/image/public/**',
      },
    ]),

    dangerouslyAllowSVG: true,
    // contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // Movido para headers globais
  },
};

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default bundleAnalyzer(nextConfig);
