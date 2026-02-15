# 🎬 PROTÓTIPO INTERATIVO — PÁGINA PORTFOLIO (Showcase)

Versão: **3.3 (layout + hover azul)** • Data: **2026-02-05**  
Produção: https://portfoliodanilo.com  
Repo: https://github.com/danilonovaisv/PORTFOLIO-DANILO-FINAL.git

> Este arquivo é a **fonte canônica** para a página **/portfolio**: estrutura, comportamento, animações e contratos de dados.
>
> **Design System (tokens + regras globais):** ver `GHOST-DESIGN-SYSTEM.md` (arquivo separado).

---

## Sumário

1. Contexto e objetivo
2. IA da página (ordem das seções)
3. Especificação por seção (Header → Hero → Gallery → Card)
4. Modal / Página interna (Tipo A / Tipo B)
5. Implementação (Next.js App Router + React)
6. Contrato de dados (Project) + exemplos
7. Checklists (validação + acessibilidade)

---

## 1) Contexto e objetivo

Criar a **página Portfolio Showcase completa** com:

- Hero Section com vídeo em loop
- Grid de projetos com **Parallax Lerp** (scroll suave)
- Modal/Página Interna de Projeto (**2 tipos**)
- Sistema de animação editorial silencioso
- Navegação e interação consistentes (mouse/touch/teclado)

---

## 2) IA da página

Ordem final (canônica):

1. Header
2. Hero (vídeo + título + CTA)
3. Projects Gallery (híbrido: grid editorial + parallax lerp)
4. Modal / Página interna (Tipo A / Tipo B)
5. Marcas
6. Contato
7. Footer

### Referências visuais (layout)

- Desktop: `PORTFOLIO-PAGE-LAYOUYT.jpeg`
- Mobile: `PORTFOLIO-PAGE-MOBILE.jpeg`

> Dica de repo: coloque imagens em `docs/assets/` e referencie no README/MD.

---

## 3) Especificação por seção (estrutura + comportamento)

## Estrutura da Página

### Ordem das Seções

1. Header
2. HeroSection
3. Projects Gallery
4. Portfolio Modal
5. Prajects
6. Clients / Brands
7. Contato
8. Footer

---

## Seções Detalhadas

# \*\*1. Header

**Comportamento:** Idêntico à página Home

#### Desktop

- Logo à esquerda
- Navegação à direita (Home, Sobre, Portfólio do Acaso, Contato)
- Link ativo (/sobre) destacado em `bluePrimary`
- Fundo translúcido sobre vídeo hero
- Borda inferior sutil em `bluePrimary`

#### Mobile

- Logo à esquerda
- Ícone menu (hambúrguer) à direita
- Menu overlay escuro ocupando tela inteira

#### Scroll

- Pode fixar no topo com fundo mais sólido
- Sem efeitos de scale/bounce

---

---

# \*\*🎥 HERO SECTION — VÍDEO LOOPING

**video hero desktop:** https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/project-videos/video-heroPort.mp4
**video hero mobile:** https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/project-videos/video-heroPort-mobile.mp4

### Estrutura HTML/JSX

```tsx
<section className="hero-section relative h-screen overflow-hidden">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="[URL_DO_VIDEO]" type="video/mp4" />
  </video>

  <div className="overlay absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

  <div className="content relative h-full flex flex-col items-center justify-center text-white px-4">
    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
      <span className="text-blue-400">portfólio</span> showcase
    </h1>
    <button className="cta bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full">
      vamos trabalhar juntos →
    </button>
  </div>
</section>
```

### Especificações Técnicas

**Vídeo:**

- `autoPlay`: inicia automaticamente
- `loop`: repete infinitamente
- `muted`: sem som (necessário para autoplay)
- `playsInline`: reproduz inline em mobile
- `object-fit: cover`: cobre toda a área

**video hero desktop:** https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/project-videos/video-heroPort.mp4
**video hero mobile:** https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/project-videos/video-heroPort-mobile.mp4

