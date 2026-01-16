import type { Metadata } from 'next';
import PortfolioClient from './PortfolioClient';
import { listProjects } from '@/lib/supabase/queries/projects';
import { mapDbProjectToPortfolioProject } from '@/lib/portfolio/project-mappers';
import { createStaticClient } from '@/lib/supabase/static';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Portfólio',
  description:
    'Explore uma seleção curada de projetos de Branding, Motion Design e Creative Development.',
};

export default async function PortfolioPage() {
  const supabase = createStaticClient();
  let dbProjects: Awaited<ReturnType<typeof listProjects>> = [];

  try {
    dbProjects = await listProjects({}, supabase);
  } catch (error) {
    console.error('Error fetching projects:', error);
  }

  const projects = dbProjects.map((project, index) =>
    mapDbProjectToPortfolioProject(project, index)
  );
  return <PortfolioClient projects={projects} />;
}
