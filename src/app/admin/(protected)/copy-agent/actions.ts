'use server';

import OpenAI from 'openai';
import { logAdminAudit } from '@/lib/admin/audit';
import { requireAdminAccess } from '@/lib/admin/server-access';
import {
  copyInputSchema,
  type CopyInput,
  validateCopyReferenceImages,
} from '@/lib/admin/schemas/copy-agent';
import { validatePayload } from '@/lib/admin/validation';
import { getOpenAIKey } from '@/lib/admin/settings';

export type CopyAgentState = {
  success: boolean;
  content?: string;
  error?: string;
  notice?: string;
  fieldErrors?: Record<string, string | undefined>;
};

function buildFallbackCopy(context: CopyInput): string {
  return `## 1. Abertura do Projeto
${context.projectName} nasce para responder a um desafio concreto de posicionamento para ${context.clientName}. A direção criativa foi estruturada para sustentar presença de marca com clareza e consistência.

## 2. Conceito e Direção Criativa
O objetivo central foi ${context.objective}. A narrativa visual foi orientada para ${context.targetAudience}, priorizando decisão estratégica e leitura imediata em diferentes contextos de uso.

## 3. Sistema Visual e Lógica de Design
O sistema foi construído a partir de ${context.visualConcept}. As escolhas reforçam coerência entre forma e mensagem, mantendo flexibilidade para evolução sem perder assinatura.

## 4. Aplicações e Experiência
Na execução, os principais desafios foram ${context.keyChallenges}. Os entregáveis ${context.deliverables ? `(${context.deliverables})` : ''} foram pensados como um ecossistema integrado, não peças isoladas.

## 5. Fechamento
Resultado orientado por direção, não por excesso. Um projeto desenhado para permanecer relevante com consistência editorial e intenção clara.${context.toneOfVoice ? `\n\n_Tom aplicado: ${context.toneOfVoice}_` : ''}`;
}

const SYSTEM_PROMPT = `You are a portfolio case copy agent specialized in Art Direction and Visual Design projects.

## Mission
Generate winning, curated portfolio texts (modal posts and full landing pages) based on:
1. the user's project info (brief + metadata),
2. the visual materials provided (images/videos/mockups),
3. the required output fields and formats.

## Non-negotiable output rule
You MUST always output exactly the fields defined by the selected template (MODAL or LANDING PAGE).  
Never omit fields. Never change field names. Never add extra sections outside the template.  
If information is missing, infer carefully from visuals and write responsibly without inventing fake data (dates, metrics, awards, client approvals). Use "(não informado)" when needed.

## Writing style
- Language: Portuguese (pt-BR).
- Tone: mature, strategic, authored; emotional with restraint.
- Do NOT describe visuals literally (no "na imagem vemos...").
- Focus on intent, concept, direction, decisions, system thinking, and impact.
- Avoid empty adjectives (clean/modern/innovative) unless anchored in meaning.
- Short paragraphs, scannable, confident.

## SEO & Metadata
Always generate:
- Slug (lowercase, hyphen-separated, no accents)
- Tags (8–14, mix of craft + category + industry + deliverables)
- SEO Title (max ~60 chars)
- SEO Description (max ~155 chars)
- SEO Keywords (10–16 keywords)

## Visual analysis behavior
When visuals are provided:
- Identify: category (branding/campaign/packaging/event/digital/etc.), mood, key symbolisms, dominant palette cues, narrative tone, system applications, and intended audience.
- Use these insights to support concept & direction.

You must always ask yourself internally:
- "Does this read like a senior portfolio case?"
- "Is the concept defendable and consistent with the visuals?"
- "Did I follow the exact fields and naming?"

Deliver only the final formatted output in Markdown.
`;