**Overlay:**

- Gradient vertical: `from-black/60 via-black/40 to-black/60`
- Garante legibilidade do texto sobre qualquer vídeo

**Título:**

- "portfólio" em azul (`text-blue-400`)
- "showcase" em branco

**CTA:**

- Cor: `bg-blue-500`
- Hover: `hover:bg-blue-600`
- Border radius: `rounded-full`
- Transição suave: `transition-all duration-300`
- Efeito scale no hover: `hover:scale-105`

- **ALINHAMENTO: O texto "portfólio showcase" e o botão de chamada para ação (CTA) "vamos trabalhar juntos" estão alinhados horizontalmente em um mesmo nível, formando uma única linha visual. Eles são posicionados centralizados na parte inferior da HERO.**

---

## 🎨 GALLERY — GRID VARIÁVEL (ARINO-STYLE)

- Sequência de larguras (12 col): **[8 / 4 / 4 / 8 / 4 / 8 / 4 / 12]** repetindo; variação só em largura.
- Tamanhos: `lg` → span 8/12; `sm|md` → span 4/12; `wide` → span 12/12. Sem row-span; altura fixa.
- Altura fixa: 320px desktop, 280px tablet. `object-fit: cover` em todas as mídias.
- Gap: 10px desktop / 12px mobile. Sem border-radius.
- Overlay azul integral no hover/focus (`rgba(0,87,255,0.7)`); overlay sempre visível no mobile.
- Sem parallax ou cursor-follow; cards estáticos com hover/focus apenas.
- Responsivo: desktop 12 col, tablet 8 col, mobile 1 col (altura auto).
- A11y/Motion: overlay também em `:focus-visible`; `prefers-reduced-motion` mantém cards estáticos.

## 🃏 PROJECT CARD — ANATOMIA COMPLETA

### Estrutura Visual

```tsx
<div className="card" onClick={onClick}>
  <div className="card-image-wrapper">
    <img src={project.image} alt={project.title} />
  </div>

  <div className="card-overlay">
    <h3>{project.title}</h3>
    <div className="card-meta">
      <span>{project.client}</span>
      <span>•</span>
      <span>{project.year}</span>
    </div>
    <div className="card-tags">
      {project.tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  </div>
</div>
```

### Estados do Card

#### Default

```css
.card {
  transform: none;
}

.card-overlay {
  opacity: 0;
}
```

#### Hover

```css
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}

.card-overlay {
  opacity: 1;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    transparent 100%
  );
}
```

#### Active (clique)

- Trigger modal/página interna
- Card permanece visível no fundo
- Backdrop escurece a página

---

---

## 4) Modal / Página interna (Tipo A e Tipo B)

## 🎭 MODAL / PÁGINA INTERNA — TIPOS

### 🅐 TIPO A — ZOOM VIEWER

**Quando usar:**

- Projeto visual simples
- Uma peça principal forte
- Foco em observação

**Layout:**

```
┌────────────────────────────────────┐
│  [X]                               │
│                                    │
│     ┌──────────────────────┐      │
│     │                      │      │
│     │   MÍDIA PRINCIPAL    │      │
│     │                      │      │
│     └──────────────────────┘      │
│                                    │
│  Título do Projeto                 │
│  Cliente • 2024 • tag tag          │
│                                    │
└────────────────────────────────────┘
```

**Código:**

```tsx
<div className="modal-type-a">
  <div className="media-container">
    <img src={project.image} alt={project.title} />
  </div>

  <div className="info-container">
    <h2>{project.title}</h2>

    <div className="meta">
      <span>{project.client}</span>
      <span>•</span>
      <span>{project.year}</span>
    </div>

    <div className="tags">
      {project.tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  </div>
</div>
```

---

### 🅑 TIPO B — PÁGINA INTERNA DE PROJETO

**Quando usar:**

- Projeto complexo
- Múltiplas entregas
- Contexto necessário

**Layout:**

