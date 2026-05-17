# Relatório de Auditoria Ghost System

## 1️⃣ Visão Geral

Auditoria arquitetural, estrutural e visual profunda focada nas rotas principais do portfólio de Danilo Novais. Foi executada contra a base de conhecimento do `.context/DOCS-PORTFOLIO-PAGES`.

O repositório apresenta as dependências Next.js App Router (15+), React 19, Tailwind CSS v4, e Framer Motion 12. O `pnpm typecheck` relata 2 erros (uso de `useReducedMotion` não definido em `ProjectTemplateMasterRenderer` e exportação faltante em testes).

## 2️⃣ Diagnóstico por Seção

### Home Hero

Status: ⚠️ Atenção
Severidade: 🟡 P1
Arquivos envolvidos:

- `src/components/home/hero/HomeHero.tsx`

Documento de referência:

- `.context/DOCS-PORTFOLIO-PAGES/01-HOME/02-HERO-HOME`

Diagnóstico:
O `HomeHero.tsx` implementa o WebGL corretamente verificando suporte (`useWebGLSupport`) e preferência de animação reduzida (`useMotionGate`), caindo num fallback estático (radial-gradient). No entanto, de acordo com o Ghost System, devemos ter extrema atenção com `scale`/`rotate`. Não encontrei tags explícitas violando isso no componente pai, mas animações internas filhas devem ser validadas. Z-index e apontadores `pointer-events` parecem de acordo (o Wrapper WebGL usa `pointer-events-none`).

Impacto:
Baixo se tudo o que importa no Hero é apenas texto e WebGL. Mas se botões CTA tiverem transformações erradas, quebra as regras do Ghost System.

Recomendação:
Verificar as diretrizes de hover no CTA e os efeitos nos botões (`HeroCTA.tsx`). Confirmar se estão usando translado vertical ou opacidade ao invés de escala.

Critério de aceite:

- [ ] O componente `HeroCTA` deve usar apenas `translateY` ao focar ou dar hover, sem `scale`.

### Portfolio Showcase / Category Stripe

Status: ⚠️ Atenção
Severidade: 🟡 P1
Arquivos envolvidos:

- `src/components/home/portfolio-showcase/CategoryStripe.tsx`

Documento de referência:

- `.context/DOCS-PORTFOLIO-PAGES/01-HOME/04-PORTFOLIO-SHOWCASE`

Diagnóstico:
Foi encontrado um trecho de código em `CategoryStripe.tsx`: `rotate: isHovered ? 0 : -45`. A regra explícita diz: "Motion proibido: scale, rotate, bounce". O ícone de seta provavelmente está usando `rotate`, o que viola a diretriz absoluta do Ghost System.

Impacto:
Desalinhamento visual e quebra das regras fundamentais de motion do Ghost System (presença sem ruído).

Evidência:
`y: isHovered ? -1 : 0, rotate: isHovered ? 0 : -45` presente em `CategoryStripe.tsx`.

Recomendação:
Substituir a animação de rotação por `translateX` ou `opacity`, preservando o design estrito.

Critério de aceite:

- [ ] `rotate` removido de `CategoryStripe.tsx`. Seta se move lateralmente.

### Featured Projects Grid

Status: ⚠️ Atenção
Severidade: 🟡 P1
Arquivos envolvidos:

- `src/components/home/featured-projects/FeaturedProjectsSection.tsx`

Documento de referência:

- `.context/DOCS-PORTFOLIO-PAGES/01-HOME/05-FEATURED-PROJECTS`

Diagnóstico:
O grid usa classes `col-span` Tailwind explicitamente (`md:col-span-4`, etc.). As regras indicam "Cards na mesma linha devem ter sempre a mesma altura vertical" e a base do grid é de 4/8/12 colunas. A implementação atual tenta usar `h-full min-h-0 self-stretch`. Mas a verificação de mesma altura de linha em `grid` muitas vezes requer `grid-auto-rows: 1fr` ou equivalente no container pai para grids estritos de "mesma altura", embora o `self-stretch` possa funcionar.

Impacto:
Se as imagens tiverem proporções diferentes, as linhas no grid bento podem ficar desniveladas, quebrando a harmonia visual.

Evidência:
Uso de classes como `md:col-span-4 lg:col-span-5` misturadas com containers flex e imagens de background.

