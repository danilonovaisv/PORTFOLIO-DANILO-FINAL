# RELATÓRIO DE FIDELIDADE — FEATURED PROJECTS (HOME `/`)

## STATUS GERAL

**⚠️ Desvio Visual/Técnico (parcial)**

A seção **05-FEATURED-PROJECTS** está próxima do esperado em estrutura de card, glow/CTA, camadas e integração ADMIN, mas há desvios em motion fine-tuning (escala acima do limite pedido), nomenclatura/legado de migração e inconsistência entre regra de randomização “a cada render” vs estratégia híbrida atual (SSR determinístico + randomização client-side periódica).

---

## Metodologia e Fontes auditadas

### Código (fonte operacional)
- `src/components/home/featured-projects/*`
- `src/components/admin/ProjectForm.tsx`
- `src/lib/portfolio/home-featured.ts`
- `src/lib/portfolio/project-mappers.ts`
- `src/lib/admin/schemas/project.ts`
- `supabase/migrations/20260301011000_home_featured_animated_cards.sql`
- `test/unit/featured-project-backgrounds.test.ts`

### Documentação de referência interna
- `.context/DOCS-PORTFOLIO-PAGES/01-HOME/05-FEATURED-PROJECTS/05-FEATURED-PROJECTS.md`
- `.context/DOCS-PORTFOLIO-PAGES/GHOST-DESIGN-SYSTEM.md`
- `.context/DOCS-PORTFOLIO-PAGES/RULES-PORTFOLIO-STRUCTURE.md`
- `.context/DOCS-PORTFOLIO-PAGES/04-ADMIN/03-DASHBOARD.md`

### Evidência visual (site em produção)
- `browser:/tmp/codex_browser_invocations/3d2cb45e15965d6d/artifacts/artifacts/featured-desktop.png`
- `browser:/tmp/codex_browser_invocations/3d2cb45e15965d6d/artifacts/artifacts/featured-tablet.png`
- `browser:/tmp/codex_browser_invocations/3d2cb45e15965d6d/artifacts/artifacts/featured-mobile.png`

### Transparência sobre fontes externas obrigatórias solicitadas
- **GitHub externo `danilonovaisv/DATABASE_AGENT_NEXT`**: tentativa de acesso via `git ls-remote` falhou por autenticação/visibilidade (provável repositório privado).
- **Vector Store `vs_69520b1fb834819197e445db9aab8d69`**: não há ferramenta de consulta de vector store disponível neste ambiente.
- Conclusão: auditoria executada com base no código local (verdade operacional atual) + `.context`.

---

## BACKGROUND SYSTEM

### ✅ 3 backgrounds permitidos disponíveis
Implementados em pool fixo:
- `grainient`
- `ghost`
- `aurora`

### ✅ Sem persistência do background no CMS
A persistência no banco salva apenas metadados de layout (`home_featured`), não variante de background.

### ⚠️ Randomização híbrida (não “puramente a cada render do SSR”)
- Há variante determinística por `project.id` para hidratação estável.
- Após mount no client, ocorre randomização por card e re-randomização a cada 9s.

**Diagnóstico:**
- Atende ao objetivo de evitar background hardcoded e manter dinâmica visual orgânica.
- Não segue literalmente o critério “escolha já no render SSR sempre aleatória”.

---

## CARD STRUCTURE

### ✅ Estrutura de camadas correta
Card contém:
1. Animated background layer
2. Logo invertido central (modo logo)
3. Thumb + overlay (modo thumb)
4. CTA small no rodapé
5. Glow/gradientes sutis

### ✅ Logo invertido centralizado e estável
- Centro visual preservado via `flex items-center justify-center`.
- Logo não recebe transform específico de hover.

### ✅ Overlay de thumb em 5% (modo thumb)
- `opacity-5` na thumb + camada adicional escura leve.

### ⚠️ Nomenclatura legacy em migration
- Migration inicial cita `ANIMATED_BG_THUMB_OVERLAY_50`, porém o código/tipos atuais usam `ANIMATED_BG_THUMB_OVERLAY_5`.
- Funcionalmente está corrigido no app, mas merece reconciliação histórica/DB para evitar confusão.

