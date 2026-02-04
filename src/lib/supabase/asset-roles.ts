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
    label: 'Logo header (claro)',
    description: 'Versão clara do logo do header',
    page: 'global',
    asset_type: 'image',
    subPath: 'logos',
  },
  {
    key: SITE_ASSET_KEYS.logos.headerDark,
    label: 'Logo header (escuro)',
    description: 'Versão escura do logo do header',
    page: 'global',
    asset_type: 'image',
    subPath: 'logos',
  },
  {
    key: SITE_ASSET_KEYS.logos.faviconLight,
    label: 'Favicon claro',
    description: 'Favicon claro utilizado na aba',
    page: 'global',
    asset_type: 'image',
    subPath: 'logos',
  },
  {
    key: SITE_ASSET_KEYS.logos.faviconDark,
    label: 'Favicon escuro',
    description: 'Favicon escuro utilizado na aba',
    page: 'global',
    asset_type: 'image',
    subPath: 'logos',
  },
];

const globalFonts: SiteAssetRole[] = [
  {
    key: SITE_ASSET_KEYS.fonts.display,
    label: '--font-display',
    description: 'Fonte principal de destaque',
    page: 'global',
    asset_type: 'font',
    subPath: 'fonts',
  },
  {
    key: SITE_ASSET_KEYS.fonts.h1,
    label: '--font-h1',
    description: 'Fonte dos títulos h1',
    page: 'global',
    asset_type: 'font',
    subPath: 'fonts',
  },
  {
    key: SITE_ASSET_KEYS.fonts.h2,
    label: '--font-h2',
    description: 'Fonte dos títulos h2',
    page: 'global',
    asset_type: 'font',
    subPath: 'fonts',
  },
  {
    key: SITE_ASSET_KEYS.fonts.h3,
    label: '--font-h3',
    description: 'Fonte dos títulos h3',
    page: 'global',
    asset_type: 'font',
    subPath: 'fonts',
  },
  {
    key: SITE_ASSET_KEYS.fonts.body,
    label: '--font-body',
    description: 'Fonte do corpo de texto',
    page: 'global',
    asset_type: 'font',
    subPath: 'fonts',
  },
  {
    key: SITE_ASSET_KEYS.fonts.light,
    label: '--font-light',
    description: 'Fonte auxiliar leve',
    page: 'global',
    asset_type: 'font',
    subPath: 'fonts',
  },
];

const clientStrips: SiteAssetRole[] = SITE_ASSET_KEYS.clients.strips.map(
  (key, index) => ({
    key,
    label: `Logo cliente ${index + 1}`,
    description: 'Logo para a faixa de clientes',
    page: 'clients',
    asset_type: 'image',
    subPath: 'clients',
    sort_order: index + 1,
  })
);

const aboutHeroVideos: SiteAssetRole[] = [
  {
    key: SITE_ASSET_KEYS.heroVideos.aboutDesktop,
    label: 'Vídeo hero Sobre (desktop)',
    description: 'Vídeo da hero da página Sobre (desktop)',
    page: 'about',
    asset_type: 'video',
    subPath: 'hero',
  },
  {
    key: SITE_ASSET_KEYS.heroVideos.aboutMobile,
    label: 'Vídeo hero Sobre (mobile)',
    description: 'Versão mobile da hero sobre',
    page: 'about',
    asset_type: 'video',
    subPath: 'hero',
  },
];

const aboutOriginImages: SiteAssetRole[] =
  SITE_ASSET_KEYS.about.originImages.map((key, index) => ({
    key,
    label: `Origem imagem ${index + 1}`,
    description: 'Imagem da seção Origem',
    page: 'about',
    asset_type: 'image',
    subPath: 'origin',
    sort_order: index + 1,
  }));

const aboutMethodVideo: SiteAssetRole = {
  key: SITE_ASSET_KEYS.heroVideos.method,
  label: 'Vídeo método',
  description: 'Vídeo da seção Método',
  page: 'about',
  asset_type: 'video',
  subPath: 'method',
};

const aboutBeliefsAssets: SiteAssetRole[] = [
  {
    key: SITE_ASSET_KEYS.about.beliefs.ghostModel,
    label: 'Ghost Model (3D)',
    description: 'Modelo 3D GLB exubido na seção Crenças',
    page: 'about',
    asset_type: 'file',
    subPath: 'beliefs',
  },
  {
    key: SITE_ASSET_KEYS.about.beliefs.skillsVideo,
    label: 'Vídeo Skills (Desktop)',
    description: 'Vídeo de background da seção Crenças (versão pesada)',
    page: 'about',
    asset_type: 'video',
    subPath: 'beliefs',
  },
  {
    key: SITE_ASSET_KEYS.about.beliefs.skillsVideoMobile,
    label: 'Vídeo Skills (Mobile)',
    description: 'Vídeo de background da seção Crenças (versão leve)',
    page: 'about',
    asset_type: 'video',
    subPath: 'beliefs',
  },
];

const aboutCurriculum: SiteAssetRole = {
  key: 'about.curriculum_pdf',
  label: 'Currículo para download',
  description: 'PDF usado na seção AboutClosing',
  page: 'about',
  asset_type: 'file',
  subPath: 'curriculum',
};

