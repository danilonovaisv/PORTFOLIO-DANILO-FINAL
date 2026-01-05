
# 🎬 PROTÓTIPO INTERATIVO — PÁGINA PORTFOLIO
## Site: portfoliodanilo.com
## Sistema: Ghost Design System
## Documento Canônico — Estrutura + Motion + Interação

---

## 🎯 OBJETIVO DO PROTÓTIPO

Criar a **página Portfolio Showcase completa** com:

- Grid de projetos em cards visuais
- Modal/Página Interna de Projeto (2 tipos)
- Sistema de animação editorial silencioso
- Navegação fluida e contextual
- Coerência total com Ghost System

---

## 📐 ESTRUTURA DA PÁGINA

### 🧱 Hierarquia de Componentes

```
PortfolioShowcase
├── Hero Section
│   ├── Título "portfólio showcase"
│   └── CTA "vamos trabalhar juntos"
├── Projects Grid
│   └── ProjectCard[] (clicáveis)
├── Footer Brands
└── PortfolioModal (quando ativo)
    ├── Backdrop
    ├── ModalContainer
    │   ├── CloseButton
    │   ├── ProjectContent (Tipo A ou B)
    │   │   ├── MainMedia
    │   │   ├── ProjectTitle
    │   │   ├── ProjectMeta
    │   │   └── SecondaryContent (galeria/texto)
    └── AnimatePresence
```

---

## 🎨 LAYOUT — DESKTOP

### Hero Section
```
┌─────────────────────────────────────┐
│                                     │
│      portfólio showcase             │
│                                     │
│      [vamos trabalhar juntos →]     │
│                                     │
└─────────────────────────────────────┘
```

### Projects Grid
```
┌────────┬────────┬────────┐
│        │        │        │
│ Card 1 │ Card 2 │ Card 3 │
│        │        │        │
├────────┼────────┼────────┤
│        │        │        │
│ Card 4 │ Card 5 │ Card 6 │
│        │        │        │
└────────┴────────┴────────┘
```

**Especificações:**
- Grid: `3 colunas` em desktop
- Gap: `24px`
- Card aspect ratio: `4:3` ou `16:9`
- Hover: lift sutil + shadow
- Max-width container: `1400px`

---

## 📱 LAYOUT — MOBILE

### Projects Grid
```
┌──────────────┐
│              │
│   Card 1     │
│              │
├──────────────┤
│              │
│   Card 2     │
│              │
├──────────────┤
│              │
│   Card 3     │
│              │
└──────────────┘
```

**Especificações:**
- Grid: `1 coluna`
- Gap: `16px`
- Padding lateral: `16px`

---

## 🃏 PROJECT CARD — ANATOMIA

### Estrutura Visual
```tsx
<ProjectCard>
  <CardImage />
  <CardOverlay>
    <ProjectTitle />
    <ProjectMeta>
      <Client />
      <Year />
      <Tags />
    </ProjectMeta>
  </CardOverlay>
</ProjectCard>
```

### Estados

#### Default
- Imagem visível
- Overlay: `opacity: 0`
- Transform: none

#### Hover
```ts
// Card
transform: translateY(-4px)
box-shadow: 0 12px 24px rgba(0,0,0,0.08)

// Overlay
opacity: 0 → 0.95
backdrop-filter: blur(4px)
```

#### Active (clique)
- Trigger modal/página interna
- Card permanece visível no fundo (backdrop escurece)

---

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

**Conteúdo:**
- Mídia ampliada
- Título
- Cliente, Ano, Tags
- Botão fechar

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
│                └─────────────┘    │
│                                    │
│  ┌────────────────────────────┐   │
│  │  Galeria / Texto / Lista   │   │
│  └────────────────────────────┘   │
│                                    │
└────────────────────────────────────┘
```

**Conteúdo:**
- Hero interno
- Título + meta
- Galeria complementar
- Texto de contexto
- Lista de entregas
- Links relacionados

---

## 🎞️ ANIMAÇÃO — TIMELINE CANÔNICO

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
```

---

#### T = 0 → 180ms — Backdrop Aparece
```ts
backdrop {
  opacity: 0 → 1
  transition: linear
}
```

---

#### T = 120 → 380ms — Container Aparece
```ts
modalContainer {
  opacity: 0 → 1
  scale: 0.98 → 1
  y: 12 → 0
  transition: cubic-bezier(0.22, 1, 0.36, 1)
}
```

---

#### T = 380 → 520ms — Pausa Consciente
- **Nenhuma animação**
- Usuário reconhece contexto
- Estabilização visual

---

#### T = 520 → 760ms — Mídia Principal
```ts
mainMedia {
  opacity: 0 → 1
  transition: ease-out
}
// ❌ Sem translate
// ❌ Sem scale
// Apenas presença
```

---

