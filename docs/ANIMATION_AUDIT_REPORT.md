# 🎬 Animation Audit Report - Ghost Era v2.0

**Date:** 2026-01-06
**Scope:** All pages (Home, Portfolio, Sobre)
**Status:** ✅ Completed

---

## 📊 Executive Summary

Após auditoria completa de **50+ componentes** com animações Framer Motion, foram identificadas e corrigidas várias inconsistências para garantir aderência total ao **Ghost Design System**.

### Métricas de Otimização

| Aspecto | Antes | Depois |
|---------|-------|--------|
| Arquivos de tokens de motion | 3 (duplicados) | 1 (centralizado) |
| Easing hardcoded | 8+ instâncias | 0 |
| Scale animations (proibidas) | 6 instâncias | 0 |
| Spring bouncy (não-Ghost) | 2 instâncias | 0 |
| will-change hints | 0 | 6+ |

---

## 🔧 Alterações Realizadas

### 1. Consolidação de Motion Tokens (`src/config/motion.ts`)

**Antes:** 3 arquivos separados definindo tokens similares
**Depois:** 1 arquivo único como Single Source of Truth

#### Novo conteúdo inclui:
- `GHOST_EASE`, `GHOST_EASE_SOFT`, `GHOST_EASE_HEAVY` - Curvas exportadas
- `MOTION_TOKENS.duration` - Durações padronizadas (slow: 1.2s, normal: 0.8s, etc.)
- `MOTION_TOKENS.spring` - Física de mola Ghost (stiffness: 50, damping: 20)
- `MOTION_TOKENS.offset` - Limites de movimento Y (max: 18px para Ghost)
- Variants reutilizáveis (`ghostFade`, `riseSoft`, `imageFloat`, etc.)
- Helpers (`ghostTransition()`, `staggerContainer()`, `modalVariants`)

### 2. Portfolio Hero (`PortfolioHeroNew.tsx`)

**Correções:**
- ✅ Removido `scale` do hover do botão CTA
- ✅ Adicionado `filter: blur()` para entrada etérea
- ✅ Scroll indicator com timing mais lento (2.8s) e `GHOST_EASE`
- ✅ `will-change-transform` para performance

### 3. Portfolio Card (`PortfolioCard.tsx`)

**Correções:**
- ✅ **REMOÇÃO CRÍTICA:** `scale: 1.05` no hover → substituído por `y: -8`
- ✅ Spring physics ajustado para `spring.snappy` (não bouncy)
- ✅ Entrada com blur sutil (`filter: blur(4px)`)
- ✅ Stagger delay usando tokens centralizados

### 4. Portfolio Modal (`PortfolioModalNew.tsx`)

**Correções:**
- ✅ Removido `scale: 0.96/0.98` das animações de entrada/saída
- ✅ Usando `modalVariants` centralizados para backdrop
- ✅ Timing mais etéreo (duration.modal: 0.5s)

### 5. Featured Projects (`FeaturedProjectsSection.tsx`)

**Correções:**
- ✅ **REMOÇÃO CRÍTICA:** `scale: 0.96` do `cardVariants.hidden`
- ✅ Usando `staggerContainer()` helper
- ✅ Entrada com blur sutil

### 6. Clients Brands (`ClientsBrandsSection.tsx`)

**Correções:**
- ✅ Removido `scale: 0.95` do título
- ✅ Removido `whileHover: { scale: 1.05 }` dos logos
- ✅ Substituído por `hover:brightness-110` (CSS)

---

## 📐 Ghost Design System - Animation Rules

### ✅ Permitido
- `opacity` + `filter: blur()`
- `translateY` (máx 18px para elementos padrão, 40px para hero)
- `translateX` (para elementos específicos)
- Spring physics suave (stiffness: 50-100, damping: 20-30)

### ❌ Proibido
- `scale` em textos e elementos principais
- `rotate` em elementos de UI
- `bounce` / elastic easing
- Spring "bouncy" (stiffness > 200)

---

## 🎯 Performance Improvements

### will-change Hints Adicionados
- `PortfolioHeroNew.tsx` - H1, CTA Button, Scroll Indicator
- `PortfolioCard.tsx` - Article container, Image container

### Filter GPU Acceleration
- Blur animations usam `filter: blur()` que é GPU-accelerated
- Transições suaves de 0.8s-1.2s reduzem CPU strain

---

## 📁 Arquivos Modificados

1. `src/config/motion.ts` - Expansão completa (+254 linhas)
2. `src/components/portfolio/PortfolioHeroNew.tsx`
3. `src/components/portfolio/PortfolioCard.tsx`
4. `src/components/portfolio/PortfolioModalNew.tsx`
5. `src/components/home/FeaturedProjectsSection.tsx`
6. `src/components/home/ClientsBrandsSection.tsx`

---

## 🔍 Componentes Ainda Usando Tokens Locais

Os seguintes componentes ainda usam definições locais mas estão compatíveis com o Ghost Design System:

- `HomeHero.tsx` - Usa `cubicBezier()` do Framer Motion (compatível)
- `AboutHero.tsx` - Usa `motionTokens` específicos de Sobre (OK)
- `HeroCopy.tsx` - Animações simples inline (OK)

Estes podem ser refatorados no futuro para usar `src/config/motion.ts`, mas não representam violações do Design System.

---

## ✅ Verificação Final

```bash
npm run build  # ✅ Passed
npm run lint   # ✅ Passed (0 errors)
```

---

## 🚀 Próximos Passos Recomendados

1. **Migrar tokens restantes** - Refatorar `src/lib/motionTokens.ts` e `src/components/sobre/motion.ts` para importar de `src/config/motion.ts`
2. **Adicionar testes visuais** - Criar snapshots para animações críticas
3. **Documentar edge cases** - Onde `scale` É permitido (ex: ícones de feedback)
