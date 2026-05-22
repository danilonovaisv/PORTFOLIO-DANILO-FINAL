'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { PortfolioProject } from '@/types/project';
import dynamic from 'next/dynamic';
import PortfolioHeroNew from '@/components/portfolio/PortfolioHeroNew';
import ClientsBrandsSection from '@/components/home/clients/ClientsBrandsSection';
import ContactSection from '@/components/home/contact/ContactSection';
import SiteFooter from '@/components/layout/SiteFooter';
import { createClientComponentClient } from '@/lib/supabase/client';

const ProjectsGallery = dynamic(() => import('@/components/portfolio/ProjectsGallery').then((mod) => mod.ProjectsGallery));
const PortfolioModal = dynamic(() => import('@/components/portfolio/PortfolioModal').then((mod) => mod.PortfolioModal), { ssr: false });

type PortfolioClientProps = {
  projects: PortfolioProject[];
  initialCategory?: string;
  initialPage?: number;
  totalProjectsCount?: number;
};

export default function PortfolioClient({
  projects,
  initialCategory,
  initialPage,
  totalProjectsCount,
}: PortfolioClientProps) {
  const router = useRouter();
  const [supabase] = useState(() => createClientComponentClient());
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showClientsBrands, setShowClientsBrands] = useState(false);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const brandsSentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;

    const channel = supabase
      .channel('portfolio_projects_public')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'portfolio_projects',
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [router, supabase]);

  // Scroll-to-anchor on first paint when the URL contains a `#portfolio-card-*`
  // hash. Cards are emitted by ProjectCard with id `portfolio-card-<slug>-<index>`,
  // so we also try the `-0` suffix when the bare slug hash is provided
  // (e.g. from useLandingBackLink). The gallery is lazy-loaded, so we poll
  // briefly via requestAnimationFrame until the target node appears.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const rawHash = window.location.hash;
    if (!rawHash || !rawHash.startsWith('#portfolio-card-')) return;

    const hashId = rawHash.slice(1);
    const candidateIds = /-\d+$/.test(hashId)
      ? [hashId]
      : [hashId, `${hashId}-0`];

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const behavior: ScrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';

    let cancelled = false;
    let attempts = 0;
    const MAX_ATTEMPTS = 30; // ~500ms at 60fps

    const tryScroll = () => {
      if (cancelled) return;
      const target = candidateIds
        .map((id) => document.getElementById(id))
        .find((node): node is HTMLElement => node !== null);

      if (target) {
        target.scrollIntoView({ behavior, block: 'center' });
        return;
      }

      attempts += 1;
      if (attempts < MAX_ATTEMPTS) {
        window.requestAnimationFrame(tryScroll);
      }
    };

    window.requestAnimationFrame(tryScroll);

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const sentinel = brandsSentinelRef.current;
    if (!sentinel || showClientsBrands) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShowClientsBrands(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '320px 0px',
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [showClientsBrands]);

  const handleOpenProject = useCallback((project: PortfolioProject) => {
    const destination = project.destination
      ?? (project.landingPageSlug
        ? { type: 'internal_landing' as const, landingSlug: project.landingPageSlug }
        : { type: 'modal' as const });

    if (destination.type === 'internal_landing' && destination.landingSlug) {
      const params = new URLSearchParams({
        from: 'portfolio',
        originCard: project.slug,
      });
      router.push(`/projects/${destination.landingSlug}?${params.toString()}`);
      return;
    }

    // external_url and page destinations are resolved by the admin payload;
    // fall through to modal only when no concrete URL was provided.
    const externalTarget =
      (destination.type === 'external_url' || destination.type === 'page')
        ? (destination.url ?? destination.href ?? '').trim()
        : '';
    if (externalTarget) {
      if (destination.type === 'page' && externalTarget.startsWith('/')) {
        router.push(externalTarget);
        return;
      }
      window.open(
        externalTarget,
        destination.openInNewTab === false ? '_self' : '_blank',
        'noopener,noreferrer'
      );
      return;
    }

    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setSelectedProject(project);
    setIsModalOpen(true);
  }, [router]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    window.setTimeout(() => {
      setSelectedProject(null);
      lastFocusedRef.current?.focus();
    }, 220);
  }, []);

  return (
    <div className="min-h-screen bg-background text-text">
      <a
        href="#portfolio-gallery"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black"
      >
        Pular para os projetos
      </a>

      {/* std-grid: Ghost Design System grid constraint on main content wrapper */}
      <div className="std-grid">
        <PortfolioHeroNew />

        <ProjectsGallery
          projects={projects}
          onProjectSelect={handleOpenProject}
          initialCategory={initialCategory}
          initialPage={initialPage}
          totalProjectsCount={totalProjectsCount}
        />

        {showClientsBrands ? (
          <ClientsBrandsSection />
        ) : (
          <div
            aria-hidden="true"
            className="bg-bluePrimary min-h-64"
            ref={brandsSentinelRef}
          />
        )}
        <ContactSection />
      </div>

      <SiteFooter />

      <PortfolioModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </div>
  );
}
