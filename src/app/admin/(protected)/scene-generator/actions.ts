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
} from '@/app/admin/(protected)/scene-generator/types';

import { getOpenAIKey } from '@/lib/admin/settings';

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

async function resolveSceneModelCapabilities() {
  const openApiKey = await getOpenAIKey();
  const hasOpenAIKey = Boolean(openApiKey?.trim());
  const envEnabledModels = process.env.ADMIN_ENABLED_SCENE_MODELS?.split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  const hasEnvFilter = Boolean(envEnabledModels && envEnabledModels.length > 0);
  const envEnabledSet = hasEnvFilter ? new Set(envEnabledModels) : null;

  return normalizeAIModels(AI_MODELS).map((model) => {
    const enabledByEnv = envEnabledSet ? envEnabledSet.has(model.id) : true;

    // Estado operacional atual: geração de imagens estável apenas via DALL-E 3.
    // Modelos alternativos permanecem visíveis, porém indisponíveis, até
    // integração backend dedicada por provedor.
    const available =
      model.id === 'dall-e-3' &&
      model.available &&
      enabledByEnv &&
      hasOpenAIKey;

    return {
      ...model,
      available,
    };
  });
}

export async function getSceneModelCapabilities() {
  await requireAdminAccess();
  return await resolveSceneModelCapabilities();
}

/**
 * AD SCENE GENERATOR
 * Generates realistic advertising scenes using various AI models.
 */