```
┌────────────────────────────────────┐
│  [X]                               │
│                                    │
│  ┌──────────┐  ┌─────────────┐    │
│  │  MÍDIA   │  │   Título    │    │
│  │  HERO    │  │   Cliente   │    │
│  │          │  │   Ano       │    │
│  └──────────┘  │   Tags      │    │
│                │   Descrição │    │
│                └─────────────┘    │
│                                    │
│  ┌────────────────────────────┐   │
│  │  Galeria / Texto / Lista   │   │
│  └────────────────────────────┘   │
│                                    │
└────────────────────────────────────┘
```

**Código:**

```tsx
<div className="modal-type-b">
  <div className="hero-section">
    <div className="hero-media">
      <img src={project.image} alt={project.title} />
    </div>

    <div className="hero-info">
      <h2>{project.title}</h2>

      <div className="meta">
        <span>{project.client}</span>
        <span>•</span>
        <span>{project.year}</span>
      </div>

      <div className="tags">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <p className="description">{project.description}</p>
    </div>
  </div>

  {project.gallery && (
    <div className="gallery-section">
      {project.gallery.map((img, idx) => (
        <img key={idx} src={img} alt={`${project.title} - ${idx + 1}`} />
      ))}
    </div>
  )}
</div>
```

---

## 🎞️ ANIMAÇÃO — TIMELINE CANÔNICO DO MODAL

### 📍 ABERTURA DO MODAL

#### T = 0ms — Estado Inicial

```ts
// Backdrop
opacity: 0

// Modal Container
opacity: 0
scale: 0.98
y: 12px

// Conteúdo interno
visibility: hidden
opacity: 0
```

---

#### T = 0 → 180ms — Backdrop Aparece

```ts
backdrop {
  opacity: 0 → 1
  transition: linear 180ms
}
```

**CSS/Framer Motion:**

```tsx
<motion.div
  className="backdrop"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.18, ease: 'linear' }}
/>
```

---

#### T = 120 → 380ms — Container Aparece

```ts
modalContainer {
  opacity: 0 → 1
  scale: 0.98 → 1
  y: 12 → 0
  transition: cubic-bezier(0.22, 1, 0.36, 1) 260ms
  delay: 120ms
}
```

**CSS/Framer Motion:**

```tsx
<motion.div
  className="modal-container"
  initial={{ opacity: 0, scale: 0.98, y: 12 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.98, y: 8 }}
  transition={{
    opacity: { duration: 0.26 },
    scale: { duration: 0.26, ease: [0.22, 1, 0.36, 1] },
    y: { duration: 0.26, ease: [0.22, 1, 0.36, 1] },
  }}
/>
```

---

#### T = 380 → 520ms — Pausa Consciente

- **Nenhuma animação**
- Usuário reconhece contexto
- Estabilização visual
- Container está visível mas conteúdo ainda não

---

#### T = 520 → 760ms — Mídia Principal

```ts
mainMedia {
  opacity: 0 → 1
  transition: ease-out 240ms
  delay: 520ms
}
// ❌ Sem translate
// ❌ Sem scale
// Apenas presença
```

**Implementação:**

```tsx
<motion.div
  className="main-media"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{
    delay: 0.52,
    duration: 0.24,
    ease: 'easeOut',
  }}
>
  <img src={project.image} alt={project.title} />
</motion.div>
```

---

#### T = 760 → 960ms — Título

```ts
projectTitle {
  opacity: 0 → 1
  y: 6 → 0
  duration: 200ms
  delay: 760ms
}
```

**Implementação:**

```tsx
<motion.h2
  initial={{ opacity: 0, y: 6 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    delay: 0.76,
    duration: 0.2,
  }}
>
  {project.title}
</motion.h2>
```

---

#### T = 960 → 1120ms — Meta Informações

```ts
projectMeta {
  opacity: 0 → 1
  y: 4 → 0
  duration: 160ms
  delay: 960ms
}
```

**Implementação:**

