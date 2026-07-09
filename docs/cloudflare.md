# Guia Passo a Passo: Migrar seu Portfolio do Firebase Hosting para Cloudflare Pages (via agente de IDE)

## 📦 O que você vai ter no final

| Item | Como fica |
|---|---|
| **Frontend/hosting** | Firebase Hosting → **Cloudflare Pages** (banda ilimitada, grátis) |
| **Storage/backend** | **Supabase** (mantém como está — 2 projetos grátis, 1 GB cada) |
| **Domínio** | Customizado com SSL grátis automático |
| **Deploy** | Automático via `git push` para o GitHub |
| **Configuração** | Feita pelo agente da IDE (Cursor/Windsurf) |

---

## Etapa 1 — Configurar o agente da sua IDE com Cloudflare (2 minutos)

Escolha sua IDE abaixo e peça ao agente **exatamente este prompt**:

### 🟦 Para Cursor

Abra o Cursor, pressione `Cmd+I` (ou `Ctrl+I`) para abrir o Composer, e cole:

```
/add-plugin cloudflare
```

Isso instala automaticamente as Skills e os servidores MCP do Cloudflare. Depois, reinicie o Cursor.

> **Alternativa manual:** Vá em Settings → Rules → Add Rule → Remote Rule e cole `cloudflare/skills`.

### 🟩 Para Windsurf

Abra o Windsurf, abra o Cascade (ícone de ondas no canto), e cole este prompt:

```
Execute os seguintes comandos para configurar Cloudflare neste projeto:
1. Instale as Skills: npx skills add https://github.com/cloudflare/skills
2. Adicione os servidores MCP no arquivo ~/.codeium/windsurf/mcp_config.json com estas configurações:
{
  "mcpServers": {
    "cloudflare": { "serverUrl": "https://mcp.cloudflare.com/mcp" },
    "cloudflare-docs": { "serverUrl": "https://docs.mcp.cloudflare.com/mcp" },
    "cloudflare-bindings": { "serverUrl": "https://bindings.mcp.cloudflare.com/mcp" },
    "cloudflare-builds": { "serverUrl": "https://builds.mcp.cloudflare.com/mcp" },
    "cloudflare-observability": { "serverUrl": "https://observability.mcp.cloudflare.com/mcp" }
  }
}
```

### 🟪 Para VS Code com GitHub Copilot (ou qualquer outro agente)

Crie/edite o arquivo `.cursor/mcp.json` (ou `.vscode/mcp.json` para Copilot) na raiz do projeto com:

```json
{
  "mcpServers": {
    "cloudflare": { "url": "https://mcp.cloudflare.com/mcp" },
    "cloudflare-docs": { "url": "https://docs.mcp.cloudflare.com/mcp" },
    "cloudflare-bindings": { "url": "https://bindings.mcp.cloudflare.com/mcp" },
    "cloudflare-builds": { "url": "https://builds.mcp.cloudflare.com/mcp" },
    "cloudflare-observability": { "url": "https://observability.mcp.cloudflare.com/mcp" }
  }
}
```

Depois reinicie o editor. Na primeira vez que o agente chamar uma API do Cloudflare, ele vai pedir autorização OAuth — autorize.

---

## Etapa 2 — Enviar o projeto para o GitHub (se já não estiver)

Peça ao seu agente:

```
Verifica se este projeto tem um repositório Git configurado. Se não tiver, inicializa o git, cria um repositório no GitHub chamado "meu-portfolio" (ou o nome que preferir), adiciona todos os arquivos, faz commit e push para a branch main.
```

O agente vai executar algo como:

```bash
git init
git add .
git commit -m "feat: portfolio inicial"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/meu-portfolio.git
git push -u origin main
```

---

## Etapa 3 — Configurar o Deploy no Cloudflare Workers com Assets

Como a estrutura do projeto usa Next.js 16, React 19 e `@opennextjs/cloudflare` v1.x, o deploy deve ser feito como um **Cloudflare Worker com Assets** (utilizando o arquivo `wrangler.toml` existente).

Para configurar o deploy automático via GitHub Actions:

1. **Adicione os segredos (Secrets) no seu repositório GitHub**:
   - Vá no seu repositório no GitHub → **Settings** → **Secrets and variables** → **Actions**.
   - Crie as seguintes variáveis de repositório (Repository secrets):
     - `CLOUDFLARE_API_TOKEN`: Token de API da Cloudflare com permissões para editar Workers e Assets (crie em `dash.cloudflare.com` → My Profile → API Tokens → template "Edit Cloudflare Workers").
     - `CLOUDFLARE_ACCOUNT_ID`: ID da sua conta Cloudflare (disponível na barra lateral direita do seu painel Cloudflare).
     - `NEXT_PUBLIC_SUPABASE_URL`: A URL do seu projeto Supabase.
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: A chave anônima do seu projeto Supabase.

