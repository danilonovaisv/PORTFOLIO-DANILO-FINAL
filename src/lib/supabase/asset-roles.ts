import { SITE_ASSET_KEYS } from '@/config/site-assets';

export type SiteAssetRole = {
  key: string;
  label: string;
  description: string;
  page: string;
  asset_type: 'image' | 'video' | 'file' | 'font';
  subPath?: string;
  sort_order?: number;
};

export type SiteAssetRoleGroup = {
  label: string;
  roles: SiteAssetRole[];
};

const globalLogos: SiteAssetRole[] = [
  {
    key: SITE_ASSET_KEYS.logos.headerLight,
    label: 'Header Logo (Light)',
    description: 'Light version of the header logo',
    page: 'global',
    asset_type: 'image',
    subPath: 'logos',
  },
  {
    key: SITE_ASSET_KEYS.logos.headerDark,
    label: 'Header Logo (Dark)',
    description: 'Dark version of the header logo',
    page: 'global',
    asset_type: 'image',
    subPath: 'logos',
  },
  {
    key: SITE_ASSET_KEYS.logos.faviconLight,
    label: 'Favicon (Light)',
    description: 'Light favicon used in browser tabs',
    page: 'global',
    asset_type: 'image',
    subPath: 'logos',
  },
  {
    key: SITE_ASSET_KEYS.logos.faviconDark,
    label: 'Favicon (Dark)',
    description: 'Dark favicon used in browser tabs',
    page: 'global',
    asset_type: 'image',
    subPath: 'logos',
  },
];

const globalFonts: SiteAssetRole[] = [
  {
    key: SITE_ASSET_KEYS.fonts.display,
    label: '--font-display',
    description: 'Main display font',
    page: 'global',
    asset_type: 'font',
    subPath: 'fonts',
  },
  {
    key: SITE_ASSET_KEYS.fonts.h1,
    label: '--font-h1',
    description: 'Font for h1 titles',
    page: 'global',
    asset_type: 'font',
    subPath: 'fonts',
  },
  {
    key: SITE_ASSET_KEYS.fonts.h2,
    label: '--font-h2',
    description: 'Font for h2 titles',
    page: 'global',
    asset_type: 'font',
    subPath: 'fonts',
  },
  {
    key: SITE_ASSET_KEYS.fonts.h3,
    label: '--font-h3',
    description: 'Font for h3 titles',
    page: 'global',
    asset_type: 'font',
    subPath: 'fonts',
  },
  {
    key: SITE_ASSET_KEYS.fonts.body,
    label: '--font-body',
    description: 'Main body font',
    page: 'global',
    asset_type: 'font',
    subPath: 'fonts',
  },
  {
    key: SITE_ASSET_KEYS.fonts.light,
    label: '--font-light',
    description: 'Auxiliary light font',
    page: 'global',
    asset_type: 'font',
    subPath: 'fonts',
  },
];

const clientStrips: SiteAssetRole[] = SITE_ASSET_KEYS.clients.strips.map(
  (key, index) => ({
    key,
    label: `Client Logo ${index + 1}`,
    description: 'Logo for the client strip',
    page: 'clients',
    asset_type: 'image',
    subPath: 'clients',
    sort_order: index + 1,
  })
);

const aboutHeroVideos: SiteAssetRole[] = [
  {
    key: SITE_ASSET_KEYS.heroVideos.aboutDesktop,
    label: 'About Hero Video (Desktop)',
    description: 'Main hero video for the About page (desktop)',
    page: 'about',
    asset_type: 'video',
    subPath: 'hero',
  },
  {
    key: SITE_ASSET_KEYS.heroVideos.aboutMobile,
    label: 'About Hero Video (Mobile)',
    description: 'Mobile version of the About hero video',
    page: 'about',
    asset_type: 'video',
    subPath: 'hero',
  },
];

const aboutOriginImages: SiteAssetRole[] =
  SITE_ASSET_KEYS.about.originImages.map((key, index) => ({
    key,
    label: `Origin Image ${index + 1}`,
    description: 'Image for the Origin section',
    page: 'about',
    asset_type: 'image',
    subPath: 'origin',
    sort_order: index + 1,
  }));

const aboutMethodVideo: SiteAssetRole = {
  key: SITE_ASSET_KEYS.heroVideos.method,
  label: 'Method Video',
  description: 'Video for the Method section',
  page: 'about',
  asset_type: 'video',
  subPath: 'method',
};

const aboutBeliefsAssets: SiteAssetRole[] = [
  {
    key: SITE_ASSET_KEYS.about.beliefs.ghostModel,
    label: 'Ghost Model (3D)',
    description: '3D GLB model displayed in the Beliefs section',
    page: 'about',
    asset_type: 'file',
    subPath: 'beliefs',
  },
  {
    key: SITE_ASSET_KEYS.about.beliefs.skillsVideo,
    label: 'Skills Video (Desktop)',
    description: 'Background video for the Beliefs section (high-res version)',
    page: 'about',
    asset_type: 'video',
    subPath: 'beliefs',
  },
  {
    key: SITE_ASSET_KEYS.about.beliefs.skillsVideoMobile,
    label: 'Skills Video (Mobile)',
    description:
      'Background video for the Beliefs section (optimized mobile version)',
    page: 'about',
    asset_type: 'video',
    subPath: 'beliefs',
  },
];

const aboutCurriculum: SiteAssetRole = {
  key: 'about.curriculum_pdf',
  label: 'Resume (PDF)',
  description: 'PDF used in the AboutClosing section',
  page: 'about',
  asset_type: 'file',
  subPath: 'curriculum',
};

