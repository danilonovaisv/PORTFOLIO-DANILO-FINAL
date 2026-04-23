import { z } from 'zod';

export const ALLOWED_REFERENCE_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

export const MAX_REFERENCE_IMAGES = 8;
export const MAX_REFERENCE_IMAGE_SIZE_BYTES = 8 * 1024 * 1024;
export const MAX_TOTAL_REFERENCE_IMAGES_BYTES = 32 * 1024 * 1024;

export const sceneInputSchema = z.object({
  description: z
    .string()
    .trim()
    .min(12, 'SYSTEM_ERR: DESCRIPTION_REQUIRED')
    .max(1200, 'SYSTEM_ERR: MAX_LENGTH_EXCEEDED (1200)'),
  pieceType: z
    .string()
    .trim()
    .min(2, 'SYSTEM_ERR: PIECE_TYPE_REQUIRED')
    .max(120, 'SYSTEM_ERR: MAX_LENGTH_EXCEEDED (120)'),
});

export const outputRatioSchema = z.enum(['1:1', '16:9', '9:16', '4:5']);
type SceneOutputRatio = z.infer<typeof outputRatioSchema>;

/**
 * Maps output ratios to DALL-E 3 supported sizes.
 * DALL-E 3 only supports: 1024x1024, 1792x1024, 1024x1792.
 *
 * 4:5 (portrait 0.8) maps to 1024x1792 (portrait 9:16) — closest portrait option.
 * Previously mapped to 1024x1024 (square), which was incorrect.
 */
export const OUTPUT_RATIO_SIZE_MAP: Record<
  SceneOutputRatio,
  '1024x1024' | '1792x1024' | '1024x1792'
> = {
  '1:1': '1024x1024',
  '16:9': '1792x1024',
  '9:16': '1024x1792',
  '4:5': '1024x1792', // portrait — DALL-E 3 has no native 4:5; use closest portrait
};

export type ReferenceImageLike = {
  name: string;
  size: number;
  type: string;
};

export function validateSceneReferenceImages(
  referenceImages: ReferenceImageLike[]
): string | null {
  if (referenceImages.length > MAX_REFERENCE_IMAGES) {
    return `SYSTEM_ERR: MAX_REFERENCES_EXCEEDED (${MAX_REFERENCE_IMAGES})`;
  }

  for (const image of referenceImages) {
    if (!ALLOWED_REFERENCE_IMAGE_TYPES.has(image.type)) {
      return `SYSTEM_ERR: UNSUPPORTED_FORMAT (${image.name}) — USE: PNG, JPG, WEBP, GIF`;
    }

    if (image.size > MAX_REFERENCE_IMAGE_SIZE_BYTES) {
      return `SYSTEM_ERR: FILE_TOO_LARGE (${image.name}) — MAX: 8MB`;
    }
  }

  const totalSize = referenceImages.reduce((acc, image) => acc + image.size, 0);
  if (totalSize > MAX_TOTAL_REFERENCE_IMAGES_BYTES) {
    return 'SYSTEM_ERR: TOTAL_BATCH_SIZE_EXCEEDED — MAX: 32MB';
  }

  return null;
}
