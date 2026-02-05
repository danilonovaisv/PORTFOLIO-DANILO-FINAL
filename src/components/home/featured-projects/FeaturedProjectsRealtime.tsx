'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { createClientComponentClient } from '@/lib/supabase/client';
import { mapDbProjectToPortfolioProject } from '@/lib/portfolio/project-mappers';
import type { PortfolioProject } from '@/types/project';
import type { Database } from '@/lib/supabase.types';
import FeaturedProjectsSection from './FeaturedProjectsSection';
import type { DbProjectWithTags } from '@/lib/supabase/queries/projects';

type HomeProjectRow = Database['public']['Tables']['portfolio_projects']['Row'] & {
  tags?: Array<{
    tag?: { id: string; slug: string; label: string; kind: string } | null;
  }> | null;
  landing_page?: { slug: string } | null;
};

type FeaturedProjectsRealtimeProps = {
  initialProjects: PortfolioProject[];
};

export default function FeaturedProjectsRealtime({
  initialProjects,
}: FeaturedProjectsRealtimeProps) {
  const supabase = useMemo(() => createClientComponentClient(), []);
  const [projects, setProjects] = useState<PortfolioProject[]>(initialProjects);

  const loadFeaturedProjects = useCallback(async () => {
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select(
        '*, tags:portfolio_project_tags(tag:portfolio_tags(id, slug, label, kind)), landing_page:landing_pages(slug)'
      )
      .eq('featured_on_home', true)
      .eq('is_published', true)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('[FeaturedProjectsRealtime] Failed to load projects:', error.message);
      return;
    }

    const nextProjects = ((data as HomeProjectRow[]) ?? []).map(
      (project, index) =>
        mapDbProjectToPortfolioProject(
          project as unknown as DbProjectWithTags,
          index
        )
    );
    setProjects(nextProjects);
  }, [supabase]);

  useEffect(() => {
    void loadFeaturedProjects();

    const channel = supabase
      .channel('featured-home-projects')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'portfolio_projects' },
        () => {
          void loadFeaturedProjects();
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'portfolio_project_tags' },
        () => {
          void loadFeaturedProjects();
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [loadFeaturedProjects, supabase]);

  return <FeaturedProjectsSection projects={projects} />;
}
