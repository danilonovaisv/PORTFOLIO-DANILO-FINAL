# 🎼 Plano de Orquestração: Ghost Beliefs Refactor

**Criado:** 2026-02-04  
**Status:** AGUARDANDO APROVAÇÃO  
**Domínios:** 3D/WebGL, UI/UX Mobile, Arquitetura de Código

---

## 📋 Resumo Executivo

Este plano aborda três objetivos para a seção **"About Beliefs"** da página Sobre:

| # | Objetivo | Descrição |
|---|----------|-----------|
| A | **Visual do Ghost** | Ajustar materiais/cores do modelo 3D para estilo "Black Ghost" mais sombrio |
| B | **Posicionamento Mobile** | Centralizar Ghost verticalmente ao bloco de texto no mobile |
| F | **Organização de Código** | Estruturar `src/components/sobre/` em subpastas semânticas |

---

## 🤖 Agentes Designados

| # | Agente | Domínio | Tarefa Principal |
|---|--------|---------|------------------|
| 1 | `@spectral_artist` | WebGL/Three.js | Ajustar materiais do GhostModel para estilo "Black Ghost" |
| 2 | `@ghost_architect` | Next.js/Layout | Corrigir posicionamento mobile do Ghost + reorganizar estrutura |
| 3 | `@audit_sentinel` | Performance/QA | Validar build, verificar performance 3D, testar responsividade |

---

## 📐 Detalhamento por Objetivo

### OBJETIVO A: Visual do Ghost - "Black Ghost" Style

**Problema Atual:**

- O Ghost tem cores claras (`#f6f8ff` para corpo, `#ff3246` para detalhes)
- Não corresponde ao visual sombrio/atmosférico desejado

**Solução Proposta:**

1. Ajustar `ghostMaterial`:
   - `color`: `#1a1a2e` → Ghost body mais escuro
   - `emissive`: `#0048ff` → Brilho azul sutil (bluePrimary)
   - `emissiveIntensity`: `0.15` → Presença etérea

2. Ajustar `hatMaterial`:
   - Manter preto profundo como está

3. Ajustar `rimMaterial`:
   - `color`: `#0048ff` → Anel azul (bluePrimary)
   - `emissive`: `#4fe6ff` → Brilho ciano (blueAccent)

4. Adicionar atmosfera:
   - Considerar fog leve azulado no Canvas
   - Ajustar iluminação para tons frios

**Arquivos Afetados:**

- `src/components/sobre/GhostModel.tsx`
- `src/components/sobre/AboutBeliefs.tsx` (iluminação)

---

### OBJETIVO B: Posicionamento Mobile

**Problema Atual (conforme spec):**
> "O Ghost 3D deve ficar **sempre alinhado verticalmente ao centro do bloco de texto à sua esquerda**"  
> Mobile: "Ghost 3D à esquerda, texto à direita"

**Estado Atual do Código:**

```tsx
// AboutBeliefs.tsx linha 111
<div className="absolute inset-0 w-full h-full pointer-events-none z-50 md:top-0 top-[20%]">
```

- O Ghost está usando `top-[20%]` fixo no mobile
- Não está sincronizado com o centro do bloco de texto

**Solução Proposta:**

1. Criar container flex que agrupa Ghost + Texto
2. Usar `items-center` para alinhamento vertical
3. No mobile:
   - Ordem: Ghost (esquerda) + Texto (direita)
   - Ghost com `flex-shrink-0` e tamanho fixo (200-240px)
4. Ajustar z-index layers para composição correta

**Arquivos Afetados:**

- `src/components/sobre/AboutBeliefs.tsx`
- `src/components/sobre/BeliefSection.tsx`
- `src/components/sobre/BeliefMobileTextLayer` (se existir separado)

---

### OBJETIVO F: Organização de Código

**Estrutura Atual:**

