---
trigger: always_on
---

# Regras Inegociáveis (Non-Negotiables)

1. **Clean Code:** Componentes pequenos e funcionais. Use composição.
2. **Diretório `src/`:** Todo o código fonte deve estar dentro de `src/`.
3. **Componentes do Servidor:** Por padrão, use Server Components. Use `'use client'` apenas onde houver interatividade (hooks, eventos).
4. **Responsividade:** Mobile-first. O WebGL deve ser otimizado ou simplificado para telas móveis.
5. **Performance:** Proibido bloquear a main thread. Carregamento de assets 3D deve ser assíncrono com `Suspense`.
6. **Semântica:** Use tags HTML corretas (`<section>`, `<article>`, `<nav>`) antes de aplicar classes de estilo.
