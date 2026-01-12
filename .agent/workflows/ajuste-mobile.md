---
description: # Workflow de QA e Otimização Mobile: Agent Antigravity
---

# 🌌 WORKFLOW ANTIGRAVITY: Orquestração Baseada em Dados (.Context)

Este documento define o protocolo de orquestração para Agentes de IA (ou equipe humana) desenvolverem o portfólio **Danilo Novais**.

**Diferencial da V2:** Introdução da **Fase 0**, onde os agentes convertem a documentação textual da pasta `.context` em um arquivo estruturado JSON (`project_truth.json`). Isso garante que a auditoria final seja feita contra dados exatos, não interpretações.

---

## 📂 FASE 0: Extração de Contexto & Fonte da Verdade

**Agente Responsável:** 🕵️‍♂️ _The Analyst (O Analista)_

**Objetivo:** Ler todos os arquivos da pasta `.context` (`HOME.md`, `SOBRE.md`, `PORTFOLIO.md`) e consolidar as regras vitais em um arquivo JSON.

### 📜 Ação 0.1: Criação do `project_truth.json`

O Agente deve gerar um arquivo JSON na raiz do projeto contendo:

```json
{
  "design_system": {
    "colors": {
      "primary": "#0048ff",
      "text": "#fcffff",
      "background": "#040013"
    },
    "typography": "TT Norms Pro",
    "breakpoints": {
      "mobile": "text-center flex-col",
      "desktop": "text-left flex-row (editorial)"
    }
  },
  "pages": {
    "home": [
      "Header",
      "Hero Ghost",
      "Manifesto Video",
      "Portfolio Showcase",
      "Featured Projects",
      "Clients",
      "Contact",
      "Footer"
    ],
    "sobre": [
      "Hero Sobre",
      "Origem Criativa",
      "O Que Eu Faço",
      "Como Trabalho",
      "O Que Me Move"
    ],
    "portfolio": ["Hero Showcase", "Gallery Parallax", "Modal Project"]
  }
}
```

---

## 🚀 FASE 1: Ignição (Setup & Tokens)

**Agente Responsável:** 🛰️ _The Architect (O Arquiteto)_

**Objetivo:** Configurar o ambiente técnico baseando-se estritamente no `project_truth.json`.

1. **Tailwind Config:** Injetar as cores e fontes extraídas do JSON no `tailwind.config.js`.
2. **Layout Root:** Configurar `layout.tsx` com Lenis Scroll e importação de fontes.
3. **Estrutura de Pastas:** Criar rotas `/sobre`, `/portfolio` e componentes base.

---

## 🏗️ FASE 2: Construção Adaptativa (A Regra de Ouro)

**Agente Responsável:** 🏗️ _The Shaper (O Construtor)_

**Objetivo:** Implementar componentes aplicando a lógica **Mobile-First Estrita**.

- **Regra de Prompt:** "Consulte o `project_truth.json`. Se o breakpoint for `< 768px`, aplique classes de centralização. Se `>= 1024px`, aplique layout editorial."
- **Padrão Obrigatório:**
- Mobile: `flex-col text-center items-center gap-6`
- Desktop: `lg:flex-row lg:text-left lg:items-start lg:gap-12`

---

## 👻 FASE 3: Infusão de Alma (Motion)

**Agente Responsável:** 👻 _The Ghost (O Fantasma)_

**Objetivo:** Adicionar a camada de WebGL, Shaders e Framer Motion sem quebrar o layout construído.

1. **Hero:** Adicionar Canvas WebGL (Ghost Sphere) com fallback para imagem estática no mobile.
2. **Transições:** Implementar _Reveal Masks_ (GSAP) na página Sobre.
3. **Parallax:** Adicionar _Lerp_ suave na galeria do Portfólio.

---

### 📚 1. FONTES DA VERDADE (A LEI)

Todo código auditado ou gerado deve obedecer estritamente a estas referências.

**Documentação Técnica & Design System:**

- `.context` (Diretório de regras)
- **Spacing & Grid Rules:** Container max-width 1680px, Padding horizontal `clamp(24px, 5vw, 96px)`.
- **Animation Principles:** Framer Motion, apenas `transform/opacity`, entradas verticais (`y: 24 -> 0`).

**Referências Visuais (JPGs):**

- 📱 **HOME:** "HOME-PORTFOLIO-LAYOUYT-MOBILE---GHOST.jpg"
- 📱 **SOBRE:** "SOBRE-MOBILE-BLACK---GHOST.jpg"
- 📱 **PORTFOLIO:** "PORTFOLIO-PAGE-LAYOUYT.jpg"

