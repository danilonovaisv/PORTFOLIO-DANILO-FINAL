'use client';

import { useCallback, useMemo, useState } from 'react';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import PortfolioShowcaseSection from '@/components/portfolio/PortfolioShowcaseSection';
import FeaturedProjectsSection from '@/components/home/FeaturedProjectsSection';
import ProjectModal from '@/components/portfolio/ProjectModal';
import { HOME_CONTENT } from '@/config/content';
import type { FeaturedProject } from '@/components/home/featured-projects/FeaturedProjectCard';

const FEATURED = HOME_CONTENT.featuredProjects;

export default function PortfolioPage() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const selectedProject: FeaturedProject | null = useMemo(
    () => FEATURED.find((project) => project.slug === selectedSlug) ?? null,
    [selectedSlug]
  );

  const handleOpenProject = useCallback((project: FeaturedProject) => {
    setSelectedSlug(project.slug);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedSlug(null);
  }, []);

  return (
    <main className="min-h-screen bg-ghost-bg text-text-light">
      <PortfolioHero />
      <PortfolioShowcaseSection />
      <FeaturedProjectsSection onProjectOpen={handleOpenProject} />
      <ProjectModal
        project={selectedProject}
        open={Boolean(selectedProject)}
        onClose={handleCloseModal}
      />
    </main>
  );
}
