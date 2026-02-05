# Ajustes da Sessão "About Beliefs" - Resumo Executivo

## 📋 Visão Geral

Este documento resume os principais ajustes e especificações da sessão "About Beliefs" (O Que Me Move) do portfólio.

---

## 🎯 Principais Mudanças

### 1. **BeliefFixedHeader - Posicionamento Responsivo**

#### Desktop:
- Sticky com aparência "centro + direita"
- Visualmente centralizado, mas ancorado à direita do grid
- `justify-self-end` + `text-right`
- `position: sticky` + `top-24`

#### Mobile:
- Sticky no **topo-direita** da sessão
- `text-right` mantido
- Não disputa espaço com o bloco principal

---

### 2. **Frases Rotativas - Animações Diferentes por Dispositivo**

#### Desktop (mantém comportamento atual):
```typescript
// Entrada: de baixo para cima
y: 20 → 0
opacity: 0 → 1
blur: 10px → 0

// Saída: de baixo para cima
y: 0 → -20
opacity: 1 → 0
blur: 0 → 10px

// Ciclo: ~4.2s por frase
```

#### Mobile (NOVO comportamento):
```typescript
// Posição: SEMPRE NO RODAPÉ DA SESSÃO, CENTRALIZADO

// Entrada: da DIREITA para o centro
x: +24 → 0  // (não usar 100%, usar valor pequeno)
opacity: 0 → 1
blur: 10px → 0

// Permanência: estável no rodapé

// Saída: do centro para a ESQUERDA
x: 0 → -24
opacity: 1 → 0
blur: 0 → 10px

// IMPORTANTE: NÃO usar `y` no mobile (sem movimento vertical)
// Quebra de linha: só quando necessário (texto centralizado)
```

---

### 3. **Ghost 3D - Alinhamento Vertical**

#### Regra Obrigatória (Desktop e Mobile):
- O Ghost deve estar **sempre alinhado verticalmente ao centro do bloco de texto**
- Não ao centro da viewport, mas ao centro do texto à sua esquerda/direita
- Se o texto quebrar linhas, o Ghost acompanha o centro do bloco textual

#### Mobile - Composição Específica:
```
┌─────────────────────────────┐
│  Header (sticky top-right)  │
├─────────────────────────────┤
│                             │
│  ┌──────┐  ┌────────────┐  │
│  │Ghost │  │   Texto    │  │
│  │ 3D   │  │  (direita) │  │
│  └──────┘  └────────────┘  │
│  (esquerda)                 │
│                             │
├─────────────────────────────┤
│  Texto Rotativo (rodapé)    │
│      (centralizado)         │
└─────────────────────────────┘
```

---

### 4. **Asset 3D - URL do Supabase**

**URL Oficial do GLB:**
```
https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb
```

**Implementação atual:**
- ✅ Já está implementado em `src/components/sobre/3d/GhostModel.tsx`
- ✅ Preload configurado
- ✅ Tipagem correta

---

## 🎨 Paleta de Cores

```typescript
const COLORS = [
  '#0048ff',  // bluePrimary
  '#8705f2',  // purpleDetails
  '#f501d3',  // pinkDetails
  '#0048ff',  // bluePrimary
  '#8705f2',  // purpleDetails
  '#f501d3',  // pinkDetails
];
```

**Uso:**
- Backgrounds das seções rotativas
- Transições suaves sincronizadas com troca de frases
- Fade suave entre cores

---

## 📱 Responsividade - Breakpoints

### Mobile (<768px)
- Header: sticky top-right
- Bloco principal: row (ghost esquerda + texto direita)
- Ghost: 200–240px
- Texto rotativo: rodapé, centralizado, animação horizontal
- Interações: scroll-based

### Tablet (768px - 1024px)
- Transição gradual
- Ghost: 220–260px
- Tipografia intermediária

### Desktop (>1024px)
- Header: sticky "centro + direita"
- Ghost: 320–380px
- Texto: animação vertical (y)
- Interações: hover + scroll

