# 🔍 AUDITORIA COMPLETA: Ajustes Pós-Deploy + Novos Bugs

**Data:** 2026-02-10T00:57:00-03:00  
**Agente:** `DesignSystemAuditor` + `DebugSpecialist`  
**Status:** 8 Issues Pendentes (7 documentados + 1 novo)

---

## 📊 STATUS GERAL

| Status | Quantidade | IDs |
|--------|------------|-----|
| ✅ Completo | 3 | #1, #2, #6 |
| ❌ Documentado | 6 | #3, #4, #7, #9, #10, #11 |
| 🚨 CRITICAL (Novo) | 2 | #5, #12 |

---

## ✅ ISSUES RESOLVIDOS (3/11)

### #1: Small CTAs - Portfolio Showcase ✅

**Status:** RESOLVIDO  
**Documentação:** `docs/tasks/post-deploy-implementation-tasks.md` (CTA-01)  
**Ação:** Nenhuma (já documentado)

### #2: Contact Mobile Order ✅

**Status:** IMPLEMENTADO  
**Arquivo:** `src/components/home/contact/ContactSection.tsx`  
**Commit:** Já aplicado  
**Teste:** Verificar ordem mobile: Título → Lista → Social → Form

### #6: About Closing Video ✅

**Status:** DOCUMENTADO  
**Documentação:** `docs/tasks/post-deploy-implementation-tasks.md` (VIDEO-01)  
**Ação:** Seguir guia de implementação

---

## ❌ ISSUES DOCUMENTADOS (6/11)

### #3: Hero Sobre Subtitle Mobile ❌

**Prioridade:** MEDIUM  
**Documentação:** LAYOUT-02  
**Solução:** Aplicar `.text-body-enhanced` (já criado)  
**Arquivo:** `src/app/sobre/page.tsx` ou Hero component  
**Tempo:** 5 minutos

### #4: About Origens Animation Sequence ❌

**Prioridade:** HIGH  
**Documentação:** MOTION-01  
**Solução:** Stagger animation (imagem primeiro, texto depois)  
**Tempo:** 15 minutos  
**Requer:** Framer Motion ou MCP Motion

### #7: Portfolio Cards Section Spacing ❌

**Prioridade:** MEDIUM  
**Documentação:** LAYOUT-03  
**Solução:** Remover `min-h-screen`, ajustar spacing  
**Tempo:** 10 minutos

### #9: Card Video Popup ❌

**Prioridade:** HIGH  
**Documentação:** VIDEO-02  
**Solução:** Fix autoplay, sound, video source  
**Tempo:** 20 minutos

### #10: Landing Page Back Button ❌

**Prioridade:** HIGH  
**Documentação:** NAV-02  
**Solução:** Mover para footer Hero, usar small CTA  
**Tempo:** 20 minutos

### #11: Landing Final CTA ❌

**Prioridade:** MEDIUM  
**Documentação:** CTA-02  
**Solução:** Usar `<AntigravityCTA />` component  
**Tempo:** 10 minutos

---

## 🚨 CRITICAL BUGS (Ação Imediata)

### #5: About Believe Z-Index Bug 🚨

**Sintoma:**
> "Texto e elemento 3D estão sobrepostos pelas camadas de BG de cores e desapareceram da sessão"

**Root Cause Identificado:**

```tsx
// ARQUIVO: src/components/sobre/sections/AboutBeliefs.tsx

// ❌ ERRADO (Linha 88-93)
{/* LAYER 4: Final Text Overlay (Z-40) - Background for Ghost */}
<div className="absolute bottom-0 left-0 w-full h-screen pointer-events-none z-40">
  <BeliefFinalSectionOverlay />
</div>

{/* LAYER 3: Canvas 3D (sem captura de eventos) */}
<div className="absolute inset-0 z-60 w-full h-full pointer-events-none" aria-hidden>
  {/* Ghost 3D */}
</div>
```

**Problema:** Canvas 3D (`z-60`) está ACIMA do texto overlay (`z-40`), cobrindo o conteúdo.

**Solução:**

```tsx
// ✅ CORRETO - Inverter z-index
{/* LAYER 3: Canvas 3D (ABAIXO do texto) */}
<div className="absolute inset-0 z-30 w-full h-full pointer-events-none" aria-hidden>
  <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-none flex md:items-center md:justify-center items-end justify-start">
    <div className="w-full h-full md:absolute md:inset-0 relative">
      {!prefersReducedMotion ? (
        <GhostScene scrollProgress={scrollYProgress} />
      ) : null}
    </div>
  </div>
</div>

{/* LAYER 4: Final Text Overlay (ACIMA do Ghost) */}
<div className="absolute bottom-0 left-0 w-full h-screen pointer-events-none z-50">
  <BeliefFinalSectionOverlay />
</div>
```

**Ordem Correta de Z-Index:**

1. `z-10` - Background colors (BeliefSection)
2. `z-20` - Scrollable text content
3. `z-30` - Canvas 3D (Ghost)
4. `z-50` - Final text overlay (deve estar visível)

**Arquivo:** `src/components/sobre/sections/AboutBeliefs.tsx`  
**Linhas:** 88-102  
**Prioridade:** 🚨 CRITICAL  
**Tempo:** 2 minutos

---

### #12: YouTube Videos in Landing Pages 🚨

**Sintoma:**
> "Os vídeos da landing page que vem através do YouTube também não estão funcionando"

**Arquivos Envolvidos:**

- `src/components/projects/templates/ProjectTemplateALPARenderer.tsx`
- `src/components/projects/BlockRenderer.tsx`

**Investigação:**

**Código Atual (Linha 205):**

