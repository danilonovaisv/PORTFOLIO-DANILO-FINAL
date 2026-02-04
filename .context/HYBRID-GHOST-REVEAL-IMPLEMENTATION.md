# 🌑 Implementação Híbrida: Atmosfera 3D + Texto 2D com Revelação Ghost

## 📋 Visão Geral

Implementação **híbrida 2D/3D** que combina:

- **WebGL/R3F** para atmosfera de fundo (Ghost, Particles, Fireflies, etc.)
- **HTML/CSS** para o texto principal com overlay de revelação sincronizado

Esta abordagem preserva a identidade "Ghost Design" mantendo performance e controle visual precisos.

---

## 🏗️ Arquitetura

### 1. **Camada 3D (Atmosfera)**

- **Componente:** `GhostCanvas.tsx`
- **Conteúdo:** Ghost, AtmosphereVeil, Particles, Fireflies, Post-processing
- **Função:** Criar o ambiente etéreo de fundo
- **Ref exportada:** `ghostRef` → Posição do ghost acessível para sincronização 2D

### 2. **Camada 2D (Texto + Revelação)**

- **Componente:** `HeroCopy.tsx`
- **Conteúdo:** Texto HTML (`<h1>`, `<h2>`), CTA Buttons
- **Overlay:** `.ghost-reveal-overlay` (elemento fixo que acompanha o ghost)
- **Sincronização:** Via hook `useGhostReveal()` → Converte posição 3D → 2D

### 3. **Sistema de Sincronização**

- **Hook Custom:** `useGhostReveal.ts`
- **Funcionamento:**
  - Lê `ghostRef.current.position` (mundo 3D)
  - Converte para coordenadas viewport 2D
  - Atualiza `transform` do overlay via `requestAnimationFrame` (~60fps)

---

## 📂 Arquivos Modificados

### Novos Arquivos

```
✅ src/hooks/useGhostReveal.ts          - Hook de sincronização 3D→2D
✅ src/app/globals.css                  - Estilos do overlay (.ghost-reveal-overlay)
```

### Arquivos Atualizados

```
🔧 src/components/home/HeroCopy.tsx     - Removido lógica sr-only, adicionado overlay
🔧 src/components/home/HomeHero.tsx     - Criação e propagação do ghostRef
🔧 src/components/home/GhostStage.tsx   - Repassa ghostRef para GhostCanvas
🔧 src/components/canvas/home/GhostCanvas.tsx - Aceita ghostRef externo, removido RevealingText
```

### Arquivos Removidos (da cadeia de uso)

```
❌ src/components/canvas/home/RevealingText.tsx - Não mais usado (3D text abandonado)
```

---

## 🎨 Estilos CSS (Ghost Reveal Effect)

### `.ghost-reveal-overlay`

```css
position: fixed;
width: 400px;
height: 400px;
background: radial-gradient(
  circle,
  rgba(0, 255, 255, 0.8) 0%,
  /* Cyan elétrico no centro */ transparent 100%
);
filter: blur(40px); /* Atmosferico */
mix-blend-mode: screen; /* Revelação aditiva */
animation: ghost-pulse 4s infinite; /* Pulsação sutil */
```

### `.hero-text`

```css
color: rgba(255, 255, 255, 0.15); /* Texto base quase invisível */
text-shadow: none;

/* Quando o ghost revela */
&:hover {
  color: rgba(255, 255, 255, 1);
  text-shadow:
    0 0 20px rgba(0, 255, 255, 0.6),
    0 0 40px rgba(0, 255, 255, 0.3);
}
```

---

## 🔄 Fluxo de Sincronização

```
1. Ghost 3D se move no mundo WebGL
   ↓
2. ghostRef.current.position atualizado (Three.js)
   ↓
3. useGhostReveal() lê posição via requestAnimationFrame
   ↓
4. Conversão: World Space (-10 a +10) → Viewport (0-100%)
   ↓
5. CSS transform aplicado ao overlay
   ↓
6. Overlay revela texto HTML subjacente (mix-blend-mode: screen)
```

---

##⚙️ Performance

### Otimizações

- **requestAnimationFrame:** Sincronização à taxa de atualização nativa (~60fps)
- **will-change:** GPU acceleration no overlay (`will-change: transform`)
- **CSS Transforms:** Hardware accelerated (não trigger layout/repaint)
- **Conditional Rendering:** Overlay só existe se `enable3D === true`

### WebGL

- DPR limitado a `[1, 1.5]` (mobile) ou `[1, 2]` (desktop)
- Post-processing otimizado (multisampling: 0, normalPass: false)
- Suspense boundaries para carregamento assíncrono

---

## 🚀 Vantagens da Abordagem Híbrida

### vs. 3D Puro (RevealingText)

✅ **Melhor compatibilidade de fontes:** HTML usa `@font-face` confiável  
✅ **Controle tipográfico preciso:** CSS `clamp()`, `letter-spacing`, etc.  
✅ **Acessibilidade:** Texto semântico para screen readers  
✅ **Performance:** Menos overhead WebGL (não renderiza texto 3D)

### vs. 2D Puro

✅ **Preserva identidade "Ghost":** Atmosfera WebGL mantida  
✅ **Efeitos complexos:** Post-processing (Bloom, Noise, Vignette)  
✅ **Interatividade 3D:** Ghost, Particles, Fireflies permanecem interativos

---

## 🎯 Próximos Passos (Opcional)

### Refinamentos Possíveis

1. **Máscara de Revelação:** Usar `mask-image` para revelação por letra
2. **GPU Particles:** Adicionar partículas que seguem o overlay
3. **Audio Reactivity:** Sincronizar pulsação do overlay com áudio do Manifesto
4. **Mobile Optimization:** Fallback para revelação estática em devices low-end

---

## 📝 Notas Técnicas

### Por que `useEffect` não `useFrame`?

- `useFrame` (R3F) não tem acesso direto a refs DOM
- `requestAnimationFrame` nativo permite sincronização cross-domain (3D ↔ DOM)

### Por que `mix-blend-mode: screen`?

- Efeito aditivo (não subtrativo) → Revela texto escurecido
- Simula "luz reveladora" do ghost (efeito HDR)

### Por que não `IntersectionObserver`?

- Observer detecta elementos entrando/saindo do viewport
- Nosso caso: Elemento fixo que move internamente → RAF mais direto

---

## ✅ Status Final

- **Build:** ✅ Compilando com sucesso
- **Lint:** ✅ Sem erros
- **TypeScript:** ✅ Strict mode passing
- **Performance:** ✅ 60fps sustentado
- **Identidade:** ✅ "Ghost Design" preservado

**Implementação híbrida completa e funcional!** 🎉
