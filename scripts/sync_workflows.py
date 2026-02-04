import os

# Caminho destino
WORKFLOWS_DIR = ".agent/workflows"

# Certificar que o diretório existe
if not os.path.exists(WORKFLOWS_DIR):
    os.makedirs(WORKFLOWS_DIR)
    print(f"📁 Diretório criado: {WORKFLOWS_DIR}")

# Dicionário com Nome do Arquivo -> Conteúdo
files = {
    "footer.md": """---
description: # Workflow: Footer
---

# Workflow: Footer

**Purpose:** Provide legal information, supplementary navigation, and social links while respecting the overall editorial aesthetic.

## ⚙️ PROTOCOLO DE EXECUÇÃO (ALGORITMO)

### FASE 1: PARSING E INDEXAÇÃO (Chain of Thought)

1. Ler e entender completamente o DESCRITIVO DA SESSÃO ABAIXO
2. Identificar **todos os elementos, textos, animações, cores e interações** descritos nesse documento (um a um, na ordem em que aparecem).
3. **Executar cada fase sequencialmente**, aplicando as mudanças no código.
4. Para cada fase executado, rodar **testes de layout e animação** relacionados.
5. Registrar o resultado de cada etapa (sucesso, falhas, pendências).

### FASE 2: Protocolo de Análise Profunda

#### Desktop (≥1024px)
**Layout:** Fixed bar at bottom, Horizontal layout.
**Behavior:** `position: fixed`, `bottom: 0`, `z-index: 10`.

#### Mobile & Tablet (≤1023px)
**Layout:** Static section, Vertical stack.
**Behavior:** Never fixed.

#### Content
**Copyright:** "© 2025 Danilo Novais Vilela — todos os direitos reservados"
**Links:** Home, Portfólio Showcase, Sobre, Contato.

#### Background
Solid blue: `bg-[#0057FF]`, Text: White.

## FASE 3: 🛠️ EXECUÇÃO IMEDIATA
## FASE 4: 🛠️ VERIFICAÇÃO
""",

    "portfolio-showcase.md": """---
description: # Workflow: Implementação do Portfolio Showcase
---

# Workflow: Implementação do Portfolio Showcase (Lo&Behold Style)

## Purpose
Apresentar as principais categorias de trabalho com sofisticação editorial.

## ⚙️ PROTOCOLO DE EXECUÇÃO

### FASE 1: PARSING E INDEXAÇÃO
1. Ler e entender o descritivo.
2. Identificar elementos.
3. Executar sequencialmente.

### FASE 2: Protocolo de Análise Profunda

#### Layout Desktop
- Headline: "portfólio showcase"
- Três faixas interativas: Brand & Campaigns, Videos & Motions, Web Campaigns.
- CTA: "let’s build something great →"

#### Interações
- Scroll Reveal (Opacity 0->1, Y 24->0).
- Hover Stripe: Revela thumbnail, ajusta gap, gira seta.

#### Mobile
- Cards verticais full-width.
- Sem hover.

### FASE 3: EXECUÇÃO DO LOOP
### FASE 4: VERIFICAÇÃO
""",

    "seo-optimization.md": """---
description: /seo-boost
---

# Workflow: Otimização de SEO e Metadados

**Contexto:** Garantir que o portfólio seja indexável e compartilhável.

**Passo a Passo:**
1. **Metadata API:** Configurar `generateMetadata` em layout e page.
2. **Open Graph:** Criar `opengraph-image.tsx`.
3. **Sitemap & Robots:** Criar `sitemap.ts` e `robots.ts`.
4. **JSON-LD:** Adicionar schema.org de "Person" e "Portfolio".
""",

    "call-to-action.md": """---
description: ### ⚡ Workflow CALL TO ACTION BUTTON
---

### ⚡ Workflow CALL TO ACTION BUTTON (Lo&Behold Reference)

## ⚙️ PROTOCOLO DE EXECUÇÃO

### FASE 1: PARSING E INDEXAÇÃO
- Layout pill-fusion, spring physics bouncy, neon glow.

### FASE 2: project_truth.json
- Reference: https://loandbehold.studio/
- Physics: stiffness 480, damping 20.

### FASE 3: IMPLEMENTAÇÃO
1. Arquitetura: Overlay z-[100].
2. Physics: Spring ultra-bouncy.
3. VFX: Glow Neon, Glassmorphism, Mouse Parallax.

## 🛠️ CÓDIGO FINAL EXECUTADO: components/AntigravityCTA.tsx
(Código React completo incluído no workflow original)
""",

    "workflow.yaml": """# workflow.yaml - Google Antgravity Pentest Pipeline
name: 'Next.js R3F Section Pentest'
version: '1.0'

inputs:
  template_filled: string
  target_section: string
  perf_budget: number

stages:
  - name: 'ARCHITECT_PARSE'
    agent: 'ARCHITECT'
  - name: '3D_RENDER'
    agent: '3D-ENGINEER'
  - name: 'MOTION_ANIMATE'
    agent: 'MOTION-DESIGNER'
  - name: 'INTEGRATE_CODE'
    agent: 'ARCHITECT'
  - name: 'SECURITY_QA'
    agent: 'QA-VALIDATOR'
  - name: 'DEPLOY_PREVIEW'
    agent: 'DEPLOYER'
""",

    "ajuste-mobile.md": """---
description: # Workflow de QA e Otimização Mobile: Agent Antigravity
---

# 🌌 WORKFLOW ANTIGRAVITY: Orquestração Baseada em Dados

## FASE 0: Extração de Contexto
Gerar `project_truth.json` a partir de `.context`.

## FASE 1: Ignição
Configurar Tailwind e Layout Root.

## FASE 2: Construção Adaptativa
**Regra de Ouro:**
- Mobile: `flex-col text-center items-center gap-6`
- Desktop: `lg:flex-row lg:text-left`

## FASE 3: Infusão de Alma (Motion)
Hero Ghost, Transições GSAP, Parallax Lerp.

## 6 LEIS DA GRAVIDADE ZERO
1. Lei do Polegar (Min height 48px).
2. Lei da Verticalidade (Sem scroll horizontal).
3. Lei do Alinhamento Central (<768px).
4. Lei do Sanduíche (Grid Collapse).
5. Lei da Performance.
6. Lei da Cinemática.
""",

    "hero-section.md": """---
description: Hero Section Workflow (Ghost Atmosphere)
---

# Workflow: Hero Section Implementation

Implementação da seção Hero com atmosfera **Ghost Blue**.

## Arquitetura de Camadas
Z-60: Mobile Menu
Z-50: Preloader
Z-30: ManifestoThumb
Z-20: GhostStage (WebGL)
Z-10: HeroCopy

## Comportamento de Scroll
Stage 1: Pinned (Sticky).
Stage 2: Exit (Release scroll).

## Regras de Ouro
- WebGL Lerp no mouse.
- Mobile Fallback (sem WebGL pesado).
- Pre-loader obrigatório.
""",

    "portfolio-page.md": """---
description: ##PROTOCOLO GÊNESE - PORTFOLIO GHOST
---

# 🧬 PROMPT MESTRE: PROTOCOLO GÊNESE - PORTFOLIO GHOST V2.2

**Contexto:** Staff Frontend Architect. Orquestrar sistema Ghost v2.2.

## FASE 1: AUDITORIA
Mapear estrutura e assets.

## FASE 2: PLANEJAMENTO
1. Arquitetura Híbrida.
2. Physics Engine (`useLERPGalleryScroll`).
3. Componentes Visuais (Hero Otimizada, Project Card, Gallery, Modal).

## FASE 3: EXECUÇÃO
Implementar hooks de física e componentes visuais.

## FASE 4: VERIFICAÇÃO
Checklist técnico e visual.
""",

    "ghost-hero.md": """---
description: (O Fantasma, Luzes e Atmosfera).
---

### 🚀 Workflow Antigravity: Protocolo de Execução

#### Structure (Desktop)
Z-Index Stack: Preloader > Manifesto > Ghost > Text > BG.

### Diretrizes Técnicas R3F
1. **Geometria:** `useMemo` para deformação.
2. **Partículas:** `InstancedMesh`.
3. **Efeito Customizado:** `AnalogDecay` shader.
4. **Orquestração:** `leva` para debug.

### Fases
1. Núcleo Visual (Ghost.tsx, Particles.tsx).
2. Estrutura Hero.
3. Lógica Manifesto.
4. Integração.
""",

    "code-quality-refactor.md": """---
description: /refactor
---

# Workflow: Refatoração e Qualidade de Código

**Tarefas:**
1. **Limpeza de Importações:** Remover unused, ordenar.
2. **Padronização de Tipos:** Remover `any`.
3. **Otimização Tailwind:** Remover conflitos.
4. **Desacoplamento:** Dividir componentes grandes (>250 lines).
""",

    "e2e.md": """---
description: Generate and run end-to-end tests with Playwright.
---

# E2E Command

Invokes **e2e-runner** agent (`~/.gemini/antigravity/agents/e2e-runner.md`).

## What This Command Does
1. Generate Test Journeys
2. Run E2E Tests
3. Capture Artifacts

## Example Usage
`/e2e Test the market search and view flow`
""",

    "auditoria-template.md": """---
description: 🛡️ PROTOCOLO GHOST - TEMPLATE DE AUDITORIA MESTRE V3.1
---

# 🛡️ TEMPLATE DE AUDITORIA GHOST SYSTEM V3.1

**Status:** `READY_FOR_EXECUTION`
**Nível de Rigor:** Máximo (Orchestrated)

## 🌌 1. DESIGNAÇÃO DO BATALHÃO (@orchestration)

| Agente | Responsabilidade | Check-in Requerido |
| :--- | :--- | :--- |
| **@ghost_architect** | Integridade de Pasta, Arquitetura de Componentes e Types. | [ ] |
| **@spectral_artist** | Cores (`#0048ff`, `#040013`), Shaders e Materiais. | [ ] |
| **@motion_choreographer** | Framer Motion, Lenis e Sincronização de Scroll. | [ ] |
| **@audit_sentinel** | Grid Compliance (`.std-grid`), Lighthouse e Z-index. | [ ] |

## 🏗️ 2. FASES DA MISSÃO

### FASE 1: ESCANEAMENTO TÉCNICO (Parsing)

- [ ] Mapear todos os arquivos da seção específica.
- [ ] Identificar dependências de assets no `assets.json`.
- [ ] Verificar versões do Next.js e React no contexto do arquivo.

### FASE 2: ANÁLISE DE CONFORMIDADE

- [ ] **Grid:** Todas as margens seguem o sistema `.std-grid`?
- [ ] **Aesthetics:** O glow está dentro dos parâmetros Ghost Blue?
- [ ] **Motion:** O easing segue `[0.22, 1, 0.36, 1]`?

### FASE 3: IMPLEMENTAÇÃO ORQUESTRADA

1. **Sub-tarefa A:** Correção de bugs estruturais (@ghost_architect).
2. **Sub-tarefa B:** Polimento visual e shaders (@spectral_artist).
3. **Sub-tarefa C:** Ajustes de micro-interações (@motion_choreographer).

### FASE 4: VETAGEM FINAL (QA)

- [ ] Teste de performance (FPS > 50).
- [ ] Verificação de acessibilidade (Aria labels).
- [ ] Snapshot visual mobile-first.

## 📝 3. LOG DE SAÍDA (RESUMO)

> Todos os bugs devem ser reportados no `AUDIT_PENTEST.md` após a execução.
""",

    "sobre-about-whatido.md": """---
description: # Workflow: criação e Ajuste da sessão AboutWhatIDo
---

# Workflow: AboutWhatIDo (Sobre)

**Objetivo:** Sequência visual clara de serviços.

## FASE 2: Protocolo de Análise
**Desktop:** Blocos horizontais, scroll driven (direita -> esquerda).
**Mobile:** Barras verticais, viewport trigger.

**Conteúdo:**
Direção Criativa, Design Estratégico, Identidades, Campanhas, Branding, IA, Liderança.

**Motion:**
Marquee no rodapé (Ghost Design).
""",

    "pentest-r3f.md": """---
description: Next.js R3F Section Pentest Builder
---

# Next.js R3F Section Pentest Workflow

**Agents:**
1. ARCHITECT
2. 3D-ENGINEER
3. MOTION-DESIGNER
4. QA-VALIDATOR
5. DEPLOYER

**Steps:**
1. Initialization
2. Architecture
3. 3D Core
4. Animation Layer
5. Validation Loop
6. Build Verification
""",

    "featured-projects.md": """---
description: # Workflow: Featured Projects
---

# Workflow: Featured Projects (Destaques)

**Contexto:** Grid responsivo (Bento Grid) de projetos selecionados.

**Dados Obrigatórios:**
1. Magic (Radio Branding)
2. Branding Project 01
3. Key Visual Campaign
4. Web Experience Motion

**Implementação:**
1. `FeaturedProjects.tsx`: Bento grid desktop, Stack mobile.
2. `ProjectCard.tsx`: Scroll reveal, hover effects.
3. `CTAProjectCard.tsx`: "Like what you see?".
""",

    "audit-ghost-implemetetion.md": """---
description: Replicação Fiel da Hero Animation “GHOST”
---

# 🧠 WORKFLOW ANTIGRAVITY: Ghost Hero Animation

**Objetivo:** Paridade visual com referência CodePen.

**Agentes:**
0. Bootstrap
1. Análise Visual
2. Geometria & Shader
3. Material & Emissive
4. Partículas (Instanced)
5. Post-Processing (Analog Decay)
6. Interação & Física
7. Performance
8. Testes
""",

    "r3f-setup.md": """---
description: # R3F Setup Workflow: Ghost Atmosphere & Glass Header
---

# R3F Setup Workflow

1. **GhostCanvas:** Configuração global, DPR adaptativo.
2. **Atmosphere:** Ghost Mesh, Particles, Fireflies, Post-Processing.
3. **HeaderGlassCanvas:** Câmera ortográfica, shader de vidro líquido.
4. **Interatividade:** Mouse lerp e spring physics.
5. **Fallbacks:** `useWebGLSupport`.
""",

    "ghost-orchestrator.md": """---
description: Trigger the Ghost Design System Orchestrator
---

1. Execute the orchestrator script:
   ```bash
   python3 ~/.gemini/antigravity/agents/orchestrator.py
   ```
""",

    "deploy.md": """---
description: Build and Deploy to Firebase Hosting
---

1. Run the deploy script (includes testing)
   `npm run deploy`
""",

    "audite-pages.md": """---
description: # 🕵️ Workflow: Auditoria de Layout e Conformidade Visual
---

# 🕵️ Workflow: Auditoria de Layout

**Agente:** `DesignSystemAuditor`

**Passos:**
1. Inicialização e Setup (`/audit --page [HOME]`).
2. Análise Profunda (Estrutura, Espaçamentos, Tipografia, Responsividade).
3. Geração de Relatório.
4. Plano de Ação.
""",

    "pentest-workflow.yaml": """# workflow.yaml - Google Antgravity Pentest Pipeline
name: 'Next.js R3F Section Pentest'
version: '1.0'

inputs:
  template_filled: string
  target_section: string
  perf_budget: number

stages:
  - name: 'ARCHITECT_PARSE'
    agent: 'ARCHITECT'
  - name: '3D_RENDER'
    agent: '3D-ENGINEER'
  - name: 'MOTION_ANIMATE'
    agent: 'MOTION-DESIGNER'
  - name: 'INTEGRATE_CODE'
    agent: 'ARCHITECT'
  - name: 'SECURITY_QA'
    agent: 'QA-VALIDATOR'
  - name: 'DEPLOY_PREVIEW'
    agent: 'DEPLOYER'
""",

    "sobre-origin.md": """---
description: # Workflow: criação e Ajuste da sessão AboutOrigin
---

# Workflow: AboutOrigin (Origem Criativa)

**Objetivo:** Mask reveal pinned (imagens emergem).

**Conteúdo:**
A: O Que Permanece
B: Do Traço à Intenção
C: A Descoberta do Invisível
D: Expansão com Propósito

**Tech:** GSAP ScrollTrigger + Lenis.
""",

    "plan.md": """---
description: Restate requirements, assess risks, and create plan.
---

# Plan Command

Invokes **planner** agent (`~/.gemini/antigravity/agents/planner.md`).

**Steps:**
1. Restate Requirements
2. Identify Risks
3. Create Step Plan
4. Wait for Confirmation
""",

    "header-workflow.md": """---
description: Header Specification and Implementation Guide
---

# Workflow: Header (Fluid Floating Ghost)

**Specs:**
* Fluid Floating Pill.
* Fixed top-6.
* Glassmorphism ethereal.
* Interações: Fluid movement, squash & stretch.

**Versão Estável (Locked):**
Não modificar `src/components/layout/Header.tsx` sem aprovação.
""",

    "auditoria-sobre.md": """---
description: Prompt de Workflow **SOBRE**
---

# Auditoria: Página SOBRE

**Fonte da Verdade:** `/docs/SOBRE/SOBRE-PROTOTIPO-INTERATIVO.md`

**Execução:**
1. Parsing
2. Execução iterativa
3. Testes de layout
4. Testes de animação
""",

    "agent-debug-hero.md": """---
description: Portfolio-Dev-Next
---

# Agent Debug Hero

**Foco:** Next.js App Router, R3F, Shaders.
**Objetivo:** Analisar, criar e corrigir código da Hero Section (Ghost Blue).
**Checklist:** Z-Index estrito, WebGL performance.
""",

    "clients-brands.md": """---
description: Hero ghost
---

# Workflow: Integração de Logotipos de Clientes

**Fases:**
1. Estruturação dos Assets (Supabase).
2. Integração com Seção de Clientes (Grid).
3. Implementação da Exibição (Marquee/Grid).
4. Integração em Páginas.
""",

    "alinhamento-e-calibragem.md": """---
description: # WORKFLOW DE ALINHAMENTO E CALIBRAGEM DE CONTEXTO
---

# WORKFLOW DE ALINHAMENTO

**Etapas:**
1. Reconhecimento da Stack (package.json).
2. Mapeamento da Arquitetura.
3. Verificação de Documentação (.context).
""",

    "auditoria-home.md": """---
description: Auditoria Home
---

# Auditoria: Página HOME

**Fonte da Verdade:** `/docs/AUDITORIA_HOME_PORTFOLIO.md`

**Execução:**
1. Parsing
2. Execução iterativa
3. Testes de layout
4. Testes de animação
""",

    "performance-audit.md": """---
description: audit
---

# Workflow: Checklist de Auditoria de Performance

1. Verificação Estática (Lint).
2. Runtime Check (DevTools, Heap, Draw Calls).
3. Build Check (Bundle size).
""",

    "audit-files.md": """---
description: # 🛡️ Workflow de Auditoria de Arquitetura
---

# 🛡️ Workflow de Auditoria de Arquitetura

**Ferramenta:** `python antigravity_audit.py`
**Regras:** Matriz de dependência entre sessões.
""",

    "test.md": """---
description: Run full project verification
---

1. Execute comprehensive test suite
   `npm test`
""",

    "structure-cleanup.md": """---
description: # Workflow: Auditoria e Limpeza Estrutural
---

# Workflow: Auditoria e Limpeza Estrutural

**Agente:** @TechLead
**Objetivo:** Organizar `src/` e limpar raiz.

**Regras:**
* Componentes em `src/components/{feature}`.
* Raiz limpa (apenas configs e docs).
* Docs INTOCÁVEIS.
""",

    "global-assets-setup.md": """---
description: # Workflow: Configuração de Assets e Tokens Globais
---

# Workflow: Configuração de Assets e Tokens Globais

**Arquivos Alvo:** `src/config/brand.ts`, `content.ts`, `fonts.css`.

**Config:**
* Cores (Blue Primary #0048ff).
* Assets (Logos Supabase).
* Tipografia (TT Norms Pro).
"""
}

# Loop para gravar arquivos
for filename, content in files.items():
    filepath = os.path.join(WORKFLOWS_DIR, filename)
    try:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"✅ Sincronizado: {filename}")
    except PermissionError:
        print(f"❌ Erro de permissão ao sincronizar: {filename} (Pulando)")
    except Exception as e:
        print(f"⚠️ Erro inesperado ao sincronizar {filename}: {e}")

print("\n🎉 Sincronização completa! Todos os workflows acessíveis foram atualizados em .agent/workflows/")