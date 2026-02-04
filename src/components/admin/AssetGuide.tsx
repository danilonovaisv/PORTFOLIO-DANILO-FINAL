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
    <div className="rounded-xl border border-white/10 bg-slate-900/40 p-4 space-y-3">
      <h2 className="text-lg font-semibold text-white">Guia de keys</h2>
      <p className="text-xs text-slate-400">
        Use essas keys no Admin para garantir que a sessão pública leia o asset
        correto. Ajuste o campo “Subpasta” para manter o storage organizado.
      </p>
      <div className="grid gap-2 text-xs">
        {assetGuide.map((item) => (
          <div
            key={item.key}
            className="rounded-lg border border-white/10 bg-slate-900/80 p-3"
          >
            <div className="text-[11px] text-slate-300">{item.page}</div>
            <div className="text-sm font-semibold text-white">{item.key}</div>
            <p className="text-[11px] text-slate-400">{item.description}</p>
            <p className="text-[11px] text-blue-300 mt-1">{item.change}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