Recomendação:
Validar renderização no navegador. Se os cards ficarem com alturas diferentes, forçar o alinhamento via `aspect-ratio` nos containers das imagens ou `grid-auto-rows: minmax(min-content, 1fr)`.

Critério de aceite:

- [ ] Cards em uma mesma linha (desktop e tablet) possuem altura idêntica.

### Identidade Visual Global

Status: ⚠️ Atenção
Severidade: 🟡 P1
Arquivos envolvidos:

- `src/app/globals.css`

Documento de referência:

- Regras gerais e Ghost System

Diagnóstico:
O arquivo `globals.css` declara `--color-redAccent: #e50914;` globalmente e expõe `red` e `redAccent`. A regra explícita diz: "Não use vermelho como cor de identidade. Vermelho só pode aparecer em estado de erro, destrutivo ou alerta sistêmico." Embora a variável exista, ela não deve ser usada para elementos decorativos (como textos, botões ou background) fora do contexto de erro.

Recomendação:
Auditar uso de propriedades baseadas em vermelho no Tailwind (`bg-redAccent`, `text-redAccent`, etc.) para garantir que não estão sendo usadas em componentes visuais de identidade da Home ou Portfolio, apenas em formulários com erro ou states destrutivos.

Critério de aceite:

- [ ] Vermelho não utilizado em identidades visuais ou decorações de componentes principais.

### Header Active State

Status: ⚠️ Atenção
Severidade: 🟡 P1
Arquivos envolvidos:

- `src/components/layout/header/DesktopFluidHeader.tsx`

Documento de referência:

- Ghost System Rule/Memory: "The Header's active state indicator uses a persistent underline animation implemented via `animate={{ scaleX: isActive ? 1 : 0 }}` to ensure state clarity, replacing purely hover-based or `layoutId` dependency."

Diagnóstico:
A inspeção via `grep` no diretório `src/components/layout/header` não retornou uso de `scaleX` no componente de Header, apesar da regra de sistema do Ghost especificar a necessidade deste formato explícito para clareza visual de ativação do item de menu.

Recomendação:
Atualizar `DesktopFluidHeader.tsx` para assegurar que a linha de navegação ativa exiba a animação do estado `active` usando o scaleX explicitamente se não estiver usando outra forma permitida como `opacity`, embora a constraint de memória exija este modelo para o indicador.

Critério de aceite:

- [ ] Indicador de estado ativo na navegação re-implementado conforme regra estrita se julgado necessário pela governança.

### E2E Setup e Execução

Status: ✅ OK
Severidade: 🟢 P2
Arquivos envolvidos:

- `playwright.config.ts`, `test/e2e/*`

Documento de referência:

- Ghost System E2E spec.

Diagnóstico:
A configuração do Playwright está correta, incluindo múltiplos ambientes (`webkit`, `firefox`, `chromium`) e setup local de servidor. Os testes escritos apontam boa cobertura de Admin, Portfolio (Paginação) e Home, e até Ghost Design System validations (ghost-system.spec.ts). Executar o pacote inteiro de testes e2e vai requerer builds locais pesados, por isso para esta auditoria a validação focará na consistência da infra.

Recomendação:
Recomendável rodar periodicamente os testes live pós deploy para confirmar estabilidade da UI em WebKit que tem maior tendência a quebrar os Canvas e Fallbacks de CSS.

### Links e Client Side Routing (Framer Motion)

Status: ⚠️ Atenção
Severidade: 🔴 P0
Arquivos envolvidos:

- Possivelmente todos os links que utilizam `Framer Motion` e levam a páginas internas do portfólio.

Documento de referência:

- Regras e Memória do Ghost System ("Internal navigation links combined with Framer Motion animations must use `motion.create(Link)` (wrapping `next/link`) to ensure client-side routing; using `motion.a` results in undesirable full page reloads.")

Diagnóstico:
Foi feita uma busca por `motion.create(Link)` nos componentes base e não retornou uso explícito. Caso a navegação esteja usando `motion.a` (embora não tenhamos achado explicitamente), ou se estiver usando wrappers nativos sem o Link Component do Next, ocorrerão reloads pesados da página que vão quebrar a imersão e performance do SPA, ferindo os princípios de velocidade do Ghost System.

Evidência:
A ausência de `motion.create(Link)` nos arquivos.