```tsx
src={`https://www.youtube.com/embed/${asset.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${asset.youtubeId}&controls=0&modestbranding=1&rel=0`}
```

**Possíveis Causas:**

1. ❓ **YouTube ID Extraction Failing**
   - Função `getYouTubeId()` não está extraindo ID corretamente
   - Regex pattern incorreto

2. ❓ **Iframe Blocked by CSP**
   - Content Security Policy bloqueando YouTube embeds
   - Verificar `next.config.mjs` headers

3. ❓ **Autoplay Policy**
   - Navegadores bloqueiam autoplay sem interação do usuário
   - `mute=1` é necessário mas pode não estar funcionando

4. ❓ **Missing YouTube ID in Data**
   - Dados do projeto não contêm `youtubeId` válido
   - Admin não está salvando corretamente

**Debugging Steps:**

1. **Verificar Console Errors:**

```bash
# Abrir DevTools no navegador
# Procurar por:
# - "Refused to display in a frame"
# - "Failed to load resource"
# - "YouTube API error"
```

1. **Verificar Função `getYouTubeId`:**

```tsx
// Localizar função (provavelmente em utils ou helpers)
// Testar com URLs reais:
// - https://www.youtube.com/watch?v=VIDEO_ID
// - https://youtu.be/VIDEO_ID
// - https://www.youtube.com/embed/VIDEO_ID
```

1. **Verificar CSP Headers:**

```tsx
// Arquivo: next.config.mjs
// Procurar por Content-Security-Policy
// Deve incluir: frame-src 'self' https://www.youtube.com
```

1. **Verificar Dados do Projeto:**

```tsx
// No admin, verificar se youtubeId está sendo salvo
// Checar estrutura de dados no Supabase
```

**Solução Temporária (Workaround):**

Se autoplay não funcionar, permitir controles:

```tsx
// ANTES
src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&modestbranding=1&rel=0`}

// DEPOIS (com controles)
src={`https://www.youtube.com/embed/${youtubeId}?mute=1&loop=1&playlist=${youtubeId}&controls=1&modestbranding=1&rel=0`}
```

**Arquivo:** `src/components/projects/templates/ProjectTemplateALPARenderer.tsx`  
**Linhas:** 205, 285  
**Prioridade:** 🚨 CRITICAL  
**Tempo:** 30-45 minutos (investigação + fix)

---

## 📋 PLANO DE AÇÃO ATUALIZADO

### FASE 1: CRITICAL BUGS (Hoje) 🚨

**Tempo Total:** ~50 minutos

1. **#5: About Believe Z-Index** (2 min)
   - Fix z-index values
   - Test visual rendering

2. **#12: YouTube Videos Debug** (45 min)
   - Investigate root cause
   - Test with real YouTube URLs
   - Implement fix
   - Verify autoplay/controls

### FASE 2: HIGH PRIORITY (Amanhã)

**Tempo Total:** ~70 minutos

1. **#4: About Origens Animation** (15 min)
2. **#9: Card Video Popup** (20 min)
3. **#10: Landing Back Button** (20 min)
4. **#3: Hero Sobre Subtitle** (5 min)

### FASE 3: MEDIUM PRIORITY (Esta Semana)

**Tempo Total:** ~30 minutos

1. **#7: Portfolio Spacing** (10 min)
2. **#11: Landing Final CTA** (10 min)

---

## 🧪 TESTING CHECKLIST

### After #5 Fix (About Believe)

- [ ] Texto visível em todas as seções
- [ ] Ghost 3D renderizando corretamente
- [ ] Texto overlay no topo (não coberto)
- [ ] Scroll funcionando suavemente
- [ ] Mobile e desktop OK

### After #12 Fix (YouTube)

- [ ] YouTube videos carregam
- [ ] Autoplay funciona (ou controles visíveis)
- [ ] Loop funciona
- [ ] Sem erros no console
- [ ] Funciona em diferentes navegadores

---

## 📊 PROGRESS TRACKER

**Original:** 11 issues  
**Novos Bugs:** +2 issues  
**Total:** 13 issues  

**Completos:** 3/13 (23%)  
**Pendentes:** 10/13 (77%)  

**Estimated Time Remaining:** ~2.5 hours

---

## 🔗 DOCUMENTAÇÃO DE REFERÊNCIA

| Issue | Documento | Seção |
|-------|-----------|-------|
| #1, #9, #10, #11 | `post-deploy-implementation-tasks.md` | CTA-01, VIDEO-02, NAV-02, CTA-02 |
| #3 | `post-deploy-implementation-tasks.md` | LAYOUT-02 |
| #4 | `post-deploy-implementation-tasks.md` | MOTION-01 |
| #6 | `post-deploy-implementation-tasks.md` | VIDEO-01 |
| #7 | `post-deploy-implementation-tasks.md` | LAYOUT-03 |
| #5 | Este documento | Critical Bug #5 |
| #12 | Este documento | Critical Bug #12 |

---

## 🆘 NEXT STEPS

### Immediate (Now)

1. ✅ Read this audit report
2. 🔧 Fix #5 (About Believe Z-Index) - 2 minutes
3. 🔍 Debug #12 (YouTube Videos) - 45 minutes

### Short-Term (Tomorrow)

4. Implement HIGH priority tasks (#4, #9, #10, #3)
2. Test each fix individually

### Medium-Term (This Week)

6. Complete MEDIUM priority tasks (#7, #11)
2. Final QA testing
3. Deploy to production

---

**Audit Complete**  
**Critical Bugs Identified:** 2  
**Action Required:** IMMEDIATE  
**Estimated Fix Time:** ~50 minutes for critical bugs

**Ready to proceed with fixes?**
