# Risk Assessment — Auditoria Multipágina Portfólio Danilo

**Projeto:** `danilo-novais-portfolio`  
**Domínio:** `https://portfoliodanilo.com`  
**Data:** 2026-05-02  
**Versão:** 1.0  

---

## Executive Summary

Esta avaliação de riscos identifica, classifica e propõe mitigação para potenciais problemas durante a execução das correções identificadas na auditoria das páginas **Home**, **Sobre** e **Portfólio**.

**Riscos Totais Identificados:** 18  
**Críticos (Vermelho):** 3  
**Altos (Laranja):** 6  
**Médios (Amarelo):** 7  
**Baixos (Verde):** 2  

---

## Risk Matrix

| ID | Risco | Categoria | Severidade | Probabilidade | Impacto | Score |
|----|-------|-----------|------------|---------------|---------|-------|
| R-01 | Quebra de heading hierarchy em produção | SEO/A11y | Crítico | Média | Alto | 9 |
| R-02 | Metadata incorreta afetando indexação | SEO | Crítico | Média | Alto | 9 |
| R-03 | JSON-LD inválido bloqueando rich results | SEO | Crítico | Baixa | Alto | 7 |
| R-04 | Motion drift causando inconsistência visual | UX/UI | Alto | Alta | Médio | 8 |
| R-05 | Componentes grandes dificultando manutenção | Arquitetura | Alto | Alta | Médio | 8 |
| R-06 | Z-index conflicts quebrando sobreposições | UI/UX | Alto | Média | Alto | 8 |
| R-07 | Loading states ausentes degradando UX | UX | Alto | Alta | Médio | 7 |
| R-08 | Reduced motion não respeitado | A11y | Alto | Baixa | Alto | 6 |
| R-09 | Aspect ratio mobile quebrando layout | Responsividade | Médio | Alta | Médio | 6 |
| R-10 | Bento grid desalinhado em breakpoints | UI/UX | Médio | Média | Médio | 5 |
| R-11 | Grid aninhado redundante impactando perf | Performance | Médio | Baixa | Médio | 4 |
| R-12 | Assets 3D sem versionamento causando cache stale | Performance | Médio | Alta | Baixo | 6 |
| R-13 | Contraste variável no hero do Portfolio | A11y | Médio | Média | Médio | 5 |
| R-14 | Cores hard-coded dificultando theme updates | Design System | Médio | Alta | Baixo | 6 |
| R-15 | TypeScript errors pós-refatoração | Qualidade | Alto | Baixa | Alto | 6 |
| R-16 | ESLint warnings novos introduzidos | Qualidade | Médio | Alta | Baixo | 5 |
| R-17 | Build Next.js falhando após mudanças | Infra | Crítico | Baixa | Alto | 7 |
| R-18 | E2E tests falhando em mobile viewport | QA | Médio | Alta | Médio | 6 |

---

## Detailed Risk Analysis

### R-01: Quebra de Heading Hierarchy

**Descrição:** Alterações incorretas na hierarquia H1-H6 podem violar WCAG e prejudicar SEO.

**Causa Raiz:** 
- Múltiplos H1 acidentais
- Ordem saltada (H2 → H4)
- Headings em componentes reutilizáveis sem contexto

**Impacto:**
- Penalização SEO
- Leitura incorreta por screen readers
- Violação WCAG 2.1 AA

**Mitigação:**
- Audit com axe-core antes de commit
- Validação manual por página
- Teste com NVDA/JAWS

**Owner:** `audit_sentinel` + `a11y_advocate`

---

### R-02: Metadata Incorreta

**Descrição:** Títulos duplicados, descriptions faltantes ou OG tags quebradas.

**Causa Raiz:**
- Template global sobrescrevendo específico
- `generateMetadata` não implementado por rota
- Variáveis de ambiente faltando

**Impacto:**
- CTR reduzido no Google
- Social sharing quebrado
- Brand inconsistency

**Mitigação:**
- Implementar `generateMetadata` por `page.tsx`
- Validar com Next.js devtools
- Testar social preview tools

**Owner:** `seo_specialist`

---

### R-03: JSON-LD Inválido

**Descrição:** Schema.org Organization com `logo` fora do shape esperado.

**Causa Raiz:**
- URL relativa em vez de absoluta
- Tipo incorreto (`ImageObject` vs string)
- Contexto faltando

**Impacto:**
- Rich results bloqueados
- Knowledge Graph não atualizado

**Mitigação:**
- Usar URL absoluta para logo
- Validar com Rich Results Test
- Schema validator pré-deploy

**Owner:** `seo_specialist`

---

### R-04: Motion Drift

