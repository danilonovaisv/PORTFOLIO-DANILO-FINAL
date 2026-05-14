'use server';

import { revalidatePath } from 'next/cache';
import { upsertProject, deleteProject } from '@/lib/supabase/queries/projects';
import {
  projectMutationSchema,
  type ProjectMutationInput,
} from '@/lib/admin/schemas/project';

import { validatePayload, errorResponse } from '@/lib/admin/validation';
import { requireAdminAccess } from '@/lib/admin/server-access';
import {
  moveProjectFolder,
  deleteProjectFolder,
  deleteStorageFiles,
} from '@/lib/supabase/storage-utils';
import { normalizeBrand, normalizeProject } from '@/lib/assets/storagePath';
import {
  findRemovedProjectStoragePaths,
  type ProjectStorageSnapshot,
  type StoragePathRewrite,
} from '@/lib/admin/project-storage';

export async function upsertProjectAction(input: ProjectMutationInput) {
  const validation = validatePayload(projectMutationSchema, input);
  if (!validation.success) return validation.response;

  const {
    tags,
    client_slug: providedClientSlug,
    ...projectData
  } = validation.data;

  const client_slug =
    providedClientSlug || normalizeBrand(projectData.client_name).slice(0, 120);

  const newSlug = normalizeProject(projectData.slug);

  let finalUrlLandscape = projectData.url_landscape;
  let finalUrlSquare = projectData.url_square;
  let finalGallery = projectData.gallery;

  try {
    const { supabase } = await requireAdminAccess({ requireServiceRole: true });

    // Validate slug uniqueness before any writes
    const { data: existing } = await supabase
      .from('portfolio_projects')
      .select('id')
      .eq('slug', newSlug)
      .maybeSingle();

    if (existing && existing.id !== input.id) {
      return errorResponse(
        'SYSTEM_ERR: SLUG_ALREADY_EXISTS — CHOOSE_UNIQUE_IDENTIFIER'
      );
    }

    // Detect rename: collect old paths BEFORE writing to DB
    let oldFolderV4: string | null = null;
    let newFolderV4: string | null = null;
    let oldFolderNew: string | null = null;
    let newFolderNew: string | null = null;
    let oldFolderProjects: string | null = null;
    let newFolderProjects: string | null = null;
    let previousProjectSnapshot: ProjectStorageSnapshot | null = null;
    let previousLandingPageId: string | null = null;

    if (input.id) {
      const { data: oldProject } = await supabase
        .from('portfolio_projects')
        .select(
          'slug, client_slug, url_landscape, url_square, gallery, home_featured, landing_page_id'
        )
        .eq('id', input.id)
        .single();

      if (oldProject) {
        previousLandingPageId = oldProject.landing_page_id ?? null;
        previousProjectSnapshot = {
          url_landscape: oldProject.url_landscape,
          url_square: oldProject.url_square,
          gallery: Array.isArray(oldProject.gallery)
            ? oldProject.gallery
                .map((item) => {
                  if (!item || typeof item !== 'object') return null;
                  const path =
                    'path' in item && typeof item.path === 'string'
                      ? item.path
                      : null;

                  if (!path) return null;
                  return { path };
                })
                .filter((item): item is { path: string } => Boolean(item))
            : [],
          home_featured:
            oldProject.home_featured &&
            typeof oldProject.home_featured === 'object'
              ? (oldProject.home_featured as ProjectStorageSnapshot['home_featured'])
              : null,
        };

        const oldV4 = `v4/${oldProject.client_slug}/${oldProject.slug}`;
        const newV4 = `v4/${client_slug}/${newSlug}`;
        const oldNew = `${oldProject.client_slug}/${oldProject.slug}/project-assets`;
        const newNew = `${client_slug}/${newSlug}/project-assets`;
        const oldProjects = `${oldProject.client_slug}/projects/${oldProject.slug}`;
        const newProjects = `${client_slug}/projects/${newSlug}`;

        // Only register folders that actually changed
        if (oldV4 !== newV4) {
          oldFolderV4 = oldV4;
          newFolderV4 = newV4;
        }
        if (oldNew !== newNew) {
          oldFolderNew = oldNew;
          newFolderNew = newNew;
        }
        if (oldProjects !== newProjects) {
          oldFolderProjects = oldProjects;
          newFolderProjects = newProjects;
        }

        // Pre-compute replaced URL references so DB is written with the
        // CORRECT target paths from the start (DB-first approach).
        const replacePath = (p?: string | null): string | undefined => {
          if (!p) return undefined;
          let replaced =
            oldV4 !== newV4 ? p.replace(oldV4 + '/', newV4 + '/') : p;
          replaced =
            oldNew !== newNew
              ? replaced.replace(oldNew + '/', newNew + '/')
              : replaced;
          replaced =
            oldProjects !== newProjects
              ? replaced.replace(oldProjects + '/', newProjects + '/')
              : replaced;
          return replaced || undefined;
        };

        finalUrlLandscape = replacePath(finalUrlLandscape) ?? null;
        finalUrlSquare = replacePath(finalUrlSquare) ?? null;

        if (finalGallery && Array.isArray(finalGallery)) {
          finalGallery = finalGallery.map((item) => ({
            ...item,
            path: item.path ? replacePath(item.path) || undefined : undefined,
          }));
        }
      }
    }

    // ── DB UPDATE FIRST (atomic from DB's perspective) ──────────────────
    // If DB fails, storage is untouched → state remains consistent.
    // If storage move fails later, DB has the correct target paths and
    // old files remain accessible until cleanup or re-rename resolves.
    const updatedProject = await upsertProject({
      ...projectData,
      client_slug,
      slug: newSlug,
      url_landscape: finalUrlLandscape,
      url_square: finalUrlSquare,
      gallery: finalGallery as unknown as any,
      tagIds: tags,
    });

    // ── STORAGE MOVE AFTER DB WRITE ──────────────────────────────────────
    const storageMoveFailures: string[] = [];
    const storageRewrites: StoragePathRewrite[] = [];

    if (oldFolderV4 && newFolderV4) {
      storageRewrites.push({ from: oldFolderV4, to: newFolderV4 });
      const { failed } = await moveProjectFolder(
        supabase,
        'portfolio-media',
        oldFolderV4,
        newFolderV4
      );
      storageMoveFailures.push(...failed);
    }
    if (oldFolderNew && newFolderNew) {
      storageRewrites.push({ from: oldFolderNew, to: newFolderNew });
      const { failed } = await moveProjectFolder(
        supabase,
        'portfolio-media',
        oldFolderNew,
        newFolderNew
      );
      storageMoveFailures.push(...failed);
    }
    if (oldFolderProjects && newFolderProjects) {
      storageRewrites.push({ from: oldFolderProjects, to: newFolderProjects });
      const { failed } = await moveProjectFolder(
        supabase,
        'portfolio-media',
        oldFolderProjects,
        newFolderProjects
      );
      storageMoveFailures.push(...failed);
    }

    if (storageMoveFailures.length > 0) {
      // Log for admin visibility — not critical since DB paths are correct
      // and old files remain accessible. Cleanup functions will reconcile.
      console.error(
        '[WORKS_ENGINE] Partial storage rename failure — files still at old path:',
        storageMoveFailures
      );
    }

    const nextProjectSnapshot: ProjectStorageSnapshot = {
      url_landscape: finalUrlLandscape,
      url_square: finalUrlSquare,
      gallery: Array.isArray(finalGallery) ? finalGallery : [],
      home_featured:
        projectData.home_featured &&
        typeof projectData.home_featured === 'object'
          ? (projectData.home_featured as ProjectStorageSnapshot['home_featured'])
          : null,
    };

    const orphanedPaths = findRemovedProjectStoragePaths(
      previousProjectSnapshot,
      nextProjectSnapshot,
      storageRewrites
    );

    if (orphanedPaths.length > 0) {
      const { failed } = await deleteStorageFiles(
        supabase,
        'portfolio-media',
        orphanedPaths
      );

      if (failed.length > 0) {
        console.error(
          '[WORKS_ENGINE] Partial storage cleanup failure — orphaned files may remain:',
          failed
        );
      }
    }

    // Cache revalidation
    revalidatePath('/admin/trabalhos');
    revalidatePath('/portfolio');
    revalidatePath('/');
    if (updatedProject?.slug) {
      revalidatePath(`/portfolio/${updatedProject.slug}`);
    }

    // If the project's linked landing page changed, revalidate the public
    // landing routes for both the previous and the next slug so cached pages
    // pick up the new association.
    const nextLandingPageId = projectData.landing_page_id ?? null;
    if (previousLandingPageId !== nextLandingPageId) {
      const landingIds = [previousLandingPageId, nextLandingPageId].filter(
        (id): id is string => typeof id === 'string' && id.length > 0
      );

      if (landingIds.length > 0) {
        const { data: landingPages } = await supabase
          .from('landing_pages')
          .select('slug')
          .in('id', landingIds);

        landingPages?.forEach((page) => {
          if (page?.slug) {
            revalidatePath(`/projects/${page.slug}`);
          }
        });
      }
    }

    return { ok: true as const, data: updatedProject };
  } catch (error: unknown) {
    return errorResponse(
      'SYSTEM_ERR: SAVE_FAILURE — PROJECT_PERSISTENCE_ERROR',
      error
    );
  }
}

