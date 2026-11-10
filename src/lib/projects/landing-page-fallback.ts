import { MASTER_PROJECT_TEMPLATE_V3, MASTER_PROJECT_TEMPLATE_V3_HERO } from '@/types/project-template';

export interface LandingPageBackupRecord {
  id: string;
  slug: string;
  title: string;
  cover: string | null;
  content: unknown;
  created_at?: string;
}

/**
 * Fallback estático para landing pages críticas do portfolio.
 * Garante que mesmo sem conexão com banco (Supabase/D1), as páginas renderizem.
 */
export const FALLBACK_LANDING_PAGES: LandingPageBackupRecord[] = [
  {
    id: 'fallback-zevi',
    slug: 'zevi',
    title: 'Zevi — Brand & Campaign',
    cover: 'site-assets/projects/campaign/cover.webp',
    content: {
      template: MASTER_PROJECT_TEMPLATE_V3,
      project_title: 'Zevi',
      project_subtitle: 'Direção de Arte & Identidade Visual',
      project_client: 'Zevi Corp',
      project_year: 2026,
      project_tags: ['Branding', 'Campaign', 'Creative Direction'],
      project_services: ['Identity', 'Motion', 'Art Direction'],
      project_summary: 'Desenvolvimento de identidade visual e campanha de lançamento com foco em presença e impacto estético.',
      intro_headline: 'A essência da marca traduzida em movimento e forma.',
      intro_body: ['Zevi representa uma nova abordagem para o design de marcas digitais.'],
      hero_cover_image: {
        src: 'site-assets/projects/campaign/cover.webp',
        alt: 'Zevi Cover',
        kind: 'image'
      },
      project_services_list: ['Branding', 'Motion', 'Art Direction'],
      project_team: [{ role: 'Lead Architect', name: 'Danilo Novais' }],
      gallery_grid: []
    }
  },
  {
    id: 'fallback-ai-video',
    slug: 'ai-video',
    title: 'AI Video Engine — Creative Dev',
    cover: 'site-assets/projects/key-visual/cover.webp',
    content: {
      template: MASTER_PROJECT_TEMPLATE_V3_HERO,
      project_title: 'AI Video Engine',
      project_subtitle: 'Creative Development & WebGL',
      project_client: 'Experimental Lab',
      project_year: 2026,
      project_tags: ['Creative Tech', 'WebGL', 'AI'],
      project_services: ['Shaders', 'React Three Fiber', 'R2 Storage'],
      project_summary: 'Motor de geração e processamento de vídeo em tempo real integrado com WebGL e shaders customizados.',
      intro_headline: 'Explorando os limites da computação gráfica na web.',
      intro_body: ['Experiência imersiva desenvolvida com React Three Fiber e shaders GLSL.'],
      hero_cover_image: {
        src: 'site-assets/projects/key-visual/cover.webp',
        alt: 'AI Video Cover',
        kind: 'image'
      },
      project_services_list: ['WebGL', 'Shaders', 'Architecture'],
      project_team: [{ role: 'Creative Developer', name: 'Danilo Novais' }],
      gallery_grid: []
    }
  }
];

export function getFallbackLandingPage(slug: string): LandingPageBackupRecord | null {
  const normalized = slug.trim().toLowerCase();
  const found = FALLBACK_LANDING_PAGES.find(p => p.slug.toLowerCase() === normalized);
  if (found) return found;

  // Gerador genérico para qualquer slug desconhecido
  return {
    id: `fallback-${slug}`,
    slug,
    title: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '),
    cover: null,
    content: {
      template: MASTER_PROJECT_TEMPLATE_V3,
      project_title: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '),
      project_subtitle: 'Projeto do Portfólio Ghost Era',
      project_client: 'Cliente Confidencial',
      project_year: 2026,
      project_tags: ['Design', 'Creative Tech'],
      project_services: ['Architecture', 'Development'],
      project_summary: 'Projeto de alta performance desenvolvido com o Ghost Design System.',
      intro_headline: 'Excelência em cada detalhe.',
      intro_body: ['Este projeto demonstra a capacidade de entrega e robustez arquitetural do sistema.'],
      hero_cover_image: {
        src: 'site-assets/home/showcase/Branding-Project.webp',
        alt: slug,
        kind: 'image'
      },
      project_services_list: ['Engineering', 'Design'],
      project_team: [{ role: 'Architect', name: 'Danilo Novais' }],
      gallery_grid: []
    }
  };
}