**Descrição:** ~20 arquivos usando easing hard-coded em vez de token `GHOST_EASE`.

**Causa Raiz:**
- Copypaste de código legado
- Falta de lint rule para tokens
- Onboarding de devs sem contexto

**Impacto:**
- Inconsistência visual
- Manutenção difícil
- Brand dilution

**Mitigação:**
- Grep audit pré-commit
- ESLint custom rule para tokens
- Documentação atualizada

**Owner:** `motion_choreographer`

---

### R-05: Componentes >500 Linhas

**Descrição:** 6 componentes críticos excedem limite arquitetural.

**Causa Raiz:**
- Acumulo de features sem refator
- Medo de quebrar funcionalidade
- Falta de tempo para extrair sub-components

**Impacto:**
- Dificuldade de teste
- Merge conflicts frequentes
- Onboarding lento

**Mitigação:**
- Extrair sub-components por responsabilidade
- Adicionar unit tests progressivamente
- ESLint rule `max-lines-per-component`

**Owner:** `ghost_architect`

---

### R-06: Z-Index Conflicts

**Descrição:** Sobreposições quebradas (ex: Beliefs Section canvas acima do manifesto).

**Causa Raiz:**
- Valores hard-coded em vez de tokens `--z-layer-*`
- Falta de documentação de layers
- Mobile vs desktop mismatch

**Impacto:**
- Conteúdo escondido
- Interactions quebradas
- Layout shifts

**Mitigação:**
- Usar apenas tokens de z-index
- Validar em todos os breakpoints
- Device lab testing

**Owner:** `audit_sentinel`

---

### R-07: Loading States Ausentes

**Descrição:** Fluxos assíncronos (Supabase, R3F) sem skeletons ou indicators.

**Causa Raiz:**
- Foco em features vs polish
- Complexidade de estados múltiplos
- Assunção de conexão rápida

**Impacto:**
- UX percebida pobre
- Abandono em conexões lentas
- Accessibility issues

**Mitigação:**
- Mapear todos os async flows
- Implementar skeletons consistentes
- Error boundaries com retry

**Owner:** `performance_engineer`

---

### R-08: Reduced Motion Não Respeitado

**Descrição:** Animações ignorando preferência `prefers-reduced-motion`.

**Causa Raiz:**
- Hook não centralizado
- Components não checam preferência
- Framer Motion config global faltando

**Impacto:**
- Violação WCAG
- Desconforto para usuários sensíveis
- Possível ação legal (ADA)

**Mitigação:**
- Centralizar hook `useReducedMotion`
- `MotionConfig` com `reducedMotion`
- E2E test com emulation

**Owner:** `motion_choreographer` + `a11y_advocate`

---

### R-09: Aspect Ratio Mobile

**Descrição:** Vídeos/imagens esticados ou cortados em mobile.

**Causa Raiz:**
- CSS fixo em vez de responsivo
- Container sem `aspect-ratio`
- Media queries faltando

**Impacto:**
- Visual quebrado
- Conteúdo importante cortado
- Perda de credibilidade

**Mitigação:**
- Usar `aspect-video`, `aspect-square`
- Testar em device lab
- Visual regression tests

**Owner:** `audit_sentinel`

---

### R-10: Bento Grid Desalinhado

**Descrição:** Cards com alturas desiguais quebrando ritmo visual.

**Causa Raiz:**
- Conteúdo variável sem normalização
- Grid CSS mal configurado
- Falta de `line-clamp`

**Mitigação:**
- Normalizar alturas com CSS Grid
- `line-clamp` em textos longos
- Align items consistent

**Owner:** `spectral_artist`

---

### R-11: Grid Aninhado Redundante

**Descrição:** Containers grid dentro de grids sem necessidade.

**Causa Raiz:**
- Copy-paste de padrões
- Falta de revisão arquitetural
- Over-engineering

**Impacto:**
- Performance levemente degradada
- Complexidade desnecessária
- Manutenção difícil

**Mitigação:**
- Refatorar para grid único
- Documentar padrão ideal
- Code review focado

**Owner:** `ghost_architect`

---

### R-12: Assets 3D Sem Versionamento

**Descrição:** GLBs/GLTFs sem hash query, causando cache stale.

**Causa Raiz:**
- Deploy estático sem invalidation
- CDN cache longo demais
- Falta de build step para hashing

**Impacto:**
- Usuários veem versão antiga
- Debug difícil
- Rollback complexo

**Mitigação:**
- Adicionar hash query (`model.glb?v=1.2.3`)
- CI/CD com versionamento automático
- Cache headers revisados

**Owner:** `performance_engineer`

---

### R-13: Contraste Variável no Hero

