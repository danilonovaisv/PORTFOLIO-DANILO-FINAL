---
name: production-release
description: Workflow para build e release automatizado no ambiente de produção.
---

# Workflow: Production Release (`/deploy-prod`)

Este workflow orquestra de ponta a ponta o processo de build e release no ecossistema Firebase/Supabase de forma segura e padronizada.

## Comandos Disponíveis

- `/deploy-prod`: Executa o fluxo completo de pré-requisitos, build e deploy na produção.
- `/deploy-preview [channel]`: Executa o fluxo completo de build e faz deploy em um canal de preview temporário.

---

## 🛠️ Passo a Passo do Processo (`/deploy-prod`)

### Passo 1: Preflight & Sanidade Local
1. **Limpeza de Cache anterior:**
   ```bash
   pnpm run clean
   ```
2. **Validação de Variáveis de Ambiente:**
   ```bash
   pnpm run validate-env
   ```
3. **Verificação de Assets do Supabase:**
   ```bash
   pnpm run verify:assets
   pnpm run audit:supabase-storage
   ```
4. **Execução de Pré-deploy Checks:**
   ```bash
   pnpm run firebase:preflight
   ```

### Passo 2: Testes Automatizados & Qualidade
1. **Execução de Linting e Typechecking:**
   ```bash
   pnpm run build-check
   ```
2. **Execução dos Testes Unitários:**
   ```bash
   pnpm run test
   ```

### Passo 3: Compilação de Produção
1. **Compilação do Next.js (Standalone):**
   ```bash
   pnpm run build
   ```

### Passo 4: Deploy no Firebase Hosting
1. **Deploy Oficial em Produção:**
   ```bash
   firebase deploy --only hosting --project portfolio-danilo-novais
   ```
   *Nota: O script encapsula essa ação executando `pnpm run deploy live`.*

---

## 🛑 Política de Tratamento de Erros

1. Se qualquer etapa de **Preflight** falhar, o deploy deve ser cancelado imediatamente.
2. Se houver falhas de compilação ou de testes, o agente **não** deve prosseguir com o comando de deploy.
3. Após o deploy com sucesso, execute uma validação rápida testando a URL pública.
