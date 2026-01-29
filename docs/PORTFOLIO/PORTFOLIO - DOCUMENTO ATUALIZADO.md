# 📄 PORTFOLIO — DOCUMENTO ATUALIZADO (CANÔNICO)
## Site: portfoliodanilo.com
## Página: PORTFOLIO (Showcase)
## Sistema: Ghost Design System
## Versão: 3.0 (Atualizado a partir do protótipo + ajustes)
## Fontes: “PORTFOLIO - PROTÓTIPO INTERATIVO.md” + “PORTFOLIO - AJUSTE.md” fileciteturn0file0 fileciteturn0file1

> Este documento consolida a página **PORTFOLIO** com foco em **hero com vídeo loop**, **galeria com Parallax Lerp**, **modal de projeto (Tipo A e B)**, motion editorial “silencioso” e regras do **Ghost System**.

---

# 0) Sistema Global (Ghost Design System) — Aplicado à página inteira

## 1. Objetivo da Página/Sessão
- [x] Definir tokens e regras consistentes (cor, tipografia, grid, motion) para manter coerência visual/UX em toda a página.
- [x] Garantir que a experiência seja “editorial, silenciosa e legível”, mesmo com vídeo/parallax/modal.
- [x] Servir como base para implementação em Next.js (App Router) + Tailwind + Framer Motion (+ Lenis, se aplicado).

## 2. Estrutura de Conteúdo
- [x] **Color tokens** (paleta Ghost) + usos.
- [x] **Tipografia** (TT Norms Pro) + escalas responsivas via `clamp()`.
- [x] **Grid System** (4/8/12 colunas) + gutters/margens + max-width.
- [x] **Motion Principles** (easing Ghost, reveal, stagger, “nada flutuando” em idle).
- [x] **Regras de camada (z-index)** para não bloquear interatividade (Canvas/Glass/Conteúdo/Nav/Modal).

## 3. Identidade Visual
- [x] **Cores (tokens e valores)**
  - `bluePrimary` `#0048ff` (CTAs, links, interações)
  - `blueAccent` `#4fe6ff` (destaques/brilhos/atmosfera)
  - `purpleDetails` `#8705f2` (detalhes pontuais)
  - `pinkDetails` `#f501d3` (detalhes pontuais)
  - `background` `#040013` (fundo escuro principal)
  - `backgroundLight` `#f0f0f0` (seções claras, ex.: form)
  - `text` `#fcffff` (texto em fundo escuro)
  - `textInverse` `#0e0e0e` (texto em fundo claro)
  - `textEmphasis` `#2E85F2` (ênfase no meio do texto)
  - `textHighlight` `#4fe6ff` (destaques curtos)
  - `textSecondary` `#a1a3a3` (metadados/infos secundárias)
  - `neutral` `#0b0d3a` (fundos/gradientes sutis)
  - `neutralLight` `#F5F5F5` (fundos secundários) fileciteturn0file1
- [x] **Tipografia**
  - Fonte primária: **TT Norms Pro** (self-hosted) + fallback `ui-sans-serif, system-ui`
  - Escalas responsivas: `display`, `h1`, `h2`, `h3`, `body`, `small`, `micro` (com `clamp()`) fileciteturn0file1
- [x] **Ícones/Gráficos**
  - Ícones lineares (telefone, email, site, social)
  - Setas/chevrons em CTAs
  - Elementos “ghost” como detalhes visuais (sem poluir)

## 4. Interatividade & Animações
- [x] **Engine:** Framer Motion (e, se usado, Lenis para suavização de scroll).
- [x] **Easing Ghost:** `cubic-bezier(0.22, 1, 0.36, 1)` fileciteturn0file1
- [x] **Reveal padrão (Fade Up):** `opacity 0→1` + `y 32→0`, `whileInView`, `once: true`.
- [x] **Stagger editorial** para listas/grids (sem exagero).
- [x] **Idle sem animação contínua** (nada pulsando/flutuando).

## 5. Responsividade
- [x] **Grid**: 4 colunas (mobile), 8 (tablet), 12 (desktop).
- [x] **Container**: centralizado, `max-width` até ~1680px e padding responsivo (px-6 → px-24). fileciteturn0file1

