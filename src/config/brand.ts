export const BRAND = {
  name: 'Danilo Novais',
  domain: 'portfoliodanilo.com',

  // Design Tokens (Palette 2.1)
  colors: {
    bluePrimary: '#0048ff', // Cor primária, CTAs, links
    blueAccent: '#4fe6ff', // Destaques secundários, brilhos Ghost
    purpleDetails: '#8705f2', // Pequenos detalhes
    pinkDetails: '#f501d3', // Ênfases pontuais

    background: '#040013', // Fundo escuro principal
    backgroundLight: '#f0f0f0', // Seções claras (forms)

    text: '#fcffff', // Texto principal (Dark Mode)
    textInverse: '#0e0e0e', // Texto em fundos claros
    textEmphasis: '#2E85F2', // Palavras destacadas
    textHighlight: '#4fe6ff', // Destaques curtos
    textSecondary: '#a1a3a3', // Metadata

    neutral: '#0b0d3a', // Gradientes, fundos sutis
    neutralLight: '#F5F5F5', // Fundos secundários claros
  },

  typography: {
    fontFamily: {
      primary: 'TT Norms Pro',
      mono: 'PPSupplyMono',
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    // Definições de peso para uso no Tailwind
    weights: {
      thin: 100,
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
      black: 900,
    },
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
