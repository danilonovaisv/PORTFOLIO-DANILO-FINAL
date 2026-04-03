# REPAIR_PLAN — Auditoria de Falhas CI/CD (GitHub Actions)

## 1. Resumo Executivo

A saúde atual do pipeline está **parcialmente estável, mas frágil**. O workflow principal (`.github/workflows/firebase-deploy.yml`) possui mitigação para deploy SSR no Firebase (geração temporária de `package-lock.json` e remoção temporária de `packageManager`), porém há sinais de regressão de configuração no repositório que podem reabrir falhas históricas.

### Diagnóstico consolidado

- O pipeline quebra em cenários ligados ao **builder remoto do Firebase (npm)**, não no build local com pnpm.
- O histórico de logs mostra recorrência de três classes de falha:
  1. **Conflito de peer deps (`firebase-frameworks` x `sharp`)** com `ERESOLVE`.
  2. **Falha de cache/setup do Node** quando `pnpm-lock.yaml` some do repo.
  3. **Build remoto contaminado por variáveis globais incorretas** (ex.: `NODE_ENV=development`) gerando erro de prerender (`/_global-error`) e `export-marker.json` ausente.
- No estado atual, há um **desalinhamento crítico**: `scripts/firebase-preflight.sh` exige `legacy-peer-deps=true` no `.npmrc`, mas `.npmrc` não contém mais essa chave.

---

## 2. Erros Identificados

> Formato: **Erro** | **Origem (arquivo/linha)** | **Mensagem observada**

1. **Preflight falhando por estratégia npm ausente**  
   - Origem: `scripts/firebase-preflight.sh` (check de peer strategy)  
   - Evidência local: `pnpm run firebase:preflight`  
   - Mensagem: `ERRO: .npmrc sem legacy-peer-deps=true` e `Pre-Flight Check FAILED`.

2. **Conflito de peer dependencies no Cloud Build (Firebase Frameworks)**  
   - Origem: logs históricos de deploy (`.context/logs/2026-03-06-firebase-ssr-deploy-fix.md`)  
   - Mensagem: `ERESOLVE` envolvendo `firebase-frameworks@0.11.8` (peer `sharp ^0.32 || ^0.33`) vs `sharp@0.34.5`.

3. **Falha no setup de cache do GitHub Actions quando lockfile não existe**  
   - Origem: logs históricos (`.context/logs/2026-03-06-firebase-ssr-deploy-fix.md`) e configuração do workflow  
   - Mensagem: `Some specified paths were not resolved, unable to cache dependencies.`

4. **Falha de prerender no build remoto por ambiente contaminado**  
   - Origem: logs históricos (`.context/logs/2026-03-06-firebase-ssr-deploy-fix.md`)  
   - Mensagens: `Error occurred prerendering page "/_global-error"`, `TypeError: Cannot read properties of null (reading 'useContext')`, `ENOENT .../.next/export-marker.json`.

5. **Risco de trigger órfão no self-healing**  
   - Origem: `.github/workflows/ai-healing.yml`  
   - Observação: referencia `Deploy to Firebase Hosting on PR`, workflow que não está presente em `.github/workflows/` atualmente.

---

## 3. Causa Raiz

### Causa raiz principal (operacional)

Existe um **desacoplamento entre estratégia de build local (pnpm) e estratégia de build remoto (npm dentro do Firebase Frameworks backend)**. O repositório usa pnpm para instalar e validar localmente, porém o Firebase executa etapas com npm durante o empacotamento SSR. Quando ajustes específicos para npm não estão versionados e alinhados (`legacy-peer-deps`, lockfile íntegro, env limpa), o deploy quebra mesmo com lint/typecheck/build locais verdes.

### Causas raízes secundárias

1. **Deriva de configuração**: `.npmrc` atual perdeu `legacy-peer-deps=true`, enquanto scripts e histórico tratam essa flag como guardrail obrigatório.
2. **Dependência do lockfile no setup-node**: `cache-dependency-path: pnpm-lock.yaml` exige arquivo presente e consistente no repositório.
3. **Mitigações temporárias que podem vazar para runtime**: env vars globais no step de deploy podem alterar comportamento do builder remoto.
4. **Governança de workflow incompleta**: workflow de self-healing observa um pipeline que não existe (possível dívida técnica e ruído de automação).

