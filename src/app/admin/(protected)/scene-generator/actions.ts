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
  'Medium shot in use/interaction',
  'Dramatic close-up of the main element',
  'Cinematic detail shot focused on texture and materiality',
] as const;

const MODEL_PROMPT_STYLES: Record<AIModel, string> = {
  'dall-e-3': 'Create a photorealistic and premium advertising scene.',
  'nano-banana':
    'Create a highly stylized and artistic advertising scene. Focus on visual creativity, vibrant colors, and unique composition (Nano Banana style).',
  flow: 'Create an advertising scene with a focus on dynamic creative flow. Use organic lines, soft and dynamic lighting to convey energy and lightness.',
  whisky:
    'Create an advertising scene with a sophisticated cinematic aesthetic. Use dramatic lighting, rich tones, elegant contrast, and premium film texture.',
  sora: 'Video generation not supported in this mode.',
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

    // Current operational state: stable image generation only via DALL-E 3.
    // Alternative models remain visible but unavailable until
    // dedicated backend integration per provider is implemented.
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
      error:
        parsedInput.error.issues[0]?.message ?? 'SYSTEM_ERR: INVALID_INPUT',
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
      errorCode: 'MISSING_OPENAI_KEY',
      errorMessage: 'OPENAI_API_KEY missing or not configured in the database',
      metadata: requestPayload,
    });

    return {
      success: false,
      error:
        'SYSTEM_ERR: AI_INTEGRATION_UNAVAILABLE — VALIDATE_OPENAI_KEY_IN_SETTINGS',
      supportCode: 'SCN-MISSING-OPENAI',
      requestPayload,
    };
  }

  const openai = new OpenAI({ apiKey: openApiKey });

  const selectedModel = modelOptions.find((item) => item.id === model);
  if (!selectedModel) {
    return {
      success: false,
      error: `SYSTEM_ERR: INVALID_MODEL — MODEL_${model}_NOT_FOUND`,
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
          ? `SYSTEM_ERR: MODEL_UNAVAILABLE — MODEL_${selectedModel.name}_IS_OFFLINE. USE: ${availableModels}.`
          : 'SYSTEM_ERR: NO_GENERATION_MODELS_AVAILABLE',
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
      : 'No references attached.';

  const promptStyle =
    MODEL_PROMPT_STYLES[model] || MODEL_PROMPT_STYLES['dall-e-3'];

  const promptBase = `You are an image generation model specialized in creating REALISTIC ADVERTISING SCENES.

IMPORTANT – CENTRAL CONCEPT
--------------------------------
You must NOT transform, edit, or continue the uploaded image.

Instead, you must:

1. Create COMPLETELY NEW scenes, independent of the uploaded image.
   - Everyday scenes, lifestyle, real environments (e.g., office desk, cafe, street, subway, store, etc.).
   - These scenes are generated from scratch: the environment, objects, lighting, people (if appropriate), and composition are created by you.

2. Simply TAKE the uploaded image file (the finished advertising piece) and APPLY it within these scenes:
   - as if it were a post open on a mobile phone or computer screen;
   - as a poster on the wall;
   - as a billboard on the street;
   - as a business card on the table;
   - as packaging on a shelf;
   - or another appropriate advertising medium.

3. The uploaded image is called **ORIGINAL_ART**.
   - The ORIGINAL_ART is a finished advertising piece.
   - It MUST NOT BE ALTERED in any way:
     - do not change text,
     - do not change logos,
     - do not change colors,
     - do not change layout,
     - do not redesign anything.
   - Use ORIGINAL_ART only as a ready-made image applied to an object in the scene (phone screen, monitor, paper, panel, packaging, stationery, etc.).

OBJECTIVE
---------
Create everyday scenes, completely independent of ORIGINAL_ART, applying the art within these scenes without altering the content of the art.

GENERATION DATA:
- Piece Type: ${pieceType}
- Scene Description: ${description}
- Reference Images: ${referenceSummary}
- Additional Style and Payload:
  Model Style: ${promptStyle}
  Configuration: ${JSON.stringify(requestPayload, null, 2)}
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

      // Generate sequentially to avoid OpenAI Rate Limits (429) for DALL-E 3
      for (let index = 0; index < batchSize; index++) {
        const shot = SHOT_DIRECTIONS[index] ?? SHOT_DIRECTIONS[0];
        try {
          const res = await openai.images.generate({
            model: 'dall-e-3',
            prompt:
              `${promptBase}\n\nVariation ${index + 1}: ${shot}.`.substring(
                0,
                4000
              ), // OpenAI max prompt length
            n: 1,
            size: outputSize,
          });
          results.push(res);
        } catch (err: unknown) {
          console.warn(
            `[Admin Scene Generator] Failed at variation ${index + 1}:`,
            err
          );
          // If it fails on the first image, abort. If it fails on subsequent images, return the successful ones.
          if (index === 0) throw err;
          break;
        }
      }

      const images = results
        .map((res) => res.data?.[0]?.url)
        .filter((url): url is string => !!url);

      if (images.length === 0) {
        throw new Error('SYSTEM_ERR: NO_IMAGES_RETURNED_BY_API');
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
      errorMessage: `Model ${model} not implemented`,
      metadata: requestPayload,
    });

    return {
      success: false,
      error: `SYSTEM_ERR: MODEL_UNIMPLEMENTED — MODEL_${model}_NOT_READY`,
      supportCode: 'SCN-MODEL-UNSUPPORTED',
      requestPayload,
    };
  } catch (error: unknown) {
    let isTransient = true;
    let errorMessage =
      'SYSTEM_ERR: TRANSIENT_GENERATION_FAILURE — WAIT_AND_RETRY';
    let supportCode = 'SCN-GENERATION-ERROR';

    if (error instanceof OpenAI.APIError) {
      if (error.status === 400) {
        isTransient = false;
        errorMessage =
          'SYSTEM_ERR: REQUEST_REJECTED — CONTENT_POLICY_VIOLATION';
        supportCode = 'SCN-POLICY-VIOLATION';
      } else if (error.status === 401 || error.status === 403) {
        isTransient = false;
        errorMessage =
          'SYSTEM_ERR: AI_AUTH_ERROR — VALIDATE_OPENAI_KEY_IN_SETTINGS';
        supportCode = 'SCN-AUTH-ERROR';
      } else if (error.status === 429) {
        isTransient = true;
        errorMessage = 'SYSTEM_ERR: RATE_LIMIT_EXCEEDED — TRY_AGAIN_LATER';
        supportCode = 'SCN-RATE-LIMIT';
      } else {
        errorMessage = `SYSTEM_ERR: AI_PROVIDER_ERROR_${error.status} — ${error.message}`;
      }
    } else if (error instanceof Error) {
      if (
        error.message.toLowerCase().includes('timeout') ||
        error.message.toLowerCase().includes('fetch')
      ) {
        isTransient = true;
        errorMessage =
          'SYSTEM_ERR: CONNECTION_TIMEOUT — AI_SERVER_RESPONSE_DELAY';
        supportCode = 'SCN-TIMEOUT';
      } else {
        errorMessage = `SYSTEM_ERR: ${error.message.toUpperCase()}`;
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