```tsx
<motion.div
  className="meta"
  initial={{ opacity: 0, y: 4 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    delay: 0.96,
    duration: 0.16,
  }}
>
  <span>{project.client}</span>
  <span>•</span>
  <span>{project.year}</span>
</motion.div>
```

---

#### T = 1120 → 1500ms — Conteúdo Secundário

```ts
// Galeria, texto, bullets
secondaryContent {
  opacity: 0 → 1
  y: 8 → 0
  stagger: 80ms
  duration: 200ms
  delay: 1120ms (base)
}
```

**Implementação com Stagger:**

```tsx
{
  project.gallery?.map((img, idx) => (
    <motion.img
      key={idx}
      src={img}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 1.12 + idx * 0.08,
        duration: 0.2,
      }}
    />
  ));
}
```

---

### 📍 ESTADO IDLE (T > 1500ms)

**Após entrada completa:**

- ✅ Nenhuma animação contínua
- ✅ Nada flutua
- ✅ Nada pulsa
- ✅ Foco total em leitura
- ✅ Scroll interno habilitado
- ✅ Parallax do fundo está pausado (body overflow hidden)

---

### 📍 FECHAMENTO DO MODAL

#### T = 0 → 180ms — Container Sai

```ts
modalContainer {
  opacity: 1 → 0
  scale: 1 → 0.98
  y: 0 → 8
  transition: ease-in 180ms
}
```

#### T = 0 → 150ms — Backdrop Sai

```ts
backdrop {
  opacity: 1 → 0
  transition: linear 150ms
}
```

**Implementação:**

```tsx
<AnimatePresence>
  {selectedProject && (
    <PortfolioModal
      project={selectedProject}
      onClose={() => setSelectedProject(null)}
    />
  )}
</AnimatePresence>
```

---

## 🖱️ INTERAÇÃO — FLUXO COMPLETO

### 1️⃣ Usuário rola a página

- Parallax lerp ativo
- Cards se movem suavemente
- Imagens internas fazem parallax independente

### 2️⃣ Usuário passa mouse sobre card

```ts
onMouseEnter={() => setIsHovered(true)}

// CSS aplicado
.card-overlay {
  opacity: 0 → 1
  backdrop-filter: blur(4px)
}
```

### 3️⃣ Usuário clica em um card

```ts
onClick={() => setSelectedProject(project)}

// Ações
1. Estado atualizado
2. Modal renderizado via Portal
3. Scroll da página bloqueado (body overflow: hidden)
4. Foco move para o modal
```

### 4️⃣ Modal/Página Interna abre

- Backdrop aparece (0→180ms)
- Container aparece (120→380ms)
- Pausa (380→520ms)
- Conteúdo se revela em sequência (520→1500ms)
- Scroll interno disponível após 1500ms

### 5️⃣ Usuário lê/explora o projeto

- Scroll interno disponível
- Botão fechar sempre visível (fixed position)
- ESC funciona
- Click no backdrop funciona

### 6️⃣ Usuário fecha modal

**Gatilhos:**

- Click no backdrop
- Click no botão [X]
- Tecla ESC

**Código:**

```tsx
const handleClose = () => {
  setSelectedProject(null);
  // Body overflow restaurado automaticamente no useEffect cleanup
};

// ESC handler
useEffect(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape') handleClose();
  };
  window.addEventListener('keydown', handleEscape);
  return () => window.removeEventListener('keydown', handleEscape);
}, []);

// Backdrop click
<div
  onClick={(e) => {
    if (e.target === e.currentTarget) handleClose();
  }}
/>;
```

**Resultado:**

- Modal fecha com animação reversa
- Foco retorna ao card original
- Scroll da página é restaurado
- Parallax volta a funcionar

---

---

## 5) Implementação (React / Next.js)

> Objetivo aqui é **mapeamento de implementação** + blocos de código essenciais.
> Tokens e regras globais ficam no **Design System**.

## ⚛️ IMPLEMENTAÇÃO REACT COMPLETA

### Estado Global

