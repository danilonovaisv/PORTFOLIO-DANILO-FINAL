# Configuração de MCPs (Model Context Protocol)
>
> Protocolo de instalação e uso dos servidores MCP aprovados para o projeto.

## 1. Visão Geral

Este documento detalha a configuração dos servidores MCP integrados ao fluxo de desenvolvimento do portfólio.
A seleção segue estritamente o arquivo `.agents/MCPs-uteis.curated-config.json`.

## 2. Pré-requisitos

- **Node.js**: v20+ (Gerenciado via `.nvmrc` ou `package.json engines`).
- **Firebase CLI**: v13+ (Instalado em `devDependencies`).
- **Autenticação**:
  - GitHub: Token (Classic) com permissão `repo`.
  - Firebase: Sessão ativa via `firebase login`.

## 3. Servidores Aprovados

### 3.1 GitHub MCP

Permite operações em issues, PRs e leitura de repositórios.

- **Comando**: `pnpm run mcp:github` (ou via `npx`)
- **Variáveis de Ambiente**:
  - `GITHUB_PERSONAL_ACCESS_TOKEN`: Obrigatório. Adicione ao `.env.local`.
  - **Escopos**: `repo`, `user`, `project`.

### 3.2 Chrome DevTools MCP

Permite diagnóstico de performance e debug de runtime via protocolo CDP.

- **Comando**: `pnpm run mcp:chrome` (ou via `npx`)
- **Uso**: Requer Chrome rodando em modo debug.
  1. Inicie o Chrome Debug: `pnpm run chrome:debug`
  2. Conecte o MCP: `pnpm run mcp:chrome`

### 3.3 Firebase MCP

Permite gerenciamento de Hosting, Functions e Rules diretamente via chat.

- **Comando**: `pnpm run mcp:firebase` (ou `firebase mcp --dir .`)
- **Contexto**: Executa no diretório raiz para ler `firebase.json`.

## 4. Instalação e Configuração

### Passo 1: Configurar Variáveis

Utilize o arquivo `.env.local` (padrão Next.js) para segredos locais.

```bash
# Adicione ao .env.local (Crie se não existir)
GITHUB_PERSONAL_ACCESS_TOKEN=seu_token_aqui
```

*Nota: Os scripts `pnpm run mcp:*` foram configurados para carregar automaticamente o `.env.local`.*

### Passo 2: Validar Instalação

Execute os scripts de verificação:

```bash
# Validar Firebase CLI
pnpm run mcp:firebase -- --help

# Validar GitHub MCP (requer token)
# (O servidor iniciará em stdio e aguardará input JSON-RPC)
```

## 5. Segurança e Governança

1. **Tokens**: Nunca comite `.env`. O arquivo está listado em `.gitignore`.
2. **CI/CD**: Os scripts MCP são para uso local (desenvolvimento assistido). Não devem bloquear o pipeline de deploy.
3. **Atualizações**: As versões são gerenciadas via `package.json` (firebase) ou `npx` (github/chrome) para garantir uso da última versão estável.

## 6. Referência

- Configuração Curada: `.agent/MCPs-uteis.curated-config.json`
- Documentação Oficial: <https://modelcontextprotocol.io>
