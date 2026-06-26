# 06-O-QUE-ME-MOVE

## 0. Estrutura de arquivos da seção

- Arquivos principais:
  - `src/components/sobre/sections/ManifestoScrollSection.tsx`
  - `src/components/sobre/beliefs/WhatMovesMeBackground.tsx`
  - `src/components/ui/shader-lines.tsx` (ShaderAnimation)
- Dependências:
  - Framer Motion / Motion Value
  - WebGL / Three.js (responsável pelo background dinâmico do Shader)
  - Hooks de controle de movimento (`src/hooks/useMotionGate.ts`)
- Padrão arquitetural:
  - Manifesto baseado em carrossel de texto automático (autoplay 4500ms) com efeito de revelação progressiva letra por letra (stagger) implementado via animações CSS scoped em GPU para máxima performance.

## 1. Objetivo da Página/Seção

Apresentar a filosofia de design e a visão criativa do profissional ("o que me move") em uma seção de alto impacto estético e imersivo. Substitui o antigo componente `AboutBeliefs`, eliminando o modelo 3D pesado do Ghost (que causava jank no mobile) e mantendo um fundo procedural de shaders pixelados que pulsam nas cores do Ghost Design System.

## 2. Estrutura de Conteúdo

- **Category Label:** "Direção Criativa" em caixa alta com espaçamento largo (`tracking-[0.18em]`).
- **Frases do Manifesto:** Ciclo de 4 frases sobre design e marca:
  1. _Crio o que a marca diz / antes mesmo de falar._
  2. _Transformo intenção / em presença._
  3. _Entre estética e estratégia, / eu construo percepção._
  4. _O que fica não é só a imagem. / É a sensação de marca._
- **Navegação (Dots):** 4 indicadores em formato de pílulas horizontais na parte inferior que revelam a frase ativa e permitem navegação manual.

## 3. Identidade Visual

- **Paleta de cores (GHOST-DESIGN-SYSTEM):**
  - Fundo escuro absoluto (`#040013`).
  - Textos das frases em branco de alto contraste (`#fcffff`) com sombra projetada suave em azul primário (`text-shadow: 0 0 10px rgba(0, 72, 255, 0.4)`).
  - Background de shaders gerando pulsação tonal do azul para roxo escuro.
- **WhatMovesMeBackground (CSS Radial Overlays):**
  - Glow azul central (`#0048ff22`).
  - Glow roxo inferior esquerdo (`#8705f218`).
  - Glow ciano superior direito (`#4fe6ff10`).
  - Grade e vinheta CSS para adicionar textura de grade cibernética editorial.

## 4. Interatividade & Animações

- **Transition Engine (Estágio Stagger por Letra):**
  - Cada frase tem sua entrada e saída coordenadas de forma limpa.
  - Ao transicionar de frase, ambas as linhas executam uma animação de saída de subida e desfoque (`charExit` 350ms).
  - Após 450ms, a nova frase é montada e a linha 1 inicia a entrada stagger letra por letra (`charReveal` 500ms).
  - A linha 2 inicia sua entrada imediatamente após a conclusão do texto da linha 1 (`delayTime = line1.length * 30ms + 150ms`).
- **WebGL Procedural Background:**
  - O componente `ShaderAnimation` renderiza linhas procedimentais pixeladas em WebGL que se movem de forma orgânica, fornecendo a atmosfera sem sobrecarregar a thread do processador principal.
- **Manual Trigger:**
  - O clique nos dots interrompe o ciclo automático temporizado de 4.5 segundos e navega de forma imediata e limpa para a frase selecionada.

## 5. Responsividade

- **Tipografia fluida:**
  - Aplicação de `font-size: clamp(2rem, 6.5vw, 4.5rem)` para garantir que as frases caibam na tela em qualquer dispositivo móvel ou desktop wide sem quebrar em palavras soltas órfãs.
- **Reduced Motion Support:**
  - Em dispositivos com animações reduzidas habilitadas, as transições de deslocamento vertical e desfoque são desativadas (`transform: none`, `filter: none`), mantendo apenas a alternância estática e limpa de textos.

## 6. Acessibilidade & SEO

- **Conformidade WCAG e Leitores de Tela:**
  - O painel de texto visual tem `aria-hidden="true"` para evitar que leitores de tela soem soletrando as letras individuais separadas pelos spans de animação.
  - Um elemento oculto acessível `<div className="sr-only" aria-live="polite">` anuncia textualmente a frase inteira de forma limpa no momento exato da transição do carrossel.
  - A navegação por dots é configurada com atributos de acessibilidade padrão (`role="tablist"`, `role="tab"`, `aria-selected` e `aria-controls`).
