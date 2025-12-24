/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // any needed experimental flags
  },
  allowedDevOrigins: ['http://192.168.0.14:3000'],
  images: {
    // Firebase Hosting/App Hosting não está servindo a rota /_next/image;
    // Utilizamos um loader customizado para usar as transformações de imagem do Supabase.
    // unoptimized: true, // Removido para permitir otimização via loader
    loader: 'custom',
    loaderFile: 'src/lib/supabase/image-loader.ts',
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
        pathname: '/storage/v1/render/image/public/**', // Permitir URL de renderização também
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
