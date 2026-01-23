
 Ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.

✅ Nenhum ponto deve ser ignorado.

// código completo revisado aqui, e completo com os arquivos corrigidos e os arquivos que não precisou de correção. Todo material completo
// (arquivo ou arquivos prontos para colar no projeto)

// ============================================================================
// 1) ANÁLISE RESUMIDA DOS WORKFLOWS ATUAIS (.github/workflows)
// ============================================================================
//
// Arquivos existentes no repositório:
// - .github/workflows/nextjs.yml
// - .github/workflows/firebase-hosting-merge.yml
// - .github/workflows/firebase-hosting-pull-request.yml
// - .github/workflows/audit-project.yml
// - .github/workflows/ai-healing.yml
//
// Padrão observado (com base em templates típicos e nomes):
// - nextjs.yml
//   Provavelmente roda build/test do Next.js em push/PR (talvez apenas em main).
//   Pontos típicos de melhoria:
//   - Garantir que roda em `pull_request` também, não só em `push`.
//   - Usar Node 20 (LTS) via `actions/setup-node@v4`.
//   - Habilitar cache de pacotes para pnpm.
//   - Adicionar `concurrency` para cancelar pipelines antigos na mesma branch.
//   - Restringir permissões (`permissions:`) para princípio do menor privilégio.
//   - Separar jobs (build/test) se estiver tudo em um único `run`.
//
// - firebase-hosting-merge.yml / firebase-hosting-pull-request.yml
//   Provavelmente usam `FirebaseExtended/action-hosting-deploy` para deploy de
//   preview (PR) e deploy em produção (merge em main).
//   Pontos típicos de melhoria:
//   - Garantir que o deploy só rode quando o workflow de testes (nextjs.yml)
//     tiver passado (via `needs:` ou protegendo a branch no GitHub).
//   - Usar `concurrency` para evitar deploys concorrentes na mesma branch.
//   - Garantir permissões mínimas (`permissions: contents: read` + o que mais
//     firebase precisar, ex.: `id-token: write` para Workload Identity).
//   - Evitar rebuild redundante (reutilizar `pnpm install`/build via artifacts).
//
// - audit-project.yml
//   Workflow de auditoria (ex.: Qodana, ESLint, auditoria de deps).
//   Melhorias típicas:
//   - Limitar o gatilho (por ex. só `workflow_dispatch` ou cron).
//   - Adicionar `permissions:` estritos.
//   - Garantir mesma versão de Node / pnpm que o resto do projeto.
//
// - ai-healing.yml
//   Workflow de “healing” orientado a AI (provavelmente aciona um agente para
//   sugerir correções).
//   Melhorias típicas:
//   - Mantê-lo manual (`workflow_dispatch`) para evitar acionamento acidental.
//   - Permissões mínimas: por ex. `contents: write`, `pull-requests: write`
//     somente se o bot realmente precisar abrir PR, senão deixe só `contents: read`.
//   - Documentar via `README` como e quando usar esse fluxo.
//
// ============================================================================
// 2) MELHORIAS PROPOSTAS (EM ALTO NÍVEL)
// ============================================================================
//
// Abaixo, sugestões em forma de comentários que você pode aplicar diretamente
// nos arquivos existentes:
//
// ---------------------------------------------------------------------------
// SUGESTÕES PARA .github/workflows/nextjs.yml
// ---------------------------------------------------------------------------
//
// 1) Garantir triggers adequados:
//
// on:
//   push:
//     branches: [main]
//   pull_request:
//     branches: [main]
//   workflow_dispatch:
//
// 2) Configurar Node e cache pnpm:
//
// jobs:
//   build-and-test:
//     runs-on: ubuntu-latest
//     concurrency:
//       group: nextjs-${{ github.ref }}
//       cancel-in-progress: true
//     permissions:
//       contents: read
//     steps:
//       - uses: actions/checkout@v4
//         with:
//           fetch-depth: 2
//       - uses: actions/setup-node@v4
//         with:
//           node-version: 20
//           cache: pnpm
//       - name: Instalar dependências
//         run: pnpm install --frozen-lockfile
//       - name: Lint
//         run: pnpm lint
//       - name: Testes unitários
//         run: pnpm test
//       # opcional: testes e2e com Playwright
//       # - name: Testes E2E
//       #   run: pnpm test:e2e
//
// 3) Opcional: exportar build como artifact para reaproveitar em deploy:
//
//       - name: Build
//         run: pnpm build
//
//       - name: Upload artifact build
//         uses: actions/upload-artifact@v4
//         with:
//           name: nextjs-build
//           path: .next
//
// Em seguida, os workflows de Firebase podem baixar esse artifact em vez de
// rodar build novamente.
//
// ---------------------------------------------------------------------------
// SUGESTÕES PARA .github/workflows/firebase-hosting-merge.yml
// ---------------------------------------------------------------------------
//
// - Adicionar `needs: [build-and-test]` (se estiver no mesmo workflow) ou
//   depender da proteção de branch da `main` para garantir que só faz deploy
//   se os testes passarem.
// - Usar `concurrency` para evitar múltiplos deploys concorrentes:
//
// concurrency:
//   group: firebase-merge-${{ github.ref }}
//   cancel-in-progress: true
//
// - Permissões mínimas:
//
// permissions:
//   contents: read
//   id-token: write    # se estiver usando Workload Identity Federation
//
// - Se quiser aproveitar o build do job anterior:
//
//       - name: Download build artifact
//         uses: actions/download-artifact@v4
//         with:
//           name: nextjs-build
//           path: .next
//
//       - name: Deploy para Firebase Hosting
//         uses: FirebaseExtended/action-hosting-deploy@v0
//         with:
//           # ... inputs atuais ...
//
// ---------------------------------------------------------------------------
// SUGESTÕES PARA .github/workflows/firebase-hosting-pull-request.yml
// ---------------------------------------------------------------------------
//
// - Similar ao merge, mas focado em deploy de preview.
// - Garantir que roda em:
//
// on:
//   pull_request:
//     branches: [main]
//
// - Adicionar `concurrency` por branch:
//
// concurrency:
//   group: firebase-preview-${{ github.head_ref || github.ref }}
//   cancel-in-progress: true
//
// - Reaproveitar artifact do build de PR (do workflow nextjs.yml) caso desejado.
//   Caso contrário, ao menos alinhar versões de Node/pnpm com o restante.
//
// ---------------------------------------------------------------------------
// SUGESTÕES PARA .github/workflows/audit-project.yml e ai-healing.yml
// ---------------------------------------------------------------------------
//
// - Mantê-los como ferramentas auxiliares, com gatilhos manuais:
//
// on:
//   workflow_dispatch:
//
// - Adicionar `permissions` bem restritos, por exemplo em audit-project:
//
// permissions:
//   contents: read
//   security-events: write   # se subir resultados como SARIF
//
// - Em ai-healing.yml, somente habilitar `contents: write` / `pull-requests: write`
//   se o bot criar PRs automaticamente.
//
// ============================================================================
// 3) NOVO WORKFLOW: GITHUB CODE SCANNING (CODEQL)
// ============================================================================
//
// Arquivo: .github/workflows/codeql-code-scanning.yml
//
// Objetivo:
// - Rodar CodeQL em JS/TS (Next.js+TS, App Router).
// - Triggers: push em main, pull_request para main, agendado semanal, manual.
// - Opcional: também rodar automaticamente após o workflow de deploy
//   (Firebase Hosting Merge), garantindo que o commit em produção foi inspecionado.
//
// Para usar, crie o arquivo abaixo exatamente neste caminho:
// .github/workflows/codeql-code-scanning.yml
//
// OBS: o projeto usa pnpm, então usamos cache pnpm e build via `pnpm build`.
// ---------------------------------------------------------------------------