export async function generateProjectCopy(
  _prevState: CopyAgentState,
  formData: FormData
): Promise<CopyAgentState> {
  const access = await requireAdminAccess().catch(() => null);
  if (!access) {
    return {
      success: false,
      error: 'Sessão administrativa inválida. Faça login novamente.',
    };
  }
  const { supabase, user } = access;

  const rawInput: CopyInput = {
    projectName: (formData.get('projectName') as string | null)?.trim() || '',
    clientName: (formData.get('clientName') as string | null)?.trim() || '',
    objective: (formData.get('objective') as string | null)?.trim() || '',
    targetAudience:
      (formData.get('targetAudience') as string | null)?.trim() || '',
    visualConcept:
      (formData.get('visualConcept') as string | null)?.trim() || '',
    keyChallenges:
      (formData.get('keyChallenges') as string | null)?.trim() || '',
    deliverables: (formData.get('deliverables') as string | null)?.trim() || '',
    toneOfVoice: (formData.get('toneOfVoice') as string | null)?.trim() || '',
    outputType: formData.get('outputType') === 'modal' ? 'modal' : 'landing',
    youtubeUrl: (formData.get('youtubeUrl') as string | null)?.trim() || '',
  };

  const validation = validatePayload(copyInputSchema, rawInput);
  if (!validation.success) {
    return {
      success: false,
      error: validation.response.error,
    };
  }

  const context = validation.data;
  const imageEntries = formData.getAll('referenceImages');
  const referenceImages = imageEntries.filter(
    (entry): entry is File => entry instanceof File && entry.size > 0
  );

  const imageValidationError = validateCopyReferenceImages(referenceImages);
  if (imageValidationError) {
    return { success: false, error: imageValidationError };
  }

  const openApiKey = await getOpenAIKey();
  if (!openApiKey) {
    const fallbackContent = buildFallbackCopy(context);
    await logAdminAudit(supabase, user, {
      action: 'copy.generate',
      resource: 'admin_copy_agent',
      status: 'error',
      errorCode: 'missing_openai_key',
      errorMessage:
        'OPENAI_API_KEY ausente ou não configurada no banco de dados',
      metadata: { fallbackApplied: true },
    });
    return {
      success: true,
      content: fallbackContent,
      notice:
        'IA indisponível no momento (Chave Ausente). Foi gerado um rascunho base editável.',
    };
  }

  const openai = new OpenAI({ apiKey: openApiKey });

  try {
    const imageParts = await Promise.all(
      referenceImages.map(async (image) => {
        const imageBuffer = Buffer.from(await image.arrayBuffer());
        const imageBase64 = imageBuffer.toString('base64');
        return {
          type: 'image_url' as const,
          image_url: {
            url: `data:${image.type};base64,${imageBase64}`,
            detail: 'high' as const,
          },
        };
      })
    );

    let youtubeContext = '';
    if (context.youtubeUrl) {
      youtubeContext = `\nURL DO VÍDEO YOUTUBE DE REFERÊNCIA (Para contexto geral):\n${context.youtubeUrl}\n`;
    }

    const outputFormat =
      context.outputType === 'landing'
        ? `
### OUTPUT OBRIGATÓRIO (não mude os nomes)
Gere os campos abaixo:

SLUG:
TAGS:
SEO TITLE:
SEO DESCRIPTION:
SEO KEYWORDS:

TÍTULO DO PROJETO:
SUBTÍTULO:
RESUMO:
HEADLINE DA INTRODUÇÃO:
PARÁGRAFOS DA INTRODUÇÃO:

BLOCO 2 · TEXTO PURO (Markdown):

BLOCO 4 · FAIXA DE CITAÇÃO:
CITAÇÃO:
TEXTO DE APOIO:

BLOCOS 6 OU 7 · TEXTO + IMAGEM:
TEXTO:

TEXTO DO CTA FINAL:
`
        : `
### OUTPUT OBRIGATÓRIO (não mude os nomes)
Gere os campos abaixo:

SLUG:
TAGS:
SEO TITLE:
SEO DESCRIPTION:
SEO KEYWORDS:

TÍTULO:
SHORT LABEL:
DESCRIÇÃO:
CORPO DO CASE (Markdown):
CAPTION DAS IMAGENS E VIDEOS QUE SERÃO POSTADOS:
`;

    const userContent: any[] = [
      {
        type: 'text',
        text: [
          `TIPO DE SAÍDA: ${context.outputType === 'landing' ? 'LANDING PAGE (V3 ALPA)' : 'MODAL'}`,
          '',
          'INFORMAÇÕES BÁSICAS (JSON):',
          JSON.stringify(
            {
              'Projeto (nome)': context.projectName,
              'Cliente / Marca': context.clientName,
              'Objetivo do projeto': context.objective,
              'Público-alvo': context.targetAudience,
              'Conceito Visual': context.visualConcept,
              Desafios: context.keyChallenges,
              Entregas: context.deliverables,
              'Tom desejado': context.toneOfVoice,
            },
            null,
            2
          ),
          '',
          youtubeContext,
          '',
          outputFormat,
          '',
          `IMAGENS ANEXADAS: ${referenceImages.length}.`,
          'Gere o texto final em português (pt-BR).',
        ].join('\n'),
      },
      ...imageParts,
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userContent },
      ],
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content || '';

    await logAdminAudit(supabase, user, {
      action: 'copy.generate',
      resource: 'admin_copy_agent',
      status: 'success',
      metadata: { model: 'gpt-4o', referenceCount: referenceImages.length },
    });

    return { success: true, content };
  } catch (error: unknown) {
    console.error('[Admin Copy Agent] OpenAI API Error', error);
    await logAdminAudit(supabase, user, {
      action: 'copy.generate',
      resource: 'admin_copy_agent',
      status: 'error',
      errorCode: 'openai_error',
      errorMessage: error instanceof Error ? error.message : 'unknown',
    });

    return {
      success: true,
      content: buildFallbackCopy(context),
      notice:
        'A geração com IA falhou nesta tentativa. Entregamos um rascunho base.',
    };
  }
}
