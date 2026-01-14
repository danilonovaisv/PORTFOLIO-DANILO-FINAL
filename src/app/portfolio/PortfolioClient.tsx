'use client';

import { useCallback, useState } from 'react';
import type { PortfolioProject } from '@/types/project';
import PortfolioHeroNew from '@/components/portfolio/PortfolioHeroNew';
import ProjectsGallery from '@/components/portfolio/ProjectsGallery';
import PortfolioModalNew from '@/components/portfolio/PortfolioModalNew';
import { SiteClosure } from '@/components/layout/SiteClosure';

type PortfolioClientProps = {
  projects: PortfolioProject[];
};

export default function PortfolioClient({ projects }: PortfolioClientProps) {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenProject = useCallback((project: PortfolioProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    // Limpa o projeto após a animação de saída
    setTimeout(() => {
      setSelectedProject(null);
    }, 400);
  }, []);

  return (
    <div className="min-h-screen bg-background text-text">
      {/* Hero com video */}
      <PortfolioHeroNew />

      {/* Galeria de projetos com filtros */}
      <ProjectsGallery 
        projects={projects}
        onProjectOpen={handleOpenProject} 
        isPaused={isModalOpen}
      />

      {/* Modal de projeto */}
      <PortfolioModalNew
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Global Closure */}
      <SiteClosure />
    </div>
  );
}
