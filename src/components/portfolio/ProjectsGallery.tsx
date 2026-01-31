'use client';

import React, { useRef } from 'react';
import { useLERPScroll } from '@/hooks/useLERPScroll';
import { ProjectCard } from './ProjectCard';
import { PortfolioProject } from '@/types/project';

// MOCK DATA - Replace with real data or imports later
const PROJECTS: PortfolioProject[] = [
  {
    id: '1',
    slug: 'garoto-nestle',
    title: 'Garoto Nestlé',
    client: 'Nestlé',
    category: 'branding',
    displayCategory: 'Branding',
    year: 2024,
    image: 'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/projects/campaign/cover.webp',
    type: 'B',
    layout: { cols: 'col-span-1', height: 'h-[400px]', colsMobile: 'col-span-1' },
    detail: {
      description: 'Rebranding completo para uma das maiores marcas de chocolate do Brasil.',
    },
    tags: ['Branding', 'Packaging']
  },
  {
    id: '2',
    slug: 'nescafe',
    title: 'Nescafé',
    client: 'Nestlé',
    category: 'web',
    displayCategory: 'Web Design',
    year: 2023,
    image: 'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/portfolio-media/projects/creative-direction/hero.webp',
    type: 'B',
    layout: { cols: 'col-span-1', height: 'h-[400px]', colsMobile: 'col-span-1' },
    detail: {
      description: 'Campanha digital global com foco em sustentabilidade.',
    },
    tags: ['Web', 'Campaign']
  },
  {
    id: '3',
    slug: 'mpdv',
    title: 'MPDV',
    client: 'MPDV',
    category: 'institucional',
    displayCategory: 'Institucional',
    year: 2023,
    image: 'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/projects/key-visual/cover.webp',
    type: 'A',
    layout: { cols: 'col-span-2', height: 'h-[400px]', colsMobile: 'col-span-1' },
    detail: {
      description: 'Plataforma de inteligência de dados para varejo.',
    },
    tags: ['Product', 'UI/UX']
  },
  {
    id: '4',
    slug: 'swift',
    title: 'Swift',
    client: 'JBS',
    category: 'motion',
    displayCategory: 'Motion',
    year: 2022,
    image: 'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/portfolio-media/projects/brand_video/hero.png',
    type: 'B',
    layout: { cols: 'col-span-1', height: 'h-[400px]', colsMobile: 'col-span-1' },
    detail: {
      description: 'Série de vídeos em motion graphics para mídias sociais.',
    },
    tags: ['Motion', 'Social']
  },
  {
    id: '5',
    slug: 'ambev',
    title: 'Ambev Tech',
    client: 'Ambev',
    category: 'web',
    displayCategory: 'Web',
    year: 2024,
    image: 'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/home/showcase/Key-Visual.webp',
    type: 'A',
    layout: { cols: 'col-span-1', height: 'h-[400px]', colsMobile: 'col-span-1' },
    detail: {
      description: 'Portal corporativo para talentos tech.',
    },
    tags: ['Web', 'Dev']
  },
  {
    id: '6',
    slug: 'unilever',
    title: 'Unilever',
    client: 'Unilever',
    category: 'institucional',
    displayCategory: 'Accessibility',
    year: 2023,
    image: 'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/home/showcase/Branding-Project.webp',
    type: 'B',
    layout: { cols: 'col-span-1', height: 'h-[400px]', colsMobile: 'col-span-1' },
    detail: {
      description: 'Consultoria de acessibilidade e performance.',
    },
    tags: ['Consultoria', 'A11y']
  }
];

interface ProjectsGalleryProps {
  projects?: PortfolioProject[];
  onProjectSelect?: (_project: PortfolioProject) => void;
  onOpenProject?: (_project: PortfolioProject) => void;
}

export const ProjectsGallery = ({ projects, onProjectSelect, onOpenProject }: ProjectsGalleryProps) => {
  const trackRef = useRef<HTMLDivElement>(null);

  // Initialize LERP Scroll
  // The hook attaches height to .gallery (we need to make sure the parent has this class or we pass a ref)
  const { galleryRef } = useLERPScroll(trackRef);

  // Use passed projects or fallback to mock data
  const projectsToRender = projects || PROJECTS;

  return (
    <div
      className="gallery relative z-0 w-full"
      ref={galleryRef as React.RefObject<HTMLDivElement>}
    >
      <div
        ref={trackRef}
        className="fixed top-0 left-0 w-full will-change-transform"
      >
        <div className="std-grid py-24 sm:py-32">
          <div className="col-span-full grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
            {projectsToRender.map((project, index) => (
              <div key={project.id} className="w-full">
                <ProjectCard
                  project={project}
                  index={index}
                  onClick={onProjectSelect || onOpenProject}
                  priority={index < 3}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
