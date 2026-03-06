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
        'Já existe um projeto com este slug/nome. Por favor, mude o slug do projeto.'
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

    if (input.id) {
      const { data: oldProject } = await supabase
        .from('portfolio_projects')
        .select(
          'slug, client_slug, url_landscape, url_square, gallery, home_featured'
        )
        .eq('id', input.id)
        .single();

      if (oldProject) {
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
        const oldNew = `${oldProject.client_slug}/${oldProject.slug}/assets-do-projeto`;
        const newNew = `${client_slug}/${newSlug}/assets-do-projeto`;
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
        '[Trabalhos] Partial storage rename failure — files still at old path:',
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
          '[Trabalhos] Partial storage cleanup failure — orphaned files may remain:',
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

    return { ok: true as const, data: updatedProject };
  } catch (error: unknown) {
    return errorResponse('Erro ao salvar projeto.', error);
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
      const folderNew = `${oldProject.client_slug}/${oldProject.slug}/assets-do-projeto`;
      const folderProjects = `${oldProject.client_slug}/projects/${oldProject.slug}`;

      const results = await Promise.allSettled([
        deleteProjectFolder(supabase, 'portfolio-media', folderV4),
        deleteProjectFolder(supabase, 'portfolio-media', folderNew),
        deleteProjectFolder(supabase, 'portfolio-media', folderProjects),
      ]);

      const failures = results.filter((r) => r.status === 'rejected');
      if (failures.length > 0) {
        console.error(
          '[Trabalhos] Partial storage delete failure — orphaned files may remain:',
          failures
        );
      }
    }

    revalidatePath('/admin/trabalhos');
    revalidatePath('/portfolio');
    revalidatePath('/');
    return { ok: true };
  } catch (error: unknown) {
    console.error('Erro ao deletar projeto:', error);
    const message =
      error instanceof Error ? error.message : 'Erro desconhecido';
    return { ok: false, error: message };
  }
}
