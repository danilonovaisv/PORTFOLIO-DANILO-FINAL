/** @type {import('next').NextConfig} */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import withBundleAnalyzer from '@next/bundle-analyzer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildSupabaseHosts = () => {
  // Fallback to known project URL if env var is missing (e.g. file lock issues)
  const mainUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://umkmwbkwvulxtdodzmzf.supabase.co';
  if (!mainUrl) return [];

  const primaryHost = new URL(mainUrl).host;
  const extraHosts = (process.env.NEXT_PUBLIC_SUPABASE_IMAGE_HOSTS ?? '')
    .split(',')
    .map((h) => h.trim())
    .filter(Boolean);

  // Fallback para o host atual do portfolio se não estiver no env
  const fallbackHost = 'umkmwbkwvulxtdodzmzf.supabase.co';
  const aymuHost = 'aymuvxysygrwoicsjgxj.supabase.co';

  return Array.from(
    new Set([primaryHost, fallbackHost, aymuHost, ...extraHosts])
  );
};

const supabaseHosts = buildSupabaseHosts().join(' ');

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: ${supabaseHosts};
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    connect-src 'self' ${supabaseHosts};
`.replace(/\s{2,}/g, ' ').trim();


const nextConfig = {
  /**
   * Mantém exatamente como você já tinha
   */
  reactStrictMode: true,

  // Removido output: 'standalone' pois impede o uso de middleware
  // O deployment no Firebase Hosting ou Vercel não precisa mais dessa configuração

  // Configurar turbopack para evitar warning sobre múltiplos lockfiles
  turbopack: {
    root: __dirname,
  },

  // Removido experimental.turbopack pois causa warning
  experimental: {
    // any needed experimental flags
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
        ],
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
