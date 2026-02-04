# 📊 Relatório de Auditoria: Portfolio Page - Deploy Error

**Data:** 2026-01-21  
**Status Geral:** 🔴 **Crítico** - Internal Server Error após deploy  
**Ambiente:** Firebase Hosting (Cloud Run)

---

## 🚨 Problema Detectado

A página `/portfolio` está retornando **Internal Server Error** no ambiente de produção (Firebase Hosting), mas funciona perfeitamente em local.

**Screenshot do Erro:**
![Erro Internal Server Error](/.gemini/antigravity/brain/524576d1-a897-424b-b338-c4e5ef521b4c/uploaded_image_1769004800669.png)

---

## ✅ Verificação de Build Local

Build local **PASSOU** com sucesso:

```
✓ Compiled successfully in 3.9s
✓ Generating static pages using 9 workers (24/24) in 1071.3ms
├ ○ /portfolio (revalidate: 1m)
└ ● /portfolio/[slug] (SSG)
```

**Conclusão:** O código está correto. O problema é específico do ambiente de produção.

---

## 🔍 Análise de Código

### 1. Estrutura da Página Portfolio

#### ✅ Server Component (`page.tsx`)
- **Status:** Correto
- **Revalidação:** `export const revalidate = 60` (ISR)
- **Cliente Supabase:** Usa `createStaticClient()` ✓
- **Fallback:** Implementado corretamente com projetos estáticos

```tsx
// ✓ Correto - Usa cliente estático
const supabase = createStaticClient();
const dbProjects = await listProjects({}, supabase);
```

#### ✅ Client Component (`PortfolioClient.tsx`)
- **Status:** Correto
- **Diretiva:** `'use client'` presente
- **Props:** Recebe projetos do server component
- **Estado:** Gerencia modal localmente

#### ✅ Componentes Filhos
- `PortfolioHeroNew.tsx` ✓
- `ProjectsGallery.tsx` ✓ (usa parallax com hook customizado)
- `PortfolioModalNew.tsx` ✓
- `CategoryFilter.tsx` ✓

---

## 🔧 Diagnóstico: Possíveis Causas

### 🔴 1. Variáveis de Ambiente Ausentes no Firebase

**Arquivo `.env.production` (atual):**
```env
NEXT_PUBLIC_SUPABASE_URL=https://umkmwbkwvulxtdodzmzf.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_lW8...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Problema:** O Firebase App Hosting pode não estar usando essas variáveis. Elas precisam ser **configuradas manualmente no console do Firebase**.

**Como verificar:**
1. Acesse Firebase Console
2. Vá em App Hosting → Configuração
3. Verifique se as variáveis de ambiente estão definidas
4. Compare com `.env.production`

---

### 🟡 2. Erro de Runtime no Servidor (SSR/ISR)

O código funciona no build estático, mas pode falhar no runtime do servidor quando:
- A função do Supabase retorna um erro
- O timeout do Cloud Run é excedido
- Há um problema de rede entre Cloud Run e Supabase

**Possível solução:** Aumentar o timeout e adicionar mais logs.

---

### 🟡 3. Incompatibilidade Next.js + Firebase Frameworks Backend

**Versão atual:** Next.js 16.1.3

**Possível problema:** Firebase App Hosting pode ter problemas com:
- Turbopack
- Experimental features do Next 16
- ISR com revalidação curta (60s)

---

## 🛠️ Plano de Ação Executável

### Prioridade 1: Verificar Variáveis de Ambiente

**Ação:** Configurar variáveis de ambiente no Firebase Console

1. Acesse: https://console.firebase.google.com/
2. Navegue para: **App Hosting** → Seu app → **Configurações**
3. Adicione as seguintes variáveis:

```
NEXT_PUBLIC_SUPABASE_URL=https://umkmwbkwvulxtdodzmzf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVta213Ymt3dnVseHRkb2R6bXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzNDE4MzcsImV4cCI6MjA4MzkxNzgzN30.wssvD9W-yzRyLpq8aMCw57E4wNz7OnQ58ujLzYmF6CA
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_lW8dC02qgDYiYxBfHGr54A_X1-D-NQ4
```

4. **Re-deploy** a aplicação

---

### Prioridade 2: Adicionar Logging e Error Handling

**Modificação em `src/app/portfolio/page.tsx`:**

```diff
export default async function PortfolioPage() {
  let projects: PortfolioProject[] = [];

  try {
    const hasSupabaseEnv =
      Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
      Boolean(
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
          process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
      );

+   console.log('[Portfolio] hasSupabaseEnv:', hasSupabaseEnv);
+   console.log('[Portfolio] SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);

    if (hasSupabaseEnv) {
      const supabase = createStaticClient();
+     console.log('[Portfolio] Fetching projects from Supabase...');
      const dbProjects = await listProjects({}, supabase);
+     console.log('[Portfolio] Fetched', dbProjects.length, 'projects');
      projects = dbProjects.map((project, index) =>
        mapDbProjectToPortfolioProject(project, index)
      );
    } else {
      console.warn('Supabase env vars missing, using fallback projects.');
      projects = buildFallbackProjects();
    }
  } catch (error) {
-   console.error('Error in PortfolioPage:', error);
+   console.error('[Portfolio] Error:', error instanceof Error ? error.message : error);
+   console.error('[Portfolio] Stack:', error instanceof Error ? error.stack : 'N/A');
    projects = buildFallbackProjects();
  }

  return <PortfolioClient projects={projects} />;
}
```

**Severidade:** 🟡 Médio  
**Objetivo:** Identificar onde exatamente o erro ocorre no servidor.

---

### Prioridade 3: Testar Deploy com Fallback Forçado

**Modificação temporária para teste:**

```diff
export default async function PortfolioPage() {
  let projects: PortfolioProject[] = [];

+ // TEMP: Force fallback to test deploy
+ projects = buildFallbackProjects();
+ return <PortfolioClient projects={projects} />;

  try {
    // ...resto do código
```

**Objetivo:** Verificar se o erro é exclusivamente do Supabase ou se é algo mais profundo.

---

### Prioridade 4: Ajustar Configuração do Firebase

**Modificação em `firebase.json`:**

```diff
"hosting": {
  "source": ".",
  "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
  "frameworksBackend": {
-   "region": "us-central1"
+   "region": "us-central1",
+   "runtime": {
+     "timeout": "60s",
+     "memory": "512MB"
+   }
  }
}
```

---

## 📝 Checklist de Correção

- [ ] Verificar variáveis de ambiente no Firebase Console
- [ ] Adicionar logging detalhado em `portfolio/page.tsx`
- [ ] Re-deploy e verificar logs do Cloud Run
- [ ] Testar com fallback forçado
- [ ] Se persistir, considerar downgrade para Next.js 15
- [ ] Verificar timeout e memória do Cloud Run

---

## 🎯 Próximos Passos

1. **Imediato:** Usuário deve verificar Firebase Console → Variáveis de ambiente
2. **Se variáveis estiverem OK:** Adicionar logs e re-deploy
3. **Se logs mostrarem erro do Supabase:** Verificar permissões e conexão
4. **Se persistir:** Considerar migração para Vercel (melhor suporte Next.js 16)

---

## 📚 Referências

- [Firebase App Hosting - Environment Variables](https://firebase.google.com/docs/app-hosting/environment-variables)
- [Next.js 16 Deployment](https://nextjs.org/docs/app/building-your-application/deploying)
- [Supabase Static Client](https://supabase.com/docs/reference/javascript/initializing)

