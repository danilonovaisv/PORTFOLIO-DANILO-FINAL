# Relatório de Auditoria e Prompts Orquestrados (Antigravity)

## Resumo da Auditoria
A auditoria identificou discrepâncias significativas entre a documentação (`.context/DOCS-PORTFOLIO-PAGES`) e a implementação atual. A principal falha de fidelidade é a ausência do comportamento "Floating Manifesto Thumbnail" na Home. Além disso, foram encontradas oportunidades de melhoria em performance (preloader) e organização de código.

## Prompts Orquestrados

Execute os seguintes prompts no Antigravity para aplicar as correções:

### Prompt 1: FIDELIDADE & UX (Critical Fix)
```text
[/slash_command] "Refatorar `src/components/home/hero/HomeHero.tsx` e `VideoManifesto.tsx` para implementar o comportamento 'Floating Manifesto Thumbnail' conforme documentação (.context/DOCS-PORTFOLIO-PAGES/01-HOME/02-HERO.md):
1.  **Estado Inicial (Desktop):** O vídeo deve iniciar como um thumbnail flutuante no canto inferior direito (fixed/absolute, z-30), mudo e em loop.
2.  **Scroll Interaction:** Implementar animação scroll-driven (Framer Motion `useScroll`):
    -   Ao rolar o Hero, o vídeo deve escalar (`scale: 0.3 -> 1`), perder o `borderRadius` e centralizar na tela.
    -   O texto do Hero deve fazer fade-out enquanto o vídeo expande.
3.  **Estado Fullscreen:** Ao completar o scroll do Hero, o vídeo deve travar em fullscreen (sticky/fixed), ativar o áudio (unmute) e manter-se por 2s antes de liberar o scroll para a próxima seção.
4.  **Mobile:** Manter o comportamento atual (seção estática abaixo do Hero) para performance."
```

### Prompt 2: PERFORMANCE WEBGL & LOADING
```text
[/slash_command] "Otimizar o carregamento da Home em `src/components/home/hero/HomeHero.tsx`:
1.  Substituir o `setTimeout` de 500ms do Preloader por um sinal real de `onCreated` do Canvas R3F (`GhostSceneWrapper`).
2.  Implementar 'Graceful Degradation': Se o WebGL falhar ou demorar >3s, remover o Preloader e exibir o fallback de gradiente imediatamente.
3.  Garantir que `GhostSceneWrapper` utilize `dpr={[1, 1.5]}` para limitar o custo de renderização em telas de alta densidade."
```

### Prompt 3: ORGANIZAÇÃO & LIMPEZA
```text
[/slash_command] "Padronização e Limpeza de Código:
1.  Verificar `src/components/home/hero/HeroCTA.tsx`: Se não estiver sendo usado visualmente (layout quebrado ou sobreposto), remover ou integrar corretamente com z-index ajustado (z-50).
2.  Converter estilos CSS Modules residuais em `HeroCopy.module.css` para Tailwind CSS utilitário, unificando a stack de estilização.
3.  Remover imports não utilizados em `src/app/page.tsx` após a refatoração do Manifesto."
```

### Prompt 4: ACESSIBILIDADE (A11Y)
```text
[/slash_command] "Garantir Acessibilidade na nova interação do Manifesto:
1.  O thumbnail do vídeo deve ser focável (`tabIndex=0`) e expansível via teclado (Enter/Space).
2.  Adicionar `aria-label` dinâmico ('Expandir vídeo manifesto' / 'Vídeo em tela cheia').
3.  Assegurar que o botão de 'Mute/Unmute' permaneça acessível e visível em todos os estados da animação.
4.  Respeitar `prefers-reduced-motion`: Se ativo, desabilitar a animação de expansão e exibir o vídeo estático em tamanho real."
```

### Prompt 5: NEXT.JS & SEO
```text
[/slash_command] "Revisão Final de Metadados e Cache:
1.  Validar em `src/app/page.tsx` se `alternates: { canonical: ... }` está configurado corretamente com a URL de produção.
2.  Verificar se o polling de `FeaturedProjectsRealtime` (45s) está causando re-renderizações desnecessárias e otimizar com `useMemo`/`useCallback` se necessário."
```
