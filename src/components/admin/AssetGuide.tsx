'use client';

import React from 'react';

const assetGuide = [
  {
    key: 'global.logo_header',
    description: 'Logo principal do header',
    change:
      'Atualize o arquivo e certifique-se de que o header usa useSiteAssetUrl nesta key.',
    page: 'global',
  },
  {
    key: 'global.favicon',
    description: 'Favicon usado em <head>',
    change:
      'Faça upload de um SVG/ICO e mantenha o mesmo nome no metadata/JsonLd.',
    page: 'global',
  },
  {
    key: 'global.font_display',
    description: 'Fonte display principal (Tailwind e h1)',
    change:
      'Altere o registro para a nova fonte e garanta que tailwind e typography usem esse nome.',
    page: 'global',
  },
  {
    key: 'home.manifesto_video',
    description: 'Vídeo do manifesto na hero da Home',
    change: 'Substitua o MP4 e poste poster & 720p com mesmo prefixo.',
    page: 'home',
  },
  {
    key: 'global.font_body',
    description: 'Fonte secundária do corpo (p/ todo o texto)',
    change:
      'Atualize o asset e use a nova fonte em BRAN.config/tailwind se necessário.',
    page: 'global',
  },
  {
    key: 'clients.strip',
    description: 'Strip de logos da sessão de clients',
    change:
      'Adicione novos arquivos com nomes como clients-strip-1 e os use via useSiteAssetsByPrefix.',
    page: 'clients',
  },
  {
    key: 'about.hero.desktop_video',
    description: 'Vídeo principal da hero Sobre (desktop)',
    change: 'Mantenha a trait about.hero.mobile_video também atualizada.',
    page: 'about',
  },
  {
    key: 'about.hero.mobile_video',
    description: 'Vídeo da hero Sobre para mobile',
    change: 'O hook sobre AboutHero troca automaticamente.',
    page: 'about',
  },
  {
    key: 'about.method.desktop_video',
    description: 'Vídeo da sessão Método (desktop)',
    change: 'Junte com version mobile e use os dois para os cards.',
    page: 'about',
  },
  {
    key: 'about.method.mobile_video',
    description: 'Vídeo da sessão Método (mobile)',
    change: 'Modernize ambos os assets juntos.',
    page: 'about',
  },
  {
    key: 'about.origin_image.1',
    description: 'Imagem 1 da sessão Origem',
    change: 'Para cada card use about.origin_image.N no mesmo padrão.',
    page: 'about',
  },
  {
    key: 'portfolio.hero_desktop_video',
    description: 'Vídeo hero do portfólio (desktop)',
    change: 'Atualize também portfolio.hero_mobile_video.',
    page: 'portfolio',
  },
  {
    key: 'portfolio.hero_mobile_video',
    description: 'Vídeo hero do portfólio (mobile)',
    change: 'Garante mobile/desktop alinhados.',
    page: 'portfolio',
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
