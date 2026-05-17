// =============================================================================
// Centralized Video Assets
// =============================================================================
// Local paths served from public/site.assets/ — matches brand.ts asset() pattern.
// Supabase CDN not used here; files are bundled with the build via public/.

export const RESPONSIVE_VIDEOS = {
  homeManifesto: {
    desktop: '/site.assets/home/video.manifesto.desk.mp4',
    mobile: '/site.assets/home/video.manifesto.mobile.mp4',
  },
  aboutHero: {
    desktop: '/site.assets/about/hero/about.hero.desktop.compress.mp4',
    mobile: '/site.assets/about/hero/about.hero.mobile.compress.mp4',
  },
  aboutClosing: {
    desktop: '/site.assets/about/closing/video.closing.desk.mp4',
    mobile: '/site.assets/about/closing/video.closing.mobile.mp4',
  },
  aboutMethod: {
    desktop: '/site.assets/about/method/about.method.desktop_video.mp4',
    mobile: '/site.assets/about/method/about.method.mobile_video.mp4',
  },
  portfolioHero: {
    desktop: '/site.assets/portfolio/portfolio.hero_desktop_video.mp4',
    mobile: '/site.assets/portfolio/portfolio.hero_mobile_video.mp4',
  },
} as const;
