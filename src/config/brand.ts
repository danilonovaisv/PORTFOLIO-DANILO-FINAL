export const BRAND = {
  name: 'Danilo Novais',
  domain: 'portfoliodanilo.com',

  // Design Tokens (Ghost Era)
  colors: {
    primary: '#0057ff', // Ghost Blue — destaque e interação
    bg: '#050511', // Fundo padrão (Deep Void Surface)
    bgAbyss: '#06071f', // Atmospheric Blue Abyss (gradientes)
    text: '#fcffff', // Texto padrão (Text Main)
    textInverse: '#0e0e0e',
    ghostVoid: '#050511', // Profundidade Ghost (Canvas/Hero)
    ghostAbyss: '#06071f', // Atmosfera Ghost (gradientes)
    neutralLight: '#F5F5F5', // Fundo secundário suave
  },

  typography: {
    primary: 'TT Norms Pro',
    fallbacks: ['ui-sans-serif', 'system-ui'],
  },

  // Assets Globais
  logos: {
    // Para fundo claro
    light:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoLight.svg',
    // Para fundo escuro
    dark: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoDark.svg',

    favicon:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/Favicon.svg',
    faviconLight:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/FaviconLight.svg',
  },

  video: {
    // Usado na Hero e Manifesto (mesma URL para cache)
    manifesto:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4',
  },
};
