# Runbook: O Que Me Move

## Pré-voo
- confirmar `source(none)` em `globals.css`
- confirmar `getAssetUrl()` em `@/lib/utils`
- confirmar que o asset `site-assets/about/beliefs/ghost.glb` existe
- confirmar que não há import legado para helpers de asset
- confirmar que o route segment `/sobre` já está saudável

## Validação funcional
1. Entrar em `/sobre`
2. Navegar até `#o-que-me-move`
3. Verificar troca de background por frase
4. Verificar header editorial
5. Verificar frases desktop/mobile
6. Verificar manifesto final
7. Verificar Ghost sobrepondo `GHOST`

## Validação técnica
- reduced motion
- mobile DPR
- fallback de WebGL
- `loading.tsx`
- `error.tsx`
- `not-found.tsx`

## Gate de release
Só liberar depois de:
- checklist PASS
- evidências visuais
- ausência de regressões graves
- documentação atualizada se houver mudança estrutural
