export const BRAND = {
  name: 'Danilo Novais',
  domain: 'portfoliodanilo.com',

  // Paleta de Cores (Design System 2.1)
  colors: {
    bluePrimary: '#0048ff', // CTAs, links, interativos
    blueAccent: '#4fe6ff', // Destaques secundários, brilhos
    purpleDetails: '#8705f2', // Pequenos detalhes
    pinkDetails: '#f501d3', // Ênfases pontuais

    background: '#040013', // Fundo escuro principal
    backgroundLight: '#f0f0f0', // Seções claras

    text: '#fcffff', // Texto principal (dark mode)
    textInverse: '#0e0e0e', // Texto em fundos claros
    textEmphasis: '#2E85F2', // Palavras destacadas
    textHighlight: '#4fe6ff', // Destaques curtos
    textSecondary: '#a1a3a3', // Infos secundárias

    neutral: '#0b0d3a', // Gradientes sutis
    neutralLight: '#F5F5F5', // Fundos secundários
    contactForeground: '#fcffff', // Texto e ícones da seção Contato
  },

  // Assets Globais (2.6 Global Assets)
  assets: {
    logos: {
      favicon:
        'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/logo_site/Favicon.svg',
      faviconLight:
        'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/logo_site/FaviconLight.svg',
      logoLight:
        'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/logo_site/LogoLight.svg',
      logoDark:
        'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/logo_site/LogoDark.svg',
    },
    video: {
      manifesto:
        'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4',
    },
    fonts: {
      primary: 'TT Norms Pro',
      mono: 'PPSupplyMono',
    },
  },
  video: {
    manifesto:
      'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4',
  },

  // Leis de Layout (Absolute Laws)
  layout: {
    mobile: {
      stacking: 'vertical', // Todas as sessões com cards devem empilhar um abaixo do outro
      alignment: 'center',
    },
  },
};
