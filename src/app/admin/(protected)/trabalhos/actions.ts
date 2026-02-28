'use server';

import { revalidatePath } from 'next/cache';
import { upsertProject, deleteProject } from '@/lib/supabase/queries/projects';
import {
  projectMutationSchema,
  type ProjectMutationInput,
} from '@/lib/admin/schemas/project';

import { validatePayload, errorResponse } from '@/lib/admin/validation';
import { requireAdminAccess } from '@/lib/admin/server-access';
import { moveProjectFolder, deleteProjectFolder } from '@/lib/supabase/storage-utils';
import { normalizeBrand, normalizeProject } from '@/lib/assets/storagePath';

export async function upsertProjectAction(input: ProjectMutationInput) {
  const validation = validatePayload(projectMutationSchema, input);
  if (!validation.success) return validation.response;

  const {
    tags,
    client_slug: providedClientSlug,
    ...projectData
  } = validation.data;

  const client_slug =
    providedClientSlug ||
    normalizeBrand(projectData.client_name).slice(0, 120);

  const newSlug = normalizeProject(projectData.slug);

  // Normalize gallery paths in case they were modified
  let finalUrlLandscape = projectData.url_landscape;
  let finalUrlSquare = projectData.url_square;
  let finalGallery = projectData.gallery;

  try {
    const { supabase } = await requireAdminAccess({ requireServiceRole: true });

    // Check for rename to move storage
    if (input.id) {
      const { data: oldProject } = await supabase
        .from('portfolio_projects')
        .select('slug, client_slug')
        .eq('id', input.id)
        .single();

      if (oldProject) {
        // Handle both v4 and the new assets-do-projeto prefix during rename
        const oldFolderV4 = `v4/${oldProject.client_slug}/${oldProject.slug}`;
        const newFolderV4 = `v4/${client_slug}/${newSlug}`;
        const oldFolderNew = `${oldProject.client_slug}/${oldProject.slug}/assets-do-projeto`;
        const newFolderNew = `${client_slug}/${newSlug}/assets-do-projeto`;

        const replacePath = (p?: string | null) => {
          if (!p) return undefined;
          let replaced = p.replace(oldFolderV4, newFolderV4);
          replaced = replaced.replace(oldFolderNew, newFolderNew);
          return replaced || undefined;
        };

        if (oldFolderV4 !== newFolderV4) {
          await moveProjectFolder(supabase, 'portfolio-media', oldFolderV4, newFolderV4);
        }
        if (oldFolderNew !== newFolderNew) {
          await moveProjectFolder(supabase, 'portfolio-media', oldFolderNew, newFolderNew);
        }

        finalUrlLandscape = replacePath(finalUrlLandscape) ?? null;
        finalUrlSquare = replacePath(finalUrlSquare) ?? null;

        if (finalGallery && Array.isArray(finalGallery)) {
          finalGallery = finalGallery.map(item => ({
            ...item,
            path: item.path ? (replacePath(item.path) || undefined) : undefined
          }));
        }
      }
    }

    // Chama a função importada que já contém requireAdminAccess() e logAdminAudit()
    const updatedProject = await upsertProject({
      ...projectData,
      client_slug,
      slug: newSlug,
      url_landscape: finalUrlLandscape,
      url_square: finalUrlSquare,
      gallery: finalGallery as unknown as any,
      tagIds: tags,
    });

    // Revalidação de cache
    revalidatePath('/admin/trabalhos');
    revalidatePath('/portfolio');
    revalidatePath('/'); // Se estiver na home
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

    await deleteProject(id);

    if (oldProject) {
      const folderV4 = `v4/${oldProject.client_slug}/${oldProject.slug}`;
      const folderNew = `${oldProject.client_slug}/${oldProject.slug}/assets-do-projeto`;
      try {
        await deleteProjectFolder(supabase, 'portfolio-media', folderV4);
        await deleteProjectFolder(supabase, 'portfolio-media', folderNew);
      } catch (err) {
        console.error('Falha ao remover objetos do storage:', err);
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
