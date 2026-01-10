
# 🧠 PROTÓTIPO INTERATIVO — PÁGINA “SOBRE”

Domínio: **portifoliodanilo.com**  
Conceito-mãe: **Ghost Design — presença que guia sem aparecer**

---

## 🎯 OBJETIVO DA PÁGINA

Criar conexão silenciosa, profundidade e confiança.  
Nada grita. Nada explica demais.  
O design age no subconsciente.

# **2. DESIGN SYSTEM**

### 2.1 Color Palette

| Token          | Value     | Uso                                                      |
| -------------- | --------- | -------------------------------------------------------- |
| bluePrimary    | `#0048ff` | Cor primária da marca, CTAs, links, elementos interativos |
| blueAccent     | `#4fe6ff` | Destaques secundários, brilhos “ghost”/atmosfera        |
| purpleDetails  | `#8705f2` | Pequenos detalhes e highlights                           |
| pinkDetails    | `#f501d3` | Pequenos detalhes, ênfases pontuais                      |
| background     | `#040013` | Fundo escuro principal                                   |
| backgroundLight| `#f0f0f0` | Seções claras (forms, blocos alternados)                 |
| text           | `#fcffff` | Texto principal em fundo escuro                          |
| textInverse    | `#0e0e0e` | Texto em fundos claros                                   |
| textEmphasis   | `#2E85F2` | Palavras destacadas no meio do texto                     |
| textHighlight  | `#4fe6ff` | Destaques curtos, intros breves                          |
| textSecondary  | `#a1a3a3` | Infos secundárias, metadata                              |
| neutral        | `#0b0d3a` | Gradientes, fundos sutis                                 |
| neutralLight   | `#F5F5F5` | Fundos de seções secundárias                             |

> Obs: `textEmphasis` estava com `##2E85F2` e `textHilght` com typo — normalizei para `textHighlight`.

---

### 2.2 Typography

**Fonte primária:** TT Norms Pro (self-hosted, fallback: `ui-sans-serif, system-ui`)

Tokens de texto **responsivos** (usando `clamp`) para manter coerência em todos os breakpoints:

| Token     | Mobile (~<640px) | Desktop (~≥1024px) | Peso   | Uso                                                                 |
| --------- | ---------------- | ------------------ | ------ | ------------------------------------------------------------------- |
| display   | 2.5rem (40px)    | 4.5rem (72px)      | Black   | Frases grandes no meio da página, não-semânticas (Big Phrase)      |
| h1        | 2rem (32px)      | 3.5rem (56px)      | Bold   | Hero headlines, títulos principais                                  |
| h2        | 1.5rem (24px)    | 2.5rem (40px)      | Bold   | Títulos de seção                                                    |
| h3        | 1.25rem (20px)   | 1.75rem (28px)     | Medium | Títulos de cards, subtítulos                                       |
| body      | 1rem (16px)      | 1.125rem (18px)    | Regular| Texto corrido                                                       |
| small     | 0.875rem (14px)  | 0.875rem (14px)    | Reg/Med| Labels, legendas                                                   |
| micro     | 0.75rem (12px)   | 0.75rem (12px)     | Mono   | Tags, infos de sistema                                              |

#### Tokens em CSS com `clamp()`

['css
:root {
  --font-display: clamp(2.5rem, 5vw, 4.5rem);
  --font-h1:      clamp(2rem, 4vw, 3.5rem);
  --font-h2:      clamp(1.5rem, 3vw, 2.5rem);
  --font-h3:      clamp(1.25rem, 2vw, 1.75rem);
  --font-body:    clamp(1rem, 1.2vw, 1.125rem);
  --font-small:   0.875rem;
  --font-micro:   0.75rem;
}

body {
  font-family: "TT Norms Pro", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
}

.display-text {
  font-size: var(--font-display);
  font-weight: 700;
  line-height: 1.1;
}

.h1 {
  font-size: var(--font-h1);
  font-weight: 700;
  line-height: 1.1;
}

.h2 {
  font-size: var(--font-h2);
  font-weight: 700;
  line-height: 1.15;
}

.h3 {
  font-size: var(--font-h3);
  font-weight: 500;
  line-height: 1.2;
}

.body {
  font-size: var(--font-body);
  font-weight: 400;
  line-height: 1.5;
}

.small {
  font-size: var(--font-small);
}

.micro {
  font-size: var(--font-micro);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
    monospace;
}

Versão conceitual em Tailwind

// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['"TT Norms Pro"', "ui-sans-serif", "system-ui"],
      },
      fontSize: {
        display: [
          "clamp(2.5rem, 5vw, 4.5rem)",
          { lineHeight: "1.1", fontWeight: "700" },
        ],
        h1: [
          "clamp(2rem, 4vw, 3.5rem)",
          { lineHeight: "1.1", fontWeight: "700" },
        ],
        h2: [
          "clamp(1.5rem, 3vw, 2.5rem)",
          { lineHeight: "1.15", fontWeight: "700" },
        ],
        h3: [
          "clamp(1.25rem, 2vw, 1.75rem)",
          { lineHeight: "1.2", fontWeight: "500" },
        ],
        body: [
          "clamp(1rem, 1.2vw, 1.125rem)",
          { lineHeight: "1.5", fontWeight: "400" },
        ],
        small: ["0.875rem", { lineHeight: "1.4" }],
        micro: ["0.75rem", { lineHeight: "1.4" }],
      },
    },
  },
};']



## 2.3 Spacing & Grid

Container
    •    max-width: 1680px
    •    Padding horizontal: clamp(24px, 5vw, 96px)

Ritmo Vertical
    •    Seções: py-16 md:py-24
    •    Componentes: gap-8 md:gap-12
    •    Elementos internos: gap-4 md:gap-6

