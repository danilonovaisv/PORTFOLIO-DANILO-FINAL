# 03-ORIGEM-CRIATIVA

## 0. Estrutura de arquivos da sessão
- Arquivos principais:
  - `src/components/sobre/sections/AboutOrigin.tsx`
  - `src/components/sobre/origin/OriginComponents.tsx`
  - `src/components/sobre/origin/useOriginAnimations.ts`
  - `src/components/sobre/origin/data.ts`
- Dependências:
  - GSAP + ScrollTrigger
  - Framer Motion (mobile reveals)
  - Dynamic assets (`DynamicAssetImage`)

## 1. Objetivo da Página/Sessão
Narrar trajetória criativa em capítulos, com memória visual progressiva e leitura contemplativa.

## 2. Estrutura de Conteúdo
- Heading principal da sessão:
  - `ORIGEM` (`h2`).
- Blocos narrativos:
  - O QUE PERMANECE
  - DO TRAÇO À INTENÇÃO
  - A DESCOBERTA DO INVISÍVEL
  - EXPANSÃO COM PROPÓSITO
- Mídia:
  - 4 imagens de apoio.

## 3. Identidade Visual
- Fundo escuro + títulos em `bluePrimary`.
- Galeria sticky no desktop com máscara e blur.
- Mobile com padrão texto → imagem (stack intercalado).

## 4. Interatividade & Animações
- Desktop:
  - Sticky gallery + reveal por `clipPath` + blur controlado.
  - Sincronia por scroll em cada bloco.
- Mobile:
  - Entradas `opacity + blur + y` por viewport.
- Reduced motion:
  - Tratado no hook GSAP com durações reduzidas e easing neutro.

## 5. Responsividade
- Desktop:
  - 2 colunas (texto + galeria sticky).
- Mobile:
  - Coluna única com alternância texto/imagem.
- Gap e respiro adaptados por breakpoint.

## 6. Acessibilidade & SEO
- Uso de headings por bloco.
- Imagens com `alt` derivado do título do bloco.
- Boa legibilidade de texto sobre fundo escuro.

## 7. Integrações ou Recursos Especiais
- Imagens em tempo real via `useSiteAssetUrl` + fallback Supabase.
- Scroll animation complexa com `gsap.matchMedia`.

## 8. Considerações Técnicas
- Sessão robusta visualmente.
- Custo moderado de execução por múltiplos `ScrollTrigger`.
- Boa separação entre dados (`data.ts`), render e animação.

## 9. Componentes Interativos
| Componente | Descrição | Estados | Interações | Status |
|------------|-----------|---------|------------|--------|
| OriginInfoBlock | Bloco textual por capítulo | Idle, InView | Scroll/viewport | Implementado |
| OriginStickyGallery | Galeria fixa desktop | Hidden, Active, Transition | Scroll sincronizado com blocos | Implementado |
| OriginMask | Máscara de reveal | Covered, Uncovered | Timeline por bloco | Implementado |

## 10. Estrutura de Páginas e Navegação
- Segunda sessão da narrativa.
- Faz transição do manifesto para a legitimidade (história + método de formação).

## 11. Informações Relevantes para Compreensão da Sessão
- Referência do protótipo exige “memórias emergindo” com pin/reveal.
- As imagens de referência mostram bloco narrativo com destaque visual azul ao redor da mídia.

## 12. Análise de Inconformidades (Sessão vs Protótipo)
- Inconformidade 1 (Alta): alternância de alinhamento no desktop
  - Protótipo pede alternância explícita esquerda/direita entre blocos.
  - Implementação mantém `lg:items-end` em ambos os casos no container de bloco, reduzindo alternância real de composição.
- Inconformidade 2 (Média): transição de background por capítulo
  - Protótipo descreve variação sutil de fundo por progresso (`#040013 -> #0a001a`).
  - Implementação atual não aplica essa transição de cor da seção.
- Inconformidade 3 (Baixa): texto com erro ortográfico
  - Em `src/components/sobre/origin/data.ts` há “arte comestratégia” (faltando espaço em “com estratégia”).
- Conformidade forte:
  - Pin da galeria e reveal com máscara estão alinhados ao comportamento esperado.