```tsx
const [selectedProject, setSelectedProject] = useState<Project | null>(null);
```

### Hero Section

```tsx
<section className="relative h-screen overflow-hidden">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="video.mp4" type="video/mp4" />
  </video>

  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

  <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
      <span className="text-blue-400">portfólio</span> showcase
    </h1>
    <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
      vamos trabalhar juntos
      <span className="text-xl">→</span>
    </button>
  </div>
</section>
```

### Gallery com Parallax

```tsx
<section ref={galleryRef} className="gallery">
  <div
    ref={trackRef}
    className="gallery-track fixed grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 p-1"
  >
    {projects.map((project, index) => (
      <ProjectCard
        key={project.id}
        ref={(el) => (cardsRef.current[index] = el)}
        project={project}
        onClick={() => setSelectedProject(project)}
      />
    ))}
  </div>
</section>
```

### Modal com Portal

```tsx
import { createPortal } from 'react-dom';

{
  selectedProject &&
    createPortal(
      <PortfolioModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />,
      document.body
    );
}
```

### useEffect — Parallax Setup

```tsx
useEffect(() => {
  const handleScroll = () => startScroll();
  const handleResize = () => updateScroll();

  updateScroll();
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleResize);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };
}, []);
```

### useEffect — Modal Body Lock

```tsx
useEffect(() => {
  if (selectedProject) {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }
}, [selectedProject]);
```

---

## 🎨 ESTILO — CSS/TAILWIND COMPLETO

### Hero Section

```css
.hero-section {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.hero-section video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-section .overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.6) 100%
  );
}

.hero-section .content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 1rem;
}
```

### Gallery & Track

```css
.gallery {
  /* Height dinâmica via JS */
}

.gallery-track {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.25rem;
  padding: 0.25rem;
  will-change: transform;
}

@media (max-width: 1024px) {
  .gallery-track {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .gallery-track {
    grid-template-columns: repeat(1, 1fr);
  }
}
```

### Card

```css
.card {
  position: relative;
  height: 400px;
  overflow: hidden;
  background: #f3f4f6;
  border-radius: 0.5rem;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}

.card-image-wrapper {
  position: absolute;
  inset: 0;
  height: 135%;
  will-change: transform;
}

.card-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    transparent 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card:hover .card-overlay {
  opacity: 1;
}
```

### Modal

```css
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  max-height: 90vh;
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  overflow-y: auto;
  overscroll-behavior: contain;
}

@media (min-width: 768px) {
  .modal-container {
    padding: 3rem;
  }
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
<function_calls>
<invoke name="artifacts">
<parameter name="command">update</parameter>
<parameter name="id">prototipo_completo_final</parameter>
<parameter name="old_str">  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;</parameter>
<parameter name="new_str">  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
  cursor: pointer;
  z-index: 10;
}

.close-button:hover {
  background: rgba(0, 0, 0, 0.1);
}
```

---

## 📱 RESPONSIVO — BREAKPOINTS

### Desktop (≥1024px)

```css
.gallery-track {
  grid-template-columns: repeat(3, 1fr);
  gap: 0.25rem;
  padding: 0.25rem;
}

.modal-container {
  max-width: 1200px;
  padding: 3rem;
}

.card {
  height: 400px;
}
```

### Tablet (768px - 1023px)

```css
.gallery-track {
  grid-template-columns: repeat(2, 1fr);
}

.modal-container {
  max-width: 90vw;
  padding: 2rem;
}

.card {
  height: 350px;
}
```

### Mobile (<768px)

```css
.gallery-track {
  grid-template-columns: repeat(1, 1fr);
  gap: 0.5rem;
  padding: 0.5rem;
}

.modal-container {
  width: 95vw;
  padding: 1.5rem;
  border-radius: 1rem;
}

.card {
  height: 300px;
}

.hero-section h1 {
  font-size: 2rem;
}

.hero-section button {
  font-size: 0.875rem;
  padding: 0.625rem 1.5rem;
}
```