#### T = 760 → 960ms — Título
```ts
projectTitle {
  opacity: 0 → 1
  y: 6 → 0
  duration: 200ms
}
```

---

#### T = 960 → 1120ms — Meta Informações
```ts
projectMeta {
  opacity: 0 → 1
  y: 4 → 0
  duration: 160ms
}
```

---

#### T = 1120 → 1500ms — Conteúdo Secundário
```ts
// Galeria, texto, bullets
secondaryContent {
  opacity: 0 → 1
  y: 8 → 0
  stagger: 80ms
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

---

### 📍 FECHAMENTO DO MODAL

#### T = 0 → 180ms — Container Sai
```ts
modalContainer {
  opacity: 1 → 0
  scale: 1 → 0.98
  y: 0 → 8
  transition: ease-in
}
```

#### T = 0 → 150ms — Backdrop Sai
```ts
backdrop {
  opacity: 1 → 0
  transition: linear
}
```

---

## 🖱️ INTERAÇÃO — FLUXO COMPLETO

### 1️⃣ Usuário navega pelo grid
- Cards respondem a hover
- Informações aparecem no overlay

### 2️⃣ Usuário clica em um card
```ts
onClick={() => setSelectedProject(project)}
```

### 3️⃣ Modal/Página Interna abre
- Backdrop escurece página
- Container aparece com animação
- Conteúdo se revela em sequência
- Scroll da página base é bloqueado

### 4️⃣ Usuário lê/explora o projeto
- Scroll interno disponível
- Botão fechar sempre visível
- ESC funciona

### 5️⃣ Usuário fecha modal
**Gatilhos:**
- Click no backdrop
- Click no botão [X]
- Tecla ESC

**Resultado:**
```ts
setSelectedProject(null)
// Modal fecha com animação reversa
// Foco retorna ao card original
// Scroll da página é restaurado
```

---

## ⚛️ IMPLEMENTAÇÃO — CÓDIGO BASE

### Estado Global
```tsx
const [selectedProject, setSelectedProject] = useState<Project | null>(null)
```

### Grid de Cards
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {projects.map(project => (
    <ProjectCard
      key={project.id}
      project={project}
      onClick={() => setSelectedProject(project)}
    />
  ))}
</div>
```

### Modal com AnimatePresence
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

### Modal Container
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.98, y: 12 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.98, y: 8 }}
  transition={{
    opacity: { duration: 0.26 },
    scale: { duration: 0.26, ease: [0.22, 1, 0.36, 1] },
    y: { duration: 0.26, ease: [0.22, 1, 0.36, 1] }
  }}
>
  <ModalContent project={selectedProject} />
</motion.div>
```

### Conteúdo com Stagger
```tsx
const contentVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.12 + (i * 0.08),
      duration: 0.2
    }
  })
}
```

---

## 🎨 ESTILO — CSS/TAILWIND

### Modal Container
```tsx
className="
  max-w-[1200px]
  max-h-[90vh]
  mx-auto
  bg-white
  rounded-3xl
  p-8
  md:p-12
  overflow-y-auto
  overscroll-contain
"
```

### Backdrop
```tsx
className="
  fixed inset-0
  bg-black/60
  backdrop-blur-sm
  z-50
"
```

### Close Button
```tsx
className="
  absolute top-4 right-4
  w-10 h-10
  rounded-full
  bg-black/5
  hover:bg-black/10
  transition-colors
  flex items-center justify-center
"
```

---

## 🚫 PROIBIÇÕES ABSOLUTAS

### Na Página Grid
- ❌ Animações agressivas
- ❌ Autoplay de vídeos
- ❌ Carrosséis automáticos
- ❌ Parallax exagerado

### No Modal/Página Interna
- ❌ Animação por scroll interno
- ❌ Parallax dentro do modal
- ❌ Blur decorativo
- ❌ Spring / bounce
- ❌ Entrada simultânea de tudo
- ❌ Linguagem de landing page
- ❌ CTAs promocionais

---

## ♿ ACESSIBILIDADE

### Modal
```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="project-title"
>
```

### Foco
1. Modal abre → foco vai para botão fechar
2. Modal fecha → foco retorna ao card original

### Teclado
- `ESC` fecha modal
- `Tab` navega elementos internos
- `Shift + Tab` navegação reversa

### Screen Readers
```tsx
<button
  aria-label="Fechar visualização do projeto"
  onClick={onClose}
>
```

---

## ⚡ PERFORMANCE

### Otimizações
- Lazy load de imagens do grid
- `will-change` apenas no modal container
- Portal para renderizar modal no final do body
- `overscroll-contain` no scroll interno
- Backdrop com `backdrop-filter: blur(4px)` leve

### Código
```tsx
// Portal
import { createPortal } from 'react-dom'

