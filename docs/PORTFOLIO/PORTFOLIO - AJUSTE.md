# 🎬 PROTÓTIPO INTERATIVO COMPLETO — PÁGINA PORTFOLIO SHOWCASE
## Site: portfoliodanilo.com
## Sistema: Ghost Design System
## Documento Canônico — Estrutura + Motion + Interação + Parallax Lerp
## Versão: 2.0 — COM ANIMAÇÕES PARALLAX

> Baseado no layout **PORTFOLIO-PAGE-LAYOUYT.jpeg** + direção de parallax 3D (R3F/Drei) + grid responsivo tipo “portfolio showcase”.

---

## 1. Objetivo da Página/Sessão

- [x] **Qual a principal função desta página/sessão?**  
  Apresentar o **portfólio (cases/projetos)** com alto impacto visual, reforçar credibilidade (marcas atendidas) e gerar **conversão para contato/orçamento**.

- [x] **Qual ação o usuário deve realizar aqui?**  
  1) Explorar projetos no grid (scroll) →  
  2) Abrir um case/visualizar detalhes (opcional) →  
  3) Clicar no CTA **“vamos trabalhar juntos”** e/ou enviar mensagem no **formulário**.

- [x] **Como essa seção contribui para os objetivos do site?**  
  - **Prova social**: faixa de marcas + volume de trabalhos  
  - **Conversão**: CTA direto + formulário acessível  
  - **Qualificação**: projetos organizados por tipo/cliente, permitindo percepção rápida do “fit”

---

## 2. Estrutura de Conteúdo

### 2.1 Conteúdo principal
- [x] **Título principal (headline)**  
  `portfólio showcase` (com ênfase visual em “portfólio”)

- [x] **Subtítulo ou descrição (recomendado)**  
  Uma linha curta (ex.: “Seleção de projetos em branding, motion e digital.”)

- [x] **Elementos visuais**
  - **Hero**: 3 cards/banner horizontais (thumbnails grandes) + elementos decorativos 3D (ex.: “ghosts”)  
  - **Grid**: cards com thumbnails (mockups, stills, imagens) em tamanhos variados (spans)  
  - **Marcas**: logos em linha  
  - **Contato**: ícones (telefone/email/site/social) + form

- [x] **CTAs**
  - Hero: `vamos trabalhar juntos` (ícone/seta)
  - Grid: `veja mais`
  - Form: `Enviar Mensagem`

- [x] **Texto de apoio**
  - Cards: título + microdescrição (cliente / peça / categoria)  
  - Contato: microcopy (“Tem uma pergunta ou quer trabalhar junto?”)

### 2.2 Layout desejado (macroestrutura)
1. **Header / Nav** (logo + links)
2. **Hero Parallax Showcase** (cards + 3D decorativo + CTA)
3. **Grid de Projetos** (masonry/spans)
4. **Botão “veja mais”**
5. **Faixa “marcas com as quais já trabalhei”**
6. **Contato** (2 colunas)
7. **Footer**

---

## 3. Identidade Visual

### 3.1 Cores (tokens sugeridos)
- `--bg-900`: fundo principal (azul-marinho / quase preto)
- `--bg-800`: variação para containers
- `--primary-500`: azul elétrico (banda de marcas + destaques + botões)
- `--text-100`: branco/off-white (texto principal)
- `--text-300`: cinza claro (texto secundário)
- `--card-muted`: cinza médio (placeholders/skeleton/loading)

### 3.2 Tipografia
- Recomendada: **Inter** (400 / 500 / 600 / 700)
  - Headline: 700
  - CTA/labels: 600
  - Body: 400/500

*(Alternativas com vibe “agência”: Manrope / Poppins.)*

### 3.3 Ícones/Gráficos
- Ícones lineares para contato (telefone, email, site)
- Ícones sociais
- Setas/chevrons para CTA
- Elementos 3D decorativos no hero (estilo “soft/toy”)

---

## 4. Interatividade & Animações

### 4.1 Entrada/scroll (Framer Motion)
- Seções: `fade + slide-up` com `whileInView`
- Grid: `staggerChildren` para cards que entram na viewport
- Preferência: animações rápidas, suaves e com pouca distância (sem exageros)

### 4.2 Hover / microinterações (cards e CTAs)
- Cards do grid:
  - Elevação (translateY leve)
  - Zoom sutil da imagem (scale ~1.02–1.05)
  - Overlay com título/categoria (fade-in)
- CTAs:
  - Glow/realce no hover
  - Ícone desloca 2–4px (micro-movimento)

