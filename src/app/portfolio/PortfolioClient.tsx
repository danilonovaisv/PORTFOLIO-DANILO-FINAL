'use client';

import { useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { PortfolioProject } from '@/types/project';
import PortfolioHeroNew from '@/components/portfolio/PortfolioHeroNew';
import { ProjectsGallery } from '@/components/portfolio/ProjectsGallery';
import { PortfolioModal } from '@/components/portfolio/PortfolioModal';
import ClientsBrandsSection from '@/components/home/clients/ClientsBrandsSection';
import ContactSection from '@/components/home/contact/ContactSection';
import SiteFooter from '@/components/layout/SiteFooter';

type PortfolioClientProps = {
  projects: PortfolioProject[];
};

export default function PortfolioClient({ projects }: PortfolioClientProps) {
  const router = useRouter();
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const handleOpenProject = useCallback((project: PortfolioProject) => {
    if (project.landingPageSlug) {
      router.push(`/projects/${project.landingPageSlug}`);
      return;
    }
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setSelectedProject(project);
    setIsModalOpen(true);
  }, [router]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    window.setTimeout(() => {
      setSelectedProject(null);
      lastFocusedRef.current?.focus();
    }, 220);
  }, []);

  return (
    <div className="min-h-screen bg-background text-text">
      <a
        href="#portfolio-gallery"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black"
      >
        Pular para os projetos
      </a>

      <div>
        <PortfolioHeroNew />

        <ProjectsGallery projects={projects} onProjectSelect={handleOpenProject} />

        <div className="relative z-30 bg-background">
          <ClientsBrandsSection />
          <ContactSection />
        </div>
      </div>

      <SiteFooter />

      <PortfolioModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </div>
  );
}