export async function deleteProjectAction(id: string) {
  try {
    const { supabase } = await requireAdminAccess({ requireServiceRole: true });

    const { data: oldProject } = await supabase
      .from('portfolio_projects')
      .select('slug, client_slug')
      .eq('id', id)
      .single();

    // Delete DB record first — storage cleanup is best-effort
    await deleteProject(id);

    if (oldProject) {
      const folderV4 = `v4/${oldProject.client_slug}/${oldProject.slug}`;
      const folderNew = `${oldProject.client_slug}/${oldProject.slug}/project-assets`;
      const folderProjects = `${oldProject.client_slug}/projects/${oldProject.slug}`;

      const results = await Promise.allSettled([
        deleteProjectFolder(supabase, 'portfolio-media', folderV4),
        deleteProjectFolder(supabase, 'portfolio-media', folderNew),
        deleteProjectFolder(supabase, 'portfolio-media', folderProjects),
      ]);

      const failures = results.filter((r) => r.status === 'rejected');
      if (failures.length > 0) {
        console.error(
          '[WORKS_ENGINE] Partial storage delete failure — orphaned files may remain:',
          failures
        );
      }
    }

    revalidatePath('/admin/trabalhos');
    revalidatePath('/portfolio');
    revalidatePath('/');
    return { ok: true };
  } catch (error: unknown) {
    console.error('SYSTEM_ERR: DELETE_FAILURE — PROJECT_REMOVAL_ERROR', error);
    const message =
      error instanceof Error ? error.message : 'SYSTEM_ERR: UNKNOWN_FAILURE';
    return { ok: false, error: message };
  }
}
