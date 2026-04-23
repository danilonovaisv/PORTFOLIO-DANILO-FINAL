'use client';

import React from 'react';
import { SITE_ASSET_KEYS } from '@/config/site-assets';

const assetGuide = [
  {
    key: SITE_ASSET_KEYS.logos.headerLight,
    description: 'Main header logo (light)',
    change:
      'Update file (SVG recommended) and validate header via useSiteAssetUrl.',
    page: 'global',
  },
  {
    key: SITE_ASSET_KEYS.logos.headerDark,
    description: 'Main header logo (dark)',
    change: 'Maintain identical dimensions to the light version to prevent layout shifts.',
    page: 'global',
  },
  {
    key: SITE_ASSET_KEYS.logos.faviconLight,
    description: 'Light favicon used in <head>',
    change:
      'SVG/ICO with transparent background; maintain aligned metadata/JsonLd.',
    page: 'global',
  },
  {
    key: SITE_ASSET_KEYS.logos.faviconDark,
    description: 'Dark favicon used in <head>',
    change: 'Same size as light version for consistency.',
    page: 'global',
  },
  {
    key: SITE_ASSET_KEYS.fonts.display,
    description: 'Main display font (--font-display)',
    change: 'Update and review tailwind/theme to implement new family.',
    page: 'global',
  },
  {
    key: SITE_ASSET_KEYS.fonts.body,
    description: 'Body font (--font-body)',
    change: 'Confirm fallback stack and weights in typography theme.',
    page: 'global',
  },
  {
    key: SITE_ASSET_KEYS.heroVideos.homeManifesto,
    description: 'Manifesto video for Home hero',
    change:
      'Replace MP4; generate poster and -720p version using identical prefix.',
    page: 'home',
  },
  {
    key: SITE_ASSET_KEYS.heroVideos.aboutDesktop,
    description: 'About hero video (desktop)',
    change: 'Synchronize with mobile version to prevent discrepancies.',
    page: 'about',
  },
  {
    key: SITE_ASSET_KEYS.heroVideos.aboutMobile,
    description: 'About hero video (mobile)',
    change: 'AboutHero hook automatically toggles between desktop/mobile.',
    page: 'about',
  },
  {
    key: SITE_ASSET_KEYS.heroVideos.method,
    description: 'Method section video',
    change: 'Use identical prefix for alternative versions if necessary.',
    page: 'about',
  },
  ...SITE_ASSET_KEYS.about.originImages.map((key, index) => ({
    key,
    description: `Origin section image ${index + 1}`,
    change: 'Follow about.origin_image.N pattern for each card.',
    page: 'about',
  })),
  {
    key: SITE_ASSET_KEYS.heroVideos.portfolioDesktop,
    description: 'Portfolio hero video (desktop)',
    change: 'Update in sync with mobile version.',
    page: 'portfolio',
  },
  {
    key: SITE_ASSET_KEYS.heroVideos.portfolioMobile,
    description: 'Portfolio hero video (mobile)',
    change: 'Synchronize duration and color with desktop version.',
    page: 'portfolio',
  },
  {
    key: 'clients.strip.*',
    description: 'Client section logo strip',
    change: 'Use clients.strip.N (1-12) and load via useSiteAssetsByPrefix.',
    page: 'clients',
  },
  {
    key: 'about.curriculum_pdf',
    description: 'About section resume',
    change: 'Upload updated PDF; keep filename consistent.',
    page: 'about',
  },
];

export function AssetGuide() {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl space-y-6">
      <div className="space-y-1">
        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#0048ff]/60">Module_Documentation</p>
        <h2 className="font-mono text-xl font-light text-white uppercase">Key_Guide<span className="text-[#0048ff]">.</span></h2>
      </div>
      
      <p className="font-mono text-[10px] text-white/40 uppercase leading-relaxed">
        Reference keys for system modules. Use strictly defined identifiers to ensure synchronization between the vault and public interfaces.
      </p>

      <div className="grid gap-2 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
        {assetGuide.map((item) => (
          <div
            key={item.key}
            className="group rounded-lg border border-white/5 bg-white/[0.01] p-4 transition-all hover:border-white/10 hover:bg-white/[0.03]"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[9px] text-[#0048ff]/50 uppercase tracking-widest">
                PAGE: {item.page}
              </span>
              <div className="h-1 w-1 rounded-full bg-white/10 group-hover:bg-[#0048ff]/50 transition-colors" />
            </div>
            
            <div className="font-mono text-xs text-white uppercase tracking-tight mb-1">
              {item.key}
            </div>
            
            <p className="font-mono text-[10px] text-white/30 uppercase leading-tight mb-3">
              {item.description}
            </p>
            
            <div className="pt-2 border-t border-white/5">
              <p className="font-mono text-[9px] text-[#0048ff]/60 uppercase leading-relaxed italic">
                {item.change}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