```
src/components/sobre/
├── AboutBeliefs.tsx
├── AboutClosing.tsx
├── AboutHero.tsx
├── AboutMethod.tsx
├── AboutOrigin.tsx
├── AboutWhatIDo.tsx
├── BeliefFinalSection.tsx
├── BeliefFinalSectionOverlay.tsx
├── BeliefFixedHeader.tsx
├── BeliefSection.tsx
├── GhostModel.tsx
├── GhostScene.tsx
├── Overlay.tsx
├── ProceduralGhost.tsx
├── keywords.tsx
├── motion.ts
├── origin/
└── what-i-do/
```

**Estrutura Proposta:**

```
src/components/sobre/
├── index.ts                    # Re-exports
├── sections/
│   ├── AboutHero.tsx
│   ├── AboutOrigin.tsx
│   ├── AboutWhatIDo.tsx
│   ├── AboutMethod.tsx
│   ├── AboutBeliefs.tsx
│   └── AboutClosing.tsx
├── beliefs/
│   ├── BeliefSection.tsx
│   ├── BeliefFixedHeader.tsx
│   ├── BeliefFinalSection.tsx
│   ├── BeliefFinalSectionOverlay.tsx
│   └── BeliefMobileTextLayer.tsx (extrair de BeliefSection)
├── 3d/
│   ├── GhostModel.tsx
│   ├── GhostScene.tsx
│   ├── ProceduralGhost.tsx
│   └── index.ts
├── origin/                     # Mantém existente
├── what-i-do/                  # Mantém existente
├── shared/
│   ├── motion.ts
│   ├── keywords.tsx
│   └── Overlay.tsx
└── types/
    └── index.ts               # Tipos compartilhados
```

**Regras de Migração:**

1. Mover arquivos para subpastas
2. Atualizar todos os imports
3. Criar `index.ts` com re-exports para manter compatibilidade
4. Verificar build após cada lote de mudanças

---

## 📅 Sequência de Execução

| Fase | Agente | Ação | Dependência |
|------|--------|------|-------------|
| 1.1 | `@ghost_architect` | Reorganizar estrutura de pastas | Nenhuma |
| 1.2 | `@ghost_architect` | Atualizar imports em todo o projeto | 1.1 |
| 2.1 | `@spectral_artist` | Ajustar materiais GhostModel | 1.2 |
| 2.2 | `@spectral_artist` | Ajustar iluminação/atmosfera Canvas | 2.1 |
| 3.1 | `@ghost_architect` | Corrigir posicionamento mobile | 2.2 |
| 4.1 | `@audit_sentinel` | Validar build TypeScript | 3.1 |
| 4.2 | `@audit_sentinel` | Testar responsividade | 4.1 |

---

## ✅ Critérios de Aceite

### Visual (A)

- [ ] Ghost com aparência sombria/etérea
- [ ] Cores alinhadas ao sistema Ghost Design (bluePrimary, blueAccent)
- [ ] Sem impacto negativo na performance

### Mobile (B)

- [ ] Ghost centralizado verticalmente ao texto
- [ ] Ordem correta: Ghost (esquerda) + Texto (direita)
- [ ] Animação de entrada/saída funcionando

### Organização (F)

- [ ] Arquivos organizados em subpastas semânticas
- [ ] Todos os imports funcionando
- [ ] Build passando sem erros
- [ ] Zero arquivos duplicados

---

## 🔐 Arquivos de Referência

- **Especificação**: `docs/SOBRE/SOBRE-PROTOTIPO-INTERATIVO.md`
- **Imagens**: `docs/SOBRE/SOBRE-MOBILE-BLACK---GHOST.jpg`, `docs/SOBRE/SOBRE-MOBILE-BLACK-GHOST-2.jpg`
- **Modelo 3D**: Sketchfab Ghost w/ Tophat (referência visual para estilo)

---

## ⚠️ Riscos e Mitigações

| Risco | Probabilidade | Mitigação |
|-------|--------------|-----------|
| Quebra de imports após reorganização | Alta | Usar `index.ts` re-exports |
| Performance 3D degradada | Baixa | Validar com Lighthouse após |
| Layout mobile quebrado | Média | Testar em múltiplos viewports |

---

**Status:** AGUARDANDO APROVAÇÃO DO USUÁRIO

> Confirme com **"Y"** para iniciar a implementação ou **"N"** para ajustes no plano.
