# Auditoria da página `/sobre` — Apple Design, UX, acessibilidade e implementação

**Data:** 22/09/2026  
**Página:** https://portfoliodanilo.com/sobre  
**Repositório auditado:** `danilonovaisv/PORTFOLIO-DANILO-FINAL`  
**Commit:** `7c5ae73212705a6e62dec923568ffcbf81e1ec02`  
**Modo:** auditoria combinada de UX, acessibilidade e código, usando os princípios Purpose, Agency, Responsibility, Familiarity, Flexibility, Simplicity, Craft e Delight.

## Veredito executivo

A direção visual é coerente, autoral e reconhecível, mas a página ainda não é confiável o suficiente para cumprir sua função principal: apresentar Danilo como Diretor de Criação e converter recrutadores/clientes em contato.

O bloqueador é técnico: em um navegador sem contexto WebGL, `/sobre` cai integralmente no error boundary e exibe `THREE.WebGLRenderer: Error creating WebGL context.`. O efeito decorativo do manifesto derruba todo o conteúdo, inclusive provas, currículo e contato. Isso transforma uma escolha estética em ponto único de falha.

**Saúde geral atual: 52/100 — não aprovar para divulgação intensiva antes do P0.**

| Pilar Apple Design | Nota | Diagnóstico |
|---|---:|---|
| Purpose | 7/10 | Há uma ideia autoral clara, mas a prova de liderança chega tarde e é menos específica do que o discurso. |
| Agency | 5/10 | CTAs existem, porém o manifesto troca sozinho, sem pausa, e seus controles são quase intocáveis. |
| Responsibility | 2/10 | Um shader decorativo pode derrubar toda a página; a mensagem expõe erro técnico bruto. |
| Familiarity | 7/10 | Navegação e estrutura macro são previsvisíveis; o carrossel usa semântica de tabs sem implementar o comportamento esperado. |
| Flexibility | 3/10 | Há layouts responsivos e `prefers-reduced-motion`, mas WebGL e motion não degradam de modo seguro. |
| Simplicity | 6/10 | A narrativa é fluida, porém longa, abstrata e duplicada no HTML para breakpoints diferentes. |
| Craft | 6/10 | Boa tipografia, grid e coerência de marca; faltam robustez, contraste e consistência de motion. |
| Delight | 5/10 | O impacto visual existe quando tudo funciona; no fallback, converte-se em frustração. |

## Escopo e objetivo do usuário

O visitante deve, em menos de 30 segundos:

1. Entender quem é Danilo e qual cargo ocupa.
2. Perceber liderança, escala, método e diferenciação em IA.
3. Confirmar credibilidade por marcas, resultados e cases.
4. Acessar portfólio/CV ou iniciar contato sem fricção.

Meta de acessibilidade recomendada: **WCAG 2.2 AA**, com degradação funcional em navegadores sem WebGL, redução de movimento e navegação completa por teclado.

## Evidência da jornada

### Etapa 1 — abrir `/sobre`: CRÍTICA

No navegador de auditoria, o carregamento termina no error boundary com a mensagem `THREE.WebGLRenderer: Error creating WebGL context.`. O header permanece disponível, mas todo o conteúdo da página é substituído por erro e botão de nova tentativa.

O crawler público consegue ler o HTML estático e confirma que o conteúdo existe, mas isso não compensa a quebra após hidratação. O problema afeta qualquer contexto em que WebGL esteja desabilitado, indisponível ou falhe ao criar o renderer.

### Etapas 2–7 — hero, origem, serviços, método, manifesto, prova e conversão: BLOQUEADAS NO NAVEGADOR AUDITADO

Essas etapas não puderam ser verificadas visualmente na execução ao vivo porque o erro ocorre antes da jornada. Elas foram auditadas por HTML público, build local e inspeção do código, sem alegação de conformidade visual completa.

## Pontos fortes confirmados

