import { z } from 'zod';
import type { Json } from '@/lib/supabase.types';
import {
  MASTER_PROJECT_TEMPLATE,
  MASTER_PROJECT_TEMPLATE_V2,
  MASTER_PROJECT_TEMPLATE_V3,
  MASTER_PROJECT_TEMPLATE_V3_HERO,
} from '@/types/project-template';

const mediaKind = z.enum(['image', 'video', 'youtube', 'html']);
const asset = z
  .object({
    src: z.string().optional().default(''),
    kind: z.enum(['image', 'video', 'html']).optional(),
    alt: z.string().optional(),
    poster: z.string().optional(),
    width: z.number().positive().finite().optional(),
    height: z.number().positive().finite().optional(),
  })
  .passthrough();

const block = z
  .object({
    id: z.string().min(1),
    type: z.enum([
      'text',
      'image',
      'video',
      'video-autoplay',
      'html-video',
      'image-text',
      'text-image',
      'image-image',
      'image-video',
      'video-text',
      'quote-band',
      'media-1x',
      'media-2x',
      'media-3x',
    ]),
    order: z.number().finite().optional(),
    content: z
      .object({
        text: z.string().optional(),
        text2: z.string().optional(),
        media: z.string().optional(),
        media2: z.string().optional(),
        media3: z.string().optional(),
        mediaType: mediaKind.optional(),
        mediaType2: mediaKind.optional(),
        mediaType3: mediaKind.optional(),
        html: z.string().optional(),
        html2: z.string().optional(),
        html3: z.string().optional(),
      })
      .passthrough(),
  })
  .passthrough();

const common = {
  project_slug: z.string().optional(),
  project_title: z.string().optional(),
  project_tags: z.array(z.string()).optional(),
  project_services: z.array(z.string()).optional(),
  project_year: z.number().int().finite().optional(),
  hero_cover_image: asset.optional(),
  hero_logo_image: asset.optional(),
};
const v3 = {
  ...common,
  schema_version: z.literal('3.0').optional(),
  hero_top_media: asset.extend({ html: z.string().optional() }).optional(),
  gallery_grid: z.array(block),
  intro_body: z
    .array(
      z.union([
        z.string(),
        z
          .object({
            type: z.enum(['text', 'video_youtube']),
            value: z.string(),
            settings: z
              .object({ autoplay: z.boolean().optional() })
              .passthrough()
              .optional(),
          })
          .passthrough(),
      ])
    )
    .optional(),
};

// Validate the write contract without applying the public reader's lossy defaults.
const contentShape = z.union([
  z.array(block),
  z.discriminatedUnion('template', [
    z
      .object({
        ...common,
        template: z.literal(MASTER_PROJECT_TEMPLATE),
        schema_version: z.literal('1.0').optional(),
        intro_body: z.array(z.string()).optional(),
        gallery_grid: z.array(
          asset.extend({
            id: z.string().min(1),
            layout: z.enum([
              'grid',
              'full-highlight',
              'full',
              'quote-band',
              'feature',
              'split-left',
              'split-right',
            ]),
          })
        ),
      })
      .passthrough(),
    z
      .object({
        ...common,
        template: z.literal(MASTER_PROJECT_TEMPLATE_V2),
        schema_version: z.literal('2.0').optional(),
        intro_body: z.array(z.string()).optional(),
        gallery_grid: z.array(
          asset.extend({
            id: z.string().min(1),
            layout_type: z.enum([
              'full-width',
              'contain',
              'grid-2',
              'grid-1',
              'with-features',
              'features-3',
              'quote',
              'split',
              'grid_2_col',
              'grid_1_col',
              'grid_feat',
              'grid_features_3',
              'grid_quote',
              'grid_split',
            ]),
          })
        ),
      })
      .passthrough(),
    z
      .object({ ...v3, template: z.literal(MASTER_PROJECT_TEMPLATE_V3) })
      .passthrough(),
    z
      .object({
        ...v3,
        template: z.literal(MASTER_PROJECT_TEMPLATE_V3_HERO),
      })
      .passthrough(),
  ]),
]);

function isJson(
  value: unknown,
  ancestors = new Set<object>(),
  depth = 0
): boolean {
  // Bound recursion before inspecting extension data from a mutation request.
  if (depth > 64) return false;
  if (value === null || typeof value === 'string' || typeof value === 'boolean')
    return true;
  if (typeof value === 'number') return Number.isFinite(value);
  if (typeof value !== 'object' || ancestors.has(value)) return false;
  if (
    !Array.isArray(value) &&
    Object.getPrototypeOf(value) !== Object.prototype &&
    Object.getPrototypeOf(value) !== null
  )
    return false;
  ancestors.add(value);
  const valid = Array.isArray(value)
    ? value.every((item) => isJson(item, ancestors, depth + 1))
    : Object.values(value).every(
        (item) => item === undefined || isJson(item, ancestors, depth + 1)
      );
  ancestors.delete(value);
  return valid;
}

export const landingPageContentSchema = z
  .custom<Json>(isJson, 'SYSTEM_ERR: INVALID_JSON_CONTENT')
  .superRefine((value, ctx) => {
    const result = contentShape.safeParse(value);
    if (!result.success) {
      for (const issue of result.error.issues) {
        ctx.addIssue({
          code: 'custom',
          path: issue.path,
          message: issue.message,
        });
      }
    }
  });

export const landingPageMutationSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(3).max(160),
  slug: z
    .string()
    .trim()
    .min(3)
    .max(180)
    .regex(/^[a-z0-9-]+$/, 'SYSTEM_ERR: INVALID_SLUG_FORMAT'),
  cover: z.string().trim().max(600).optional(),
  content: landingPageContentSchema,
});
