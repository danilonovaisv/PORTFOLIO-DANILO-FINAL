import { z } from 'zod';

import {
  DEFAULT_HOME_FEATURED_CARD_STYLE,
  HOME_FEATURED_CARD_STYLE_OPTIONS,
} from '@/lib/portfolio/home-featured';

export const PROJECT_TYPE_OPTIONS = [
  'Brand & Campaigns',
  'Videos & Motions',
  'Websites & Tech',
] as const;

const slugSchema = z
  .string()
  .trim()
  .min(3, 'SYSTEM_ERR: SLUG_TOO_SHORT — MINIMUM_3_CHARACTERS')
  .max(120, 'SYSTEM_ERR: SLUG_TOO_LONG — MAXIMUM_120_CHARACTERS')
  .regex(
    /^[a-z0-9-]+$/,
    'SYSTEM_ERR: INVALID_SLUG_FORMAT — USE_LOWERCASE_NUMBERS_HYPHEN'
  );

const optionalYearField = z.preprocess((value) => {
  if (value === '' || value === null || value === undefined) {
    return undefined;
  }

  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isNaN(parsed) ? value : parsed;
}, z.number().int('SYSTEM_ERR: YEAR_MUST_BE_INTEGER').min(1900, 'SYSTEM_ERR: INVALID_YEAR_RANGE').max(2100, 'SYSTEM_ERR: INVALID_YEAR_RANGE').optional());

const nullableOptionalYearField = z.preprocess((value) => {
  if (value === '' || value === null || value === undefined) {
    return null;
  }

  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isNaN(parsed) ? value : parsed;
}, z.number().int('SYSTEM_ERR: YEAR_MUST_BE_INTEGER').min(1900, 'SYSTEM_ERR: INVALID_YEAR_RANGE').max(2100, 'SYSTEM_ERR: INVALID_YEAR_RANGE').nullable().optional());

const projectBaseFieldsSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'SYSTEM_ERR: TITLE_TOO_SHORT — MINIMUM_3_CHARACTERS')
    .max(140, 'SYSTEM_ERR: TITLE_TOO_LONG — MAXIMUM_140_CHARACTERS'),
  slug: slugSchema,
  client_name: z
    .string()
    .trim()
    .min(2, 'SYSTEM_ERR: CLIENT_NAME_TOO_SHORT — MINIMUM_2_CHARACTERS')
    .max(120, 'SYSTEM_ERR: CLIENT_NAME_TOO_LONG — MAXIMUM_120_CHARACTERS'),
  client_slug: slugSchema.optional(),
  brand_name: z.string().trim().max(120).optional(),
  year: optionalYearField,
  project_type: z.string().trim().min(2).max(80),
  short_label: z.string().trim().max(120).optional(),
  description: z.string().trim().max(4000).optional(),
  featured_on_home: z.boolean().optional(),
  featured_on_portfolio: z.boolean().optional(),
  home_featured: z
    .object({
      enabled: z.boolean().optional(),
      cardStyle: z
        .enum(HOME_FEATURED_CARD_STYLE_OPTIONS)
        .default(DEFAULT_HOME_FEATURED_CARD_STYLE),
      logoPath: z.string().trim().nullable().optional(),
    })
    .optional(),
  is_published: z.boolean().optional(),
  landing_page_id: z
    .union([
      z.string().uuid('SYSTEM_ERR: INVALID_LANDING_PAGE_ID'),
      z.literal(''),
      z.null(),
    ])
    .optional(),
  tags: z.array(z.string().uuid('SYSTEM_ERR: INVALID_TAG_ID')).optional(),
  destination: z
    .object({
      type: z.enum(['modal', 'internal_landing', 'external_url', 'page']),
      url: z.string().optional(),
      landingSlug: z.string().optional(),
      openInNewTab: z.boolean().optional(),
    })
    .optional(),
  case_body: z.string().optional(),
});

const enforceFeaturedPublishedRule = (
  value: { featured_on_home?: boolean; is_published?: boolean },
  ctx: z.RefinementCtx
) => {
  if (value.featured_on_home && value.is_published === false) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'SYSTEM_ERR: FEATURED_PROJECT_MUST_BE_PUBLISHED',
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
    home_featured: z
      .object({
        enabled: z.boolean().optional(),
        cardStyle: z
          .enum(HOME_FEATURED_CARD_STYLE_OPTIONS)
          .default(DEFAULT_HOME_FEATURED_CARD_STYLE),
        logoPath: z.string().trim().nullable().optional(),
      })
      .nullable()
      .optional(),
    landing_page_id: z.preprocess(
      (value) => (value === '' ? null : value),
      z
        .string()
        .uuid('SYSTEM_ERR: INVALID_LANDING_PAGE_ID')
        .nullable()
        .optional()
    ),
    tags: z.array(z.string().uuid('SYSTEM_ERR: INVALID_TAG_ID')).optional(),
    thumbnail_path: z.string().trim().nullable().optional(),
    hero_image_path: z.string().trim().nullable().optional(),
    url_landscape: z.string().trim().nullable().optional(),
    url_square: z.string().trim().nullable().optional(),
    destination: z.any().nullable().optional(),
    case_body: z.string().nullable().optional(),
    gallery: z
      .array(
        z.object({
          path: z.string().trim().optional(),
          type: z
            .enum(['image', 'youtube', 'video'])
            .default('image')
            .optional(),
          youtube_video_id: z.string().trim().optional(),
          caption: z.string().trim().max(240).optional(),
        })
      )
      .nullable()
      .optional(),
  })
  .superRefine(enforceFeaturedPublishedRule);

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
export type ProjectMutationInput = z.infer<typeof projectMutationSchema>;
