# Prompt de Correção Orquestrada — Portfoliodanilo.com

**Projeto:** danilo-novais-portfolio  
**Domínio:** https://portfoliodanilo.com  
**Data:** 2026-05-02  
**Status:** ⏸️ **AGUARDANDO APPROVAL GATE**  

---

## 🎯 Instruções para Agents Executoras

Este prompt é destinado a agents especializados (`@ghost_architect`, `@motion_choreographer`, `@spectral_artist`, `@audit_sentinel`) que executarão as correções identificadas na auditoria.

### Regras de Execução

1. **NÃO implemente nada antes da aprovação humana explícita** (`Aprovado` ou `Proceed`)
2. Siga a ordem de prioridade: **P0 → P1 → P2**
3. Use **Context7 MCP** para decisões sobre Next.js, React, Tailwind, Framer Motion, R3F, Supabase
4. Preserve **Ghost Design System** tokens em todas as mudanças
5. Mantenha **TypeScript strict mode** sem erros
6. Documente mudanças em `.context/` após implementação

---

## 📋 Resumo Executivo da Auditoria

### Páginas Auditadas

1. **Home (`/`)** — 8 seções: Header, Hero, Video Manifesto, Portfolio Showcase, Featured Projects, Clients Brands, Contact, Footer
2. **Sobre (`/sobre`)** — 10 seções: Header, Hero, Origem Criativa, O Que Eu Faço, Como Eu Trabalho, O Que Me Move, Fechamento, Clients, Contact, Footer
3. **Portfólio (`/portfolio` + `[slug]`)** — 9 seções: Header, Hero, Gallery, Project Cards, Modal, Projeto Slug, Clients, Contact, Footer

### Estado Atual do Projeto (`.context/active_state.md`)

- **Design System:** Ghost System v3.2 (Z-Layer Expansion) ✅
- **Build:** Next.js 16.2.4 (Webpack) — Estável ✅
- **Lighthouse Score:** 98/100 (Performance 96, Security 100) ✅
- **Phase:** DS Remediation Phase 1 completa, Phase 2 pendente

### Achados Prioritários

| Prioridade | Count | Descrição Resumida |
|------------|-------|-------------------|
| **P0** | 2 | Hierarquia headings, Metadata API |
| **P1** | 5 | Easing tokens, Component size, Hover colors, Z-index, Loading states |
| **P2** | 5 | Video aspect ratio, Bento grid, Grid unification, 3D asset versioning, Contrast review |
| **Transversal** | 3 | JSON-LD, Títulos templated, Reduced motion global |

---

## 🚨 P0 — Crítico (Executar Primeiro)

### TASK-P0-01: Corrigir Hierarquia de Headings na Home

**Agent Recomendado:** `@audit_sentinel` + `@ghost_architect`

**Objetivo:** Garantir hierarquia semântica H1 → H2 → H3 em toda a página Home.

**Ações:**
```bash
# 1. Identificar todos os headings
grep -r "<h[1-6]" src/app/page.tsx src/components/home/

# 2. Validar único H1 no Hero
# 3. Rebaixar headings secundários
# 4. Adicionar sr-only onde necessário
```

Arquivos:
src/app/page.tsx
src/components/home/hero/HomeHero.tsx
src/components/home/video-manifesto/VideoManifesto.tsx
src/components/home/featured-projects/FeaturedProjectsSection.tsx


Validação:
bash
pnpm exec axe src/app/page.tsx --rules heading-order
pnpm run build



## TASK-P0-02: Implementar Metadata API Completa por Página

Agent Recomendado: @ghost_architect + @seo-specialist
Objetivo: Garantir generateMetadata completo para Home, Sobre e Portfólio.
Ações:
Implementar generateMetadata em cada page.tsx
Incluir: title, description, openGraph, twitter cards, canonical, robots
Usar src/lib/seo.ts como base
Arquivos:
src/app/page.tsx
src/app/sobre/page.tsx
src/app/portfolio/page.tsx
src/lib/seo.ts

Exemplo:
typescript
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Danilo Novais — Ghost System Portfolio',
    description: '...',
    openGraph: { ... },
    twitter: { ... },
    alternates: { canonical: 'https://portfoliodanilo.com' },
  }
}

Validação:
DevTools <head> inspection
https://www.opengraph.xyz
Google Rich Results Test


⚠️ P1 — Estrutural (Executar Segundo)
## TASK-P1-01: Unificar Easing Tokens
Agent Recomendado: @motion_choreographer
Objetivo: Eliminar easing inline, usar apenas GHOST_EASE e GHOST_EASE_AMBIENT.

Ações:
bash
```
# 1. Encontrar todos os easings inline
grep -rn "\[0\.[0-9].*\]" src/components/ --include="*.tsx"

# 2. Substituir por imports de @/config/motion
import { GHOST_EASE, GHOST_EASE_AMBIENT } from '@/config/motion'

# 3. Documentar exceções
```

Arquivos Alvo (~20):
src/components/sobre/sections/AboutMethod.tsx
src/components/home/hero/useHeroAnimation.ts
src/components/shared/3d/GhostAura.tsx
src/components/shared/3d/GhostText.tsx
src/components/ui/Preloader.tsx

Validação:
Comparação visual side-by-side
Validação reduced motion
Teste mobile 60fps


## TASK-P1-02: Otimizar Componentes >500 Linhas

