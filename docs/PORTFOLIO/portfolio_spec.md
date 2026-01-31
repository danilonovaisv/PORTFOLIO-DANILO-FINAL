# Especificação Técnica — Página Portfolio (Layout + Parallax)

**Entradas analisadas**
- Protótipo (imagem): `PORTFOLIO-PAGE-LAYOUYT.jpeg` (560×1536).
- Referência de grid: `finch/box/portfolio6.html` (bloqueada por verificação anti-bot durante a captura; especificação abaixo replica o padrão visual: grid “masonry/metro” com cards de alturas variadas).
- Referência de animação (CodePen): `danilonovaisv/pen/VYjejyb` (CodePen bloqueou acesso ao código/preview via ferramenta sem JS; especificação abaixo descreve implementação equivalente em R3F/Drei/Framer, preservando comportamento de parallax por mouse + scroll).

> Observação: como as duas referências estavam protegidas (JS obrigatório / verificação anti-bot), esta especificação foi derivada do protótipo final + padrões técnicos equivalentes para reproduzir os efeitos de forma confiável em produção.

---

## 0) Sumário de Componentes (visão de arquitetura)

1. **`<Header />`** — logo + nav (home/sobre/portfolio/contato)
2. **`<HeroParallax />`** — faixa com imagens em colunas + parallax (mouse/scroll)
3. **`<PortfolioShowcase />`**
   - `SectionTitle + CTA`
   - **`<MasonryGrid />`** com cards de tamanhos variados
4. **`<BrandsStrip />`** — logos em grade/linha
5. **`<ContactSection />`** — infos (esq.) + formulário (dir.)
6. **`<Footer />`**

---

# 1. Objetivo da Página/Sessão

### Função principal
Apresentar um **portfólio** com foco em impacto visual (hero parallax) e **exploração rápida de projetos** (grid masonry), finalizando em **conversão** via CTA/contato.

### Ação esperada do usuário
- **Explorar projetos** (scroll/hover; abrir detalhes).
- **Clicar em “Vamos trabalhar juntos” / “Ver mais”**.
- **Enviar mensagem** no formulário.

### Como contribui para o site
- Constrói credibilidade (projetos + marcas).
- Direciona para contato (lead).

---

# 2. Estrutura de Conteúdo

## 2.1 Header
- **Logo** (esquerda) + **menu** (direita): `home`, `sobre`, `portfolio showcase`, `contato`
- Estado ativo destacado no item “portfolio showcase”.

**Semântica recomendada**
```html
<header>
  <nav aria-label="Navegação principal">…</nav>
</header>
```

## 2.2 Hero (Parallax)
- Faixa horizontal com **5 colunas visuais** (imagens/frames) — no protótipo:
  - Coluna 1: produto em fundo cinza claro
  - Coluna 2: close-up/objeto com fundo laranja
  - Coluna 3: objeto central com fundo vermelho
  - Coluna 4: mão/banana em fundo amarelo
  - Coluna 5: produto em fundo azul claro
- Altura aproximada: **~320–380px** (proporção de banner).

## 2.3 Título de seção + CTA
- Headline: **“portfólio showcase”** (com ênfase em “portfólio” em azul)
- Botão CTA: **“vamos trabalhar juntos”** + ícone seta

## 2.4 Grid de Projetos (masonry/metro)
- Cards grandes e pequenos, com vazios/variações de altura.
- Alguns cards têm **thumb full-bleed**; outros têm **bloco de cor + texto** (ex: “Garoto - Nestlé”).
- Botão **“veja mais”** central abaixo do grid.

## 2.5 Marcas
- Título: **“marcas com as quais já trabalhei.”**
- Logos em faixa/grade, alinhados e espaçados.

## 2.6 Contato
- Headline: **“contato”**
- Sub: “Tem uma pergunta ou quer trabalhar junto?”
- Coluna esquerda: telefone, email, site + ícones sociais.
- Coluna direita: card de formulário (nome, email, telefone, mensagem) + botão “Enviar Mensagem”.

---

# 3. Identidade Visual

