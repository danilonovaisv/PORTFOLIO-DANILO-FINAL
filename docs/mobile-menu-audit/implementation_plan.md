# Plano de implementação — correção sistêmica do menu mobile

## 1. Objetivo e limites

Este plano registra a auditoria aprovada e orienta a correção do menu mobile global sem trocar framework, criar estado global ou implantar em produção. O escopo cobre o comportamento do header em todas as rotas, acessibilidade, navegação pelo App Router, landscape, safe areas e motion. `OPS-001` e `OPS-002` permanecem missões separadas e não são tratados como causa do menu.

## 2. Causas-raiz aprovadas

### MOB-001 — baseline quebrado com reduced motion

`useMobileMenuAnimation` retorna antes de inicializar os estilos GSAP quando motion está desabilitado. O painel fechado depende desses estilos imperativos para sair da viewport e desativar eventos; no DOM/CSS, porém, nasce `fixed inset-0` e `pointer-events-auto`. Assim, o estado visual/interativo fechado não é garantido quando `prefers-reduced-motion` está ativo.

Correção arquitetural: o estado React controlado deve definir o baseline funcional do painel, das pre-layers e do trigger. GSAP pode interpolar somente entre estados já válidos. Abrir, fechar, `pointer-events`, visibilidade e semântica não podem depender de uma timeline.

### MOB-002 — trigger abaixo do overlay por stacking

Os tokens atuais posicionam header, pre-layers e painel em `80`, `85` e `90`. O painel fullscreen fica acima do header que contém o trigger; por isso, o controle de fechamento pode permanecer visível, mas não receber hit-test.

Correção arquitetural: o controle de fechamento precisa participar da mesma camada efetiva do diálogo e do mesmo ciclo de foco. A solução deve tratar a hierarquia do overlay, não apenas aumentar um número de `z-index`.

## 3. Achados funcionais aprovados

| ID | Prioridade/escopo | Evidência aprovada | Direção da correção |
| --- | --- | --- | --- |
| MOB-003 | P1 · todas as rotas · `667x375` e `844x390` | `scrollHeight` `454/462` excede `clientHeight` `375/390`; `overflow-y: visible`, `scrollTop: 0`; HOME/Email ficam inalcançáveis. | Aplicar `overflow-y: auto`, `overscroll-behavior: contain` e distribuição vertical com `margin-block: auto`; testar primeiro e último item. |
| MOB-004 | P2 · todas as rotas · `375x812` | Tab alcança links invisíveis dentro de `aria-hidden`. | Aplicar `inert` no estado fechado; testar Tab e Shift+Tab. |
| MOB-005 | P2 · todas as rotas · `375x812` | Escape fecha, mas o foco permanece no link oculto. | Restaurar o trigger no fechamento local e focar o novo conteúdo após navegação. |
| MOB-006 | P2 · `/portfolio/[slug]` | Não existe `#main-content`; o fundo permanece exposto ao VoiceOver. | Isolar um `#site-content` global e corrigir o landmark usado pelo skip link. |
| MOB-007 | P1 · todas as rotas | O header persiste no App Router sem reset por pathname. | Fechar de forma idempotente em `usePathname`; cobrir push, back, forward, deep link e refresh. |
| MOB-008 | P2 · todas as rotas | A interação é modal sem `dialog`; o trigger está fora do focus trap. | Wrapper com `role="dialog"`, `aria-modal="true"`, `nav` interno e ciclo de foco incluindo close. |
| MOB-009 | P2 · todas as rotas · aparelhos com notch | `viewportFit` ausente; header usa `top: 0` e altura fixa `60px`. | Adicionar `viewportFit: cover`, respeitar insets e validar em iPhones; risco permanece médio até aparelho real. |
| MOB-010 | P3 · todas as rotas | Faltam `aria-controls` e `aria-current`; copy `InstagramIcon`; motion usa X/rotate/`transition-all`. | Corrigir ARIA/copy e limitar motion a opacity, blur e `translateY`. |

## 4. Achados operacionais separados

- **OPS-001 — P0:** produção responde HTTP 503. É uma missão de infraestrutura independente. Esta execução não faz deploy nem tenta atribuir o 503 ao menu.
- **OPS-002 — P2:** foram observados 105 hydration mismatches, 72 recursos HTTP 400 e 8 warnings WebGL. Devem virar tarefas próprias; não há causalidade aprovada com MOB-001..010.

## 5. Arquitetura da correção

1. **Estado controlado como SSOT:** `SiteHeader` mantém `isOpen`; o hook de animação recebe o estado e não mantém uma segunda verdade funcional.
2. **Baseline declarativo:** atributos, classes e estilos determinam `closed/open` mesmo sem JavaScript de animação. GSAP só aplica transição progressiva e deve ser cancelável/idempotente.
3. **Overlay modal coerente:** um wrapper representa o diálogo, contém a navegação e o close efetivo, usa `inert` quando fechado e inclui todos os controles no focus trap.
4. **Isolamento do documento:** um contêiner global `#site-content` é isolado enquanto o diálogo está aberto; body/Lenis lock são adquiridos e liberados sem vazamento, inclusive em unmount e troca de rota.
5. **Navegação resiliente:** mudança de `pathname` fecha o menu; fechamento local devolve foco ao trigger, enquanto navegação move foco para o conteúdo da nova rota.
6. **Geometria responsiva:** painel rola internamente em landscape, contém overscroll e preserva primeiro/último item; header e painel consomem safe-area insets com `viewportFit: cover`.
7. **Motion restrito:** reduced motion entrega o mesmo estado final sem timeline; animações restantes usam opacity, blur e `translateY`, sem rotate, scale, `translateX` ou `transition-all`.

