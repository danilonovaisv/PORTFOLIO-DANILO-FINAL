export const BRAND = {
  name: "Danilo Novais",
  domain: "portfoliodanilo.com",
  
  // Design Tokens
  colors: {
    primary: "#0057FF",      // Destaque e interação
    bg: "#f0f0f0",           // Fundo padrão neutro
    text: "#000000",         // Texto padrão
    textInverse: "#FFFFFF",  // Texto sobre fundo escuro
    neutralLight: "#F5F5F5", // Fundo secundário
  },
  
  typography: {
    primary: "TT Norms Pro",
    fallbacks: ["ui-sans-serif", "system-ui"],
  },

  // Assets Globais
  logos: {
    // Para fundo claro
    light: "https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoLight.svg",
    // Para fundo escuro
    dark: "https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoDark.svg",
    
    favicon: "https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/Favicon.svg",
    faviconLight: "https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/FaviconLight.svg",
  },

  video: {
    // Usado na Hero e Manifesto (mesma URL para cache)
    manifesto: "https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4",
  }
};