## 6. Acessibilidade & SEO
- [x] Respeitar `prefers-reduced-motion` (reduzir/desativar parallax, timelines, etc.). fileciteturn0file1
- [x] Contraste (WCAG AA) entre texto/overlay/vídeo.
- [x] Semântica (`header/nav/main/section/footer`) + hierarquia correta de headings.

## 7. Integrações ou Recursos Especiais
- [x] Possível uso de **Lenis** (scroll smoothing) mantendo cuidado para **não hijack** a navegação.
- [x] Portal para modal (React Portal) e body lock quando aberto.

## 8. Considerações Técnicas
- [x] Z-index layering: `z-0` Canvas, `z-10` glass, `z-20` conteúdo, `z-50` nav, `z-100` modais. fileciteturn0file1
- [x] “Proibições absolutas” (ver sessão 8) como regra de QA para a página.

---

# 1) Header / Nav

## 1. Objetivo da Página/Sessão
- [x] Dar orientação e acesso rápido às páginas principais.
- [x] Reforçar marca (logo) e manter CTA/rotas visíveis.
- [x] Permitir navegação acessível (teclado e mobile).

## 2. Estrutura de Conteúdo
- [ ] **Título principal (headline)**: N/A (header não tem headline)
- [x] **Elementos visuais**: Logo + links
- [ ] **Chamada para ação (CTA)**: opcional (ex.: “contato”)
- [x] **Layout desejado**: barra superior, `sticky`/`fixed` (se já usado no site)

## 3. Identidade Visual
- [x] Fundo escuro (token `background`) com texto `text`.
- [x] Tipografia: labels em `small`/`micro`.
- [x] Ícones: menu hamburger no mobile (se aplicável).

## 4. Interatividade & Animações
- [x] Hover/focus-visible claro nos links.
- [ ] Animação de entrada (opcional e discreta).

## 5. Responsividade
- [x] Mobile: menu colapsa (drawer/overlay).
- [x] Tablet/Desktop: links visíveis em linha.

## 6. Acessibilidade & SEO
- [x] `nav` semântico + `aria-label` (ex.: “Navegação principal”).
- [x] Estados `focus-visible` evidentes.
- [x] Área de toque confortável no mobile.

## 7. Integrações ou Recursos Especiais
- [ ] Indicação de rota ativa (opcional).
- [ ] Ancoragem para seções (opcional).

## 8. Considerações Técnicas
- [x] Preferir componente server (se estático) + client apenas se houver comportamento (menu animado).
- [x] Evitar bloquear scroll/gestos em mobile indevidamente.

---

# 2) Hero Section — Vídeo em Loop + Headline + CTA

## 1. Objetivo da Página/Sessão
- [x] Criar impacto inicial sem ser invasivo.
- [x] Comunicar “portfólio showcase” e conduzir ao CTA **“vamos trabalhar juntos”**.
- [x] Abrir a narrativa para exploração do grid (scroll). fileciteturn0file1

## 2. Estrutura de Conteúdo
- [x] **Título principal (headline)**: `portfólio showcase` (com “portfólio” em azul)
- [x] **Subtítulo/descrição**: opcional (linha curta de contexto)
- [x] **Elementos visuais**: vídeo background em loop (desktop + mobile)
  - Desktop: `video-heroPort.mp4`
  - Mobile: `video-heroPort-mobile.mp4` fileciteturn0file1
- [x] **CTA**: botão “vamos trabalhar juntos” (seta/chevron)
- [x] **Layout desejado**
  - Hero fullscreen (`h-screen`), vídeo `object-cover`
  - Overlay gradient para legibilidade
  - **Texto + CTA alinhados na mesma linha visual** e posicionados centralizados na parte inferior do hero (conforme ajuste). fileciteturn0file1

## 3. Identidade Visual
- [x] Fundo: vídeo + overlay (preto com opacidades).
- [x] “portfólio” em `bluePrimary` / ou tom equivalente (ex.: `text-blue-400` no Tailwind do protótipo).
- [x] Tipografia: `h1` (Bold) + CTA (sem exagero). fileciteturn0file1

## 4. Interatividade & Animações
- [x] CTA com hover discreto (leve scale/realce) e foco visível.
- [x] Sem animações contínuas chamativas no hero (apenas presença).
- [x] Respeitar `prefers-reduced-motion` (sem efeitos agressivos).

