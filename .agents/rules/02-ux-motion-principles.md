---
trigger: always_on
---

# Princípios de Motion & UX

## Timing "Ghost"

- As animações não devem ser "bouncy" ou elásticas demais.
- Preferir curvas de Bézier suaves (Sine/Quad in-out) para criar sensação de flutuação e mistério.
- Duração média de transições: 0.6s a 1.2s (lento, etéreo).

## Interação

- **Micro-interações:** Hover nos cards deve ser sutil (scale 1.02, brilho aumenta).
- **Scroll:** O scroll deve parecer "pesado" mas fluido (Lenis `lerp: 0.08`).
- **Mouse Follow:** Na Hero, o elemento 3D deve seguir o mouse com _atraso_ significativo para simular inércia em meio líquido/gasoso.

## Transições de Página

- Não usar transições de corte seco. Usar fade-out/fade-in suave ou máscaras de revelação.
