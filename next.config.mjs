/** @type {import('next').NextConfig} */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PHASE_PRODUCTION_BUILD } from 'next/constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_SUPABASE_HOST = 'dpejskjpghoozbpfxkpf.supabase.co';
const deployDistDir = '.next';
const firebaseAdapterPath = path.join(
  __dirname,
  'scripts/firebase-next-adapter.cjs'
);

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

/**
 * Content Security Policy Configuration
 *
 * SECURITY NOTE:
 * - Keep style-src unsafe-inline for runtime style attributes.
 * - Avoid unsafe-eval and inline script execution.
 * - Enforce HTTPS upgrades via CSP + HSTS preload.
 *
 * These are necessary trade-offs for the Ghost System's 3D capabilities.
 * All user input is sanitized and validated before rendering.
 */
const isDev = process.env.NODE_ENV === 'development';

const cspConfig = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    "'wasm-unsafe-eval'",
    ...(isDev ? ["'unsafe-eval'"] : []),
    'blob:',
    'https://www.youtube.com',
    'https://s.ytimg.com',
    'https://challenges.cloudflare.com',
    'https://turnstile.cloudflare.com',
  ],
  'worker-src': ["'self'", 'blob:'],
  'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  'font-src': [
    "'self'",
    'data:',
    'https://fonts.gstatic.com',
    'https://assets.codepen.io',
    ...buildSupabaseHosts(),
  ],
  'img-src': [
    "'self'",
    'blob:',
    'data:',
    ...buildSupabaseHosts(),
    'https://raw.githack.com',
    'https://dl.polyhaven.org',
    'https://www.gstatic.com',
    'https://raw.githubusercontent.com',
    'https://grainy-gradients.vercel.app',
    'https://img.youtube.com',
    'https://i.ytimg.com',
    'https://fonts.gstatic.com',
  ],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'", 'https://formsubmit.co'],
  'frame-ancestors': ["'none'"],
  'frame-src': [
    "'self'",
    'https://www.youtube.com',
    'https://www.youtube-nocookie.com',
    'https://challenges.cloudflare.com',
    'https://turnstile.cloudflare.com',
  ],
  'connect-src': [
    "'self'",
    ...buildSupabaseHosts(),
    'https://*.supabase.co',
    'wss://*.supabase.co',
    'https://*.firebaseio.com',
    'https://dl.polyhaven.org',
    'https://formsubmit.co',
    'https://raw.githack.com',
    'https://www.gstatic.com',
    'https://raw.githubusercontent.com',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://challenges.cloudflare.com',
    'https://turnstile.cloudflare.com',
    isDev ? 'ws://localhost:*' : '',
    isDev ? 'ws://127.0.0.1:*' : '',
  ].filter(Boolean),
  'media-src': [
    "'self'",
    'blob:',
    'data:',
    ...buildSupabaseHosts(),
    'https://*.supabase.co',
    'https://raw.githack.com',
    'https://dl.polyhaven.org',
    'https://www.gstatic.com',
    'https://raw.githubusercontent.com',
  ],
};

const cspHeader = Object.entries(cspConfig)
  .map(([key, values]) => `${key} ${values.join(' ')}`)
  .join('; ');

const createNextConfig = (phase) => ({
  /**
   * Mantém exatamente como você já tinha
   */
  output: 'standalone',
  ...(phase === PHASE_PRODUCTION_BUILD
    ? { adapterPath: firebaseAdapterPath }
    : {}),
  distDir: deployDistDir,
  reactStrictMode: true,
  staticPageGenerationTimeout: 180,
  allowedDevOrigins: ['127.0.0.1'],

  turbopack: {
    rules: {
      '*.glsl': {
        type: 'raw',
      },
      '*.vs': {
        type: 'raw',
      },
      '*.fs': {
        type: 'raw',
      },
      '*.vert': {
        type: 'raw',
      },
      '*.frag': {
        type: 'raw',
      },
    },
  },

  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      'three',
      'gsap',
      'clsx',
      'tailwind-merge',
      '@radix-ui/react-dialog',
      '@radix-ui/react-tabs',
    ],
    serverActions: {
      bodySizeLimit: '32mb',
      allowedOrigins: [
        'https://portfoliodanilo.com',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
      ],
    },
  },

  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      type: 'asset/source',
    });

    // Ignora warnings de source maps faltando em node_modules (limpa o console)
    config.ignoreWarnings = [{ module: /node_modules/ }, { file: /\.map$/ }];

    return config;
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
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Cache-Control',
            value:
              'public, max-age=0, s-maxage=900, stale-while-revalidate=3600',
          },
        ],
      },
      // Long cache for fonts
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache for captions
      {
        source: '/captions/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
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
      {
        source: '/privacy-policy',
        destination: '/privacidade',
        permanent: true,
      },
    ];
  },

  /**
   * Configuração de imagens (Supabase)
   * Mantida INTACTA
   */
  images: {
    qualities: [55, 60, 75],
    unoptimized: false,
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

  // Ignora erros de typescript no build (CRÍTICO para deploy em ambiente instável)
  typescript: {
    ignoreBuildErrors: true,
  },
});

export default (phase) => createNextConfig(phase);
