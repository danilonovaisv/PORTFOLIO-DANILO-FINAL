# Plano de Implementação: Expansão da Cobertura de Testes (Ghost System)

Este plano visa aumentar a robustez do sistema através da implementação de testes unitários para áreas críticas que atualmente possuem baixa cobertura, conforme solicitado pelo workflow `/test`.

## 1. Análise de Cobertura (Identificação de Lacunas)

Após análise manual (devido a restrições de permissão para execução de drivers de cobertura automáticos), foram identificadas as seguintes áreas críticas sub-testadas:

- **Componentes de UI Específicos**: Apenas `CustomCursor` possui testes. Componentes complexos em `src/components/shared` ou `src/components/ui` (como modais e sliders) precisam de validação.
- **Custom Hooks**: Existem 27 hooks em `src/hooks/` sem testes correspondentes. Estes gerenciam lógica complexa de scroll, animação e performance.
- **State Management (Zustand)**: As stores em `src/store/` não possuem testes de integração.
- **Utilities de Assets**: `src/lib/utils.ts` possui lógica complexa de normalização de URLs e extração de YouTube IDs que é vital para o sistema.

## 2. Implementação de Testes (Fase 1: Core Logic)

### 2.1 Testes de Hooks (`src/hooks`)

- **Alvo**: `useLERPScroll.ts`
- **Motivo**: Gerencia o scroll suave da galeria, essencial para a experiência visual.
- **Arquivo**: `test/unit/hooks/useLERPScroll.test.ts`

### 2.2 Testes de Store (`src/store`)

- **Alvo**: `useAntigravityStore.ts`
- **Motivo**: Store central do sistema que controla flags de experiência e estado narrativo.
- **Arquivo**: `test/unit/store/antigravity.store.test.ts`

### 2.3 Reforço de Utilities (`src/lib/utils.ts`)

- **Alvo**: `extractYouTubeId` e `getAssetUrl`.
- **Motivo**: Validação de URLs externas e normalização de caminhos do Supabase.
- **Arquivo**: `test/unit/utils.test.ts` (Atualização)

## 3. Protocolo de Verificação

Devido a erros de permissão (`EPERM`) no diretório `node_modules` encontrados durante a execução local:

1. Validar a sintaxe e os imports dos novos testes.
2. Garantir que as mocks estejam alinhadas com as definições de tipos do projeto.
3. Documentar os resultados esperados.

## 4. Próximos Passos (E2E)

- Implementar jornada de "Visualização de Projeto" via Playwright no diretório `test/e2e`.
