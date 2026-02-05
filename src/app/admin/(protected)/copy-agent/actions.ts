'use server';

import OpenAI from 'openai';

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
const MAX_REFERENCE_IMAGES = 4;
const MAX_REFERENCE_IMAGE_SIZE_BYTES = 8 * 1024 * 1024;

export type CopyAgentState = {
  success: boolean;
  content?: string;
  error?: string;
};

/**
 * PORTFOLIO CLIENT COPY AGENT
 * Generates high-end art direction portfolio copy.
 */
export async function generateProjectCopy(
  prevState: CopyAgentState,
  formData: FormData
): Promise<CopyAgentState> {
  const context = (formData.get('context') as string | null)?.trim() || '';
  const imageEntries = formData.getAll('referenceImages');
  const referenceImages = imageEntries.filter(
    (entry): entry is File => entry instanceof File && entry.size > 0
  );

  if (!context) {
    return { success: false, error: 'O contexto do projeto é obrigatório.' };
  }

  if (referenceImages.length > MAX_REFERENCE_IMAGES) {
    return {
      success: false,
      error: `Envie no máximo ${MAX_REFERENCE_IMAGES} imagens de referência.`,
    };
  }

  for (const image of referenceImages) {
    if (!ALLOWED_REFERENCE_IMAGE_TYPES.has(image.type)) {
      return {
        success: false,
        error: `Formato não suportado: ${image.name}. Use PNG, JPG, WEBP ou GIF.`,
      };
    }

    if (image.size > MAX_REFERENCE_IMAGE_SIZE_BYTES) {
      return {
        success: false,
        error: `A imagem "${image.name}" excede 8MB. Reduza o arquivo e tente novamente.`,
      };
    }
  }

  if (!process.env.OPENAI_API_KEY) {
    return { success: false, error: 'Chave da API OpenAI não configurada.' };
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
          'CONTEXTO DO PROJETO:',
          context,
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

    return { success: true, content };
  } catch (error: unknown) {
    console.error('OpenAI API Error:', error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Erro ao gerar texto. Tente novamente.';
    return {
      success: false,
      error: errorMessage,
    };
  }
}
