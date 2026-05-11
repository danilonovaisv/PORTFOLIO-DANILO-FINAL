'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback, useRef } from 'react';
import { createClientComponentClient } from '@/lib/supabase/client';
import { ADMIN_NAVIGATION } from '@/config/admin-navigation';
import { buildSupabaseStorageUrl } from '@/lib/supabase/urls';
import { DEFAULT_VIDEO_POSTER } from '@/lib/video';
import { isVideo } from '@/lib/utils';
import {
  toggleFeaturedOnHome,
  toggleFeaturedOnPortfolio,
  togglePublish,
} from '@/lib/supabase/actions/project-toggles';
import { deleteProjectAction } from '@/app/admin/(protected)/trabalhos/actions';
import { useToast } from '@/hooks/use-toast';

type Project = {
  id: string;
  title: string;
  client_name: string;
  year: number | null;
  featured_on_home: boolean;
  featured_on_portfolio: boolean;
  is_published: boolean;
  thumbnail_path: string | null;
  hero_image_path: string | null;
  url_landscape: string | null;
  url_square: string | null;
  landing_page_id: string | null;
  landing_pages?: {
    content: {
      template?: string;
    } | null;
  } | null;
  project_type: string | null;
  slug: string | null;
  tags: Array<{ tag: { label: string; slug: string } }>;
};

type Props = {
  projects: Project[];
};

