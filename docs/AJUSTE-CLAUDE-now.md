AUDITORIA Ghost Design System v3.1 — bb4429b\n11 desvios encontrados (3 Críticos · 5 Moderados · 3 Menores). Relatório completo em thread.

:red_circle: CRÍTICOS (bloqueiam produção)[C-01] --color-textSecondary ERRADO
Arquivo: src/app/globals.css → @theme
SSOT: #a1a3a3 (cinza muted) | Código: #fcffff (igual ao texto primário!)
Impacto: Hierarquia visual quebrada. Metadata, captions e estados inativos ficam com mesmo contraste que headings.[C-02] --color-redAccent AUSENTE
Arquivo: src/app/globals.css → bloco @theme
SSOT: --color-redAccent: #E50914
Token nunca declarado → text-redAccent não gera CSS. Erros de sistema ficam sem cor semântica.[C-03] error.tsx usa classe inválida text-accentRed
Arquivo: src/app/error.tsx
Nome correto: text-redAccent (tokens Ghost sempre seguem o padrão nomeTipo)
Resultado: h2 "Something went wrong!" renderiza sem cor de alerta.

:large_orange_circle: MODERADOS (desvios de token — não bloqueiam, mas violam SSOT)[M-04] global-error.tsx — 5 magic numbers de cor
text-[#94a3b8] → deveria ser text-textSecondary
text-[#cbd5f5] → cor inexistente no Ghost System
bg-[#040013] → deveria ser bg-(--color-background)
hover:bg-[#4fe6ff] → deveria ser hover:bg-blueAccent
focus-visible:ring-[#4fe6ff] → deveria ser focus-visible:ring-blueAccent[M-05] text-white em vez de token text-text
Arquivos: not-found.tsx e sobre/page.tsx
SSOT: --color-text: #fcffff → classe = text-text ou text-(--color-text)
text-white = #ffffff ≠ #fcffff. Viola "No Magic Numbers".[M-06] .text-small — Classe tipográfica completamente ausente
Arquivo: src/app/globals.css
SSOT §1.2: .text-small → 0.875rem / font-weight: 400 / line-height: 1.4
O scale pula de .text-body direto para .text-micro. Qualquer componente que use .text-small renderiza sem estilo.[M-07] Z-Index tokens com valores e semântica incorretos
SSOT: Primary Content=z-20 | Canvas/R3F=z-30 | Header=z-55
Código: --z-layer-content:10 | --z-layer-3d:20 | --z-layer-header:40
Risco de z-fighting entre Header e Canvas 3D em scroll.


:large_orange_circle: [MODERADO-10] Z-Index tokens incorretos — risco real na /sobre
AboutBeliefs.tsx usa z-40 e z-50 para camadas 3D.
SSOT §1.3: Canvas/R3F FX = z-30 | Final Overlays = z-50
Ponto crítico: o GhostScene está em z-50 (sobreposição de modais) e o BeliefFinalSection em z-40. A ANALISE-GLOBAL-DA-SOBRE.md já documenta que o manifesto final fica ABAIXO do Ghost no stacking atual.
Causa raiz: Camadas definidas sem cruzar a tabela de Z-Index do SSOT.:large_yellow_circle: [MENOR-11] Motion violations menores
Envio completo nos próximos itens. Aguarde.


:page_facing_up: Análise /sobre iniciada. Desvios críticos encontrados em AboutHero, error.tsx, AboutMethod e AboutBeliefs. Detalhes abaixo.

CRÍTICO-01: AboutHero.tsx — 3 classes CSS inexistentestext-text-light — não existe em @theme. Nenhuma cor aplicada ao título.
type-h3 — não é uma classe Ghost nem Tailwind. Substituir por .text-h3
font-h1 — não é classe tipográfica, é font-family sem definição. Substituir por .text-h1


CRÍTICO-02: error.tsx (sobre) — Motion proibido + classe inválida
hover:scale-105 active:scale-95 viola SSOT §2.3: scale é FORBIDDEN em UI.
text-accentRed → token correto é text-redAccent.


CRÍTICO-03: AboutMethod.tsx — 3 falhas simultaneas
type-h3 inexistente (mesma falha do Hero).
bg-[rgba(26,26,46,...)] magic number — usar bg-neutral/85.
Parallax ['-10%','10%'] = 20% shift. SSOT §2.4 limita a 15%. Corrigir para ['-7%','7%'].


CRÍTICO-04: AboutBeliefs.tsx — Z-Index errado nas camadas
Manifesto Final: z-40 (deveria ser z-20 - Primary Content).
Canvas 3D: z-50 (deveria ser z-30 - Canvas/R3F FX).
Resultado: manifesto fica ABAIXO do Ghost 3D. Ja documentado em ANALISE-GLOBAL-DA-SOBRE.md.

MODERADOS — /sobre
M1: text-white em 9 arquivos (page, loading, Hero, WhatIDo, Method, Closing, Skeleton). Token correto: text-text.
M2: opacity-92 em AboutClosing — classe Tailwind invalida (steps de 5). Usar opacity-90.
M3: font-display em 3 componentes — --font-family-display nao definido no @theme. Risco de colisao com --font-display (font-size). Usar font-sans text-display.
M4: Magic numbers tipograficos text-[14px], text-[16px], text-[20px] em AboutMethod. Usar .text-small, .text-body, .text-h3.



