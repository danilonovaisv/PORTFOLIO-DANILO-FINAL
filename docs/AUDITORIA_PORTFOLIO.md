
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



Você é um engenheiro DevOps/GitHub Actions sênior, especializado em:
- GitHub Actions (workflows complexos, matrix, caching, permissions)
- Code Scanning com GitHub CodeQL
- Pipelines de build/test para Next.js + pnpm
- Deploy com Firebase Hosting

Seu objetivo é aplicar melhorias cirúrgicas nos workflows do repositório
"danilonovaisv/_danilonov_portfolio", SEM alterar o código de aplicação
(Next.js, componentes, etc), apenas arquivos em ".github/workflows".

----------------------------------------------------------------------
1. CONTEXTO DO PROJETO
----------------------------------------------------------------------

Repositório: danilonovaisv/_danilonov_portfolio

Workflows existentes em .github/workflows:
- nextjs.yml
- firebase-hosting-merge.yml
- firebase-hosting-pull-request.yml
- audit-project.yml
- ai-healing.yml

Stack do projeto:
- Next.js (App Router, TypeScript)
- pnpm como gerenciador de pacotes
- Firebase Hosting para deploy (preview em PR e produção em merge)
- Supabase, etc. (APENAS contexto; NÃO modifique código de app, só workflows)

Novo requisito: adicionar e integrar um workflow de Code Scanning GitHub CodeQL
para JavaScript/TypeScript, analisando os commits relevantes em relação aos
deploys e PRs.

----------------------------------------------------------------------
2. OBJETIVOS GERAIS DOS AJUSTES
----------------------------------------------------------------------

