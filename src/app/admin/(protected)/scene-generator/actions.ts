'use server';

import OpenAI from 'openai';
import {
  AIModel,
  AI_MODELS,
  OutputRatio,
  SceneGenerationPayload,
  SceneGeneratorState,
  normalizeAIModels,
} from './types';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

const ALLOWED_REFERENCE_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);
const MAX_REFERENCE_IMAGES = 8;
const MAX_REFERENCE_IMAGE_SIZE_BYTES = 8 * 1024 * 1024;

const OUTPUT_RATIO_SIZE_MAP: Record<
  OutputRatio,
  '1024x1024' | '1792x1024' | '1024x1792'
> = {
  '1:1': '1024x1024',
  '16:9': '1792x1024',
  '9:16': '1024x1792',
  '4:5': '1024x1024',
};

const ALLOWED_RATIOS = new Set<OutputRatio>(['1:1', '16:9', '9:16', '4:5']);
const SHOT_DIRECTIONS = [
  'Wide shot contextual',
  'Medium shot em uso/interação',
  'Close-up dramático do elemento principal',
  'Detail shot cinematográfico com foco em textura e materialidade',
] as const;

/**
 * AD SCENE GENERATOR
 * Generates realistic advertising scenes using various AI models.
 */
export async function generateAdScenes(
  prevState: SceneGeneratorState,
  formData: FormData
): Promise<SceneGeneratorState> {
  const modelOptions = normalizeAIModels(AI_MODELS);
  const fallbackModel =
    modelOptions.find((item) => item.id === 'dall-e-3' && item.available)?.id ??
    modelOptions.find((item) => item.available)?.id ??
    'dall-e-3';

  const description = ((formData.get('description') as string) || '').trim();
  const pieceType = ((formData.get('pieceType') as string) || '').trim();
  const model = ((formData.get('model') as AIModel) ||
    fallbackModel) as AIModel;
  const batchSizeRaw = Number(formData.get('batchSize') ?? 3);
  const batchSize = Number.isFinite(batchSizeRaw)
    ? Math.max(1, Math.min(4, Math.floor(batchSizeRaw)))
    : 3;
  const outputRatioRaw = (formData.get('outputRatio') as OutputRatio) || '16:9';
  const outputRatio: OutputRatio = ALLOWED_RATIOS.has(outputRatioRaw)
    ? outputRatioRaw
    : '16:9';
  const outputSize = OUTPUT_RATIO_SIZE_MAP[outputRatio];
  const imageEntries = formData.getAll('referenceImages');
  const referenceImages = imageEntries.filter(
    (entry): entry is File => entry instanceof File && entry.size > 0
  );

  if (!description || !pieceType) {
    return {
      success: false,
      error: 'Descrição e Tipo de Peça são obrigatórios.',
      requestPayload: prevState.requestPayload,
    };
  }

  if (!process.env.OPENAI_API_KEY) {
    return {
      success: false,
      error: 'Chave da API OpenAI não configurada.',
      requestPayload: prevState.requestPayload,
    };
  }

  // Check if model is available
  const selectedModel = modelOptions.find((item) => item.id === model);
  if (!selectedModel) {
    return {
      success: false,
      error: `Modelo inválido (${model}). Atualize a página e tente novamente.`,
      requestPayload: prevState.requestPayload,
    };
  }

  if (!selectedModel?.available) {
    return {
      success: false,
      error: `O modelo "${selectedModel?.name || model}" ainda não está disponível. Use DALL-E 3.`,
      requestPayload: prevState.requestPayload,
    };
  }

  if (referenceImages.length > MAX_REFERENCE_IMAGES) {
    return {
      success: false,
      error: `Envie no máximo ${MAX_REFERENCE_IMAGES} imagens de referência.`,
      requestPayload: prevState.requestPayload,
    };
  }

  for (const image of referenceImages) {
    if (!ALLOWED_REFERENCE_IMAGE_TYPES.has(image.type)) {
      return {
        success: false,
        error: `Formato não suportado em "${image.name}". Use PNG, JPG, WEBP ou GIF.`,
        requestPayload: prevState.requestPayload,
      };
    }

    if (image.size > MAX_REFERENCE_IMAGE_SIZE_BYTES) {
      return {
        success: false,
        error: `A imagem "${image.name}" excede 8MB.`,
        requestPayload: prevState.requestPayload,
      };
    }
  }

  const requestPayload: SceneGenerationPayload = {
    model,
    pieceType,
    description,
    batchSize,
    outputRatio,
    referenceCount: referenceImages.length,
  };

  const referenceSummary =
    referenceImages.length > 0
      ? referenceImages
          .map(
            (file, index) =>
              `${index + 1}. ${file.name} (${file.type}, ${(file.size / 1024 / 1024).toFixed(2)}MB)`
          )
          .join('\n')
      : 'Nenhuma referência anexada.';

  const promptBase = [
    'Crie uma cena publicitária fotorrealista e premium.',
    'Regras obrigatórias:',
    "- Sem textos ilegíveis ou marcas d'água.",
    '- Composição editorial limpa e iluminação cinematográfica.',
    '- Entregar cena completa (sem cortes).',
    '',
    'Payload estruturado:',
    JSON.stringify(requestPayload, null, 2),
    '',
    `Referências anexadas:\n${referenceSummary}`,
    '',
    `Tipo de peça: ${pieceType}`,
    `Descrição base: ${description}`,
  ].join('\n');

  try {
    // Currently only DALL-E 3 is implemented
    if (model === 'dall-e-3') {
      const results = await Promise.all(
        Array.from({ length: batchSize }, (_, index) => {
          const shot = SHOT_DIRECTIONS[index] ?? SHOT_DIRECTIONS[0];
          return openai.images.generate({
            model: 'dall-e-3',
            prompt: `${promptBase}\n\nVariação ${index + 1}: ${shot}.`,
            n: 1,
            size: outputSize,
          });
        })
      );

      const images = results
        .map((res: OpenAI.Images.ImagesResponse) => res.data?.[0]?.url)
        .filter((url: string | undefined): url is string => !!url);

      return { success: true, images, model, requestPayload };
    }

    // Placeholder for other models
    return {
      success: false,
      error: `Modelo ${model} não implementado ainda.`,
      requestPayload,
    };
  } catch (error: unknown) {
    console.error('AI Image Generation Error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Erro ao gerar imagens.';
    return {
      success: false,
      error: errorMessage,
      requestPayload,
    };
  }
}
