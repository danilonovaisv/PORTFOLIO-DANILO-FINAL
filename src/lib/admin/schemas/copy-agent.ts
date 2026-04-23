import { z } from 'zod';

export const ALLOWED_REFERENCE_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

export const MAX_REFERENCE_IMAGES = 4;
export const MAX_REFERENCE_IMAGE_SIZE_BYTES = 8 * 1024 * 1024;
export const MAX_TOTAL_REFERENCE_IMAGES_BYTES = 32 * 1024 * 1024;

export const COPY_FIELD_LIMITS = {
  projectName: { min: 2, max: 120 },
  clientName: { min: 2, max: 120 },
  objective: { min: 12, max: 600 },
  targetAudience: { min: 4, max: 300 },
  visualConcept: { min: 12, max: 600 },
  keyChallenges: { min: 12, max: 600 },
  deliverables: { max: 300 },
  toneOfVoice: { max: 180 },
  youtubeUrl: { max: 500 },
} as const;

/** Validates that a YouTube URL belongs to a known YouTube hostname. */
function isValidYouTubeUrl(val: string): boolean {
  try {
    const url = new URL(val);
    const validHostnames = new Set([
      'www.youtube.com',
      'youtube.com',
      'm.youtube.com',
      'youtu.be',
    ]);
    return validHostnames.has(url.hostname);
  } catch {
    return false;
  }
}

export const copyInputSchema = z.object({
  projectName: z
    .string()
    .min(COPY_FIELD_LIMITS.projectName.min, 'SYSTEM_ERR: PROJECT_NAME_REQUIRED')
    .max(
      COPY_FIELD_LIMITS.projectName.max,
      `SYSTEM_ERR: MAX_LENGTH_EXCEEDED (${COPY_FIELD_LIMITS.projectName.max})`
    ),
  clientName: z
    .string()
    .min(COPY_FIELD_LIMITS.clientName.min, 'SYSTEM_ERR: CLIENT_NAME_REQUIRED')
    .max(
      COPY_FIELD_LIMITS.clientName.max,
      `SYSTEM_ERR: MAX_LENGTH_EXCEEDED (${COPY_FIELD_LIMITS.clientName.max})`
    ),
  objective: z
    .string()
    .min(
      COPY_FIELD_LIMITS.objective.min,
      'SYSTEM_ERR: OBJECTIVE_DESCRIPTION_INSUFFICIENT'
    )
    .max(
      COPY_FIELD_LIMITS.objective.max,
      `SYSTEM_ERR: MAX_LENGTH_EXCEEDED (${COPY_FIELD_LIMITS.objective.max})`
    ),
  targetAudience: z
    .string()
    .min(COPY_FIELD_LIMITS.targetAudience.min, 'SYSTEM_ERR: TARGET_AUDIENCE_REQUIRED')
    .max(
      COPY_FIELD_LIMITS.targetAudience.max,
      `SYSTEM_ERR: MAX_LENGTH_EXCEEDED (${COPY_FIELD_LIMITS.targetAudience.max})`
    ),
  visualConcept: z
    .string()
    .min(
      COPY_FIELD_LIMITS.visualConcept.min,
      'SYSTEM_ERR: VISUAL_CONCEPT_REQUIRED'
    )
    .max(
      COPY_FIELD_LIMITS.visualConcept.max,
      `SYSTEM_ERR: MAX_LENGTH_EXCEEDED (${COPY_FIELD_LIMITS.visualConcept.max})`
    ),
  keyChallenges: z
    .string()
    .min(
      COPY_FIELD_LIMITS.keyChallenges.min,
      'SYSTEM_ERR: CHALLENGES_DESCRIPTION_REQUIRED'
    )
    .max(
      COPY_FIELD_LIMITS.keyChallenges.max,
      `SYSTEM_ERR: MAX_LENGTH_EXCEEDED (${COPY_FIELD_LIMITS.keyChallenges.max})`
    ),
  deliverables: z
    .string()
    .max(
      COPY_FIELD_LIMITS.deliverables.max,
      `SYSTEM_ERR: MAX_LENGTH_EXCEEDED (${COPY_FIELD_LIMITS.deliverables.max})`
    )
    .optional(),
  toneOfVoice: z
    .string()
    .max(
      COPY_FIELD_LIMITS.toneOfVoice.max,
      `SYSTEM_ERR: MAX_LENGTH_EXCEEDED (${COPY_FIELD_LIMITS.toneOfVoice.max})`
    )
    .optional(),
  outputType: z.enum(['landing', 'modal']),
  youtubeUrl: z
    .string()
    .max(
      COPY_FIELD_LIMITS.youtubeUrl.max,
      `SYSTEM_ERR: MAX_LENGTH_EXCEEDED (${COPY_FIELD_LIMITS.youtubeUrl.max})`
    )
    .refine(
      (val) => !val || isValidYouTubeUrl(val),
      'SYSTEM_ERR: INVALID_YOUTUBE_URL (EXPECTED: https://youtube.com/watch?v=...)'
    )
    .optional()
    .or(z.literal('')),
});

export type CopyInput = z.infer<typeof copyInputSchema>;

export type ReferenceImageLike = {
  name: string;
  size: number;
  type: string;
};

export function validateCopyReferenceImages(
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
