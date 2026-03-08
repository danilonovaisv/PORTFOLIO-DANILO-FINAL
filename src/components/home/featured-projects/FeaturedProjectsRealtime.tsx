'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@/lib/supabase/client';
import { mapDbProjectToPortfolioProject } from '@/lib/portfolio/project-mappers';
import type { PortfolioProject } from '@/types/project';
import type { Database } from '@/lib/supabase.types';
import type { RealtimeChannel } from '@supabase/supabase-js';
import FeaturedProjectsSection from '@/components/home/featured-projects/FeaturedProjectsSection';
import { PortfolioModal } from '@/components/portfolio/PortfolioModal';
import type { DbProjectWithTags } from '@/lib/supabase/queries/projects';
import { shuffleHomeProjects } from '@/lib/portfolio/shuffle-projects';

type HomeProjectRow =
  Database['public']['Tables']['portfolio_projects']['Row'] & {
    tags?: Array<{
      tag?: { id: string; slug: string; label: string; kind: string } | null;
    }> | null;
    landing_page_slug?: string | null;
  };

type FeaturedProjectsRealtimeProps = {
  initialProjects: PortfolioProject[];
};

const POLLING_INTERVAL_MS = 45_000;

function normalizeHomeFeaturedProjects(projects: PortfolioProject[]) {
  return shuffleHomeProjects(projects);
}

function getProjectsSignature(projects: PortfolioProject[]) {
  return projects
    .map((project) =>
      [
        project.id,
        project.slug,
        project.title,
        project.client,
        String(project.year),
        project.image,
        project.imageLandscape ?? '',
        project.imageSquare ?? '',
        project.landingPageSlug ?? '',
        String(project.featuredOnHome ?? false),
      ].join('::')
    )
    .join('|');
}

export default function FeaturedProjectsRealtime({
  initialProjects,
}: FeaturedProjectsRealtimeProps) {
  const router = useRouter();
  const supabase = useMemo(() => createClientComponentClient(), []);
  const [projects, setProjects] = useState<PortfolioProject[]>(initialProjects);
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const isDev = process.env.NODE_ENV !== 'production';

  const loadFeaturedProjects = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('public_projects_view')
        .select(
          '*, tags:portfolio_project_tags(tag:portfolio_tags(id, slug, label, kind))'
        )
        .eq('featured_on_home', true)
        .order('featured_home_order', {
          ascending: true,
          nullsFirst: false,
        });

      if (error) {
        if (isDev) {
          console.warn(
            '[FeaturedProjectsRealtime] Supabase unavailable, keeping current project set.',
            error.message
          );
        }
        setProjects((current) =>
          current.length > 0 ? current : initialProjects
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
      const normalizedProjects = normalizeHomeFeaturedProjects(nextProjects);

      if (normalizedProjects.length === 0) {
        setProjects((current) =>
          current.length > 0 ? current : initialProjects
        );
        return;
      }

      setProjects((current) => {
        const isSame =
          getProjectsSignature(current) ===
          getProjectsSignature(normalizedProjects);

        if (isSame) return current;
        return normalizedProjects;
      });
    } catch (error) {
      if (isDev) {
        console.warn(
          '[FeaturedProjectsRealtime] Failed to load projects:',
          error
        );
      }
      setProjects((current) =>
        current.length > 0 ? current : initialProjects
      );
    }
  }, [initialProjects, isDev, supabase]);

  useEffect(() => {
    void loadFeaturedProjects();

    let channel: RealtimeChannel | null = null;
    let pollingId: ReturnType<typeof setInterval> | null = null;

    const startPolling = () => {
      if (pollingId || document.visibilityState !== 'visible') return;
      pollingId = setInterval(() => {
        void loadFeaturedProjects();
      }, POLLING_INTERVAL_MS);
    };

    const stopPolling = () => {
      if (!pollingId) return;
      clearInterval(pollingId);
      pollingId = null;
    };

    startPolling();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        void loadFeaturedProjects();
        startPolling();
      } else {
        stopPolling();
      }
    };

    const handleWindowFocus = () => {
      if (document.visibilityState === 'visible') {
        void loadFeaturedProjects();
      }
    };

    window.addEventListener('focus', handleWindowFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const setup = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.access_token) {
          supabase.realtime.setAuth(session.access_token);
        }

        channel = supabase
          .channel('projects_realtime_channel')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'portfolio_projects' },
            (payload) => {
              if (isDev) {
                console.warn('[FeaturedProjectsRealtime] DB Change:', payload);
              }
              void loadFeaturedProjects();
            }
          )
          .on('broadcast', { event: 'refresh_projects' }, () => {
            if (isDev) {
              console.warn('[FeaturedProjectsRealtime] Broadcast refresh');
            }
            void loadFeaturedProjects();
          })
          .subscribe((status, err) => {
            if (status === 'SUBSCRIBED') {
              if (isDev) {
                console.warn('[FeaturedProjectsRealtime] Subscribed');
              }
              stopPolling();
            }
            if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
              if (isDev) {
                console.warn(
                  '[FeaturedProjectsRealtime] Subscription error:',
                  status,
                  err
                );
              }
              startPolling();
            }
          });
      } catch (error) {
        if (isDev) {
          console.warn('[FeaturedProjectsRealtime] Setup error:', error);
        }
      }
    };

    void setup();

    return () => {
      stopPolling();
      window.removeEventListener('focus', handleWindowFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (channel) {
        void supabase.removeChannel(channel);
      }
    };
  }, [loadFeaturedProjects, supabase, isDev]);

  const handleOpenProject = useCallback(
    (project: PortfolioProject) => {
      if (project.landingPageSlug) {
        const params = new URLSearchParams({
          from: 'home',
          originCard: project.slug,
        });
        router.push(
          `/projects/${project.landingPageSlug}?${params.toString()}`
        );
        return;
      }

      lastFocusedRef.current = document.activeElement as HTMLElement | null;
      setSelectedProject(project);
      setIsModalOpen(true);
    },
    [router]
  );

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    window.setTimeout(() => {
      setSelectedProject(null);
      lastFocusedRef.current?.focus();
    }, 220);
  }, []);

  return (
    <>
      <FeaturedProjectsSection
        projects={projects}
        onProjectOpen={handleOpenProject}
      />
      <PortfolioModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </>
  );
}
