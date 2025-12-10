import React, { ReactNode } from 'react';
import type { Project } from '../../lib/types';
import ProjectCard from './ProjectCard';

type ProjectsGridProps = {
  projects: Project[];
  children?: ReactNode;
  className?: string;
};

const ProjectsGrid = ({
  projects,
  children,
  className = '',
}: ProjectsGridProps) => (
  <div
    className={`grid grid-cols-1 gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ${className}`}
  >
    {projects.map((project) => (
      <ProjectCard
        key={project.slug}
        project={project}
        priority={project.isHero}
      />
    ))}
    {children}
  </div>
);

export default ProjectsGrid;