Agent Recomendado: @ghost_architect
⚠️ RISCO CRÍTICO (Score 9/9) — Requer plano de contingência completo.
Componentes Alvo:
ALPARenderer.tsx (904 linhas)
GhostScene.tsx (904 linhas)
ProjectForm.tsx (801 linhas)
SettingsForm.tsx (662 linhas)
GhostCursor.tsx (569 linhas)
template-schema.ts (993 linhas)

Estratégia:
Um componente por PR
Extrair subcomponentes lógicos
Separar lógica em custom hooks
Cobertura de testes ≥80%
Code review obrigatório

Validação:
bash
pnpm run typecheck
pnpm run lint
pnpm test
pnpm test:e2e


## TASK-P1-03: Tokenizar Cores de Hover
Agent Recomendado: @spectral_artist

Objetivo: Eliminar hex codes hard-coded de hover states.

Tokens a Criar:
typescript
// tailwind.config.ts
theme.extend.colors: {
  blueHover: '#1a5cff',
  purpleHover: '#8705f2',
}

Validação:
axe DevTools contraste
Consistência desktop/mobile
Focus states visíveis


## TASK-P1-04: Corrigir Z-Index no Beliefs Section
Agent Recomendado: @audit_sentinel

Objetivo: Aplicar z-layer tokens corretos na seção "O Que Me Move".

Mapeamento:
GhostCanvas → --z-layer-3d (z-30)
BeliefManifesto → --z-layer-overlay (z-50)
BeliefBackground → --z-layer-content (z-20)

Arquivos:
src/components/sobre/sections/beliefs/BeliefsSection.tsx
src/components/sobre/sections/beliefs/BeliefBackground.tsx
src/components/sobre/sections/beliefs/BeliefManifesto.tsx

Validação:
Canvas abaixo do texto (inspeção)
Scroll funcionando
Reduced motion respeitado

## TASK-P1-05: Implementar Loading States
Agent Recomendado: @ghost_architect

Objetivo: Skeletons para projetos Supabase.

Componentes a Criar:
src/components/ui/Skeleton.tsx
src/components/portfolio/ProjectCardSkeleton.tsx

Implementar em:
src/components/portfolio/ProjectsGallery.tsx
src/components/portfolio/ProjectCard.tsx

Estados:
Loading: skeleton
Empty: mensagem clara
Error: fallback com retry
✨ P2 — Polimento (Executar Terceiro)


## TASK-P2-01 à P2-05
Seguir especificações completas em docs/task.md.
Resumo:
P2-01: Aspect ratio video manifesto mobile
P2-02: Bento grid vertical alignment
P2-03: Unificar grid em AboutMethod
P2-04: Versionar ghost.glb
P2-05: Contraste hero portfolio
🔁 Tasks Transversais

## TASK-T01: JSON-LD Organization
Agente: @seo-specialist
Ação: Corrigir Organization.logo como URL absoluta string.
Arquivo: src/components/ui/JsonLd.tsx
##TASK-T02: Títulos Templated
Agente: @seo-specialist
Ação: Padrão {shortTitle} | {brand}, ≤60 caracteres.
Arquivos: src/lib/seo.ts, src/app/*/page.tsx
## TASK-T03: Reduced Motion Global
Agente: @motion_choreographer
Ação: Centralizar hook useReducedMotion e aplicar globalmente.
Arquivo SSOT: src/hooks/useReducedMotion.ts
🧪 Validação Geral Pós-Execução
Checklist Obrigatório
markdown
- [ ] TypeScript: pnpm run typecheck (0 errors)
- [ ] Lint: pnpm run lint (0 new warnings)
- [ ] Build: pnpm run build (success)
- [ ] Tests: pnpm test (all pass)
- [ ] E2E: pnpm test:e2e (critical paths)
- [ ] Lighthouse: Performance ≥96, A11y 100, SEO 100
- [ ] .context atualizada
- [ ] Ghost Design System preservadoMétricas de Sucesso

Métrica
Meta
Ferramenta
Lighthouse Performance
≥96
Lighthouse CI
Lighthouse Accessibility
100
Lighthouse CI
Lighthouse SEO
100
Lighthouse CI
TypeScript Errors
0
tsc --noEmit
ESLint Warnings
0 novos
eslint
Bundle Size
Não aumentar >5%
bundle analyzer
Core Web Vitals
Todos verdes
Search Console
🛡️ Governança e Approval Gate
Antes de Executar
Aprovação humana recebida (Aprovado ou Proceed)
Context7 MCP disponível para consultas
Branch isolada criada (fix/audit-remediation-phase1)
Staging environment pronto
Durante Execução
Commits atômicos por task
Mensagens de commit convencionais
Screenshots antes/depois (mudanças visuais)
Testes atualizados conforme necessário
Após Execução
Validação completa passed
.context atualizada
PR aberto com descrição completa
Code review aprovado
Merge para main
Deploy em production
Monitoramento pós-deploy (24h)
📞 Contato e Escalation
Em caso de dúvidas ou blockers:
Consultar documentação canônica: .context/DOCS-PORTFOLIO-PAGES/
Verificar Ghost Design System: .context/GHOST-DESIGN-SYSTEM.md
Checar active state: .context/active_state.md
Revisar risk assessment: docs/risk_assessment.md
⏸️ APPROVAL GATE
ESTE PROMPT NÃO DEVE SER EXECUTADO SEM APROVAÇÃO HUMANA EXPLÍCITA.
Para autorizar execução, responder com:
Aprovado
ou
Proceed
Para solicitar ajustes, responder com:
Lista de mudanças necessárias
Prioridades revisadas
Restrições adicionais
Gerado em: 2026-05-02
Versão: 1.0
Próxima Revisão: Após aprovação e primeira rodada de correções
