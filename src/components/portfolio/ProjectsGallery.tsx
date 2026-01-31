'use client';

import React, { useRef } from 'react';
import { useLERPScroll } from '@/hooks/useLERPScroll';
import { ProjectCard } from './ProjectCard';
import type { PortfolioProject } from '@/types/project';

interface ProjectsGalleryProps {
  projects: PortfolioProject[];
  onProjectSelect?: (_project: PortfolioProject) => void;
}

/**
 * ProjectsGallery - Ghost Parallax Grid
 * 
 * Implements the "Fixed Track + Lerp" scrolling mechanism defined in AUDITORIA_PORTFOLIO.md
 * Uses CSS Grid with density packing for the editorial layout.
 */
export const ProjectsGallery = ({ projects, onProjectSelect }: ProjectsGalleryProps) => {
  const trackRef = useRef<HTMLDivElement>(null);

  // Initialize LERP Scroll
  // The hook calculates total height based on trackRef and applies it to galleryRef
  // to create the "scroll space", while translating the trackRef independently.
  const { galleryRef } = useLERPScroll(trackRef);

  return (
    <div
      ref={galleryRef as React.RefObject<HTMLDivElement>}
      className="gallery relative z-0 w-full min-h-screen"
      id="projects-gallery"
    >
      <div
        ref={trackRef}
        className="gallery-track fixed top-0 left-0 w-full will-change-transform z-10"
      >
        {/* Container / Grid System */}
        <div className="w-full max-w-[1680px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24 pt-24 pb-32">

          {/* Header */}
          <div className="mb-16 md:mb-24 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white/90">
              <span className="italic font-light text-[#4fe6ff] mr-4">todos os</span>
              projetos
            </h2>
          </div>

          {/* Editorial Grid */}
          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8 auto-rows-min grid-flow-dense">
            {projects.map((project, index) => {
              // Extract grid sizing from project layout or fallback to defaults
              // The audit suggests specific spans. We utilize the project.layout.cols if available,
              // otherwise default to a varied rhythm based on index.

              const defaultCols = index % 3 === 0 ? 'md:col-span-8 lg:col-span-8' : 'md:col-span-4 lg:col-span-4';
              const colsClass = project.layout?.cols || defaultCols;

              // Mobile is usually col-span-4 (full width of mobile grid)
              const mobileClass = 'col-span-4';

              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={onProjectSelect}
                  priority={index < 4}
                  className={`${mobileClass} ${colsClass}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
