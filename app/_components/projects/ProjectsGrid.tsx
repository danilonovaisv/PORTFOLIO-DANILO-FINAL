import React, { ReactNode } from 'react';
import type { Project } from '@/src/lib/types';
import ProjectCard from './ProjectCard';

type ProjectsGridProps = {
  projects: Project[];
  children?: ReactNode;
};

const ProjectsGrid = ({ projects, children }: ProjectsGridProps) => (
  <div className="grid grid-cols-1 gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
    {projects.map((project, index) => (
      <ProjectCard key={project.slug} project={project} index={index} />
    ))}
    {children}
  </div>
);

export default ProjectsGrid;
