# 03-GALLERY

## 0. Estrutura de arquivos da sessão
- `src/components/portfolio/ProjectsGallery.tsx`
- `src/components/portfolio/ProjectsGallery.module.css`
- `src/hooks/useLERPScroll.ts`
- `src/hooks/useMotionGate.ts`
- `src/components/layout/Container.tsx`

## 1. Objetivo da sessão
Entregar galeria editorial filtrável com leitura por categorias e ritmo visual premium, mantendo fluidez no scroll.

## 2. Estrutura de conteúdo
- `section#portfolio-gallery`
- barra sticky de filtros
- grid de cards com padrão de tamanho
- estado vazio por categoria

## 3. Identidade visual
- foco em grid denso, contraste alto, filtros discretos.
- sublinhado animado do filtro ativo com easing Ghost.

## 4. Interatividade e motion
- Framer Motion em filtro ativo e entrada dos cards.
- LERP scroll ativado apenas quando:
  - não mobile
  - motion permitido
  - mais de 6 itens
- Boa decisão para reduzir custo e distorções em listas curtas.

## 5. Responsividade
- mobile simplifica comportamento (sem LERP).
- sticky top ajustado por viewport.

## 6. Acessibilidade
- `h2` da seção e estado de foco visível nos cards.
- fallback textual quando não há projetos.

## 7. Considerações técnicas
- Pontos fortes:
  - gate de performance bem aplicado.
  - filtros claros e previsíveis.
- Riscos:
  - `position: fixed` no track exige testes constantes para evitar overlap com header/toolbar.

## 8. Inconformidades observadas
- Inconformidade baixa: revisar cobertura de navegação por teclado na mudança de filtro (manter foco contextual quando necessário).
