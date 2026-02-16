-- Fix malformed file paths for critical hero/manifesto videos.
-- Keeps runtime behavior stable across environments.

update public.site_assets
set
  file_path = 'home/home.manifesto_video.mp4',
  page = 'home',
  is_active = true
where key = 'home.manifesto_video';

update public.site_assets
set
  file_path = 'portfolio/hero/portfolio.hero_desktop_video.mp4',
  page = 'portfolio',
  is_active = true
where key = 'portfolio.hero_desktop_video';

update public.site_assets
set
  file_path = 'portfolio/hero/portfolio.hero_mobile_video.mp4',
  page = 'portfolio',
  is_active = true
where key = 'portfolio.hero_mobile_video';

update public.site_assets
set
  file_path = 'about/hero/about.hero.desktop_video.mp4',
  page = 'about',
  is_active = true
where key = 'about.hero.desktop_video';

update public.site_assets
set
  file_path = 'about/hero/about.hero.mobile_video.mp4',
  page = 'about',
  is_active = true
where key = 'about.hero.mobile_video';
