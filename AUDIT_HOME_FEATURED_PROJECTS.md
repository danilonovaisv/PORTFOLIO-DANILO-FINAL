# RELATÓRIO DE FIDELIDADE — FEATURED PROJECTS (HOME `/`)

## STATUS GERAL

**⚠️ Desvio Visual/Técnico (parcial)**

A seção está madura em estrutura e integração ADMIN, porém ainda não atinge 100% de fidelidade ao briefing desta auditoria por três pontos principais: (1) regra de randomização não ocorre estritamente “a cada render” (há SSR determinístico + randomização client-side), (2) escala de hover acima do limite solicitado, e (3) lacuna no ADMIN para upload de thumb exclusivo do modo 2.

---

## Fontes e rastreabilidade

### Código auditado (verdade operacional)

- `src/components/home/featured-projects/FeaturedProjectsSection.tsx`
- `src/components/home/featured-projects/FeaturedProjectCard.tsx`
- `src/components/home/featured-projects/FeaturedProjectCardFrame.tsx`
- `src/components/home/featured-projects/FeaturedProjectAnimatedBackground.tsx`
- `src/components/home/featured-projects/animated-backgrounds.ts`
- `src/components/admin/ProjectForm.tsx`
- `src/lib/portfolio/home-featured.ts`
- `src/lib/admin/schemas/project.ts`
- `supabase/migrations/20260301011000_home_featured_animated_cards.sql`
- `test/unit/featured-project-backgrounds.test.ts`

### Documentação interna (.context)

- `.context/DOCS-PORTFOLIO-PAGES/01-HOME/05-FEATURED-PROJECTS/05-FEATURED-PROJECTS.md`

### Transparência das fontes externas obrigatórias pedidas no prompt

- **GitHub externo (`danilonovaisv/DATABASE_AGENT_NEXT`)**: tentativa feita via `git ls-remote`, sem acesso por autenticação/visibilidade.
- **Vector Store (`vs_69520b1fb834819197e445db9aab8d69`)**: não há ferramenta de consulta disponível no ambiente atual (MCP resources vazios).

---

## 1) BACKGROUND SYSTEM

### ✅ 3 backgrounds disponíveis

Pool implementado com 3 variantes exatas:

- `grainient`
- `ghost`
- `aurora`

### ✅ Sem persistência de background no CMS

A persistência `home_featured` guarda estilo de card + logo, não guarda variante do background.

### ⚠️ Randomização em modo híbrido (não literal ao requisito “a cada render”)

Implementação atual:

- SSR/hidratação inicial usa variante determinística por `project.id`.
- Após mount, o client faz randomização e novo shuffle periódico (9s).

**Conclusão técnica:** evita mismatch de hidratação e mantém dinâmica visual, mas não atende literalmente o item “escolha aleatória no render do card” em todos os renders.

---

## 2) CARD STRUCTURE

### ✅ Estrutura de camadas conforme esperado

Card contém:

1. Animated background layer
2. Logo invertido central (modo logo)
3. Thumb + overlay (modo thumb)
4. CTA small no rodapé
5. Glow/gradiente de reforço

### ✅ Logo invertido central e estável

- Centralização via `flex items-center justify-center`.
- Logo não recebe transform de hover dedicado.

### ✅ Overlay do modo thumb em 5%

No modo thumb, a imagem recebe `opacity-5` + camada escura sutil adicional.

### ⚠️ Divergência histórica em migration/documentação

A migration inicial menciona `ANIMATED_BG_THUMB_OVERLAY_50`, enquanto app/schema atuais usam `ANIMATED_BG_THUMB_OVERLAY_5`.

---

## 3) HOVER INTERACTION

### ✅ Interação presente

- Leve elevação/translate
- Parallax de cursor
- Glow roxo `#8705f2`
- CTA com troca de cor e glow no hover

### ⚠️ Zoom acima da regra

- Esperado no briefing: **máximo 1.02**
- Encontrado: `md:group-hover:scale-[1.03]`

### ⚠️ Timing fora do alvo recomendado

A curva ghost (`[0.22, 1, 0.36, 1]`) aparece em pontos-chave, mas tempos usados (300/500/700ms) estão acima do alvo sugerido (0.2s hover-in / 0.15s hover-out).

---

## 4) PERFORMANCE (WebGL/Canvas)

### ✅ Salvaguardas implementadas

- `prefers-reduced-motion`
- checagem de suporte WebGL
- `IntersectionObserver` (anima quando visível)
- `visibilitychange` (pausa com documento oculto)
- limitação de pixel ratio / target pixels nos backgrounds

### ⚠️ FPS > 50 sem prova forte neste ciclo

Não foi coletada medição confiável de FPS em browser real instrumentado nesta execução (headless não é evidência final de performance visual real).

---

## 5) RESPONSIVIDADE

### ⚠️ Parcial (auditoria por código + estrutura)

- A estrutura de grid responsivo está definida para mobile/tablet/desktop.
- Nesta execução não foi gerada bateria de screenshots para confirmação visual final dos breakpoints 375 / 768 / 1440.

---

## 6) ADMIN DASHBOARD

### ✅ Área “Destaques HOME” existe

Campos presentes:

- toggle de destaque na Home
- seletor de modo do card
- upload de logo invertido

### ✅ Persistência e render integrados

- `home_featured` é validado em schema
- salvo via action/admin form
- mapeado para render na HOME

### ⚠️ Gap frente ao briefing

Não há campo dedicado para **upload de thumb exclusivo do modo 2**; o modo thumb reaproveita mídias gerais do projeto.

---

## RESUMO DE CORREÇÕES PRIORITÁRIAS

1. Ajustar hover scale para **1.02** no card frame.
2. Refinar durações para o alvo **0.2s / 0.15s** mantendo easing ghost.
3. Decidir oficialmente entre randomização “pura por render” vs modelo híbrido atual e alinhar documentação.
4. Corrigir nomenclatura legada `*_OVERLAY_50` para `*_OVERLAY_5` em artefatos históricos/documentais.
5. (Se requisito rígido) incluir campo ADMIN de thumb dedicado para modo 2.

---

## CHECKLIST DE SUCESSO (atual)

- [x] 3 backgrounds implementados
- [x] Background não persistido no CMS
- [x] Estrutura do card com camadas corretas
- [x] CTA + glow + interação hover presentes
- [x] Integração ADMIN funcional
- [ ] Randomização estritamente “a cada render do card”
- [ ] Motion 100% no envelope solicitado (scale/timing)
- [ ] Validação final FPS > 50 em browser real com instrumentação
- [ ] Validação visual final dos 3 breakpoints com evidência de screenshot

---

## CONCLUSÃO EXECUTIVA

A sessão **05-FEATURED-PROJECTS** está tecnicamente consistente e próxima do alvo de direção de arte, mas ainda em estado **⚠️ parcial** para fidelidade total do briefing desta auditoria. O caminho para 100% é de ajuste fino (motion), governança da regra de randomização e fechamento dos gaps de evidência (FPS/screenshot + thumb dedicado no ADMIN, se mandatória).