## 5. Responsividade
- [x] Mobile: usar vídeo específico (mais leve) + manter legibilidade.
- [x] Ajustar tamanho da headline via `clamp()`/tokens.
- [x] CTA com padding/tamanho de toque adequado.

## 6. Acessibilidade & SEO
- [x] `h1` único da página no hero.
- [x] Overlay garante contraste do texto em qualquer frame.
- [x] Vídeo: `muted`, `playsInline`, `loop`, `autoPlay` (autoplay confiável em mobile). fileciteturn0file1

## 7. Integrações ou Recursos Especiais
- [ ] Fallback de imagem estática para conexões lentas/sem autoplay (recomendado).
- [ ] Poster do vídeo (recomendado).

## 8. Considerações Técnicas
- [x] Otimizar peso do vídeo (regra: **< 10MB** no protótipo).
- [x] Carregar vídeo mobile/desktop condicionalmente (media queries ou lógica runtime).
- [x] Evitar CLS: reservar layout e usar container consistente.

---

# 3) Projects Gallery — Grid com Parallax Lerp (Scroll suave)

## 1. Objetivo da Página/Sessão
- [x] Exibir projetos de forma “galeria editorial” com alto impacto visual.
- [x] Incentivar exploração por scroll e clique em cards.
- [x] Manter performance fluida (alvo 60fps). fileciteturn0file1

## 2. Estrutura de Conteúdo
- [ ] **Título principal (headline)**: opcional (pode ser omitido para manter o ritmo visual)
- [x] **Elementos visuais**: cards com thumbnails (imagens/mockups)
- [ ] **CTA**: “veja mais” (opcional — pode ser após a galeria)
- [x] **Texto de apoio**: overlay no card (título + cliente + ano + tags)
- [x] **Layout desejado**
  - Track fixo (`position: fixed`) com grid responsivo (3 → 2 → 1 colunas)
  - Container com altura dinâmica para gerar scroll natural
  - Parallax interno no wrapper de imagem (altura ~135% do card) fileciteturn0file1

## 3. Identidade Visual
- [x] Cards com cantos arredondados, overlay com gradiente escuro e tipografia limpa.
- [x] Tokens: fundo escuro, textos claros, metadata em `textSecondary`.

## 4. Interatividade & Animações
- [x] **Parallax Lerp** (requestAnimationFrame + lerp)
  - `easing ~ 0.05` para suavidade
  - Transform aplicado no track (translateY)
  - Parallax interno baseado no `getBoundingClientRect` de cada card fileciteturn0file1
- [x] Hover no card: elevação leve + zoom sutil na imagem + overlay aparece.
- [x] Touch: substituir hover por feedback em tap/focus.

## 5. Responsividade
- [x] Desktop: 3 colunas (grid), cards ~400px altura.
- [x] Tablet: 2 colunas, cards ~350px.
- [x] Mobile: 1 coluna, cards ~300px. fileciteturn0file1

## 6. Acessibilidade & SEO
- [x] Cards clicáveis devem ser `<a>`/`button` semântico (não `div onClick`).
- [x] `alt` descritivo em imagens.
- [x] `prefers-reduced-motion`: desativar lerp/parallax (scroll normal).

## 7. Integrações ou Recursos Especiais
- [ ] Filtros por categoria (chips/tabs) — opcional (recomendado no protótipo antigo). fileciteturn0file0
- [x] Lazy-loading + skeletons (recomendado).

## 8. Considerações Técnicas
- [x] Cancelar RAF quando não necessário (evitar consumo constante).
- [x] `will-change` somente em elementos animados (track + wrappers), remover quando possível.
- [x] Não fazer “scroll hijacking”: manter sensação de scroll nativa. fileciteturn0file1

---

# 4) Project Card — Card do grid (overlay + meta + tags)

## 1. Objetivo da Página/Sessão
- [x] Ser unidade clicável que resume um projeto com impacto visual e contexto mínimo.
- [x] Abrir modal/página interna do projeto (Tipo A ou B). fileciteturn0file1

