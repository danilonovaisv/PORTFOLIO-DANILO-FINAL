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

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

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

const SYSTEM_PROMPT = `
# SYSTEM PROMPT — PORTFOLIO ART DIRECTION COPY AGENT

You are a specialized creative writing agent focused on crafting high-level textual presentations for Art Direction portfolio projects.

Your role is to analyze visual materials provided by the user and generate written content needed for a project landing page, similar in quality to platforms such as Awwwards and Behance Curated.

## CORE OBJECTIVE
Create emotional, intentional and conceptually strong texts that elevate the visual work, positioning the user as a mature Art Director.

The text must never describe images literally. It must reveal intent, reasoning and creative direction behind the work.

## YOUR WRITING PRINCIPLES
- Write with clarity, restraint and confidence.
- Avoid clichés, buzzwords and generic advertising language.
- Prioritize intention over execution.
- Assume the reader is a creative director, curator or senior client.

## WHAT YOU MUST ALWAYS DELIVER
1. Project Opening Text (Emotional)
2. Concept & Creative Direction
3. Visual System & Design Thinking
4. Applications & Experience
5. Closing Text
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

  if (!process.env.OPENAI_API_KEY) {
    const fallbackContent = buildFallbackCopy(context);
    await logAdminAudit(supabase, user, {
      action: 'copy.generate',
      resource: 'admin_copy_agent',
      status: 'error',
      errorCode: 'missing_openai_key',
      errorMessage: 'OPENAI_API_KEY ausente',
      metadata: { fallbackApplied: true },
    });
    return {
      success: true,
      content: fallbackContent,
      notice:
        'IA indisponível no momento. Foi gerado um rascunho base editável.',
    };
  }

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

    const userContent: any[] = [
      {
        type: 'text',
        text: [
          'CONTEXTO ESTRUTURADO DO PROJETO (JSON):',
          JSON.stringify(context, null, 2),
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