### Extremos
- **>1440px:** mais respiro vertical
- **<360px:** reduzir margens e fontes

---

## 🔧 Estrutura de Arquivos Atual

```
src/components/sobre/
├── sections/
│   └── AboutBeliefs.tsx          # Componente principal
├── beliefs/
│   ├── BeliefFixedHeader.tsx     # Header sticky
│   ├── BeliefSection.tsx         # Frases rotativas
│   ├── BeliefFinalSection.tsx    # Seção final (background)
│   └── BeliefFinalSectionOverlay.tsx  # Manifesto "ISSO É GHOST DESIGN"
└── 3d/
    ├── GhostModel.tsx            # Modelo 3D do Ghost
    └── GhostScene.tsx            # Cena R3F (Canvas, lights, etc)
```

---

## ✅ Checklist de Ajustes Necessários

### Prioridade Alta:
- [ ] Ajustar animação mobile das frases (horizontal em vez de vertical)
- [ ] Posicionar texto rotativo no rodapé (mobile)
- [ ] Garantir alinhamento vertical Ghost ↔ Texto
- [ ] Testar composição "ghost esquerda + texto direita" no mobile

### Prioridade Média:
- [ ] Ajustar BeliefFixedHeader para top-right no mobile
- [ ] Sincronizar transições de background com frases
- [ ] Otimizar tamanho do Ghost por breakpoint

### Prioridade Baixa:
- [ ] Adicionar fallback para WebGL não suportado
- [ ] Melhorar acessibilidade (aria-labels)
- [ ] Adicionar loading state para GLB

---

## 🎬 Comportamento do Ghost

### Animação Base (sempre ativa):
- Flutuação leve e constante
- Movimentos sutis para os lados e cima/baixo
- Nunca para completamente

### Resposta ao Scroll:
- Ganha velocidade conforme scroll
- Inclinação suave (tilt)
- Após 80% do scroll: escala +10% e mais wobble

### Resposta ao Mouse (desktop):
- Follow cursor com LERP
- Rotação suave seguindo movimento
- Wobble/tilt no hover

### Mobile:
- Resposta orientada a scroll/touch
- Sem hover effects
- Mantém flutuação base

---

## 📐 Layout - Momentos da Sessão

### 1. Título Fixo (BeliefFixedHeader)
- Sticky, sempre visível
- Desktop: centro + direita
- Mobile: top-right

### 2. Frases Rotativas + Ghost
- 6 frases em sequência
- Background muda de cor a cada frase
- Ghost responde ao scroll
- Desktop: texto esquerda, ghost direita
- Mobile: ghost esquerda, texto direita (rodapé)

### 3. Reveal Final
- Manifesto "ISSO É / GHOST / DESIGN."
- Ghost em destaque (escala maior)
- Morphing text com blur + opacity
- Grid 12 colunas, manifesto ocupa ~90%

---

## 🎯 Frases do Manifesto

```typescript
const PHRASES = [
  'Um vídeo que respira.',
  'Uma marca que se reconhece.',
  'Um detalhe que fica.',
  'Crio para gerar presença.',
  'Mesmo quando não estou ali.',
  'Mesmo quando ninguém percebe o esforço.',
];
```

---

## 🚀 Próximos Passos

1. **Revisar implementação atual** dos componentes
2. **Ajustar animações mobile** (horizontal em vez de vertical)
3. **Testar alinhamento Ghost ↔ Texto** em diferentes resoluções
4. **Validar transições de cor** sincronizadas
5. **Otimizar performance** (preload, lazy loading)
6. **Testes de acessibilidade** (contraste, foco, aria-labels)

---

## 📚 Documentação Relacionada

- **Especificação completa:** `SPEC_AboutBeliefs_v2.md`
- **Configuração de cores:** `src/config/brand.ts`
- **Componentes atuais:** `src/components/sobre/`

---

**Versão:** 1.0
**Data:** 2025
**Status:** Documentação completa - Pronto para implementação