Grid (Tailwind)
    •    Mobile (até md):
    •    Layout: 1 coluna (grid-cols-1 ou flex flex-col)
    •    w-full
    •    Alinhamento:
    •    text-center para todos os textos
    •    items-center e justify-center para stacks verticais (flex-col)
    •    Tablet (md:):
    •    Cards em md:grid-cols-2
    •    Hero / destaques podem continuar 1 coluna
    •    Textos podem voltar a text-left se fizer sentido
    •    Desktop (lg:+):
    •    Distribuição customizada por seção
    •    Textos geralmente alinhados à esquerda para leitura longa

Regra de alinhamento para mobile (base do sistema):

Breakpoint padrão: < 768px
Regra:
    •    Todos os títulos (display, h1, h2, h3), parágrafos e CTAs usam text-align: center.
    •    Componentes em coluna usam align-items: center.
    •    Imagens e ícones principais centralizados (margin-inline: auto).

Exemplo padrão de seção:

<section className="flex flex-col items-center text-center md:items-start md:text-left">
  {/* conteúdo */}
</section>


⸻

## 2.4 Animation Principles

Filosofia: animações orgânicas e intencionais, nunca gratuitas.

Core Library: Framer Motion

Diretrizes:
    •    Animar apenas transform e opacity (performance)
    •    Easing: cubic-bezier(0.22, 1, 0.36, 1) (easeOutExpo)
    •    Duração: 300–700ms na maioria das transições
    •    Stagger: 60–120ms entre elementos sequenciais
    •    Respeitar prefers-reduced-motion: desabilitar animações não essenciais

Padrões comuns:

// Scroll reveal
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
/>

// Hover (botões, cards)
<motion.button
  whileHover={{ scale: 1.02, y: -2 }}
  transition={{ duration: 0.3 }}
/>

// Staggered children
const variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

Em mobile, como tudo é centralizado e o fluxo é vertical, as entradas preferenciais vêm de baixo (y: 24 → 0) acompanhando o scroll.

⸻

## 2.5 Display Text / Big Phrases (Frases em destaque)

Frases grandes no meio da página, com grande destaque visual, mas sem função de título semântico.

Token: display

Diretrizes de uso:
    •    Quando usar:
    •    Frases de impacto, statements da marca, quotes, promessas fortes de seção.
    •    Semântica:
    •    Usar como <p> ou <span> com classe específica:
    •    className="display-text" ou className="text-display"
    •    Exemplo:

<p className="text-display">
  Construímos experiências digitais que parecem magia, mas são guiadas por dados.
