'use client';

import React, { useState } from 'react';
import { HeroSection } from '@/components/portfolio/HeroSection';
import { ProjectsGallery } from '@/components/portfolio/ProjectsGallery';
import { PortfolioModal } from '@/components/portfolio/PortfolioModal';
import { PortfolioProject } from '@/types/project';
import ClientsBrandsSection from '@/components/home/clients/ClientsBrandsSection';
import ContactSection from '@/components/home/contact/ContactSection';
import { showcaseProjects } from '@/data/projects';

export default function PortfolioShowcasePage() {
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenProject = (project: PortfolioProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Give time for exit animation before clearing project
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <main className="bg-[#040013] min-h-screen">
      <HeroSection />

      <ProjectsGallery
        projects={showcaseProjects}
        onProjectSelect={handleOpenProject}
      />

      {/* Legacy Sections covering the gallery track if needed */}
      <div className="relative z-10 bg-[#040013]">
        <ClientsBrandsSection />
        <ContactSection />
      </div>

      <PortfolioModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </main>
  );
}
