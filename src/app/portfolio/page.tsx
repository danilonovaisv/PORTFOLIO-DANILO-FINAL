import type { Metadata } from 'next';
import PortfolioClient from './PortfolioClient';
import { listProjects } from '@/lib/supabase/queries/projects';
import { mapDbProjectToPortfolioProject } from '@/lib/portfolio/project-mappers';
import { createStaticClient } from '@/lib/supabase/static';

export const metadata: Metadata = {
  title: 'Portfólio',
  description:
    'Explore uma seleção curada de projetos de Branding, Motion Design e Creative Development.',
};

export default async function PortfolioPage() {
  const supabase = createStaticClient();
  const dbProjects = await listProjects({}, supabase);
  const projects = dbProjects.map((project, index) =>
    mapDbProjectToPortfolioProject(project, index)
  );
  return <PortfolioClient projects={projects} />;
}
