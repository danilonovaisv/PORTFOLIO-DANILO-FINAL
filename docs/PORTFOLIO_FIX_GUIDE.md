# 🔧 Guia de Correção: Internal Server Error - Portfolio Page

## ✅ Diagnóstico Concluído

Após análise completa, identifiquei que:
- ✅ O código está correto
- ✅ Build local funciona perfeitamente (6 projetos carregados)
- ✅ Variáveis de ambiente locais estão OK
- ❌ Erro ocorre apenas no Firebase App Hosting (ambiente de produção)

---

## 🎯 Causa Raiz Provável

**Variáveis de ambiente não configuradas no Firebase App Hosting.**

O Firebase App Hosting **NÃO** lê automaticamente os arquivos `.env.production` ou `.env`. 
Você precisa configurá-las manualmente no console do Firebase.

---

## 📝 Solução: Passo a Passo

### Passo 1: Acessar Firebase Console

1. Acesse https://console.firebase.google.com/
2. Selecione seu projeto
3. No menu lateral, clique em **App Hosting**
4. Selecione seu aplicativo web

### Passo 2: Configurar Variáveis de Ambiente

1. Na página do App Hosting, vá para **Configurações** → **Variáveis de ambiente**
2. Adicione as seguintes variáveis (clique em "Add variable"):

```env
NEXT_PUBLIC_SUPABASE_URL
Valor: https://dpejskjpghoozbpfxkpf.supabase.co
```

```env
NEXT_PUBLIC_SUPABASE_ANON_KEY
Valor: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVta213Ymt3dnVseHRkb2R6bXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzNDE4MzcsImV4cCI6MjA4MzkxNzgzN30.wssvD9W-yzRyLpq8aMCw57E4wNz7OnQ58ujLzYmF6CA
```

3. Salve as alterações

### Passo 3: Re-deploy

Depois de configurar as variáveis, faça um novo deploy:

```bash
npm run deploy
```

---

## 🔍 Como Verificar se Funcionou

Após o deploy, os logs agora incluem mensagens detalhadas:

```
[Portfolio] hasSupabaseEnv: true
[Portfolio] SUPABASE_URL: SET
[Portfolio] ANON_KEY: SET
[Portfolio] Creating Supabase client...
[Portfolio] Fetching projects from Supabase...
[Portfolio] Fetched 6 projects
[Portfolio] Mapped 6 portfolio projects
[Portfolio] Rendering with 6 projects
```

Se as variáveis **não** estiverem configuradas, você verá:

```
[Portfolio] hasSupabaseEnv: false
[Portfolio] SUPABASE_URL: MISSING
[Portfolio] ANON_KEY: MISSING
[Portfolio] Supabase env vars missing, using fallback projects.
```

---

## 🔄 Alternativa: Usar Vercel (Recomendado)

Se o problema persistir ou se preferir uma solução mais simples:

1. **Por que Vercel?**
   - Integração automática com `.env.production`
   - Melhor suporte para Next.js 16
   - Logs em tempo real mais detalhados
   - Deploy mais rápido

2. **Como migrar:**

```bash
# Instale o Vercel CLI
npm install -g vercel

# Faça login
vercel login

# Deploy
vercel --prod
```

3. **Configurar variáveis de ambiente:**
   - Acesse https://vercel.com/dashboard
   - Vá em Settings → Environment Variables
   - Adicione as mesmas variáveis do Firebase

---

## 📊 Logs de Build Local (Confirmação)

```
[Portfolio] hasSupabaseEnv: true
[Portfolio] SUPABASE_URL: SET
[Portfolio] ANON_KEY: SET
[Portfolio] Creating Supabase client...
[Portfolio] Fetching projects from Supabase...
[Portfolio] Fetched 6 projects
[Portfolio] Mapped 6 portfolio projects
[Portfolio] Rendering with 6 projects
✓ Generating static pages using 9 workers (24/24) in 1589.4ms
```

**Status:** ✅ Build local funcionando perfeitamente

---

## 🚨 Se o Problema Persistir

Se após configurar as variáveis o erro continuar:

1. **Verifique os logs do Cloud Run:**
   - Firebase Console → Cloud Run → Ver Logs
   - Procure por mensagens de erro específicas

2. **Teste o fallback forçado:**
   - Edite `src/app/portfolio/page.tsx`
   - Comente as linhas 94-121
   - Descomente as linhas de fallback forçado (veja o diff abaixo)

```diff
export default async function PortfolioPage() {
  let projects: PortfolioProject[] = [];

+ // TEMP: Force fallback to test
+ projects = buildFallbackProjects();
+ console.log('[Portfolio] FORCED FALLBACK - Using', projects.length, 'static projects');
+ return <PortfolioClient projects={projects} />;

  try {
-   const hasSupabaseEnv = ...
+   // const hasSupabaseEnv = ...
```

Se o site funcionar com fallback forçado, o problema é definitivamente a conexão com Supabase.

3. **Verificar permissões CORS do Supabase:**
   - Acesse: https://app.supabase.com/project/dpejskjpghoozbpfxkpf/settings/api
   - Verifique se o domínio do Firebase está permitido

---

## 📞 Próximos Passos

1. ✅ Configure as variáveis de ambiente no Firebase Console
2. ✅ Re-deploy
3. ✅ Verifique os logs do build
4. ✅ Teste a página `/portfolio`

Se precisar de mais ajuda, me avise qual mensagem de erro aparece nos logs após o deploy.

---

## 📚 Referências

- [Firebase App Hosting - Environment Variables](https://firebase.google.com/docs/app-hosting/environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Supabase CORS Configuration](https://supabase.com/docs/guides/api/cors)