## 3.1 Paleta (derivada do protótipo)
Cores dominantes extraídas da imagem:
- **Azul primário**: `rgb(0,84,241)` ≈ **#0054F1**
- **Brancos/cinzas de fundo**: `#F5F8F9`, `#E8EAEB`, `#F2F2F5`
- **Cinza placeholder** (cards vazios): `#7A7A7A`

Recomendação de tokens:
```css
:root {
  --color-primary: #0054F1;
  --color-bg: #F5F8F9;
  --color-surface: #FFFFFF;
  --color-muted: #E8EAEB;
  --color-placeholder: #7A7A7A;

  --radius-lg: 18px;
  --radius-md: 12px;

  --shadow-1: 0 8px 24px rgba(0,0,0,.08);

  --container: 1120px;
  --gutter: 24px;
}
```

## 3.2 Tipografia (sugestão consistente com o layout)
- Sans moderna (ex.: **Inter** ou **Poppins**)
- Headline: 700/800
- Body: 400/500
- Links/nav: 500

```css
body {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}
h1,h2 {
  letter-spacing: -0.02em;
}
```

## 3.3 Ícones
- Ícones lineares (ex.: `react-icons` ou `lucide-react`)
- Seta no CTA (ícone circular com arrow).

---

# 4. Interatividade & Animações

## 4.1 Parallax do Hero (R3F + Drei)
**Objetivo:** criar sensação de profundidade com camadas que reagem:
1) ao **mouse move** (parallax sutil)  
2) ao **scroll** (scroll-sync, deslocando levemente cada coluna)

### Implementação recomendada (Next.js + R3F)
- `@react-three/fiber` (Canvas)
- `@react-three/drei` (`ScrollControls`, `useScroll`, `Image`, `Preload`)
- `framer-motion` para entradas do texto/botões (DOM)
- `lenis` (opcional) para scroll suave

**Estratégia técnica**
- Renderizar 5 planos (`<Image />`) lado a lado.
- Atribuir um `depthFactor` por plano (ex.: 0.06 → 0.18).
- No `useFrame`, aplicar:
  - `group.position.y` baseado em `scroll.offset`
  - `plane.position.x/y` baseado no `pointer` (mouse normalizado)
  - pequena variação de `scale` ou `zoom` (opcional)

### Snippet (HeroParallax.tsx)
```tsx
'use client';

import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Image, ScrollControls, useScroll, Preload } from '@react-three/drei';
import { useMemo, useRef } from 'react';

type HeroItem = {
  src: string;
  x: number;          // posição x em unidades do mundo
  depth: number;      // intensidade parallax
};

function ParallaxScene({ items }: { items: HeroItem[] }) {
  const group = useRef<THREE.Group>(null);
  const scroll = useScroll();
  const { viewport } = useThree();

  // normalização: banner ocupa toda largura do viewport
  const h = viewport.height * 0.55; // altura do banner no mundo

  useFrame((state) => {
    const g = group.current;
    if (!g) return;

    // 1) scroll-sync (0..1)
    const s = scroll.offset;
    g.position.y = THREE.MathUtils.lerp(g.position.y, -s * 0.35, 0.08);

    // 2) mouse parallax
    const px = state.pointer.x; // -1..1
    const py = state.pointer.y; // -1..1

    for (const child of g.children) {
      const d = (child as any).userData.depth as number;
      child.position.x = THREE.MathUtils.lerp(child.position.x, (child as any).userData.baseX + px * d, 0.08);
      child.position.y = THREE.MathUtils.lerp(child.position.y, py * d * 0.6, 0.08);
    }
  });

  return (
    <group ref={group}>
      {items.map((it, i) => (
        <Image
          key={i}
          url={it.src}
          position={[it.x, 0, 0]}
          scale={[viewport.width / 5, h, 1]}
          transparent
          userData={{
            baseX: it.x,
            depth: it.depth,
          }}
        />
      ))}
    </group>
  );
}

export function HeroParallax() {
  const items = useMemo<HeroItem[]>(() => {
    // espaçamento em “mundo”: distribuir 5 colunas
    const colW = 1; // placeholder; o scale usa viewport.width/5
    return [
      { src: '/hero/01.jpg', x: -2 * colW, depth: 0.10 },
      { src: '/hero/02.jpg', x: -1 * colW, depth: 0.12 },
      { src: '/hero/03.jpg', x:  0 * colW, depth: 0.14 },
      { src: '/hero/04.jpg', x:  1 * colW, depth: 0.16 },
      { src: '/hero/05.jpg', x:  2 * colW, depth: 0.18 },
    ];
  }, []);

  return (
    <section style={{ height: 420, background: 'var(--color-bg)' }}>
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 5], fov: 45 }}
      >
        <ScrollControls pages={1} damping={0.15}>
          <ParallaxScene items={items} />
        </ScrollControls>
        <Preload all />
      </Canvas>
    </section>
  );
}
```

