import { BRAND } from '@/config/brand';
import { PORTFOLIO_CONTENT } from '@/config/content';

export const SITE_ASSET_KEYS = {
  logos: {
    headerLight: 'global.logo_header_light',
    headerDark: 'global.logo_header_dark',
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
      'about.origin_image.1',
      'about.origin_image.2',
      'about.origin_image.3',
      'about.origin_image.4',
    ],
    methodDesktop: 'about.method.about.method.desktop_video',
    methodMobile: 'about.method.about.method.mobile_video',
    beliefs: {
      ghostModel: '3d.ghost-v1',
      skillsVideo: 'about.beliefs.VIDEO-SKILLS-FINAL_compressed.mp4',
      skillsVideoMobile: 'about.beliefs.VIDEO-SKILLS-MOBILE-FINAL.mp4',
    },
    closingDesktop: 'video.closing.desk',
    closingMobile: 'video.closing.mobile',
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