---

## HOVER INTERACTION

### ✅ Interações presentes
- Zoom leve
- Parallax sutil por ponteiro
- Glow roxo no shell e CTA
- CTA muda para `#8705f2`

### ⚠️ Zoom acima do limite definido no briefing
- Regra esperada: **máx. 1.02**
- Implementado: `md:group-hover:scale-[1.03]`

### ⚠️ Duração/easing parcialmente fora da recomendação estrita
- Easing Ghost padrão `[0.22,1,0.36,1]` está sendo usado em múltiplos pontos.
- Porém durações estão predominantemente em `300ms/500ms/700ms`, não no alvo recomendado de `0.2s` hover e `0.15s` hover-out.

---

## PERFORMANCE

### ✅ Há controles técnicos para reduzir custo
- `usePrefersReducedMotion`
- `useWebGLSupport`
- Interseção/visibilidade para só animar quando em viewport
- `maxDevicePixelRatio` configurado por background

### ⚠️ FPS medido em ambiente headless não é confiável
A coleta automatizada via Playwright headless retornou números inconsistentes (throttling/background scheduling), portanto **não é válida como prova de FPS real**.

**Recomendação de validação final:** medir em browser real com DevTools Performance e `prefers-reduced-motion` habilitado/desabilitado.

---

## RESPONSIVIDADE

### ✅ Breakpoints auditados visualmente
- 375 (mobile)
- 768 (tablet)
- 1440 (desktop)

### ✅ Itens validados
- Grid de cards mantém composição
- CTA legível
- Elementos centrais e hierarquia visual preservados

### ⚠️ Pendência recomendada
Executar régua de spacing com referência `.std-grid` em inspeção manual comparando pixel a pixel com o layout de referência da `.context`.

---

## ADMIN DASHBOARD

### ✅ Área “Destaques HOME” existe no formulário de projetos
Campos encontrados:
- Toggle `featured_on_home`
- Seletor de modo do card (`logo invertido` / `thumb overlay 5%`)
- Upload de logo invertido

### ✅ Persistência implementada
- `home_featured` salvo via action `upsertProjectAction`
- Mapeamento de volta para HOME via `project-mappers`
- Render respeita `homeFeatured.cardStyle` + `logoPath`

### ⚠️ Gap funcional vs briefing
Briefing menciona **thumb upload específico do modo 2**. No estado atual, modo 2 reutiliza mídias gerais do projeto (`url_landscape/url_square/image`) em vez de um campo dedicado exclusivo “thumb do card destaque”.

---

## RESUMO DE CORREÇÕES PRIORITÁRIAS

1. **Ajustar zoom hover de `1.03` para `1.02`** para conformidade exata com a regra.  
2. **Normalizar timing de micro-interações** para `0.2s` hover-in e `0.15s` hover-out onde aplicável.  
3. **Unificar nomenclatura histórica overlay 5%** (`*_OVERLAY_5`) em migration/docs legadas para remover ambiguidade.  
4. **(Opcional de arquitetura)** decidir oficialmente entre randomização pura por render ou estratégia híbrida atual e atualizar documento da seção para evitar conflito de interpretação.  
5. **(Admin evolução)** avaliar campo de thumb dedicado para modo 2, se for requisito rígido de direção de arte.

---

## DEFINIÇÃO DE SUCESSO (Checklist)

- [x] Backgrounds animados ativos (3 variantes)
- [x] Sem persistência de background no CMS
- [x] Interação hover presente com glow e CTA dinâmico
- [x] Integração ADMIN funcional (layout + logo invertido)
- [x] Responsividade validada nos 3 breakpoints
- [ ] Conformidade estrita de motion (zoom/timings)
- [ ] Validação FPS final em ambiente gráfico real (não headless)

---

## Conclusão Executiva

A sessão está **tecnicamente sólida e visualmente muito próxima do alvo**, com integração ADMIN correta e base de background animado robusta. Para atingir **100% de fidelidade** ao briefing informado, os ajustes principais são de **micro-motion e padronização final de regra** (escala/timing + alinhamento de documentação/migration).
