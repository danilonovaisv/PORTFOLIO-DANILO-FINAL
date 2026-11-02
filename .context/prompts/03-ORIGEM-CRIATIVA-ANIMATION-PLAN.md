# Prompt — Implementar Animações Cinema Reel na Sessão About Origin

## Contexto do Projeto

**Repositório:** `/Users/danilonovais/PORTFOLIO-DANILO-FINAL`
**Página:** `/sobre` → seção "Origem Criativa" (`#origem-criativa`)
**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, GSAP 3.13, Framer Motion (motion/react), Lenis
**Design System:** Ghost System — Void Black `#040013`, Deep Blue `#0048ff`, Ghost Cyan `#4fe6ff`
**Tipografia:** Manrope (sans), Geist Mono (labels)
**Arquitetura da seção:**
- `src/components/sobre/sections/AboutOrigin.tsx` — componente raiz
- `src/components/sobre/origin/data.ts` — dados dos 4 capítulos (NÃO modificar)
- `src/components/sobre/origin/OriginComponents.tsx` — componentes de render
- `src/components/sobre/origin/useOriginAnimations.ts` — hooks GSAP
- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/03-ORIGEM-CRIATIVA/03-ORIGEM-CRIATIVA.md` — docs da seção
- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/SOBRE-PROTOTIPO-INTERATIVO.md` — protótipo base

## Tarefa

Adaptar as técnicas de animação do arquivo de especificação cinema-reel (`public/assets/sections/cinema-reel.md` — ou referência interna) para a seção `about origin`, aplicando as **5 técnicas fundamentais** enquanto **preserva 100% do conteúdo textual, tokens de design system e estrutura atual**.

---

## Especificação das 5 Técnicas a Implementar

### 1. Entrance Auto-Scroll

