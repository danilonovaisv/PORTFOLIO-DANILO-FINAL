# **6. O Que Me Move — "About Beliefs"**

## **1. Objetivo da Página/Sessão**

### **Qual a principal função desta página/sessão?**
Gerar vínculo emocional através de um manifesto pessoal, mostrando a visão de design do Danilo de forma íntima, sensível e memorável, conectando o visitante com o "porquê" por trás do trabalho.

### **Qual ação o usuário deve realizar aqui?**
Sentir identificação com o manifesto, reforçar confiança no estilo/abordagem do estúdio e seguir naturalmente o fluxo da página até as seções de prova social (clientes) e contato, mais propenso a entrar em contato ou continuar explorando.

### **Como essa seção contribui para os objetivos do site?**
Consolida a identidade do "Ghost Design" como conceito autoral, diferencia o estúdio pelo posicionamento emocional e prepara o usuário para enxergar o resto do site (cases, serviços, contato) sob essa lente de conexão, não apenas estética.

---

## **2. Estrutura de Conteúdo**

### **Título principal (headline) — BeliefFixedHeader (sticky)**

**Texto:**
```
Acredito no design que muda o dia de alguém.
Não pelo choque, mas pela conexão.
```

- Sempre visível (sticky), funciona como "âncora" conceitual da sessão.

**Comportamento responsivo do `BeliefFixedHeader`:**

- **Desktop:**
  - Permanece sticky e **alinhado no centro (visual) com ancoragem à direita** do grid
  - Aparência "centro + direita", com `text-right` e respiro no lado esquerdo
  - Position: `sticky`, `top-24`

- **Mobile:**
  - Permanece sticky e **muda de posição para o topo e a direita da sessão** (top-right)
  - Respeitando padding do container
  - Mantém `text-right` e não disputa espaço com o bloco principal

---

### **Subtítulo ou descrição**

Não há subtítulo textual explícito; o "subtexto" é construído pela sequência de frases rotativas e pelo manifesto final "ISSO É GHOST DESIGN."

---

### **Elementos visuais (imagens, ícones, vídeos)**

#### **Fantasma 3D (Ghost)**
- Renderizado com React Three Fiber + Drei
- **Asset 3D (GLB) oficial da sessão (obrigatório):**
  - URL do Supabase Storage público:
    ```
    https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb
    ```

#### **Comportamento do Ghost:**

**O Ghost nunca para completamente:**
- Flutuação leve e constante, com leves movimentos para os lados e para cima/baixo
- Ganha velocidade e inclinação suave conforme o cursor se move (desktop) e conforme o usuário rola a página (desktop/mobile)
- Responde de forma fluida e etérea, como se "sentisse" o toque/scroll
- Entra junto com a **primeira frase** da área de manifesto e permanece presente durante a sessão
- Quando a **última frase** entra, ele cresce ~10% de escala e fica visivelmente mais animado (mais wobble/tilt e resposta mais intensa ao scroll)

**Regra de alinhamento (obrigatória) — Desktop e Mobile:**
- O Ghost 3D deve ficar **sempre alinhado verticalmente ao centro do bloco de texto à sua esquerda**
- Existe um "container de conteúdo" onde **texto (à esquerda)** e **Ghost (à direita)** coexistem
- O Ghost acompanha o **centro do texto** (não o centro da viewport)
- Se o texto quebrar linhas ou mudar de altura, o Ghost mantém-se **centralizado no eixo Y** em relação ao bloco textual

---

### **Manifesto Final**

No final, o manifesto "ISSO É / GHOST / DESIGN." sela o conceito com entrada suave usando **Morphing Text**:

**Texto em três linhas fixas:**
```
ISSO É
GHOST
DESIGN.
```

- Cada linha com comportamento responsivo automático
- Ocupando a área horizontal disponível do grid
- **Espaçamento pequeno** entre as linhas

---

### **Chamada para ação (CTA)**

- **CTA implícito (emocional):** reforçar a percepção de valor do estúdio
- Não há botão direto aqui
- O CTA funcional acontece em seções posteriores (Clientes/Contato)
- Esta sessão prepara o usuário emocionalmente para clicar lá

---

### **Texto de apoio — font-h1 — blueAccent**

**Frases rotativas (manifesto em camadas):**

