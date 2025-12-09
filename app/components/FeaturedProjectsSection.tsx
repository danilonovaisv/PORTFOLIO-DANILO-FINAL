'use client';

import { Project, featuredProjects } from '@/content/projects';
import ProjectCard from './ProjectCard';

type FeaturedProjectsSectionProps = {
  projects?: Project[];
};

const FeaturedProjectsSection = ({ projects = featuredProjects }: FeaturedProjectsSectionProps) => {
  const projectsToRender = projects.slice(0, 6);

  return (
    <section id="featured-projects" className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center gap-2 text-center">
          <span className="text-[0.65rem] uppercase tracking-[0.6em] text-[#0057FF]">featured projects</span>
          <h2 className="text-3xl font-semibold text-[#111111] sm:text-4xl lg:text-5xl">
            Recent collaborations
          </h2>
        </div>
        <div
          className="grid gap-4 sm:gap-6 lg:gap-8"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}
        >
          {projectsToRender.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
