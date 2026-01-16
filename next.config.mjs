/** @type {import('next').NextConfig} */
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  /**
   * Mantém exatamente como você já tinha
   */
  reactStrictMode: true,

  // output: 'standalone',
  experimental: {
    // any needed experimental flags
  },

  /**
   * Configuração de imagens (Supabase)
   * Mantida INTACTA
   */
  images: {
    // Firebase Hosting/App Hosting não está servindo a rota /_next/image;
    // Utilizamos um loader customizado para usar as transformações de imagem do Supabase.
    loader: 'custom',
    loaderFile: './supabase-image-loader.js',

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aymuvxysygrwoicsjgxj.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'aymuvxysygrwoicsjgxj.supabase.co',
        port: '',
        pathname: '/storage/v1/render/image/public/**',
      },
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

export default nextConfig;