---

# **Seções Subsequentes**

Após esta seção, na ordem:

1. **Marcas / Clientes** (bloco com BG blueprimary - sessão igual as paginas anteriores)
2. **Contato** (formulário em fundo claro — contraste forte - sessão igual as paginas anteriores)
3. **Footer** (BG blueprimary - sessão igual as paginas anteriores)

### Transição para Seção de Marcas

- Padding-top generoso: 80–120px
- Pode ter linha divisória sutil
- Mantém fundo escuro ou inicia transição gradual

---

## Notas de Implementação

### Acessibilidade

- Heading hierarchy: `<h2>` para título principal
- Botões com `aria-label` descritivos se necessário
- Focus visible em todos os elementos interativos
- Contraste mínimo AA/AAA

### Performance

- Lazy load de assets se fora do viewport inicial
- Intersection Observer para animações
- `will-change` apenas durante animações

### Analytics

- Track impressions da seção
- Track clicks em cada CTA
- Track downloads do curriculum
- Eventos: `section_view`, `cta_click`, `cv_download`

### SEO

- Conteúdo semântico bem estruturado
- Texto alternativo em ícones (se relevante)
- Schema.org markup para pessoa/profissional (opcional)

---

## Variações Opcionais

### Versão com Linha do Tempo

- Adicionar mini timeline visual de carreira
- Apenas se não interferir na simplicidade

### Versão com Depoimento

- Quote curto de cliente/parceiro
- Posicionado entre parágrafos e CTAs
- Estilo ghost/sutil

### Versão com Social Proof

- Logos pequenos de 3-5 marcas principais
- Acima ou abaixo dos CTAs
- Escala de cinza, opacity 0.6

**Recomendação:** manter versão minimal e direta conforme especificado inicialmente.

### Estrutura sugerida no repo

**Rotas**

- `src/app/portfolio/page.tsx`

**Componentes**

- `src/components/portfolio/HeroPortfolio.tsx`
- `src/components/portfolio/ProjectsGallery.tsx`
- `src/components/portfolio/ProjectCard.tsx`
- `src/components/portfolio/PortfolioModal/PortfolioModal.tsx`
- `src/components/portfolio/PortfolioModal/ProjectTypeA.tsx`
- `src/components/portfolio/PortfolioModal/ProjectTypeB.tsx`

**Hooks (opcional, recomendado)**

- `src/components/portfolio/hooks/useParallaxLerp.ts`
- `src/components/portfolio/hooks/useBodyLock.ts`
- `src/components/portfolio/hooks/useFocusReturn.ts`

**Data**

- `src/content/projects.ts` (ou `src/data/projects.ts`)

---

## 6) Contrato de dados (Project) + exemplos

### Estrutura de Projeto

```typescript
interface Project {
  id: number;
  title: string;
  client: string;
  year: string;
  tags: string[];
  image: string;
  type: 'A' | 'B';
  description?: string;
  gallery?: string[];
  deliverables?: string[];
  links?: {
    label: string;
    url: string;
  }[];
}
```

### Exemplo de Projeto Tipo A

```typescript
{
  id: 1,
  title: 'Visual Identity',
  client: 'Tech Corp',
  year: '2024',
  tags: ['Branding', 'Design'],
  image: 'https://example.com/image.jpg',
  type: 'A',
  description: 'Complete visual identity redesign for a tech startup.'
}
```

### Exemplo de Projeto Tipo B

```typescript
{
  id: 2,
  title: 'Garoto - Nestlé',
  client: 'Nestlé',
  year: '2023',
  tags: ['Packaging', 'Campaign'],
  image: 'https://example.com/hero.jpg',
  type: 'B',
  description: 'Embalagens especiais GAROTO para páscoa com identidade renovada.',
  gallery: [
    'https://example.com/gallery-1.jpg',
    'https://example.com/gallery-2.jpg',
    'https://example.com/gallery-3.jpg'
  ],
  deliverables: [
    'Redesign de embalagens',
    'Campanha digital',
    'Materiais PDV',
    'Guidelines de marca'
  ],
  links: [
    { label: 'Ver campanha completa', url: 'https://example.com' }
  ]
}
```

