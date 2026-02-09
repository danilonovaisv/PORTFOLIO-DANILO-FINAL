  # PORTFOLIO — PROTOTIPO INTERATIVO (CANONICO)

Versao: **4.0**  
Data: **2026-02-09**  
Status: **Canonica para implementacao**

## 1. Objetivo da pagina `/portfolio`

Criar uma vitrine editorial premium com foco em:

1. qualidade percebida;
2. escaneabilidade rapida;
3. abertura de projeto por modal/rota;
4. conversao para contato.

CTA primario obrigatorio: **"vamos trabalhar juntos ->"** (ancora para `#contact`).

## 2. Estrutura semantica canonica

```txt
Header
main
  Hero
  Gallery
  Brands
  Contact
Footer
ModalRoot
```

Semantica obrigatoria:

- `header/nav/main/section/footer`
- 1 H1 na pagina
- H2 por secao
- H3 por card de projeto

## 3. IA e fluxo de navegacao

Ordem da pagina:

1. Header
2. Hero (video + titulo + CTA)
3. Gallery de projetos (grid editorial)
4. ModalRoot (abre projeto)
5. Marcas
6. Contato
7. Footer

Fluxo esperado:

1. Usuario entra e entende o tema da pagina.
2. Usuario explora projetos no grid.
3. Usuario abre um card para detalhe.
4. Usuario volta para o grid sem perder contexto.
5. Usuario segue para contato.

## 4. Grid editorial e responsividade

### 4.1 Desktop

- CSS Grid de 12 colunas.
- `grid-auto-flow: dense`.
- Cards com spans variados via dados.
- Placeholders neutros permitidos apenas para ritmo visual.

### 4.2 Mobile

- Lista vertical full-width.
- Sem placeholders vazios.
- Menor custo de motion/3D.
- Alvos touch >= 48x48.

## 5. Contrato de dados (obrigatorio)

```ts
type Project = {
  id: string;
  title: string;
  client?: string;
  year?: string;
  cover: {
    src: string;
    alt: string;
  };
  tags?: string[];
  layout: {
    colSpanLg: number;
    rowSpanLg: number;
    colSpanMd?: number;
  };
  kind: 'image' | 'video' | 'case';
};
```

## 6. Modal e roteamento

Suportar as duas estrategias:

1. Modal por estado local (simples).
2. Parallel routes compartilhaveis:
   - `@modal/(.)project/[id]`

Acessibilidade obrigatoria do modal:

- `role="dialog"`
- `aria-modal="true"`
- foco preso no dialog
- fecha com `Esc`
- restaura foco no card de origem

## 7. Motion system (Ghost rules)

Regras duras:

- easing: `cubic-bezier(0.22, 1, 0.36, 1)`
- permitido: `opacity`, `blur`, `translateY`
- proibido: `scale`, `bounce`, `rotate`
- `translateY` maximo: `18px`

Composicao:

- uma secao = uma intencao de motion
- evitar animacoes concorrentes

`prefers-reduced-motion`:

- desliga parallax/lerp
- troca reveals por fade simples
- desliga Canvas/3D

## 8. Hero da pagina Portfolio

Objetivo: abrir com contexto e CTA direto.

Conteudo:

- H1: `portfolio showcase`
- Subtexto curto de posicionamento
- CTA primario: `vamos trabalhar juntos ->` para `#contact`

Video hero (opcional):

- desktop: `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/project-videos/video-heroPort.mp4`
- mobile: `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/project-videos/video-heroPort-mobile.mp4`

Regras:

- overlay escuro para contraste
- poster/fallback obrigatorio
- lazy fora da dobra

## 9. Gallery e cards

### 9.1 Card base

Cada card deve conter:

- midia de capa (`cover`)
- titulo (H3)
- meta opcional (cliente/ano)
- tags opcionais
- acao clara de abertura

### 9.2 Interacao

- Hover desktop: apenas opacidade/translateY sutil.
- Touch: feedback discreto sem escala.
- Clique abre modal ou rota interna.

### 9.3 Fallbacks

- imagem fallback para video
- skeleton durante loading
- tratamento de erro de asset

## 10. Acessibilidade da pagina

Checklist minimo:

- [ ] skip link para `main`
- [ ] foco visivel em todos os cards e botoes
- [ ] leitura por teclado da galeria ao modal
- [ ] ESC fecha modal
- [ ] foco retorna ao trigger original
- [ ] contraste AA no texto sobre midia

## 11. Performance e qualidade

Targets:

- LCP < 2.5s
- CLS < 0.1
- INP bom
- Lighthouse > 90

Estrategias:

- WebP + `srcset/sizes`
- compressao de video
- dynamic import para blocos pesados
- limitar DPR em WebGL
- antialias condicional

## 12. SEO da rota `/portfolio`

- `export const metadata` com title/description/OG
- `og:image` especifico da pagina
- JSON-LD (`Portfolio` + `CreativeWork`)

## 13. Estrutura recomendada de pastas

```txt
app/portfolio/page.tsx
app/portfolio/_components/PortfolioHero.tsx
app/portfolio/_components/ProjectsGallery.tsx
app/portfolio/_components/ProjectCard.tsx
app/portfolio/_components/ProjectModal.tsx
app/portfolio/_components/ModalRoot.tsx
app/portfolio/_data/projects.ts
app/portfolio/_hooks/useScrollLerp.ts
app/portfolio/_hooks/usePrefersReducedMotion.ts
lib/motion.ts
lib/math.ts
```

## 14. Checklists de validacao

### 14.1 Funcional

- [ ] Hero renderiza com H1 e CTA
- [ ] Grid denso desktop com spans via dados
- [ ] Lista vertical mobile sem placeholders
- [ ] Clique em card abre detalhe correto
- [ ] Modal fecha por ESC, botao e backdrop

### 14.2 Acessibilidade

- [ ] role/aria corretos no modal
- [ ] teclado navega por toda a pagina
- [ ] foco retorna ao card de origem
- [ ] reduced motion aplicado

### 14.3 Performance

- [ ] imagens e videos lazy quando aplicavel
- [ ] sem layout shift relevante
- [ ] sem bloqueios longos na thread principal
- [ ] resultado Lighthouse > 90

---

## 15. Prompt estruturado (prototype-prompt-generator)

### Role

Voce e um engenheiro(a) frontend especialista em portfolios editoriais de alta performance usando Next.js, Tailwind e Framer Motion.

### Task

Crie a pagina `/portfolio` com grid editorial denso, abertura de projeto por modal/rota e CTA de contato, seguindo Ghost Design System.

### Tech Stack

- Next.js App Router + React 18+ + TypeScript
- Tailwind CSS
- Framer Motion
- Lenis (opcional)
- R3F/Drei (opcional e nunca dominante)

### Visual Requirements

- layout desktop em grid 12 colunas com `grid-auto-flow: dense`
- cards com spans variaveis por contrato de dados
- mobile em lista vertical full-width
- visual premium e legivel

### Motion Requirements

- easing: `cubic-bezier(0.22, 1, 0.36, 1)`
- usar so `opacity`, `blur`, `translateY`
- proibido `scale`, `bounce`, `rotate`
- reduzir movimento para usuarios com preferencia reduzida

### Accessibility Requirements

- modal acessivel (`dialog`, `aria-modal`, focus trap, ESC)
- semantica correta e headings hierarquicos
- foco visivel e alvos touch >= 48x48

### Output Format

Entregar implementacao com:

1. componentes modulares por secao;
2. contrato `Project` aplicado;
3. modal com duas estrategias de roteamento;
4. fallbacks de video/3D/assets;
5. metadata SEO e JSON-LD.