export default function ProjectsTable({ projects }: Props) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const channel = supabase
      .channel('admin_projects_list')
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
      supabase.removeChannel(channel);
    };
  }, [router, supabase]);

  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden backdrop-blur-xl">
      <div className="overflow-x-auto hidden md:block">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="px-6 py-4 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
                Project_Identity
              </th>
              <th className="px-6 py-4 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
                Client
              </th>
              <th className="px-6 py-4 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
                Date
              </th>
              <th className="px-6 py-4 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
                Taxonomy
              </th>
              <th className="px-6 py-4 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
                Media_Status
              </th>
              <th className="px-6 py-4 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
                Visibility
              </th>
              <th className="px-6 py-4 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {projects.map((project) => (
              <tr
                key={project.id}
                className="group transition-colors hover:bg-white/[0.02]"
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    {(project.url_landscape || project.thumbnail_path) && (
                      <AdminMediaThumb
                        path={project.url_landscape || project.thumbnail_path!}
                        alt={project.title}
                      />
                    )}
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-sm font-light text-white tracking-tight leading-none truncate max-w-[200px]">
                        {project.title}
                      </span>
                      <span className="font-mono text-[9px] text-bluePrimary/50 uppercase tracking-widest">
                        ID_{project.id.substring(0, 8).toUpperCase()}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <span className="font-mono text-xs text-white/60">
                    {project.client_name || 'Personal'}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <span className="font-mono text-xs text-white/40">
                    {project.year || '202X'}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                    {project.tags?.slice(0, 3).map((t) => (
                      <span
                        key={t.tag.slug}
                        className="rounded px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider bg-white/5 text-white/40 border border-white/5"
                      >
                        {t.tag.label}
                      </span>
                    ))}
                    {project.tags?.length > 3 && (
                      <span className="font-mono text-[9px] text-white/20">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="flex gap-3">
                    <div
                      className={`h-1.5 w-1.5 rounded-full ${project.url_landscape ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-white/10'}`}
                      title="16:9 Landscape"
                    />
                    <div
                      className={`h-1.5 w-1.5 rounded-full ${project.url_square ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-white/10'}`}
                      title="1:1 Square"
                    />
                    <div
                      className={`h-1.5 w-1.5 rounded-full ${project.landing_page_id ? 'bg-bluePrimary shadow-[0_0_8px_var(--color-bluePrimary)/0.5]' : 'bg-white/10'}`}
                      title="Landing Page"
                    />
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <form action={togglePublish}>
                      <input type="hidden" name="id" value={project.id} />
                      <input
                        type="hidden"
                        name="nextStatus"
                        value={project.is_published ? 'false' : 'true'}
                      />
                      <button
                        type="submit"
                        className={`rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-widest border transition-all ${
                          project.is_published
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                            : 'bg-white/5 text-white/40 border-white/5 hover:bg-white/10'
                        }`}
                      >
                        {project.is_published ? 'SYSTEM_LIVE' : 'SYSTEM_DRAFT'}
                      </button>
                    </form>

                    <div className="flex gap-2">
                      <form action={toggleFeaturedOnHome}>
                        <input type="hidden" name="id" value={project.id} />
                        <input
                          type="hidden"
                          name="nextStatus"
                          value={project.featured_on_home ? 'false' : 'true'}
                        />
                        <button
                          type="submit"
                          title="Home Featured"
                          className={`h-2 w-2 rounded-full border transition-colors duration-fast ${project.featured_on_home ? 'bg-bluePrimary border-bluePrimary/40 shadow-[0_0_8px_var(--color-bluePrimary)/0.5]' : 'bg-transparent border-white/10 hover:border-bluePrimary/50'}`}
                        />
                      </form>
                      <form action={toggleFeaturedOnPortfolio}>
                        <input type="hidden" name="id" value={project.id} />
                        <input
                          type="hidden"
                          name="nextStatus"
                          value={
                            project.featured_on_portfolio ? 'false' : 'true'
                          }
                        />
                        <button
                          type="submit"
                          title="Portfolio Featured"
                          className={`h-2 w-2 rounded-full border transition-colors duration-fast ${project.featured_on_portfolio ? 'bg-emerald-500 border-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-transparent border-white/10 hover:border-emerald-500/50'}`}
                        />
                      </form>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={ADMIN_NAVIGATION.trabalhos.detail(project.id)}
                      className="inline-flex h-8 items-center justify-center rounded bg-white/5 px-4 font-mono text-[10px] uppercase tracking-widest text-white/80 hover:bg-white/10 transition-colors border border-white/5"
                    >
                      SYSTEM_MODIFY
                    </Link>
                    <DeleteConfirmButton
                      projectId={project.id}
                      projectTitle={project.title}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {!projects.length && (
              <tr>
                <td
                  className="px-6 py-20 text-center font-mono text-xs uppercase tracking-widest text-white/20"
                  colSpan={7}
                >
                  Null_Projects_Returned
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-6 border-b border-white/5 last:border-b-0 space-y-6 bg-white/[0.01]"
          >
            <div className="flex items-center gap-4">
              {(project.url_landscape || project.thumbnail_path) && (
                <AdminMediaThumb
                  path={project.url_landscape || project.thumbnail_path!}
                  alt={project.title}
                />
              )}
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-sm font-light text-white tracking-tight">
                  {project.title}
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] text-bluePrimary/50 uppercase tracking-widest">
                    ID_{project.id.substring(0, 8).toUpperCase()}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-white/10" />
                  <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
                    {project.year || '202X'}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/20 block">
                  Publication
                </label>
                <form action={togglePublish}>
                  <input type="hidden" name="id" value={project.id} />
                  <input
                    type="hidden"
                    name="nextStatus"
                    value={project.is_published ? 'false' : 'true'}
                  />
                  <button
                    type="submit"
                    className={`w-full rounded-lg py-2 font-mono text-[9px] uppercase tracking-widest border transition-all ${
                      project.is_published
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-white/5 text-white/40 border-white/5'
                    }`}
                  >
                    {project.is_published ? 'SYSTEM_LIVE' : 'SYSTEM_DRAFT'}
                  </button>
                </form>
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/20 block">
                  Features
                </label>
                <div className="flex gap-2">
                  <form action={toggleFeaturedOnHome} className="flex-1">
                    <input type="hidden" name="id" value={project.id} />
                    <input
                      type="hidden"
                      name="nextStatus"
                      value={project.featured_on_home ? 'false' : 'true'}
                    />
                    <button
                      type="submit"
                      className={`w-full rounded-lg py-2 font-mono text-[8px] uppercase tracking-[0.2em] border transition-all ${
                        project.featured_on_home
                          ? 'bg-bluePrimary/10 text-bluePrimary border-bluePrimary/20'
                          : 'bg-white/5 text-white/40 border-white/5'
                      }`}
                    >
                      SYSTEM_HOME
                    </button>
                  </form>
                  <form action={toggleFeaturedOnPortfolio} className="flex-1">
                    <input type="hidden" name="id" value={project.id} />
                    <input
                      type="hidden"
                      name="nextStatus"
                      value={project.featured_on_portfolio ? 'false' : 'true'}
                    />
                    <button
                      type="submit"
                      className={`w-full rounded-lg py-2 font-mono text-[8px] uppercase tracking-[0.2em] border transition-all ${
                        project.featured_on_portfolio
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-white/5 text-white/40 border-white/5'
                      }`}
                    >
                      SYSTEM_PORTFOLIO
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <span className="font-mono text-[9px] text-white/20 uppercase">
                {project.client_name || 'Personal'}
              </span>
              <div className="flex gap-2">
                <Link
                  href={ADMIN_NAVIGATION.trabalhos.detail(project.id)}
                  className="inline-flex h-8 items-center justify-center rounded bg-white/5 px-4 font-mono text-[10px] uppercase tracking-widest text-white/80 hover:bg-white/10 transition-colors border border-white/5"
                >
                  SYSTEM_MODIFY
                </Link>
                <DeleteConfirmButton
                  projectId={project.id}
                  projectTitle={project.title}
                />
              </div>
            </div>
          </div>
        ))}
        {!projects.length && (
          <div className="p-6 text-center text-white/40 text-[10px] uppercase tracking-widest font-mono">
            Null_Projects_Found
          </div>
        )}
      </div>
    </div>
  );
}

