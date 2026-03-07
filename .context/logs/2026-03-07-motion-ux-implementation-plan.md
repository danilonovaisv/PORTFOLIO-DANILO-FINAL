# Implementation Plan — Motion & UX Audit (Home + Sobre)

**Data:** 2026-03-07  
**Escopo:** `src/components/home/**` e `src/components/sobre/**`  
**SOT:** `.context/GHOST-DESIGN-SYSTEM.md`

## FASE 01 — Crítica (bugs de sincronização, legibilidade e acessibilidade)

1. **Bloquear propriedades proibidas em UI/content**
   - Remover `scale`, `x`, `rotate`, `bounce` de reveals e interações de conteúdo.
   - Padronizar reveals para `opacity + blur + translateY` (`<= 18px`).
2. **Normalizar easing em Framer e GSAP**
   - Framer/CSS: `[0.22, 1, 0.36, 1]`.
   - GSAP: substituir `power3.*` por equivalente custom cubic-bezier (`CustomEase`) ou transições lineares em reduced motion.
3. **Acessibilidade de movimento (gate único)**
   - Garantir `useMotionGate()` em todos os componentes com animação.
   - Em `prefers-reduced-motion`, desligar parallax, marquee infinita e loops atmosféricos.
4. **Corrigir hierarquia de z-index da sessão 06 (/sobre)**
   - Rebaixar canvas para camada equivalente a `z-30` e manter overlays finais em `z-50+`.

## FASE 02 — Refinamento (stagger + tempos)

1. **Unificar tempos Fast/Normal/Slow**
   - Fast: `0.2s`, Normal: `0.8s`, Slow: `1.5s+` apenas para background atmosférico.
2. **Refinar stagger de listas**
   - Lista de cards: `0.08–0.1s`.
   - Evitar delay acumulado excessivo em grids longos.
3. **Reduzir amplitudes de parallax**
   - `translateY` máximo absoluto de 18px para conteúdo.
   - Para mídia de fundo, manter deslocamento visual sutil (sem gerar jitter).

## FASE 03 — Experiência (reveal e transição entre páginas)

1. **Reveal de entrada por seção**
   - Criar preset único de reveal (`ghostReveal`) reutilizável.
2. **Transições de seção coesas**
   - Evitar múltiplos observadores por item quando possível; priorizar observador por bloco.
3. **Qualidade de percepção**
   - Preservar “silêncio visual” removendo animações decorativas contínuas em primeiro plano.

## Critérios de aceite técnico

- Sem `scale/rotate/bounce/x` em conteúdo UI.
- Todos os componentes animados respeitam `useMotionGate`.
- Easing padronizado em toda a base de Home/Sobre.
- Camadas z-index alinhadas com Ghost DS (`z-30` para Canvas, `z-50+` para overlays finais).
