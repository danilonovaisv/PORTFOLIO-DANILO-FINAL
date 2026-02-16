# 04-PROJECT-CARDS

## 0. Estrutura de arquivos da sessão

- `src/components/portfolio/ProjectCard.tsx`
- `src/lib/utils.ts`
- `src/lib/video.ts`

## 1. Objetivo da sessão

Apresentar cada projeto como bloco editorial clicável, com metadados claros e comportamento coerente para modal/rota/externo.

## 2. Estrutura de conteúdo

- Card em `motion.button` com:
  - mídia (imagem ou vídeo)
  - overlay com categoria, título, cliente/ano, tags
- IDs de acessibilidade por card (`aria-labelledby`).

## 3. Interatividade

- Ação condicional:
  - `landingPageSlug` -> navegação para rota interna
  - `Landing Page` + link -> abre externo
  - demais -> abre modal

## 4. Motion

- Reveal em `opacity + translateY + blur`.
- `prefers-reduced-motion` reduz para fade simples.
- Easing alinhado com Ghost.

## 5. Acessibilidade

- foco visível e `aria-haspopup="dialog"` quando aplicável.
- targets clicáveis com dimensão apropriada.

## 6. Considerações técnicas

- Pontos fortes:
  - fallback de mídia e suporte a vídeo com poster/caption.
  - semântica de botão para ação principal.
- Risco:
  - lógica de detecção de landing page baseada em string pode gerar fragilidade de conteúdo.

## 7. Inconformidades observadas

- Inconformidade média: consolidar regra de roteamento em campo explícito no modelo de dados (evitar inferência por texto de tag/categoria).