- Identidade Ghost consistente: `#040013`, Ghost Blue, ciano e tipografia Manrope formam uma assinatura reconhecível.
- Hierarquia macro clara: origem → atuação → método → manifesto → prova → conversão.
- Skip link, landmarks, headings de seção, `aria-label` em navegação e foco visível aparecem no código.
- Vídeos do hero e método deixam de tocar quando `prefers-reduced-motion` está ativo.
- `ResponsiveVideo` usa `<source media>` e pausa vídeos fora da viewport com `IntersectionObserver`.
- Grid e tipografia são tokenizados em `src/app/globals.css`.
- O repositório passou em TypeScript estrito, lint do escopo auditado e build de produção local.

## Achados priorizados

### P0 — corrigir antes de promover o portfólio

#### 1. WebGL decorativo derruba a página inteira

**Impacto:** perda total da jornada, SEO comportamental, conversão e confiança.  
**Princípios afetados:** Responsibility, Flexibility, Simplicity, Craft.  
**Evidência:**

- `src/components/ui/shader-lines.tsx:88–98` instancia `new THREE.WebGLRenderer()` sem checagem ou `try/catch`.
- `src/components/sobre/sections/ManifestoScrollSection.tsx:174–178` monta o shader incondicionalmente.
- `src/app/sobre/error.tsx:11–22` substitui toda a rota e exibe `error.message` ao visitante.
- O projeto já possui `useWebGLSupport` em `src/hooks/useWebGLSupport.ts`, mas ele não é usado pelo shader.

**Correção:** criar um boundary local para `ShaderAnimation`; checar suporte antes de importar/montar Three.js; renderizar `WhatMovesMeBackground` como fallback estático; tratar `webglcontextlost`; nunca propagar falha visual ao boundary da rota.

**Critério de aceite:** com `HTMLCanvasElement.getContext()` retornando `null`, a página completa continua navegável, sem erro no console e sem texto técnico exposto.

#### 2. A suíte padrão dá falsa sensação de segurança

**Impacto:** a regressão pode chegar à produção mesmo com `pnpm test` verde.  
**Evidência:**

- `package.json` define `test` como lint + typecheck + Jest, sem Playwright.
- `test/e2e/about-beliefs.spec.ts:123–170` possui exatamente um teste de não quebra quando WebGL falha.
- A produção contradiz esse contrato.
- Nesta auditoria, o E2E local não pôde iniciar porque o binário do navegador Playwright não estava instalado; isso também deveria falhar cedo no CI/setup.

**Correção:** criar `test:ci` com unitários + E2E crítico; instalar browsers no pipeline; executar o cenário sem WebGL em todo deploy; adicionar smoke test contra a URL publicada.

### P1 — alto impacto em acessibilidade, performance e conversão

#### 3. Reduced Motion não desativa o shader nem a rotação automática

**Impacto:** movimento contínuo permanece para quem explicitamente pediu redução; GPU continua ativa.  
**Evidência:** `ManifestoScrollSection.tsx:60–83` mantém `setInterval` mesmo com redução; `:174–175` sempre monta o shader; `shader-lines.tsx:110–116` mantém `requestAnimationFrame` contínuo.

**Correção:** não montar Three.js quando motion estiver reduzido; congelar o manifesto na primeira frase ou trocar apenas por ação explícita; pausar o loop quando a seção sair da viewport ou a aba ficar oculta.

#### 4. Controle do manifesto não atende toque nem padrão de tabs

**Impacto:** controles quase impossíveis de tocar e incompletos por teclado.  
**Evidência:** `ManifestoScrollSection.tsx:325–337` cria dots de `0.35rem` — aproximadamente **5,6 px** — muito abaixo do alvo recomendado de 44 × 44 px; usa `role="tab"` e roving `tabIndex`, mas não implementa setas, Home/End ou pausa.

**Correção:** área interativa mínima de 44 × 44 px com indicador visual interno; teclado completo; botão Pausar/Reproduzir; parar autoplay após interação; respeitar hover/focus/press instantâneo.

#### 5. `aria-live` muda automaticamente a cada 4,5 segundos

