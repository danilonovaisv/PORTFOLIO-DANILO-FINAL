# AUDITORIA SEMANAL DE CLEANUP & DEAD CODE

## 1. Resumo Executivo

**TOP 10 Problemas Críticos Encontrados:**
1. **Componentes Órfãos (`src/components`):** Identificados dezenas de componentes React que não estão sendo importados em nenhum outro arquivo, inflando o bundle e aumentando a superfície de manutenção (ex: `GhostCursor.tsx`, `Grainient.tsx`).
2. **Dependências Não Utilizadas:** O pacote `framer-motion` (em partes específicas/legacy), `@typescript-eslint/eslint-plugin` e `eslint-plugin-prettier` não estão integrados corretamente.
3. **Erros de Depcheck e Knip:** Falhas nas ferramentas de checagem estática revelaram exports não utilizados (ex: `eyebrowVariants`, `ghostRise`, `Tables`) que devem ser limpos.
4. **Acúmulo de Código Morto em Configurações:** Arquivos `.d.ts` e configurações sem uso (ex: `src/types/css-modules.d.ts`, `src/types/gsap.d.ts`) ocupando espaço.
5. **Tipos e Interfaces Exportadas Sem Uso:** `ErrorReport` e `Tables` foram apontados pelo Knip como órfãos.
6. **Múltiplos Componentes de Admin Duplicados/Inativos:** O diretório de admin contém seções de formulário soltas e variantes de templates que precisam ser revistas (ex: `MasterProjectTemplateV2Editor.tsx`, `LegacyBlockEditor.tsx`).
7. **Arquivos de Roteamento Obsoletos:** Rotas de admin/protected que não compõem a arquitetura central de visualização do site, requerendo escrutínio.
8. **Assets Declarados não Utilizados:** Algumas variáveis de assets declaradas não são mapeadas corretamente (ou o knip flagrou problemas).
9. **Componentes de Movimento/Animação Isolados:** Arquivos dentro de `src/lib/motion/` não sendo importados na base (`ghostRevealSimple`, `viewportConfig`).
10. **Desvio da Doc `estrutura-site-portfolio.txt`:** Há componentes e pastas (como `/projects/` vs `/portfolio/`) duplicando lógicas de templates e páginas, em violação ao SSoT das docs.

---

## 2. Matriz por Página com Status

| Página / Rota | Status (Ativa/Obsoleta/Incompleta) | Arquivos Órfãos Encontrados | Dependências Inúteis |
|---|---|---|---|
| `/` (Home) | **Ativa** | `GhostCursor.tsx`, `Grainient.tsx` (Não usados na HOME principal) | Nenhuma |
| `/sobre` | **Ativa** | `sections/index.ts` | Nenhuma |
| `/portfolio` | **Ativa** | Vários em `components/portfolio/` soltos | Nenhuma |
| `/projects/[slug]` | **Obsoleta/Duplicada** | (Rota pode ser inteira redundante em favor de `/portfolio/[slug]`) | N/A |
| `/admin/*` | **Ativa** (porém inflada) | `LegacyBlockEditor.tsx`, `MasterProjectTemplateV2Editor.tsx` | `openai` (apenas em admin) |
| `/privacidade` | **Ativa** | Nenhuma | Nenhuma |
| `/contato` | **Ativa** | Nenhuma | Nenhuma |

---

## 3. Backlog Priorizado

**[P0] Crítico:**
- Excluir dependências referenciadas no `package.json` mas marcadas como missing/não-utilizadas (ex: plugins do eslint perdidos).
- Refatorar a duplicação entre `/src/app/projects` e `/src/app/portfolio`. A doc fala em `/portfolio/[slug]`.
- Limpar `src/middleware.ts` se de fato estiver órfão ou mal configurado (Knip/órfão flagrou ele inativo/0 imports diretos, validar fluxo de proxy).

**[P1] Estrutural:**
- Excluir arquivos listados como "Unused exports" pelo Knip (`ghostRevealSimple`, `viewportConfig`, `eyebrowVariants`, etc.).
- Limpar componentes `src/components/` que possuem 0 imports no projeto (como os types e index soltos).
- Remover as referências do `LegacyBlockEditor.tsx` e `MasterProjectTemplateV2Editor.tsx` caso sejam efetivamente lixo legado (V2/Legacy vs V3).

**[P2] Polimento:**
- Deletar arquivos genéricos de tipos não utilizados (ex: `src/types/css-modules.d.ts`, `gsap.d.ts`).
- Corrigir a configuração do `tsconfig.json` relatada como sintaxe inválida pelo Depcheck.
- Atualizar `.context/DOCS-PORTFOLIO-PAGES` para refletir as deleções dos templates e rotas removidas.

---

## 4. Plano de Correção em Ciclos

**Ciclo 1: Rápido (Quick Wins)**
1. Corrigir erro de sintaxe no `tsconfig.json` (reportado pelo depcheck `Expected property name or '}' in JSON at position 29`).
2. Remover pacotes eslint (`@typescript-eslint/eslint-plugin`, `eslint-plugin-prettier`, `eslint-config-prettier`) que estão corrompidos ou inúteis, e unificar via pnpm.
3. Deletar arquivos tipados inúteis e arquivos `index.ts` vazios ou desconectados (`src/components/sobre/sections/index.ts`, `src/types/gsap.d.ts`, etc.).

**Ciclo 2: Estrutural**
1. Remover a rota legada `/src/app/projects` se for garantido que `/src/app/portfolio` assumiu o lugar (ambos têm layout igual/similar).
2. Deletar os componentes do Admin que são legados (`LegacyBlockEditor.tsx`, `MasterProjectTemplateV2Editor.tsx`).
3. Limpar funções e constantes não utilizadas acusadas pelo `knip`: `ghostRevealSimple`, `eyebrowVariants`, `viewportConfig` e `CRITICAL_VIDEO_URLS`.

**Ciclo 3: Polimento**
1. Auditar se `GhostCursor.tsx` e `Grainient.tsx` (provavelmente WebGL antigo) podem ser removidos, dado que a documentação pede `HeroGlassCanvas` e `GhostCanvas`.
2. Rodar novamente `pnpm run build-check` para confirmar que não quebramos os tipos.
3. Sincronizar a documentação (atualizar arquivos no `.context/` para garantir consistência SSoT com o app limpado).
