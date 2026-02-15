'use server';

import OpenAI from 'openai';
import { logAdminAudit } from '@/lib/admin/audit';
import { requireAdminAccess } from '@/lib/admin/server-access';
import {
  OUTPUT_RATIO_SIZE_MAP,
  outputRatioSchema,
  sceneInputSchema,
  validateSceneReferenceImages,
} from '@/lib/admin/schemas/scene-generator';
import {
  AIModel,
  AI_MODELS,
  OutputRatio,
  SceneGenerationPayload,
  SceneGeneratorState,
  normalizeAIModels,
} from './types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

const SHOT_DIRECTIONS = [
  'Wide shot contextual',
  'Medium shot em uso/interação',
  'Close-up dramático do elemento principal',
  'Detail shot cinematográfico com foco em textura e materialidade',
] as const;

const MODEL_PROMPT_STYLES: Record<AIModel, string> = {
  'dall-e-3': 'Crie uma cena publicitária fotorrealista e premium.',
  'nano-banana':
    'Crie uma cena publicitária altamente estilizada e artística. Foco em criatividade visual, cores vibrantes e composição única (estilo Nano Banana).',
  flow: 'Crie uma cena publicitária com foco em fluxo criativo dinâmico. Use linhas orgânicas, iluminação suave e dinâmica para transmitir energia e leveza.',
  whisky:
    'Crie uma cena publicitária com estética cinematográfica sofisticada. Use iluminação dramática, tons ricos, contraste elegante e textura de filme premium.',
  sora: 'Geração de vídeo não suportada neste modo.',
};

function resolveSceneModelCapabilities() {
  const hasOpenAIKey = Boolean(process.env.OPENAI_API_KEY?.trim());
  const envEnabledModels = process.env.ADMIN_ENABLED_SCENE_MODELS?.split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  const hasEnvFilter = Boolean(envEnabledModels && envEnabledModels.length > 0);
  const envEnabledSet = hasEnvFilter ? new Set(envEnabledModels) : null;

  return normalizeAIModels(AI_MODELS).map((model) => {
    const enabledByEnv = envEnabledSet ? envEnabledSet.has(model.id) : true;

    // No estado atual, todos os modelos de imagem usam backend OpenAI.
    const requiresOpenAI = model.id !== 'sora';
    const available =
      model.available &&
      enabledByEnv &&
      (requiresOpenAI ? hasOpenAIKey : false);

    return {
      ...model,
      available,
    };
  });
}

export async function getSceneModelCapabilities() {
  await requireAdminAccess();
  return resolveSceneModelCapabilities();
}

/**
 * AD SCENE GENERATOR
 * Generates realistic advertising scenes using various AI models.
 */
