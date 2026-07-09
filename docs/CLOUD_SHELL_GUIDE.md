# Google Cloud Shell Setup Guide — Ghost System Integration

Este guia detalha o passo a passo dos comandos para provisionamento e configuração externa de segurança, IAM, Secret Manager e integração Supabase-Firebase usando o **Google Cloud Shell**.

---

## 1. Login e Seleção do Projeto

Primeiro, abra o Google Cloud Shell e autentique-se:
```bash
# Autenticar no GCP
gcloud auth login

# Definir o ID do projeto Firebase/GCP padrão
export PROJECT_ID="portfolio-danilo-novais"
gcloud config set project $PROJECT_ID
```

---

## 2. Habilitação de APIs do Google Cloud

Habilite as APIs essenciais para a integração do Firebase e do Secret Manager:
```bash
# Habilitar APIs necessárias
gcloud services enable \
  secretmanager.googleapis.com \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  iam.googleapis.com
```

---

## 3. Provisionamento do Secret Manager (Variáveis do Supabase)

Para evitar expor chaves sensíveis em código ou em builds não seguros, salve as chaves do Supabase no GCP Secret Manager.

```bash
# 1. Armazenar a URL do Supabase
echo -n "https://umkmwbkwvulxtdodzmzf.supabase.co" | gcloud secrets create SUPABASE_URL \
    --data-file=- \
    --replication-policy="automatic"

# 2. Armazenar a Anon Key do Supabase
echo -n "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVta213Ymt3dnVseHRkb2R6bXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzNDE4MzcsImV4cCI6MjA4MzkxNzgzN30.wssvD9W-yzRyLpq8aMCw57E4wNz7OnQ58ujLzYmF6CA" | gcloud secrets create SUPABASE_ANON_KEY \
    --data-file=- \
    --replication-policy="automatic"

# 3. Armazenar a Service Role Key do Supabase (para rotas /admin)
echo -n "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVta213Ymt3dnVseHRkb2R6bXpmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODM0MTgzNywiZXhwIjoyMDgzOTE3ODM3fQ.pJ5jSvUcN-zZDOMzvsvkWsk983kr3LLa-zJ9CVBC65I" | gcloud secrets create SUPABASE_SERVICE_ROLE_KEY \
    --data-file=- \
    --replication-policy="automatic"
```

---

## 4. Configuração de Permissões e IAM

Conceda acesso de leitura dos segredos à conta de serviço padrão do App Engine/Cloud Run que executa a Cloud Function do Firebase SSR.

```bash
# Obter o número do projeto GCP
export PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format="value(projectNumber)")

# Identificar a conta de serviço do Cloud Run (usada pelo Next.js SSR do Firebase)
export SERVICE_ACCOUNT="${PROJECT_NUMBER}-compute@developer.gserviceaccount.com"

# Dar permissão de Acessor de Segredos à conta de serviço
gcloud secrets add-iam-policy-binding SUPABASE_URL \
    --member="serviceAccount:${SERVICE_ACCOUNT}" \
    --role="roles/secretmanager.secretAccessor"

gcloud secrets add-iam-policy-binding SUPABASE_ANON_KEY \
    --member="serviceAccount:${SERVICE_ACCOUNT}" \
    --role="roles/secretmanager.secretAccessor"

gcloud secrets add-iam-policy-binding SUPABASE_SERVICE_ROLE_KEY \
    --member="serviceAccount:${SERVICE_ACCOUNT}" \
    --role="roles/secretmanager.secretAccessor"
```

---

## 5. Vinculação das Chaves no Firebase Functions / Cloud Run

Se você estiver fazendo deploy do Next.js via Firebase App Hosting ou Cloud Functions Gen 2, configure o ambiente para injetar as variáveis nos contêineres:

```bash
# Listar os segredos configurados para confirmação
gcloud secrets list
```

No arquivo de configuração do deploy do backend (ex: `firebase.json` ou no painel do Cloud Run para a função de renderização `ssrportfolio-danilo-novais`), mapeie as variáveis de ambiente para os segredos:
- `NEXT_PUBLIC_SUPABASE_URL` -> referenciando a versão `latest` de `SUPABASE_URL` no Secret Manager.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` -> referenciando `SUPABASE_ANON_KEY`.
- `SUPABASE_SERVICE_ROLE_KEY` -> referenciando `SUPABASE_SERVICE_ROLE_KEY`.