2. **Habilite o deploy automático**:
   - O workflow está configurado no arquivo `.github/workflows/cloudflare-deploy.yml`. Toda vez que você fizer `git push` para a branch `main`, o GitHub Actions fará o build do Next.js + OpenNext e publicará o Worker com Assets automaticamente.

3. **Desative o build automático no Cloudflare Pages**:
   - Se você tinha conectado o repositório diretamente no painel do Cloudflare Pages (com deploy automático), **desative ou delete** esse projeto de Pages para evitar builds redundantes e conflitos de compilação da pasta `functions` do Firebase.

---

## Etapa 4 — Configurar domínio personalizado no Cloudflare Worker

Depois que o primeiro deploy for concluído pelo GitHub Actions, configure seu domínio personalizado:

1. Acesse o painel da **Cloudflare** → **Workers & Pages**.
2. Clique no Worker do seu projeto (`portfolio-danilo-final`).
3. Vá na aba **Settings** (ou **Triggers**) → **Custom Domains** → **Add Custom Domain**.
4. Insira seu domínio (ex: `portfoliodanilo.com`) e siga os passos para apontá-lo automaticamente (se o seu DNS já estiver na Cloudflare) ou crie o apontamento CNAME fornecido.

---

## Etapa 5 — Ajustar o Supabase para aceitar o novo domínio

Peça ao agente:

```
No dashboard do Supabase, em Authentication → URL Configuration, atualiza:
- Site URL: https://portfoliodanilo.com
- Redirect URLs: adiciona https://portfoliodanilo.com/auth/callback*

E em Settings → API, verifica se as URLs permitidas estão corretas.
```

---

## Etapa 6 — Remover o Firebase Hosting (opcional)

Depois de tudo funcionando no Cloudflare, peça:

```
No Firebase Console, desativa o hosting do projeto antigo para não gerar cobranças:
1. Vai em Hosting no Firebase Console
2. Remove o domínio ou para o serviço se não for mais usado
```

---

## 📋 Tabela de prompts rápidos para cada situação

| Situação | Prompt para o agente |
|---|---|
| **Configurar Cloudflare no Cursor** | `/add-plugin cloudflare` |
| **Configurar Cloudflare no Windsurf** | `npx skills add https://github.com/cloudflare/skills` + configurar MCP no `mcp_config.json` |
| **Criar repositório e fazer push** | `Inicializa git, cria repo GitHub "meu-portfolio", commit e push` |
| **Fazer deploy manual local** | `Executa pnpm run cf:deploy para buildar e enviar o projeto para o Cloudflare Workers via Wrangler CLI` |
| **Verificar logs da build** | `Exibe os logs ou status da última execução do workflow de deploy no GitHub Actions` |
| **Adicionar nova variável de ambiente** | `Adiciona uma nova env var no wrangler.toml e no segredo do GitHub Actions correspondente` |

---

## ⚠️ Problemas comuns e como resolver

| Problema | Prompt para o agente |
|---|---|
| **404 na páginas** | `Verifica se o index.html está na raiz da pasta de output configurada no Cloudflare Pages` |
| **Supabase não conecta** | `Verifica se as variáveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY estão corretas nas env vars do Cloudflare Pages` |
| **Domínio não funciona** | `Verifica se o DNS do domínio "seudominio.com.br" está apontando corretamente como CNAME para <projeto>.pages.dev` |
| **Build falhando** | `Analisa o log de build do último deploy no Cloudflare Pages e me diz o que deu errado` |
| **SSL não ativo** | `Ativa SSL/TLS automático no projeto Cloudflare Pages e verifica se o certificado foi emitido` |

---

## 🎯 Resumo do fluxo completo

```
1. [2 min] Configurar agente da IDE com Cloudflare MCP
2. [1 min] Git push do projeto para o GitHub
3. [2 min] Agente cria o Cloudflare Pages e faz primeiro deploy
4. [2 min] Agente configura domínio personalizado
5. [1 min] Atualizar URLs no Supabase
6. [1 min] Desativar Firebase Hosting
                          ───────────
                    Total: ~9 minutos
```

O agente da IDE (Cursor/Windsurf) consegue fazer **tudo exceto** autorizar OAuth (vai abrir o navegador uma vez) e criar o registro CNAME se seu domínio não estiver na Cloudflare — nesse caso ele te dá a instrução exata.