## 📚 REFERÊNCIAS TÉCNICAS

### Parallax Lerp Original

- CodePen: https://codepen.io/danilonovaisv/pen/VYjejyb
- Técnica: Vertical Scrolling Parallax com Lerp
- Autor: danilonovaisv

### Ghost Design System

- Filosofia: Presença sem peso
- Motion: Editorial e silencioso
- Foco: Conteúdo sobre efeito

### Framer Motion

- Docs: https://www.framer.com/motion/
- AnimatePresence para mount/unmount
- Variants para animações complexas

### Performance

- Web Vitals: https://web.dev/vitals/
- requestAnimationFrame: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

---

## 🔄 VERSIONAMENTO

---

## 7) Checklists

### 7.1 Checklist de validação (funcional + Ghost QA)

## ✅ CHECKLIST DE VALIDAÇÃO COMPLETO

### Hero Section

- [ ] Vídeo carrega e faz loop corretamente
- [ ] Overlay garante legibilidade do texto
- [ ] CTA tem hover state claro
- [ ] Responsivo em todos os tamanhos
- [ ] Performance ok (vídeo <10MB)

### Grid de Projetos

- [ ] Cards respondem a hover suavemente
- [ ] Parallax lerp funciona em todos os cards
- [ ] Imagens carregam progressivamente
- [ ] Layout responsivo funciona
- [ ] Performance fluida em 60fps
- [ ] Scroll é natural (não hijacked)

### Modal/Página Interna

- [ ] Abertura silenciosa e orientada
- [ ] Pausa perceptível após container (380-520ms)
- [ ] Mídia aparece antes do texto
- [ ] Título antes dos detalhes
- [ ] Conteúdo secundário não compete
- [ ] Fechamento rápido e discreto
- [ ] Scroll interno funciona
- [ ] Não parece landing page

### Interação

- [ ] Click no card abre modal correto
- [ ] ESC fecha modal
- [ ] Click no backdrop fecha modal
- [ ] Click no botão [X] fecha modal
- [ ] Foco retorna ao card original
- [ ] Scroll da página bloqueado durante modal
- [ ] Parallax pausado durante modal
- [ ] Parallax retoma após fechar modal

### Acessibilidade

- [ ] `role="dialog"` presente
- [ ] `aria-modal="true"` presente
- [ ] `aria-label` em botões
- [ ] Foco gerenciado corretamente
- [ ] Screen reader compatível
- [ ] Navegação por teclado completa
- [ ] prefers-reduced-motion respeitado

### Ghost System

- [ ] Não parece landing page
- [ ] Mantém contexto do portfólio
- [ ] Leitura confortável
- [ ] Animação serve à leitura
- [ ] Coerente com página SOBRE
- [ ] Silencioso e editorial
- [ ] Foco no conteúdo, não no efeito

---

### 7.2 Checklist de acessibilidade (pré-deploy)

**Antes do Deploy:**

- [ ] Contraste de cores validado (WCAG AA/AAA)
- [ ] Navegação completa por teclado (Tab, Enter, Esc, Setas)
- [ ] Hierarquia semântica correta (H1 único, sequência H2-H6)
- [ ] ALT texts descritivos em todas as imagens
- [ ] `aria-label` em elementos interativos sem texto
- [ ] `prefers-reduced-motion` implementado
- [ ] Focus visível em todos os elementos interativos
- [ ] Testado com screen reader (NVDA/JAWS/VoiceOver)
- [ ] Zoom 200% sem quebra de layout
- [ ] Landmarks semânticos (`<main>`, `<nav>`, `<section>`)
- [ ] Vídeos com `aria-hidden` quando decorativos
- [ ] Formulários com labels associados
- [ ] Skip links para navegação rápida

---
