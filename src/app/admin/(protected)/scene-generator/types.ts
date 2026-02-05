export type AIModel = 'nano-banana' | 'dall-e-3' | 'sora' | 'flow' | 'whisky';

export type AIModelOption = {
  id: AIModel;
  name: string;
  description: string;
  available: boolean;
};

const AI_MODEL_IDS = new Set<AIModel>([
  'nano-banana',
  'dall-e-3',
  'sora',
  'flow',
  'whisky',
]);

export const AI_MODELS: AIModelOption[] = [
  {
    id: 'dall-e-3',
    name: 'DALL-E 3',
    description: 'OpenAI - Alta qualidade, fotorrealismo',
    available: true,
  },
  {
    id: 'nano-banana',
    name: 'Nano Banana',
    description: 'Custom - Estilizado, artístico',
    available: false,
  },
  {
    id: 'sora',
    name: 'Sora',
    description: 'OpenAI - Geração de vídeo (Beta)',
    available: false,
  },
  {
    id: 'flow',
    name: 'Flow',
    description: 'Custom - Fluxo criativo dinâmico',
    available: false,
  },
  {
    id: 'whisky',
    name: 'Whisky',
    description: 'Custom - Estética cinematográfica',
    available: false,
  },
];

function isAIModelOption(value: unknown): value is AIModelOption {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const option = value as Partial<AIModelOption>;
  return (
    typeof option.id === 'string' &&
    AI_MODEL_IDS.has(option.id as AIModel) &&
    typeof option.name === 'string' &&
    typeof option.description === 'string' &&
    typeof option.available === 'boolean'
  );
}

export function normalizeAIModels(value: unknown): AIModelOption[] {
  if (Array.isArray(value)) {
    const normalized = value.filter(isAIModelOption);
    return normalized.length > 0 ? normalized : AI_MODELS;
  }

  if (value && typeof value === 'object') {
    const normalized = Object.values(value).filter(isAIModelOption);
    return normalized.length > 0 ? normalized : AI_MODELS;
  }

  return AI_MODELS;
}

export type SceneGeneratorState = {
  success: boolean;
  images?: string[];
  error?: string;
  model?: AIModel;
};