> Em touch: substituir hover por **tap** e manter `focus-visible`.

### 4.3 Parallax 3D (R3F/Drei)
- **Scroll Sync** no hero (câmera/cards) com smoothing via lerp
- **Mouse tracking** no desktop (tilt sutil nos planos/objetos)
- **Mobile**: reduzir intensidade e priorizar scroll-only (sem mouse tracking)
- **Reduced motion**: fallback 2D (ou parallax desativado)

### 4.4 Requisitos de performance (60fps)
- Evitar postprocessing pesado no MVP
- DPR adaptativo + assets otimizados
- Desligar/parcializar efeitos em mobile low-end

---

## 5. Responsividade

### 5.1 Mobile (<768px)
- Nav vira menu
- Hero mais curto e com menos elementos 3D (ou amplitude reduzida)
- Grid: 1 coluna (cards full width)
- Contato: coluna única (info acima do form)
- Hover vira tap/focus

### 5.2 Tablet (768–1024px)
- Grid: 2 colunas visuais (spans ajustados)
- Hero mantém parallax, porém mais suave

### 5.3 Desktop (≥1024px)
- Grid masonry completo (spans variados)
- Hover completo + mouse tracking no hero
- Layout com respiro e hierarquia forte

### 5.4 Telas grandes (>1440px / >1920px)
- Limitar largura com `max-width` (ex.: 1280–1440px)
- Aumentar gutters e espaçamentos
- Evitar “esticar” demais as imagens (manter composição)

---

## 6. Acessibilidade & SEO

### 6.1 Semântica
- `header`, `nav`, `main`, `section`, `footer`
- `h1` único (headline)
- `h2` para seções (“marcas…”, “contato”, etc.)

### 6.2 Imagens
- `alt` descritivo por projeto (não genérico)
- Logos com `alt="Marca X"` (ou `aria-label` se decorativo)

### 6.3 Contraste (WCAG AA)
- Garantir contraste adequado no fundo azul elétrico e no fundo escuro
- Evitar cinza claro muito fraco (texto secundário deve ser legível)

### 6.4 Teclado
- Cards como `<a>` (não `div onClick`)
- `:focus-visible` evidente
- Se houver modal/lightbox: trap de foco + ESC fecha

### 6.5 SEO (Next.js)
- `metadata`: title/description/OG/Twitter
- URLs canônicas
- `next/image` com `sizes` e dimensões fixas para reduzir CLS

---

## 7. Integrações ou Recursos Especiais

- [x] **Componentes dinâmicos**
  - Filtros por categoria (chips/tabs) *(opcional mas recomendado)*
  - `veja mais` (load more) com `aria-live="polite"`
  - Modal/lightbox (opcional)

- [x] **Dados vindos de API?**
  - MVP: `data.ts` local
  - Produção: API/CMS com validação (Zod)

- [x] **Formulário**
  - Campos: nome, email, telefone (opcional), mensagem
  - Validação: Zod + mensagens
  - Envio: route handler `/api/contact` → email/webhook
  - Proteções: rate limit + honeypot (+ reCAPTCHA opcional)

- [x] **Outros**
  - Lazy-loading de thumbnails
  - Skeletons para loading
  - Telemetria opcional (eventos de clique no CTA e submit)

---

## 8. Considerações Técnicas

### 8.1 Client/Server (Next.js App Router)
- `page.tsx`: Server (SEO + shell + data)
- `PortfolioPage.tsx`: Client (orquestra scroll/motion)
- `HeroParallax3D.tsx`: Client (R3F)
- `ProjectGrid.tsx / ProjectCard.tsx`: Client (motion + interação)
- Seções estáticas (Brands/Footer): Server ou Client (se animar)

### 8.2 Reutilização
- `ProjectGrid` reutilizável (home/categorias)
- `ProjectCard` reutilizável
- `BrandsBand` e `ContactSection` reutilizáveis

### 8.3 Organização modular
- `components/portfolio/*`
- `lib/portfolio/*` (types/data/variants)
- `hooks/*` (reduced motion, scroll mapping, smoothing)

### 8.4 Fallbacks
- Hero 3D: fallback 2D se:
  - `prefers-reduced-motion`
  - WebGL falhar
  - device low-end (heurística / performance monitor)
- Grid: skeletons
- Form: estados claros (loading/success/error)

### 8.5 Hooks para animação
- `usePrefersReducedMotion()`
- `useHeroParallax()` (scroll/pointer → targets 3D)
- `useInViewStagger()` (grid)
- `useSmoothScroll()` (opcional)

---
