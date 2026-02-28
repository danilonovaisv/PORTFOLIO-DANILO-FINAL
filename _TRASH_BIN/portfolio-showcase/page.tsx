'use client';

import React, { useRef, useState } from 'react';
import PortfolioHeroNew from '@/components/portfolio/PortfolioHeroNew';
import { ProjectsGallery } from '@/components/portfolio/ProjectsGallery';
import { PortfolioModal } from '@/components/portfolio/PortfolioModal';
import { PortfolioProject } from '@/types/project';
import ClientsBrandsSection from '@/components/home/clients/ClientsBrandsSection';
import ContactSection from '@/components/home/contact/ContactSection';
import SiteFooter from '@/components/layout/SiteFooter';
import { showcaseProjects } from '@/data/projects';

export default function PortfolioShowcasePage() {
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const handleOpenProject = (project: PortfolioProject) => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Give time for exit animation before clearing project
    setTimeout(() => {
      setSelectedProject(null);
      lastFocusedRef.current?.focus();
    }, 300);
  };

  return (
    <div className="bg-[#040013] min-h-screen">
      <PortfolioHeroNew />

      <ProjectsGallery
        projects={showcaseProjects}
        onProjectSelect={handleOpenProject}
      />

      <div className="relative z-10 bg-[#040013]">
        <ClientsBrandsSection />
        <ContactSection />
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
