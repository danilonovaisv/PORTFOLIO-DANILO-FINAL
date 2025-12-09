/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // any needed experimental flags
  },
  allowedDevOrigins: ['http://192.168.0.5:3000'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aymuvxysygrwoicsjgxj.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
