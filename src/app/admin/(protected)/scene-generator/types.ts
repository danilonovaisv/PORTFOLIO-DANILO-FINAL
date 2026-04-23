export type AIModel = 'nano-banana' | 'dall-e-3' | 'sora' | 'flow' | 'whisky';
export type OutputRatio = '1:1' | '16:9' | '9:16' | '4:5';

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

// All image models below use DALL-E 3 as the backend.
// The difference between them is the prompt style (aesthetic direction),
// not a distinct AI engine. This is reflected in the descriptions.
export const AI_MODELS: AIModelOption[] = [
  {
    id: 'dall-e-3',
    name: 'DALL-E 3 — Padrão',
    description: 'DALL-E 3 · Fotorrealismo premium',
    available: true,
  },
  {
    id: 'nano-banana',
    name: 'Nano Banana',
    description: 'DALL-E 3 · Estilo artístico e estilizado',
    available: true,
  },
  {
    id: 'sora',
    name: 'Sora',
    description: 'OpenAI · Geração de vídeo (indisponível)',
    available: false,
  },
  {
    id: 'flow',
    name: 'Flow',
    description: 'DALL-E 3 · Linhas orgânicas, energia e leveza',
    available: true,
  },
  {
    id: 'whisky',
    name: 'Whisky',
    description: 'DALL-E 3 · Estética cinematográfica sofisticada',
    available: true,
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

export const OUTPUT_RATIO_PRESETS: Array<{
  id: OutputRatio;
  label: string;
  description: string;
}> = [
  { id: '1:1', label: 'Quadrado', description: 'Feeds e composições centrais' },
  {
    id: '16:9',
    label: 'Landscape',
    description: 'Hero, vídeo e outdoor digital',
  },
  {
    id: '9:16',
    label: 'Vertical',
    description: 'Stories, Reels e mobile-first',
  },
  {
    id: '4:5',
    label: 'Retrato',
    description: 'Social ads e posters (gerado em 9:16)',
  },
];

export type SceneGenerationPayload = {
  model: AIModel;
  pieceType: string;
  description: string;
  batchSize: number;
  outputRatio: OutputRatio;
  referenceCount: number;
};

export type SceneGeneratorState = {
  success: boolean;
  images?: string[];
  error?: string;
  notice?: string;
  supportCode?: string;
  retryAfterSeconds?: number;
  model?: AIModel;
  requestPayload?: SceneGenerationPayload;
};

export const SCENE_CATEGORIES = [
  {
    label: 'Dispositivos Digitais',
    value: 'dispositivos_digitais',
    sub_options: [
      {
        label: 'Celular sobre mesa de trabalho',
        value: 'celular_mesa_trabalho',
      },
      { label: 'Celular sobre mesa de café', value: 'celular_mesa_cafe' },
      {
        label: 'Mão segurando celular em pé',
        value: 'mao_segurando_celular_em_pe',
      },
      {
        label: 'Mão segurando celular sentado',
        value: 'mao_segurando_celular_sentado',
      },
      {
        label: 'Notebook em mesa de escritório',
        value: 'notebook_mesa_escritorio',
      },
      {
        label: 'Desktop em estação de trabalho',
        value: 'desktop_estacao_trabalho',
      },
      {
        label: 'Tablet em ambiente criativo',
        value: 'tablet_ambiente_criativo',
      },
      { label: 'Setup com múltiplas telas', value: 'setup_multiplas_telas' },
      {
        label: 'Celular sobre bancada de cozinha',
        value: 'celular_bancada_cozinha',
      },
      { label: 'Celular em banco de praça', value: 'celular_banco_praca' },
      { label: 'Celular no painel do carro', value: 'celular_painel_carro' },
      {
        label: 'Smartwatch exibindo notificação',
        value: 'smartwatch_notificacao',
      },
      {
        label: 'Notebook em cafeteria com reflexo urbano',
        value: 'notebook_cafeteria_reflexo',
      },
      {
        label: 'Celular sobre mala em aeroporto',
        value: 'celular_mala_aeroporto',
      },
      {
        label: 'Celular na mesa de cabeceira à noite',
        value: 'celular_cabeceira_noite',
      },
    ],
  },
  {
    label: 'Social Media no Cotidiano',
    value: 'social_cotidiano',
    sub_options: [
      {
        label: 'Pessoa rolando feed no sofá',
        value: 'pessoa_rolando_feed_sofa',
      },
      {
        label: 'Selfie com celular mostrando post',
        value: 'selfie_celular_mostrando_post',
      },
      {
        label: 'Grupo de amigos vendo tela do celular',
        value: 'grupo_amigos_vendo_celular',
      },
      {
        label: 'Pessoa em café olhando Instagram',
        value: 'pessoa_cafe_instagram',
      },
      {
        label: 'Pessoa no transporte público olhando post',
        value: 'pessoa_transporte_publico_post',
      },
      {
        label: 'Pessoa deitada interagindo com stories',
        value: 'pessoa_deitada_stories',
      },
      {
        label: 'Pessoa mostrando post para atendente',
        value: 'pessoa_mostrando_post_loja',
      },
      { label: 'Pessoa usando celular na fila', value: 'pessoa_fila_celular' },
      { label: 'Casal comparando posts', value: 'casal_comparando_posts' },
      { label: 'Pessoa reagindo a post', value: 'pessoa_reagindo_post' },
    ],
  },
  {
    label: 'Mesa de Escritório / Papelaria',
    value: 'mesa_escritorio_papelaria',
    sub_options: [
      {
        label: 'Mesa minimalista com papelaria',
        value: 'mesa_minimalista_papelaria',
      },
      {
        label: 'Cartões de visita sobre madeira',
        value: 'cartoes_visita_madeira',
      },
      {
        label: 'Kit papelaria corporativa completo',
        value: 'kit_papelaria_corporativa',
      },
      {
        label: 'Mesa com notebook, bloco e caneta',
        value: 'mesa_notebook_bloco_caneta',
      },
      {
        label: 'Mesa de criação com materiais gráficos',
        value: 'mesa_criacao_materiais_graficos',
      },
      {
        label: 'Moodboard com peça aplicada',
        value: 'moodboard_peca_aplicada',
      },
      {
        label: 'Envelope personalizado aberto',
        value: 'envelope_personalizado_aberto',
      },
      {
        label: 'Planner com anúncio aplicado',
        value: 'planner_anuncio_aplicado',
      },
      {
        label: 'Sketchbook com layout impresso',
        value: 'sketchbook_layout_impresso',
      },
      {
        label: 'Flat lay com materiais gráficos',
        value: 'flat_lay_materiais_graficos',
      },
    ],
  },
  {
    label: 'Mídia Externa / Outdoor',
    value: 'midia_externa',
    sub_options: [
      {
        label: 'Outdoor em avenida movimentada de dia',
        value: 'outdoor_avenida_dia',
      },
      {
        label: 'Outdoor em avenida movimentada à noite',
        value: 'outdoor_avenida_noite',
      },
      { label: 'Painel em ponto de ônibus', value: 'painel_ponto_onibus' },
      { label: 'Mídia em estação de metrô', value: 'midia_estacao_metro' },
      { label: 'Painel em shopping center', value: 'painel_shopping_center' },
      { label: 'Empena lateral de prédio', value: 'empena_predio' },
      {
        label: 'Painel digital em aeroporto',
        value: 'painel_digital_aeroporto',
      },
      {
        label: 'Mídia em elevador corporativo',
        value: 'midia_elevador_corporativo',
      },
      {
        label: 'Adesivagem em ônibus urbano',
        value: 'adesivagem_onibus_urbano',
      },
      { label: 'Painel LED em festival', value: 'painel_led_festival' },
    ],
  },
  {
    label: 'Loja / Varejo / PDV',
    value: 'loja_varejo_pdv',
    sub_options: [
      {
        label: 'Prateleira de mercado com embalagem',
        value: 'prateleira_mercado_embalagem',
      },
      { label: 'Balcão de loja com display', value: 'balcao_loja_display' },
      {
        label: 'Ilha de produto em supermercado',
        value: 'ilha_produto_supermercado',
      },
      { label: 'Loja de rua com vitrine', value: 'loja_rua_vitrine' },
      {
        label: 'Sacola personalizada em uso',
        value: 'sacola_personalizada_uso',
      },
      { label: 'Totem digital interativo', value: 'totem_digital_interativo' },
      { label: 'Caixa de checkout com branding', value: 'checkout_branding' },
      {
        label: 'Provador com comunicação visual',
        value: 'provador_comunicacao_visual',
      },
      {
        label: 'Tela de autoatendimento com campanha',
        value: 'tela_autoatendimento_campanha',
      },
    ],
  },
];