- GSAP timeline com `power3.out` de **2.5 segundos** total
- Deck percorre **3 loops completos** (4 capítulos × 3 = 12 slides de transit)
- Blur SVG vertical (`feGaussianBlur`, stdDeviation velocity-driven até 18px)
- Scanlines overlay com `mix-blend-mode: screen` — cor adaptada para **Ghost blueAccent (#4fe6ff)** em vez do warm ivory do cinema-reel
- Opacity fade-in paralelo (0→1 em 0.8s)
- Ao completar: flag `entrancePlaying = false`, handoff para rAF loop

### 2. Slides Rendered

- **28 slots** (4 capítulos × 7 cópias) para loop infinito
- `SLIDE_VH = 80`, `GAP_VH = 5`, `PITCH_VH = 85`
- `TOP_PAD_VH = 10` (centraliza primeiro slide)
- Track posicionado em `translate3d(0, TOP_PAD_VH − AUTO_START_IDX × pitch)dvh`
- Loop wrap: shift de ±4 slots quando idx < 4 ou idx ≥ 24

### 3. Snap Physics

- rAF loop com spring: `y += (target − y) × 0.11` por frame (~600ms settle)
- Wheel: 1:1 com clamp 200px/evento, live-commit index ao cruzar half-pitch
- Drag: suspend spring while held; release → snap ±1 se `|delta| > 14dvh`, senão spring back
- Flag `dragRef.active` e `wheelLastTime` para timing de re-engajamento

### 4. Per-Slide Motion

- **Slide ativo (incoming):** smoothstep `t = max(0, min(1, 1 − |dy|/slideH/0.55))`; opacity = `t²(3−2t)`; blur = `(1−opacity) × 14px`; entry offset y = `(1−opacity) × 64px`
- **Slide anterior (leaving):** fade após dn > 0.6; parallax-lead `cy = −dy × 0.42`
- **Demais slots:** opacity 0, blur 16px
- Skip slots com `dn > 2` (fora do viewport) para performance

### 5. Image Parallax

- Wrapper `[data-slide-image]`: `height: 120dvh`, `marginTop: -60dvh`, centralizado
- TranslateY no rAF: `-dy / 1.2` (R=1.2 → 16.7% da velocidade do slide)
- `will-change: transform` no wrapper

---

## Arquivos a Modificar

| Arquivo | Ação | Justificativa |
|---------|------|---------------|
| `src/components/sobre/origin/useOriginAnimations.ts` | Reescrever hook | Adicionar rAF snap loop + spring physics + reduced-motion gate |
| `src/components/sobre/origin/OriginComponents.tsx` | Expandir | Adicionar prop `CinemaReelEntrance`, variants de motion, scanlines/mask conditionais |
| `src/components/sobre/sections/AboutOrigin.tsx` | Expandir | Injetar SVG filter, scanlines condicional, estado `entrancePlaying`, handoff timeline → rAF |
| `src/components/sobre/origin/data.ts` | **NÃO MODIFICAR** | Conteúdo já atualizado (versão 2026-11) — preservar 100% |

---

## Restrições Absolutas

1. **NUNCA** modificar `src/components/sobre/origin/data.ts`
2. **NUNCA** alterar qualquer outra seção da página `/sobre`
3. **NUNCA** adicionar dependências ao `package.json` sem aprovação explícita
4. **SEMPre** usar `dvh` (nunca `vh`) para tamanhos de viewport — iOS Safari rule
5. **SEMPre** respeitar `prefers-reduced-motion` — entrance vira cross-fade estático, rAF desativado
6. **SEMPre** preservar tokens do Ghost System: `#040013`, `#0048ff`, `#4fe6ff`, `#E50914`
7. **SEMPre** manter hierarquia semântica: `<section id="origem-criativa">` + headings existentes
8. **SEMPre** handoff limpo: GSAP timeline deve terminar antes do rAF assumir (flag `entrancePlaying`)

---

## Skills a Utilizar

O agente DEVE carregar e aplicar as seguintes skills durante a execução:

### 1. `/portfolio-design-auditor:animation-vocabulary`
- Mapear descrições de motion para termos técnicos GSAP/Framer Motion
- Validar que easing, timing e física estão corretamente nomeados
- Usar para traduzir "snap suave" → `cubic-bezier(0.16, 1, 0.3, 1)` ou similar

### 2. `/portfolio-design-auditor:animate`
- Implementar motion com foco em propósito, timing e física
- Garantir que cada animação sirva à narrativa (não é decorative)
- Aplicar principles de interruptibilidade (Apple design)

### 3. `/anthropic-skills:apple-design`
- Springs com damping 1.0 (crítico) para UI, 0.8 para momentum
- Velocity handoff: passar velocidade do drag para spring no release
- Interruptibilidade: animações devem reagir a input a qualquer momento
- Reduced motion: cross-fade em vez de slide/spring

### 4. `/taste-skill:taste-skill`
- Validar estética anti-slop: duas tipografias no máximo, sem glows decorativos
- Regra two-line headlines: cada `titleLines` cabe em 2 linhas @ 390px
- Sem eyebrows/pill badges em novos elementos
- Paleta: apenas Ghost tokens, sem violet/indigo

---

## Estado Atual (para referência)

```
data.ts ORIGIN_CHAPTERS[0..3]:
  01. O QUE PERMANECE     — description: "Antes da técnica, o olhar. Filtrar ruído, reconhecer substância."
  02. DO TRAÇO À INTENÇÃO — description: "Rabiscos viram direção. Instinto lapidado em rigor composicional."
  03. A DESCOBERTA...     — description: "Design não enfeita — conduz. Invisível na tipografia, ritmo, espaço."
  04. EXPANSÃO COM...     — description: "Comunicação, design, IA convergem. Tech amplifica método, não substitui visão."
```

---

## Critérios de Sucesso (Binary)

- [ ] `pnpm run typecheck` passa sem erros
- [ ] `pnpm run lint` não adiciona novos warnings
- [ ] Entrance auto-scroll: deck gira 3 loops em 2.5s, landing em slide 1 (O Que Permanece)
- [ ] Snap: wheel/drag spring-senta sem overshoot
- [ ] Parallax: imagem move 16.7% da velocidade do slide
- [ ] Per-slide: ativo com smoothstep fade, anterior com parallax-lead
- [ ] Reduced motion: entrance é cross-fade, rAF desativado
- [ ] Build: `pnpm run build` gera `.next` sem erros
- [ ] Conteúdo: `data.ts` idêntico ao estado atual (checksum preservado)

---

## Verificação Final

Após implementar, rodar:

```bash
cd /Users/danilonovais/PORTFOLIO-DANILO-FINAL
pnpm run typecheck && pnpm run lint && pnpm run build
```

Se algum passo falhar, corrigir antes de reportar conclusão.

---

## Output Esperado

Relatório com:
1. Lista de arquivos modificados (com diff summary)
2. Constantes adotadas (valores numéricos)
3. Evidência de build passing
4. Notas sobre decisions tomadas (trade-offs)
5. Rastreabilidade: qual técnica corresponde a qual bloco do código

---

*Documento gerado em 2026-11-02. Referência: cinema-reel.md (especificação completa de animações).*
