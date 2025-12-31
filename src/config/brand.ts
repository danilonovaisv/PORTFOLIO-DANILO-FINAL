export const BRAND = {
  name: 'Danilo Novais',
  domain: 'portfoliodanilo.com',

  // Design Tokens
  colors: {
    primary: '#0057ff', // Ghost Blue — destaque e interação
    bg: '#000022', // Fundo padrão (Surface Main)
    text: '#fcffff', // Texto padrão (Text Main)
    textInverse: '#0e0e0e',
    ghostVoid: '#000022', // Profundidade Ghost
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
