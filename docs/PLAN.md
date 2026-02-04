# Plano — Portfolio (Showcase) Ghost 3.0

## Contexto
- Escopo: alinhar `/portfolio` ao documento `docs/PORTFOLIO/PORTFOLIO-PROTOTIPO-INTERATIVO.md`.
- Alvo: componentes em `src/components/portfolio`, além do wiring em `src/app/portfolio`.
- Requisitos-chave: grid editorial 12 col + parallax LERP, modal com timeline canônico, A11y (focus trap/ESC/restore focus), reduced motion, performance mobile-first.

## Objetivos
1. Hero com vídeo em loop (desktop/mobile) + overlay forte + CTA alinhado na base.
2. Projects Gallery com track fixo + LERP + parallax interno por card + grid denso (12 col) + placeholders opcionais apenas no desktop.
3. Modal com Type A/B seguindo timeline canônico (sem scale/rotate) + focus trap + ESC + restore focus.
4. Encerramento da página com Brands/Contact/Footer via `SiteClosure`.
5. Limpeza de `src/components/portfolio`: remover componentes não utilizados após migração.

## Etapas
1. **Inventário e uso atual**
   - Mapear todos os componentes em `src/components/portfolio` e sua utilização real (rg).
   - Identificar duplicações (Hero/Modal/ProjectCard) e a versão correta para o novo fluxo.

2. **Definir contratos e mapeamentos**
   - Criar tipo/shape para cards do grid conforme spec (cover + layout col/row spans + kind).
   - Mapear `PortfolioProject` → novo shape para o gallery (sem quebrar Supabase/fallback).

3. **Hero Section**
   - Ajustar `PortfolioHeroNew` (ou substituir) para:
     - Vídeo responsivo com poster/fallback.
     - Overlay de leitura.
     - Título + CTA em uma linha visual na base.
     - Sem escala/rotate.

4. **Projects Gallery (LERP + Grid Editorial)**
   - Implementar track fixo + LERP via hook com `prefers-reduced-motion`.
   - Grid 12 col + `grid-auto-flow: dense` + spans via dados.
   - Cards com wrapper 135% e parallax interno via rAF.
   - Mobile: lista 1 coluna, sem placeholders, sem fixed track se reduced.

5. **Modal Type A / Type B**
   - Consolidar um único modal (remover duplicados).
   - Aplicar timeline canônico (backdrop → container → mídia → título → meta → secundário) com easing Ghost.
   - Focus trap, ESC, click no backdrop, restore focus.
   - Sem scale/rotate, apenas opacity/translateY.

6. **Wiring da página `/portfolio`**
   - Atualizar `src/app/portfolio/PortfolioClient.tsx` para usar Hero + Gallery + Modal + SiteClosure.
   - Manter metadata no server.

7. **Limpeza da pasta**
   - Remover componentes/arquivos não usados em `src/components/portfolio` após migração.
   - Atualizar `src/components/portfolio/index.ts` e imports afetados.

8. **Verificação**
   - Rodar scripts exigidos pelo workflow:
     - `python .agent/skills/vulnerability-scanner/scripts/security_scan.py .`
     - `python .agent/skills/lint-and-validate/scripts/lint_runner.py .`

## Riscos / Decisões
- **AntigravityCTA**: possui rotate/scale proibidos. Solução: criar CTA específico do portfolio ou adicionar modo “ghost” sem transform e sem rotação.
- **R3F portfolio-grid**: não compatível com spec. Será removido do `/portfolio`.
- **Parallax em mobile**: será desabilitado com `prefers-reduced-motion` e fallback para layout normal.

## Resultado esperado
- `/portfolio` com hero + gallery + modal + brands/contact/footer, comportamento e motion alinhados ao protótipo canônico, alta legibilidade e performance.
- `src/components/portfolio` enxuta e sem arquivos mortos.
