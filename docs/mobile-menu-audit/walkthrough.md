# Walkthrough — correção do menu mobile

## Resultado

A correção sistêmica do menu mobile foi implementada no branch `codex/mobile-menu-systemic-fix`, sem deploy. O menu fechado não depende mais do GSAP para ser não interativo, o close fica acima do painel, o foco é restaurado corretamente e o fundo fica isolado enquanto o diálogo está aberto.

## Causa raiz

- `useMobileMenuAnimation` mantinha uma segunda fonte de estado e aplicava o estado fechado por GSAP. Quando `prefers-reduced-motion` desabilitava a timeline, o painel voltava ao baseline DOM/CSS: `fixed inset-0`, visível e interativo.
- O painel mobile estava em `--z-layer-mobile-menu: 90`, acima do header em `--z-layer-mobile-header: 80`; o botão de fechar podia estar visível, mas fora do hit-test.
- Links dentro de `aria-hidden` continuavam focáveis porque `aria-hidden` não altera tab order.
- O header persistente do App Router não resetava o menu em mudança de `pathname`.

## Solução adotada

- `SiteHeader` continua sendo o único owner de `isOpen` e fecha o menu em mudanças de `pathname`.
- `useMobileMenuAnimation` agora é decorativo: recebe `isOpen`, guarda refs/timelines e anima apenas opacity, blur e `translateY`.
- `MobileMenuPanel` passou a ser uma superfície `role="dialog"` com `<nav>` interno, `data-lenis-prevent`, scroll vertical próprio, safe-area padding, `aria-hidden` e `inert` no estado fechado.
- `MobileMenuButton` declara `aria-controls`, usa `Menu`/`X` estáticos com crossfade e não usa rotate/scale/translateX.
- `MobileHeaderBar` aplica z-index por token inline quando o menu está aberto, evitando falha de geração de classe dinâmica.
- `ClientLayout` expõe `#site-content`, isolado com `inert`/`aria-hidden` quando o menu abre.
- `/portfolio/[slug]` expõe `#main-content` para skip link, foco e tecnologia assistiva.
- `siteViewport` adiciona `viewportFit: 'cover'`.

## Arquivos alterados

- `src/hooks/useMobileMenuAnimation.ts`
- `src/hooks/useBodyLock.ts`
- `src/components/layout/header/SiteHeader.tsx`
- `src/components/layout/header/MobileStaggeredMenu.tsx`
- `src/components/layout/header/mobile/MobileHeaderBar.tsx`
- `src/components/layout/header/mobile/MobileMenuButton.tsx`
- `src/components/layout/header/mobile/MobileMenuPanel.tsx`
- `src/components/layout/ClientLayout.tsx`
- `src/config/metadata.ts`
- `src/app/globals.css`
- `src/app/portfolio/[slug]/page.tsx`
- `.context/DOCS-PORTFOLIO-PAGES/01-HOME/01-HEADER/01-HEADER.md`
- `docs/mobile-menu-audit/task.md`

## Evidências antes

- Unitário RED: painel fechado sem `inert`, com `pointer-events-auto`, links no tab order e foco indo para link oculto.
- Playwright RED inicial: falta de binários de browser bloqueou a primeira execução; depois da instalação, o hit-test mostrou que o close ainda não era topmost.
- Auditoria aprovada: 96/96 reduced-motion reproduziam painel fullscreen bloqueante e 4/4 landscapes críticos apresentavam corte/scroll incorreto.

## Evidências depois

- `pnpm test -- --runTestsByPath test/components/layout/header/MobileStaggeredMenu.test.tsx` -> `8 passed`.
- `pnpm exec playwright test test/e2e/mobile-menu.spec.ts --project=chromium --project=webkit` -> `6 passed`.
- O teste E2E cobre:
  - painel fechado em reduced motion sem interceptar hit-test;
  - close topmost e clique físico fechando;
  - Tab entrando no menu aberto;
  - Escape fechando e restaurando foco no trigger.

## Testes executados