const portfolioHeroVideos: SiteAssetRole[] = [
  {
    key: SITE_ASSET_KEYS.heroVideos.portfolioDesktop,
    label: 'Vídeo hero Portfólio (desktop)',
    description: 'Hero do portfólio desktop',
    page: 'portfolio',
    asset_type: 'video',
    subPath: 'hero',
  },
  {
    key: SITE_ASSET_KEYS.heroVideos.portfolioMobile,
    label: 'Vídeo hero Portfólio (mobile)',
    description: 'Hero do portfólio mobile',
    page: 'portfolio',
    asset_type: 'video',
    subPath: 'hero',
  },
];

const homeHeroVideo: SiteAssetRole = {
  key: SITE_ASSET_KEYS.heroVideos.homeManifesto,
  label: 'Vídeo manifesto (home)',
  description: 'Vídeo principal da hero da Home',
  page: 'home',
  asset_type: 'video',
};

const projectAssets: SiteAssetRole[] = [
  // Campaign
  {
    key: SITE_ASSET_KEYS.projects.campaign.cover,
    label: 'Campaign • Cover',
    description: 'Capa do projeto Campaign',
    page: 'projects',
    asset_type: 'image',
    subPath: 'campaign',
  },
  {
    key: SITE_ASSET_KEYS.projects.campaign.hero,
    label: 'Campaign • Hero',
    description: 'Hero do projeto Campaign',
    page: 'projects',
    asset_type: 'image',
    subPath: 'campaign',
  },
  {
    key: SITE_ASSET_KEYS.projects.campaign.thumb,
    label: 'Campaign • Thumb',
    description: 'Thumbnail do projeto Campaign',
    page: 'projects',
    asset_type: 'image',
    subPath: 'campaign',
  },
  // Key Vision
  {
    key: SITE_ASSET_KEYS.projects.keyVision.cover,
    label: 'Key Vision • Cover',
    description: 'Capa do projeto Key Vision',
    page: 'projects',
    asset_type: 'image',
    subPath: 'key-vision',
  },
  {
    key: SITE_ASSET_KEYS.projects.keyVision.hero,
    label: 'Key Vision • Hero',
    description: 'Hero do projeto Key Vision',
    page: 'projects',
    asset_type: 'image',
    subPath: 'key-vision',
  },
  {
    key: SITE_ASSET_KEYS.projects.keyVision.thumb,
    label: 'Key Vision • Thumb',
    description: 'Thumbnail do projeto Key Vision',
    page: 'projects',
    asset_type: 'image',
    subPath: 'key-vision',
  },
  // Brand Video
  {
    key: SITE_ASSET_KEYS.projects.brandVideo.hero,
    label: 'Brand Video • Hero',
    description: 'Hero do projeto Brand Video',
    page: 'projects',
    asset_type: 'image',
    subPath: 'brand-video',
  },
  {
    key: SITE_ASSET_KEYS.projects.brandVideo.thumb,
    label: 'Brand Video • Thumb',
    description: 'Thumbnail do projeto Brand Video',
    page: 'projects',
    asset_type: 'video',
    subPath: 'brand-video',
  },
  // Advertising Video
  {
    key: SITE_ASSET_KEYS.projects.advertisingVideo.hero,
    label: 'Advertising Video • Hero',
    description: 'Hero do projeto Advertising Video',
    page: 'projects',
    asset_type: 'image',
    subPath: 'advertising-video',
  },
  {
    key: SITE_ASSET_KEYS.projects.advertisingVideo.thumb,
    label: 'Advertising Video • Thumb',
    description: 'Thumbnail do projeto Advertising Video',
    page: 'projects',
    asset_type: 'image',
    subPath: 'advertising-video',
  },
  // Creative Direction
  {
    key: SITE_ASSET_KEYS.projects.creativeDirection.hero,
    label: 'Creative Direction • Hero',
    description: 'Hero do projeto Creative Direction',
    page: 'projects',
    asset_type: 'image',
    subPath: 'creative-direction',
  },
  {
    key: SITE_ASSET_KEYS.projects.creativeDirection.thumb,
    label: 'Creative Direction • Thumb',
    description: 'Thumbnail do projeto Creative Direction',
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
  { label: 'Sobre • Hero vídeos', roles: aboutHeroVideos },
  { label: 'Sobre • Origem', roles: aboutOriginImages },
  {
    label: 'Sobre • Método & Curriculum',
    roles: [aboutMethodVideo, aboutCurriculum],
  },
  { label: 'Sobre • Crenças', roles: aboutBeliefsAssets },
  { label: 'Portfólio • Hero vídeos', roles: portfolioHeroVideos },
  { label: 'Portfólio • Projetos', roles: projectAssets },
];

const allSiteAssetRoles = siteAssetRoleGroups.flatMap((group) => group.roles);

export const siteAssetRoleMap = new Map(
  allSiteAssetRoles.map((role) => [role.key, role])
) as ReadonlyMap<string, SiteAssetRole>;

export function getSiteAssetRoleByKey(key: string) {
  return siteAssetRoleMap.get(key);
}
