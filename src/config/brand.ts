export const BRAND = {
  name: 'Danilo Novais',
  domain: 'portfoliodanilo.com',

  // Paleta de Cores (Design System 2.1)
  colors: {
    bluePrimary: '#0048ff', // CTAs, links, interativos
    blueAccent: '#4fe6ff', // Destaques secundários, brilhos
    purpleDetails: '#8705f2', // Pequenos detalhes
    pinkDetails: '#f501d3', // Ênfases pontuais

    background: '#040013', // Fundo Principal - Deep Void
    backgroundLight: '#f0f0f0', // Seções claras

    text: '#fcffff', // Texto Principal (dark mode)
    textInverse: '#0e0e0e', // Texto em fundos claros
    textEmphasis: '#2E85F2', // Palavras destacadas
    textHighlight: '#4fe6ff', // Destaques curtos
    textSecondary: '#a1a3a3', // Infos secundárias

    neutral: '#0b0d3a', // Gradientes sutis
    neutralLight: '#F5F5F5', // Fundos secundários

    // Aliases para compatibilidade TypeScript
    primary: '#0048ff',
    accent: '#4fe6ff',
  },

  // Assets Globais (2.6 Global Assets)
  assets: {
    logos: {
      favicon:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/Faivcon.svg',
      faviconLight:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/FaivconLight.svg',
      logoLight:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoLight.svg',
      logoDark:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoDark.svg',
    },
    video: {
      manifesto:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4',
    },
    fonts: {
      primary: 'TT Norms Pro',
      mono: 'PPSupplyMono',
    },
  },

  // Aliases for compatibility
  get primary() {
    return this.colors.bluePrimary;
  },
  get accent() {
    return this.colors.blueAccent;
  },

  layout: {
    container: 'w-full max-w-[1200px] px-6 md:px-8 mx-auto',
  },

  get logos() {
    return this.assets.logos;
  },
  get video() {
    return this.assets.video;
  },
  get typography() {
    return this.assets.fonts;
  },
};

// Colors aliases need to be part of colors object or we update usages.
// Updating colors object:
Object.assign(BRAND.colors, {
  primary: BRAND.colors.bluePrimary,
  accent: BRAND.colors.blueAccent,
});
