import type { Metadata } from 'next';
import PortfolioClient from './PortfolioClient';
import { listProjects } from '@/lib/supabase/queries/projects';
import { mapDbProjectToPortfolioProject } from '@/lib/portfolio/project-mappers';

export const metadata: Metadata = {
  title: 'Portfólio',
  description:
    'Explore uma seleção curada de projetos de Branding, Motion Design e Creative Development.',
};

export default async function PortfolioPage() {
  const dbProjects = await listProjects();
  const projects = dbProjects.map((project, index) =>
    mapDbProjectToPortfolioProject(project, index)
  );
  return <PortfolioClient projects={projects} />;
}