---

## 4. Plano de Ação (Step-by-Step)

## Fase A — Estabilização imediata (sem alterar arquitetura)

1. **Restaurar guardrail npm no repositório**
   - Ajustar `.npmrc` para incluir `legacy-peer-deps=true`.
   - Comando de validação:
     ```bash
     pnpm run firebase:preflight
     ```
   - Critério de sucesso: check “npm peer dependency strategy” com status OK.

2. **Garantir lockfile versionado e sincronizado**
   - Verificar se `pnpm-lock.yaml` está no git e atualizado com `package.json`.
   - Comandos:
     ```bash
     pnpm install --frozen-lockfile --ignore-scripts
     git status --short
     ```
   - Critério de sucesso: install determinístico sem gerar lockfile inesperado.

3. **Revalidar gates locais que espelham CI**
   - Comandos:
     ```bash
     pnpm run lint
     pnpm run typecheck
     pnpm run build
     (cd functions && pnpm run build)
     ```
   - Critério de sucesso: todos os passos com exit code 0.

## Fase B — Robustez do workflow GitHub Actions

4. **Revisar e manter isolamento do workaround npm no step de deploy**
   - Confirmar que apenas os comandos `npm install --package-lock-only ...` carregam flags de compatibilidade.
   - Evitar export global de `NODE_ENV=development` ou flags npm que contaminem o build remoto.

5. **Checar consistência de secrets e validação**
   - Validar presença real dos secrets exigidos (`NEXT_PUBLIC_SUPABASE_URL`, chaves públicas Supabase, `SUPABASE_SERVICE_ROLE_KEY`, credenciais Firebase).
   - Ajustar mensagens de erro para reduzir falso negativo operacional.

6. **Alinhar workflow de AI self-healing com workflows reais**
   - Atualizar `workflows:` monitorados para nomes existentes.
   - Evitar perda de gatilho quando ocorrer falha real de deploy.

## Fase C — Verificação de produção

7. **Executar run de teste no GitHub Actions (workflow_dispatch)**
   - Validar sequência: install → lint → typecheck → functions build → next build → firebase deploy.

8. **Se falhar em deploy, coletar artefato de erro estruturado**
   - Extrair `gh run view <RUN_ID> --log-failed`.
   - Classificar incidente por categoria:
     - `CACHE_LOCKFILE`
     - `NPM_PEER_RESOLUTION`
     - `REMOTE_PRERENDER_ENV`
     - `SECRETS_CONFIG`

9. **Registrar pós-mortem curto em `.context/logs/`**
   - Data, run ID, commit SHA, causa raiz, correção aplicada, validação.

---

## 5. Sugestões de Melhorias Contínuas

1. **Gate preventivo obrigatório no CI antes do deploy**
   - Adicionar etapa `pnpm run firebase:preflight` no workflow principal (antes do build/deploy) para bloquear regressão de `.npmrc` e checks críticos.

2. **Policy de integridade de lockfiles**
   - Criar validação que falhe CI quando `package.json` mudar sem atualização correspondente do `pnpm-lock.yaml`.

3. **Hardening do self-healing**
   - Em `ai-healing.yml`, monitorar apenas workflows existentes e anexar sumário com categoria de erro.

4. **Checklist de mudança em pipeline**
   - Toda mudança em `.github/workflows/firebase-deploy.yml` deve rodar checklist local mínimo:
     - `pnpm run lint`
     - `pnpm run typecheck`
     - `pnpm run build`
     - `pnpm run firebase:preflight`

5. **Telemetry de incidentes CI/CD**
   - Consolidar arquivo único em `docs/audit/` com histórico de run IDs, etapa quebrada e MTTR para facilitar rastreabilidade.

---

## Fontes consultadas nesta auditoria

- Repositório local (espelho operacional): workflows em `.github/workflows/`, scripts de preflight, `.npmrc`, documentação e logs históricos em `.context/logs/` e `docs/`.
- Repositório GitHub informado pelo usuário (`https://github.com/danilonovaisv/DATABASE_AGENT_NEXT`): tentativa de acesso sem conteúdo recuperável neste ambiente (indisponível/não acessível no momento da auditoria).
- Vector store `vs_69520b1fb834819197e445db9aab8d69`: não disponível via ferramentas MCP desta sessão (sem recursos listados).
