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
} as const;

export const copyInputSchema = z.object({
  projectName: z
    .string()
    .min(COPY_FIELD_LIMITS.projectName.min, 'Informe o nome do projeto.')
    .max(
      COPY_FIELD_LIMITS.projectName.max,
      `Use no máximo ${COPY_FIELD_LIMITS.projectName.max} caracteres.`
    ),
  clientName: z
    .string()
    .min(COPY_FIELD_LIMITS.clientName.min, 'Informe o cliente.')
    .max(
      COPY_FIELD_LIMITS.clientName.max,
      `Use no máximo ${COPY_FIELD_LIMITS.clientName.max} caracteres.`
    ),
  objective: z
    .string()
    .min(
      COPY_FIELD_LIMITS.objective.min,
      'Descreva o objetivo do projeto com mais contexto.'
    )
    .max(
      COPY_FIELD_LIMITS.objective.max,
      `Use no máximo ${COPY_FIELD_LIMITS.objective.max} caracteres.`
    ),
  targetAudience: z
    .string()
    .min(COPY_FIELD_LIMITS.targetAudience.min, 'Informe o público-alvo.')
    .max(
      COPY_FIELD_LIMITS.targetAudience.max,
      `Use no máximo ${COPY_FIELD_LIMITS.targetAudience.max} caracteres.`
    ),
  visualConcept: z
    .string()
    .min(
      COPY_FIELD_LIMITS.visualConcept.min,
      'Descreva o conceito visual principal.'
    )
    .max(
      COPY_FIELD_LIMITS.visualConcept.max,
      `Use no máximo ${COPY_FIELD_LIMITS.visualConcept.max} caracteres.`
    ),
  keyChallenges: z
    .string()
    .min(
      COPY_FIELD_LIMITS.keyChallenges.min,
      'Liste os principais desafios criativos/técnicos.'
    )
    .max(
      COPY_FIELD_LIMITS.keyChallenges.max,
      `Use no máximo ${COPY_FIELD_LIMITS.keyChallenges.max} caracteres.`
    ),
  deliverables: z
    .string()
    .max(
      COPY_FIELD_LIMITS.deliverables.max,
      `Use no máximo ${COPY_FIELD_LIMITS.deliverables.max} caracteres.`
    )
    .optional(),
  toneOfVoice: z
    .string()
    .max(
      COPY_FIELD_LIMITS.toneOfVoice.max,
      `Use no máximo ${COPY_FIELD_LIMITS.toneOfVoice.max} caracteres.`
    )
    .optional(),
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
    return `Envie no máximo ${MAX_REFERENCE_IMAGES} imagens de referência.`;
  }

  for (const image of referenceImages) {
    if (!ALLOWED_REFERENCE_IMAGE_TYPES.has(image.type)) {
      return `Formato não suportado: ${image.name}. Use PNG, JPG, WEBP ou GIF.`;
    }

    if (image.size > MAX_REFERENCE_IMAGE_SIZE_BYTES) {
      return `A imagem "${image.name}" excede 8MB. Reduza o arquivo e tente novamente.`;
    }
  }

  const totalSize = referenceImages.reduce((acc, image) => acc + image.size, 0);
  if (totalSize > MAX_TOTAL_REFERENCE_IMAGES_BYTES) {
    return 'Tamanho total das imagens excede 32MB. Envie menos arquivos ou comprima.';
  }

  return null;
}
