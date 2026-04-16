# 04-O-QUE-EU-FACO

## 0. Estrutura de arquivos da sessão

- Arquivo principal:
  - `src/components/sobre/sections/AboutWhatIDo.tsx`
- Dependências:
  - Framer Motion (`useScroll`, `useTransform`, `useSpring`)
  - `useMotionGate`

## 1. Objetivo da Página/Sessão

Transformar lista de serviços em sequência visual ritmada, reforçando domínio técnico e criativo sem quebrar a narrativa.

## 2. Estrutura de Conteúdo

- Título:
  - “Do insight ao impacto. Mesmo quando você não percebe.”
- Lista de 7 cards:
  - Direção, Design, Identidades, Campanhas, Branding, IA, Liderança Criativa.
- Faixa complementar:
  - Marquee de palavras-chave.

## 3. Identidade Visual

- Paleta:
  - Fundo `background`, cards `bluePrimary`, números em `purpleDetails`, keywords em `blueAccent`.
- Tom visual:
  - Denso e tecnológico, com sombras fortes.

## 4. Interatividade & Animações

- Desktop:
  - Track horizontal com drift sutil controlado por scroll vertical, mantendo todos os 7 cards visíveis desde a entrada da seção.
- Mobile:
  - Entrada lateral por card (`x: 80 -> 0`).
- Marquee:
  - Loop contínuo com pausa por hover/focus.

## 5. Responsividade

- Desktop:
  - Seção sticky de longa duração.
- Mobile:
  - Cards empilhados em largura total.
- Breakpoint principal:
  - `lg`.

## 6. Acessibilidade & SEO

- Semântica:
  - Cards como `article`.
- Leitura:
  - Contraste alto no card.
- Navegação:
  - Sem bloqueios de teclado.

## 7. Integrações ou Recursos Especiais

- Sessão autônoma sem chamadas externas.
- Motion gate aplicado para reduzir deslocamento.

## 8. Considerações Técnicas

- Boa performance geral por uso de `transform`.
- A seção desktop foi reduzida para `180vh` para eliminar “scroll morto” e preservar ritmo visual.

## 9. Componentes Interativos

| Componente    | Descrição                     | Estados         | Interações                 | Status       |
| ------------- | ----------------------------- | --------------- | -------------------------- | ------------ |
| Cards Desktop | Serviços em trilha horizontal | Hidden, Active  | Scroll vertical controla X | Implementado |
| Cards Mobile  | Lista empilhada               | Hidden, Visible | Reveal por viewport        | Implementado |
| Marquee       | Faixa de keywords             | Running, Paused | Hover/focus pausa          | Implementado |

## 10. Estrutura de Páginas e Navegação

- Terceira sessão de conteúdo.
- Transição entre narrativa pessoal (`Origem`) e racionalização de oferta.

## 11. Informações Relevantes para Compreensão da Sessão

- O protótipo define movimento horizontal no desktop e vertical no mobile.
- As imagens de referência mostram barras azuis numeradas coerentes com esta sessão.

## 12. Análise de Inconformidades (Sessão vs Protótipo)

- Inconformidade 1 (Baixa): elemento extra não previsto
  - Marquee inferior não aparece como requisito explícito no protótipo.
- Inconformidade 2 (Baixa): estilo de card ainda pode ser refinado
  - As sombras continuam mais presentes do que no silêncio visual máximo do Ghost.
- Conformidade forte:
  - Sequência dos 7 itens e estrutura geral estão alinhadas.
  - Cards desktop agora entram visíveis no primeiro viewport útil, alinhando a leitura com a referência visual.

## 13. Estado Implementado — 2026-04-16

- Correção aplicada em `src/components/sobre/sections/AboutWhatIDo.tsx`:
  - a animação mobile voltou a usar deslocamento horizontal coerente (`x: 18 -> 0`), eliminando a regressão em que o estado inicial usava `x` e o estado final animava `y`;
  - o marquee inferior foi restringido ao desktop (`lg`) e deixa de animar quando `prefers-reduced-motion` estiver ativo.
- Resultado esperado após esta rodada:
  - mobile/tablet com leitura mais limpa e sem ruído contínuo abaixo da pilha de cards;
  - desktop preserva a faixa complementar apenas quando ainda agrega ritmo visual à composição;
  - reduced motion mantém a seção estática, sem deriva lateral nem marquee em loop.
