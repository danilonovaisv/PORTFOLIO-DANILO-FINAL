# 🔍 Debug: Falha de Infraestrutura (EPERM em node_modules)

## 1. Sintoma

Falha crítica ao tentar executar testes ou listar dependências do projeto.

- **Comando:** `npm run test`, `npx jest`, `ls -ld node_modules`
- **Erro:** `EPERM: operation not permitted, realpath .../node_modules`
- **Contexto:** Múltiplas tentativas de limpeza (`rm -rf`, `pnpm store prune`) falharam em resolver permanentemente o bloqueio.

## 2. Informações Coletadas

- **Sistema Operacional:** macOS
- **Node Version:** v20.20.0 (via `npx` output)
- **PNPM Version:** 10.29.3
- **Estado do Diretório:** `node_modules` existe mas está inacessível para leitura/escrita pelo usuário atual, mesmo após `chown`.
- **Tentativas Anteriores:**
  1. `sudo chown -R $(whoami) .`
  2. `sudo chown -R $(whoami) ~/.npm`
  3. `rm -rf node_modules` + `pnpm install`

## 3. Hipóteses

1. **Bloqueio de Sistema (SIP/Quarantine):** O macOS pode ter colocado o diretório em quarentena ou aplicado flags imutáveis (`uchg`/`schg`).
2. **Processo Fantasma:** Um processo órfão do Node ou VS Code pode estar segurando um _file descriptor_ do diretório.
3. **Cache Global Corrompido (Persistente):** O `pnpm` pode estar hard-linking arquivos de um store global que ainda possui permissões erradas, "reinfectando" o projeto a cada install.

## 4. Investigação (Ações Realizadas)

- **Teste de Permissão Simples:** `ls -ld node_modules` -> Falhou (`Operation not permitted`).
- **Teste de Execução Direta:** `npx jest` -> Falhou (`EPERM`).
- **Limpeza Nuclear:** O usuário executou `sudo rm -rf node_modules` e `pnpm install`. O usuário reportou sucesso, mas o agente ainda vê o diretório como bloqueado. Isso sugere uma discrepância de ambiente entre o terminal do usuário e o do agente.

## 5. Causa Raiz Provável

**Desincronização de Ambiente ou Bloqueio de Segurança do macOS.**
O diretório `node_modules` está tecnicamente presente, mas o contexto de execução atual (Agente) não tem permissão de leitura, possivelmente devido a restrições de segurança do macOS aplicadas a processos em _background_ ou scripts automatizados.

## 6. Plano de Ação (Manual)

Como a automação está bloqueada, a execução dos testes deve ser feita manualmente pelo usuário para garantir a integridade do projeto.

### 6.1 Execução Manual de Testes

Por favor, execute o seguinte comando **no seu terminal** (onde você tem permissões completas):

```bash
npm run test
```

### 6.2 Se houver erros nos testes

Cole a saída do erro aqui para que eu possa analisar e aplicar as correções no código (os arquivos de código-fonte `src/` e `test/` parecem estar acessíveis, apenas `node_modules` está problemático).

## 7. Prevenção

- **Evitar `sudo` com gerenciadores de pacote:** Nunca use `sudo npm install` ou `sudo pnpm install`.
- **Manter NVM/Corepack:** Use gerenciadores de versão (nvm, fnm) para evitar problemas de permissão com o Node do sistema.