1. "Um vídeo que respira."
2. "Uma marca que se reconhece."
3. "Um detalhe que fica."
4. "Crio para gerar presença."
5. "Mesmo quando não estou ali."
6. "Mesmo quando ninguém percebe o esforço."

**Manifesto final:**
```
ISSO É
GHOST
DESIGN.
```

---

### **Layout desejado**

#### **Desktop:**

- **Altura total da sessão:** ~140vh
- **Fundo base:** `#040013` (mapeado como `bg-background`)
- **Container:** 12 colunas (max-width ~1440–1680px, centrado, com `px-6 md:px-12 lg:px-16 xl:px-24`)

**Estrutura em 3 momentos:**

1. **Título Fixo (BeliefFixedHeader)**
   - Sticky com aparência "centro + direita"
   - Bloco visualmente centralizado no topo da sessão, mas alinhado à direita do grid
   - Ex.: `justify-self-end` / `text-right`
   - Position: `sticky` e `top-24`

2. **Área de Frases Rotativas + Ghost em composição controlada**
   - Texto e Ghost convivem com respiro
   - Mantendo o Ghost alinhado verticalmente ao centro do texto
   - Texto à esquerda, ghost à direita

3. **Reveal Final — Ghost + Manifesto**
   - Grid `grid-cols-12` com gap generoso (ex: `gap-12`)
   - Ghost em destaque, mantendo relação com o texto
   - Ghost pode "invadir" levemente uma palavra para efeito visual
   - Manifesto "ISSO É / GHOST / DESIGN." grande, ocupando colunas equivalentes a 90% do grid

---

#### **Mobile (ATUALIZADO):**

- **Fluxo geral:** 1 coluna, padding `px-6`, altura flexível (>120vh)
- **`BeliefFixedHeader` sticky no topo-direita** da sessão, com `text-right`
- **Bloco principal em composição "texto + ghost" lado a lado (row)** dentro de um container próprio:
  - **Texto à direita**
  - **Ghost 3D à esquerda**
  - Ghost **sempre alinhado verticalmente ao centro do bloco de texto à direita**
- **Texto animado rotativo** fica **sempre no rodapé da sessão**, centralizado na página, com quebra de linha somente quando necessário
- **Ordem (percepção do usuário):** header sticky (top-right) → bloco principal (texto + ghost) → manifesto final

---

## **3. Identidade Visual**

### **Cores usadas**

- **Fundo base:** `#040013` (`bg-background`)
- **Acentos principais:**
  - `bluePrimary` (`#0048ff`) — azul real, usado para realçar palavras-chave e o trecho "GHOST"
  - Transições de fundo durante o manifesto podem seguir uma paleta inspirada no sistema de crenças:

```typescript
const COLORS = [
  'bg-bluePrimary',
  'bg-purpleDetails',
  'bg-pinkDetails',
  'bg-bluePrimary',
  'bg-purpleDetails',
];
```

- Usar fades suaves sincronizados com a troca de frases

---

### **Tipografia (fontes e pesos)**

- **Headline e manifesto:** `display`, `font-weight: 900`
- Tamanhos com `clamp`
- **Frases rotativas:** `font-weight: 500`
  - Desktop: 32–38px
  - Mobile: 22–26px

---

### **Ícones ou gráficos customizados**

- **Ghost 3D** (GLB "Ghost w/ Tophat" transformado para o universo Ghost Design)
- Rotação/olhar transmite "atenção" ao usuário

---

## **4. Interatividade & Animações**

### **Animações de entrada/scroll (Framer Motion ou GSAP)**

#### **BeliefFixedHeader:**
- Fade-in + blur suave
- Ex.: `opacity 0→1`, `blur 10→0` em ~1.2s

---

#### **Frases rotativas — Desktop (mantém):**
- **Entra de baixo:** `y: 20 → 0` + `opacity` + blur
- **Sai para cima:** `y: 0 → -20` + blur
- **Ciclo:** ~4.2s por frase

---

#### **Frases rotativas — Mobile (ATUALIZADO: muda posição + animação):**

- O texto animado fica **sempre no rodapé da sessão**, **centralizado na página**

**Entrada:** entra pela direita
- `x: +24 → 0`
- `opacity: 0 → 1`
- `blur: 10px → 0`

**Permanência:** estável, centralizado no rodapé

