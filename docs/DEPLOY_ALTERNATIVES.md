# 🚀 Firebase Deploy - Guia de Alternativas

## 📋 Problema Recorrente

**Erro:** `npm error Unsupported URL Type "link:"`

**Causa:** Firebase Functions usa `npm` para instalar dependências, mas `npm` não suporta o protocolo `link:` usado pelo pnpm para pacotes locais.

**Solução:** Usar `file:../` em vez de `link:` no `functions/package.json`

---

## ✅ Método 1: GitHub Actions (Recomendado)

### Configuração Inicial

1. **Adicionar Secrets no GitHub:**
   - `FIREBASE_SERVICE_ACCOUNT`: JSON da service account
   - `FIREBASE_TOKEN`: Token do Firebase CLI
   - `NEXT_PUBLIC_SUPABASE_URL`: URL do Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Chave anônima do Supabase
   - `SUPABASE_SERVICE_ROLE_KEY`: Chave de serviço do Supabase

2. **Push para main/production:**

   ```bash
   git add .
   git commit -m "feat: deploy changes"
   git push origin main
   ```

3. **Acompanhar deploy:**
   - GitHub → Actions → Firebase Deploy

### Vantagens

- ✅ Automático em cada push
- ✅ Ambiente limpo sem problemas de permissão
- ✅ Validação automática de dependências
- ✅ Histórico de deploys
- ✅ Rollback fácil

---

## 🛠️ Método 2: Script Local com Validação

### Uso

```bash
# 1. Executar pre-flight check
bash scripts/firebase-preflight.sh

# 2. Se passar, fazer deploy
pnpm run deploy
```

### O que o pre-flight check faz

- ✅ Detecta e corrige `link:` → `file:../`
- ✅ Valida `npm install` em functions/
- ✅ Verifica .env files
- ✅ Valida next.config.mjs
- ✅ Confirma Node.js version

---

## 🔧 Método 3: Deploy Manual (Fallback)

Se os métodos acima falharem devido a permissões:

### Passo 1: Preparar Build

```bash
# Limpar build anterior
rm -rf .next

# Build da aplicação
pnpm run build
```

### Passo 2: Corrigir Functions

```bash
# Editar functions/package.json manualmente
# Trocar: "link:src/" por "file:../src/"

# Validar
cd functions && npm install && cd ..
```

### Passo 3: Deploy via Firebase Console

1. Fazer upload manual do build para Firebase Hosting
2. Ou usar Firebase CLI em ambiente sem restrições:

   ```bash
   firebase deploy --only hosting,functions --project portfolio-danilo-novais
   ```

---

## 🐛 Troubleshooting

### Erro: EPERM (Operation not permitted)

**Causa:** Restrições de permissão do macOS

**Soluções:**

1. Executar em terminal com permissões completas
2. Usar GitHub Actions (recomendado)
3. Limpar cache:

   ```bash
   rm -rf .next node_modules functions/node_modules
   pnpm install
   ```

### Erro: EUNSUPPORTEDPROTOCOL

**Causa:** `link:` em functions/package.json

**Solução Automática:**

```bash
bash scripts/firebase-preflight.sh
```

**Solução Manual:**

```bash
# Editar functions/package.json
# Antes:
"@dataconnect/admin-generated": "link:src/dataconnect-admin-generated"

# Depois:
"@dataconnect/admin-generated": "file:../src/dataconnect-admin-generated"
```

### Erro: Build Lock

**Causa:** Processo anterior não finalizou

**Solução:**

```bash
rm -f .next/lock
pnpm run build
```

---

## 📊 Comparação de Métodos

| Método | Automação | Confiabilidade | Permissões | Recomendado |
|--------|-----------|----------------|------------|-------------|
| GitHub Actions | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ Sem problemas | ✅ SIM |
| Script Local | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⚠️ Pode falhar | Backup |
| Manual | ⭐ | ⭐⭐⭐ | ⚠️ Pode falhar | Último recurso |

---

## 🔒 Segurança

### Secrets Necessários

**GitHub Actions:**

- `FIREBASE_SERVICE_ACCOUNT`
- `FIREBASE_TOKEN`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### Como Obter

**Firebase Token:**

```bash
firebase login:ci
```

**Service Account:**

1. Firebase Console → Project Settings
2. Service Accounts → Generate New Private Key
3. Copiar JSON completo

---

## 📝 Checklist Pré-Deploy

- [ ] Todos os testes passando (`pnpm test`)
- [ ] Build local funciona (`pnpm run build`)
- [ ] Pre-flight check passou (`bash scripts/firebase-preflight.sh`)
- [ ] Secrets configurados (se usando GitHub Actions)
- [ ] Commit e push feitos
- [ ] Monitorar deploy no GitHub Actions ou Firebase Console

---

## 🆘 Suporte

Se nenhum método funcionar:

1. Verificar logs completos
2. Confirmar versão do Node.js (deve ser 20)
3. Limpar todos os caches e node_modules
4. Tentar em ambiente diferente (outro computador/CI)
5. Contactar suporte Firebase se problema persistir
