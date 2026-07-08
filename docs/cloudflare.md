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

## Etapa 3 — Criar o projeto no Cloudflare Pages via agente

Agora o prompt principal. Cole isto no seu agente:

```
Cria um novo projeto no Cloudflare Pages usando o repositório GitHub "danilonovaisv/PORTFOLIO-DANILO-FINAL" com estas configurações:

1. Conecta o GitHub e seleciona o repositório "PORTFOLIO-DANILO-FINAL"
2. Configura a branch de produção como "main"
3. Framework preset: detecta automaticamente (ou "None" se for HTML/CSS/JS puro)
4. Build command: <comando de build do seu projeto> (ex: "npm run build" para React/Vite, ou "exit 0" para site estático puro)
5. Build output directory: <pasta de saída> (ex: "dist" para Vite, "build" para React, ou a raiz "." para HTML puro)
6. Root directory: (deixar vazio a menos que o projeto esteja numa subpasta)

Depois de criar, adiciona as variáveis de ambiente do Supabase:
- NEXT_PUBLIC_SUPABASE_URL = https://umkmwbkwvulxtdodzmzf.supabase.co
- NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVta213Ymt3dnVseHRkb2R6bXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzNDE4MzcsImV4cCI6MjA4MzkxNzgzN30.wssvD9W-yzRyLpq8aMCw57E4wNz7OnQ58ujLzYmF6CA

Faz o primeiro deploy e me dá a URL *.pages.dev gerada.
```

> **Importante:** Substitua:
> - `SEU_USUARIO` pelo seu username do GitHub
> - O build command e a pasta de saída conforme seu framework
> - A URL e chave do Supabase (pegue no dashboard do Supabase em Settings → API)

---

## Etapa 4 — Configurar domínio personalizado

Depois do deploy funcionando, peça ao agente:

```
Configura o domínio personalizado "portfoliodanilo.com" no projeto do Cloudflare Pages que acabamos de criar.

Passos que o agente deve seguir:
1. Adiciona o domínio no projeto Pages → Custom domains → Set up a domain
2. Se o domínio já estiver na Cloudflare (nameservers apontando), faz o CNAME automático
3. Se NÃO estiver na Cloudflare, me orienta a criar um registro CNAME no meu DNS apontando de "portfoliodanilo.com" para "<projeto>.pages.dev"
4. Ativa SSL/TLS automático
```

> Se seu domínio já estiver com DNS na Cloudflare, o agente faz tudo sozinho via API. Se estiver em outro provedor (Registro.br, HostGator, etc.), o agente vai te instruir a criar um registro CNAME.

---

## Etapa 5 — Ajustar o Supabase para aceitar o novo domínio

Peça ao agente:

```
No dashboard do Supabase, em Authentication → URL Configuration, atualiza:
- Site URL: https://seudominio.com.br
- Redirect URLs: adiciona https://seudominio.com.br/auth/callback*

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
| **Criar projeto Cloudflare Pages** | `Cria um Pages project conectado ao repo "meu-portfolio", branch main, com build command <seu_comando>, output dir <sua_pasta>, e adiciona as env vars do Supabase` |
| **Adicionar domínio** | `Configura o domínio "seudominio.com.br" no projeto Cloudflare Pages recém-criado` |
| **Atualizar variáveis de ambiente** | `Adiciona/modifica a variável NEXT_PUBLIC_SUPABASE_URL no Cloudflare Pages para o valor https://meuprojeto.supabase.co` |
| **Fazer novo deploy manual** | `Faz um novo deploy do projeto para o Cloudflare Pages usando a branch main` |
| **Ver logs do deploy** | `Verifica o status e logs do último deploy no Cloudflare Pages` |
| **Configurar preview deployments** | `Ativa preview deployments para PRs no repositório GitHub no Cloudflare Pages` |

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
