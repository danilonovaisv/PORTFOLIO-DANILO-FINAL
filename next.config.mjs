/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aymuvxysygrwoicsjgxj.supabase.co',
      },
    ],
  },
};

export default nextConfig;
