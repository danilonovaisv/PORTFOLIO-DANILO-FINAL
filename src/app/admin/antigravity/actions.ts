'use server';

import OpenAI from 'openai';

// Initialize OpenAI client
// Note: Ensure OPENAI_API_KEY is set in .env.local
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export type CopyAgentState = {
  success: boolean;
  content?: string;
  error?: string;
};

export type SceneGeneratorState = {
  success: boolean;
  images?: string[];
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
  const context = formData.get('context') as string;

  if (!context) {
    return { success: false, error: 'O contexto do projeto é obrigatório.' };
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
- Generic phrases like “clean”, “modern”, “innovative” without context

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
    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // Or 'gpt-4-turbo'
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `CONTEXTO DO PROJETO:\n${context}` },
      ],
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content || '';

    return { success: true, content };
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    return {
      success: false,
      error: error.message || 'Erro ao gerar texto. Tente novamente.',
    };
  }
}

/**
 * AD SCENE GENERATOR
 * Generates realistic advertising scenes using DALL-E 3.
 */
export async function generateAdScenes(
  prevState: SceneGeneratorState,
  formData: FormData
): Promise<SceneGeneratorState> {
  const description = formData.get('description') as string;
  const pieceType = formData.get('pieceType') as string;

  if (!description || !pieceType) {
    return {
      success: false,
      error: 'Descrição e Tipo de Peça são obrigatórios.',
    };
  }

  if (!process.env.OPENAI_API_KEY) {
    return { success: false, error: 'Chave da API OpenAI não configurada.' };
  }

  // NOTE: DALL-E 3 does not support uploading an image to "place" into a scene exactly as requested
  // without using the edit endpoint which requires a mask, or fine-tuning.
  // The documentation request implies sending an image ("ARTE_ORIGINAL"), but DALL-E 3 via API
  // is primarily text-to-image.
  // For this implementation, we will focus on generating the high-fidelity SCENE based on the description
  // using the detailed system prompt logic to guide the generation, acknowledging that the "ARTE_ORIGINAL" replacement
  // might need a more complex pipeline (like keeping the generated scene and compositing the art manually or using a different tool).
  // However, we will instruct DALL-E to generate the scene AS IF the art were there, or generate a placeholder.

  // To strictly follow the "Ad Scene Generator" prompt behavior requested:
  // We will construct a prompt that describes the scene vividly.

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

  // Since DALL-E 3 generates one image per request usually (or we iterate),
  // and it's quite expensive/slow, we will generate ONE representative image for now
  // or loop 3 times if strictly required.
  // The requirement says "Galeria para exibir as 3 imagens".
  // Let's try to generate 3 parallel requests or 1 request if limited.
  // DALL-E 3 standard allows n=1. So we need 3 requests.

  try {
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

    return { success: true, images };
  } catch (error: any) {
    console.error('OpenAI Image API Error:', error);
    return {
      success: false,
      error: error.message || 'Erro ao gerar imagens.',
    };
  }
}
