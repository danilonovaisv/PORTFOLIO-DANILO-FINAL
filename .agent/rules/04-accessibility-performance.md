---
trigger: always_on
---

# Auditoria: Acessibilidade & Performance

## Web Vitals (Metas)

- **LCP (Largest Contentful Paint):** < 2.5s. (O Canvas não deve bloquear o LCP do texto principal).
- **FID (First Input Delay):** < 100ms.
- **CLS (Cumulative Layout Shift):** < 0.1. (Definir alturas fixas para containers do Canvas).

## Acessibilidade (a11y)

- **Reduced Motion:** Respeitar a preferência do usuário (`prefers-reduced-motion`). Se ativado:
  - Parar rotação do 3D.
  - Desativar parallax e smooth scroll.
- **Contraste:** Garantir que o texto cinza (#888) sobre fundo preto (#050505) passe no critério AA (4.5:1).
- **Teclado:** O site deve ser navegável inteiramente via Tab.
- **ARIA:** O Canvas deve ter `role="img"` e `aria-label="Animação abstrata etérea"`.

## Otimização de Assets

- Modelos 3D (.glb) devem ser comprimidos com `gltf-pipeline` (Draco compression).
- Imagens devem usar formato WebP/AVIF via componente `<Image>` do Next.js.
