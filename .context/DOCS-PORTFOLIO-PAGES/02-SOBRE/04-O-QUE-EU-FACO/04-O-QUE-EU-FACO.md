# 04-O-QUE-EU-FACO

## 0. Estrutura de arquivos da sessão

- Arquivo principal:
  - `src/components/sobre/sections/AboutWhatIDo.tsx`
- Dependências:
  - Framer Motion (`useScroll`, `useTransform`, `useSpring`)
  - `useMotionGate`

## 1. Objetivo da Página/Sessão

Transformar lista de serviços em sequência visual ritmada, reforçando domínio técnico e criativo sem quebrar a narrativa.

## 13. Estado Implementado — 2026-04-16

- Correção aplicada em `src/components/sobre/sections/AboutWhatIDo.tsx`:
  - a animação mobile voltou a usar deslocamento horizontal coerente (`x: 18 -> 0`), eliminando a regressão em que o estado inicial usava `x` e o estado final animava `y`;
  - o marquee inferior foi restringido ao desktop (`lg`) e deixa de animar quando `prefers-reduced-motion` estiver ativo.
- Ajuste de Auditoria (Sombra):
  - Refinamento de sombras para trazer o "silêncio visual máximo do Ghost". As classes `shadow-[0_22px_48px_-20px_rgba(135,5,242,0.32)]` e `shadow-[0_16px_40px_-12px_rgba(135,5,242,0.35)]` foram substituídas por variações mais leves do Tailwind como `shadow-lg shadow-purpleDetails/10` e `shadow-md shadow-purpleDetails/10`.
- Resultado esperado após esta rodada:
  - mobile/tablet com leitura mais limpa e sem ruído contínuo abaixo da pilha de cards;
  - desktop preserva a faixa complementar apenas quando ainda agrega ritmo visual à composição;
  - reduced motion mantém a seção estática, sem deriva lateral nem marquee em loop.
  - O estilo visual dos cards está muito mais aderente à estética minimalista e escura do Ghost Design.

## 14. Ajuste Tipográfico — 2026-04-20

- Correção aplicada em `src/components/sobre/sections/AboutWhatIDo.tsx`:
  - o cabeçalho desktop deixou de usar escala `text-display` e passou para hierarquia de seção (`text-h1` no título e `text-h2` na segunda linha), reduzindo a sensação de hero fora de contexto;
  - o cabeçalho mobile foi reduzido para `text-h2` + `text-h3`, preservando legibilidade sem dominar a dobra;
  - os cards desktop deixaram de usar `text-display` no número e no conteúdo, adotando `text-h3` para a numeração, `text-body-enhanced` para a palavra-chave e `text-small` para a descrição;
  - o padding horizontal dos cards desktop subiu de `px-4` para `px-5` para melhorar distribuição interna do texto após a redução tipográfica.
- Resultado esperado:
  - melhor encaixe do conteúdo dentro dos 7 cards sem sensação de aperto;
  - leitura mais estável no desktop largo e no tablet landscape;
  - maior aderência à hierarquia editorial da seção “O Que Eu Faço”.
