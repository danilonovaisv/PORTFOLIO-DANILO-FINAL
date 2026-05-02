const SUPABASE_PROJECT_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  process.env.NEXT_PUBLIC_SUPABASE_FALLBACK_URL ??
  process.env.SUPABASE_URL ??
  '';

export const SUPABASE_STORAGE_URL = `${SUPABASE_PROJECT_URL.replace(
  /\/$/,
  ''
)}/storage/v1/object/public`;

const asset = (path: string) => {
  const cleanPath = path.replace(/^\/+/, '');
  // Force local path for assets in site-assets bucket to ensure 100% build integrity
  if (cleanPath.startsWith('site-assets/')) {
    return `/site.assets/${cleanPath.slice('site-assets/'.length)}`;
  }
  return `${SUPABASE_STORAGE_URL}/${cleanPath}`;
};

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
    textSecondary: '#fcffff', // Infos secundárias em superfícies escuras

    neutral: '#0b0d3a', // Gradientes sutis
    neutralLight: '#F5F5F5', // Fundos secundários
    contactForeground: '#fcffff', // Texto e ícones da seção Contato
  },

  // Assets Globais (2.6 Global Assets)
  assets: {
    logos: {
      favicon: asset('site-assets/global/logos/global.favicon_dark.svg'),
      faviconLight: asset('site-assets/global/logos/global.favicon_light.svg'),
      logoLight: asset('site-assets/global/logos/LogoLight.svg'),
      logoDark: asset('site-assets/global/logos/LogoDark.svg'),
    },
    video: {
      manifesto: asset('site-assets/home/video.manifesto.desk.mp4'),
      manifestoMobile: asset('site-assets/home/video.manifesto.mobile.mp4'),
      manifestoPosterDesk: asset('site-assets/global/404.webp'),
      manifestoPosterMobile: asset('site-assets/global/404.webp'),
      aboutClosing: asset('site-assets/about/closing/video.closing.desk.mp4'),
      aboutClosingMobile: asset(
        'site-assets/about/closing/video.closing.mobile.mp4'
      ),
    },
    fonts: {
      primary: 'Manrope',
      mono: 'PPSupplyMono',
    },
  },
  video: {
    manifesto: asset('site-assets/home/video.manifesto.desk.mp4'),
    manifestoMobile: asset('site-assets/home/video.manifesto.mobile.mp4'),
    manifestoPosterDesk: asset('site-assets/global/404.webp'),
    manifestoPosterMobile: asset('site-assets/global/404.webp'),
    aboutClosing: asset('site-assets/about/closing/video.closing.desk.mp4'),
    aboutClosingMobile: asset(
      'site-assets/about/closing/video.closing.mobile.mp4'
    ),
  },

  // Leis de Layout (Absolute Laws)
  layout: {
    mobile: {
      stacking: 'vertical', // Todas as sessões com cards devem empilhar um abaixo do outro
      alignment: 'center',
    },
  },
};
