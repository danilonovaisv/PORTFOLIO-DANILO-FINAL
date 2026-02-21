import { z } from 'zod';

export const PROJECT_TYPE_OPTIONS = [
  'Branding & Identity',
  'Campanhas & Advertising',
  'Web & Digital',
  'Motion & Video',
  'Institucional & Retail',
] as const;

const slugSchema = z
  .string()
  .trim()
  .min(3, 'Slug precisa ter ao menos 3 caracteres.')
  .max(120, 'Slug deve ter no máximo 120 caracteres.')
  .regex(
    /^[a-z0-9-]+$/,
    'Slug deve conter apenas letras minúsculas, números e hífen.'
  );

const optionalYearField = z.preprocess((value) => {
  if (value === '' || value === null || value === undefined) {
    return undefined;
  }

  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isNaN(parsed) ? value : parsed;
}, z.number().int('Ano precisa ser inteiro.').min(1900, 'Ano inválido.').max(2100, 'Ano inválido.').optional());

const nullableOptionalYearField = z.preprocess((value) => {
  if (value === '' || value === null || value === undefined) {
    return null;
  }

  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isNaN(parsed) ? value : parsed;
}, z.number().int('Ano precisa ser inteiro.').min(1900, 'Ano inválido.').max(2100, 'Ano inválido.').nullable().optional());

const projectBaseFieldsSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Título precisa ter ao menos 3 caracteres.')
    .max(140, 'Título deve ter no máximo 140 caracteres.'),
  slug: slugSchema,
  client_name: z
    .string()
    .trim()
    .min(2, 'Cliente precisa ter ao menos 2 caracteres.')
    .max(120, 'Cliente deve ter no máximo 120 caracteres.'),
  brand_name: z.string().trim().max(120).optional(),
  year: optionalYearField,
  project_type: z.string().trim().min(2).max(80),
  short_label: z.string().trim().max(120).optional(),
  description: z.string().trim().max(4000).optional(),
  featured_on_home: z.boolean().optional(),
  is_published: z.boolean().optional(),
  landing_page_id: z
    .union([z.string().uuid('Landing page inválida.'), z.literal(''), z.null()])
    .optional(),
  tags: z.array(z.string().uuid('Tag inválida.')).optional(),
});

const enforceFeaturedPublishedRule = (
  value: { featured_on_home?: boolean; is_published?: boolean },
  ctx: z.RefinementCtx
) => {
  if (value.featured_on_home && value.is_published === false) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Um projeto em destaque na Home precisa estar publicado.',
      path: ['featured_on_home'],
    });
  }
};

const projectBaseSchema = projectBaseFieldsSchema.superRefine(
  enforceFeaturedPublishedRule
);

export const projectFormSchema = projectBaseSchema;

// Mutation schema uses spread-shape pattern instead of .safeExtend() because
// the mutation deliberately widens some field types (e.g., adding .nullable())
// which .safeExtend() in Zod v4 correctly rejects as non-assignable.
export const projectMutationSchema = z
  .object({
    ...projectBaseFieldsSchema.shape,
    id: z.string().uuid().optional(),
    year: nullableOptionalYearField,
    brand_name: z.string().trim().max(120).nullable().optional(),
    short_label: z.string().trim().max(120).nullable().optional(),
    description: z.string().trim().max(4000).nullable().optional(),
    landing_page_id: z.preprocess(
      (value) => (value === '' ? null : value),
      z.string().uuid('Landing page inválida.').nullable().optional()
    ),
    tags: z.array(z.string().uuid('Tag inválida.')).optional(),
    thumbnail_path: z.string().trim().nullable().optional(),
    hero_image_path: z.string().trim().nullable().optional(),
    url_landscape: z.string().trim().nullable().optional(),
    url_square: z.string().trim().nullable().optional(),
    gallery: z
      .array(
        z.object({
          path: z.string().trim().min(1, 'Path da galeria é obrigatório.'),
          caption: z.string().trim().max(240).optional(),
        })
      )
      .nullable()
      .optional(),
  })
  .superRefine(enforceFeaturedPublishedRule);

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
export type ProjectMutationInput = z.infer<typeof projectMutationSchema>;