## 2. Estrutura de Conteúdo
- [x] **Título**: nome do projeto
- [x] **Subtítulo/descrição**: cliente • ano (e opcional: categoria)
- [x] **Elementos visuais**: thumbnail
- [x] **CTA implícito**: o próprio card (clicável)
- [x] **Texto de apoio**: tags (chips)
- [x] **Layout desejado**
  - Wrapper de imagem maior que o card (para parallax interno)
  - Overlay gradiente com conteúdo ancorado no bottom fileciteturn0file1

## 3. Identidade Visual
- [x] Overlay com gradiente (top → transparente, bottom → mais opaco).
- [x] Tipografia: `h3` para título; `small/micro` para meta e tags.

## 4. Interatividade & Animações
- [x] Hover: `translateY(-4px)` + sombra suave (sem exagero).
- [x] Overlay `opacity 0→1` no hover.
- [x] Foco teclado equivalente ao hover (usar `:focus-visible`).

## 5. Responsividade
- [x] Card ocupa colunas disponíveis do grid (1/2/3 col).
- [x] Metas/tags quebram linha com boa legibilidade.

## 6. Acessibilidade & SEO
- [x] Se for link: `<a>` com `href` e texto acessível.
- [x] Se abrir modal: usar `<button>` com `aria-haspopup="dialog"` e label adequado.
- [x] `alt`: “Projeto X — Cliente Y” (evitar genérico).

## 7. Integrações ou Recursos Especiais
- [ ] Tracking de eventos (clique em card / clique em CTA) — opcional.
- [ ] Prefetch de dados do projeto para abertura rápida — opcional.

## 8. Considerações Técnicas
- [x] Evitar reflows: usar transform para animações.
- [x] Compatível com renderização server (dados) + animações client.

---

# 5) Portfolio Modal / Página Interna de Projeto — Tipos A e B

## 1. Objetivo da Página/Sessão
- [x] Expandir o projeto sem “tirar o usuário do contexto” (modal como extensão natural).
- [x] Manter leitura confortável e orientar a atenção com timeline editorial.
- [x] Suportar dois formatos: **Tipo A (Zoom Viewer)** e **Tipo B (Projeto completo)**. fileciteturn0file1

## 2. Estrutura de Conteúdo
- [x] **Título principal**: nome do projeto
- [x] **Subtítulo/meta**: cliente • ano • tags
- [x] **Elementos visuais**
  - Tipo A: mídia principal (foco observação)
  - Tipo B: mídia hero + descrição + galeria/entregáveis/links fileciteturn0file1
- [x] **CTA**: botão fechar (X) sempre visível; links do projeto (se houver)
- [x] **Layout desejado**
  - Backdrop + container centralizado
  - `max-height: 90vh` + scroll interno
  - Overscroll contain (evitar “arrastar” página do fundo)

## 3. Identidade Visual
- [x] Backdrop escuro com blur leve (sem excesso).
- [x] Container claro (white ou backgroundLight) com texto `textInverse`.

## 4. Interatividade & Animações
- [x] **Timeline canônica (entrada)** fileciteturn0file1
  - 0–180ms: backdrop (linear)
  - 120–380ms: container (ease Ghost)
  - 380–520ms: pausa consciente
  - 520–760ms: mídia principal (opacity)
  - 760–960ms: título (opacity + y)
  - 960–1120ms: meta (opacity + y)
  - 1120–1500ms: conteúdo secundário (stagger ~80ms)
- [x] Fechamento rápido e discreto (sem bounce).
- [x] Interações
  - ESC fecha
  - Clique no backdrop fecha
  - Botão [X] fecha
  - Foco vai para o modal ao abrir e retorna ao card ao fechar fileciteturn0file1

## 5. Responsividade
- [x] Mobile: container quase full width (`~95vw`), padding menor, raio reduzido.
- [x] Desktop: `max-width ~1200px`, padding maior. fileciteturn0file1

## 6. Acessibilidade & SEO
- [x] `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`.
- [x] Focus management + trap de foco.
- [x] Botão fechar com `aria-label` claro.
- [x] `prefers-reduced-motion`: reduzir/zerar animações. fileciteturn0file1

## 7. Integrações ou Recursos Especiais
- [x] Portal (render no `document.body`) para evitar problemas de stacking/context.
- [ ] Deep link (abrir projeto via URL) — opcional (melhora SEO/compartilhamento).