[A] Melhorar os workflows já existentes:
- Garantir consistência entre os workflows (Node 20, pnpm, caching).
- Melhorar performance com cache de dependências.
- Adicionar \`concurrency\` onde fizer sentido, para evitar execuções
  concorrentes da mesma branch.
- Restringir \`permissions\` de cada workflow ao mínimo necessário
  (principle of least privilege).

[B) Garantir que o pipeline de qualidade (build/test + CodeQL) seja parte
    do fluxo de deploy:
- PRs devem rodar build, lint e testes antes de qualquer deploy de preview.
- Branch main deve rodar build, lint, testes e CodeQL antes de deploy
  para produção (ou, no mínimo, CodeQL é disparado para o mesmo commit
  que acabou de ser deployado).

[C] Adicionar um workflow de CodeQL (Code Scanning):
- Novo arquivo: .github/workflows/codeql-code-scanning.yml
- Linguagem-alvo: javascript-typescript
- Gerenciador de pacotes: pnpm
- Build: \`pnpm build\`
- Gatilhos: push em main, pull_request para main, schedule semanal,
  workflow_dispatch e, opcionalmente, workflow_run após o deploy de prod.

[D] NÃO quebrar o fluxo atual de deploy com Firebase Hosting; apenas:
- Deixar o deploy mais seguro e previsível.
- Se necessário, alinhar nomes/\`name:\` dos workflows para que o CodeQL
  possa usar \`workflow_run\` apontando para o workflow certo.

----------------------------------------------------------------------
3. MUDANÇAS ESPERADAS POR ARQUIVO
----------------------------------------------------------------------

3.1. nextjs.yml
Objetivo: ser o workflow principal de CI (build + lint + tests) para PRs e main.

Aplique os seguintes ajustes:

1) Triggers:
- Certifique-se de que o workflow roda em:
  - push: branches [main]
  - pull_request: branches [main]
  - workflow_dispatch

2) Runtime + caching:
- Use \`actions/setup-node@v4\` com:
  - node-version: 20
  - cache: pnpm

3) Jobs:
- Tenha um job principal, por exemplo \`build-and-test\`, com:
  - runs-on: ubuntu-latest
  - concurrency:
      group: nextjs-\${{ github.ref }}
      cancel-in-progress: true
  - permissions:
      contents: read

- Passos principais:
  - Checkout com fetch-depth: 2
  - Instalar dependências com \`pnpm install --frozen-lockfile\`
  - Rodar \`pnpm lint\`
  - Rodar \`pnpm test\`
  - (Opcional mas desejável) Rodar \`pnpm build\`
  - (Opcional) Upload de artifact \`.next\` usando \`actions/upload-artifact@v4\`
    com nome, por exemplo, \`nextjs-build\`, para reaproveitar em deploy.

3.2. firebase-hosting-merge.yml
Objetivo: deploy de produção quando main receber novos commits.

Ajustes:

1) Verifique/defina um \`name:\` claro, por exemplo:
   name: Firebase Hosting Merge

2) Concurrency:
   - Adicione:
     concurrency:
       group: firebase-merge-\${{ github.ref }}
       cancel-in-progress: true

3) Permissions:
   - Use apenas o necessário para Firebase+checkout, por exemplo:
     permissions:
       contents: read
       id-token: write   # se estiver usando Workload Identity Federation

4) Integração com build:
   - Se o job de build do \`nextjs.yml\` fizer upload de artifact \`.next\`,
     você pode, aqui, baixar esse artifact via \`actions/download-artifact@v4\`
     (name: nextjs-build) antes de chamar o deploy do Firebase,
     para evitar rebuild redundante.
   - Caso não use artifacts, garanta que as versões de Node/pnpm aqui
     sejam as mesmas do \`nextjs.yml\`.

5) Relação com test/quality:
   - NÃO é obrigatório usar \`needs\` entre workflows diferentes, mas:
     - Certifique-se de que a branch main tem regras de proteção
       usando os checks do \`nextjs.yml\` e do CodeQL para bloquear
       merges sem qualidade.

3.3. firebase-hosting-pull-request.yml
Objetivo: deploy de preview para PRs.

Ajustes:

1) Triggers:
   - on:
       pull_request:
         branches: [main]

2) Concurrency:
   - Use:
     concurrency:
       group: firebase-preview-\${{ github.head_ref || github.ref }}
       cancel-in-progress: true

3) Runtime e cache:
   - Alinhe Node/pnpm com o \`nextjs.yml\`.
   - Se viável, reutilize artifacts de build de PR.

4) Permissions:
   - contents: read
   - id-token: write (se necessário pelo Firebase action)

3.4. audit-project.yml
Objetivo: auditorias pontuais (ex.: lint mais profundo, Qodana, inspeções).

Ajustes:

1) Triggers:
   - Priorize \`workflow_dispatch\` e/ou \`schedule\` (ex.: cron semanal),
     para não sobrecarregar CI básico.

2) Permissions:
   - Restrinja ao mínimo, por exemplo:
     permissions:
       contents: read
       security-events: write    # se publicar SARIF/código de segurança

3) Runtime:
   - Use Node 20 + pnpm com o mesmo padrão do nextjs.yml.

3.5. ai-healing.yml
Objetivo: workflows de “healing” com IA para correções automáticas.

Ajustes:

1) Gatilhos:
   - Deixe apenas \`workflow_dispatch\` (manual) e, se realmente fizer sentido,
     algum \`schedule\` específico.
   - Evite rodar em todo push/PR.

2) Permissions:
   - Só conceda \`contents: write\` e \`pull-requests: write\` se o bot realmente
     criar commits/PRs.
   - Caso contrário, mantenha apenas \`contents: read\`.

3) Documentação:
   - Se possível, adicione uma breve descrição em comentários no topo do YAML,
     explicando COMO e QUANDO usar esse workflow (mas isso é opcional).

----------------------------------------------------------------------
4. NOVO WORKFLOW: CODEQL — CODE SCANNING
----------------------------------------------------------------------

Crie um novo arquivo: .github/workflows/codeql-code-scanning.yml

Implemente o workflow abaixo literalmente, adaptando apenas se algum detalhe
do repositório exigir mudança. Caso identifique divergências específicas,
ajuste com bom senso sem quebrar o objetivo geral.

Conteúdo base:

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

    concurrency:
      group: codeql-\${{ github.ref }}
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
          # ref: \${{ github.event.workflow_run.head_sha }}
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
          languages: \${{ matrix.language }}
          queries: +security-and-quality

      - name: Build do projeto (Next.js App Router)
        env:
          NODE_ENV: production
        run: pnpm build

      - name: Rodar análise CodeQL
        uses: github/codeql-action/analyze@v3
        with:
          category: "/language:\${{ matrix.language }}"

Se o workflow de deploy de produção tiver \`name: Firebase Hosting Merge\`, você
pode descomentar o bloco \`workflow_run\` e usar \`ref: \${{ github.event.workflow_run.head_sha }}\` no checkout para que o CodeQL sempre analise o mesmo commit que foi para produção.

----------------------------------------------------------------------
5. CRITÉRIOS DE ACEITAÇÃO
----------------------------------------------------------------------

Considere o trabalho concluído quando:

1) O workflow \`nextjs.yml\`:
   - Rodar em push e PR para main.
   - Usar Node 20 + pnpm com cache.
   - Rodar pelo menos lint + tests (e preferencialmente build).
   - Tiver concurrency configurado.
   - Estiver passando com sucesso no repositório.

2) Os workflows de Firebase (\`firebase-hosting-merge\` e \`firebase-hosting-pull-request\`):
   - Usarem concurrency por branch.
   - Tiverem permissões mínimas.
   - Estiverem alinhados em versões de Node/pnpm com \`nextjs.yml\`.
   - Continuarem aptos a deployar (não quebre o deploy existente).

3) \`audit-project.yml\` e \`ai-healing.yml\`:
   - Estiverem restritos a \`workflow_dispatch\` (e eventualmente \`schedule\`).
   - Usarem permissões mínimas adequadas ao que fazem.

4) Novo workflow CodeQL:
   - Estiver criado em \`.github/workflows/codeql-code-scanning.yml\`.
   - Estiver visível na aba “Actions” do GitHub e na aba “Security → Code scanning alerts” quando for executado.
   - Rodar com sucesso em PRs e pushes para main.
   - (Opcional) Estiver conectado ao workflow de deploy via \`workflow_run\`.

5) NÃO haja mudanças em código de aplicação (apenas workflows) e todos os
   workflows continuem válidos sintaticamente (sem erros de YAML).

----------------------------------------------------------------------
6. ESTILO E LIMITES
----------------------------------------------------------------------

- Não faça alterações opinativas desnecessárias: mantenha a intenção
  original de cada workflow, apenas otimizando e integrando com CodeQL.
- Não remova jobs/steps que já existem, a menos que sejam claramente
  redundantes ou obsoletos.
- Comente mudanças não triviais diretamente no YAML, de forma curta
  (em inglês ou português simples).
- Após as mudanças, verifique mentalmente (ou, se possível, via dry-run)
  se a combinação de gatilhos (on:) e concurrency não gera loops,
  recursões entre workflows ou execuções redundantes.

Quando terminar, garanta que:
- Todos os arquivos em ".github/workflows" estejam consistentes.
- O novo workflow de CodeQL esteja pronto para ser usado.
- Os deploys continuem funcionando e agora contem com inspeção de segurança.
`;

export default GITHUB_WORKFLOWS_COPILOT_PROMPT;
