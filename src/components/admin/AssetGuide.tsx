'use client';

import React from 'react';
import { SITE_ASSET_KEYS } from '@/config/site-assets';

const assetGuide = [
  {
    key: SITE_ASSET_KEYS.logos.headerLight,
    description: 'Logo principal do header (claro)',
    change:
      'Atualize o arquivo (SVG recomendado) e valide o cabeçalho com useSiteAssetUrl.',
    page: 'global',
  },
  {
    key: SITE_ASSET_KEYS.logos.headerDark,
    description: 'Logo principal do header (escuro)',
    change: 'Mantenha dimensões iguais ao claro para evitar saltos.',
    page: 'global',
  },
  {
    key: SITE_ASSET_KEYS.logos.faviconLight,
    description: 'Favicon claro usado em <head>',
    change:
      'SVG/ICO com fundo transparente; mantenha metadata/JsonLd alinhado.',
    page: 'global',
  },
  {
    key: SITE_ASSET_KEYS.logos.faviconDark,
    description: 'Favicon escuro usado em <head>',
    change: 'Mesmo tamanho do claro para consistência.',
    page: 'global',
  },
  {
    key: SITE_ASSET_KEYS.fonts.display,
    description: 'Fonte display principal (--font-display)',
    change: 'Atualize e revise tailwind/theme para usar a nova família.',
    page: 'global',
  },
  {
    key: SITE_ASSET_KEYS.fonts.body,
    description: 'Fonte do corpo (--font-body)',
    change: 'Confirme fallback stack e pesos no tema tipográfico.',
    page: 'global',
  },
  {
    key: SITE_ASSET_KEYS.heroVideos.homeManifesto,
    description: 'Vídeo do manifesto na hero da Home',
    change:
      'Substitua o MP4; gere poster e versão -720p mantendo o mesmo prefixo.',
    page: 'home',
  },
  {
    key: SITE_ASSET_KEYS.heroVideos.aboutDesktop,
    description: 'Vídeo da hero Sobre (desktop)',
    change: 'Sincronize com a versão mobile para evitar discrepâncias.',
    page: 'about',
  },
  {
    key: SITE_ASSET_KEYS.heroVideos.aboutMobile,
    description: 'Vídeo da hero Sobre (mobile)',
    change: 'O hook AboutHero troca automaticamente entre desktop/mobile.',
    page: 'about',
  },
  {
    key: SITE_ASSET_KEYS.heroVideos.method,
    description: 'Vídeo da sessão Método',
    change: 'Use o mesmo prefixo para versões alternativas se necessário.',
    page: 'about',
  },
  ...SITE_ASSET_KEYS.about.originImages.map((key, index) => ({
    key,
    description: `Imagem ${index + 1} da sessão Origem`,
    change: 'Siga o padrão about.origin_image.N para cada card.',
    page: 'about',
  })),
  {
    key: SITE_ASSET_KEYS.heroVideos.portfolioDesktop,
    description: 'Vídeo hero do portfólio (desktop)',
    change: 'Atualize em par com a versão mobile.',
    page: 'portfolio',
  },
  {
    key: SITE_ASSET_KEYS.heroVideos.portfolioMobile,
    description: 'Vídeo hero do portfólio (mobile)',
    change: 'Sincronize duração e cor com a versão desktop.',
    page: 'portfolio',
  },
  {
    key: 'clients.strip.*',
    description: 'Strip de logos da sessão de clients',
    change: 'Use clients.strip.N (1-12) e carregue via useSiteAssetsByPrefix.',
    page: 'clients',
  },
  {
    key: 'about.curriculum_pdf',
    description: 'Currículo da seção About',
    change: 'Envie PDF atualizado; mantenha nome consistente.',
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
