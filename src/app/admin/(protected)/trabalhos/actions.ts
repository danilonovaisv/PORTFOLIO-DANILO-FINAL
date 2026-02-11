'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { upsertProject, deleteProject } from '@/lib/supabase/queries/projects';
import type { DbProject } from '@/types/admin';

// Definindo o schema de input baseado no formulário
const projectSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(3),
  slug: z.string().min(3),
  client_name: z.string().min(2),
  brand_name: z.string().optional().nullable(),
  year: z.coerce.number().int().optional().nullable(),
  project_type: z.string().min(2),
  short_label: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  featured_on_home: z.boolean().default(false),
  is_published: z.boolean().default(true),
  landing_page_id: z.string().optional().nullable(),
  tags: z.array(z.string()).optional(), // Array de IDs de tags
  thumbnail_path: z.string().nullable().optional(),
  hero_image_path: z.string().nullable().optional(),
  url_landscape: z.string().nullable().optional(),
  url_square: z.string().nullable().optional(),
  gallery: z
    .array(
      z.object({
        path: z.string(),
        caption: z.string().optional(),
      })
    )
    .optional()
    .nullable(),
});

export type ProjectMutationInput = z.infer<typeof projectSchema>;

export async function upsertProjectAction(input: ProjectMutationInput) {
  const result = projectSchema.safeParse(input);

  if (!result.success) {
    return {
      ok: false,
      error:
        'Dados inválidos: ' +
        result.error.issues.map((e) => e.message).join(', '),
    };
  }

  const { tags, ...projectData } = result.data;

  try {
    // Chama a função importada que já contém requireAdminAccess() e logAdminAudit()
    const updatedProject = await upsertProject({
      ...projectData,
      tagIds: tags,
    } as Partial<DbProject> & { id?: string; tagIds?: string[] });

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
