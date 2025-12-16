import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase, numbers, and hyphens'),
  content: z.any().optional(), // JSON content from TipTap/EditorJS
  cover_image: z.string().optional(),
  published: z.boolean().default(false),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

// Form input values (pre-parse)
export type PostFormData = z.input<typeof postSchema>;
// Parsed payload with defaults applied
export type PostFormPayload = z.output<typeof postSchema>;