**Saída:** sai pela esquerda
- `x: 0 → -24`
- `opacity: 1 → 0`
- `blur: 0 → 10px`

**Importante:**
- No mobile, **não usar `y`** (sem subir/descer), apenas deslocamento horizontal
- **Quebra de linha só quando necessário** (evitar linhas forçadas; centralizado)

---

#### **Reveal final (Ghost + manifesto):**
- Container `opacity 0→1`, `y 40→0` (via `whileInView` ou scroll)

---

### **Hover effects / microinterações**

- **Ghost:** wobble/tilt suave no hover (desktop)
- **Textos-chave em bluePrimary:** micro glow/sublinhado discreto

---

### **Comportamentos especiais com mouse/touch**

- **Desktop:** follow cursor com LERP (posição + rotação)
- **Mobile:** resposta orientada a scroll/touch (sem hover)

---

### **Animações vinculadas ao scroll (scroll sync)**

- Rotação lenta em Y com `scrollYProgress`
- Após ~0.8 de progresso:
  - Escala `1.0→1.1`
  - Wobble extra
  - Aproxima no Z
- BG pode interpolar cores da paleta

---

## **5. Responsividade**

### **Mobile**
- BeliefFixedHeader: sticky top-right, text-right
- Bloco principal: texto à direita + ghost à esquerda, ghost sempre centrado verticalmente ao texto
- Ghost: 200–240px
- Texto rotativo: rodapé, centralizado
  - Entra da direita para esquerda
  - Fica parado no rodapé da página até a mudança do BG
  - Sai da direita para esquerda para a outra frase entrar junto com a mudança do BG
  - Quebra só quando necessário
- Interações mais por scroll do que por hover

---

### **Tablet**
- Transição gradual
- Ghost: 220–260px
- Tipografia intermediária

---

### **Desktop**
- Header sticky "centro + direita"
- Relação texto+ghost preservada (ghost centrado verticalmente ao texto)
- Reveal final em 2 colunas
- Ghost: 320–380px

---

### **Ajustes extremos**
- **1440px+:** mais respiro vertical e limite superior do manifesto
- **<360px:** reduzir margens e fontes para evitar quebras excessivas

---

## **6. Acessibilidade & SEO**

- `<section aria-labelledby="...">`
- `h2` para o título, frases como `p`, manifesto como `h3` (ou `h2` interno se fizer sentido)
- Cena 3D com `aria-label`: "Ilustração 3D de um fantasma estilizado representando o conceito Ghost Design."
- Garantir contraste AA/AAA
- Canvas 3D não deve prender foco

---

## **7. Integrações ou Recursos Especiais**

### **Componentes dinâmicos**
- Rotação de frases via estado/timer
- Cena 3D isolada em `<GhostModel />`

---

### **Dados de API**
- Não obrigatório

---

### **Formulários**
- Nenhum

---

### **Outros (ATUALIZADO)**

- **Supabase Storage** para servir o GLB
- **URL pública do GLB usado nesta sessão:**
  ```
  https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb
  ```
- **Drei** (`<Float />`, `<Environment />`) para suavizar a cena

---

## **8. Considerações Técnicas**

### **Client component**
- `'use client'` por R3F + Framer Motion

---

### **Reutilização**
- `shared/3d/GhostModel.tsx` + hooks de rotação/scroll sync

---

### **Estrutura sugerida:**

```
app/(site)/about/_sections/AboutBeliefs.tsx
app/(site)/about/_sections/components/BeliefTitle.tsx
app/(site)/about/_sections/components/BeliefPhrases.tsx
app/(site)/about/_sections/components/BeliefFinalManifest.tsx
shared/3d/GhostModel.tsx
```

**Estrutura atual implementada:**

```
src/components/sobre/sections/AboutBeliefs.tsx
src/components/sobre/beliefs/BeliefFixedHeader.tsx
src/components/sobre/beliefs/BeliefSection.tsx
src/components/sobre/beliefs/BeliefFinalSection.tsx
src/components/sobre/beliefs/BeliefFinalSectionOverlay.tsx
src/components/sobre/3d/GhostModel.tsx
src/components/sobre/3d/GhostScene.tsx
```

---

### **Fallback (ATUALIZADO)**

- Loading placeholder enquanto o GLB carrega da URL pública
- Sem WebGL: versão estática (SVG/PNG)

---

### **Animações via hook**

