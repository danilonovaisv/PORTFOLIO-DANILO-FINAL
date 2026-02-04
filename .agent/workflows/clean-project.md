---
description: Deep Clean Project Protocol
---
# Workflow de Limpeza Profunda do Projeto

Este workflow realiza uma análise forense do repositório para identificar e arquivar arquivos que são simultaneamente antigos (não modificados há > 6 meses) e não utilizados (não referenciados no grafo de dependências).

## Pré-requisitos

- O repositório deve estar limpo (sem mudanças não comitadas).
- As ferramentas `knip`, `git`, `rsync` e `node` devem estar disponíveis.

## Passos

1. **Auditoria de Segurança**
   Verifique se estamos na raiz e se o git está limpo.

   ```bash
   if [ -n "$(git status --porcelain)" ]; then
     echo "❌ Error: Working directory is not clean. Commit or stash changes first."
     exit 1
   fi
   chmod +x .agent/scripts/*.sh
   ```

2. **Análise Temporal (Git)**
   Liste arquivos não modificados há mais de 6 meses.

   ```bash
   mkdir -p .cache
   .agent/scripts/git-aging-analysis.sh 6 > .cache/old_files.txt
   echo "📅 Old files found: $(wc -l < .cache/old_files.txt)"
   ```

3. **Análise Estrutural e Intersecção (Knip + Node)**
   Execute Knip e calcule a intersecção com arquivos antigos.

   ```bash
   node .agent/scripts/knip-intersection.js .cache/old_files.txt > .cache/to_archive.txt
   echo "🗑️ Files to archive: $(wc -l < .cache/to_archive.txt)"
   ```

4. **Relatório e Pausa**
   Apresente os arquivos a serem arquivados.

   ```bash
   if [ ! -s .cache/to_archive.txt ]; then
       echo "✅ No files to clean. Everything looks good!"
       rm -rf .cache
       exit 0
   fi
   
   echo "=========================================="
   echo "       CANDIDATES FOR ARCHIVING           "
   echo "=========================================="
   cat .cache/to_archive.txt
   echo "=========================================="
   echo "⚠️  Review the list above carefully."
   ```

5. **Execução de Arquivamento (Rsync)**
   Este passo move os arquivos para `_archive/`. Mude `RUN_ARCHIVE` para `true` para executar.
   // turbo

   ```bash
   # User must approve running this step manually or via confirm
   timestamp=$(date +%Y%m%d_%H%M%S)
   cat .cache/to_archive.txt | .agent/scripts/safe-move.sh "_archive/backup_$timestamp"
   ```

6. **Validação Final**
   Build do projeto para garantir integridade.
   // turbo

   ```bash
   echo "🧪 Running build verification..."
   if pnpm run build; then
       echo "✅ CLEAN SUCCESSFUL!"
       rm -rf .cache
   else
       echo "❌ BUILD FAILED. Check _archive/ folder to restore files manually."
       exit 1
   fi
   ```
