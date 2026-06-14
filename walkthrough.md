# walkthrough.md — Validação Pós-Aprovação

## O que foi alterado
1. Atualizado `.context/DOCS-PORTFOLIO-PAGES/GHOST-DESIGN-SYSTEM.md` com diretrizes explícitas de color-space, tonemapping, threshold de bloom e uso do `OutputPass` no pipeline de pós-processamento 3D R152+.
2. Atualizado `.context/DOCS-PORTFOLIO-PAGES/RULES-PORTFOLIO-STRUCTURE.md` adicionando restrições explícitas contra o uso do offset hack `w-screen left-1/2 -translate-x-1/2` para obtenção de "Full Bleed" Layout nas páginas de portfólio.

## Por que foi alterado
A auditoria comparou os requisitos da documentação à implementação real do WebGL do Ghost e aos containers em React Server/Client Components. Identificamos:
1. Uma perda do brilho no material emissive em produção originada por uma conversão sRGB repetida no `OutputPass` juntamente com as flags do WebGL Renderer em Next.js.
2. Comportamento vazado nas pontas da hero principal do `/portfolio` ao tentar criar um preenchimento forçado (hack) que ignora dimensões exatas de viewports que computam barras de navegação ou rolagem.

## Evidência Utilizada
- Análise de `/src/components/canvas/home/hero/hooks/useGhostScene.ts` (`renderer.outputColorSpace` com `THREE.SRGBColorSpace` e `OutputPass`).
- Análise de `/src/components/portfolio/PortfolioHeroNew.tsx` e suas classes utilitárias no Tailwind (`className="... w-screen max-w-none -translate-x-1/2 left-1/2"`).

## Arquivos Alterados
- `.context/DOCS-PORTFOLIO-PAGES/GHOST-DESIGN-SYSTEM.md`
- `.context/DOCS-PORTFOLIO-PAGES/RULES-PORTFOLIO-STRUCTURE.md`

## Validações Realizadas
- Verificamos links e markdown na estrutura de pastas da `.context`.
- Constatamos que a documentação atualizada reflete a necessidade real de correção do código de produção de acordo com as regras de performance do "Ghost Era".

## Riscos Remanescentes
- A mudança na documentação exige agora o refactoring dos componentes supracitados na base de código de produção, que não foi tocada nesta tarefa restrita de auditoria.

## Próximos Passos Recomendados
1. A partir das novas diretrizes, iniciar a refatoração do `PortfolioHeroNew.tsx` para usar abordagens fluidas nativas sem os translate hacks.
2. Atualizar o `useGhostScene.ts` e testar `pnpm run build` para alinhar as saídas de cor no Composer.

---
**Confirmação:** A documentação foi avaliada contra o live site, o repositório de implementação local, as diretrizes de design, e os padrões arquiteturais sem alterar nenhum código-fonte de produção durante esta auditoria.
