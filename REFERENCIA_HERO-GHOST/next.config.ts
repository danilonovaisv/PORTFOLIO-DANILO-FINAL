import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // If you later deploy via Firebase Hosting (frameworks integration),
  // keep output standalone so the server bundle is self-contained.
  output: "standalone",
  images: {
    remotePatterns: [
      // Supabase Storage public bucket (adjust to your project)
      { protocol: "https", hostname: "**.supabase.co" }
    ]
  }
};

export default nextConfig;