return createPortal(
  <ModalContent />,
  document.body
)
```

---

## 📱 RESPONSIVO — BREAKPOINTS

### Desktop (≥1024px)
- Grid 3 colunas
- Modal: 1200px max-width
- Padding: 32px

### Tablet (768px - 1023px)
- Grid 2 colunas
- Modal: 90vw
- Padding: 24px

### Mobile (<768px)
- Grid 1 coluna
- Modal: full width com border-radius reduzido
- Padding: 16px
- Scroll interno mais evidente

---

## ✅ CHECKLIST DE VALIDAÇÃO

### Grid de Projetos
- [ ] Cards respondem a hover
- [ ] Imagens carregam progressivamente
- [ ] Layout responsivo funciona
- [ ] Performance fluida em 60fps

### Modal/Página Interna
- [ ] Abertura silenciosa e orientada
- [ ] Pausa perceptível após container
- [ ] Mídia aparece antes do texto
- [ ] Título antes dos detalhes
- [ ] Conteúdo secundário não compete
- [ ] Fechamento rápido e discreto

### Interação
- [ ] Click no card abre modal correto
- [ ] ESC fecha modal
- [ ] Click no backdrop fecha modal
- [ ] Foco retorna ao card original
- [ ] Scroll da página bloqueado durante modal

### Acessibilidade
- [ ] `role="dialog"` presente
- [ ] `aria-modal="true"` presente
- [ ] Foco gerenciado corretamente
- [ ] Screen reader compatível

### Ghost System
- [ ] Não parece landing page
- [ ] Mantém contexto do portfólio
- [ ] Leitura confortável
- [ ] Animação serve à leitura
- [ ] Coerente com página SOBRE

---

## 🧪 TESTES RECOMENDADOS

### Funcionalidade
1. Abrir/fechar modal múltiplas vezes
2. Testar todos os gatilhos de fechamento
3. Scroll interno em conteúdos longos
4. Navegação por teclado completa

### Performance
1. Verificar FPS durante animações
2. Testar em dispositivos mais lentos
3. Medir tempo de carregamento de imagens
4. Validar sem memory leaks

### Acessibilidade
1. Testar com screen reader
2. Navegar apenas com teclado
3. Testar com prefers-reduced-motion
4. Validar contraste de cores

---

## 🎯 RESULTADO ESPERADO

O usuário deve:
1. ✅ Ver grid de projetos organizado e convidativo
2. ✅ Sentir curiosidade ao hover nos cards
3. ✅ Clicar naturalmente para explorar
4. ✅ Experimentar abertura calma e orientada
5. ✅ Ler conteúdo sem distrações
6. ✅ Fechar modal e voltar exatamente onde estava
7. ✅ Sentir continuidade, não ruptura

**O modal não é um destino — é uma extensão natural da página.**

---

## 🧠 PRINCÍPIO FINAL

> **"A Página Interna de Projeto existe para aprofundar, não para impressionar."**

Cada elemento serve à **leitura**, cada animação serve à **orientação**, cada decisão preserva o **Ghost System**.

---

## 🤖 PROMPT EXECUTOR — AGENT COPILOT

```md
Você deve implementar a Página Portfolio Showcase completa conforme este protótipo canônico.

Arquivos a criar/modificar:
- PortfolioShowcase.tsx (página principal)
- ProjectCard.tsx (card do grid)
- PortfolioModal.tsx (modal/página interna)
- ProjectContent.tsx (conteúdo interno: Tipo A e B)

Objetivo:
Sistema completo de portfólio com grid de projetos e visualização modal, seguindo Ghost System.

Ações obrigatórias:
1. Criar grid responsivo de project cards
2. Implementar hover states nos cards
3. Criar modal/página interna com AnimatePresence
4. Aplicar timeline de animação canônico (T=0 até T=1500ms)
5. Implementar tipos A (Zoom Viewer) e B (Página Interna)
6. Gerenciar foco e acessibilidade
7. Bloquear scroll da página durante modal
8. Implementar todos os gatilhos de fechamento

Regras de motion:
- Backdrop: 0→180ms (linear)
- Container: 120→380ms (ease-out custom)
- Pausa: 380→520ms
- Mídia: 520→760ms
- Título: 760→960ms
- Meta: 960→1120ms
- Secundário: 1120→1500ms (stagger 80ms)

Regras de implementação:
- ✅ Usar Framer Motion + AnimatePresence
- ✅ Criar Portal para modal
- ✅ Gerenciar foco com useEffect
- ✅ Respeitar prefers-reduced-motion
- ✅ Lazy load de imagens
- ❌ Não adicionar efeitos além do especificado
- ❌ Não usar animações por scroll interno
- ❌ Não criar linguagem de landing page

Critérios de aceite:
- Grid responsivo e performático
- Modal abre/fecha conforme timeline
- Foco retorna ao card original
- Acessibilidade completa
- Coerente com Ghost System
- Leitura confortável e sem distrações
```

---

**FIM DO PROTÓTIPO INTERATIVO**