## 8. Considerações Técnicas
- [x] Body lock (bloquear scroll do fundo enquanto modal está aberto).
- [x] Pausar parallax enquanto modal está aberto.
- [x] Evitar animação por scroll interno no modal (regra). fileciteturn0file1

---

# 6) “Veja mais” — CTA pós-galeria (opcional)

## 1. Objetivo da Página/Sessão
- [ ] Expandir lista de projetos sem sobrecarregar o primeiro load.
- [ ] Dar próxima ação clara após navegar a galeria.

## 2. Estrutura de Conteúdo
- [x] **CTA**: botão “veja mais”
- [ ] **Texto de apoio**: “Carregar mais projetos”
- [ ] **Layout desejado**: centralizado, espaçamento confortável após o grid fileciteturn0file0

## 3. Identidade Visual
- [x] Botão com `bluePrimary` e hover discreto.

## 4. Interatividade & Animações
- [x] Hover/focus-visible evidente.
- [ ] Loading state + skeletons (recomendado).

## 5. Responsividade
- [x] Botão full width no mobile (ou largura confortável).

## 6. Acessibilidade & SEO
- [x] `aria-live="polite"` se carregar conteúdo dinamicamente. fileciteturn0file0

## 7. Integrações ou Recursos Especiais
- [ ] Paginação/infinite scroll (evitar auto-scroll intrusivo).
- [ ] Filtros por tags/categoria (se implementados).

## 8. Considerações Técnicas
- [ ] Garantir que o load incremental não quebre o parallax/altura do container.

---

# 7) Clients Brands — Faixa de marcas

## 1. Objetivo da Página/Sessão
- [x] Prova social rápida (“marcas com as quais já trabalhei”).
- [x] Aumentar confiança antes do contato. fileciteturn0file0

## 2. Estrutura de Conteúdo
- [x] **Título**: “marcas com as quais já trabalhei” (h2)
- [x] **Elementos visuais**: logos em linha/grid
- [ ] **CTA**: opcional (ex.: “ver cases”)
- [x] **Layout desejado**: faixa horizontal ou grid responsivo; pode ter fundo alternado. fileciteturn0file0

## 3. Identidade Visual
- [x] Pode usar `bluePrimary` como banda/destaque (como no protótipo base) ou versão mais neutra.
- [x] Logos com tratamento monocromático/alto contraste.

## 4. Interatividade & Animações
- [ ] Reveal discreto ao entrar em viewport.
- [ ] Hover opcional (ex.: leve brighten).

## 5. Responsividade
- [x] Mobile: logos em grid 2–3 colunas.
- [x] Desktop: linha/grid mais ampla.

## 6. Acessibilidade & SEO
- [x] Logos com `alt="Marca X"`; se decorativo, usar `aria-hidden` e texto alternativo na seção.
- [x] Manter contraste se a banda for azul.

## 7. Integrações ou Recursos Especiais
- [ ] Carrossel manual (somente se necessário; evitar autoplay).

## 8. Considerações Técnicas
- [x] Imagens otimizadas e com dimensões definidas para evitar CLS.

---

# 8) Contact — Bloco de contato + Formulário

## 1. Objetivo da Página/Sessão
- [x] Converter visitantes em leads (contato/orçamento).
- [x] Manter caminho curto após prova social/portfólio. fileciteturn0file0

## 2. Estrutura de Conteúdo
- [x] **Título**: “contato” (h2) + microcopy (“Tem uma pergunta ou quer trabalhar junto?”)
- [x] **Elementos visuais**: ícones (telefone/email/site/social)
- [x] **CTA**: “Enviar mensagem”
- [x] **Campos do form (recomendado)**
  - Nome
  - Email
  - Telefone (opcional)
  - Mensagem fileciteturn0file0
- [x] **Layout desejado**: 2 colunas (info + form) no desktop; 1 coluna no mobile.

## 3. Identidade Visual
- [x] Pode ser seção clara (`backgroundLight`) para contraste com o resto da página.
- [x] Tipografia: `body` para texto, `small` para labels, `micro` para hints.

