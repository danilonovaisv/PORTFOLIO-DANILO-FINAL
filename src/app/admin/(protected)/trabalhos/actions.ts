'use server';

import { revalidatePath } from 'next/cache';
import { upsertProject, deleteProject } from '@/lib/supabase/queries/projects';
import {
  projectMutationSchema,
  type ProjectMutationInput,
} from '@/lib/admin/schemas/project';

import { validatePayload, errorResponse } from '@/lib/admin/validation';

export async function upsertProjectAction(input: ProjectMutationInput) {
  const validation = validatePayload(projectMutationSchema, input);
  if (!validation.success) return validation.response;

  const { tags, ...projectData } = validation.data;

  try {
    // Chama a função importada que já contém requireAdminAccess() e logAdminAudit()
    const updatedProject = await upsertProject({
      ...projectData,
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
    await deleteProject(id);
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
