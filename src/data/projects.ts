import type { PortfolioProject, ProjectCategory } from '@/types/project';

export const PROJECT_CATEGORIES: Array<{
  id: ProjectCategory;
  label: string;
  labelMobile: string;
}> = [
  { id: 'all', label: 'Todos os Projetos', labelMobile: 'Todos' },
  { id: 'branding', label: 'Branding & Identity', labelMobile: 'Branding' },
  { id: 'campanha', label: 'Campanhas & Advertising', labelMobile: 'Campanha' },
  { id: 'web', label: 'Web & Digital', labelMobile: 'Web' },
  { id: 'motion', label: 'Motion & Video', labelMobile: 'Motion' },
  {
    id: 'institucional',
    label: 'Institucional & Retail',
    labelMobile: 'Institucional',
  },
  {
    id: 'packaging',
    label: 'Packaging & Product',
    labelMobile: 'Packaging',
  },
];

export function filterProjectsByCategory(
  projects: PortfolioProject[],
  category: ProjectCategory
) {
  if (category === 'all') return projects;
  return projects.filter((project) => project.category === category);
}
