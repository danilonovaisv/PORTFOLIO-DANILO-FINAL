import React from 'react';

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




const CTA_ITEM: MosaicItem = {
  id: 'mosaic-cta',
  gradient: 'linear-gradient(135deg, #0057FF 0%, #002D8F 100%)',
  accent: '#ffffff',
  title: 'Like what you see?',
  subtitle: 'Start a Project',
  imageSrc: undefined, // Explicitly no image for CTA to show gradient
};

// Frozen layouts for each category
function buildMosaicRows(category: string): MosaicRow[] {
  const allItems = BASE_MOSAIC_ITEMS['all']; // Fallback source
  
  // Helper to find item by substring or ID
  const find = (idPart: string) => allItems.find(i => i.id.includes(idPart)) || allItems[0];
  
  // Define strict item placements matches visual reference
  const brandRows: MosaicRow[] = [
    {
      id: 'brand-r0',
      columns: 2,
      items: [
        find('mosaic-magic'),
        find('mosaic-branding')
      ]
    },
    {
      id: 'brand-r1',
      columns: 1,
      items: [find('mosaic-keyvisual')]
    }
  ];

  const motionRows: MosaicRow[] = [
     {
      id: 'motion-r0',
      columns: 2,
      items: [
        find('mosaic-motion'),
        find('mosaic-thumb')
      ]
    }
  ];

  // Specific layout from reference: 
  // Row 1: Magic (Left), Running/KeyVisual (Right) -> 2 cols
  // Row 2: Epic -> 1 col
  // Row 3: Flux/FFF (Left), CTA (Right) -> 2 cols
  const webRows: MosaicRow[] = [
    {
      id: 'web-r0',
      columns: 2,
      items: [
        { ...find('mosaic-magic'), id: 'web-magic' }, 
        { ...find('mosaic-keyvisual'), id: 'web-keyvisual' } // Running girl matches Key Visual text
      ]
    },
    {
      id: 'web-r1',
      columns: 1,
      items: [
        { ...find('mosaic-epic'), id: 'web-epic' }
      ]
    },
    {
      id: 'web-r2',
      columns: 2,
      items: [
        { ...find('mosaic-branding'), id: 'web-flux' }, // Using Flux for FFF Legal
        { ...CTA_ITEM, id: 'web-cta' }
      ]
    }
  ];

  const allRows: MosaicRow[] = [
    // Mix of best items
    {
      id: 'all-r0',
      columns: 2,
      items: [find('mosaic-magic'), find('mosaic-branding')]
    },
    {
      id: 'all-r1',
      columns: 1,
      items: [find('mosaic-keyvisual')]
    },
    {
      id: 'all-r2',
      columns: 2,
      items: [find('mosaic-motion'), find('mosaic-thumb')]
    },
    {
      id: 'all-r3',
      columns: 1,
      items: [find('mosaic-welcome')]
    },
    {
      id: 'all-r4',
      columns: 2,
      items: [find('mosaic-unilever'), CTA_ITEM]
    }
  ];

  switch(category) {
    case 'brand-campaigns': return brandRows;
    case 'videos-motions': return motionRows;
    case 'websites-webcampaigns-tech': return webRows;
    default: return allRows;
  }
}


type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}


const VALID_CATEGORIES = ['all', 'brand-campaigns', 'videos-motions', 'websites-webcampaigns-tech'] as const;
type Category = (typeof VALID_CATEGORIES)[number];

export default async function PortfolioPage(props: Props) {
  const searchParams = await props.searchParams;
  const rawCategory = searchParams.category;
  
  // Handle case where category might be an array
  const categoryString = Array.isArray(rawCategory) ? rawCategory[0] : rawCategory;
  
  // Validate category against strict constant
  const category: Category = VALID_CATEGORIES.includes(categoryString as any)
    ? (categoryString as Category)
    : 'all';


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