- `PATH=/Users/danilonovais/.nvm/versions/node/v22.22.3/bin:$PATH pnpm run typecheck` -> pass.
- `PATH=/Users/danilonovais/.nvm/versions/node/v22.22.3/bin:$PATH pnpm run lint` -> pass com 5 warnings preexistentes de unused vars em admin/home.
- `PATH=/Users/danilonovais/.nvm/versions/node/v22.22.3/bin:$PATH pnpm test -- --runTestsByPath test/components/layout/header/MobileStaggeredMenu.test.tsx` -> pass.
- `PATH=/Users/danilonovais/.nvm/versions/node/v22.22.3/bin:$PATH pnpm exec playwright install chromium webkit` -> browsers instalados.
- `PATH=/Users/danilonovais/.nvm/versions/node/v22.22.3/bin:$PATH pnpm exec playwright test test/e2e/mobile-menu.spec.ts --project=chromium --project=webkit` -> pass.
- `PATH=/Users/danilonovais/.nvm/versions/node/v22.22.3/bin:$PATH VALIDATE_ENV_WARN_ONLY=1 pnpm run build` -> pass com warnings esperados de Supabase env ausente.
- `git diff --check` -> pass.

## Console logs relevantes

- Logs preexistentes durante Playwright:
  - hydration mismatch em `ContactForm.tsx:291`;
  - warnings de imagem para assets `supabase.test.invalid`;
  - aviso de `middleware` deprecated para `proxy`;
  - aviso de workspace root por lockfiles no worktree.
- Nenhum desses logs foi causado pelo menu corrigido; eles já constavam como `OPS-002` na auditoria.

## Erro da página pública

O erro da captura foi reproduzido fora da aplicação local:

- `https://portfoliodanilo.com` -> `HTTP/2 503`, `server: cloudflare`, `vary: x-fh-requested-host`, `x-served-by: cache-gru-*`.
- `https://portfolio-danilo-novais.web.app/` -> `HTTP/2 503`, `server: Google Frontend`, mesmo corpo `The service you requested is not available yet`.
- `https://portfolio-danilo-novais.firebaseapp.com/` -> mesmo `HTTP/2 503`.
- `https://www.portfoliodanilo.com` -> `301` para `https://portfoliodanilo.com/portfoliodanilo.com/`.

Conclusão: a falha pública não é uma exceção React/Next renderizada pela página. A origem Firebase Hosting/Fastly está indisponível ou sem serviço ativo, e o Cloudflare apenas propaga o erro no domínio canônico. Corrigir live exige ação de hosting: novo deploy Firebase, restauração do serviço de hosting/frameworks backend ou alteração de DNS/origin para o Worker Cloudflare. Nenhum deploy foi executado nesta missão.

## Limitações

- Safari em iPhone físico, barras dinâmicas, standalone mode e edge-swipe não puderam ser validados neste ambiente.
- A matriz completa de 192 casos permanece como evidência de auditoria; a regressão automatizada pós-patch cobre os contratos P0/P1 que falharam.
- O build local precisou de `VALIDATE_ENV_WARN_ONLY=1` porque o worktree não tem `.env.local` com Supabase.
- O smoke live continua bloqueado por `OPS-001` até a origem Firebase ser restaurada.

## Riscos residuais

- Safe areas em aparelhos reais podem exigir refinamento fino de padding após teste manual.
- O `ContactForm` ainda emite hydration mismatch e deve ter tarefa própria.
- O redirect de `www` para `/portfoliodanilo.com/` indica regra externa incorreta e deve ser corrigido junto da restauração do hosting.

## Rollback

- Reverter `6b9594b fix: harden mobile menu closed state` para remover o patch funcional.
- Reverter os commits de teste/documentação separadamente se necessário.
- Reverter `db119ed2c chore: pin TypeScript to 6.0.2` apenas se a toolchain precisar voltar ao estado anterior.
- Nenhum rollback envolve deploy nesta branch.

## Decisão sobre `.context/`

Atualização necessária e executada em `.context/DOCS-PORTFOLIO-PAGES/01-HOME/01-HEADER/01-HEADER.md`, porque o contrato documentado do header mobile mudou: estado fechado declarativo, diálogo modal, isolamento de fundo, restauração de foco e token de camada do close.

## Recomendação de monitoramento

- Restaurar o hosting Firebase ou repontar o domínio para a origem correta.
- Depois da restauração, executar smoke live sem publicar nada:
  - `curl -I https://portfoliodanilo.com`
  - `curl -I https://www.portfoliodanilo.com`
  - navegação mobile em `/`, `/sobre`, `/portfolio`, `/portfolio/magic-radio-branding`, `/projects/key-vision`, `/contato` e `/privacidade`.
- Abrir tarefa separada para `OPS-002`: hydration mismatch do `ContactForm`, recursos 400 e warnings WebGL.
