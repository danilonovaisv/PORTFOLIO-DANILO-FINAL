'use server';

import OpenAI from 'openai';
import { logAdminAudit } from '@/lib/admin/audit';
import { requireAdminAccess } from '@/lib/admin/server-access';
import {
  copyInputSchema,
  type CopyInput,
  validateCopyReferenceImages,
} from '@/lib/admin/schemas/copy-agent';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export type CopyAgentState = {
  success: boolean;
  content?: string;
  error?: string;
  notice?: string;
  fieldErrors?: Partial<Record<keyof CopyInput, string>>;
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

/**
 * PORTFOLIO CLIENT COPY AGENT
 * Generates high-end art direction portfolio copy.
 */
export async function generateProjectCopy(
  _prevState: CopyAgentState,
  formData: FormData
): Promise<CopyAgentState> {
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
      fieldErrors: {},
    };
  }

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

  const parsedInput = copyInputSchema.safeParse(rawInput);
  const imageEntries = formData.getAll('referenceImages');
  const referenceImages = imageEntries.filter(
    (entry): entry is File => entry instanceof File && entry.size > 0
  );

  if (!parsedInput.success) {
    const fields = parsedInput.error.flatten().fieldErrors;
    const fieldErrors: Partial<Record<keyof CopyInput, string>> = {
      projectName: fields.projectName?.[0],
      clientName: fields.clientName?.[0],
      objective: fields.objective?.[0],
      targetAudience: fields.targetAudience?.[0],
      visualConcept: fields.visualConcept?.[0],
      keyChallenges: fields.keyChallenges?.[0],
      deliverables: fields.deliverables?.[0],
      toneOfVoice: fields.toneOfVoice?.[0],
    };

    return {
      success: false,
      error: 'Revise os campos destacados antes de gerar o copy.',
      fieldErrors,
    };
  }

  const context = parsedInput.data;
  const imageValidationError = validateCopyReferenceImages(referenceImages);
  if (imageValidationError) {
    return {
      success: false,
      error: imageValidationError,
      fieldErrors: {},
    };
  }

  if (!process.env.OPENAI_API_KEY) {
    const fallbackContent = buildFallbackCopy(context);

    await logAdminAudit(supabase, user, {
      action: 'copy.generate',
      resource: 'admin_copy_agent',
      status: 'error',
      errorCode: 'missing_openai_key',
      errorMessage: 'OPENAI_API_KEY ausente',
      metadata: {
        fallbackApplied: true,
        referenceCount: referenceImages.length,
      },
    });

    return {
      success: true,
      content: fallbackContent,
      notice:
        'IA indisponível no momento. Foi gerado um rascunho base editável para não bloquear o fluxo.',
      fieldErrors: {},
    };
  }

  const SYSTEM_PROMPT = `[
# SYSTEM PROMPT — PORTFOLIO ART DIRECTION COPY AGENT

You are a specialized creative writing agent focused on crafting high-level textual presentations for Art Direction portfolio projects.

Your role is to analyze visual materials (images, videos, mockups, brand applications, environments, products, interfaces) provided by the user and generate all written content needed for a project landing page, similar in quality and depth to portfolios featured on platforms such as Awwwards, Behance Curated, Site of the Day and international design showcases.

## CORE OBJECTIVE
Create emotional, intentional and conceptually strong texts that elevate the visual work, positioning the user as a mature Art Director with a clear point of view, strategic thinking and aesthetic sensitivity.

The text must never describe images literally.  
It must reveal **intent, reasoning and creative direction** behind the work.

---

## YOUR WRITING PRINCIPLES

- Write with clarity, restraint and confidence.
- Avoid clichés, buzzwords and generic advertising language.
- Prioritize intention over execution.
- Let silence, pauses and short paragraphs guide the reading.
- Assume the reader is a creative director, curator or senior client.
- Never oversell. Let the work speak through coherence.

---

## WHAT YOU MUST ALWAYS DELIVER

For each project, generate the following sections:

### 1. Project Opening Text (Emotional)
A short, impactful introduction that sets the tone of the project.
It should express **why the project exists**, not what was delivered.

### 2. Concept & Creative Direction
Explain the central idea, the creative reasoning and the values behind the visual decisions.
Focus on:
- intention
- positioning
- point of view
- what was intentionally avoided

### 3. Visual System & Design Thinking
Describe how the identity, layout, typography, materials or visuals behave as a system.
Highlight consistency, adaptability and real-world application.

### 4. Applications & Experience
Translate how the brand or project lives across different touchpoints (physical, digital, product, environment).
Emphasize experience over aesthetics.

### 5. Closing Text
End with a sense of permanence, maturity and continuity.
Avoid slogans. Reinforce authorship and long-term vision.

---

## TONE OF VOICE

- Emotional, but controlled  
- Confident, never arrogant  
- Poetic when appropriate, clear when necessary  
- Minimalist in language, rich in meaning  

---

## WHAT TO AVOID AT ALL COSTS

- Explaining obvious visual elements
- Listing tools, software or technical specs unless explicitly requested
- Marketing jargon
- Overly long paragraphs
- Generic phrases like "clean", "modern", "innovative" without context

---

## OUTPUT FORMAT

- Use clean Markdown
- Clear section hierarchy
- Short paragraphs
- Designed for direct use in a portfolio landing page

---

## FINAL GOAL

Make the project feel intentional, curated and timeless.
The reader should finish the page feeling that the work was not made to impress — but to last.
]`;

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

    const userContent: (
      | OpenAI.Chat.Completions.ChatCompletionContentPartText
      | OpenAI.Chat.Completions.ChatCompletionContentPartImage
    )[] = [
      {
        type: 'text',
        text: [
          'CONTEXTO ESTRUTURADO DO PROJETO (JSON):',
          JSON.stringify(
            {
              project_name: context.projectName,
              client_name: context.clientName,
              objective: context.objective,
              target_audience: context.targetAudience,
              visual_concept: context.visualConcept,
              key_challenges: context.keyChallenges,
              deliverables: context.deliverables,
              tone_of_voice: context.toneOfVoice,
            },
            null,
            2
          ),
          '',
          referenceImages.length > 0
            ? `IMAGENS ANEXADAS: ${referenceImages.length}. Analise composição, tom visual, estilo e intenção para orientar o texto.`
            : 'IMAGENS ANEXADAS: nenhuma.',
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
      metadata: {
        model: 'gpt-4o',
        referenceCount: referenceImages.length,
        fallbackApplied: false,
      },
    });

    return { success: true, content, fieldErrors: {} };
  } catch (error: unknown) {
    console.error('[Admin Copy Agent] OpenAI API Error', {
      error: error instanceof Error ? error.message : 'unknown',
      referenceCount: referenceImages.length,
      projectName: context.projectName,
    });

    await logAdminAudit(supabase, user, {
      action: 'copy.generate',
      resource: 'admin_copy_agent',
      status: 'error',
      errorCode: 'openai_error',
      errorMessage:
        error instanceof Error
          ? error.message
          : 'Erro desconhecido ao gerar copy.',
      metadata: {
        fallbackApplied: true,
        referenceCount: referenceImages.length,
      },
    });

    const fallbackContent = buildFallbackCopy(context);
    return {
      success: true,
      content: fallbackContent,
      notice:
        'A geração com IA falhou nesta tentativa. Entregamos um rascunho base para edição imediata.',
      fieldErrors: {},
    };
  }
}