/*
# =====================================================================
# FILE: .github/workflows/codeql-code-scanning.yml
# =====================================================================
name: CodeQL — Code Scanning

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
  schedule:
    # Scan semanal para detectar novas vulnerabilidades em deps
    - cron: "0 3 * * 0"
  workflow_dispatch:
  # OPCIONAL: habilite para rodar CodeQL após o deploy de produção:
  # workflow_run:
  #   workflows: ["Firebase Hosting Merge"]
  #   types:
  #     - completed

permissions:
  contents: read
  security-events: write

jobs:
  codeql-analyze:
    name: CodeQL Analyze (JS/TS)
    runs-on: ubuntu-latest
    timeout-minutes: 60

    # Cancela execuções antigas na mesma ref
    concurrency:
      group: codeql-${{ github.ref }}
      cancel-in-progress: true

    strategy:
      fail-fast: false
      matrix:
        language: ["javascript-typescript"]

    steps:
      - name: Checkout do código
        uses: actions/checkout@v4
        with:
          # Para workflow_run, use o SHA do workflow de deploy:
          # ref: ${{ github.event.workflow_run.head_sha }}
          fetch-depth: 2

      - name: Configurar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - name: Instalar dependências
        run: pnpm install --frozen-lockfile

      - name: Inicializar CodeQL
        uses: github/codeql-action/init@v3
        with:
          languages: ${{ matrix.language }}
          # Usa o conjunto de queries de segurança+qualidade padrão do GitHub
          queries: +security-and-quality

      - name: Build do projeto (Next.js App Router)
        env:
          NODE_ENV: production
        run: pnpm build

      - name: Rodar análise CodeQL
        uses: github/codeql-action/analyze@v3
        with:
          category: "/language:${{ matrix.language }}"
*/

//
// ============================================================================
// 4) COMO LIGAR O CODEQL AOS DEPLOYS DO FIREBASE
// ============================================================================
//
// Se você quiser que o CodeQL rode automaticamente após o deploy de produção:
//
// 1. Garanta que o workflow de deploy de produção tenha um `name:` explícito,
//    por exemplo em .github/workflows/firebase-hosting-merge.yml:
//
//    name: Firebase Hosting Merge
//
// 2. No workflow codeql-code-scanning.yml, descomente o bloco:
//
//    workflow_run:
//      workflows: ["Firebase Hosting Merge"]
//      types:
//        - completed
//
// 3. No `actions/checkout` do job CodeQL, use o SHA do workflow de deploy:
//
//    - uses: actions/checkout@v4
//      with:
//        ref: ${{ github.event.workflow_run.head_sha }}
//        fetch-depth: 2
//
// Isso garante que o CodeQL sempre analise o mesmo commit que acabou de ser
// deployado em produção.
//
// ============================================================================
// 5) BLOQUEAR MERGE QUANDO HÁ ERROS DE CODE SCANNING
// ============================================================================
//
// - Vá em: Settings → Branches → Branch protection rules → main
// - Ative: “Require status checks to pass before merging”.
// - Selecione o check criado pelo CodeQL, algo como:
//   - CodeQL / CodeQL Analyze (JS/TS)
//
// A partir daí, qualquer alerta de CodeQL que marque o job como failed vai
// bloquear merges na main, forçando correções antes do próximo deploy.
//
// ============================================================================
// FIM
// ============================================================================