**Notas de qualidade**
- Use imagens otimizadas (WebP/AVIF) e tamanhos adequados.
- `dpr` capado ajuda performance em mobile.
- `pages=1` porque o scroll aqui só serve como sinal (pode ser substituído por `useScroll` global + Lenis).

## 4.2 Entradas de seção (Framer Motion)
- Título/CTA: fade + slide-up curto (200–350ms).
- Grid: cards aparecem ao entrar em viewport (`whileInView`).

```tsx
import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10% 0px' },
  transition: { duration: 0.35, ease: 'easeOut' },
};
```

## 4.3 Hover effects (cards)
- Zoom leve na imagem (scale 1.03)
- Sombra/elevação (translateY -4px)
- Overlay com título/categoria (opcional)

```css
.card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-surface);
  box-shadow: 0 0 0 rgba(0,0,0,0);
  transform: translateY(0);
  transition: transform .18s ease, box-shadow .18s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-1);
}
.card img {
  transition: transform .25s ease;
}
.card:hover img {
  transform: scale(1.03);
}
```

## 4.4 Comportamento mouse/touch
- Mouse: parallax ativo.
- Touch: parallax **desligado** (ou reduzido) para evitar “drift”; usar apenas scroll-sync.

---

# 5. Responsividade

## Breakpoints recomendados
- `sm`: 0–639
- `md`: 640–1023
- `lg`: 1024–1279
- `xl`: 1280+

## 5.1 Hero
- **Mobile**: virar carrossel horizontal (swipe) OU 2 colunas empilhadas (melhor performance).
- **Tablet**: 3 colunas visíveis (resto por overflow/scroll-x).
- **Desktop**: 5 colunas como no protótipo.

Estratégia CSS (wrapper):
```css
.hero {
  height: 420px;
}
@media (max-width: 1023px) {
  .hero { height: 360px; }
}
@media (max-width: 639px) {
  .hero { height: 300px; }
}
```

## 5.2 Grid Masonry
**Recomendação prática (CSS-only)**
- `grid-template-columns` responsivo
- `grid-auto-rows` + `grid-row: span N` por card
- `grid-auto-flow: dense` para “encaixar” melhor

```css
.masonry {
  display: grid;
  gap: var(--gutter);
  grid-auto-flow: dense;
  grid-auto-rows: 10px; /* unidade base */
  grid-template-columns: repeat(12, 1fr);
}

@media (max-width: 1023px) {
  .masonry { grid-template-columns: repeat(8, 1fr); }
}
@media (max-width: 639px) {
  .masonry { grid-template-columns: repeat(4, 1fr); }
}
```

Exemplo de spans (modelo “metro”):
```css
.item--lg { grid-column: span 8; grid-row: span 28; }
.item--md { grid-column: span 6; grid-row: span 22; }
.item--sm { grid-column: span 4; grid-row: span 18; }
.item--wide { grid-column: span 12; grid-row: span 16; }
```

**Alternativa com Masonry real (JS)**
- `masonry-layout` (Desandro) ou `react-masonry-css`
- Mais fiel ao “masonry tradicional”, mas precisa medir alturas.

---

# 6. Acessibilidade & SEO

## Acessibilidade
- Estrutura semântica: `header/nav/main/section/footer`.
- `h1` único (pode ser no topo da página), `h2` nas seções.
- Botões com `aria-label` para ícones.
- Cards clicáveis: usar `<a>` com foco visível e `:focus-visible`.
- Form: `label` associado (`htmlFor`) + mensagens de erro.