function resolveMediaUrl(path: string) {
  return buildSupabaseStorageUrl('portfolio-media', path) ?? path;
}

function AdminMediaThumb({ path, alt }: { path: string; alt: string }) {
  const src = resolveMediaUrl(path);
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return <AdminMediaThumbFallback label={alt} />;
  }

  if (isVideo(src)) {
    return (
      <div className="h-10 w-16 overflow-hidden rounded border border-white/10 bg-black/30">
        <video
          src={src}
          muted
          playsInline
          loop
          autoPlay
          poster={DEFAULT_VIDEO_POSTER}
          className="h-full w-full object-cover"
          aria-label={alt}
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={64}
      height={40}
      className="h-10 w-16 rounded border border-white/10 object-cover"
      onError={() => setHasError(true)}
    />
  );
}

function AdminMediaThumbFallback({ label }: { label: string }) {
  return (
    <div className="flex h-10 w-16 items-center justify-center rounded border border-white/10 bg-neutral/60 px-1 text-center text-[9px] font-medium uppercase tracking-[0.14em] text-white/70">
      <span className="line-clamp-2">{label}</span>
    </div>
  );
}

function DeleteConfirmButton({
  projectId,
  projectTitle,
}: {
  projectId: string;
  projectTitle: string;
}) {
  const { toast } = useToast();
  const [phase, setPhase] = useState<'idle' | 'confirming' | 'deleting'>(
    'idle'
  );
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = useCallback(() => {
    setPhase('idle');
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const handleClick = useCallback(async () => {
    if (phase === 'idle') {
      setPhase('confirming');
      timerRef.current = setTimeout(reset, 3000);
      return;
    }

    if (phase === 'confirming') {
      if (timerRef.current) clearTimeout(timerRef.current);
      setPhase('deleting');

      try {
        const result = await deleteProjectAction(projectId);
        if (!result.ok) {
          console.error(
            `[DeleteProject] SYSTEM_ERR: Failed to delete "${projectTitle}":`,
            result.error
          );
          toast({
            title: 'SYSTEM_ERROR: PURGE_FAILED',
            description: String(result.error),
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'SYSTEM_SUCCESS',
            description: `Project "${projectTitle}" purged from registry.`,
          });
        }
      } catch (error) {
        console.error(`[DeleteProject] Unexpected Error:`, error);
        toast({
          title: 'SYSTEM_ERROR: UNEXPECTED',
          description: 'Could not purge project from registry.',
          variant: 'destructive',
        });
      } finally {
        reset();
      }
    }
  }, [phase, projectId, projectTitle, reset]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const label =
    phase === 'deleting'
      ? 'PURGING...'
      : phase === 'confirming'
        ? 'CONFIRM_DELETE?'
        : 'DELETE';

  return (
    <button
      type="button"
      disabled={phase === 'deleting'}
      onClick={handleClick}
      onBlur={phase === 'confirming' ? reset : undefined}
      className={`inline-flex items-center justify-center h-8 rounded px-4 font-mono text-[10px] uppercase tracking-widest transition-all border ${
        phase === 'confirming'
          ? 'bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse'
          : phase === 'deleting'
            ? 'bg-white/5 text-white/20 border-white/5 cursor-wait'
            : 'text-rose-400/50 border-transparent hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20'
      }`}
      aria-label={`Purge project: ${projectTitle}`}
    >
      {label}
    </button>
  );
}
