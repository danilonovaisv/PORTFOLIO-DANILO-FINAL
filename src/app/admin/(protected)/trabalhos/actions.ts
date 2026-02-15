'use server';

import { revalidatePath } from 'next/cache';
import { upsertProject, deleteProject } from '@/lib/supabase/queries/projects';
import {
  projectMutationSchema,
  type ProjectMutationInput,
} from '@/lib/admin/schemas/project';

export async function upsertProjectAction(input: ProjectMutationInput) {
  const result = projectMutationSchema.safeParse(input);

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => {
        const path = issue.path.join('.');
        return path ? `${path}: ${issue.message}` : issue.message;
      })
      .join('; ');

    return {
      ok: false,
      error: `Dados inválidos: ${issues}`,
    };
  }

  const { tags, ...projectData } = result.data;

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

    return { ok: true, data: updatedProject };
  } catch (error: unknown) {
    console.error('Erro ao salvar projeto:', error);
    const message =
      error instanceof Error ? error.message : 'Erro ao salvar projeto.';
    return {
      ok: false,
      error: message,
    };
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
