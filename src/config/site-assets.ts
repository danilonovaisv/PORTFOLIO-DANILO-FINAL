import { BRAND } from '@/config/brand';
import { PORTFOLIO_CONTENT } from '@/config/content';

export type SiteAssetDefinition = {
  key: string;
  label: string;
  description?: string;
  page: string;
  category: 'logo' | 'font' | 'video' | 'image' | 'client' | 'misc';
};

export const SITE_ASSET_KEYS = {
  logos: {
    headerLight: 'global.logos.global.logo_header_light',
    headerDark: 'global.logos.global.logo_header_dark',
    faviconLight: 'global.logos.global.favicon_light',
    faviconDark: 'global.logos.global.favicon_dark',
  },
  fonts: {
    display: 'global.fonts.global.font_display',
    h1: 'global.fonts.global.font_h1',
    h2: 'global.fonts.global.font_h2',
    h3: 'global.fonts.global.font_h3',
    body: 'global.fonts.global.font_body',
    light: 'global.fonts.global.font_light',
  },
  heroVideos: {
    homeManifesto: 'home.video.manifesto.desk',
    homeManifestoMobile: 'home.video.manifesto.mobile',
    homeManifestoPosterDesk: 'home.manifesto_poster_desk',
    homeManifestoPosterMobile: 'home.manifesto_poster_mobile',
    aboutDesktop: 'about.hero.about.hero.desktop_video',
    aboutMobile: 'about.hero.about.hero.mobile_video',
    portfolioDesktop: 'portfolio.hero.portfolio.hero_desktop_video',
    portfolioMobile: 'portfolio.hero.portfolio.hero_mobile_video',
    method: 'about.method.about.method.desktop_video',
  },
  about: {
    originImages: [
      'about.origin.about.origin_image.1',
      'about.origin.about.origin_image.2',
      'about.origin.about.origin_image.3',
      'about.origin.about.origin_image.4',
    ],
    methodDesktop: 'about.method.about.method.desktop_video',
    methodMobile: 'about.method.about.method.mobile_video',
    beliefs: {
      ghostModel: 'about.beliefs.ghost',
      skillsVideo: 'about.beliefs.VIDEO-SKILLS-FINAL_compressed.mp4',
      skillsVideoMobile: 'about.beliefs.VIDEO-SKILLS-MOBILE-FINAL.mp4',
    },
    closingDesktop: 'about.Closing.video.closing.desk',
    closingMobile: 'about.Closing.video.closing.mobile',
  },
  projects: {
    campaign: {
      cover: 'projects.campaign.cover.webp',
      hero: 'projects.campaign.hero.webp',
      thumb: 'projects.campaign.thumb.webp',
    },
    keyVision: {
      cover: 'projects.key-visual.cover.webp',
      hero: 'projects.key_vision.hero.webp',
      thumb: 'projects.key_vision.thumb.webp',
    },
    brandVideo: {
      hero: 'projects.brand_video.hero.png',
      thumb: 'projects.brand_video.thumb.mp4',
    },
    advertisingVideo: {
      hero: 'projects.advertising_video.hero.png',
      thumb: 'projects.advertising_video.thumb.png',
    },
    creativeDirection: {
      hero: 'projects.creative-direction.hero.webp',
      thumb: 'projects.creative-direction.thumb.webp',
    },
  },
  portfolio: {
    heroDesktop: 'portfolio.hero.portfolio.hero_desktop_video',
    heroMobile: 'portfolio.hero.portfolio.hero_mobile_video',
  },
  portfolioShowcase: {
    brandCampaigns: 'home/showcase/Branding-Project.webp',
    videosMotions: 'home/showcase/show.video.mp4',
    websitesTech: 'home/showcase/Key-Visual.webp',
  },
  clients: {
    strips: Array.from(
      { length: 12 },
      (_, i) => `clients.clients.strip.${i + 1}`
    ),
  },
} as const;

export const SITE_ASSET_PRELOADS = {
  homeHero: {
    videos: [BRAND.assets.video.manifesto, BRAND.assets.video.manifestoMobile],
    posters: [
      BRAND.assets.video.manifestoPosterDesk,
      BRAND.assets.video.manifestoPosterMobile,
    ],
    keys: [
      SITE_ASSET_KEYS.heroVideos.homeManifesto,
      SITE_ASSET_KEYS.heroVideos.homeManifestoMobile,
      SITE_ASSET_KEYS.heroVideos.homeManifestoPosterDesk,
      SITE_ASSET_KEYS.heroVideos.homeManifestoPosterMobile,
    ],
  },
  portfolioHero: {
    videos: [
      PORTFOLIO_CONTENT.hero.video.desktop,
      PORTFOLIO_CONTENT.hero.video.mobile,
    ],
    keys: [
      SITE_ASSET_KEYS.portfolio.heroDesktop,
      SITE_ASSET_KEYS.portfolio.heroMobile,
    ],
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
    label: 'Vídeo manifesto (desktop)',
    page: 'home',
    category: 'video',
  },
  {
    key: SITE_ASSET_KEYS.heroVideos.homeManifestoMobile,
    label: 'Vídeo manifesto (mobile)',
    page: 'home',
    category: 'video',
  },
  {
    key: SITE_ASSET_KEYS.heroVideos.homeManifestoPosterDesk,
    label: 'Poster vídeo manifesto (desktop)',
    page: 'home',
    category: 'image',
  },
  {
    key: SITE_ASSET_KEYS.heroVideos.homeManifestoPosterMobile,
    label: 'Poster vídeo manifesto (mobile)',
    page: 'home',
    category: 'image',
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
  {
    key: SITE_ASSET_KEYS.about.closingDesktop,
    label: 'Vídeo fechamento Sobre (desktop)',
    page: 'about',
    category: 'video',
  },
  {
    key: SITE_ASSET_KEYS.about.closingMobile,
    label: 'Vídeo fechamento Sobre (mobile)',
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