</p>


    •    Alinhamento:
    •    Mobile: sempre centralizado, com largura limitada:
    •    Ex.: className="text-display max-w-2xl mx-auto text-center"
    •    Desktop: pode ser centralizado ou seguir a grid da seção (recomendado manter centralizado em blocos de destaque).
    •    Espaçamento:
    •    Mais respiro que títulos normais:
    •    Ex.: mt-16 mb-12 (ajustar conforme a seção).
    •    Cores:
    •    Base: text (#fcffff)
    •    Palavras-chave com textEmphasis e textHighlight.

Exemplo em JSX/Tailwind:

<section className="py-16 flex flex-col items-center text-center">
  <p className="text-display max-w-2xl mx-auto">
    Criamos produtos que parecem
    <span className="text-textHighlight"> magia</span>, mas são construídos com
    <span className="textEmphasis"> engenharia séria</span>.
  </p>
</section>



## 2.6 Global Assets
Logos:
- Favicon: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/Favicon.svg`
- Favicon Light: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/FaviconLight.svg`
- Logo Light (full): `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoLight.svg`
- Logo Dark (full): `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoDark.svg`

## 2.7 Fonts:
 -  font-family: 'TT Norms Pro';
  src: url('https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Thin.woff2') format('woff2');
  font-weight: 100;
  font-style: normal;
  font-display: swap;

- font-face {
  font-family: 'TT Norms Pro';
  src: url('https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Light.woff2') format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;

- font-face {
  font-family: 'TT Norms Pro';
  src: url('https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;

- font-face {
  font-family: 'TT Norms Pro';
  src: url('https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;

- font-face {
  font-family: 'TT Norms Pro';
  src: url('https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;


- font-face {
  font-family: 'TT Norms Pro';
  src: url('https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Black.woff2') format('woff2');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

/* Fonte Mono para Tags */
@font-face {
  font-family: 'PPSupplyMono';
  src: url('https://assets.codepen.io/7558/PPSupplyMono-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

Videos:
- Manifesto Video: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4`

Client Logos:
- 12 monochromatic SVG logos: `client1.svg` through `client12.svg`
- Base URL: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/`


## **Ordem das Seções (Sobre):**
1.  Header
2.  About Hero (Video Loop)
3.  About Origin
4.  About What I Do
5.  About Method
6. About Beliefs
7. About Closing
8. Clients / Brands
9. Contact
10. Footer


## 📌 ESTE DOCUMENTO É A FONTE ÚNICA DA VERDADE

Este arquivo consolida **TODO** o conteúdo da página **/sobre**:

- Narrativa
- Conteúdo textual
- Layout (desktop + mobile)
- Motion
- Componentes
- Tokens técnicos
- Regras absolutas
- Auditoria

Nenhuma decisão fora deste documento é válida.

---

## 🖥 + 📱 VARIAÇÕES POR DISPOSITIVO (VISÃO GERAL)

A página **/sobre** é pensada como **mobile-first**, com expansão progressiva para desktop.

### Desktop (lg / xl)

- Grid conceitual de **12 colunas** com `max-width` ≈ 1120–1200px.
- Uso consistente de **espaço negativo** à esquerda ou direita para reforçar o conceito Ghost.
- Seções chave usam **2 colunas** (texto ↔ imagem/mídia), com alternância fluida.
- Vídeos e imagens têm **opacidade reduzida** e/ou **overlay escuro** para manter o texto sempre legível.
- Hero e seção 04 usam **texto sobre vídeo**, porém **sempre com overlay escuro de alto contraste** (exceção controlada).

### Mobile (sm / md)

- **Uma coluna** em toda a página.
- **Texto sempre vem antes da imagem/vídeo** em cada bloco de conteúdo.
- Tipografia ligeiramente maior que na home para garantir leitura confortável em scroll longo.
- Espaçamentos verticais aumentados para separar claramente blocos de narrativa.
- Vídeos recortados para focar o elemento principal (rosto, ghost, IA) e reduzidos em altura.

### Tablets (md → < lg)

- Transição suave entre **uma** e **duas colunas**:
  - Conteúdos mais densos permanecem em 1 coluna.
  - Listas e grids podem começar a se dividir em 2 colunas.
- Mantém foco em legibilidade, nunca sacrifica leitura por “layout desktop comprimido”.

---


---


## HEADER — MESMO DA HOME

- Mesmo componente de header utilizado na página **/home**.
- **Desktop**:
  - Logo à esquerda.
  - Navegação principal à direita (home, sobre, portfólio do acaso, contato).
  - Link ativo (**/sobre**) destacado em `primary`.
  - Fundo translúcido sobre o vídeo do hero com borda inferior sutil em `primary`.
- **Mobile**:
  - Logo à esquerda, ícone de menu (hambúrguer) à direita.
  - Menu abre em overlay escuro, ocupando tela inteira, sem blur exagerado.
- Comportamento em scroll:
  - Pode fixar no topo com fundo mais sólido.
  - Nunca utiliza efeitos chamativos de scale/bounce.

---

## 🟣 SEÇÃO 01 — HERO / MANIFESTO

**Função:** Primeiro contato. Estabelecer presença sem exposição.  
O usuário entra direto em um estado de observação.

### Layout — Desktop

- Altura: **100vh** (`h-screen`).
- Fundo:
  - Vídeo hero desktop (loop, sem controles visíveis):  
    `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/HeroSobre.mp4`
  - `object-fit: cover`, ocupando toda a viewport.
  - Overlay em `backgroundDark` com gradiente sutil da mesma cor do background.
- Grid:
  - Container central com `max-width` ≈ 1120px.
  - Conceito 12 colunas:
    - Colunas **1–6**: espaço negativo + vídeo.
    - Colunas **7–12**: bloco de texto.
- Texto:
  - Bloco de texto **alinhado à direita da página**  dentro do bloco.
  - Verticamente posicionado **ligeiramente acima do centro** (≈ -10%).
  - Sem CTA aqui.
- Regra de contraste:
  - Hero é **exceção controlada** à regra “texto sobre imagem”, sempre com overlay escuro e contraste AA+.

### Layout — Mobile

- Header fixo no topo, comum à home.
- Vídeo hero mobile:  
  `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/HeroSobreMobile.mp4`
  - Posicionado logo abaixo do header.
  - Altura aproximada: **45–55vh**, `object-fit: cover`, focando o rosto.
- Overlay em `backgroundDark` com gradiente sutil da mesma cor do background.
- Bloco de texto:
  - Vem **logo abaixo** da área do vídeo, dentro do mesmo fundo escuro.
  - Largura 100% do container, com padding horizontal de 16–20px.
  - Texto **centralizado** (alinhamento visual mais próximo da composição do layout atual).
- Altura:
  - `min-height: 100vh`, permitindo scroll se o texto for mais longo.

### Motion (frame-by-frame)

| Frame | Estado                      |
|-------|-----------------------------|
| 0%    | opacity 0 / blur 10px       |
| 30%   | aparece linha 1             |
| 60%   | aparece linha 2             |
| 100%  | texto completo visível      |

- Entrada **linha a linha**.
- Delay entre linhas: **0.2s – 0.4s**.
- Duração média: **1.4s**.
- Easing: **ghostIn** = `cubic-bezier(0.22, 1, 0.36, 1)`.
- Background de vídeo com **loop lento**, sem mudanças bruscas.

### Conteúdo

**H1**

> Sou Danilo Novais.

**Texto manifesto**

**H1**
> Você não vê tudo  
> o que eu faço. Mas  
> sente quando  
> funciona.  
>**H2**
> Crio design que observa, entende  
> e guia experiências com intenção,  
> estratégia e tecnologia — na medida certa.

Palavras-chave como **“não vê tudo”** e **“funciona”** podem usar a classe `.ghost-accent` (azul).

---

## 🟣 SEÇÃO 02 — ORIGEM CRIATIVA

### 1. 🎯 Objetivo da Página/Sessão

| Item | Detalhamento |
|------|--------------|
| **Função** | Gerar profundidade emocional, sugerindo memória e trajetória não linear |
| **Ação esperada** | Leitura sequencial dos blocos, percepção visual narrativa |
| **Contribuição** | Reforça valores da marca (intuição, transformação, sensibilidade) e diferencia estética |

---

## 2. 📐 Estrutura de Conteúdo

- **Título Principal:** `"Origem"` (label centralizada no topo)
- **Blocos (4):** Alternância de texto e mídia, com layout adaptativo
  - Bloco A: Texto (esquerda), vídeo retrato (direita)
  - Bloco B: Imagem (esquerda), texto (direita)
  - Bloco C: Texto (esquerda), imagem (direita)
  - Bloco D: Vídeo (esquerda), texto (direita)
- **Layout Desktop:**
  - Grid 12 colunas
  - Mídia com blur e opacidade máx. 0.85
- **Layout Mobile:**
  - 1 coluna, sequência texto → mídia
- **CTAs:** Não há botões, mas a progressão é guiada por ritmo visual


### Conteúdo

**Título (H1)**

 'Origem'

**Blocos textuais e mídias**
**Títulos (H1) e conteúdo (H3)**

  - Bloco A: O QUE PERMANECE

Desde cedo, sempre prestei atenção no que ficava —
não só no que aparecia.

Enquanto muitos olhavam para o brilho imediato,
eu era atraído pelos vestígios, pelos detalhes que sobreviviam ao tempo.
A essência das coisas sempre falou mais alto do que a superfície.

(mídia: ‘https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-1.webp’)

⸻

  - Bloco B: DO TRAÇO À INTENÇÃO

Rabiscos viraram ideias.
Ideias viraram projetos.
E os projetos começaram a deixar rastros.

Meu processo criativo nasceu do improviso, do lápis na margem do caderno.
Aos poucos, aquilo que era instinto virou direção.
Com cada tentativa, aprendi a dar forma ao invisível —
até que os conceitos começaram a falar por si.

(mídia: ‘https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-2.webp’)

⸻

  - Bloco C: A DESCOBERTA DO INVISÍVEL

Foi ali que entendi:
design não é enfeite.
É ferramenta invisível de transformação.

Por trás de cada escolha visual, existe intenção.
Descobri que o design verdadeiro não grita — ele conduz.
Ele está presente nos detalhes que ninguém percebe,
mas que todos sentem.
Transformar sem que se perceba a transformação: isso é potência.

(mídia: ‘https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-3.webp’)

⸻

  - Bloco D: EXPANSÃO COM PROPÓSITO

Estudei Comunicação, mergulhei no design, no branding
e hoje uso inteligência artificial para expandir o alcance
sem perder a essência humana da criação.

Minha trajetória uniu intuição com método, arte com estratégia.
O futuro pede novas ferramentas — e eu as abracei.
Mas nunca deixei que a tecnologia apagasse o que me move:
a sensibilidade, o olhar atento, a busca pelo significado.

(mídia: ‘https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-4.webp’)

⸻

---

## 3. 🎨 Identidade Visual

- **Cores principais:**
  - Fundo: `#040013`
  - Linha superior: `primary`
  - Texto label: `textSecondary` ou variação suave de `primary`
- **Tipografia:**
  - Títulos: bold, tamanho responsivo
  - Corpo: serif ou humanista, legível, espaçamento generoso
- **Elementos Visuais:**
  - Imagens com bordas suaves, vídeos em loop com blur
  - Motion Titles (`#00X`) animados em parallax

---

## 4. 💫 Interatividade & Animações

### ✨ Framer Motion — Parallax com `useScroll`

```tsx
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue
} from "framer-motion";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}
```

### 🧠 Lógica por imagem:

```tsx
function Image({ id }: { id: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section>
      <div ref={ref}>
        <img src={`/${id}.jpg`} alt={`Imagem ${id}`} />
      </div>
      <motion.h2 style={{ y }}>{`#00${id}`}</motion.h2>
    </section>
  );
}
```

### 📊 Progresso com `scaleX`:

```tsx
const { scrollYProgress } = useScroll();
const scaleX = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001
});
<motion.div className="progress" style={{ scaleX }} />
```

---

## 5. 📱 Responsividade

| Breakpoint | Comportamento |
|------------|----------------|
| `sm`       | 1 coluna, espaçamento 24–32px, tipografia maior |
| `md`       | Largura limitada (~80%), texto centralizado |
| `lg+`      | Grid alternado, deslocamentos verticais sutis nas mídias |

---

## 6. ♿ Acessibilidade & SEO

- Uso de `alt` nas imagens ✔️
- Semântica: cada bloco poderia usar `<section>` + `<h2>` para conteúdo
- Contraste alto com fundo escuro
- Foco e animações suaves (com fallback: `prefers-reduced-motion`)
- Estrutura legível para buscadores, mas sem CTAs diretos

---

## 7. 🔌 Recursos Especiais

- Componente `Image` com `motion.h2` sincronizado ao scroll
- Sem formulários ou dados externos
- Vídeos e imagens estáticos (não carregados via API)
- Títulos dinâmicos com transição suave

---

## 8. ⚙️ Considerações Técnicas

| Item | Detalhamento |
|------|--------------|
| **Client-side** | Sim, todos os componentes são client-only |
| **Reutilização** | O componente `Image` pode ser reaproveitado para várias sessões |
| **Next.js compatível** | Pode ser adaptado para App Router com `useClient` e layouts modulares |
| **Fallbacks** | `alt` para imagens, scroll reduzido via `prefers-reduced-motion` |
| **Hooks personalizados** | `useParallax` reutilizável com `MotionValue` genérico |

---

## ✅ Checklist Técnico Preenchido

✔ Objetivo da sessão claro  
✔ Layout desktop/mobile definido  
✔ Animações com scroll via Framer Motion  
✔ Estrutura modular com React  
✔ Visual coerente com branding  
✔ Responsividade e acessibilidade previstas  
✔ Código pronto para ser usado em agente autônomo


-----




# 🟣 SEÇÃO 03 — O QUE EU FAÇO  
## Protótipo Interativo + Rodapé Animado (Ghost Design)

---

## 🎯 Função da seção

Transformar **serviços/capabilities** em uma lista de entregas claras, com visual calmo e confiável.  
A seção termina com um **rodapé animado** (marquee) que funciona como assinatura rítmica do conteúdo.

Mensagem principal:

> Do **insight** ao **impacto**.  
> Mesmo quando você não percebe.

---

## 📐 Layout Geral

- Altura de referência: ~100vh (não obrigatório, mas a seção deve “respirar” sozinha).
- Fundo: `#040013` (`backgroundDark`).
- Container central:
  - `max-width`: 1120–1200px
  - `padding-inline`: 24–32px
  - Centralizado (`margin-inline: auto`).

---

## 🖥 Layout — Desktop (≈ ≥ 1024px)

### 1. Título

- Posicionado no topo da seção, centralizado.
- Duas linhas:

  - text:
 **font-display**
  Do insight ao impacto.
  Mesmo quando você não percebe.

    •    Tipografia
    •    font-weight: 900
    •    font-size: 44–48px
    •    line-height: 1.2
    •    Cores
    •    Linha 1:
    •    “Do” / “ao impacto.” → branco (#FFFFFF)
    •    “insight” / “impacto” → azul primário (primary)
    •    Linha 2 → branco (#FFFFFF)
    •    Espaçamentos
    •    Margem superior: 64–80px em relação ao início da seção.
    •    Margem inferior: 48–64px até o início dos cards.
    •    max-width do bloco de título: 900px, centralizado.

⸻

## **2. Lista Interativa de Cards — Desktop

Visual geral: 7 cards alinhados um ao lado do outro em uma faixa horizontal única, cada um com a mesma largura.
    •    Disposição
    •    display: flex
    •    flex-direction: row
    •    justify-content: space-between
    •    7 cards na mesma linha (sem wrap) em telas largas.
    •    gap: 16–20px entre cards.
    •    Responsivo dentro do desktop
    •    Em telas muito largas (≥ 1440px): manter faixa centralizada; não aumentar demais a largura dos cards.
    •    Em telas entre 1024px e 1280px: cards podem reduzir um pouco o padding horizontal para caberem.

## **Estrutura de cada card**
    •    Container
    •    Altura mínima: ~120–140px.
    •    padding: 20–24px (mais generoso na horizontal).
    •    border-radius: 12–16px (formato de “pílula retangular”).
    •    Fundo: roxo bem escuro (ex.: rgba(255,255,255,0.04) sobre o fundo principal).
    •    Sem borda visível; apenas contraste pelo fundo.
    •    Opacidade base: ~0.92.
    •    Conteúdo interno
    •    Layout: display: flex; align-items: center; gap: 16px;
    1.    Ícone circular à esquerda
    •    Círculo azul (primary), ~32–36px de diâmetro.
    •    Ícone seta ↗ branca centralizada (símbolo de ação).
    •    Não é um botão clicável por si; funciona como marca visual.
    2.    Bloco de texto à direita
    •    Tipografia:
    •    font-size: 16–18px
    •    line-height: 1.4–1.5
    •    font-weight: 400–500
    •    Cor: branco (#FFFFFF) com leve variação:
    •    Palavra-chave em azul primário.
    •    Continuação da frase em branco.

## **Interações — Desktop

    •    Hover
    •    Leve elevação (transform: translateY(-2px)).
    •    Aumento sutil de brilho do fundo (ex.: background: rgba(255,255,255,0.06)).
    •    Cursor padrão (default) se não forem links; se forem clicáveis, cursor: pointer + role="button".
    •    Focus (tab)
    •    Outline visível (ex.: contorno azul claro em volta do card).
    •    Transições
    •    transition: transform 0.18s ease-out, background 0.18s ease-out, opacity 0.18s ease-out;

⸻

## **📱 Layout — Mobile (≈ ≤ 768px)

No mobile, a seção vira uma coluna única, reforçando a leitura linear.

## 1. Título — Mobile
    •    Centralizado, com quebra natural de linha:

Do insight ao impacto.
Mesmo quando
você não percebe.


    •    Tipografia:
    •    font-size: 28–32px
    •    line-height: 1.25
    •    font-weight: 700
    •    padding-inline: 24px
    •    Margem inferior: 32–40px até os cards.

## 2. Cards — Mobile

    •    Disposição:  7  barras alinhados um abaixo do outro em uma coluna vertical única, cada um com a mesma largura e altura. Cards em empilhandos uma abaixo do outro, 
    •    display: flex
    •    flex-direction: column
    •    gap: 10–14px
    •    Cada card ocupa 100% da largura útil do container (efeito de faixa/pílula grande).
    •    Cards
    •    Mesmo visual de desktop (fundo roxo escuro, ícone à esquerda, texto à direita).
    •    padding: 18–20px.
    •    Textos podem quebrar em 2–3 linhas, mantendo conforto de leitura.

⸻

## **🧾 Conteúdo Textual dos Cards

Ordem sugerida (desktop: esquerda → direita; mobile: de cima → baixo):
    1.    Direção criativa que organiza o caos
    2.    Design estratégico que guia decisões
    3.    Identidades que permanecem na memória
    4.    Campanhas multicanais com lógica e emoção
    5.    Branding que não grita — mas marca
    6.    Inteligência artificial aplicada à criação e automação
    7.    Liderança criativa com visão e método

Regras de copy:
    •    Sempre usar frases curtas e afirmativas.
    •    Palavra-chave inicial em destaque (azul), complementos em branco.
    •    Hífen/em dash “—” em: que não grita — mas marca.

⸻

## **🌀 Rodapé Animado — Marquee (Ghost Design)

Posicionado logo abaixo da lista de cards, dentro da mesma seção.

### 1. Layout
    •    Container:
    •    Margem superior: 48–64px a partir do grid de cards.
    •    padding-block: 16–24px.
    •    BG faixa cor (#0048ff).
    •    Texto font Black cor (#8705f2).
    •    Internamente:
    •    display: flex
    •    flex-direction: column
    •    gap: 16px

### 2. Conteúdo das linhas

Duas faixas horizontais com textos contínuos:
    •    Linha 1 (sentido A → B)
DIREÇÃO CRIATIVA・DESIGN ESTRATÉGICO・IDENTIDADES・CAMPANHAS・BRANDING・INTELIGÊNCIA ARTIFICIAL・LIDERANÇA CRIATIVA・
    •    Linha 2 (sentido B → A)
BRANDING・INTELIGÊNCIA ARTIFICIAL・LIDERANÇA CRIATIVA・DIREÇÃO CRIATIVA・DESIGN ESTRATÉGICO・IDENTIDADES・CAMPANHAS・
    •    Tipografia:
    •    font-size: 18–20px (16–18px no mobile).
    •    font-weight: 500.
    •    letter-spacing: levemente aumentado.
    •    Cor: branco com opacity: 0.75.
    •    Container de cada linha:
    •    overflow: hidden
    •    white-space: nowrap

## **3. Motion (Framer Motion)

    •    Duas instâncias de marquee com direções opostas.
    •    Velocidade base configurável via baseVelocity (ex.: -10 e 10).
    •    Velocidade modulada pela velocidade de scroll (scroll up/down acelera ou desacelera).
    •    Loop infinito.
    •    Movimento linear, sem bounce, sem scale.

Preferências de movimento:
    •    Respeitar prefers-reduced-motion:
    •    Se ativado, a animação é pausada e os textos ficam centralizados, estáticos.
    •    Em mobile:
    •    Velocidade ligeiramente reduzida para evitar distração excessiva.

⸻

## ** ♿ Acessibilidade

    •    Título com role="heading" e nível coerente com a hierarquia (ex.: h2 para a seção).
    •    Cards:
    •    Se forem meramente informativos → article ou div com aria-label descritivo.
    •    Se forem clicáveis → usar <button> ou <a> semanticamente corretos, com aria-label claro.
    •    Marquee:
    •    aria-hidden="true" nas linhas animadas (texto repetitivo, puramente decorativo).
    •    Contraste:
    •    Texto branco/azul sobre roxo bem escuro mantido dentro de AA/AAA.
    •    Teclado:
    •    Foco visível em todos elementos interativos.
    •    Nenhuma animação depende exclusivamente de hover (tudo deve funcionar via tab/focus).

⸻

## ** 🧩 Notas de Implementação

    •    Grid de cards
    •    Desktop: display: flex horizontal com 7 itens; mobile: flex-col.
    •    Garantir altura mínima consistente das caixas (visualmente alinhadas).
    •    Noise/texture
    •    Opcional, via pseudo-elemento no container da seção, com opacidade baixa.
    •    Intersection Observer
    •    Pode ser usado para iniciar animações (entrada suave dos cards + marquee) apenas quando a seção entra em viewport.
    •    Performance
    •    Evitar sombras pesadas; priorizar contrastes de cor para dar profundidade.
    •    Usar o marquee baseado em transform: translateX com will-change: transform.

⸻

Ghost Design não explica.
Ele permanece.



# 🟣 SEÇÃO 04 — COMO EU TRABALHO

**Função:** Gerar confiança racional através do método.  
Mostra que a criatividade é suportada por processo.

---

## Layout — Desktop

### Estrutura Geral
- **Altura alvo:** ≈120vh (permite scroll se necessário).
- **Fundo:**
  - Vídeo abstrato/IA full-bleed: `VideoAboutMethod.mp4`
  - `object-fit: cover`, ocupando 100% de largura e altura da seção
  - **Overlay escuro:** gradiente radial ou linear
    - Mais opaco na área de texto (esquerda): `rgba(10, 10, 20, 0.85)`
    - Mais transparente na área visual (direita): `rgba(10, 10, 20, 0.4)`
  - Vídeo em loop contínuo, sem controles

### Grid & Composição
- Container de 12 colunas, max-width ≈ 1200px
- **Coluna de conteúdo (esquerda):** colunas 2–7
  - Padding vertical: 80–100px
  - Padding lateral: 32–40px
- **Área visual (direita):** colunas 8–12
  - Vídeo/ghost aparece com mais clareza
  - Sem texto sobreposto

### Título
- Alinhado à esquerda
- Duas linhas:
  - "**Criatividade** com **método**." (criatividade e método em `primary`)
  - "**Impacto** sem **ruído**." (impacto em branco, ruído levemente dimmed)
- Font-size: 44–52px
- Line-height: 1.15
- Font-weight: 700
- Margin-bottom: 32–40px

### Texto Introdutório
- Três frases em parágrafos separados ou quebras de linha
- Font-size: 18–20px
- Line-height: 1.6
- Font-weight: 400
- Opacity: 0.9
- Max-width: 520px
- Margin-bottom: 48–56px

### Lista de Processo
- **6 itens** em blocos horizontais/verticais
- Cada item estruturado como card:
  - **Fundo:** `rgba(26, 26, 46, 0.7)` ou `rgba(255, 255, 255, 0.05)` com backdrop-filter blur
  - **Borda esquerda:** 3px sólida em `primary`
  - **Padding:** 20–24px
  - **Margin-bottom:** 16–20px
  - **Border-radius:** 6–8px

**Estrutura de cada item:**
- **Índice:** `01`–`06` em `primary`, font-size 16–18px, font-weight 700, display inline ou como prefix
- **Texto:** em branco, font-size 16–18px, font-weight 400, line-height 1.5
- Spacing entre índice e texto: 12–16px

---

## Layout — Mobile

### Fundo
- Mesmo vídeo `VideoAboutMethod.mp4`
- **Position:** `object-position: right center` (prioriza ghost/IA no lado direito)
- **Overlay:** mais forte para garantir contraste
  - `rgba(10, 10, 20, 0.88)` uniforme ou gradiente vertical (mais escuro no topo)

### Estrutura
- **1 coluna**, largura 100%
- Padding lateral: 20–24px
- Padding vertical: 60–80px

### Conteúdo
- **Título:**
  - Centralizado ou alinhado à esquerda
  - Font-size: 32–36px
  - Margin-bottom: 24–32px
  
- **Texto introdutório:**
  - Centralizado
  - Font-size: 16–17px
  - Max-width: 100%
  - Margin-bottom: 40–48px
  - Frases podem estar em linha contínua ou separadas com `<br/>`

- **Lista:**
  - 6 itens empilhados verticalmente
  - Cada card com:
    - Fundo mais sólido: `rgba(26, 26, 46, 0.85)`
    - Padding: 16–20px
    - Margin-bottom: 14–16px
    - Borda esquerda mantida

### Ghost/IA Visual
- Pode aparecer como:
  - **Opção 1:** recorte de fundo fixo com parallax desabilitado
  - **Opção 2:** miniatura ou fade-in ao final da seção (abaixo da lista)
  - **Opção 3:** apenas sugestão visual no overlay do vídeo de fundo
- **Nunca competindo** com legibilidade do texto

### Altura
- Flexível, >100vh se necessário
- Min-height: 100vh para evitar corte visual

---

## Responsividade Detalhada

### Small (`sm`: 640px–767px)
- 1 coluna
- Título: 30–32px
- Texto intro: 15–16px
- Lista ocupa 100% da largura
- Spacing vertical entre cards: 14–16px

### Medium (`md`: 768px–1023px)
- 1 coluna
- Título: 36–40px
- Texto intro: 17–18px
- Cards com max-width: 90%
- Padding container: 24–28px

### Large (`lg`: 1024px–1279px)
- **2 blocos visuais:**
  - Texto: colunas 1–7
  - Vídeo visível: colunas 8–12
- Título: 42–46px
- Lista com max-width: 75% da área de texto
- Cards com largura limitada para manter legibilidade

### Extra Large (`xl`: 1280px+)
- Grid: colunas 2–7 para texto, 8–12 para vídeo
- Título: 48–52px
- Texto intro: 19–20px
- Cards: max-width ≈ 560px
- Mais respiro horizontal e vertical

---

## Conteúdo dos 6 Itens

1. **01** | Briefings bem construídos para decisões claras
2. **02** | Estratégia como base de qualquer criação
3. **03** | Design com propósito, não só beleza
4. **04** | Revisões inteligentes, sem ruído desnecessário
5. **05** | IA e automações para escalar com qualidade
6. **06** | Métricas criativas: engajamento, retenção e resultado

---

## Interação & Motion

### Background Video
- **Parallax ultra sutil** (opcional):
  - `translateY` de -20px a 20px no scroll
  - Apenas se `prefers-reduced-motion: no-preference`
- Vídeo em loop contínuo
- Sem controles, muted, autoplay

### Animação de Entrada (Scroll)

**Título:**
- `opacity: 0 → 1`
- `filter: blur(8px) → blur(0)`
- `translateY: 30px → 0`
- Duration: 0.8s
- Easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`

**Texto introdutório:**
- Mesma animação do título
- Delay: 0.2s após título

**Lista de processo:**
- Cada card entra individualmente
- **Stagger:** 0.12s entre itens
- Animação:
  - `opacity: 0 → 1`
  - `translateX: -20px → 0`
  - Duration: 0.5s
  - Easing: `ease-out`
- Delay inicial: 0.4s após texto introdutório

### Estados de Hover (Desktop)

**Cards da lista:**
- **Default:** opacity 0.9
- **Hover:**
  - Opacity: 1.0
  - Borda esquerda: 3px → 4px
  - `translateX: 0 → 4px` (deslocamento sutil para direita)
  - Backdrop blur aumenta levemente
- Transition: 0.3s ease

### Acessibilidade
- **prefers-reduced-motion:**
  - Sem parallax
  - Sem translateY/translateX
  - Apenas fade-in instantâneo (0.2s)
  - Sem stagger perceptível

---

## Notas de Implementação

### Vídeo
- Formato: MP4, WebM como fallback
- Compressão otimizada para web
- Resolução: 1920x1080 mínimo
- Duração: 10–20s em loop
- Considerar poster frame para carregamento inicial

### Performance
- Lazy load do vídeo se fora do viewport inicial
- Usar Intersection Observer para animações
- Considerar `will-change: transform, opacity` nos elementos animados

### Overlay
- Usar `::before` ou `::after` no container da seção
- Position: absolute, z-index entre vídeo e conteúdo
- Background: `linear-gradient(90deg, rgba(10,10,20,0.85) 0%, rgba(10,10,20,0.4) 100%)`

### Contraste
- Garantir WCAG AA mínimo em todo texto
- Testar legibilidade em diferentes dispositivos
- Ajustar overlay se necessário

### Z-index Stack
1. Vídeo: `z-index: 1`
2. Overlay: `z-index: 2`
3. Conteúdo: `z-index: 3`

---

## Variações de Implementação

### Opção 1: Vídeo Full-bleed (Recomendada)
- Vídeo ocupa toda seção
- Conteúdo em primeiro plano com overlay
- Melhor impacto visual

### Opção 2: Split Screen
- Desktop: 50/50 texto/vídeo
- Mobile: vídeo como background fixo
- Mais tradicional, menos imersivo

### Opção 3: Vídeo como Card
- Vídeo contido em card à direita
- Mais controle, menos dramático
- Útil se performance for crítica

**Escolha baseada em:** performance do dispositivo, largura de banda esperada, e direção de arte geral do site.




# 🟣 SEÇÃO 05 — O QUE ME MOVE

**Função:** Criar vínculo emocional e manifesto.  
Momento mais íntimo, quase carta aberta com narrativa sequencial.

---

## Layout — Desktop

### Estrutura Geral
- **Altura alvo:** ≈140vh (permite scroll para acomodar a sequência animada).
- **Fundo:** `backgroundDark` (#040013).
- **Grid:**
  - Container de 12 colunas, max-width ≈ 1200px
  - Área de conteúdo: colunas 2–12

### Composição Visual

**Seção dividida em 3 momentos:**

#### 1. Título Fixo (Sempre visível no topo)
- Posicionamento: colunas 2–10, centralizado horizontalmente
- Permanece fixo durante toda a sequência
- Margin-top: 10–12vh
- Margin-bottom: 8–10vh

**Texto:**
> Acredito no **design que muda o dia** de alguém.  
> Não pelo choque, **mas pela conexão.**

**Estilo:**
- Font-size: Display Black
- Line-height: 1.2
- Font-weight: 700
- Palavras em `primary`: "design que muda o dia" e "mas pela conexão"
- Max-width: 900px
- Text-align: center

#### 2. Área de Frases Rotativas (Centro da tela)
- Posicionamento: colunas 3–11
- Min-height: 40vh (espaço para frases transitarem)
- Display: flex, justify-content: center, align-items: center

**Frases que alternam (uma por vez):**
1. "Um vídeo que **respira**."
2. "Uma marca que se **reconhece**."
3. "Um detalhe que **fica**."
4. "**Crio** para gerar presença."
5. "**Mesmo** quando não estou ali."
6. "**Mesmo** quando ninguém percebe o esforço."

**Estilo de cada frase:**
- Font-size: 32–38px
- Line-height: 1.4
- Font-weight: 500
- Palavras em `primary` destacadas em negrito
- Text-align: center
- Max-width: 700px
- Opacity transition entre frases

#### 3. Reveal Final — Ghost + Manifesto
- Aparece após todas as frases rotativas
- Posicionamento: colunas 2–12
- Layout: Grid 2 colunas (desktop)
  - Coluna esquerda (6 cols): Ghost animado
  - Coluna direita (6 cols): Texto "ISSO É GHOST DESIGN"

**Ghost:**
- Max-width: 320–380px
- Centralizado verticalmente com o texto
- Implementa animação de olhos seguindo cursor (código existente)

**Texto "ISSO É GHOST DESIGN":**
- Alinhamento: à esquerda ou centralizado com o Ghost
- Font-size: 56–64px
- Line-height: 1.1
- Font-weight: 700
- "GHOST DESIGN" em `primary`
- "ISSO É" em branco

---

## Layout — Mobile

### Estrutura
- **1 coluna**, padding lateral: 20–24px
- **Altura:** Flexível, >120vh

### Título Fixo
- Centralizado, margin-top: 8vh
- Font-size: 28–34px
- Max-width: 100%
- Margin-bottom: 6–8vh
- Quebras de linha ajustadas para mobile:
  - "Acredito no **design que muda o dia** de alguém."
  - "Não pelo choque, **mas pela conexão.**"

### Área de Frases Rotativas
- Min-height: 35vh
- Font-size: 22–26px
- Max-width: 100%
- Padding: 0 16px
- Frases permanecem centralizadas

### Reveal Final
- **Layout em coluna** (não mais grid)
- **Ghost primeiro:**
  - Centralizado
  - Max-width: 200–240px
  - Margin-bottom: 32–40px
- **Texto "ISSO É GHOST DESIGN":**
  - Centralizado
  - Font-size: 36–42px
  - Line-height: 1.15
  - Quebra de linha opcional:
    - "ISSO É"
    - "GHOST DESIGN."

---

## Responsividade Detalhada

### Small (`sm`: 640px–767px)
- Título fixo: 28–30px
- Frases rotativas: 20–22px
- Ghost: 180–200px
- Texto final: 32–36px

### Medium (`md`: 768px–1023px)
- Título fixo: 34–38px
- Frases rotativas: 24–28px
- Ghost: 220–260px
- Texto final: 40–46px
- Considerar layout em coluna ainda

### Large (`lg`: 1024px–1279px)
- **Transição para grid 2 colunas no reveal final**
- Título fixo: 40–44px
- Frases rotativas: 30–34px
- Ghost: 280–320px
- Texto final: 48–54px

### Extra Large (`xl`: 1280px+)
- Título fixo: 48–52px
- Frases rotativas: 36–38px
- Ghost: 320–380px
- Texto final: 60–64px
- Max respiro entre elementos

---

## Animação & Sequência Temporal

### Timing da Sequência

**Fase 1: Título Fixo (0s)**
- Fade-in ao carregar a seção
- Permanece visível durante toda a experiência
- Animação inicial:
  - `opacity: 0 → 1`
  - `filter: blur(10px) → blur(0)`
  - Duration: 1.2s
  - Easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`

**Fase 2: Frases Rotativas (Início após 1.5s)**

Cada frase tem um ciclo de:
- **Entrada:** 0.8s
- **Permanência:** 2.5s
- **Saída:** 0.6s
- **Pausa entre frases:** 0.3s

**Total por frase:** ≈4.2s  
**Total de 6 frases:** ≈25s

**Animação de cada frase:**


