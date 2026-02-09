'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { createClientComponentClient } from '@/lib/supabase/client';
import { mapDbProjectToPortfolioProject } from '@/lib/portfolio/project-mappers';
import type { PortfolioProject } from '@/types/project';
import type { Database } from '@/lib/supabase.types';
import FeaturedProjectsSection from './FeaturedProjectsSection';
import type { DbProjectWithTags } from '@/lib/supabase/queries/projects';

type HomeProjectRow =
  Database['public']['Tables']['portfolio_projects']['Row'] & {
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
      .from('public_projects_view')
      .select(
        '*, tags:portfolio_project_tags(tag:portfolio_tags(id, slug, label, kind)), landing_page:landing_pages(slug)'
      )
      .eq('featured_on_home', true)
      // .eq('is_published', true) -- Implicit in View
      .order('featured_portfolio_order', {
        ascending: true,
        nullsFirst: false,
      });

    if (error) {
      console.error(
        '[FeaturedProjectsRealtime] Failed to load projects:',
        error.message
      );
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

    let channel: any = null;

    try {
      // Subscribe to the 'portfolio_projects' channel (matches TG_TABLE_NAME in DB trigger)
      channel = supabase
        .channel('portfolio_projects')
        .on(
          'broadcast',
          { event: 'portfolio_projects' },
          () => {
            // Reload on any project change
            void loadFeaturedProjects();
          }
        )
        .subscribe((status: string, err?: Error) => {
          if (status === 'CHANNEL_ERROR') {
            console.error(
              '[FeaturedProjectsRealtime] Subscription error:',
              err
            );
          }
        });

      // Note: If we need to listen to Tags changes, we'd need another channel 'portfolio_project_tags'
      // or handle it here if we merge topics. For now, project updates are the main driver.

    } catch (error) {
      console.error(
        '[FeaturedProjectsRealtime] Failed to initialize realtime channel:',
        error
      );
    }

    return () => {
      if (channel) {
        void supabase.removeChannel(channel);
      }
    };
  }, [loadFeaturedProjects, supabase]);

  return <FeaturedProjectsSection projects={projects} />;
}
