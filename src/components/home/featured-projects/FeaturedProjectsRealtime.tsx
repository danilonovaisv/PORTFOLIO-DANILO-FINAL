'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { PortfolioProject } from '@/types/project';
import FeaturedProjectsSection from '@/components/home/featured-projects/FeaturedProjectsSection';
import { PortfolioModal } from '@/components/portfolio/PortfolioModal';
import { shuffleProjects } from '@/lib/portfolio/shuffle-projects';

type FeaturedProjectsRealtimeProps = {
  initialProjects: PortfolioProject[];
  shuffleSeed?: number;
};

export default function FeaturedProjectsRealtime({
  initialProjects,
  shuffleSeed,
}: FeaturedProjectsRealtimeProps) {
  const router = useRouter();
  const [displayProjects, setDisplayProjects] =
    useState<PortfolioProject[]>(initialProjects);
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setDisplayProjects(
      typeof shuffleSeed === 'number'
        ? shuffleProjects(initialProjects, shuffleSeed)
        : initialProjects
    );
  }, [initialProjects, shuffleSeed]);

  const handleOpenProject = useCallback(
    (project: PortfolioProject) => {
      if (project.landingPageSlug) {
        const params = new URLSearchParams({
          from: 'home',
          originCard: project.slug,
        });
        router.push(
          `/projects/${project.landingPageSlug}?${params.toString()}`
        );
        return;
      }

      lastFocusedRef.current = document.activeElement as HTMLElement | null;
      setSelectedProject(project);
      setIsModalOpen(true);
    },
    [router]
  );

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    window.setTimeout(() => {
      setSelectedProject(null);
      lastFocusedRef.current?.focus();
    }, 220);
  }, []);

  return (
    <>
      <FeaturedProjectsSection
        projects={displayProjects}
        onProjectOpen={handleOpenProject}
      />
      <PortfolioModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </>
  );
}
