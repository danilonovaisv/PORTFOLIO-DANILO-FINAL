'use client';

import React, { useRef } from 'react';
import { useLERPScroll } from '@/hooks/useLERPScroll';
import { ProjectCard } from './ProjectCard';
import { PortfolioProject } from '@/types/project';
import { galleryProjects } from '@/data/projects';

interface ProjectsGalleryProps {
  projects?: PortfolioProject[];
  onProjectSelect?: (_project: PortfolioProject) => void;
  onOpenProject?: (_project: PortfolioProject) => void;
}

/**
 * ProjectsGallery - Ghost Era v2.0
 * Galeria com scroll suavizado (LERP) e grid editorial
 */
export const ProjectsGallery = ({
  projects,
  onProjectSelect,
  onOpenProject
}: ProjectsGalleryProps) => {
  const trackRef = useRef<HTMLDivElement>(null);

  // Initialize LERP Scroll
  const { galleryRef } = useLERPScroll(trackRef);

  // Use passed projects or fallback to mock data
  const projectsToRender = projects || galleryProjects;

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
          <div className="col-span-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 auto-rows-auto auto-flow-dense">
            {projectsToRender.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={onProjectSelect || onOpenProject}
                priority={index < 3}
                className={project.layout?.cols || 'lg:col-span-4'}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
