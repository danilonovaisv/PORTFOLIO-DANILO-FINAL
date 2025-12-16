import React from 'react';
import { notFound } from 'next/navigation';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import PortfolioMosaicGrid from '@/components/portfolio/PortfolioMosaicGrid';
import type { MosaicItem, MosaicRow } from '@/components/portfolio/types';
import Clients from '@/components/home/Clients';
import Contact from '@/components/home/Contact';




// Base items for different categories
const BASE_MOSAIC_ITEMS: Record<string, MosaicItem[]> = {
  'brand-campaigns': [
    {
      id: 'mosaic-magic',
      imageSrc:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp',
      gradient:
        'linear-gradient(135deg, rgba(0,87,255,0.25), rgba(0,0,0,0.35))',
      accent: '#0057ff',
      title: 'Magic Studio Identity',
      subtitle: 'Identidade sensorial em motion',
    },
    {
      id: 'mosaic-branding',
      imageSrc:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
      gradient:
        'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(0,87,255,0.22))',
      accent: '#0f172a',
      title: 'Flux Branding System',
      subtitle: 'Diretrizes visuais para o Flux Lab',
    },
    {
      id: 'mosaic-keyvisual',
      imageSrc:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp',
      gradient:
        'linear-gradient(145deg, rgba(14,165,233,0.18), rgba(12,15,20,0.4))',
      accent: '#0ea5e9',
      title: 'Key Visual Campaign',
      subtitle: 'Narrativa visual para lançamento global',
    },
  ],
  'videos-motions': [
    {
      id: 'mosaic-motion',
      imageSrc:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
      gradient:
        'linear-gradient(135deg, rgba(12,20,38,0.85), rgba(124,58,237,0.35))',
      accent: '#7c3aed',
      title: 'Motion Direction',
      subtitle: 'Explorações cinematográficas para apps',
    },
    {
      id: 'mosaic-thumb',
      imageSrc:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/videos-motions-thumb.webp',
      gradient:
        'radial-gradient(circle at 12% 18%, rgba(255,255,255,0.22), transparent 35%), linear-gradient(160deg, rgba(0,87,255,0.24), rgba(12,12,16,0.65))',
      accent: '#2563eb',
      title: 'Focus Video Series',
      subtitle: 'Campanha de vídeo com storytelling',
    },
  ],
  'websites-webcampaigns-tech': [
    {
      id: 'mosaic-welcome',
      imageSrc:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp',
      gradient:
        'linear-gradient(125deg, rgba(255,255,255,0.04), rgba(17,24,39,0.75))',
      accent: '#0ea5e9',
      title: 'Welcome Ad Series',
      subtitle: 'Anúncios digitais para produto premium',
    },
    {
      id: 'mosaic-unilever',
      imageSrc: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Unilever.png',
      gradient:
        'linear-gradient(140deg, rgba(255,255,255,0.1), rgba(0,0,0,0.55))',
      accent: '#2563eb',
      title: 'Unilever Retrospective',
      subtitle: 'Série editorial para marca global',
    },
  ],
  'all': [
    {
      id: 'mosaic-magic',
      imageSrc:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp',
      gradient:
        'linear-gradient(135deg, rgba(0,87,255,0.25), rgba(0,0,0,0.35))',
      accent: '#0057ff',
      title: 'Magic Studio Identity',
      subtitle: 'Identidade sensorial em motion',
    },
    {
      id: 'mosaic-branding',
      imageSrc:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
      gradient:
        'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(0,87,255,0.22))',
      accent: '#0f172a',
      title: 'Flux Branding System',
      subtitle: 'Diretrizes visuais para o Flux Lab',
    },
    {
      id: 'mosaic-keyvisual',
      imageSrc:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp',
      gradient:
        'linear-gradient(145deg, rgba(14,165,233,0.18), rgba(12,15,20,0.4))',
      accent: '#0ea5e9',
      title: 'Key Visual Campaign',
      subtitle: 'Narrativa visual para lançamento global',
    },
    {
      id: 'mosaic-motion',
      imageSrc:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
      gradient:
        'linear-gradient(135deg, rgba(12,20,38,0.85), rgba(124,58,237,0.35))',
      accent: '#7c3aed',
      title: 'Motion Direction',
      subtitle: 'Explorações cinematográficas para apps',
    },
    {
      id: 'mosaic-thumb',
      imageSrc:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/videos-motions-thumb.webp',
      gradient:
        'radial-gradient(circle at 12% 18%, rgba(255,255,255,0.22), transparent 35%), linear-gradient(160deg, rgba(0,87,255,0.24), rgba(12,12,16,0.65))',
      accent: '#2563eb',
      title: 'Focus Video Series',
      subtitle: 'Campanha de vídeo com storytelling',
    },
    {
      id: 'mosaic-welcome',
      imageSrc:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp',
      gradient:
        'linear-gradient(125deg, rgba(255,255,255,0.04), rgba(17,24,39,0.75))',
      accent: '#0ea5e9',
      title: 'Welcome Ad Series',
      subtitle: 'Anúncios digitais para produto premium',
    },
    {
      id: 'mosaic-unilever',
      imageSrc: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Unilever.png',
      gradient:
        'linear-gradient(140deg, rgba(255,255,255,0.1), rgba(0,0,0,0.55))',
      accent: '#2563eb',
      title: 'Unilever Retrospective',
      subtitle: 'Série editorial para marca global',
    },
    {
      id: 'mosaic-magic-2',
      imageSrc: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Magic-1.png',
      gradient:
        'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(0,87,255,0.3))',
      accent: '#0057ff',
      title: 'Magic Concepts',
      subtitle: 'Explorações visuais para eventos',
    },
    {
      id: 'mosaic-epic',
      imageSrc: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Epic.png',
      gradient:
        'linear-gradient(150deg, rgba(15,23,42,0.85), rgba(99,102,241,0.35))',
      accent: '#4f46e5',
      title: 'Epic Launch Package',
      subtitle: 'Identidade heroica para lançamento',
    },
    {
      id: 'mosaic-loop',
      gradient:
        'conic-gradient(from 120deg, rgba(0,87,255,0.36), rgba(255,255,255,0.08), rgba(12,17,35,0.9))',
      accent: '#0ea5e9',
      title: 'Loop Gradient Study',
      subtitle: 'Experimentos em motion design',
    },
    {
      id: 'mosaic-blur',
      gradient:
        'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18), transparent 32%), linear-gradient(160deg, rgba(0,0,0,0.7), rgba(0,87,255,0.2))',
      accent: '#111111',
      title: 'Blur Edge Visuals',
      subtitle: 'Texturas e luz para interface',
    },
    {
      id: 'mosaic-gold',
      gradient:
        'linear-gradient(135deg, rgba(255,214,165,0.55), rgba(255,255,255,0.1), rgba(26,42,76,0.75))',
      accent: '#fbbf24',
      title: 'Gold Experience',
      subtitle: 'Microsite interativo em WebGL',
    },
  ]
};