Checklist:
- [ ] Contraste do azul (#0054F1) em fundo branco ok (testar WCAG AA).
- [ ] Estados de foco visíveis.
- [ ] Navegação por teclado no grid (tab order).
- [ ] `prefers-reduced-motion` desativa parallax/entradas.

```css
@media (prefers-reduced-motion: reduce) {
  * { scroll-behavior: auto !important; }
  .card, .card img { transition: none !important; }
}
```

## SEO (técnico)
- `<title>` e `<meta name="description">` específicos da página portfolio.
- OpenGraph/Twitter cards.
- `Next/Image` para imagens do grid (lazy + sizes).
- Dados estruturados (opcional): `Person` + `CreativeWork`/`Project` (se houver páginas de projeto).

---

# 7. Integrações ou Recursos Especiais

## Grid de projetos (dados)
- Fonte recomendada: JSON local / CMS (Sanity, Contentful) / MDX.
- Estrutura:
```ts
type Project = {
  id: string;
  title: string;
  client?: string;
  cover: string;
  tags: string[];
  href: string;     // rota interna /projetos/[slug] ou link externo
  size: 'lg' | 'md' | 'sm' | 'wide';
};
```

## Formulário de contato
- Envio via:
  - API Route (`/api/contact`) + email provider (Resend, SendGrid)
  - ou serviço de forms (Formspree) para MVP.
- Validação: `zod` + `react-hook-form`.
- Anti-spam: honeypot + rate limit.

---

# 8. Considerações Técnicas (Next.js App Router)

## 8.1 Client vs Server
- **Server Components**:
  - layout, header/footer, sections estáticas, fetch de projetos (se CMS).
- **Client Components**:
  - `HeroParallax` (Canvas/R3F)
  - animações com Framer Motion
  - formulário (estado/validação)

## 8.2 Estrutura sugerida
```
app/
  portfolio/
    page.tsx
    _components/
      Header.tsx
      HeroParallax.tsx
      SectionTitle.tsx
      MasonryGrid.tsx
      BrandsStrip.tsx
      ContactSection.tsx
      Footer.tsx
  api/
    contact/route.ts
public/
  hero/
  projects/
```

## 8.3 Hooks e controle de animação
- `useParallax()` para encapsular:
  - intensidade por breakpoint
  - desligar em `prefers-reduced-motion`
  - normalização de pointer

```ts
function useReducedMotionFlag() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}
```

## 8.4 Performance (R3F)
- `dpr=[1, 1.75]`
- `powerPreference: "high-performance"`
- `Preload all` só se imagens forem poucas; caso contrário, preload seletivo.
- Texturas comprimidas (preferir `KTX2` quando possível) — opcional.

Checklist performance:
- [ ] LCP: hero não bloqueia (usar placeholder/blur e carregar Canvas depois do first paint, se necessário)
- [ ] CLS: reservar altura do hero e cards
- [ ] INP: evitar listeners pesados; limitar atualizações do parallax (lerp)

---

## Mapeamento do Protótipo → Componentes

| Seção no protótipo | Componente | Observações |
|---|---|---|
| Topo com logo + menu | `Header` | item ativo destacado |
| Faixa de imagens | `HeroParallax` | 5 colunas, parallax mouse+scroll |
| “portfólio showcase” + CTA | `SectionTitle` | Framer Motion |
| Grid de projetos | `MasonryGrid` | layout “metro/masonry” |
| “veja mais” | `LoadMoreButton` | ou paginação/infinite |
| Logos de marcas | `BrandsStrip` | grid/linha |
| Contato + form | `ContactSection` | validação + envio |
| Rodapé | `Footer` | links repetidos + socials |

---

## Checklist final (para o agente construtor)

- [ ] Implementar tokens CSS (cores, raios, sombras, container).
- [ ] Construir `HeroParallax` com R3F/Drei (5 planos) + fallback mobile.
- [ ] Construir `MasonryGrid` com spans responsivos (CSS grid) + animação de entrada.
- [ ] Implementar hover microinteractions nos cards.
- [ ] Implementar seção “Marcas” e “Contato” conforme protótipo.
- [ ] A11y: labels, foco visível, reduced-motion.
- [ ] SEO: title/description/OG.
- [ ] Performance: imagens otimizadas + reservar alturas + dpr capado.

