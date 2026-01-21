export type SiteAssetDefinition = {
  key: string;
  label: string;
  description?: string;
  page: string;
  category: 'logo' | 'font' | 'video' | 'image' | 'client' | 'misc';
};

export const SITE_ASSET_KEYS = {
  logos: {
    headerLight: 'global.logo_header_light',
    headerDark: 'global.logo_header_dark',
    faviconLight: 'global.favicon_light',
    faviconDark: 'global.favicon_dark',
  },
  fonts: {
    display: 'global.font_display',
    h1: 'global.font_h1',
    h2: 'global.font_h2',
    h3: 'global.font_h3',
    body: 'global.font_body',
    light: 'global.font_light',
  },
  heroVideos: {
    homeManifesto: 'home.manifesto_video',
    aboutDesktop: 'about.hero.about.hero.desktop_video.mp4',
    aboutMobile: 'about.hero.about.hero.mobile_video.mp4',
    portfolioDesktop: 'portfolio.hero_desktop_video',
    portfolioMobile: 'portfolio.hero_mobile_video',
    method: 'about.method_video',
  },
  about: {
    originImages: [
      'about.origin_image.1',
      'about.origin_image.2',
      'about.origin_image.3',
      'about.origin_image.4',
    ],
    methodDesktop: 'about.method_video',
    methodMobile: 'about.method_video',
  },
  portfolio: {
    heroDesktop: 'portfolio.hero_video.desktop',
    heroMobile: 'portfolio.hero_video.mobile',
  },
  clients: {
    strips: Array.from({ length: 12 }, (_, i) => `clients.strip.${i + 1}`),
  },
} as const;

const fontDefinitions: SiteAssetDefinition[] = Object.entries(
  SITE_ASSET_KEYS.fonts
).map(([name, key]) => ({
  key,
  label: `Fonte ${name}`,
  page: 'global',
  category: 'font',
}));

const originImages: SiteAssetDefinition[] =
  SITE_ASSET_KEYS.about.originImages.map((key, index) => ({
    key,
    label: `Origem imagem ${index + 1}`,
    page: 'about',
    category: 'image',
  }));

const clientLogos: SiteAssetDefinition[] = SITE_ASSET_KEYS.clients.strips.map(
  (key, index) => ({
    key,
    label: `Logo cliente ${index + 1}`,
    page: 'clients',
    category: 'client',
  })
);

export const SITE_ASSET_DEFINITIONS: SiteAssetDefinition[] = [
  {
    key: SITE_ASSET_KEYS.logos.headerLight,
    label: 'Logo header claro',
    page: 'global',
    category: 'logo',
  },
  {
    key: SITE_ASSET_KEYS.logos.headerDark,
    label: 'Logo header escuro',
    page: 'global',
    category: 'logo',
  },
  {
    key: SITE_ASSET_KEYS.logos.faviconLight,
    label: 'Favicon claro',
    page: 'global',
    category: 'logo',
  },
  {
    key: SITE_ASSET_KEYS.logos.faviconDark,
    label: 'Favicon escuro',
    page: 'global',
    category: 'logo',
  },
  ...fontDefinitions,
  {
    key: SITE_ASSET_KEYS.heroVideos.homeManifesto,
    label: 'Vídeo manifesto',
    page: 'home',
    category: 'video',
  },
  {
    key: SITE_ASSET_KEYS.heroVideos.aboutDesktop,
    label: 'Vídeo hero Sobre (desktop)',
    page: 'about',
    category: 'video',
  },
  {
    key: SITE_ASSET_KEYS.heroVideos.aboutMobile,
    label: 'Vídeo hero Sobre (mobile)',
    page: 'about',
    category: 'video',
  },
  {
    key: SITE_ASSET_KEYS.heroVideos.method,
    label: 'Vídeo método',
    page: 'about',
    category: 'video',
  },
  ...originImages,
  {
    key: SITE_ASSET_KEYS.portfolio.heroDesktop,
    label: 'Vídeo hero Portfólio (desktop)',
    page: 'portfolio',
    category: 'video',
  },
  {
    key: SITE_ASSET_KEYS.portfolio.heroMobile,
    label: 'Vídeo hero Portfólio (mobile)',
    page: 'portfolio',
    category: 'video',
  },
  ...clientLogos,
];