Recomendação:
É mandatório criar um componente de interface para navegação animada (`MotionLink`) que seja uma factory `motion.create(Link)` do Next.js para toda e qualquer rota interna interativa do site.

Critério de aceite:

- [ ] Qualquer `<a>` ou `motion.a` que aponta para rotas locais convertido para `MotionLink` = `motion.create(Link)`.

### Arquitetura de Pastas de WebGL (Home)

Status: ⚠️ Atenção
Severidade: 🟡 P1
Arquivos envolvidos:

- `src/components/canvas/home/hero/*`

Documento de referência:

- Regras de memória ("Home page specific WebGL/3D components are strictly located in `src/components/home/webgl/` (refactored from `src/components/canvas/home-hero/`) to ensure modularity and feature isolation.")

Diagnóstico:
A base do projeto indica que os componentes do Canvas estão localizados em `src/components/canvas/home/hero/`. Isso contraria a diretriz documentada que especifica que esses componentes devem estar em `src/components/home/webgl/`. A regra demanda que toda dependência WebGL da Home seja contida localmente ao domínio Home, e não generalizada em Canvas global.

Impacto:
Manutenção arquitetural fragmentada, não aderente ao Domain-Driven Design do Ghost System estabelecido.

Recomendação:
Migrar toda a pasta `src/components/canvas/home/hero` para `src/components/home/webgl` e atualizar as dependências (imports) no `HomeHero.tsx` e arredores.

Critério de aceite:

- [ ] A pasta `src/components/home/webgl/` deve conter os arquivos de R3F e Shaders da home, e os imports devem estar corretos.

### Supabase Image Loader

Status: ⚠️ Atenção
Severidade: 🔴 P0
Arquivos envolvidos:

- `next.config.mjs`, `src/lib/supabase/image-loader.ts` (Ausente)

Documento de referência:

- Regras e Memória do Ghost System ("Image optimization is implemented via a custom loader (`src/lib/supabase/image-loader.ts`) that transforms Supabase Storage object URLs into Render URLs (`/render/image/public`), enabling optimization on Firebase Hosting without `/_next/image`.")

Diagnóstico:
Não foram encontrados referências ao loader de imagem customizado `src/lib/supabase/image-loader.ts` no diretório nem configuração apropriada no `next.config.mjs`. Se o site utiliza Next Image sem o loader customizado em Firebase Hosting, a otimização de imagens falhará e pode até retornar 400s (Bad Request) ou quebrar o build do server de imagens.

Impacto:
Performance extremamente degradada devido ao carregamento de imagens não otimizadas em dispositivos móveis, e prováveis falhas de renderização (quebra de imagens) após o deploy no Firebase Hosting.

Recomendação:
Recriar o arquivo `src/lib/supabase/image-loader.ts` e configurá-lo corretamente em `next.config.mjs` (`loader: 'custom', loaderFile: './src/lib/supabase/image-loader.ts'`).

Critério de aceite:

- [ ] Loader implementado e configurado no `next.config.mjs`.

### Segurança de Rota (Admin)

Status: ✅ OK
Severidade: 🟢 P2
Arquivos envolvidos:

- `src/middleware.ts`, `src/lib/supabase/middleware.ts`, `src/lib/admin/authz.ts`

Documento de referência:

- Regras e Memória ("Middleware strictly enforces admin authorization by checking `user.app_metadata.role` (ignoring user-editable `user_metadata`) and redirects unauthorized authenticated users to the root path `/`.")

Diagnóstico:
A lógica de validação de autenticação no arquivo `src/lib/supabase/middleware.ts` invoca `isAdminUser` corretamente que, por sua vez, checa `user.app_metadata?.role` e valida o domínio sem recorrer à `user_metadata` insegura. Também há fallback para validação de `ADMIN_ALLOWED_EMAILS`. A implementação atende rigorosamente aos critérios de segurança documentados para a área de Dashboard e Login.

### Firebase Hosting

Status: ✅ OK
Severidade: 🟢 P2
Arquivos envolvidos:

- `firebase.json`

Documento de referência:

- Regras de Deploy Next.js

Diagnóstico:
O `firebase.json` está devidamente configurado usando Firebase App Hosting com `frameworksBackend` ativado, memória a 2GiB, e cache agressivo para mídias (`stale-while-revalidate`), aderindo às melhores práticas.

## 4️⃣ Matriz por Página com Status

