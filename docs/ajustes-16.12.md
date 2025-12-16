 Analise cada um dos problemas e ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.

✅ Nenhum ponto deve ser ignorado.

## 1) Lista de Problemas (por severidade)

Alta:
1. `.gitignore` com “```” (quebra regras de ignore e pode poluir repo).
2. Versionamento de `.firebase/**/.next/**` (artefatos) — ruído e risco de inconsistência.
3. Portfolio Mosaic com pattern gerado + shuffle pode impedir fidelidade visual fixa (drift).
4. Dependência de imagens remotas de domínio externo (risco de quebra/placeholder).

Média:
5. `searchParams.category` sem tratamento completo para `string[]`.
6. Manifesto sem microinteração/controle pode divergir do esperado.
7. Hero com `h-[200vh]` + sticky pode desalinhar ritmo vertical vs referência.
8. PortfolioShowcase: poster inferido por regex pode quebrar thumbs.

Baixa:
9. Imports possivelmente não usados (ex.: `CATEGORIES`).
10. Ajustes finos de acessibilidade (focus ring consistente, semântica de headings e botões).

---

## 2) Recomendações Prioritárias

1. Corrigir `.gitignore` e parar de versionar artifacts de build.
2. Congelar layout do mosaico do `/portfolio` para bater 1:1 com a referência.
3. Normalizar origem de mídia (preferir Supabase Storage / `public/`) e garantir fallbacks.
4. Ajustar Hero (scroll/sticky) para reproduzir exatamente o ritmo da referência, com foco em mobile e CLS.

---

## Prompts técnicos para agente executor (atômicos e executáveis)

### Prompt #01 — Corrigir `.gitignore` (remoção de markdown fences)

Objetivo:
Garantir que `.gitignore` funcione corretamente e evitar versionamento indevido de artefatos.

Ações:
1. Abrir `.gitignore` e remover linhas com ``` (code fences).
2. Garantir que `.next/`, `node_modules/`, `.firebase/` e logs estejam corretamente ignorados.
3. Confirmar newline ao final do arquivo.

Regras:
- Não alterar textos do site.
- Apenas corrigir `.gitignore`.

Resultado esperado:
Repo volta a ignorar corretamente artifacts e o diff deixa de ser poluído.

---

### Prompt #02 — Remover artifacts do versionamento (`.firebase/**/.next/**`)

Objetivo:
Reduzir ruído, peso de repo e risco de inconsistência no deploy.

Ações:
1. Remover artifacts gerados em `.firebase/**/.next/**` do Git.
2. Manter apenas configurações necessárias do Firebase.
3. Ajustar `.gitignore` para impedir reintrodução.

Regras:
- Não mudar layout, textos ou ordem de seções.
- Apenas limpeza de artefatos e regras de ignore.

Resultado esperado:
Commits futuros não incluem `.next` gerado dentro de `.firebase`.

---

### Prompt #03 — Congelar o mosaico do `/portfolio` (fidelidade visual absoluta)

Objetivo:
Garantir que o mosaico do `/portfolio` fique idêntico ao layout de referência (sem variações por seed/shuffle).

Ações:
1. Localizar `buildMosaicRows(category)` em `src/app/portfolio/page.tsx`.
2. Substituir geração randômica por estrutura fixa `MosaicRow[]` alinhada ao layout esperado.
3. Garantir que cada tile tenha `imageSrc` válido ou fallback exatamente como na referência.

Regras:
- Não alterar textos.
- Manter App Router e `searchParams.category`.
- Não adicionar novas seções.

Resultado esperado:
Mosaico determinístico e 1:1 com a referência.

---

### Prompt #04 — Robustez de `searchParams.category` (PORTFOLIO)

Objetivo:
Evitar estados inválidos e garantir filtro consistente.

Ações:
1. Tratar `searchParams.category` quando vier como `string[]`.
2. Validar categoria via constante única (ex.: `CATEGORIES`).
3. Manter fallback seguro para `all` sem quebrar navegação.

Regras:
- Não alterar textos.
- Não mudar rotas nem ordem das seções.

Resultado esperado:
Filtro funciona com URLs válidas e não quebra com parâmetros duplicados.

---

### Prompt #05 — Normalizar origem de imagens do mosaico (Supabase Storage)

Objetivo:
Eliminar dependência de domínios externos e evitar tiles quebrados.

Ações:
1. Identificar tiles com `imageSrc` de domínios externos (ex.: `loandbehold.studio`).
2. Migrar assets para Supabase Storage (ou `public/` quando apropriado).
3. Atualizar URLs e garantir fallback conforme layout (não “cinza genérico” se não existir no layout).

Regras:
- Não alterar textos.
- Não alterar ordem de seções.
- Manter layout fixo do mosaico.

Resultado esperado:
Nenhum tile quebra por indisponibilidade de domínio externo.

---
 ########
### Prompt #06 — Correção do Hero (HOME): fidelidade + 3D estável

Objetivo:
Garantir fidelidade total ao layout de referência com 3D funcional e performance estável.

Ações:
1. Revisar grid/paddings/alinhamentos em `src/components/sections/Hero.tsx`.
2. Validar integração 3D:
   - `Hero.tsx` → `HeroGlassCanvas.tsx` → `TorusDan.tsx` → `/public/media/torus_dan.glb`
3. Garantir carregamento do GLB com `Suspense` + fallback e sem SSR.
4. Ajustar transforms/scroll (`h-[200vh]`, sticky, offsets) apenas se necessário para bater o ritmo da referência.
5. Garantir `prefers-reduced-motion` para todas as camadas animadas.

Regras:
- Não alterar textos (“Design, não é só estética.” etc.).
- Usar Tailwind CSS.
- Manter App Router.
- Manter R3F/Drei/Three.
- Validar mobile-first.

Resultado esperado:
Hero idêntico à referência, 3D sempre visível, sem CLS perceptível e animações suaves.

---

### Prompt #07 — Manifesto (HOME): restaurar microinterações conforme referência

Objetivo:
Reproduzir exatamente o bloco de vídeo/manifesto conforme layout e UX esperados.

Ações:
1. Revisar `src/components/home/Manifesto.tsx`.
2. Confirmar na referência se há interação (toggle mute, overlay, play affordance, etc).
3. Implementar apenas o mínimo necessário (cursor/focus/aria/overlay) para ficar idêntico ao layout esperado.

Regras:
- Não alterar textos.
- Não criar controles extras se não existirem na referência.

Resultado esperado:
Manifesto com aparência e interação idênticas à referência.

---

### Prompt #08 — PortfolioShowcase: thumbs consistentes e leves

Objetivo:
Evitar poster quebrado e reduzir custo de carregamento.

Ações:
1. Revisar `src/components/home/PortfolioShowcase.tsx`.
2. Substituir poster inferido por regex por:
   - `posterUrl` explícito no dataset, ou
   - fallback garantido (Supabase/local).
3. Garantir `preload="metadata"`, lazy-loading e fallbacks.

Regras:
- Não mudar textos.
- Manter layout idêntico.

Resultado esperado:
Cards do showcase sempre com preview funcionando.

---

### Prompt #09 — Padronizar containers/paddings globais (HOME + PORTFOLIO)

Objetivo:
Eliminar variação de margens laterais e alinhar grid global.

Ações:
1. Mapear seções com/sem `container mx-auto`.
2. Padronizar classes Tailwind (ou wrapper `PageContainer`) para garantir mesma régua de `px` e `max-w`.
3. Validar Header/Hero/Showcase/Brands/Contact/Footer alinhados ao mesmo grid.

Regras:
- Não alterar textos.
- Não mudar ordem das seções.
- Apenas ajuste de layout.

Resultado esperado:
Todas as seções alinham perfeitamente no grid da referência.

---

### Prompt #10 — Acessibilidade base (HOME + PORTFOLIO)

Objetivo:
Garantir navegação por teclado e semântica mínima sem mudar layout.

Ações:
1. Validar CTAs como `<a>`/`<button>` coerentes.
2. Adicionar `aria-label` em ícones sem texto.
3. Garantir foco visível (`focus-visible:ring-*`) em links/botões.
4. Confirmar apenas um `<h1>` por página.

Regras:
- Não alterar textos.
- Não alterar layout (somente atributos/semântica/foco).

Resultado esperado:
Site navegável por teclado e com semântica consistente, sem mudanças visuais inesperadas.