## 4. Interatividade & Animações
- [x] Estados de input (focus, error, success) claros.
- [ ] Reveal discreto da seção ao entrar em viewport.

## 5. Responsividade
- [x] Mobile: empilhar (info acima do form), inputs full width.
- [x] Desktop: duas colunas com bom espaçamento.

## 6. Acessibilidade & SEO
- [x] Labels explícitos (`<label for>`), mensagens de erro acessíveis.
- [x] Navegação por teclado completa.
- [x] Contraste adequado em placeholders/labels.
- [x] Texto de ajuda não deve ser a única forma de instrução.

## 7. Integrações ou Recursos Especiais
- [x] Validação (Zod) + envio via `/api/contact` (email/webhook).
- [x] Proteções: rate limit + honeypot (reCAPTCHA opcional). fileciteturn0file0

## 8. Considerações Técnicas
- [x] Tratar estados: loading/success/error.
- [x] Não perder dados do usuário em erro (manter inputs).
- [x] Logs/telemetria opcional para submit.

---

# 9) Footer

## 1. Objetivo da Página/Sessão
- [x] Encerrar navegação com consistência e acessos úteis.
- [x] Reforçar marca e links essenciais.

## 2. Estrutura de Conteúdo
- [x] Logo/assinatura
- [x] Links (social, políticas, navegação)
- [ ] Mini-CTA (opcional)

## 3. Identidade Visual
- [x] Fundo escuro (`background`) e texto `text`/`textSecondary`.

## 4. Interatividade & Animações
- [ ] Reveal simples (opcional).

## 5. Responsividade
- [x] Mobile: empilhar blocos; espaçamento grande para toque.

## 6. Acessibilidade & SEO
- [x] Links com foco visível.
- [x] Semântica `footer`.

## 7. Integrações ou Recursos Especiais
- [ ] Newsletter (não previsto; evitar adicionar sem necessidade).

## 8. Considerações Técnicas
- [x] Componente estático (server) por padrão.

---

# 10) Regras de Qualidade (QA) — Proibições, Performance e Checklist

## 1. Objetivo da Página/Sessão
- [x] Garantir consistência do Ghost System e evitar “efeito pelo efeito”.
- [x] Proteger performance e acessibilidade em toda a página. fileciteturn0file1

## 2. Estrutura de Conteúdo
- [x] Lista de **Proibições absolutas**
- [x] Targets de performance
- [x] Checklist de testes (funcionalidade, performance, acessibilidade, responsivo)

## 3. Identidade Visual
- [x] “Silencioso e editorial”: foco no conteúdo, não no efeito.

## 4. Interatividade & Animações
- [x] **PROIBIÇÕES ABSOLUTAS** (resumo) fileciteturn0file1
  - Grid: sem animações agressivas; sem carrossel autoplay; sem parallax exagerado; sem scroll hijacking.
  - Hero: sem som; sem vídeos pesados; com fallback recomendado.
  - Modal: sem parallax dentro; sem scroll-anim dentro; sem spring/bounce; sem “entrada de tudo junto”.

## 5. Responsividade
- [x] Testar 320px → widescreen, e rotação de tela (mobile/tablet). fileciteturn0file1

## 6. Acessibilidade & SEO
- [x] Testar teclado, screen reader, foco, reduced motion, contraste.
- [x] SEO técnico (metadata, OG, imagens otimizadas) conforme padrão do site. fileciteturn0file0

## 7. Integrações ou Recursos Especiais
- [ ] Monitor de performance (FPS/RAF) só para dev (não em produção). fileciteturn0file1

## 8. Considerações Técnicas
- [x] **Targets de performance** fileciteturn0file1
  - FCP < 1.5s
  - LCP < 2.5s
  - TTI < 3.5s
  - CLS < 0.1
  - Scroll 60fps
- [x] Testar modal abrir/fechar repetidamente (evitar memory leaks).
- [x] Garantir que RAF e listeners são limpos no unmount.

---

## ✅ Resumo da Macroestrutura da Página (ordem final)
1. Header / Nav  
2. Hero (Vídeo loop + headline + CTA)  
3. Projects Gallery (Parallax Lerp)  
4. “Veja mais” (opcional)  
5. Clients Brands  
6. Contact  
7. Footer  

---
