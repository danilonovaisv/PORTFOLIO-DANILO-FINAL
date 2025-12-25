'use client';

import ProjectCard from '@/components/home/ProjectCard';
import { HOME_CONTENT } from '@/config/content';

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#F4F5F7] pt-32 pb-24 px-[clamp(1.5rem,5vw,6rem)]">
      <div className="mx-auto w-full max-w-[1680px]">
        {/* Page Title */}
        <div className="mb-16 md:mb-24 flex flex-col gap-4">
          <h1 className="font-display text-[clamp(3.5rem,8vw,6rem)] font-bold tracking-tighter leading-[0.9] text-[#111111]">
            Selected <span className="text-[#0057FF]">Works</span>
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-[#666666] leading-relaxed">
            A selection of projects that define my journey in design, branding, and creative development.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-24">
          {HOME_CONTENT.featuredProjects.map((project, index) => (
            <ProjectCard 
              key={project.slug} 
              project={project} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </main>
  );
}