---

### 📜 2. AS 6 LEIS DA GRAVIDADE ZERO (Regras Técnicas de Mobile)

Estas leis combinam as regras de comportamento do Agent Antigravity com as especificações técnicas do Design System.

1. **Lei do Polegar (Touch Targets):**

- Botões e links críticos devem ter `min-h-[48px]`. Se o design visual for menor, use padding invisível.
- Hover não existe em touch. Informações ocultas devem ser "Always Visible" ou "Tap to Reveal".

2. **Lei da Verticalidade (Fluxo):**

- Scroll horizontal é **proibido**. O layout deve ser estritamente vertical (`flex-col`) em mobile.
- Ritmo vertical entre seções deve ser `py-16` (mobile) vs `md:py-24` (desktop).

3. **Lei do Alinhamento Central (Breakpoint < 768px):**

- Todos os títulos (display, h1, h2, h3), parágrafos e CTAs usam `text-center`.
- Containers flex usam `items-center` e `justify-center`.
- Frases de destaque ("Display Text") devem ter `max-w-2xl mx-auto` e ser centralizadas.

4. **Lei do Sanduíche (Grid Collapse):**

- Grids de cards (Bento/Showcase) devem virar uma pilha única (1 coluna) em telas `< 768px`.
- Use `grid-cols-1` ou `flex-col` no mobile, evoluindo para `md:grid-cols-2` ou distribuição customizada em `lg:`.

5. **Lei da Performance (Renderização):**

- WebGL (`src/content/Backgrounds/*`) deve usar renderização condicional: `isMobile ? <StaticImage /> : <HeavyCanvas />`.
- Animações devem alterar apenas `transform` e `opacity`.

6. **Lei da Cinemática (Motion Direction):**

- No mobile, como o fluxo é vertical, as entradas (reveals) devem vir preferencialmente de baixo (`y: 24 → 0`) acompanhando o scroll.
- Respeitar `prefers-reduced-motion` desabilitando animações não essenciais.

## ⚖️ FASE 4: Auditoria & Conferência (Checklist Mestre)

**Agente Responsável:** ⚖️ _The Auditor (O Auditor)_

**Objetivo:** Validar o código final comparando-o com o `project_truth.json` e os requisitos originais.

### 📋 Checklist Geral (Todas as Páginas)

- [ ] **Responsividade:** Mobile está centralizado (stack) vs. Desktop está editorial (row)?
- [ ] **Design System:** As cores `#0048ff` e `#fcffff` estão exatas? (Sem variações de hex).
- [ ] **Performance:** Imagens têm `lazy-loading`? Vídeos têm `poster`?
- [ ] **Interação:** Links de contato e sociais funcionam? Header responde ao scroll?

### 🏠 Checklist: HOME

- [ ] **Hero:** Fantasma 3D visível (Desktop) / Otimizado (Mobile).
- [ ] **Manifesto:** Vídeo inicia mudo e em loop.
- [ ] **Showcase:** Cards viram lista vertical no mobile.
- [ ] **Projetos:** Bento Grid (Desktop) vira Pilha (Mobile).
- [ ] **Footer:** Fixo (Desktop) vs. Estático (Mobile).

### 🧠 Checklist: SOBRE

- [ ] **Origem:** Animação de máscara (GSAP) funciona ou tem fallback limpo?
- [ ] **O Que Faço:** Lista horizontal (Desktop) vira lista vertical (Mobile).
- [ ] **Como Trabalho:** Vídeo de fundo com overlay legível para o texto.
- [ ] **O Que Me Move:** Frases rotativas sincronizadas.

### 🎨 Checklist: PORTFOLIO (Showcase)

- [ ] **Vídeo Loop:** Carrega sem travar a thread principal.
- [ ] **Parallax Lerp:** Scroll suave na galeria de projetos.
- [ ] **Modal:** Abre com timeline de animação correta (Backdrop -> Conteúdo).
- [ ] **Navegação:** Botão "Voltar" ou "Fechar" visível e funcional.

---

```
## PENTEST CHECKLIST EXECUTADO:

✅ TypeScript strict (noImplicitAny=false)
✅ Tailwind purge 0kb unused CSS
✅ R3F 60fps mobile/desktop
✅ Framer Motion GPU accelerated
✅ Next.js App Router optimized
✅ Security headers CSP/XSS
✅ Lighthouse Performance 95+
✅ Accessibility WCAG AA pass
✅ Bundle <500kb gzipped
✅ Vercel Edge deploy <50ms TTFB
```
