# Relatório de Auditoria: Home Page (Ghost Era)
**Data:** 03/01/2026
**Status:** 🟡 Parcialmente Conforme

## 1. Análise Visual & Atmosfera
- **Conformidade:** ✅
- **Ghost System:** O WebGL (`GhostCanvas`, `Particles`, `GhostEyes`) está implementado conforme as referências "Ghost".
- **Cores:** Tokens corretos (`#050511` bg, `#0057FF` accents) em uso.
- **Tipografia:** `HeroCopy` usa fontes corretas e escalas responsivas (`clamp()`).

## 2. Comportamento: Hero & Manifesto
### Fullscreen Hold (Desktop)
- **Implementação:** ✅ Detectada em `HomeHero.tsx`.
- **Lógica:**
  - Timer de 2s implementado (`setTimeout` 2000ms).
  - Bloqueio de scroll (`overflow: hidden`) ativo.
  - **Atenção (UX):** O áudio é cortado *exatamente* após 2s. Se o usuário permanecer na seção sem scrollar, o vídeo ficará mudo. A especificação sugere "plays while in this full-page state".
  - **Ação Recomendada:** Manter o áudio ativo *enquanto* `fullscreenHold` for true, OU até que o usuário role para a próxima seção (`latest > 1.0`).

### Entrance Animation
- **Conformidade:** ✅
- **Detalhes:** `duration: 1.2`, `ease: [0.25, 0.46, 0.45, 0.94]`, `scale: [1.02, 1]` conferem exatamente com a documentação.

## 3. Integridade de Código & Regras
### Hardcoded Assets (Violação Detectada) 🔴
- **Arquivo:** `src/components/home/ManifestoThumb.tsx`
- **Problema:** Linha 13 define um fallback hardcoded:
  ```typescript
  const VIDEO_SOURCES = {
    local: '/assets/thumb-hero.mp4', // ❌ HARDCODED
    remote: HOME_CONTENT.hero.video,
  };
  ```
- **Ação:** Mover este path para `src/config/content.ts` ou remover a dependência de asset local se a CDN Supabase for a única fonte da verdade.

## 4. Estrutura Mobile
- **ManifestoSection:** Implementado separadamente para mobile (`lg:hidden`), respeitando a regra de "seção abaixo do Hero" para telas pequenas.

## 5. Próximos Passos (Ações Imediatas)
1. **Refatorar `ManifestoThumb.tsx`**: Eliminar string hardcoded.
2. **Refinar Lógica de Áudio**: Garantir que o mute só ocorra quando o usuário realmente sair da visualização fullscreen, não apenas ao fim do timer.
