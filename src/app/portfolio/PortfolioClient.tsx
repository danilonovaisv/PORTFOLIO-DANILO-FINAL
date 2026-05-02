'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { PortfolioProject } from '@/types/project';
import dynamic from 'next/dynamic';
import PortfolioHeroNew from '@/components/portfolio/PortfolioHeroNew';
import ClientsBrandsSection from '@/components/home/clients/ClientsBrandsSection';
import ContactSection from '@/components/home/contact/ContactSection';
import SiteFooter from '@/components/layout/SiteFooter';
import AntigravityCTA from '@/components/ui/AntigravityCTA';
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
      ? project.destination.type === 'external_url'
        ? { type: 'modal' as const }
        : project.destination
      : project.landingPageSlug
        ? { type: 'internal_landing' as const, landingSlug: project.landingPageSlug }
        : { type: 'modal' as const };

    if (destination.type === 'internal_landing' && destination.landingSlug) {
      const params = new URLSearchParams({
        from: 'portfolio',
        originCard: project.slug,
      });
      router.push(`/projects/${destination.landingSlug}?${params.toString()}`);
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

      <PortfolioHeroNew />

      {/* std-grid: Ghost Design System grid constraint on main content wrapper */}
      <div className="std-grid">
        <ProjectsGallery
          projects={projects}
          onProjectSelect={handleOpenProject}
          initialCategory={initialCategory}
          initialPage={initialPage}
          totalProjectsCount={totalProjectsCount}
        />

        {/* CTA Section - After Cards, Following AntigravityCTA Pattern */}
        <section className="relative z-20 bg-background py-16 md:py-24">
          <div className="mx-auto flex justify-center px-6 md:px-16">
            <AntigravityCTA
              text="vamos trabalhar juntos"
              href="#contact"
              className="relative"
            />
          </div>
        </section>

        <div className="relative z-30 bg-background">
          <div
            ref={brandsSentinelRef}
            aria-hidden="true"
            className="h-px w-full"
          />
          {showClientsBrands ? (
            <ClientsBrandsSection />
          ) : (
            <div
              aria-hidden="true"
              className="bg-bluePrimary min-h-64"
            />
          )}
          <ContactSection />
        </div>
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
