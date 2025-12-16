// ../next.config.mjs
var nextConfig = {
  reactStrictMode: true,
  experimental: {
    // any needed experimental flags
  },
  allowedDevOrigins: ["http://192.168.0.14:3000"],
  images: {
    // Firebase Hosting/App Hosting não está servindo a rota /_next/image;
    // desabilitamos o otimizador para servir os assets diretamente das URLs remotas.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aymuvxysygrwoicsjgxj.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**"
      }
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  }
};
var next_config_default = nextConfig;
export {
  next_config_default as default
};