- `useRotatingPhrases`
- `useBeliefsScrollSync`
- Captura de `mousemove` com LERP

---

## **9. SUGESTÃO DE IMPLEMENTAÇÃO 3D**

### **Plugar a URL direto no GhostModel.tsx (R3F/Drei)**

A ideia é deixar o `GhostModel` 100% declarativo: você só passa `className`/`scale`/`position`, e o componente já carrega o GLB do Supabase.

---

### **✅ Exemplo de implementação (com preload + tipagem + path único)**

```typescript
'use client';

import * as React from 'react';
import { useGLTF } from '@react-three/drei';
import type { GroupProps } from '@react-three/fiber';
import type { GLTF } from 'three-stdlib';

const GHOST_GLB_URL =
  'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb';

type GhostGLTF = GLTF & {
  nodes: Record<string, unknown>;
  materials: Record<string, unknown>;
};

export type GhostModelProps = GroupProps & {
  /** Optional: override the default Supabase URL (useful for local/dev A/B). */
  src?: string;
};

export function GhostModel({ src = GHOST_GLB_URL, ...props }: GhostModelProps) {
  const gltf = useGLTF(src) as GhostGLTF;

  // Observação: "scene" já vem pronto; ideal quando o GLB já está organizado.
  return <primitive object={gltf.scene} {...props} />;
}

// Preload para evitar "pop-in" quando a seção entrar
useGLTF.preload(GHOST_GLB_URL);
```

---

### **Como usar (exemplo)**

```tsx
<GhostModel
  position={[0, 0, 0]}
  scale={1}
  rotation={[0, 0, 0]}
/>
```

---

### **✅ Sugestão de fallback (quando o GLB ainda não carregou)**

No componente que renderiza o Canvas, você coloca um `Suspense`:

```tsx
import { Suspense } from 'react';
import { GhostModel } from '@/shared/3d/GhostModel';

<Suspense fallback={<mesh /* placeholder simples */ />}>
  <GhostModel />
</Suspense>
```

---

### **Observação importante (para consistência com seu layout)**

Como você quer o Ghost sempre alinhado ao centro do bloco de texto, recomendo que o container "texto + ghost" seja o responsável por controlar altura/centro, e o Canvas/Group do ghost apenas "obedeça" (sem posicionar no centro da viewport).

---

## **10. Paleta de Cores (Referência)**

```typescript
// De: src/config/brand.ts
export const BRAND = {
  colors: {
    bluePrimary: '#0048ff',      // CTAs, links, interativos
    blueAccent: '#4fe6ff',       // Destaques secundários, brilhos
    purpleDetails: '#8705f2',    // Pequenos detalhes
    pinkDetails: '#f501d3',      // Ênfases pontuais
    background: '#040013',       // Fundo escuro principal
    backgroundLight: '#f0f0f0',  // Seções claras
    text: '#fcffff',             // Texto principal (dark mode)
    textInverse: '#0e0e0e',      // Texto em fundos claros
    textEmphasis: '#2E85F2',     // Palavras destacadas
    textHighlight: '#4fe6ff',    // Destaques curtos
    textSecondary: '#a1a3a3',    // Infos secundárias
    neutral: '#0b0d3a',          // Gradientes sutis
    neutralLight: '#F5F5F5',     // Fundos secundários
    contactForeground: '#fcffff',// Texto e ícones da seção Contato
  },
};
```

---

## **11. Checklist de Implementação**

- [ ] BeliefFixedHeader sticky com posicionamento correto (desktop: centro+direita, mobile: top-right)
- [ ] Frases rotativas com animações corretas (desktop: vertical, mobile: horizontal)
- [ ] Ghost 3D carregando do Supabase Storage
- [ ] Ghost sempre alinhado verticalmente ao centro do texto
- [ ] Animações de scroll sincronizadas com scrollYProgress
- [ ] Manifesto final "ISSO É / GHOST / DESIGN." com morphing text
- [ ] Transições de background color entre frases
- [ ] Responsividade mobile/tablet/desktop
- [ ] Acessibilidade (aria-labels, contraste, foco)
- [ ] Fallback para WebGL não suportado
- [ ] Performance otimizada (preload do GLB, lazy loading)

---

**Versão:** 2.0
**Última atualização:** 2025
**Status:** Especificação completa e ajustada