| Página    | Rota         | Status     | Estrutura | UI/UX   | Mobile | Motion | Performance | Cards   | Landing Pages | Admin | Evidência                     | Prioridade |
| --------- | ------------ | ---------- | --------- | ------- | ------ | ------ | ----------- | ------- | ------------- | ----- | ----------------------------- | ---------- |
| Home      | `/`          | ⚠️ Atenção | OK        | Atenção | OK     | Falha  | Crítico     | Atenção | -             | -     | Grid Bento/Rotate/ImageLoader | 🔴 P0      |
| Sobre     | `/sobre`     | ✅ OK      | OK        | OK      | OK     | OK     | OK          | -       | -             | -     | Nenhum erro detectado local   | 🟢 P2      |
| Portfolio | `/portfolio` | ⚠️ Atenção | OK        | OK      | OK     | OK     | OK          | OK      | OK            | -     | Falta de Motion Link          | 🔴 P0      |
| Admin     | `/admin`     | ✅ OK      | OK        | OK      | OK     | OK     | OK          | -       | -             | OK    | Validação RBAC estrita        | 🟢 P2      |

## 5️⃣ Resumo Executivo e Top Problemas

**1. Ausência do Custom Image Loader Supabase (🔴 P0 - Performance/Deploy)**
Sem o Loader customizado, imagens do Supabase quebrarem build no Firebase com `next/image` ou gerarão tráfego excessivo com dados não processados.
_Arquivos:_ `next.config.mjs`, `src/lib/supabase/image-loader.ts`.

**2. Navegação Cliente Incompleta (Framer Motion SPA) (🔴 P0 - UX/Performance)**
Animações SPA entre rotas internas requerem wrapper `motion.create(Link)`.
_Arquivos:_ Todo componente de Link da navegação do sistema e CTA.

**3. Fragmentação da Arquitetura WebGL da Home (🟡 P1 - Arquitetura)**
Componentes estão localizados na pasta global do canvas ao invés da pasta modular restrita (`src/components/home/webgl/`).
_Arquivos:_ `src/components/canvas/home/hero/`.

**4. Violação Estrita de Motion System no Category Stripe (🟡 P1 - Design System)**
Motion em Hover faz uso da propriedade `rotate`, violando a cláusula do Ghost System que requer estritamente translate, blur e scale.
_Arquivos:_ `src/components/home/portfolio-showcase/CategoryStripe.tsx`.

**5. Declaração Inadequada da Variável de Cor `red` (🟡 P1 - Design System)**
Classes globais de Red expostas indevidamente para UI decorativa, onde o Vermelho só poderia ser para destrutivo/erro.
_Arquivos:_ `src/app/globals.css`.

**6. Ausência da Animação Persistente "Active" no Header (🟡 P1 - UI)**
A regra do sistema orienta underline contínuo na aba de navegação ativa do menu principal no Header desktop via `scaleX: isActive ? 1 : 0`.
_Arquivos:_ `src/components/layout/header/DesktopFluidHeader.tsx`.

## 6️⃣ Backlog Priorizado

### P0

- [ ] Implementar `src/lib/supabase/image-loader.ts` e linkar no `next.config.mjs`.
- [ ] Envelopar todos os links de rotas internas no wrapper `motion.create(Link)`.

### P1

- [ ] Refatorar a movimentação da seta para `translateX` em `CategoryStripe.tsx` em vez de `rotate`.
- [ ] Migrar arquivos `src/components/canvas/home/hero/` para `src/components/home/webgl/` e ajustar referências em `HomeHero.tsx`.
- [ ] Adicionar o state animado `scaleX` no menu Header Desktop.
- [ ] Limpar e isolar cores de identidade "red" do sistema fora de classes de sistema primárias.
- [ ] Refinar alinhamento em grid dos `FeaturedProjectsSection.tsx` para assegurar altura idêntica.

### P2

- [ ] Adicionar mais execuções locais E2E no processo de CI.

## 7️⃣ Plano de Correção em Ciclos

1. **Correção Rápida (Ciclo P0)**: Aplicar Loader da Imagem + Wrapper de Link para prevenir falhas de performance/routing graves.
2. **Correção Estrutural (Ciclo P1.1)**: Migração do módulo WebGL da Home e refatoração arquitetural para o padrão DDD.
3. **Polimento Visual (Ciclo P1.2)**: Adequações do Header, limpeza de cores proibidas e remoção estrita do "rotate".
4. **Alinhamento e Estabilização (Ciclo P2)**: Revisão dos grids e testes Playwright globais.