**Impacto:** anúncios recorrentes podem interromper ou distrair usuários de leitor de tela.  
**Evidência:** `ManifestoScrollSection.tsx:71–75` troca frases automaticamente; `:180–188` anuncia cada estado em uma região `aria-live="polite"`.

**Correção:** não anunciar autoplay; atualizar a região live apenas após ação do usuário, ou oferecer pausa visível e persistente.

#### 6. Contraste insuficiente em textos pequenos

**Impacto:** legibilidade reduzida em navegação, labels e eyebrow text.  
**Evidência calculada sobre `#040013`:**

- `#0048ff`: **3,32:1**, insuficiente para texto pequeno AA.
- `white/35`: aproximadamente **3,03:1**, insuficiente para texto pequeno.
- Exemplos: nav ativa (`DesktopFluidHeader.tsx:60–66`), eyebrow de prova (`AboutProof.tsx:46–47`) e label do manifesto (`ManifestoScrollSection.tsx:192–194`).

**Correção:** reservar Ghost Blue puro para texto grande/ícones; usar `#4FE6FF` ou um blue claro para texto pequeno; elevar `white/35` para pelo menos `white/55` no fundo atual.

#### 7. Peso excessivo para uma página institucional

**Impacto:** piora de LCP/INP, consumo de dados e bateria; maior chance de falha em mobile.  
**Evidência do build local:** 24 scripts, ~2,06 MB brutos e **~599 KB gzip**; HTML estático com ~156 KB. Os três vídeos desktop da rota somam aproximadamente **5,7 MB** antes de imagens e fontes.

**Correção:** lazy-load do manifesto/Three.js; `dynamic import` apenas perto da viewport; `preload="metadata"` ou `none` nos vídeos abaixo da dobra; poster real; remover DOM duplicado; definir budget de rota (por exemplo ≤250 KB gzip de JS inicial).

#### 8. DOM responsivo duplicado aumenta HTML e ruído de indexação

**Impacto:** crawler público lê hero, origem, serviços e logos repetidos; aumenta DOM e manutenção.  
**Evidência:** o HTML público repete blocos inteiros; no código, Hero, Origin e What I Do mantêm árvores separadas para desktop/mobile (`AboutHero.tsx:89–253`, `OriginComponents.tsx:51–128`, `AboutWhatIDo.tsx:83–206`).

**Correção:** uma única estrutura semântica por conteúdo; variar layout via CSS Grid, container queries e ordem visual. Duplicar somente mídia quando tecnicamente indispensável e ocultá-la semanticamente.

### P2 — posicionamento, clareza e confiança

#### 9. O hero é autoral, mas não prova senioridade rapidamente

**Impacto:** recrutadores entendem sensibilidade, porém não capturam escala de liderança em poucos segundos.  
**Evidência:** o hero prioriza “Você não vê tudo o que eu faço. Mas sente quando funciona.” e uma lista de disciplinas; os indicadores de liderança aparecem muito depois.

**Correção editorial:** manter a frase-manifesto, mas incluir uma linha objetiva: `Diretor de Criação · 12+ anos · times de até 35 pessoas · IA aplicada à operação criativa`.

#### 10. Métrica `+100 mil peças por ano` ameaça credibilidade

**Impacto:** número extraordinário sem contexto parece erro ou inflação e enfraquece as demais provas.  
**Evidência:** `src/config/content.ts:287–291`; o próprio comentário exige “REAL CONTENT ONLY”.

**Correção:** validar a fonte. Se o volume real for 280–350 peças/mês, usar `até 350 peças/mês` ou `3,3–4,2 mil peças/ano`; melhor ainda, combinar escala com resultado: redução de prazo, retenção, performance ou quantidade de contas lideradas.

#### 11. Alt texts de logos são genéricos

**Impacto:** leitor de tela ouve “Logo do cliente 1” sem saber a marca; perde-se prova de autoridade.  
**Evidência:** `src/config/content.ts:129–135` gera 12 alts numerados.

