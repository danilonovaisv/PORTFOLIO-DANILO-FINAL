/** @type {import('next').NextConfig} */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import withBundleAnalyzer from '@next/bundle-analyzer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

  /**
   * Configuração de imagens (Supabase)
   * Mantida INTACTA
   */
  images: {
    // Configuração mantida para permitir imagens do Supabase
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'umkmwbkwvulxtdodzmzf.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'umkmwbkwvulxtdodzmzf.supabase.co',
        port: '',
        pathname: '/storage/v1/render/image/public/**',
      },
    ],

    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default bundleAnalyzer(nextConfig);
