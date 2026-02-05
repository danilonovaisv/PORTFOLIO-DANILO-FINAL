'use server';

import OpenAI from 'openai';
import {
  AIModel,
  AI_MODELS,
  SceneGeneratorState,
  normalizeAIModels,
} from './types';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

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

  const description = formData.get('description') as string;
  const pieceType = formData.get('pieceType') as string;
  const model = ((formData.get('model') as AIModel) ||
    fallbackModel) as AIModel;

  if (!description || !pieceType) {
    return {
      success: false,
      error: 'Descrição e Tipo de Peça são obrigatórios.',
    };
  }

  if (!process.env.OPENAI_API_KEY) {
    return { success: false, error: 'Chave da API OpenAI não configurada.' };
  }

  // Check if model is available
  const selectedModel = modelOptions.find((item) => item.id === model);
  if (!selectedModel) {
    return {
      success: false,
      error: `Modelo inválido (${model}). Atualize a página e tente novamente.`,
    };
  }

  if (!selectedModel?.available) {
    return {
      success: false,
      error: `O modelo "${selectedModel?.name || model}" ainda não está disponível. Use DALL-E 3.`,
    };
  }

  const PROMPT_INSTRUCTION = `
    Crie 3 variações de cenas publicitárias fotorrealistas baseadas nestes detalhes:
    TIPO DE PEÇA: ${pieceType}
    DESCRIÇÃO DA CENA: ${description}

    Cena 1: Wide shot, contextual. Mostrando o ambiente.
    Cena 2: Medium shot, em uso/interação.
    Cena 3: Close-up dramático na peça.

    ESTILO: Fotorrealista, campanha publicitária high-end, iluminação cinematográfica.
    IMPORTANTE: Gere IMAGENS COMPLETAS.
  `;

  try {
    // Currently only DALL-E 3 is implemented
    if (model === 'dall-e-3') {
      const results = await Promise.all([
        openai.images.generate({
          model: 'dall-e-3',
          prompt: `${PROMPT_INSTRUCTION} (Gere a Variação 1: Wide Shot)`,
          n: 1,
          size: '1024x1024',
        }),
        openai.images.generate({
          model: 'dall-e-3',
          prompt: `${PROMPT_INSTRUCTION} (Gere a Variação 2: Medium Shot)`,
          n: 1,
          size: '1024x1024',
        }),
        openai.images.generate({
          model: 'dall-e-3',
          prompt: `${PROMPT_INSTRUCTION} (Gere a Variação 3: Close Up)`,
          n: 1,
          size: '1024x1024',
        }),
      ]);

      const images = results
        .map((res: OpenAI.Images.ImagesResponse) => res.data?.[0]?.url)
        .filter((url: string | undefined): url is string => !!url);

      return { success: true, images, model };
    }

    // Placeholder for other models
    return {
      success: false,
      error: `Modelo ${model} não implementado ainda.`,
    };
  } catch (error: unknown) {
    console.error('AI Image Generation Error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Erro ao gerar imagens.';
    return {
      success: false,
      error: errorMessage,
    };
  }
}