## 8️⃣ Prompts Técnicos Atômicos para Agentes Google Antigravity

### 🛠️ Prompt #01 — Setup Custom Image Loader (Supabase/Firebase)

**Objetivo:** Restaurar a otimização de imagens sem utilizar a otimização padrão do Next (`/_next/image`), permitindo deploy eficaz no Firebase Hosting via proxy `/render/image/public`.

**Arquivos:**

- `next.config.mjs`
- `src/lib/supabase/image-loader.ts` (a ser criado)

**Ações:**

1. Criar o arquivo `src/lib/supabase/image-loader.ts` para capturar URLs do bucket Supabase e transmutá-las para a formatação aceita pelo endpoint custom do domínio.
2. Adicionar `images: { loader: 'custom', loaderFile: './src/lib/supabase/image-loader.ts' }` no `next.config.mjs`.

**Regras:**

- Não quebrar exportação estática (fallback se possível).
- Usar fallback default caso url não seja do Supabase.

**Critérios de Aceite:**

- [ ] `image-loader.ts` existente.
- [ ] `next.config.mjs` atualizado com "loader" "custom".

### 🛠️ Prompt #02 — Client Side Navigation com Framer Motion

**Objetivo:** Refatorar todos os componentes que realizam links para navegação interna usando o wrapper animado exigido.

**Arquivos:**

- `src/components/ui/MotionLink.tsx` (a criar)
- `src/components/layout/header/DesktopFluidHeader.tsx`
- `src/components/home/hero/HeroCTA.tsx`

**Ações:**

1. Criar `MotionLink.tsx` exportando `motion.create(Link)`.
2. Substituir links HTML padrão e `motion.a` (quando internos) pelo `MotionLink` para evitar full reloads.

**Regras:**

- Exclusivo para rotas internas.

**Critérios de Aceite:**

- [ ] Rotas SPA da Home para `/sobre` funcionam sem recarregar o DOM.

### 🛠️ Prompt #03 — Migração de Arquitetura WebGL

**Objetivo:** Isolar o domínio Home WebGL conforme regra do SSoT.

**Arquivos:**

- `src/components/canvas/home/hero/*`
- `src/components/home/webgl/*` (pasta de destino)
- `src/components/home/hero/HomeHero.tsx`

**Ações:**

1. Mover todo o conteúdo de `canvas/home/hero` para `home/webgl/ghost-canvas/`.
2. Atualizar imports em `HomeHero.tsx`.

**Regras:**

- Arquivos `useGLTF.preload` no `GhostScene.tsx` devem continuar sendo executados.

**Critérios de Aceite:**

- [ ] O componente `HomeHero.tsx` funciona normalmente, buscando imports da nova pasta.

### 🛠️ Prompt #04 — Ghost System: Adequação Motion em Showcase

**Objetivo:** Remover uso de `rotate` em componentes, pois isso fere a cláusula visual do portfólio.

**Arquivos:**

- `src/components/home/portfolio-showcase/CategoryStripe.tsx`

**Ações:**

1. Remover propriedade `rotate: -45` do ícone animado.
2. Alterar para animar entrada por meio de `translateX` e `opacity`.

**Regras:**

- Motion permitido: apenas opacity, blur, translateY (ou translateX em setas).
- Usar easing `cubic-bezier(0.22, 1, 0.36, 1)`.

**Critérios de Aceite:**

- [ ] Nenhuma menção a `rotate` no arquivo.

### 🛠️ Prompt #05 — Ghost System: Underline State em Header

**Objetivo:** Implementar clareza visual de página ativa por meio da propriedade explícita animada `scaleX`.

**Arquivos:**

- `src/components/layout/header/DesktopFluidHeader.tsx`

**Ações:**

1. Adicionar `motion.div` como sublinhado sob o item de navegação principal.
2. Animar com `animate={{ scaleX: isActive ? 1 : 0 }}`.

**Regras:**

- Respeitar a fonte de documentação que pede expressamente a exclusão do formato "apenas hover" no link ativo.

**Critérios de Aceite:**

- [ ] O Link da página atual fica grifado e animado consistentemente sem flicker.