## 6. Arquivos e subsistemas afetados

- **Toolchain:** `package.json` e `pnpm-lock.yaml` para Node 22 + TypeScript 6.0.2 reproduzíveis.
- **Estado/roteamento:** `src/components/layout/header/SiteHeader.tsx` e `src/hooks/useMobileMenuAnimation.ts`.
- **Overlay/a11y:** `src/components/layout/header/MobileStaggeredMenu.tsx`, `mobile/MobileMenuPanel.tsx`, `MobileMenuButton.tsx`, `MobileHeaderBar.tsx` e `MobilePreLayers.tsx`.
- **Documento global e viewport:** `src/app/layout.tsx`, `src/config/metadata.ts` e, se necessário para locks/insets, `src/app/globals.css` e o wrapper de smooth scroll existente.
- **Testes:** suites unitárias do header/hook e suites E2E responsivas sob `test/`, sem criar um runner paralelo.
- **SSOT documental:** documentação de Header em `.context/DOCS-PORTFOLIO-PAGES/` e walkthrough correspondente, atualizados somente após a implementação validada.

## 7. Alternativas rejeitadas

- **Apenas elevar `z-index`:** resolveria parte do hit-test de MOB-002, mas manteria MOB-001, foco em conteúdo oculto, persistência por rota e overflow landscape. Também perpetuaria uma hierarquia frágil de stacking contexts.
- **Portal para `#modal-root`:** separaria o overlay do header, porém aumentaria a coordenação de foco, estado, route reset e body lock sem necessidade comprovada. A árvore atual pode oferecer diálogo correto com uma camada explícita.
- **Store global:** o menu pertence ao ciclo de vida do header persistente; `usePathname` e estado controlado local resolvem o reset. Um store adicionaria acoplamento e estados obsoletos entre rotas.

## 8. Trade-offs e riscos

- O baseline declarativo duplica alguns estados finais antes delegados ao GSAP, em troca de comportamento determinístico e testável.
- `overflow-y: auto` cria scroll dentro do painel; é intencional para impedir que o documento role e para tornar todos os itens alcançáveis.
- `inert` deve coexistir com ARIA e foco programático correto; aplicar somente `aria-hidden` não basta.
- `viewportFit: cover` transfere ao layout a responsabilidade pelos insets. Padding incorreto pode duplicar espaço ou deixar o trigger sob notch/barras.
- Reset por pathname deve ser idempotente para não roubar foco nem disparar callbacks em loop.
- O risco de MOB-009 permanece médio até validação em iPhone real; simuladores cobrem geometria, não todas as barras/gestos do Safari.
- A mudança para TypeScript 6.0.2 pode expor erros antes mascarados; typecheck, lint e testes devem registrar a diferença, sem atualizar outras dependências.

## 9. Estratégia de testes

1. **Regressão primeiro:** testes falham para reduced motion fechado, hit-test do close e ciclo abrir/fechar antes da correção funcional.
2. **Unitário/a11y:** estados controlados, `inert`, `role=dialog`, `aria-modal`, `aria-controls`, `aria-current`, foco, Escape, body/Lenis lock e cleanup.
3. **Roteamento:** push, back, forward, deep link e refresh em `/`, `/sobre`, `/portfolio` e `/portfolio/[slug]`.
4. **Matriz portrait:** todas as rotas-alvo em `375x812`, motion normal e reduced motion.
5. **Matriz landscape:** `667x375` e `844x390`, alcançando HOME e Email, sem scroll do documento e com overscroll contido.
6. **Safe areas/Safari:** iPhones com notch, rotação, barras dinâmicas e edge-swipe; registrar a pendência se não houver aparelho real.
7. **Toolchain:** instalar com lockfile congelado em Node 22, confirmar pnpm 11.10.0/TypeScript 6.0.2 e rodar os checks do projeto.

## 10. Rollback

- Reverter o commit documental sem efeito em runtime.
- Reverter o commit de toolchain restaura simultaneamente os dois pins de TypeScript e o lockfile correspondente.
- As mudanças funcionais futuras devem ser separadas por camada (estado/baseline, a11y, layout/motion, testes/docs) para permitir rollback incremental.
- Nenhum rollback exige deploy nesta missão; OPS-001 continua fora do escopo.

## 11. Critérios de aceite

- Menu fechado não cobre nem intercepta a página em motion normal ou reduced motion.
- Abrir/fechar funciona por trigger, close, Escape e navegação; o close recebe hit-test.
- Foco não entra em conteúdo fechado, cicla no diálogo aberto e é restaurado ou transferido conforme a ação.
- `#site-content` e o landmark principal são isolados corretamente durante o modal.
- Trocas e histórico de rota não deixam overlay, scroll lock ou estado aberto residual.
- Primeiro e último itens ficam acessíveis em `667x375` e `844x390`; o documento não rola sob o menu.
- Safe areas são respeitadas e a limitação de aparelho real fica explicitamente registrada.
- ARIA/copy estão corretos; motion não usa rotate, scale, `translateX` ou `transition-all` no fluxo corrigido.
- Node 22, pnpm 11.10.0 e TypeScript 6.0.2 são verificáveis com instalação congelada.
- OPS-001/002 permanecem separados; não há deploy nem alteração fora do worktree aprovado.