**Descrição:** Overlay do hero do Portfolio com contraste inconsistente devido ao vídeo.

**Causa Raiz:**
- Vídeo com luminância variável
- Overlay fixo não compensa
- Falta de blur/darken dinâmico

**Impacto:**
- Texto ilegível em frames claros
- Violação WCAG potencial
- UX inconsistente

**Mitigação:**
- Blur + darken overlay
- Testar com frames extremos
- Contrast checker automation

**Owner:** `spectral_artist` + `a11y_advocate`

---

### R-14: Cores Hard-Coded

**Descrição:** Hex values diretos em hover states em vez de tokens CSS.

**Causa Raiz:**
- Desenvolvimento rápido sem tokens
- Tailwind config incompleta
- Falta de code review para tokens

**Impacto:**
- Theme updates difíceis
- Dark mode impossível
- Inconsistência visual

**Mitigação:**
- Auditar com grep `#[0-9a-fA-F]`
- Substituir por `var(--color-*)`
- Tailwind tokens config

**Owner:** `ghost_architect`

---

### R-15: TypeScript Errors Pós-Refatoração

**Descrição:** Types quebrados após extração de componentes.

**Causa Raiz:**
- Props não tipadas corretamente
- Generics mal definidos
- `any` usado como escape

**Impacto:**
- Build falha
- Runtime errors possíveis
- DX degradado

**Mitigação:**
- `tsc --noEmit` pré-commit
- Strict mode sempre ativo
- Type-first development

**Owner:** `ghost_architect`

---

### R-16: ESLint Warnings Novos

**Descrição:** Warnings introduzidos por mudanças.

**Causa Raiz:**
- Rules novas ignoradas
- Ignore comments excessivos
- Config desatualizada

**Mitigação:**
- ESLint no CI pipeline
- Zero warnings policy
- Auto-fix pré-commit

**Owner:** `ghost_architect`

---

### R-17: Build Next.js Falhando

**Descrição:** `pnpm run build` falhando após mudanças.

**Causa Raiz:**
- Server/client component confusion
- Import circular
- Environment variables missing

**Impacto:**
- Deploy bloqueado
- Downtime potencial
- Rollback necessário

**Mitigação:**
- Build local antes de push
- CI com build step
- Rollback plan pronto

**Owner:** `orchestrator`

---

### R-18: E2E Tests Falhando em Mobile

**Descrição:** Playwright tests passando em desktop, falhando em mobile viewport.

**Causa Raiz:**
- Selectors frágeis
- Timing assumptions erradas
- Layout differences não consideradas

**Impacto:**
- Bugs em produção mobile
- False confidence
- Retrabalho

**Mitigação:**
- Testar ambos viewports
- Polling robusto
- Data-testid attributes

**Owner:** `audit_sentinel`

---

## Mitigation Timeline

| Fase | Riscos Mitigados | Ações |
|------|------------------|-------|
| Phase 1 | R-01, R-02, R-03 | Headings audit, metadata fix, JSON-LD validation |
| Phase 2 | R-04, R-05, R-06, R-07, R-08, R-14 | Motion tokens, refactoring, z-index, loading states, reduced motion |
| Phase 3 | R-09, R-10, R-11, R-12, R-13 | Mobile responsiveness, grid cleanup, asset versioning, contrast |
| Phase 4 | R-15, R-16, R-17, R-18 | Type checking, linting, build validation, E2E hardening |

---

## Contingency Plans

### Se P0 falhar:
1. **Immediate rollback** para último commit estável
2. **Hotfix branch** para correção isolada
3. **Deploy emergencial** apenas do fix
4. **Post-mortem** obrigatório

### Se build falhar:
1. Reverter última mudança
2. Corrigir em branch isolada
3. Validar localmente antes de retry

### Se E2E falhar:
1. Isolar teste falhando
2. Debug com video recording
3. Fix ou ajuste de teste
4. Re-run suite completa

---

## Risk Acceptance

| Stakeholder | Papel | Aceite |
|-------------|-------|--------|
| Danilo Novais | Product Owner | ⏳ Pending |
| ghost_architect | Tech Lead | ✅ Approved |
| audit_sentinel | QA Lead | ✅ Approved |

---

## Monitoring Post-Deployment

| Metric | Threshold | Alert |
|--------|-----------|-------|
| Lighthouse Performance | ≥96 | <90 |
| Accessibility Score | 100 | <95 |
| SEO Score | 100 | <90 |
| Error Rate (Sentry) | <0.1% | >1% |
| Build Time | <5min | >10min |
| E2E Pass Rate | 100% | <95% |

---

**Próxima Revisão:** Após cada fase de execução  
**Última Atualização:** 2026-05-02