function buildMosaicRows(category: string): MosaicRow[] {
  const categoryItems = BASE_MOSAIC_ITEMS[category] || BASE_MOSAIC_ITEMS['all'];
  
  // Define fixed layouts for each category to ensure visual consistency
  const layouts: Record<string, (1 | 2 | 3)[]> = {
    'brand-campaigns': [2, 1, 1], // 2 items in first row, 1 in second, 1 in third
    'videos-motions': [1, 2],     // 1 item in first row, 2 in second
    'websites-webcampaigns-tech': [2, 1], // 2 items in first row, 1 in second
    'all': [2, 1, 2, 1, 2, 1, 1] // Fixed layout for all items
  };
  
  const pattern = layouts[category] || layouts['all'];
  let cursor = 0;

  return pattern.map((columns, rowIndex) => {
    const items = Array.from({ length: columns }, (_, itemIndex) => {
      // Cycle through items if we run out
      const source = categoryItems[(cursor + itemIndex) % categoryItems.length];

      return {
        ...source,
        id: `${source.id}-r${rowIndex}-c${itemIndex}`,
      };
    });

    cursor += columns;

    return {
      id: `row-${rowIndex}`,
      columns,
      items,
    };
  });
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PortfolioPage(props: Props) {
  const searchParams = await props.searchParams;
  let category = searchParams.category;
  
  // Handle case where category might be an array
  if (Array.isArray(category)) {
    category = category[0] || 'all';
  }
  
  category = (category as string) || 'all';

  // Validate category
  const validCategories = ['all', 'brand-campaigns', 'videos-motions', 'websites-webcampaigns-tech'];
  if (!validCategories.includes(category)) {
    category = 'all';
  }

  const rows = buildMosaicRows(category);

  return (
    <>
      <PortfolioHero />
      <PortfolioMosaicGrid rows={rows} />
      <Clients />
      <Contact />
    </>
  );
}