**Correção:** mapear nomes reais (`Logo da Nestlé`, `Logo da Ambev` etc.) ou usar `alt=""` se os nomes já estiverem presentes em texto adjacente.

#### 12. CTA promete “apresentação”, mas entrega o CV

**Impacto:** quebra de expectativa e redução de confiança.  
**Evidência:** `src/config/content.ts:310–314` usa label `baixar apresentação` com `/cv-danilo-novais.pdf`.

**Correção:** renomear para `baixar currículo` ou entregar um deck/casebook coerente com a promessa. Informar formato e tamanho, sem abrir nova aba desnecessariamente em download direto.

#### 13. Mensagem de erro expõe implementação

**Impacto:** parece produto inacabado e transfere complexidade técnica ao visitante.  
**Evidência:** `src/app/sobre/error.tsx:16` imprime `error.message` diretamente.

**Correção:** mensagem humana e curta; detalhes apenas em observabilidade. O usuário deve continuar vendo conteúdo estático, CTA para portfólio e contato.

## Plano de correção recomendado

### Sprint 0 — 1 dia

1. Isolar `ShaderAnimation` com detecção WebGL e fallback CSS.
2. Remover `error.message` da interface pública.
3. Criar teste E2E obrigatório sem WebGL e smoke test de produção.
4. Validar e corrigir `+100 mil peças por ano`.

### Sprint 1 — 2 a 3 dias

1. Corrigir reduced motion, pausa do shader e visibilidade da aba.
2. Refazer os dots com hit area 44 × 44, teclado e pausa.
3. Corrigir contrastes pequenos e focus/press states.
4. Trocar alt texts e alinhar CTA/CV.

### Sprint 2 — 3 a 5 dias

1. Unificar árvores desktop/mobile.
2. Lazy-load de Three.js e vídeos abaixo da dobra.
3. Definir budget de JS e mídia por rota.
4. Reescrever hero/prova com senioridade, escala, resultados e contexto verificável.

## Critérios de aceite para aprovação

- A rota permanece funcional com WebGL ausente, contexto perdido e GPU desabilitada.
- Nenhuma animação contínua ou autoplay permanece em `prefers-reduced-motion: reduce`.
- Todos os controles têm área mínima de 44 × 44 px e operam por teclado.
- Textos pequenos atingem contraste mínimo de 4,5:1.
- Não há anúncio automático recorrente em `aria-live` sem controle de pausa.
- `pnpm run test:ci` cobre lint, typecheck, unitários, E2E Chromium/WebKit/Firefox e smoke de produção.
- JS inicial da rota fica dentro do budget acordado; Three.js não entra no caminho crítico.
- Métricas e nomes de clientes são verificáveis e consistentes com currículo/cases.
- A primeira dobra comunica cargo, senioridade, escala e diferenciação em até 5 segundos.

## Validações executadas

- Página pública aberta e inspecionada em navegador: **falha WebGL reproduzida**.
- HTML público/crawler: **conteúdo e duplicações confirmados**.
- `pnpm run typecheck`: **passou**.
- ESLint no escopo `/sobre`: **passou**.
- Jest selecionado: **passou (2 testes)**.
- Build Next.js de produção: **passou**, com avisos de convenções depreciadas e fallback de Supabase por ausência de variáveis locais.
- Auditoria de dependências de produção: **1 vulnerabilidade moderada transitiva** em `uuid@9.0.1` dentro de dependências Firebase; não é o bloqueador da página, mas deve entrar no backlog de atualização.
- E2E Playwright local: **não executado** por ausência do binário Chromium no ambiente de auditoria.

## Limites da evidência

A falha WebGL bloqueou a navegação visual das etapas posteriores no navegador desta auditoria. Portanto, não foi possível confirmar por observação ao vivo reflow mobile, foco completo, contraste renderizado com mídia dinâmica, estabilidade de scroll, LCP/INP ou comportamento de vídeos ao longo da página. Os achados dessas áreas vêm de código, HTML estático e build, e devem ser confirmados após o P0 em navegadores reais e dispositivos iOS/Android.