const portfolioHeroVideos: SiteAssetRole[] = [
  {
    key: SITE_ASSET_KEYS.heroVideos.portfolioDesktop,
    label: 'Portfolio Hero Video (Desktop)',
    description: 'Main hero video for the Portfolio page (desktop)',
    page: 'portfolio',
    asset_type: 'video',
    subPath: 'hero',
  },
  {
    key: SITE_ASSET_KEYS.heroVideos.portfolioMobile,
    label: 'Portfolio Hero Video (Mobile)',
    description: 'Mobile version of the Portfolio hero video',
    page: 'portfolio',
    asset_type: 'video',
    subPath: 'hero',
  },
];

const homeHeroVideo: SiteAssetRole = {
  key: SITE_ASSET_KEYS.heroVideos.homeManifesto,
  label: 'Manifesto Video (Home)',
  description: 'Main hero video for the Home page',
  page: 'home',
  asset_type: 'video',
};

const projectAssets: SiteAssetRole[] = [
  // Campaign
  {
    key: SITE_ASSET_KEYS.projects.campaign.cover,
    label: 'Campaign • Cover',
    description: 'Cover image for the Campaign project',
    page: 'projects',
    asset_type: 'image',
    subPath: 'campaign',
  },
  {
    key: SITE_ASSET_KEYS.projects.campaign.hero,
    label: 'Campaign • Hero',
    description: 'Hero image for the Campaign project',
    page: 'projects',
    asset_type: 'image',
    subPath: 'campaign',
  },
  {
    key: SITE_ASSET_KEYS.projects.campaign.thumb,
    label: 'Campaign • Thumb',
    description: 'Thumbnail for the Campaign project',
    page: 'projects',
    asset_type: 'image',
    subPath: 'campaign',
  },
  // Key Vision
  {
    key: SITE_ASSET_KEYS.projects.keyVision.cover,
    label: 'Key Vision • Cover',
    description: 'Cover image for the Key Vision project',
    page: 'projects',
    asset_type: 'image',
    subPath: 'key-vision',
  },
  {
    key: SITE_ASSET_KEYS.projects.keyVision.hero,
    label: 'Key Vision • Hero',
    description: 'Hero image for the Key Vision project',
    page: 'projects',
    asset_type: 'image',
    subPath: 'key-vision',
  },
  {
    key: SITE_ASSET_KEYS.projects.keyVision.thumb,
    label: 'Key Vision • Thumb',
    description: 'Thumbnail for the Key Vision project',
    page: 'projects',
    asset_type: 'image',
    subPath: 'key-vision',
  },
  // Brand Video
  {
    key: SITE_ASSET_KEYS.projects.brandVideo.hero,
    label: 'Brand Video • Hero',
    description: 'Hero image for the Brand Video project',
    page: 'projects',
    asset_type: 'image',
    subPath: 'brand-video',
  },
  {
    key: SITE_ASSET_KEYS.projects.brandVideo.thumb,
    label: 'Brand Video • Thumb',
    description: 'Thumbnail video for the Brand Video project',
    page: 'projects',
    asset_type: 'video',
    subPath: 'brand-video',
  },
  // Advertising Video
  {
    key: SITE_ASSET_KEYS.projects.advertisingVideo.hero,
    label: 'Advertising Video • Hero',
    description: 'Hero image for the Advertising Video project',
    page: 'projects',
    asset_type: 'image',
    subPath: 'advertising-video',
  },
  {
    key: SITE_ASSET_KEYS.projects.advertisingVideo.thumb,
    label: 'Advertising Video • Thumb',
    description: 'Thumbnail for the Advertising Video project',
    page: 'projects',
    asset_type: 'image',
    subPath: 'advertising-video',
  },
  // Creative Direction
  {
    key: SITE_ASSET_KEYS.projects.creativeDirection.hero,
    label: 'Creative Direction • Hero',
    description: 'Hero image for the Creative Direction project',
    page: 'projects',
    asset_type: 'image',
    subPath: 'creative-direction',
  },
  {
    key: SITE_ASSET_KEYS.projects.creativeDirection.thumb,
    label: 'Creative Direction • Thumb',
    description: 'Thumbnail for the Creative Direction project',
    page: 'projects',
    asset_type: 'image',
    subPath: 'creative-direction',
  },
];

export const siteAssetRoleGroups: SiteAssetRoleGroup[] = [
  { label: 'Global • Logos', roles: globalLogos },
  { label: 'Global • Fonts', roles: globalFonts },
  { label: 'Home • Hero', roles: [homeHeroVideo] },
  { label: 'Clients • Logos', roles: clientStrips },
  { label: 'About • Hero Videos', roles: aboutHeroVideos },
  { label: 'About • Origin', roles: aboutOriginImages },
  {
    label: 'About • Method & Resume',
    roles: [aboutMethodVideo, aboutCurriculum],
  },
  { label: 'About • Beliefs', roles: aboutBeliefsAssets },
  { label: 'Portfolio • Hero Videos', roles: portfolioHeroVideos },
  { label: 'Portfolio • Projects', roles: projectAssets },
];

const allSiteAssetRoles = siteAssetRoleGroups.flatMap((group) => group.roles);

export const siteAssetRoleMap = new Map(
  allSiteAssetRoles.map((role) => [role.key, role])
) as ReadonlyMap<string, SiteAssetRole>;

export function getSiteAssetRoleByKey(key: string) {
  return siteAssetRoleMap.get(key);
}