export async function generateAdScenes(
  prevState: SceneGeneratorState,
  formData: FormData
): Promise<SceneGeneratorState> {
  let supabase: Awaited<ReturnType<typeof requireAdminAccess>>['supabase'];
  let user: Awaited<ReturnType<typeof requireAdminAccess>>['user'];
  try {
    const access = await requireAdminAccess();
    supabase = access.supabase;
    user = access.user;
  } catch {
    return {
      success: false,
      error: 'Sessão administrativa inválida. Faça login novamente.',
      supportCode: 'SCN-UNAUTHORIZED',
      requestPayload: prevState.requestPayload,
    };
  }

  const modelOptions = resolveSceneModelCapabilities();
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
  const outputRatioResult = outputRatioSchema.safeParse(outputRatioRaw);
  const outputRatio: OutputRatio = outputRatioResult.success
    ? outputRatioResult.data
    : '16:9';
  const outputSize = OUTPUT_RATIO_SIZE_MAP[outputRatio];

  const imageEntries = formData.getAll('referenceImages');
  const referenceImages = imageEntries.filter(
    (entry): entry is File => entry instanceof File && entry.size > 0
  );

  const parsedInput = sceneInputSchema.safeParse({ description, pieceType });
  if (!parsedInput.success) {
    return {
      success: false,
      error: parsedInput.error.issues[0]?.message ?? 'Entrada inválida.',
      requestPayload: prevState.requestPayload,
    };
  }

  const imageValidationError = validateSceneReferenceImages(referenceImages);
  if (imageValidationError) {
    return {
      success: false,
      error: imageValidationError,
      requestPayload: prevState.requestPayload,
    };
  }

  const requestPayload: SceneGenerationPayload = {
    model,
    pieceType,
    description,
    batchSize,
    outputRatio,
    referenceCount: referenceImages.length,
  };

  if (!process.env.OPENAI_API_KEY) {
    await logAdminAudit(supabase, user, {
      action: 'scene.generate',
      resource: 'admin_scene_generator',
      status: 'error',
      errorCode: 'missing_openai_key',
      errorMessage: 'OPENAI_API_KEY ausente',
      metadata: requestPayload,
    });

    return {
      success: false,
      error:
        'Integração de IA indisponível no momento. Valide OPENAI_API_KEY em /admin/settings e tente novamente.',
      supportCode: 'SCN-MISSING-OPENAI',
      requestPayload,
    };
  }

  const selectedModel = modelOptions.find((item) => item.id === model);
  if (!selectedModel) {
    return {
      success: false,
      error: `Modelo inválido (${model}). Atualize a página e tente novamente.`,
      supportCode: 'SCN-INVALID-MODEL',
      requestPayload,
    };
  }

  if (!selectedModel.available) {
    const availableModels = modelOptions
      .filter((item) => item.available)
      .map((item) => item.name)
      .join(', ');

    return {
      success: false,
      error:
        availableModels.length > 0
          ? `O modelo "${selectedModel.name}" está indisponível. Use: ${availableModels}.`
          : 'Nenhum modelo de geração está disponível no momento.',
      supportCode: 'SCN-MODEL-UNAVAILABLE',
      requestPayload,
    };
  }

  const referenceSummary =
    referenceImages.length > 0
      ? referenceImages
          .map(
            (file, index) =>
              `${index + 1}. ${file.name} (${file.type}, ${(file.size / 1024 / 1024).toFixed(2)}MB)`
          )
          .join('\n')
      : 'Nenhuma referência anexada.';

  const promptStyle =
    MODEL_PROMPT_STYLES[model] || MODEL_PROMPT_STYLES['dall-e-3'];

  const promptBase = [
    promptStyle,
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
    const supportedModels = new Set<AIModel>([
      'dall-e-3',
      'nano-banana',
      'flow',
      'whisky',
    ]);

    if (supportedModels.has(model)) {
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

      await logAdminAudit(supabase, user, {
        action: 'scene.generate',
        resource: 'admin_scene_generator',
        status: 'success',
        metadata: {
          ...requestPayload,
          generatedCount: images.length,
          engine: 'dall-e-3',
        },
      });

      return { success: true, images, model, requestPayload };
    }

    await logAdminAudit(supabase, user, {
      action: 'scene.generate',
      resource: 'admin_scene_generator',
      status: 'error',
      errorCode: 'unsupported_model',
      errorMessage: `Modelo ${model} não implementado`,
      metadata: requestPayload,
    });

    return {
      success: false,
      error: `Modelo ${model} não implementado para geração de imagens.`,
      supportCode: 'SCN-MODEL-UNSUPPORTED',
      requestPayload,
    };
  } catch (error: unknown) {
    console.error('[Admin Scene Generator] AI Image Generation Error', {
      error: error instanceof Error ? error.message : 'unknown',
      requestPayload,
    });

    await logAdminAudit(supabase, user, {
      action: 'scene.generate',
      resource: 'admin_scene_generator',
      status: 'error',
      errorCode: 'generation_error',
      errorMessage:
        error instanceof Error
          ? error.message
          : 'Erro desconhecido ao gerar cenas',
      metadata: requestPayload,
    });

    return {
      success: false,
      error:
        'Falha temporária ao gerar imagens. Aguarde alguns segundos e tente novamente.',
      supportCode: 'SCN-GENERATION-ERROR',
      retryAfterSeconds: 15,
      requestPayload,
    };
  }
}