export async function generateAdScenes(
  prevState: SceneGeneratorState,
  formData: FormData
): Promise<SceneGeneratorState> {
  const access = await requireAdminAccess().catch(() => null);

  if (!access) {
    return {
      success: false,
      error: 'SYSTEM_ERR: ADMIN_SESSION_INVALID — REAUTHENTICATE',
      supportCode: 'SCN-UNAUTHORIZED',
      requestPayload: prevState.requestPayload,
    };
  }

  const { supabase, user } = access;

  const modelOptions = await resolveSceneModelCapabilities();
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
      error: parsedInput.error.issues[0]?.message ?? 'SYSTEM_ERR: INVALID_INPUT',
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

  const openApiKey = await getOpenAIKey();

  if (!openApiKey) {
    await logAdminAudit(supabase, user, {
      action: 'scene.generate',
      resource: 'admin_scene_generator',
      status: 'error',
      errorCode: 'missing_openai_key',
      errorMessage:
        'OPENAI_API_KEY ausente ou não configurada no banco de dados',
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

  const openai = new OpenAI({ apiKey: openApiKey });

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

  const promptBase = `Você é um modelo de geração de imagens especializado em criar CENAS PUBLICITÁRIAS REALISTAS.

IMPORTANTE – CONCEITO CENTRAL
--------------------------------
Você NÃO deve transformar, editar ou continuar a imagem enviada.

Em vez disso, você deve:

1. Criar cenas COMPLETAMENTE NOVAS, independentes da imagem enviada.
   - Cenas de cotidiano, lifestyle, ambientes reais (ex.: mesa de escritório, café, rua, metrô, loja, etc.).
   - Essas cenas são geradas do zero: cenário, objetos, luz, pessoas (se fizer sentido) e composição são criados por você.

2. Apenas PEGAR a imagem enviada como arquivo (a peça publicitária pronta) e APLICÁ-LA dentro dessas cenas:
   - como se fosse um post aberto na tela de um celular ou computador;
   - como um pôster na parede;
   - como um outdoor na rua;
   - como um cartão de visita sobre a mesa;
   - como uma embalagem em uma prateleira;
   - ou outro suporte publicitário adequado.

3. A imagem enviada é chamada de **ARTE_ORIGINAL**.
   - A ARTE_ORIGINAL é uma peça publicitária finalizada.
   - Ela NÃO PODE SER ALTERADA de forma alguma:
     - não mude textos,
     - não mude logos,
     - não mude cores,
     - não mude layout,
     - não redesenhe nada.
   - Use a ARTE_ORIGINAL apenas como uma imagem pronta aplicada em um objeto da cena (tela de celular, monitor, papel, painel, embalagem, papelaria etc.).

OBJETIVO
---------
Criar cenas do cotidiano, totalmente independentes da ARTE_ORIGINAL, aplicando a arte dentro dessas cenas sem alterar o conteúdo da arte.

DADOS DESTA GERAÇÃO:
- Tipo de Peça: ${pieceType}
- Descrição da Cena: ${description}
- Imagens de Referência: ${referenceSummary}
- Estilo e Payload Adicionais:
  Estilo de Modelo: ${promptStyle}
  Configuração: ${JSON.stringify(requestPayload, null, 2)}
`;

  try {
    const supportedModels = new Set<AIModel>([
      'dall-e-3',
      'nano-banana',
      'flow',
      'whisky',
    ]);

    if (supportedModels.has(model)) {
      const results: OpenAI.Images.ImagesResponse[] = [];

      // Gerar sequencialmente para evitar Rate Limits (429) do OpenAI para DALL-E 3
      for (let index = 0; index < batchSize; index++) {
        const shot = SHOT_DIRECTIONS[index] ?? SHOT_DIRECTIONS[0];
        try {
          const res = await openai.images.generate({
            model: 'dall-e-3',
            prompt:
              `${promptBase}\n\nVariação ${index + 1}: ${shot}.`.substring(
                0,
                4000
              ), // OpenAI max prompt length
            n: 1,
            size: outputSize,
          });
          results.push(res);
        } catch (err: unknown) {
          console.warn(
            `[Admin Scene Generator] Falha na variação ${index + 1}:`,
            err
          );
          // Se falhar na primeira imagem, aborta. Se falhar nas subsequentes, retorna as que deram certo.
          if (index === 0) throw err;
          break;
        }
      }

      const images = results
        .map((res) => res.data?.[0]?.url)
        .filter((url): url is string => !!url);

      if (images.length === 0) {
        throw new Error('Nenhuma imagem foi retornada pela API.');
      }

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
    let isTransient = true;
    let errorMessage =
      'Falha temporária ao gerar imagens. Aguarde alguns segundos e tente novamente.';
    let supportCode = 'SCN-GENERATION-ERROR';

    if (error instanceof OpenAI.APIError) {
      if (error.status === 400) {
        isTransient = false;
        errorMessage =
          'Solicitação rejeitada. Verifique se a descrição não viola as políticas de conteúdo.';
        supportCode = 'SCN-POLICY-VIOLATION';
      } else if (error.status === 401 || error.status === 403) {
        isTransient = false;
        errorMessage =
          'Erro de autenticação da IA. Verifique sua OPENAI_API_KEY nas configurações.';
        supportCode = 'SCN-AUTH-ERROR';
      } else if (error.status === 429) {
        isTransient = true;
        errorMessage =
          'Limite de uso excedido (Rate Limit) no provedor de IA. Tente novamente em alguns instantes.';
        supportCode = 'SCN-RATE-LIMIT';
      } else {
        errorMessage = `Erro do provedor de IA (${error.status}): ${error.message}`;
      }
    } else if (error instanceof Error) {
      if (
        error.message.toLowerCase().includes('timeout') ||
        error.message.toLowerCase().includes('fetch')
      ) {
        isTransient = true;
        errorMessage =
          'Tempo limite de conexão excedido. O servidor da IA demorou muito para responder.';
        supportCode = 'SCN-TIMEOUT';
      } else {
        errorMessage = error.message;
      }
    }

    console.error('[Admin Scene Generator] AI Image Generation Error', {
      error: error instanceof Error ? error.message : 'unknown',
      status: error instanceof OpenAI.APIError ? error.status : undefined,
      requestPayload,
    });

    await logAdminAudit(supabase, user, {
      action: 'scene.generate',
      resource: 'admin_scene_generator',
      status: 'error',
      errorCode: isTransient
        ? 'generation_error_transient'
        : 'generation_error_fatal',
      errorMessage,
      metadata: requestPayload,
    });

    return {
      success: false,
      error: errorMessage,
      supportCode,
      retryAfterSeconds: isTransient ? 15 : undefined,
      requestPayload,
    };
  }
}
