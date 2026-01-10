'use client';

import { useCallback, useState } from 'react';
import type { PortfolioProject } from '@/types/project';
import PortfolioHeroNew from '@/components/portfolio/PortfolioHeroNew';
import ProjectsGallery from '@/components/portfolio/ProjectsGallery';
import PortfolioModalNew from '@/components/portfolio/PortfolioModalNew';
import { SiteClosure } from '@/components/layout/SiteClosure';

export default function PortfolioClient() {
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
    <div className="min-h-screen bg-ghost-bg text-text-light">
      {/* Hero com video */}
      <PortfolioHeroNew />

      {/* Galeria de projetos com filtros */}
      <ProjectsGallery onProjectOpen={handleOpenProject} />

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
