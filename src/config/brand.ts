export const BRAND = {
  name: 'Danilo Novais',
  domain: 'portfoliodanilo.com',

  // Design Tokens
  colors: {
    primary: '#0048ff', // Primary brand color, interactive elements, CTAs
    accent: '#4fe6ff', // Secondary highlights, Ghost atmosphere glow
    background: '#040013', // Main dark background
    backgroundLight: '#f0f0f0', // Light sections (forms, alternating backgrounds)
    text: '#fcffff', // Primary text on dark backgrounds
    textInverse: '#0e0e0e', // Text on light backgrounds
    textSecondary: '#a1a3a3', // Secondary information, metadata
    neutral: '#0b0d3a', // Gradient transitions, subtle backgrounds
    neutralLight: '#F5F5F5', // Secondary section backgrounds
    purpleDetails: '#8705f2', // para pequenos detalhes
    pinkDetails: '#f501d3', // para pequenos detalhes
    textEmphasis: '#2E85F2', // Palavras destacadas no meio do texto
    textHighlight: '#4fe6ff', // Destaques curtos, intros breves
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
