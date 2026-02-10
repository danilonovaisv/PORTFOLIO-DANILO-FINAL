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
import AntigravityCTA from '@/components/ui/AntigravityCTA';

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
      const params = new URLSearchParams({
        from: 'portfolio',
        originCard: project.slug,
      });
      router.push(`/projects/${project.landingPageSlug}?${params.toString()}`);
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

        {/* CTA Section - After Cards, Following AntigravityCTA Pattern */}
        <section className="relative z-20 bg-background py-16 md:py-24">
          <div className="mx-auto flex justify-center px-4 md:px-12">
            <AntigravityCTA
              text="vamos trabalhar juntos"
              href="#contact"
              className="relative"
            />
          </div>
        </section>

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
