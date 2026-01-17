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

  // Removendo a opção output: 'export' para permitir Server Actions
  // output: 'export',

  experimental: {
    // any needed experimental flags
  },

  /**
   * Configuração de imagens (Supabase)
   * Mantida INTACTA
   */
  images: {
    // Quando usando output: 'export', precisamos de um loader diferente
    unoptimized: true, // Isso permite usar as imagens diretamente sem otimização do Next

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
